import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Edit3, Info, RotateCcw } from 'lucide-react';
import { DEFAULT_TRAINER_PLACEHOLDERS, type TrainerProfile } from '../data/gymData';
import { ResilientImage } from './ResilientImage';
import { RevealHeading, ScrollRevealBlock, SectionToneBridge } from './ScrollMotion';

interface TrainersSectionProps {
  onEnquireTrainer: (trainerName: string) => void;
}

const STORAGE_KEY = 'handstand_trainer_placeholders_v1';

export function TrainersSection({ onEnquireTrainer }: TrainersSectionProps) {
  const [trainers, setTrainers] = useState<TrainerProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as TrainerProfile[];
        if (Array.isArray(parsed) && parsed.length === DEFAULT_TRAINER_PLACEHOLDERS.length) {
          return parsed;
        }
      }
    } catch {
      // Ignore storage errors and fall back to defaults
    }
    return DEFAULT_TRAINER_PLACEHOLDERS;
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [hasCustomEdits, setHasCustomEdits] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trainers));
      const modified = JSON.stringify(trainers) !== JSON.stringify(DEFAULT_TRAINER_PLACEHOLDERS);
      setHasCustomEdits(modified);
    } catch {
      // Ignore storage errors
    }
  }, [trainers]);

  const handleFieldChange = (
    id: string,
    field: 'name' | 'speciality' | 'bio',
    value: string
  ) => {
    setTrainers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleReset = () => {
    setTrainers(DEFAULT_TRAINER_PLACEHOLDERS);
    setEditingId(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <SectionToneBridge
      id="trainers"
      fromColor="#131313"
      peakColor="#151515"
      toColor="#080808"
      className="border-t border-white/10 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <ScrollRevealBlock yOffset={16}>
              <p className="mb-4 text-xs font-medium tracking-[0.2em] text-[#C6FF00] uppercase">
                03 · Coaching &amp; Floor Support
              </p>
            </ScrollRevealBlock>
            <RevealHeading
              lines={['TRAIN WITH', 'PURPOSE.']}
              mode="letters"
              accentLastLine
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold max-w-2xl text-balance"
            />
          </div>

          <ScrollRevealBlock delay={0.1} className="max-w-md space-y-3">
            <p className="text-sm leading-relaxed text-[#999999]">
              Supportive, knowledgeable trainers focused on safe technique, progressive strength,
              and keeping every session purposeful.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3 text-xs text-white/65">
              <span className="flex items-start gap-2">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C6FF00]" aria-hidden="true" />
                <span>
                  Editable placeholder fields shown — select &ldquo;Edit Placeholder&rdquo; on any
                  card to customize trainer details.
                </span>
              </span>
              {hasCustomEdits && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C6FF00] hover:underline cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" aria-hidden="true" />
                  <span>Reset Placeholders</span>
                </button>
              )}
            </div>
          </ScrollRevealBlock>
        </div>

        {/* 3-Column Trainer Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {trainers.map((trainer, idx) => {
            const isEditing = editingId === trainer.id;

            return (
              <ScrollRevealBlock
                key={trainer.id}
                delay={idx * 0.1}
                className="group flex flex-col border border-white/10 bg-[#0d0d0d] transition-colors duration-300 hover:border-white/25"
              >
                {/* Portrait Image */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#151515]">
                  <ResilientImage
                    src={trainer.image}
                    alt={trainer.imageAlt}
                    fallbackTitle={trainer.slotLabel}
                    className="h-full w-full object-cover object-top grayscale-[35%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 text-[11px] text-white/70">
                    <span>{trainer.slotLabel}</span>
                    <span>Placeholder Portrait</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    {isEditing ? (
                      <div className="space-y-3">
                        <div>
                          <label
                            htmlFor={`trainer-name-${trainer.id}`}
                            className="block text-[11px] font-medium tracking-[0.1em] text-[#999999] uppercase"
                          >
                            Trainer Name
                          </label>
                          <input
                            id={`trainer-name-${trainer.id}`}
                            type="text"
                            value={trainer.name}
                            onChange={(e) =>
                              handleFieldChange(trainer.id, 'name', e.target.value)
                            }
                            className="mt-1 w-full border border-white/20 bg-[#151515] px-3 py-2 text-sm text-white focus:border-[#C6FF00] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`trainer-spec-${trainer.id}`}
                            className="block text-[11px] font-medium tracking-[0.1em] text-[#999999] uppercase"
                          >
                            Speciality
                          </label>
                          <input
                            id={`trainer-spec-${trainer.id}`}
                            type="text"
                            value={trainer.speciality}
                            onChange={(e) =>
                              handleFieldChange(trainer.id, 'speciality', e.target.value)
                            }
                            className="mt-1 w-full border border-white/20 bg-[#151515] px-3 py-2 text-sm text-white focus:border-[#C6FF00] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`trainer-bio-${trainer.id}`}
                            className="block text-[11px] font-medium tracking-[0.1em] text-[#999999] uppercase"
                          >
                            Short Biography
                          </label>
                          <textarea
                            id={`trainer-bio-${trainer.id}`}
                            rows={3}
                            value={trainer.bio}
                            onChange={(e) =>
                              handleFieldChange(trainer.id, 'bio', e.target.value)
                            }
                            className="mt-1 w-full border border-white/20 bg-[#151515] px-3 py-2 text-sm leading-relaxed text-white focus:border-[#C6FF00] focus:outline-none"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-xs font-medium tracking-[0.12em] text-[#C6FF00] uppercase">
                          {trainer.speciality}
                        </p>
                        <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-wide text-white uppercase">
                          {trainer.name}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-[#999999]">
                          {trainer.bio}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                    <button
                      type="button"
                      onClick={() => onEnquireTrainer(trainer.name)}
                      className="inline-flex items-center gap-2 bg-[#C6FF00] px-4 py-2.5 text-xs font-bold tracking-[0.12em] text-[#080808] uppercase transition-colors hover:bg-white whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C6FF00]"
                    >
                      <span>Enquire</span>
                      <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditingId(isEditing ? null : trainer.id)}
                      className="inline-flex items-center gap-1.5 border border-white/15 px-3 py-2 text-xs font-medium tracking-[0.08em] text-white/80 uppercase transition-colors hover:border-[#C6FF00] hover:text-[#C6FF00] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C6FF00]"
                    >
                      {isEditing ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#C6FF00]" aria-hidden="true" />
                          <span>Save Field</span>
                        </>
                      ) : (
                        <>
                          <Edit3 className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Edit Placeholder</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </ScrollRevealBlock>
            );
          })}
        </div>
      </div>
    </SectionToneBridge>
  );
}

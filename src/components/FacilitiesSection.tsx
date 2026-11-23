import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Expand, Info, X } from 'lucide-react';
import { FACILITY_CATEGORIES, type FacilityCategory } from '../data/gymData';
import { ResilientImage } from './ResilientImage';
import { RevealHeading, ScrollRevealBlock, SectionToneBridge } from './ScrollMotion';

interface FacilitiesSectionProps {
  onEnquireZone: (zoneTitle: string) => void;
}

export function FacilitiesSection({ onEnquireZone }: FacilitiesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedFacility, setSelectedFacility] = useState<FacilityCategory | null>(null);

  const visibleFacilities =
    activeFilter === 'all'
      ? FACILITY_CATEGORIES
      : FACILITY_CATEGORIES.filter((item) => item.id === activeFilter);

  return (
    <SectionToneBridge
      id="facilities"
      fromColor="#080808"
      peakColor="#0b0b0b"
      toColor="#131313"
      className="border-t border-white/10 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <ScrollRevealBlock yOffset={16}>
              <p className="mb-4 text-xs font-medium tracking-[0.2em] text-[#C6FF00] uppercase">
                02 · Training Zones &amp; Facilities
              </p>
            </ScrollRevealBlock>
            <RevealHeading
              lines={['BUILT FOR', 'EVERY DISCIPLINE.']}
              mode="letters"
              accentLastLine
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold max-w-3xl text-balance"
            />
          </div>

          <ScrollRevealBlock delay={0.1} className="max-w-md space-y-2">
            <p className="text-sm leading-relaxed text-[#999999]">
              Explore the five core training environments at HANDSTAND Gym &amp; Power Fitness™.
              Select any zone to filter or inspect full details.
            </p>
            <div className="flex items-start gap-2 text-xs text-white/60">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C6FF00]" aria-hidden="true" />
              <span>
                Illustrative concept placeholders shown below — replace with verified HANDSTAND Gym
                photographs.
              </span>
            </div>
          </ScrollRevealBlock>
        </div>

        {/* Interactive Category Filter Bar */}
        <ScrollRevealBlock className="mb-10 flex flex-wrap items-center gap-2 border-b border-white/10 pb-6">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 text-xs font-semibold tracking-[0.12em] uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C6FF00] ${
              activeFilter === 'all'
                ? 'bg-[#C6FF00] text-[#080808]'
                : 'border border-white/15 bg-[#151515] text-white/80 hover:border-white/40 hover:text-white'
            }`}
          >
            All Zones (05)
          </button>
          {FACILITY_CATEGORIES.map((category) => {
            const isSelected = activeFilter === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 text-xs font-semibold tracking-[0.12em] uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C6FF00] ${
                  isSelected
                    ? 'bg-[#C6FF00] text-[#080808]'
                    : 'border border-white/15 bg-[#151515] text-white/80 hover:border-white/40 hover:text-white'
                }`}
              >
                {category.title}
              </button>
            );
          })}
        </ScrollRevealBlock>

        {/* Asymmetric Interactive Gallery Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleFacilities.map((facility, idx) => {
            const spanClass =
              activeFilter === 'all' && facility.isFeatured
                ? 'md:col-span-2 lg:col-span-2 aspect-[16/9]'
                : activeFilter !== 'all'
                  ? 'md:col-span-2 lg:col-span-3 aspect-[16/9] max-h-[580px]'
                  : 'aspect-[4/3]';

            return (
              <ScrollRevealBlock
                key={facility.id}
                delay={idx * 0.07}
                className={`group relative overflow-hidden border border-white/10 bg-[#151515] ${spanClass}`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedFacility(facility)}
                  aria-label={`Inspect ${facility.title} facility preview`}
                  className="relative block h-full w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C6FF00]"
                >
                  <ResilientImage
                    src={facility.image}
                    alt={facility.imageAlt}
                    fallbackTitle={facility.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dark Gradient Scrim for 4.5:1+ Legibility */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/45 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95"
                    aria-hidden="true"
                  />

                  {/* Top Row: Editorial Number + Placeholder Transparency Note */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between gap-4">
                    <span className="font-display text-lg font-bold tracking-wider text-[#C6FF00] tabular-nums">
                      {facility.index}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.08em] text-white/75">
                      <span>Illustrative Placeholder</span>
                      <Expand
                        className="h-3.5 w-3.5 text-white/70 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#C6FF00]"
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  {/* Bottom Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <p className="text-xs font-medium tracking-[0.14em] text-[#999999] uppercase">
                      {facility.subtitle}
                    </p>
                    <div className="mt-1.5 flex items-end justify-between gap-4">
                      <h3 className="font-display text-3xl sm:text-4xl font-extrabold tracking-wide text-white uppercase transition-colors duration-200 group-hover:text-[#C6FF00]">
                        {facility.title}
                      </h3>
                      <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold tracking-[0.12em] text-[#C6FF00] uppercase opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 whitespace-nowrap shrink-0">
                        View Zone
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </div>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80 line-clamp-2">
                      {facility.description}
                    </p>
                  </div>
                </button>
              </ScrollRevealBlock>
            );
          })}
        </div>
      </div>

      {/* Facility Lightbox Modal */}
      <AnimatePresence>
        {selectedFacility && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808]/90 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setSelectedFacility(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden border border-white/15 bg-[#151515]"
            >
              <button
                type="button"
                onClick={() => setSelectedFacility(null)}
                aria-label="Close facility preview"
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center border border-white/20 bg-[#080808]/80 text-white transition-colors hover:border-[#C6FF00] hover:text-[#C6FF00] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="aspect-[16/9] w-full bg-[#080808]">
                <ResilientImage
                  src={selectedFacility.image}
                  alt={selectedFacility.imageAlt}
                  fallbackTitle={selectedFacility.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#999999]">
                  <span>
                    {selectedFacility.index} · {selectedFacility.subtitle}
                  </span>
                  <span className="text-white/60">
                    Illustrative Placeholder — Replace with Official Gym Photo
                  </span>
                </div>
                <h3 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-white uppercase">
                  {selectedFacility.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#999999]">
                  {selectedFacility.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/10 pt-5">
                  <button
                    type="button"
                    onClick={() => {
                      const title = selectedFacility.title;
                      setSelectedFacility(null);
                      onEnquireZone(title);
                    }}
                    className="inline-flex items-center gap-2 bg-[#C6FF00] px-5 py-2.5 text-xs font-bold tracking-[0.12em] text-[#080808] uppercase transition-colors hover:bg-white cursor-pointer"
                  >
                    <span>Book a Facility Visit</span>
                    <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFacility(null)}
                    className="px-4 py-2.5 text-xs font-medium tracking-[0.1em] text-white/75 uppercase hover:text-white cursor-pointer"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionToneBridge>
  );
}

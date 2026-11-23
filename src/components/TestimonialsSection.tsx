import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Info, Pause, Play, Quote } from 'lucide-react';
import { MEMBER_TESTIMONIALS } from '../data/gymData';
import { RevealHeading, ScrollRevealBlock, SectionToneBridge } from './ScrollMotion';

interface TestimonialsSectionProps {
  onStartJourneyClick: (contextLabel: string) => void;
}

const AUTOPLAY_INTERVAL_MS = 6500;

export function TestimonialsSection({ onStartJourneyClick }: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReduced = useReducedMotion();

  const totalSlides = MEMBER_TESTIMONIALS.length;
  const activeStory = MEMBER_TESTIMONIALS[activeIndex];

  const goToIndex = useCallback(
    (nextIndex: number) => {
      const normalized = ((nextIndex % totalSlides) + totalSlides) % totalSlides;
      setDirection(nextIndex >= activeIndex ? 1 : -1);
      setActiveIndex(normalized);
    },
    [activeIndex, totalSlides]
  );

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (isPaused || prefersReduced) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, prefersReduced, totalSlides]);

  const slideVariants = {
    enter: (dir: 1 | -1) =>
      prefersReduced ? { opacity: 0 } : { opacity: 0, x: dir > 0 ? 36 : -36 },
    center: { opacity: 1, x: 0 },
    exit: (dir: 1 | -1) =>
      prefersReduced ? { opacity: 0 } : { opacity: 0, x: dir > 0 ? -36 : 36 },
  };

  return (
    <SectionToneBridge
      id="testimonials"
      fromColor="#080808"
      peakColor="#0d0d0d"
      toColor="#080808"
      className="border-t border-white/10 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <ScrollRevealBlock yOffset={16}>
              <p className="mb-4 text-xs font-medium tracking-[0.2em] text-[#C6FF00] uppercase">
                04 · Member Success Stories
              </p>
            </ScrollRevealBlock>
            <RevealHeading
              lines={['CONSISTENCY', 'PAID OFF.']}
              mode="letters"
              accentLastLine
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold max-w-3xl text-balance"
            />
          </div>

          <ScrollRevealBlock delay={0.1} className="max-w-md space-y-2.5">
            <p className="text-sm leading-relaxed text-[#999999]">
              Every milestone starts on the training floor. Explore how structured sessions,
              clean equipment, and steady coaching help members build real momentum.
            </p>
            <div className="flex items-start gap-2 text-xs text-white/55">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C6FF00]" aria-hidden="true" />
              <span>
                Sample member success story showcase — replace with verified HANDSTAND member
                testimonials.
              </span>
            </div>
          </ScrollRevealBlock>
        </div>

        {/* Carousel Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
          }}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Member success stories"
          className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch focus-visible:outline-2 focus-visible:outline-[#C6FF00]"
        >
          {/* Left / Primary Active Story Spotlight */}
          <div className="lg:col-span-8 flex flex-col justify-between border border-white/10 bg-[#151515] p-6 sm:p-10 lg:p-12 overflow-hidden">
            {/* Top Carousel Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div className="flex items-center gap-3 text-xs font-medium tracking-[0.14em] text-[#999999] uppercase">
                <span className="font-display text-lg font-bold text-[#C6FF00] tabular-nums">
                  {activeStory.index} / 0{totalSlides}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activeStory.membershipFocus}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPaused((prev) => !prev)}
                  aria-label={isPaused ? 'Resume story carousel' : 'Pause story carousel'}
                  className="inline-flex h-10 w-10 items-center justify-center border border-white/15 bg-[#080808] text-white/80 transition-colors hover:border-[#C6FF00] hover:text-[#C6FF00] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C6FF00]"
                >
                  {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous member story"
                  className="inline-flex h-10 w-10 items-center justify-center border border-white/15 bg-[#080808] text-white transition-colors hover:border-[#C6FF00] hover:text-[#C6FF00] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C6FF00]"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next member story"
                  className="inline-flex h-10 w-10 items-center justify-center border border-white/15 bg-[#080808] text-white transition-colors hover:border-[#C6FF00] hover:text-[#C6FF00] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C6FF00]"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Animated Slide Content */}
            <div className="relative my-8 min-h-[260px] flex flex-col justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeStory.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <Quote className="h-8 w-8 shrink-0 text-[#C6FF00]/80" aria-hidden="true" />
                    <div className="text-right">
                      <p className="font-display text-3xl sm:text-4xl font-extrabold text-[#C6FF00] tabular-nums leading-none">
                        {activeStory.metricValue}
                      </p>
                      <p className="mt-1 text-[11px] font-medium tracking-[0.14em] text-[#999999] uppercase">
                        {activeStory.metricLabel}
                      </p>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-wide text-white uppercase">
                    {activeStory.headlineResult}
                  </h3>

                  <blockquote className="text-base sm:text-xl leading-relaxed text-white/90">
                    &ldquo;{activeStory.quote}&rdquo;
                  </blockquote>

                  {/* Concrete Before / Outcome Breakdown */}
                  <div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
                    <div>
                      <p className="text-[11px] font-medium tracking-[0.14em] text-[#999999] uppercase">
                        Starting Point
                      </p>
                      <p className="mt-1 text-sm text-white/85">{activeStory.beforeContext}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-medium tracking-[0.14em] text-[#C6FF00] uppercase">
                        Training Outcome
                      </p>
                      <p className="mt-1 text-sm text-white/85">{activeStory.outcomeSummary}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer Attribution + CTA */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
              <div>
                <p className="font-display text-xl font-bold tracking-wide text-white uppercase">
                  {activeStory.memberName}
                </p>
                <p className="text-xs text-[#999999] tabular-nums">
                  {activeStory.membershipFocus} <span aria-hidden="true">·</span>{' '}
                  {activeStory.timeframe}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  onStartJourneyClick(`Goal Inspired by ${activeStory.membershipFocus}`)
                }
                className="inline-flex items-center gap-2 bg-[#C6FF00] px-5 py-2.5 text-xs font-bold tracking-[0.12em] text-[#080808] uppercase transition-colors hover:bg-white whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C6FF00]"
              >
                <span>Start Your Story</span>
                <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right / Interactive Story Queue Selector */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-3">
            {MEMBER_TESTIMONIALS.map((story, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => goToIndex(idx)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group flex flex-1 flex-col justify-between border p-5 text-left transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C6FF00] ${
                    isActive
                      ? 'border-[#C6FF00] bg-[#151515]'
                      : 'border-white/10 bg-[#0a0a0a] hover:border-white/30 hover:bg-[#121212]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-display text-base font-bold tracking-wider tabular-nums ${
                        isActive ? 'text-[#C6FF00]' : 'text-[#999999] group-hover:text-white'
                      }`}
                    >
                      {story.index}
                    </span>
                    <span className="text-[11px] font-medium text-[#999999] tabular-nums">
                      {story.timeframe}
                    </span>
                  </div>

                  <div className="mt-3">
                    <p className="font-display text-xl font-bold tracking-wide text-white uppercase group-hover:text-[#C6FF00] transition-colors">
                      {story.memberName}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#999999] line-clamp-2">
                      {story.headlineResult}
                    </p>
                  </div>

                  {/* Subtle Active Indicator Bar */}
                  <div className="mt-4 h-[2px] w-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isActive ? 'w-full bg-[#C6FF00]' : 'w-0 bg-white/30 group-hover:w-1/3'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </SectionToneBridge>
  );
}

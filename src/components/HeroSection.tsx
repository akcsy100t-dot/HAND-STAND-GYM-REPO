import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, Compass } from 'lucide-react';
import { GYM_INFO } from '../data/gymData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onExploreClick: () => void;
  onStartJourneyClick: () => void;
}

export function HeroSection({ onExploreClick, onStartJourneyClick }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.18]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.75], ['0%', '14%']);

  const lineOneWords = ['BUILT'];
  const lineTwoWords = ['NOT', 'BORN.'];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-screen w-full items-end overflow-hidden bg-[#080808] pt-28 pb-16 lg:items-center lg:pb-20"
    >
      {/* Parallax & Subtle Breathing Cinematic Background */}
      <motion.div
        style={prefersReduced ? undefined : { y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <motion.div
          initial={prefersReduced ? false : { scale: 1.1, opacity: 0.45 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full"
        >
          <ResilientImage
            src={GYM_INFO.heroImage}
            alt="Athlete gripping a heavy loaded barbell in dramatic gym spotlight — illustrative concept visual"
            fallbackTitle={GYM_INFO.fullBrandName}
            priority
            className="h-full w-full object-cover object-center"
          />
        </motion.div>

        {/* Measured Gradient Scrims for High-Contrast Typography */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#080808]/95 via-[#080808]/65 to-[#080808]/45"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/75"
          aria-hidden="true"
        />
      </motion.div>

      {/* Main Hero Content */}
      <motion.div
        style={prefersReduced ? undefined : { opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-12"
      >
        <div className="max-w-4xl">
          {/* Unboxed Brand & Location Context */}
          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 text-xs sm:text-sm font-medium tracking-[0.2em] text-[#999999] uppercase"
          >
            {GYM_INFO.fullBrandName} <span className="mx-2 text-white/30" aria-hidden="true">·</span>{' '}
            Comba, Margao, Goa
          </motion.p>

          {/* Word-by-Word Staggered Hero Headline */}
          <h1 className="font-display text-[clamp(4.25rem,11vw,8.75rem)] font-extrabold uppercase leading-[0.88] tracking-tight text-white">
            <span className="block overflow-hidden">
              {lineOneWords.map((word, idx) => (
                <motion.span
                  key={word}
                  initial={prefersReduced ? false : { y: '105%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.75,
                    delay: 0.2 + idx * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block mr-[0.2em]"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden text-[#C6FF00]">
              {lineTwoWords.map((word, idx) => (
                <motion.span
                  key={word}
                  initial={prefersReduced ? false : { y: '105%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.75,
                    delay: 0.38 + idx * 0.14,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block mr-[0.2em] last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Supporting Headline */}
          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl font-display text-xl sm:text-2xl lg:text-[28px] font-semibold tracking-[0.08em] text-white/90 uppercase"
          >
            {GYM_INFO.tagline}
          </motion.p>

          {/* Supporting Context Copy */}
          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-[#999999]"
          >
            Focused strength training, modern well-maintained equipment, and a clean, motivating
            environment in the heart of Margao.
          </motion.p>

          {/* Two Interactive Action Buttons */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <motion.button
              type="button"
              onClick={onStartJourneyClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2.5 bg-[#C6FF00] px-7 py-4 text-xs sm:text-sm font-bold tracking-[0.14em] text-[#080808] uppercase transition-colors hover:bg-white whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6FF00]"
            >
              <span>START YOUR JOURNEY</span>
              <ArrowUpRight className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
            </motion.button>

            <motion.button
              type="button"
              onClick={onExploreClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2.5 border border-white/25 bg-[#151515]/70 backdrop-blur-sm px-7 py-4 text-xs sm:text-sm font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:border-[#C6FF00] hover:text-[#C6FF00] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6FF00]"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              <span>EXPLORE THE GYM</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Subtle Bottom Bar: Scroll Indicator + Transparent Visual Note */}
      <div className="pointer-events-none absolute bottom-6 left-0 right-0 z-10 mx-auto flex max-w-[1440px] items-end justify-between px-6 lg:px-12">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="pointer-events-auto group inline-flex items-center gap-3 text-xs tracking-[0.18em] text-[#999999] uppercase transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#C6FF00]"
        >
          <motion.span
            animate={prefersReduced ? undefined : { y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="flex h-8 w-5 items-center justify-center border border-white/25 group-hover:border-[#C6FF00]"
          >
            <ArrowDown className="h-3 w-3 text-[#C6FF00]" aria-hidden="true" />
          </motion.span>
          <span>Scroll to explore</span>
        </a>

        <span className="hidden sm:block text-[11px] tracking-[0.08em] text-white/45">
          Illustrative concept visual · Replace with official gym photography
        </span>
      </div>
    </section>
  );
}

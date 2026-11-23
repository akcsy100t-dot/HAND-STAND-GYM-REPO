import { type ReactNode, useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-white/5 pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        className="h-full origin-left bg-[#C6FF00]"
        style={{ scaleX }}
      />
    </div>
  );
}

interface RevealHeadingProps {
  lines: string[];
  className?: string;
  mode?: 'words' | 'letters';
  accentLastLine?: boolean;
  as?: 'h1' | 'h2' | 'h3';
}

export function RevealHeading({
  lines,
  className = '',
  mode = 'letters',
  accentLastLine = false,
  as = 'h2',
}: RevealHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.25 });
  const prefersReduced = useReducedMotion();

  const Tag = as;

  let runningIndex = 0;

  return (
    <div ref={ref}>
      <Tag className={`font-display uppercase tracking-tight leading-[0.95] ${className}`}>
        {lines.map((line, lineIdx) => {
          const isLast = lineIdx === lines.length - 1;
          const colorClass = accentLastLine && isLast ? 'text-[#C6FF00]' : 'text-white';

          if (prefersReduced) {
            return (
              <span key={lineIdx} className={`block ${colorClass}`}>
                {line}
              </span>
            );
          }

          if (mode === 'words') {
            const words = line.split(' ');
            return (
              <span key={lineIdx} className={`block overflow-hidden ${colorClass}`}>
                {words.map((word, wIdx) => {
                  const delay = runningIndex * 0.09;
                  runningIndex += 1;
                  return (
                    <span key={wIdx} className="inline-block overflow-hidden mr-[0.22em] last:mr-0 align-bottom">
                      <motion.span
                        className="inline-block"
                        initial={{ y: '105%', opacity: 0 }}
                        animate={isInView ? { y: '0%', opacity: 1 } : { y: '105%', opacity: 0 }}
                        transition={{
                          duration: 0.65,
                          delay,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  );
                })}
              </span>
            );
          }

          // Letter-by-letter reveal grouped inside word wrappers so words never break mid-word
          const words = line.split(' ');
          return (
            <span key={lineIdx} className={`block ${colorClass}`}>
              {words.map((word, wIdx) => (
                <span key={wIdx} className="inline-block mr-[0.24em] last:mr-0 whitespace-nowrap">
                  {word.split('').map((char, cIdx) => {
                    const delay = runningIndex * 0.018;
                    runningIndex += 1;
                    return (
                      <span key={cIdx} className="inline-block overflow-hidden align-bottom">
                        <motion.span
                          className="inline-block"
                          initial={{ y: '110%', opacity: 0 }}
                          animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: Math.min(delay, 0.65),
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          {char}
                        </motion.span>
                      </span>
                    );
                  })}
                </span>
              ))}
            </span>
          );
        })}
      </Tag>
    </div>
  );
}

interface ScrollRevealBlockProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

export function ScrollRevealBlock({
  children,
  className = '',
  delay = 0,
  yOffset = 28,
}: ScrollRevealBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.15 });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxClipFrameProps {
  children: ReactNode;
  className?: string;
}

export function ParallaxClipFrame({ children, className = '' }: ParallaxClipFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [1.14, 1.02, 1.0]);
  const clipInset = useTransform(scrollYProgress, [0, 0.28], [8, 0]);
  const clipPath = useTransform(clipInset, (v) => `inset(${v}% ${v * 0.5}% ${v}% ${v * 0.5}%)`);

  if (prefersReduced) {
    return <div className={`relative overflow-hidden ${className}`}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ clipPath }}
        className="h-full w-full will-change-transform"
      >
        <motion.div
          style={{ y, scale }}
          className="h-full w-full will-change-transform"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

interface AnimatedCounterProps {
  target: number;
  padLength?: number;
  suffix?: string;
}

export function AnimatedCounter({
  target,
  padLength = 2,
  suffix = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const prefersReduced = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(target);

  useEffect(() => {
    if (prefersReduced) {
      setDisplayValue(target);
      return;
    }

    if (!isInView) {
      setDisplayValue(0);
      return;
    }

    let frameId: number;
    const duration = 800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, target, prefersReduced]);

  const formatted = String(displayValue).padStart(padLength, '0');

  return (
    <span ref={ref} className="tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
}

interface SectionToneBridgeProps {
  children: ReactNode;
  id?: string;
  fromColor?: string;
  peakColor?: string;
  toColor?: string;
  className?: string;
}

export function SectionToneBridge({
  children,
  id,
  fromColor = '#080808',
  peakColor = '#151515',
  toColor = '#080808',
  className = '',
}: SectionToneBridgeProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [fromColor, peakColor, peakColor, toColor]
  );

  return (
    <motion.section
      ref={ref}
      id={id}
      style={prefersReduced ? { backgroundColor: peakColor } : { backgroundColor }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

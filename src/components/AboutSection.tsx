import { MapPin } from 'lucide-react';
import { ABOUT_PILLARS, GYM_INFO } from '../data/gymData';
import { ResilientImage } from './ResilientImage';
import {
  AnimatedCounter,
  ParallaxClipFrame,
  RevealHeading,
  ScrollRevealBlock,
  SectionToneBridge,
} from './ScrollMotion';

export function AboutSection() {
  return (
    <SectionToneBridge
      id="about"
      fromColor="#080808"
      peakColor="#111111"
      toColor="#080808"
      className="border-t border-white/10 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Editorial Heading Row */}
        <div className="mb-14 lg:mb-20 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <ScrollRevealBlock yOffset={16}>
              <p className="mb-4 text-xs font-medium tracking-[0.2em] text-[#C6FF00] uppercase">
                01 · About The Gym
              </p>
            </ScrollRevealBlock>
            <RevealHeading
              lines={['MORE THAN A GYM.', "IT'S A MINDSET."]}
              mode="letters"
              accentLastLine
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold max-w-3xl text-balance"
            />
          </div>

          <ScrollRevealBlock delay={0.1} className="max-w-md">
            <p className="text-sm leading-relaxed text-[#999999]">
              Situated on the 3rd Floor of Gomant Vidya Niketan in Comba, Margao, HANDSTAND Gym
              &amp; Power Fitness™ is built around consistency, purposeful training, and an
              environment that makes showing up effortless.
            </p>
          </ScrollRevealBlock>
        </div>

        {/* Asymmetric Editorial Split Layout (Balanced Stretch) */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          {/* Left: Scroll-Driven Clip & Parallax Image */}
          <div className="lg:col-span-6 flex flex-col">
            <ParallaxClipFrame className="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[360px] border border-white/10 bg-[#151515]">
              <ResilientImage
                src={GYM_INFO.aboutImage}
                alt="Illustrative gym interior featuring squat racks, free weights, and clean training lanes"
                fallbackTitle="Training Floor Concept"
                className="h-full w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent"
                aria-hidden="true"
              />
            </ParallaxClipFrame>
            <p className="mt-3 text-xs text-[#999999]">
              Illustrative concept visual · Placeholder until official HANDSTAND facility photos are
              uploaded
            </p>
          </div>

          {/* Right: Editorial Philosophy & 4 Core Pillars */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <ScrollRevealBlock>
              <p className="text-base sm:text-lg leading-relaxed text-white/90">
                Real progress comes from steady reps, reliable equipment, and a space that respects
                your focus. Whether you are lifting for foundational strength or building daily
                conditioning habits, our floor is structured to keep distractions low and motivation
                consistent.
              </p>
            </ScrollRevealBlock>

            <div className="mt-8 divide-y divide-white/10 border-t border-b border-white/10">
              {ABOUT_PILLARS.map((pillar, idx) => (
                <ScrollRevealBlock key={pillar.number} delay={idx * 0.08} yOffset={20}>
                  <div className="group py-5 transition-colors">
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-xl font-bold text-[#C6FF00] tabular-nums">
                        {pillar.number}
                      </span>
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold tracking-wide text-white uppercase group-hover:text-[#C6FF00] transition-colors">
                          {pillar.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#999999]">
                          {pillar.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollRevealBlock>
              ))}
            </div>

            <ScrollRevealBlock delay={0.2} className="mt-6 flex items-start gap-3 text-xs text-[#999999]">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C6FF00]" aria-hidden="true" />
              <span>{GYM_INFO.fullAddress}</span>
            </ScrollRevealBlock>
          </div>
        </div>

        {/* Genuine Figures Bar (Strictly Grounded in Supplied Facts) */}
        <div className="mt-16 grid grid-cols-1 gap-px bg-white/10 border border-white/10 sm:grid-cols-3">
          <ScrollRevealBlock className="bg-[#0e0e0e] p-7 lg:p-9">
            <p className="font-display text-4xl sm:text-5xl font-extrabold text-white">
              Floor <AnimatedCounter target={3} padLength={2} />
            </p>
            <p className="mt-2 text-xs font-medium tracking-[0.12em] text-[#999999] uppercase">
              Gomant Vidya Niketan · Comba, Margao
            </p>
          </ScrollRevealBlock>

          <ScrollRevealBlock delay={0.08} className="bg-[#0e0e0e] p-7 lg:p-9">
            <p className="font-display text-4xl sm:text-5xl font-extrabold text-[#C6FF00]">
              <AnimatedCounter target={5} padLength={2} /> Zones
            </p>
            <p className="mt-2 text-xs font-medium tracking-[0.12em] text-[#999999] uppercase">
              Dedicated Training &amp; Conditioning Areas
            </p>
          </ScrollRevealBlock>

          <ScrollRevealBlock delay={0.16} className="bg-[#0e0e0e] p-7 lg:p-9">
            <p className="font-display text-4xl sm:text-5xl font-extrabold text-white">
              <AnimatedCounter target={4} padLength={2} /> Pillars
            </p>
            <p className="mt-2 text-xs font-medium tracking-[0.12em] text-[#999999] uppercase">
              Equipment · Space · Trainers · Atmosphere
            </p>
          </ScrollRevealBlock>
        </div>
      </div>
    </SectionToneBridge>
  );
}

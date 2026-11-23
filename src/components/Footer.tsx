import { GYM_INFO } from '../data/gymData';

const FOOTER_LINKS = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'FACILITIES', href: '#facilities' },
  { label: 'TRAINERS', href: '#trainers' },
  { label: 'MEMBERSHIP', href: '#membership' },
  { label: 'CONTACT', href: '#contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080808] py-14">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-start">
          {/* Brand & Address */}
          <div className="md:col-span-5 space-y-3">
            <p className="font-display text-2xl font-extrabold tracking-wider text-white uppercase">
              {GYM_INFO.fullBrandName}
            </p>
            <p className="max-w-sm text-xs leading-relaxed text-[#999999]">
              {GYM_INFO.fullAddress}
            </p>
            <p className="text-xs font-medium text-white">
              Phone:{' '}
              <a
                href={GYM_INFO.phoneHref}
                className="text-[#C6FF00] hover:underline tabular-nums"
              >
                {GYM_INFO.phoneDisplay}
              </a>
            </p>
          </div>

          {/* Navigation Mirror */}
          <nav
            aria-label="Footer navigation"
            className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-3"
          >
            {FOOTER_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const id = item.href.replace('#', '');
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-medium tracking-[0.14em] text-[#999999] uppercase transition-colors hover:text-[#C6FF00]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Transparency Disclosure */}
          <div className="md:col-span-3 space-y-2 text-xs leading-relaxed text-white/50">
            <p>
              Visual note: Facility and trainer images shown on this site are illustrative
              concept placeholders awaiting official gym photography.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-[#999999] sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} {GYM_INFO.fullBrandName}. All rights reserved.
          </p>
          <p className="tracking-[0.08em] uppercase text-white/60">
            {GYM_INFO.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { GYM_INFO } from '../data/gymData';

interface NavbarProps {
  onJoinClick: () => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'HOME', href: '#home' },
  { id: 'about', label: 'ABOUT', href: '#about' },
  { id: 'facilities', label: 'FACILITIES', href: '#facilities' },
  { id: 'trainers', label: 'TRAINERS', href: '#trainers' },
  { id: 'membership', label: 'MEMBERSHIP', href: '#membership' },
  { id: 'contact', label: 'CONTACT', href: '#contact' },
];

export function Navbar({ onJoinClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-35% 0px -50% 0px',
        threshold: 0.05,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/95 backdrop-blur-md border-b border-white/10 py-3.5'
            : 'bg-gradient-to-b from-[#080808]/85 to-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-6 lg:px-12">
          {/* Zone 1: Single-element Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#home');
            }}
            className="font-display text-2xl lg:text-[28px] font-extrabold tracking-wider text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6FF00]"
          >
            {GYM_INFO.brandName}
          </a>

          {/* Zone 2: Clean Single-line Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-7"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className={`relative py-1 text-xs font-medium tracking-[0.14em] transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6FF00] ${
                    isActive ? 'text-[#C6FF00]' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C6FF00]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.button
              type="button"
              onClick={onJoinClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:inline-flex items-center gap-2 bg-[#C6FF00] px-5 py-2.5 text-xs font-bold tracking-[0.12em] text-[#080808] uppercase transition-colors hover:bg-white whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6FF00]"
            >
              <span>JOIN THE GYM</span>
              <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
            </motion.button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="inline-flex lg:hidden h-11 w-11 items-center justify-center border border-white/15 bg-[#151515]/80 text-white transition-colors hover:border-[#C6FF00] hover:text-[#C6FF00] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C6FF00]"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Animated Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#080808]/98 backdrop-blur-xl px-6 pt-24 pb-10 lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * idx, duration: 0.3 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                    className={`flex items-center justify-between border-b border-white/10 py-3.5 font-display text-3xl font-bold tracking-wide transition-colors ${
                      isActive ? 'text-[#C6FF00]' : 'text-white hover:text-[#C6FF00]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-sans text-xs font-medium text-[#999999] tabular-nums">
                      0{idx + 1}
                    </span>
                  </motion.a>
                );
              })}
            </nav>

            <div className="space-y-4 border-t border-white/10 pt-6">
              <p className="text-xs leading-relaxed text-[#999999]">
                {GYM_INFO.fullAddress}
              </p>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onJoinClick();
                }}
                className="flex w-full items-center justify-center gap-2 bg-[#C6FF00] px-6 py-4 text-xs font-bold tracking-[0.14em] text-[#080808] uppercase transition-colors hover:bg-white cursor-pointer"
              >
                <span>JOIN THE GYM</span>
                <ArrowUpRight className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

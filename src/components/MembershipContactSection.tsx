import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Clock, Copy, MapPin, Phone } from 'lucide-react';
import { GYM_INFO, MEMBERSHIP_OPTIONS } from '../data/gymData';
import { RevealHeading, ScrollRevealBlock } from './ScrollMotion';

interface MembershipContactSectionProps {
  preselectedInterest: string;
}

export function MembershipContactSection({
  preselectedInterest,
}: MembershipContactSectionProps) {
  const [selectedPlan, setSelectedPlan] = useState(MEMBERSHIP_OPTIONS[0].title);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [goal, setGoal] = useState('Strength & Muscle Building');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    plan: string;
    phone: string;
  } | null>(null);

  const [copiedField, setCopiedField] = useState<'phone' | 'address' | null>(null);

  useEffect(() => {
    if (preselectedInterest) {
      setSelectedPlan(preselectedInterest);
      setSubmittedData(null);
    }
  }, [preselectedInterest]);

  const handleCopy = async (text: string, field: 'phone' | 'address') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Fallback ignored if clipboard unavailable
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedName = fullName.trim();
    const cleanedPhone = phone.replace(/[^\d+]/g, '').trim();

    if (cleanedName.length < 2) {
      setFormError('Please enter your full name (at least 2 characters).');
      return;
    }

    if (cleanedPhone.length < 10) {
      setFormError('Please enter a valid 10-digit phone number so we can reach you.');
      return;
    }

    setFormError(null);
    setSubmittedData({
      name: cleanedName,
      plan: selectedPlan,
      phone: phone.trim(),
    });
  };

  return (
    <>
      {/* MEMBERSHIP SECTION */}
      <section
        id="membership"
        className="border-t border-white/10 bg-[#080808] py-24 lg:py-32"
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <ScrollRevealBlock yOffset={16}>
                <p className="mb-4 text-xs font-medium tracking-[0.2em] text-[#C6FF00] uppercase">
                  05 · Membership &amp; Visit Enquiry
                </p>
              </ScrollRevealBlock>
              <RevealHeading
                lines={['START YOUR', 'TRAINING CHAPTER.']}
                mode="letters"
                accentLastLine
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold max-w-3xl text-balance"
              />
            </div>

            <ScrollRevealBlock delay={0.1} className="max-w-md">
              <p className="text-sm leading-relaxed text-[#999999]">
                Select a membership option below or request a walk-in gym tour at our Comba,
                Margao floor. Call directly for current membership tariffs.
              </p>
            </ScrollRevealBlock>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left: Interactive Membership Option Cards */}
            <div className="lg:col-span-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {MEMBERSHIP_OPTIONS.map((option, idx) => {
                const isSelected = selectedPlan === option.title;
                return (
                  <ScrollRevealBlock key={option.id} delay={idx * 0.06}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPlan(option.title);
                        setSubmittedData(null);
                      }}
                      className={`flex h-full w-full flex-col justify-between border p-6 text-left transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C6FF00] ${
                        isSelected
                          ? 'border-[#C6FF00] bg-[#151515]'
                          : 'border-white/10 bg-[#0e0e0e] hover:border-white/30'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-medium tracking-[0.12em] text-[#999999] uppercase">
                            {option.cadence}
                          </span>
                          {isSelected && (
                            <span className="h-2 w-2 bg-[#C6FF00]" aria-hidden="true" />
                          )}
                        </div>
                        <h3 className="mt-3 font-display text-2xl font-bold tracking-wide text-white uppercase">
                          {option.title}
                        </h3>
                        <p className="mt-2.5 text-sm leading-relaxed text-[#999999]">
                          {option.description}
                        </p>
                      </div>

                      <p className="mt-6 border-t border-white/10 pt-4 text-xs font-medium text-[#C6FF00]">
                        {option.rateNote}
                      </p>
                    </button>
                  </ScrollRevealBlock>
                );
              })}
            </div>

            {/* Right: Membership Enquiry Form */}
            <ScrollRevealBlock delay={0.12} className="lg:col-span-6">
              <div className="border border-white/10 bg-[#151515] p-6 sm:p-8 lg:p-10">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-wide text-white uppercase">
                      Request Membership Details
                    </h3>
                    <p className="mt-1 text-xs text-[#999999]">
                      Selected interest: <span className="text-[#C6FF00]">{selectedPlan}</span>
                    </p>
                  </div>
                  <a
                    href={GYM_INFO.phoneHref}
                    className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-xs font-semibold tracking-[0.1em] text-white uppercase transition-colors hover:border-[#C6FF00] hover:text-[#C6FF00] whitespace-nowrap shrink-0"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#C6FF00]" aria-hidden="true" />
                    <span>{GYM_INFO.phoneDisplay}</span>
                  </a>
                </div>

                {submittedData ? (
                  <div className="space-y-5 py-6">
                    <div className="inline-flex h-11 w-11 items-center justify-center bg-[#C6FF00] text-[#080808]">
                      <Check className="h-5 w-5 stroke-[2.5]" aria-hidden="true" />
                    </div>
                    <h4 className="font-display text-3xl font-bold text-white uppercase">
                      Enquiry Ready, {submittedData.name}
                    </h4>
                    <p className="text-sm leading-relaxed text-[#999999]">
                      Thank you for your interest in{' '}
                      <span className="text-white font-medium">{submittedData.plan}</span> at{' '}
                      {GYM_INFO.fullBrandName}. For immediate tariff details or to schedule a
                      floor tour at Gomant Vidya Niketan, call or visit us directly.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <a
                        href={GYM_INFO.phoneHref}
                        className="inline-flex items-center gap-2 bg-[#C6FF00] px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-[#080808] uppercase transition-colors hover:bg-white"
                      >
                        <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Call {GYM_INFO.phoneDisplay}</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmittedData(null);
                          setFullName('');
                          setPhone('');
                          setNotes('');
                        }}
                        className="border border-white/20 px-5 py-3.5 text-xs font-medium tracking-[0.1em] text-white uppercase hover:border-white/50 cursor-pointer"
                      >
                        Submit Another Enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="enquiry-name"
                          className="block text-xs font-medium tracking-[0.12em] text-[#999999] uppercase"
                        >
                          Full Name
                        </label>
                        <input
                          id="enquiry-name"
                          type="text"
                          required
                          placeholder="Your name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="mt-2 w-full border border-white/15 bg-[#080808] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#C6FF00] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="enquiry-phone"
                          className="block text-xs font-medium tracking-[0.12em] text-[#999999] uppercase"
                        >
                          Phone Number
                        </label>
                        <input
                          id="enquiry-phone"
                          type="tel"
                          required
                          placeholder="+91 98XXX XXXXX"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="mt-2 w-full border border-white/15 bg-[#080808] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#C6FF00] focus:outline-none tabular-nums"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="enquiry-plan"
                          className="block text-xs font-medium tracking-[0.12em] text-[#999999] uppercase"
                        >
                          Selected Interest
                        </label>
                        <input
                          id="enquiry-plan"
                          type="text"
                          value={selectedPlan}
                          onChange={(e) => setSelectedPlan(e.target.value)}
                          className="mt-2 w-full border border-white/15 bg-[#080808] px-4 py-3 text-sm text-white focus:border-[#C6FF00] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="enquiry-goal"
                          className="block text-xs font-medium tracking-[0.12em] text-[#999999] uppercase"
                        >
                          Primary Training Goal
                        </label>
                        <select
                          id="enquiry-goal"
                          value={goal}
                          onChange={(e) => setGoal(e.target.value)}
                          className="mt-2 w-full border border-white/15 bg-[#080808] px-4 py-3 text-sm text-white focus:border-[#C6FF00] focus:outline-none"
                        >
                          <option value="Strength & Muscle Building">
                            Strength &amp; Muscle Building
                          </option>
                          <option value="General Fitness & Consistency">
                            General Fitness &amp; Consistency
                          </option>
                          <option value="Conditioning & Fat Loss">
                            Conditioning &amp; Endurance
                          </option>
                          <option value="Beginner Gym Orientation">
                            Beginner Gym Orientation
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-notes"
                        className="block text-xs font-medium tracking-[0.12em] text-[#999999] uppercase"
                      >
                        Preferred Visit Time or Question (Optional)
                      </label>
                      <textarea
                        id="enquiry-notes"
                        rows={3}
                        placeholder="Morning or evening preference, or any question about our equipment and trainers..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="mt-2 w-full border border-white/15 bg-[#080808] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#C6FF00] focus:outline-none"
                      />
                    </div>

                    {formError && (
                      <p role="alert" className="text-xs font-medium text-red-400">
                        {formError}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 bg-[#C6FF00] px-6 py-4 text-xs sm:text-sm font-bold tracking-[0.14em] text-[#080808] uppercase transition-colors hover:bg-white cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6FF00]"
                    >
                      <span>Submit Membership Enquiry</span>
                      <ArrowUpRight className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
                    </button>
                  </form>
                )}
              </div>
            </ScrollRevealBlock>
          </div>
        </div>
      </section>

      {/* CONTACT & VISIT US SECTION */}
      <section
        id="contact"
        className="border-t border-white/10 bg-[#111111] py-24 lg:py-28"
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <ScrollRevealBlock yOffset={16}>
                <p className="mb-4 text-xs font-medium tracking-[0.2em] text-[#C6FF00] uppercase">
                  06 · Location &amp; Contact
                </p>
              </ScrollRevealBlock>
              <RevealHeading
                lines={['VISIT THE', 'TRAINING FLOOR.']}
                mode="letters"
                accentLastLine
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-balance"
              />
              <ScrollRevealBlock delay={0.1} className="mt-5">
                <p className="text-sm leading-relaxed text-[#999999]">
                  Conveniently located in Comba, Margao above Maharashtra Bank and near Margao
                  Police Station. Stop by for a floor walkthrough or call us directly.
                </p>
              </ScrollRevealBlock>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Address Card */}
              <ScrollRevealBlock className="flex flex-col justify-between border border-white/10 bg-[#080808] p-7">
                <div>
                  <div className="flex items-center gap-2.5 text-xs font-medium tracking-[0.14em] text-[#C6FF00] uppercase">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    <span>Gym Address</span>
                  </div>
                  <p className="mt-4 text-base font-medium leading-relaxed text-white">
                    {GYM_INFO.addressLine1}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#999999]">
                    {GYM_INFO.addressLine2}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#999999]">
                    {GYM_INFO.addressLine3}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <button
                    type="button"
                    onClick={() => handleCopy(GYM_INFO.fullAddress, 'address')}
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:text-[#C6FF00] cursor-pointer"
                  >
                    {copiedField === 'address' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#C6FF00]" aria-hidden="true" />
                        <span className="text-[#C6FF00]">Address Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy Full Address</span>
                      </>
                    )}
                  </button>
                </div>
              </ScrollRevealBlock>

              {/* Direct Phone & Hours Placeholder Card */}
              <ScrollRevealBlock
                delay={0.08}
                className="flex flex-col justify-between border border-white/10 bg-[#080808] p-7"
              >
                <div>
                  <div className="flex items-center gap-2.5 text-xs font-medium tracking-[0.14em] text-[#C6FF00] uppercase">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    <span>Direct Line</span>
                  </div>
                  <a
                    href={GYM_INFO.phoneHref}
                    className="mt-4 block font-display text-3xl sm:text-4xl font-bold tracking-wide text-white transition-colors hover:text-[#C6FF00] tabular-nums"
                  >
                    {GYM_INFO.phoneDisplay}
                  </a>

                  <div className="mt-5 flex items-start gap-2.5 border-t border-white/10 pt-4 text-xs text-[#999999]">
                    <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/50" aria-hidden="true" />
                    <span>
                      [Operating Hours Placeholder — Confirm daily morning &amp; evening timings
                      by phone]
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/10 pt-4">
                  <a
                    href={GYM_INFO.phoneHref}
                    className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] text-[#C6FF00] uppercase hover:underline"
                  >
                    <span>Call Now</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(GYM_INFO.phoneDisplay, 'phone')}
                    className="inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.1em] text-white/75 uppercase hover:text-white cursor-pointer"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#C6FF00]" aria-hidden="true" />
                        <span className="text-[#C6FF00]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy Number</span>
                      </>
                    )}
                  </button>
                </div>
              </ScrollRevealBlock>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

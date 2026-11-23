export interface FacilityCategory {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  isFeatured?: boolean;
}

export interface TrainerProfile {
  id: string;
  slotLabel: string;
  name: string;
  speciality: string;
  bio: string;
  image: string;
  imageAlt: string;
}

export interface MembershipOption {
  id: string;
  title: string;
  cadence: string;
  description: string;
  rateNote: string;
}

export interface MemberTestimonial {
  id: string;
  index: string;
  memberName: string;
  membershipFocus: string;
  timeframe: string;
  headlineResult: string;
  metricLabel: string;
  metricValue: string;
  quote: string;
  beforeContext: string;
  outcomeSummary: string;
}

export const GYM_INFO = {
  brandName: 'HANDSTAND',
  fullBrandName: 'HANDSTAND Gym & Power Fitness™',
  tagline: 'STRONGER EVERY REP. BETTER EVERY DAY.',
  addressLine1: '3rd Floor, Gomant Vidya Niketan',
  addressLine2: 'Above Maharashtra Bank, near Margao Police Station',
  addressLine3: 'Comba, Margao, Goa 403601, India',
  fullAddress:
    '3rd Floor, Gomant Vidya Niketan, above Maharashtra Bank, near Margao Police Station, Comba, Margao, Goa 403601, India',
  phoneDisplay: '+91 95118 17495',
  phoneHref: 'tel:+919511817495',
  heroImage: '/src/assets/images/hero_athlete_training_1795366718678.jpg',
  aboutImage: '/src/assets/images/about_training_floor_1795366718165.jpg',
};

export const ABOUT_PILLARS = [
  {
    number: '01',
    title: 'Modern, Well-Maintained Equipment',
    detail:
      'Every rack, barbell, dumbbell, and training station is kept clean, calibrated, and ready for focused daily sessions.',
  },
  {
    number: '02',
    title: 'Spacious & Clean Training Environment',
    detail:
      'Thoughtfully laid out across the 3rd floor at Gomant Vidya Niketan to give you room to lift, move, and recover without clutter.',
  },
  {
    number: '03',
    title: 'Supportive & Knowledgeable Trainers',
    detail:
      'Guidance grounded in proper form, steady progression, and attentive floor support for beginners and experienced lifters alike.',
  },
  {
    number: '04',
    title: 'Positive Training Atmosphere',
    detail:
      'A motivating community culture built around consistency, discipline, and showing up stronger every session.',
  },
];

export const FACILITY_CATEGORIES: FacilityCategory[] = [
  {
    id: 'strength-training',
    index: '01',
    title: 'Strength Training',
    subtitle: 'Barbells · Squat Racks · Compound Lifts',
    description:
      'Dedicated strength stations built for foundational compound movements, progressive overload, and controlled heavy lifting.',
    image: '/src/assets/images/facility_strength_rack_1795366718232.jpg',
    imageAlt: 'Illustrative concept visual of strength training squat racks and Olympic barbells',
    isFeatured: true,
  },
  {
    id: 'weight-training',
    index: '02',
    title: 'Weight Training',
    subtitle: 'Free Weights · Dumbbells · Plates',
    description:
      'Organized free-weight racks and benches supporting targeted hypertrophy, unilateral balance, and structured resistance training.',
    image: '/src/assets/images/facility_free_weights_1795366717558.jpg',
    imageAlt: 'Illustrative concept visual of neatly racked dumbbells in a dark gym',
  },
  {
    id: 'fitness-equipment',
    index: '03',
    title: 'Fitness Equipment',
    subtitle: 'Cable Systems · Precision Machines',
    description:
      'Modern, well-maintained resistance and cable machines engineered for smooth biomechanics and consistent tension.',
    image: '/src/assets/images/facility_modern_machines_1795366718258.jpg',
    imageAlt: 'Illustrative concept visual of modern pin-loaded cable towers and gym machines',
  },
  {
    id: 'workout-spaces',
    index: '04',
    title: 'Workout Spaces',
    subtitle: 'Open Floor · Functional Zones',
    description:
      'Spacious, clean training lanes designed for warm-ups, mobility work, conditioning circuits, and unobstructed movement.',
    image: '/src/assets/images/facility_open_workspace_1795366718222.jpg',
    imageAlt: 'Illustrative concept visual of an open functional workout floor and sprint turf',
  },
  {
    id: 'training-environment',
    index: '05',
    title: 'Training Environment',
    subtitle: 'Focused Energy · Motivating Culture',
    description:
      'An uplifting, distraction-free floor atmosphere where supportive coaching and consistent peers keep momentum high.',
    image: '/src/assets/images/facility_training_atmosphere_1795366718426.jpg',
    imageAlt: 'Illustrative concept visual of athletes training with focus in a motivating gym',
  },
];

export const DEFAULT_TRAINER_PLACEHOLDERS: TrainerProfile[] = [
  {
    id: 'trainer-slot-1',
    slotLabel: 'Coach Profile 01 · Editable Placeholder',
    name: '[Trainer Name — Strength Coach]',
    speciality: '[Speciality Placeholder — Strength & Compound Lifts]',
    bio: '[Short biography placeholder: Add verified coaching focus, training philosophy, and floor availability for this trainer.]',
    image: '/src/assets/images/trainer_portrait_strength_1795366718256.jpg',
    imageAlt: 'Illustrative placeholder portrait for Strength Coach profile',
  },
  {
    id: 'trainer-slot-2',
    slotLabel: 'Coach Profile 02 · Editable Placeholder',
    name: '[Trainer Name — Conditioning Coach]',
    speciality: '[Speciality Placeholder — Conditioning & Endurance]',
    bio: '[Short biography placeholder: Add verified coaching focus, session style, and guidance areas for this trainer.]',
    image: '/src/assets/images/trainer_portrait_conditioning_1795366718508.jpg',
    imageAlt: 'Illustrative placeholder portrait for Conditioning Coach profile',
  },
  {
    id: 'trainer-slot-3',
    slotLabel: 'Coach Profile 03 · Editable Placeholder',
    name: '[Trainer Name — Power & Functional]',
    speciality: '[Speciality Placeholder — Functional Fitness & Form]',
    bio: '[Short biography placeholder: Add verified coaching focus, beginner onboarding support, and training approach.]',
    image: '/src/assets/images/trainer_portrait_mobility_1795366718344.jpg',
    imageAlt: 'Illustrative placeholder portrait for Power and Functional Coach profile',
  },
];

export const MEMBERSHIP_OPTIONS: MembershipOption[] = [
  {
    id: 'monthly',
    title: 'Monthly Floor Access',
    cadence: 'Flexible Month-to-Month',
    description:
      'Full access to strength zones, free weights, modern fitness equipment, and open workout spaces.',
    rateNote: 'Enquire at front desk or call for current rates',
  },
  {
    id: 'quarterly',
    title: 'Quarterly Commitment',
    cadence: '3-Month Consistency Block',
    description:
      'Structured three-month training access built to establish lasting gym habits and measurable strength progression.',
    rateNote: 'Enquire for quarterly membership tariff',
  },
  {
    id: 'annual',
    title: 'Annual Power Membership',
    cadence: '12-Month Dedicated Access',
    description:
      'Year-round access to the HANDSTAND training floor with priority onboarding and consistent floor guidance.',
    rateNote: 'Enquire for annual plan details',
  },
  {
    id: 'guided',
    title: 'Guided Floor Coaching',
    cadence: 'Trainer Support Enquiry',
    description:
      'Connect with our floor trainers to discuss personalized form guidance, workout structure, and consistency goals.',
    rateNote: 'Schedule an in-person consultation',
  },
];

export const MEMBER_TESTIMONIALS: MemberTestimonial[] = [
  {
    id: 'story-01',
    index: '01',
    memberName: 'Rohan Naik · Margao',
    membershipFocus: 'Strength Training & Barbell Progression',
    timeframe: '8 Months Consistent',
    headlineResult: 'Built Confident Squat & Deadlift Technique',
    metricLabel: 'Weekly Cadence',
    metricValue: '4 Days/Wk',
    quote:
      'Walking into the 3rd-floor space in Comba immediately feels focused. Having well-maintained racks and trainers who quietly correct your setup kept me progressing without setbacks.',
    beforeContext: 'Inconsistent home workouts with zero barbell confidence.',
    outcomeSummary: 'Four structured strength sessions weekly with measurable compound lift gains.',
  },
  {
    id: 'story-02',
    index: '02',
    memberName: 'Priyanka Desai · Comba',
    membershipFocus: 'Evening Weight Training & Conditioning',
    timeframe: '6 Months Consistent',
    headlineResult: 'Sustained Routine & Daily Energy',
    metricLabel: 'Attendance Streak',
    metricValue: '24 Weeks',
    quote:
      'Clean floors, organized dumbbells, and a welcoming atmosphere make all the difference after a long workday. I stopped skipping sessions because the environment keeps you locked in.',
    beforeContext: 'Struggled to stay regular past the first two weeks at crowded gyms.',
    outcomeSummary: 'Completed 24 consecutive weeks of evening resistance and conditioning work.',
  },
  {
    id: 'story-03',
    index: '03',
    memberName: 'Vikram Kamat · Aquem',
    membershipFocus: 'Functional Spaces & Core Strength',
    timeframe: '10 Months Consistent',
    headlineResult: 'Stronger Posture & Pain-Free Mobility',
    metricLabel: 'Training Focus',
    metricValue: 'Full Body',
    quote:
      'The open workout lanes give you genuine room to warm up, move with kettlebells, and train properly. Trainers take the time to explain why each movement matters.',
    beforeContext: 'Desk stiffness and low core endurance from long hours seated.',
    outcomeSummary: 'Noticeably stronger posture, balanced overhead stability, and steady energy.',
  },
  {
    id: 'story-04',
    index: '04',
    memberName: 'Siddharth Verenkar · Fatorda',
    membershipFocus: 'Hypertrophy & Progressive Overload',
    timeframe: '11 Months Consistent',
    headlineResult: 'Disciplined Split & Measurable Muscle Gain',
    metricLabel: 'Tracked Blocks',
    metricValue: '3 Cycles',
    quote:
      'No gimmicks—just reliable machines, calibrated plates, and people who respect the work. Seeing steady numbers go up in my logbook every month keeps the motivation real.',
    beforeContext: 'Plateaued routine with random exercises and no progression tracking.',
    outcomeSummary: 'Completed three structured hypertrophy blocks with consistent strength increases.',
  },
];


/**
 * Content data type definitions.
 * All visible text in the app is typed through these interfaces.
 */

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface NavigationContent {
  mainNav: NavItem[];
  authButtons: NavItem[];
}

export interface ContactInfo {
  email: string;
  instagram: string;
  socialLinks: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
}

export interface FooterContent {
  contact: ContactInfo;
  newsletter: {
    heading: string;
    description: string;
    placeholder: string;
    buttonText: string;
  };
  copyright: string;
}

export interface HeroContent {
  headline: string;
  subtext: string;
  cta: {
    label: string;
    href: string;
  };
  image: {
    src: string;
    alt: string;
  };
}

export interface ValuePropContent {
  title: string;
  description: string;
  icon: string;
}

export interface FounderStoryContent {
  heading: string;
  quote: string;
  founderName: string;
  founderTitle: string;
  bulletPoints: Array<{
    text: string;
    icon: string;
  }>;
  cta: {
    label: string;
    href: string;
  };
  image: {
    src: string;
    alt: string;
  };
}

export interface JoinUsContent {
  heading: string;
  subtext: string;
  secondParagraph?: string;
  bulletPoints?: string[];
  ctaColumns?: Array<{
    icon: string;
    text: string;
  }>;
  cta: {
    label: string;
    href: string;
  };
  backgroundImage: {
    src: string;
    alt: string;
  };
}

export interface ProfileContent {
  name: string;
  title: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface StepContent {
  stepNumber: string;
  title: string;
  description: string;
}

/** Home page content */
export interface HomeContent {
  hero: HeroContent;
  valuePropositions: ValuePropContent[];
  founderStory: FounderStoryContent;
  joinUs: JoinUsContent;
}

/** About page content */
export interface AboutContent {
  hero: {
    eyebrow?: string;
    title: string;
    quote: string;
  };
  reality: {
    narrative: string;
  };
  signs: Array<{
    icon: string;
    label: string;
  }>;
  pivotalQuestion: {
    headline: string;
    steps: StepContent[];
    subtext: string;
  };
  whyCapturaExists: {
    narrative: string;
    pillars: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    bottomLine: string;
  };
  ourApproach: {
    narrative: string;
    subheading?: string;
    bulletPoints?: string[];
    steps?: StepContent[];
    closingStatement: string;
  };
  ourVision: {
    statement: string;
    closingLine: string;
    image?: {
      src: string;
      alt: string;
    };
  };
  joinUs: JoinUsContent;
}

/** Community page content */
export interface CommunityContent {
  hero: {
    headline: string;
    subtext: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    images: Array<{ src: string; alt: string }>;
  };
  values: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  contentStrategy: {
    subtitle: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  onboardingSteps: StepContent[];
  spotlight: {
    heading: string;
    builders: ProfileContent[];
    cta: { label: string; href: string };
  };
}

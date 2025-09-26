

export type Feature = {
  number: string;
  title: string;
  description: string;
  bgColor: string;
};

export type DashboardFeature = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
};

export type Plan = {
  name: string;
  title: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  popular: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
  category: string;
};

export type Testimonial = {
  id: number;
  name: string;
  title: string;
  company: string;
  content: string;
  avatar: string;
};

export type LanguageData = {
  FeaturesSection: {
    title: string;
    description: string;
    features: Feature[];
  };
  DashboardSection: {
    features: DashboardFeature[];
  };
  PricingSection: {
    title?: string;
    included?: string;
    plans: Plan[];
  };
  FaqSection: {
    title?: string;
    searchPlaceholder?: string;
    noResults?: string;
    faqCategories: string[];
    faqs: FaqItem[];
  };
  TestimonialsSection: {
    title: string;
    titleHighlight: string;
    description: string;
    testimonials: Testimonial[];
  };
  
  [key: string]: unknown;
};

export type MultilingualData = {
  vi: LanguageData;
  en: LanguageData;
};

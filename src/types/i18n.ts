export type Locale = 'en' | 'es';

export interface LocalizedString {
  en: string;
  es: string;
}

export interface CommonTranslations {
  buttons: {
    learnMore: string;
    bookSession: string;
    close: string;
    menu: string;
  };
  metadata: {
    title: string;
    description: string;
  };
  tooltips: {
    holistic: string;
    immersive: string;
    inspiring: string;
    awaken: string;
    wisdom: string;
    mind: string;
    body: string;
    soul: string;
  };
}

export interface NavigationTranslations {
  main: {
    ceremonies: {
      title: string;
      items: {
        cacao: string;
        soundHealing: string;
        fire: string;
        fullMoon: string;
      };
    };
    therapies: {
      title: string;
      items: {
        reiki: string;
        massage: string;
        energyHealing: string;
        breathwork: string;
      };
    };
    retreats: {
      title: string;
      items: {
        weekend: string;
        weekLong: string;
        custom: string;
      };
    };
    about: string;
    contact: string;
  };
  language: {
    toggle: string;
    en: string;
    es: string;
  };
  theme: {
    toggle: string;
    light: string;
    dark: string;
  };
}

export interface HomeTranslations {
  hero: {
    title: {
      prefix: string;
      rotatingWords: string[];
    };
    description: string;
  };
  about: {
    title: string;
    subtitle: string;
    content: {
      intro: string;
      approach: string;
      mission: string;
    };
    stats: {
      experience: {
        value: string;
        label: string;
      };
      people: {
        value: string;
        label: string;
      };
      approach: {
        value: string;
        label: string;
      };
    };
  };
}

export interface ChatTranslations {
  layout: {
    newChat: string;
    searchPlaceholder: string;
    collapse: string;
    menu: {
      history: string;
      settings: string;
    };
    experts: {
      title: string;
      noExperts: string;
    };
  };
  chat: {
    inputPlaceholder: string;
    send: string;
    loading: string;
    errorMessages: {
      failed: string;
      retry: string;
    };
  };
}

export interface TherapistTranslations {
  sections: {
    about: string;
    services: string;
    location: string;
    experience: string;
    testimonials: string;
  };
  appointmentType: {
    virtual: string;
    presencial: string;
    both: string;
  };
  services: {
    duration: string;
    price: string;
    book: string;
    learnMore: string;
  };
  specializations: {
    ayahuasca: string;
    integracion: string;
    'medicina-ancestral': string;
    psychology: string;
    'traditional-practices': string;
  };
  location: {
    address: string;
    hours: string;
    availability: string;
    directions: string;
  };
  experience: {
    years: string;
    certifications: string;
    education: string;
    specialties: string;
  };
  testimonials: {
    title: string;
    rating: string;
    verified: string;
  };
  booking: {
    title: string;
    selectDate: string;
    selectTime: string;
    selectType: string;
    yourInfo: string;
    submit: string;
  };
}

export interface Translations {
  common: CommonTranslations;
  navigation: NavigationTranslations;
  home: HomeTranslations;
  chat: ChatTranslations;
  therapists: TherapistTranslations;
} 
import { Therapist } from '@/types/therapist';

export const therapists: Therapist[] = [
  {
    id: 'henri-gomez',
    name: 'Henri Gomez',
    title: {
      en: 'Ayahuasca Ceremony Guide & Integration Adviser',
      es: 'Guía de Ceremonias de Ayahuasca y Asesor de Integración'
    },
    image: '/images/therapists/henri.jpg',
    specializations: ['ayahuasca', 'integracion', 'medicina-ancestral'],
    bio: {
      en: 'Henri Gomez brings over 20 years of experience in supporting individuals through the transformative journeys of Ayahuasca ceremonies. As a seasoned guide, Henri offers compassionate pre-ceremony preparation and post-ceremony integration sessions. His approach blends indigenous wisdom with modern therapeutic practices, ensuring that every client receives personalized care and holistic support on their path to healing.',
      es: 'Henri Gomez cuenta con más de 20 años de experiencia apoyando a personas en sus transformadores viajes a través de ceremonias de Ayahuasca. Como guía experimentado, Henri ofrece asesoramiento previo a la ceremonia y sesiones de integración post-ceremonia con una alta dosis de compasión. Su enfoque fusiona la sabiduría indígena con prácticas terapéuticas modernas, asegurando que cada persona reciba un cuidado personalizado y un acompañamiento holístico en su camino hacia la sanación.'
    },
    experience: {
      years: 20,
      highlights: [
        {
          en: 'Guided over 1000+ transformative ceremonies',
          es: 'Guiado más de 1000+ ceremonias transformadoras'
        },
        {
          en: 'Developed unique integration methodology',
          es: 'Desarrollado metodología única de integración'
        },
        {
          en: 'Featured in international publications',
          es: 'Destacado en publicaciones internacionales'
        }
      ]
    },
    methodology: {
      en: 'Combining ancestral wisdom with modern integration practices',
      es: 'Combinando sabiduría ancestral con prácticas modernas de integración'
    },
    services: [
      {
        id: 'pre-ceremony',
        name: {
          en: 'Pre-Ceremony Consultation',
          es: 'Consulta Pre-Ceremonia'
        },
        duration: '90 min',
        price: '350000',
        description: {
          en: 'Personalized sessions to help you prepare mentally, spiritually, and physically for the Ayahuasca ceremony.',
          es: 'Sesiones personalizadas para ayudarte a prepararte mental, espiritual y físicamente antes de la ceremonia de Ayahuasca.'
        }
      },
      {
        id: 'integration',
        name: {
          en: 'Post-Ceremony Integration',
          es: 'Integración Post-Ceremonia'
        },
        duration: '120 min',
        price: '400000',
        description: {
          en: 'Supportive guidance to help process, integrate, and make meaning of your ceremony experience.',
          es: 'Orientación y apoyo para procesar, integrar y encontrar significado en tu experiencia ceremonial.'
        }
      }
    ],
    languages: ['Spanish', 'English'],
    certifications: [
      'Certified Ayahuasca Integration Specialist',
      'Indigenous Wisdom Keeper',
      'Holistic Healing Practitioner',
      'Traditional Medicine Guide',
      'Certified Integration Therapist'
    ],
    availability: {
      days: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      hours: '9:00 - 18:00'
    },
    rating: 4.9,
    reviewCount: 128,
    location: 'La Chakana Healing Center',
    link: '/therapists/henri-gomez',
    appointmentType: 'both',
    testimonials: [
      {
        id: '1',
        content: {
          en: "Henri's gentle guidance and deep respect for indigenous wisdom transformed my entire experience. His integration sessions helped me see my journey with clarity and compassion.",
          es: "La guía serena de Henri y su profundo respeto por la sabiduría indígena transformaron mi experiencia. Sus sesiones de integración me ayudaron a ver mi camino con claridad y compasión."
        },
        author: 'Anonymous',
        rating: 5
      }
    ],
    press: [
      {
        title: {
          en: 'Indigenous Runners Journey: A Seven-Month Expedition for Mother Earth',
          es: 'Viaje de los Corredores Indígenas: Una Expedición de Siete Meses por la Madre Tierra'
        },
        source: 'Mongabay',
        url: 'https://mongabay.com/article',
        date: '2023-12-01'
      },
      {
        title: {
          en: 'The Integration of Ancient Wisdom in Modern Healing',
          es: 'La Integración de la Sabiduría Ancestral en la Sanación Moderna'
        },
        source: 'Healing Journal',
        url: 'https://healingjournal.com/article',
        date: '2024-01-15'
      }
    ],
    locations: [
      {
        id: 'chakana-center',
        type: 'physical',
        name: {
          en: 'La Chakana Healing Center',
          es: 'Centro de Sanación La Chakana'
        },
        address: {
          street: 'Calle 123',
          city: 'Bogotá',
          state: 'Cundinamarca',
          country: 'Colombia',
          postalCode: '110111',
          coordinates: {
            lat: 4.6097,
            lng: -74.0817
          }
        },
        operatingHours: {
          monday: { open: '09:00', close: '18:00' },
          wednesday: { open: '09:00', close: '18:00' },
          friday: { open: '09:00', close: '18:00' },
          saturday: { open: '10:00', close: '16:00' }
        },
        availableServices: ['pre-ceremony', 'integration'],
        facilities: [
          'Meditation Room',
          'Private Consultation Rooms',
          'Sacred Ceremony Space',
          'Garden'
        ]
      },
      {
        id: 'virtual-sessions',
        type: 'virtual',
        name: {
          en: 'Online Integration Sessions',
          es: 'Sesiones de Integración en Línea'
        },
        operatingHours: {
          monday: { open: '09:00', close: '18:00' },
          wednesday: { open: '09:00', close: '18:00' },
          friday: { open: '09:00', close: '18:00' },
          saturday: { open: '10:00', close: '16:00' }
        },
        availableServices: ['pre-ceremony', 'integration'],
        virtualPlatform: 'Zoom',
        virtualMeetingInfo: 'Link will be sent 24 hours before the session'
      }
    ]
  },
  {
    id: '2',
    name: 'Marta Lopez',
    title: {
      en: 'Holistic Therapist. How to live in peace, healing the mind, body and soul',
      es: 'Terapeuta Holistica. Como vivir en paz, sanando la mente, el cuerpo y el alma'
    },
    image: '/images/therapists/marta.jpg',
    specializations: ['acupuntura', 'masaje', 'respiracion'],
    bio: {
      en: 'Marta combines Eastern healing arts with modern therapeutic techniques, specializing in acupuncture and therapeutic massage.',
      es: 'Marta une las artes curativas orientales con técnicas terapéuticas modernas, especializándose en acupuntura y masaje terapéutico.'
    },
    experience: {
      years: 15,
      highlights: [
        {
          en: 'Trained in Traditional Chinese Medicine',
          es: 'Formada en Medicina Tradicional China'
        },
        {
          en: 'Certified in various massage techniques',
          es: 'Certificada en varias técnicas de masaje'
        }
      ]
    },
    methodology: {
      en: 'Integrating Eastern healing wisdom with modern therapeutic approaches',
      es: 'Integrando la sabiduría curativa oriental con enfoques terapéuticos modernos'
    },
    services: [
      {
        id: 'acupuncture-1',
        name: {
          en: 'Acupuncture Session',
          es: 'Sesión de Acupuntura'
        },
        duration: '75 min',
        price: '380000',
        description: {
          en: 'Traditional Chinese acupuncture for pain relief and wellness.',
          es: 'Acupuntura tradicional china para el alivio del dolor y el bienestar.'
        }
      },
      {
        id: 'massage-1',
        name: {
          en: 'Therapeutic Massage',
          es: 'Masaje Terapéutico'
        },
        duration: '60 min',
        price: '340000',
        description: {
          en: 'Deep massage combining Eastern and Western techniques.',
          es: 'Masaje profundo que combina técnicas orientales y occidentales.'
        }
      }
    ],
    languages: ['Spanish', 'English'],
    certifications: ['Licensed Acupuncturist', 'Certified Massage Therapist'],
    availability: {
      days: ['Tuesday', 'Thursday', 'Saturday'],
      hours: '10:00 - 18:00'
    },
    rating: 4.8,
    reviewCount: 95,
    location: 'La Chakana Healing Center',
    link: '/therapists/marta-lopez',
    appointmentType: 'presencial',
    locations: [
      {
        id: 'chakana-center',
        type: 'physical',
        name: {
          en: 'La Chakana Healing Center',
          es: 'Centro de Sanación La Chakana'
        },
        address: {
          street: 'Calle 123',
          city: 'Bogotá',
          state: 'Cundinamarca',
          country: 'Colombia',
          postalCode: '110111',
          coordinates: {
            lat: 4.6097,
            lng: -74.0817
          }
        },
        operatingHours: {
          tuesday: { open: '10:00', close: '18:00' },
          thursday: { open: '10:00', close: '18:00' },
          saturday: { open: '10:00', close: '16:00' }
        },
        availableServices: ['acupuncture-1', 'massage-1'],
        facilities: [
          'Treatment Rooms',
          'Relaxation Area',
          'Tea Room'
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Mariana Villamil Rodríguez',
    title: {
      en: 'Therapist and Life Guardian Doula',
      es: 'Terapeuta y Doula Guardiana de la vida'
    },
    image: '/images/therapists/maru.jpg',
    specializations: ['sanacion-sonora', 'yoga', 'meditacion'],
    bio: {
      en: 'Maru is a sound healing practitioner and yoga instructor who creates immersive healing experiences through vibration and movement.',
      es: 'Maru es una practicante de sanación sonora e instructora de yoga que crea experiencias inmersivas de sanación a través de la vibración y el movimiento.'
    },
    experience: {
      years: 10,
      highlights: [
        {
          en: 'Trained in India for sound healing',
          es: 'Formada en India en sanación sonora'
        },
        {
          en: 'Certified yoga instructor with international experience',
          es: 'Instructora de yoga certificada con experiencia internacional'
        }
      ]
    },
    methodology: {
      en: 'Creating transformative experiences through sound vibration and mindful movement',
      es: 'Creando experiencias transformadoras a través de la vibración sonora y el movimiento consciente'
    },
    services: [
      {
        id: 'sound-1',
        name: {
          en: 'Sound Bath Session',
          es: 'Sesión de Baño de Sonido'
        },
        duration: '90 min',
        price: '280000',
        description: {
          en: 'Immersive sound healing experience with Tibetan bowls and gongs.',
          es: 'Experiencia inmersiva de sanación sonora con cuencos tibetanos y gongs.'
        }
      },
      {
        id: 'yoga-1',
        name: {
          en: 'Private Yoga Session',
          es: 'Sesión Privada de Yoga'
        },
        duration: '60 min',
        price: '300000',
        description: {
          en: 'Personalized yoga practice combining movement and meditation.',
          es: 'Práctica de yoga personalizada que combina movimiento y meditación.'
        }
      }
    ],
    languages: ['Spanish', 'English'],
    certifications: ['Sound Healing Practitioner', 'RYT-500 Yoga Teacher'],
    availability: {
      days: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
      hours: '8:00 - 16:00'
    },
    rating: 4.9,
    reviewCount: 87,
    location: 'La Chakana Healing Center',
    link: '/therapists/maru-villamil',
    appointmentType: 'virtual',
    locations: [
      {
        id: 'virtual-studio',
        type: 'virtual',
        name: {
          en: 'Online Healing Space',
          es: 'Espacio de Sanación Virtual'
        },
        operatingHours: {
          monday: { open: '08:00', close: '16:00' },
          wednesday: { open: '08:00', close: '16:00' },
          friday: { open: '08:00', close: '16:00' },
          sunday: { open: '09:00', close: '15:00' }
        },
        availableServices: ['sound-1', 'yoga-1'],
        virtualPlatform: 'Zoom',
        virtualMeetingInfo: 'Session link and preparation instructions will be sent upon booking'
      }
    ]
  }
]; 
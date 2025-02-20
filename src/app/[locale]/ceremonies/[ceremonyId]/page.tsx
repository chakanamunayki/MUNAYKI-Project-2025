import { Metadata } from 'next'
import { type Locale } from '@/types/i18n'
import { CeremonyHero } from '@/components/sections/ceremonies/ceremony-hero'
import { AboutText } from '@/components/sections/ceremonies/about-text'
import { CeremonyVenue } from '@/components/sections/ceremonies/ceremony-venue'
import { CeremonyGuides } from '@/components/sections/ceremonies/ceremony-guides'
import { CeremonyBookingCard } from '@/components/sections/ceremonies/ceremony-booking-card'
import { Benefits } from '@/components/sections/ceremonies/benefits'
import { PreparationTimeline } from '@/components/sections/ceremonies/preparation-timeline'
import { CeremonySchedule } from '@/components/sections/ceremonies/ceremony-schedule'
import { CeremonyDivider } from '@/components/sections/ceremonies/ceremony-divider'
import { Heart, Flower2, Sparkles, Waves, Brain, Network, Infinity } from 'lucide-react'

interface CeremonyPageProps {
  params: {
    locale: Locale
    ceremonyId: string
  }
}

// This is a sample ceremony object. In a real app, this would come from your database or CMS
const ceremony = {
  id: 'itorii-la-chakana-medellin-ayahuasca-feb-17-2025',
  title: {
    en: 'Itorii La Chakana',
    es: 'Itorii La Chakana'
  },
  subtitle: {
    en: 'A Sacred Journey of Healing and Transformation',
    es: 'Un Viaje Sagrado de Sanación y Transformación'
  },
  date: '2025-02-17',
  startTime: '19:00',
  endTime: '23:00',
  location: {
    venue: 'Sacred Valley Temple',
    city: 'Medellín'
  },
  image: {
    src: '/images/ceremonies/chakana-ceremony.jpg',
    alt: {
      en: 'Itorii La Chakana Ceremony',
      es: 'Ceremonia Itorii La Chakana'
    }
  },
  description: {
    en: "Join us for a transformative Ayahuasca ceremony at La Chakana, where ancient wisdom meets modern healing. This sacred ritual, guided by experienced facilitators, offers a profound opportunity for personal growth, emotional healing, and spiritual awakening. In the safe and supportive environment of our temple, you'll experience the powerful medicine of Ayahuasca while being held in a container of love and understanding.",
    es: "Únete a nosotros para una ceremonia transformadora de Ayahuasca en La Chakana, donde la sabiduría ancestral se encuentra con la sanación moderna. Este ritual sagrado, guiado por facilitadores experimentados, ofrece una profunda oportunidad para el crecimiento personal, la sanación emocional y el despertar espiritual. En el ambiente seguro y acogedor de nuestro templo, experimentarás la poderosa medicina de la Ayahuasca mientras te sostienes en un contenedor de amor y comprensión."
  },
  highlights: [
    {
      icon: Heart,
      title: {
        en: 'Emotional Healing',
        es: 'Sanación Emocional'
      },
      description: {
        en: 'Release emotional blockages and heal deep-seated trauma',
        es: 'Libera bloqueos emocionales y sana traumas profundos'
      }
    },
    {
      icon: Flower2,
      title: {
        en: 'Spiritual Growth',
        es: 'Crecimiento Espiritual'
      },
      description: {
        en: 'Connect with your higher self and expand consciousness',
        es: 'Conéctate con tu ser superior y expande tu consciencia'
      }
    },
    {
      icon: Sparkles,
      title: {
        en: 'Personal Insight',
        es: 'Insight Personal'
      },
      description: {
        en: 'Gain clarity and understanding about your life path',
        es: 'Obtén claridad y comprensión sobre tu camino de vida'
      }
    },
    {
      icon: Waves,
      title: {
        en: 'Energy Cleansing',
        es: 'Limpieza Energética'
      },
      description: {
        en: 'Purify your energy field and restore balance',
        es: 'Purifica tu campo energético y restaura el equilibrio'
      }
    }
  ],
  preparation: [
    {
      title: {
        en: 'Dietary Guidelines',
        es: 'Pautas Dietéticas'
      },
      description: {
        en: 'Follow a clean diet for 3 days before the ceremony, avoiding alcohol, caffeine, and heavy foods',
        es: 'Sigue una dieta limpia durante 3 días antes de la ceremonia, evitando alcohol, cafeína y alimentos pesados'
      }
    },
    {
      title: {
        en: 'Mental Preparation',
        es: 'Preparación Mental'
      },
      description: {
        en: 'Set clear intentions and spend time in meditation or nature',
        es: 'Establece intenciones claras y pasa tiempo en meditación o naturaleza'
      }
    },
    {
      title: {
        en: 'Physical Rest',
        es: 'Descanso Físico'
      },
      description: {
        en: 'Ensure you are well-rested and avoid strenuous activities the day before',
        es: 'Asegúrate de estar bien descansado y evita actividades extenuantes el día anterior'
      }
    }
  ],
  pricing: {
    basePrice: 250,
    currency: 'USD'
  },
  capacity: {
    total: 20,
    available: 8
  },
  facilitator: {
    name: 'Maestro Juan Carlos',
    title: 'Shamanic Healer',
    image: '/images/facilitators/juan-carlos.jpg'
  },
  extras: [
    {
      id: "river-meditation",
      title: {
        en: "River Meditation Walk",
        es: "Caminata de Meditación del Río",
      },
      description: {
        en: "A guided meditation walk along the sacred river before the ceremony",
        es: "Una caminata de meditación guiada a lo largo del río sagrado antes de la ceremonia",
      },
      price: {
        amount: 50000,
        currency: "COP",
      },
    },
    {
      id: "breakfast",
      title: {
        en: "Integration Breakfast",
        es: "Desayuno de Integración",
      },
      description: {
        en: "A nutritious breakfast and group integration session after the ceremony",
        es: "Un desayuno nutritivo y sesión de integración grupal después de la ceremonia",
      },
      price: {
        amount: 23000,
        currency: "COP",
      },
    },
    {
      id: "river-cleansing",
      title: {
        en: "River Cleansing Ritual",
        es: "Ritual de Limpieza en el Río",
      },
      description: {
        en: "Traditional river cleansing ritual with medicinal plants",
        es: "Ritual tradicional de limpieza en el río con plantas medicinales",
      },
      price: {
        amount: 45000,
        currency: "COP",
      },
    }
  ]
}

// Add new content sections
const aboutContent = {
  title: {
    en: 'Begin your transformative healing experience',
    es: 'Comienza tu experiencia sanadora transformadora'
  },
  content: {
    en: "Join us for a profound Ayahuasca ceremony, where we will honor this sacred medicine in the beautiful space of La Chakana. The ceremony includes traditional icaros, guided meditation, and a safe space for deep healing and transformation.\n\nIn this sacred space, we facilitate an environment of deep respect and understanding, where each participant is guided with attention and care. Our team of experienced facilitators is dedicated to creating and maintaining a safe and transformative ceremonial container.",
    es: "Únete a nosotros para una profunda ceremonia de Ayahuasca, donde honraremos esta medicina sagrada en el hermoso espacio de La Chakana. La ceremonia incluye icaros tradicionales, meditación guiada y un espacio seguro para la sanación y transformación profunda.\n\nEn este espacio sagrado, facilitamos un ambiente de profundo respeto y comprensión, donde cada participante es guiado con atención y cuidado. Nuestro equipo de facilitadores experimentados está dedicado a crear y mantener un contenedor ceremonial seguro y transformador."
  },
  image: {
    src: '/images/ceremonies/about-ceremony.jpg',
    alt: {
      en: 'Sacred ceremony space at La Chakana',
      es: 'Espacio sagrado de ceremonia en La Chakana'
    }
  }
}

const benefitsContent = {
  title: {
    en: 'Benefits',
    es: 'Beneficios'
  },
  subtitle: {
    en: 'Discover the profound transformations you can experience during the Ayahuasca ceremony',
    es: 'Descubre las profundas transformaciones que puedes experimentar durante la ceremonia de Ayahuasca'
  },
  benefits: [
    {
      icon: Heart,
      title: {
        en: 'Emotional Healing',
        es: 'Sanación Emocional'
      },
      description: {
        en: 'Release emotional blockages and heal past traumas in a safe and supportive environment',
        es: 'Libera bloqueos emocionales y sana traumas pasados en un ambiente seguro y de apoyo'
      }
    },
    {
      icon: Brain,
      title: {
        en: 'Mental Clarity',
        es: 'Claridad Mental'
      },
      description: {
        en: 'Gain deep insights and clarity about your life path and purpose',
        es: 'Obtén perspectivas profundas y claridad sobre el camino y propósito de tu vida'
      }
    },
    {
      icon: Flower2,
      title: {
        en: 'Spiritual Growth',
        es: 'Crecimiento Espiritual'
      },
      description: {
        en: 'Deepen your spiritual connection and self-understanding',
        es: 'Profundiza tu conexión espiritual y comprensión de ti mismo'
      }
    },
    {
      icon: Waves,
      title: {
        en: 'Physical Wellbeing',
        es: 'Bienestar Físico'
      },
      description: {
        en: 'Experience physical healing and renewed vitality',
        es: 'Experimenta sanación física y vitalidad renovada'
      }
    },
    {
      icon: Network,
      title: {
        en: 'Deep Connection',
        es: 'Conexión Profunda'
      },
      description: {
        en: 'Connect deeply with nature, spirit, and your true self',
        es: 'Conéctate profundamente con la naturaleza, el espíritu y tu verdadero ser'
      }
    },
    {
      icon: Infinity,
      title: {
        en: 'Life Integration',
        es: 'Integración en la Vida'
      },
      description: {
        en: 'Learn to integrate insights and changes into your daily life',
        es: 'Aprende a integrar las perspectivas y cambios en tu vida diaria'
      }
    }
  ]
}

const preparationContent = {
  title: {
    en: 'Your Preparation Journey',
    es: 'Tu Camino de Preparación'
  },
  subtitle: {
    en: 'A comprehensive guide to ensure your safety and optimal experience',
    es: 'Una guía completa para garantizar tu seguridad y experiencia óptima'
  },
  personalSession: {
    title: {
      en: 'Personal Preparation Session',
      es: 'Sesión de Preparación Personal'
    },
    description: {
      en: 'Schedule a one-hour session with our holistic therapist to receive personalized guidance and support in preparing for your ceremony. Recommended at least 5 days before.',
      es: 'Programa una sesión personal de una hora con nuestra terapeuta holística para recibir orientación personalizada y apoyo en la preparación para tu ceremonia. Recomendado al menos 5 días antes.'
    },
    price: '180,000 COP'
  },
  timeline: [
    {
      time: {
        en: '2 Weeks Before',
        es: '2 Semanas Antes'
      },
      title: {
        en: 'Begin Diet Modifications',
        es: 'Comienza Modificaciones en la Dieta'
      },
      description: {
        en: 'Start reducing or eliminating caffeine, alcohol, and processed foods. Begin mindful eating practices.',
        es: 'Comienza a reducir o eliminar la cafeína, el alcohol y los alimentos procesados. Inicia una práctica de alimentación consciente.'
      },
      rationale: {
        en: "This initial dietary adjustment helps cleanse your system and prepare your body to receive the medicine. Caffeine and processed foods can interfere with the ceremony's effects and your ability to connect deeply.",
        es: "Este ajuste dietético inicial ayuda a limpiar tu sistema y preparar tu cuerpo para recibir la medicina. La cafeína y los alimentos procesados pueden interferir con los efectos de la ceremonia y tu capacidad de conectar profundamente."
      }
    },
    {
      time: {
        en: '1 Week Before',
        es: '1 Semana Antes'
      },
      title: {
        en: 'Clean Diet',
        es: 'Dieta Limpia'
      },
      description: {
        en: 'Follow a clean diet: vegetables, fruits, whole grains. Avoid red meats, dairy, and fermented foods.',
        es: 'Sigue una dieta limpia: vegetales, frutas, granos integrales. Evita carnes rojas, lácteos y alimentos fermentados.'
      },
      rationale: {
        en: "A clean diet enhances your body's sensitivity to the medicine and reduces potential physical discomfort during the ceremony. Certain foods can interact negatively with the medicine.",
        es: "Una dieta limpia aumenta la sensibilidad de tu cuerpo a la medicina y reduce el potencial malestar físico durante la ceremonia. Ciertos alimentos pueden interactuar negativamente con la medicina."
      }
    },
    {
      time: {
        en: '72 Hours Before',
        es: '72 Horas Antes'
      },
      title: {
        en: 'Strict Abstinence',
        es: 'Abstinencia Estricta'
      },
      description: {
        en: 'Strictly avoid alcohol and recreational substances. Maintain a calm mindset.',
        es: 'Evita estrictamente el alcohol y sustancias recreativas. Mantén una mentalidad tranquila.'
      },
      rationale: {
        en: "This period of abstinence ensures there are no dangerous interactions with the medicine and helps clear your mind for the deep inner work ahead.",
        es: "Este período de abstinencia asegura que no haya interacciones peligrosas con la medicina y ayuda a despejar tu mente para el profundo trabajo interior que se avecina."
      }
    },
    {
      time: {
        en: '48 Hours Before',
        es: '48 Horas Antes'
      },
      title: {
        en: 'Final Preparations',
        es: 'Preparaciones Finales'
      },
      description: {
        en: 'Discontinue any non-essential medication (consult with your doctor). Avoid sexual activity.',
        es: 'Suspende cualquier medicamento no esencial (consulta con tu médico). Evita la actividad sexual.'
      },
      rationale: {
        en: "Some medications can interact with the medicine. Sexual abstinence helps preserve your energy and maintain focus for the ceremony.",
        es: "Algunos medicamentos pueden interactuar con la medicina. La abstinencia sexual ayuda a preservar tu energía y mantener el enfoque para la ceremonia."
      }
    },
    {
      time: {
        en: '24 Hours Before',
        es: '24 Horas Antes'
      },
      title: {
        en: 'Mental Preparation',
        es: 'Preparación Mental'
      },
      description: {
        en: 'Light meals only. Practice meditation or gentle yoga. Set your intentions for the ceremony.',
        es: 'Solo comidas ligeras. Practica meditación o yoga suave. Establece tus intenciones para la ceremonia.'
      },
      rationale: {
        en: "Mental and spiritual preparation is crucial. Setting clear intentions helps guide your journey, while light physical activity helps calm the mind and prepare the body.",
        es: "La preparación mental y espiritual es crucial. Establecer intenciones claras ayuda a guiar tu viaje, mientras que la actividad física suave ayuda a calmar la mente y preparar el cuerpo."
      }
    },
    {
      time: {
        en: 'Ceremony Day',
        es: 'Día de la Ceremonia'
      },
      title: {
        en: 'Final Steps',
        es: 'Pasos Finales'
      },
      description: {
        en: 'Light breakfast only, no lunch. Stay hydrated. Arrive with an open heart and clear mind.',
        es: 'Solo desayuno ligero, sin almuerzo. Mantente hidratado. Llega al lugar con el corazón abierto y la mente clara.'
      },
      rationale: {
        en: "Fasting helps reduce physical discomfort and enhances the medicine's effects. Proper hydration is essential for safety, while maintaining a clear and open mindset helps facilitate a deeper experience.",
        es: "El ayuno ayuda a reducir el malestar físico y mejora los efectos de la medicina. La hidratación adecuada es esencial para la seguridad, mientras que mantener una mentalidad clara y abierta ayuda a facilitar una experiencia más profunda."
      }
    }
  ]
}

// Add venue content
const venueContent = {
  name: 'La Chakana Sacred Valley Temple',
  description: {
    en: "La Chakana Sacred Valley Temple is a sanctuary of healing and transformation nestled in the heart of nature. Our ceremonial space combines traditional sacred architecture with modern comforts, creating the perfect environment for deep spiritual work and healing.",
    es: "El Templo La Chakana del Valle Sagrado es un santuario de sanación y transformación ubicado en el corazón de la naturaleza. Nuestro espacio ceremonial combina la arquitectura sagrada tradicional con comodidades modernas, creando el ambiente perfecto para el trabajo espiritual profundo y la sanación."
  },
  amenities: {
    en: [
      "Sacred ceremonial temple",
      "Meditation gardens",
      "Natural water source",
      "Comfortable resting areas",
      "Clean bathrooms and showers",
      "Purification space",
      "Integration areas",
      "Natural pool"
    ],
    es: [
      "Templo ceremonial sagrado",
      "Jardines de meditación",
      "Fuente de agua natural",
      "Áreas de descanso confortables",
      "Baños y duchas limpias",
      "Espacio de purificación",
      "Áreas de integración",
      "Piscina natural"
    ]
  },
  images: [
    {
      src: "/images/venue/temple-main.jpg",
      alt: "La Chakana Temple Main Hall"
    },
    {
      src: "/images/venue/meditation-garden.jpg",
      alt: "Meditation Gardens"
    },
    {
      src: "/images/venue/water-source.jpg",
      alt: "Natural Water Source"
    },
    {
      src: "/images/venue/resting-area.jpg",
      alt: "Resting Areas"
    }
  ]
}

// Add guides content
const guidesContent = {
  title: {
    en: "Our Experienced Guides",
    es: "Nuestros Guías Experimentados"
  },
  subtitle: {
    en: "Meet our team of experienced guides who will accompany you on your journey",
    es: "Conoce a nuestro equipo de guías experimentados que te acompañarán en tu viaje"
  },
  guides: [
    {
      name: "Marta",
      role: {
        en: "Lead Facilitator",
        es: "Facilitadora Principal"
      },
      bio: {
        en: "With over 15 years of experience in traditional medicine, Marta brings deep wisdom and compassionate guidance to every ceremony.",
        es: "Con más de 15 años de experiencia en medicina tradicional, Marta aporta profunda sabiduría y guía compasiva a cada ceremonia."
      },
      image: "/images/guides/marta.jpg"
    },
    {
      name: "Henri",
      role: {
        en: "Integration Specialist",
        es: "Especialista en Integración"
      },
      bio: {
        en: "Henri specializes in helping participants integrate their experiences into daily life, with a background in psychology and traditional practices.",
        es: "Henri se especializa en ayudar a los participantes a integrar sus experiencias en la vida diaria, con experiencia en psicología y prácticas tradicionales."
      },
      image: "/images/guides/henri.jpg"
    },
    {
      name: "Alexis",
      role: {
        en: "Ceremony Assistant",
        es: "Asistente de Ceremonia"
      },
      bio: {
        en: "Alexis ensures the smooth flow of ceremonies and provides support to participants throughout their journey.",
        es: "Alexis asegura el flujo suave de las ceremonias y brinda apoyo a los participantes durante su viaje."
      },
      image: "/images/guides/alexis.jpg"
    },
    {
      name: "Paulo",
      role: {
        en: "Medicine Man",
        es: "Hombre Medicina"
      },
      bio: {
        en: "Paulo brings ancestral knowledge and healing practices passed down through generations of traditional healers.",
        es: "Paulo trae conocimiento ancestral y prácticas curativas transmitidas a través de generaciones de sanadores tradicionales."
      },
      image: "/images/guides/paulo.jpg"
    },
    {
      name: "Mariane",
      role: {
        en: "Energy Healer",
        es: "Sanadora Energética"
      },
      bio: {
        en: "Mariane combines traditional healing practices with energy work to help participants achieve deep transformation.",
        es: "Mariane combina prácticas curativas tradicionales con trabajo energético para ayudar a los participantes a lograr una transformación profunda."
      },
      image: "/images/guides/mariane.jpg"
    }
  ]
}

export async function generateMetadata({ params }: CeremonyPageProps): Promise<Metadata> {
  // In a real app, fetch the ceremony data here
  // const ceremony = await getCeremony(params.ceremonyId)

  const title = params.locale === 'es' ? 'Ceremonia: ' + ceremony.title[params.locale] : 'Ceremony: ' + ceremony.title[params.locale]
  const description = ceremony.description[params.locale]

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/${params.locale}/ceremonies/${params.ceremonyId}`,
      images: [
        {
          url: ceremony.image.src,
          alt: ceremony.image.alt[params.locale]
        }
      ]
    },
    alternates: {
      canonical: `/${params.locale}/ceremonies/${params.ceremonyId}`,
      languages: {
        'en': `/en/ceremonies/${params.ceremonyId}`,
        'es': `/es/ceremonias/${params.ceremonyId}`
      }
    }
  }
}

export default async function CeremonyPage({
  params: { locale, ceremonyId },
}: CeremonyPageProps) {
  // In a real app, fetch the ceremony data here
  // const ceremony = await getCeremony(ceremonyId)

  return (
    <main className="space-y-20 pb-20">
      <CeremonyHero 
        ceremony={ceremony}
        locale={locale}
      />
      <CeremonyDivider locale={locale} />
      <section className="container">
        <AboutText {...aboutContent} locale={locale} />
      </section>
      <section className="container">
        <CeremonyVenue locale={locale} venue={venueContent} />
      </section>
      <section className="container">
        <Benefits {...benefitsContent} locale={locale} />
      </section>
      <section className="container">
        <PreparationTimeline {...preparationContent} locale={locale} />
      </section>
      {/* 🔒 PROTECTED STRUCTURE - DO NOT MODIFY
          This layout is carefully designed to maintain the booking card's sticky behavior
          and proper grid layout. See .cursorrules/protected-components.md */}
      <div className="relative">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CeremonySchedule locale={locale} />
              <CeremonyGuides locale={locale} {...guidesContent} />
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* 🔒 PROTECTED COMPONENT - DO NOT DUPLICATE OR MODIFY */}
                <CeremonyBookingCard
                  basePrice={130000}
                  currency="COP"
                  capacity={{ total: 12, available: 5 }}
                  extras={ceremony.extras}
                  locale={locale}
                  ceremonyId={ceremonyId}
                  ceremonyDetails={{
                    title: ceremony.title[locale],
                    date: ceremony.date,
                    time: ceremony.startTime
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 
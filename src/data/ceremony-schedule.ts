import { CeremonySchedule } from "@/types/ceremony-schedule";

export const ceremonySchedule: CeremonySchedule = {
  title: {
    en: "Schedule",
    es: "Cronograma",
  },
  subtitle: {
    en: "A night journey of transformation and healing",
    es: "El viaje de una noche de transformación y sanación",
  },
  events: [
    {
      id: "river-meditation",
      time: "15:00",
      title: {
        en: "River Meditation Walk",
        es: "Caminata de Meditación del Río",
      },
      description: {
        en: "Meditation on the ancestral route with Marta. A guided journey to connect with nature",
        es: "Meditación en la ruta ancestral con Marta. Un viaje guiado para conectar con la naturaleza",
      },
      isOptional: true,
      price: {
        amount: 50000,
        currency: "COP",
      },
      hasMoreDetails: true,
      order: 1,
      category: "meditation",
      duration: "1 hour",
      location: {
        name: "Sacred River Path",
        indoorOutdoor: "outdoor",
      },
      facilitators: [
        {
          name: "Marta Silva",
          role: "Meditation Guide",
          image: "/images/facilitators/marta.jpg",
        },
      ],
      preparation: {
        items: [
          "Comfortable walking shoes",
          "Light, comfortable clothing",
          "Water bottle",
          "Small towel",
        ],
        instructions: "Wear light, breathable clothing suitable for walking. Bring water and be prepared for outdoor meditation.",
      },
    },
    {
      id: "arrival",
      time: "18:00",
      title: {
        en: "Arrival and Welcome",
        es: "Llegada y Bienvenida",
      },
      description: {
        en: "Arrive at the ceremonial space. Meet your guides and fellow participants",
        es: "Llega al espacio ceremonial. Conoce a tus guías y compañeros participantes",
      },
      isOptional: false,
      order: 2,
      category: "preparation",
      duration: "30 minutes",
      location: {
        name: "Main Temple",
        indoorOutdoor: "indoor",
      },
      preparation: {
        items: [
          "Ceremony attire",
          "Journal",
          "Personal items",
        ],
        instructions: "Arrive in comfortable, clean clothing. Bring any personal items you'll need for the night.",
      },
    },
    {
      id: "opening-circle",
      time: "19:00",
      title: {
        en: "Opening Circle",
        es: "Círculo de Apertura",
      },
      description: {
        en: "Share intentions, receive guidance and prepare for the ceremony",
        es: "Comparte intenciones, recibe guía y prepárate para la ceremonia",
      },
      isOptional: false,
      order: 3,
      category: "ceremony",
      duration: "2 hours",
      location: {
        name: "Sacred Circle",
        indoorOutdoor: "both",
      },
      facilitators: [
        {
          name: "Maestro Juan",
          role: "Lead Facilitator",
          image: "/images/facilitators/juan.jpg",
        },
        {
          name: "Maria Luna",
          role: "Support Facilitator",
          image: "/images/facilitators/maria.jpg",
        },
      ],
    },
    {
      id: "sacred-space",
      time: "21:00",
      title: {
        en: "Sacred Space",
        es: "Espacio Sagrado",
      },
      description: {
        en: "Cleansing rituals and creation of ceremonial container. Ancestral washing with medicinal plants",
        es: "Rituales de limpieza y creación del contenedor ceremonial. Lavado ancestral con plantas medicinales",
      },
      isOptional: false,
      order: 4,
      category: "ceremony",
      duration: "2 hours",
      location: {
        name: "Main Temple",
        indoorOutdoor: "indoor",
      },
    },
    {
      id: "ceremony-start",
      time: "23:00",
      title: {
        en: "Ceremony Begins",
        es: "Inicio de la Ceremonia",
      },
      description: {
        en: "Medicine is served. Entry into sacred space, prayers and intentions",
        es: "Se sirve la medicina. Entrada al espacio sagrado, oraciones e intenciones",
      },
      isOptional: false,
      order: 5,
      category: "ceremony",
      duration: "1 hour",
      location: {
        name: "Main Temple",
        indoorOutdoor: "indoor",
      },
    },
    {
      id: "icaros",
      time: "00:00",
      title: {
        en: "Icaros and Healing",
        es: "Icaros y Sanación",
      },
      description: {
        en: "Traditional songs and healing work throughout the night",
        es: "Canciones tradicionales y trabajo de sanación durante la noche",
      },
      isOptional: false,
      order: 6,
      category: "ceremony",
      duration: "3 hours",
      location: {
        name: "Main Temple",
        indoorOutdoor: "indoor",
      },
    },
    {
      id: "second-medicine",
      time: "03:00",
      title: {
        en: "Second Medicine",
        es: "Segunda Medicina",
      },
      description: {
        en: "Second serving of medicine",
        es: "Segunda toma de medicina",
      },
      isOptional: false,
      order: 7,
      category: "ceremony",
      duration: "1 hour",
      location: {
        name: "Main Temple",
        indoorOutdoor: "indoor",
      },
    },
    {
      id: "plant-bath",
      time: "04:00",
      title: {
        en: "Plant Bath and Ritual",
        es: "Baño de Plantas y Ritual",
      },
      description: {
        en: "Plant bath and ritual ceremony with music and chants",
        es: "Baño de plantas y ceremonia ritual de música y cantos",
      },
      isOptional: false,
      order: 8,
      category: "ceremony",
      duration: "2 hours",
      location: {
        name: "Cleansing Area",
        indoorOutdoor: "both",
      },
    },
    {
      id: "breakfast",
      time: "06:30",
      title: {
        en: "Breakfast",
        es: "Desayuno",
      },
      description: {
        en: "A delicious and nutritious breakfast served in La Chakana's natural pool area where we can reflect on the ceremony as a group",
        es: "Un desayuno delicioso y nutritivo servido en el área de la piscina natural de La Chakana donde podemos reflexionar sobre la ceremonia en grupo",
      },
      isOptional: true,
      price: {
        amount: 23000,
        currency: "COP",
      },
      hasMoreDetails: true,
      order: 9,
      category: "meal",
      duration: "1 hour",
      location: {
        name: "Pool Area",
        indoorOutdoor: "outdoor",
      },
    },
    {
      id: "river-cleansing",
      time: "09:00",
      title: {
        en: "Ancestral Natural River Cleansing",
        es: "Limpieza Ancestral Natural del Río",
      },
      description: {
        en: "An ancestral plant washing to provide nutrition and essential elements to body and soul. To be held at La Chakana's natural pool",
        es: "Un lavado con plantas ancestrales para proporcionar nutrición y elementos esenciales al cuerpo y alma. Para estar en la piscina natural de La Chakana",
      },
      isOptional: true,
      price: {
        amount: 45000,
        currency: "COP",
      },
      hasMoreDetails: true,
      order: 10,
      category: "integration",
      duration: "1.5 hours",
      location: {
        name: "Natural Pool",
        indoorOutdoor: "outdoor",
      },
    },
  ],
}; 
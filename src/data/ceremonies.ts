import { Ceremony } from '@/types';

export const ceremonies: Ceremony[] = [
  {
    id: '1',
    type: 'ayahuasca',
    title: {
      en: 'Sacred Ayahuasca Ceremony',
      es: 'Ceremonia Sagrada de Ayahuasca'
    },
    date: '15 de Marzo, 2024',
    time: '19:00 - 6:00',
    image: '/images/ceremonies/ayahuasca.jpg',
    description: {
      en: 'A profound journey of healing and self-discovery guided by experienced shamans in a safe and sacred space.',
      es: 'Un profundo viaje de sanación y autodescubrimiento guiado por chamanes experimentados en un espacio sagrado y seguro.'
    },
    location: 'Valle Sagrado La Chakana',
    price: '1.400.000',
    capacity: 12,
    spotsLeft: 5,
    status: 'upcoming',
    link: '/ceremonies/sacred-ayahuasca-ceremony'
  },
  {
    id: '2',
    type: 'wim-hof',
    title: {
      en: 'Wim Hof Water Therapy',
      es: 'Terapia de Agua Wim Hof'
    },
    date: '18 de Marzo, 2024',
    time: '6:00 - 9:00',
    image: '/images/ceremonies/wim-hof.jpg',
    description: {
      en: 'Experience the transformative power of cold exposure and breathwork with certified Wim Hof Method instructors.',
      es: 'Experimenta el poder transformador de la exposición al frío y la respiración con instructores certificados del Método Wim Hof.'
    },
    location: 'Río Sagrado La Chakana',
    price: '480.000',
    capacity: 15,
    spotsLeft: 10,
    status: 'upcoming',
    link: '/ceremonies/wim-hof-therapy'
  },
  {
    id: '3',
    type: 'women-circle',
    title: {
      en: "Women's Sacred Circle",
      es: 'Círculo Sagrado de Mujeres'
    },
    date: '20 de Marzo, 2024',
    time: '17:00 - 20:00',
    image: '/images/ceremonies/women-circle.jpg',
    description: {
      en: 'A sacred space for women to connect, share, and heal together through ritual, meditation, and sacred practices.',
      es: 'Un espacio sagrado para que las mujeres se conecten, compartan y sanen juntas a través de rituales, meditación y prácticas sagradas.'
    },
    location: 'Jardín La Chakana',
    price: '200.000',
    capacity: 15,
    spotsLeft: 8,
    status: 'upcoming',
    link: '/ceremonies/womens-circle'
  },
  {
    id: '4',
    type: 'meditation',
    title: {
      en: 'Sacred River Meditation Walk',
      es: 'Caminata Meditativa del Río Sagrado'
    },
    date: '22 de Marzo, 2024',
    time: '7:00 - 10:00',
    image: '/images/ceremonies/river-meditation.jpg',
    description: {
      en: 'A mindful journey along our sacred river, combining walking meditation, nature connection, and energy alignment.',
      es: 'Un viaje consciente a lo largo de nuestro río sagrado, combinando meditación caminando, conexión con la naturaleza y alineación energética.'
    },
    location: 'Sendero del Río La Chakana',
    price: '240.000',
    capacity: 12,
    spotsLeft: 6,
    status: 'upcoming',
    link: '/ceremonies/river-meditation'
  },
  {
    id: '5',
    type: 'holistic-networking',
    title: {
      en: 'Holistic Wellness Gathering',
      es: 'Encuentro de Bienestar Holístico'
    },
    date: '25 de Marzo, 2024',
    time: '15:00 - 19:00',
    image: '/images/ceremonies/networking.jpg',
    description: {
      en: 'Connect with like-minded individuals in a sacred space, sharing wisdom and building meaningful relationships.',
      es: 'Conéctate con personas afines en un espacio sagrado, compartiendo sabiduría y construyendo relaciones significativas.'
    },
    location: 'Salón Principal La Chakana',
    price: '200.000',
    capacity: 30,
    spotsLeft: 15,
    status: 'upcoming',
    link: '/ceremonies/holistic-networking'
  },
  {
    id: '6',
    type: 'ayahuasca',
    title: {
      en: 'Full Moon Ayahuasca Ceremony',
      es: 'Ceremonia de Ayahuasca Luna Llena'
    },
    date: '25 de Marzo, 2024',
    time: '19:00 - 6:00',
    image: '/images/ceremonies/full-moon.jpg',
    description: {
      en: 'A special ceremony aligned with the full moon energy for deeper connection and transformation.',
      es: 'Una ceremonia especial alineada con la energía de la luna llena para una conexión y transformación más profunda.'
    },
    location: 'Valle Sagrado La Chakana',
    price: '1.400.000',
    capacity: 12,
    spotsLeft: 0,
    status: 'full',
    link: '/ceremonies/full-moon-ayahuasca-ceremony'
  }
]; 
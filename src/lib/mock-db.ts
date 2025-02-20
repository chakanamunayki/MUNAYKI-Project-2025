import { type User } from '@/types/auth';

interface UserWithPassword extends User {
  password: string;
}

// Mock database for development
class MockDatabase {
  private users: UserWithPassword[] = [];
  private bookings: any[] = [];
  private ceremonies: any[] = [];

  constructor() {
    // Initialize with demo data
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // Demo user
    const demoUser = {
      id: 'user_demo',
      email: 'demo@example.com',
      name: 'Demo User',
      password: 'demo123',
      createdAt: new Date().toISOString(),
    };
    this.users.push(demoUser);

    // Demo bookings
    const demoBookings = [
      {
        bookingReference: 'BK-DEM123456',
        userId: 'user_demo',
        ceremonyId: 'ceremony_1',
        fullName: 'Demo User',
        email: 'demo@example.com',
        phone: '+1234567890',
        gender: 'female',
        age: '30',
        emergencyContact: {
          name: 'Emergency Contact',
          phone: '+1987654321',
          relationship: 'Family',
        },
        hasMedicalConditions: false,
        hasMedications: false,
        hasAllergies: false,
        hasDietaryRestrictions: true,
        dietaryRestrictionsDetails: 'Vegetarian',
        bookingDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        status: 'active',
        paymentStatus: 'completed',
        totalAmount: 150,
        currency: 'USD',
      },
      {
        bookingReference: 'BK-DEM789012',
        userId: 'user_demo',
        ceremonyId: 'ceremony_2',
        fullName: 'Demo User',
        email: 'demo@example.com',
        phone: '+1234567890',
        gender: 'female',
        age: '30',
        emergencyContact: {
          name: 'Emergency Contact',
          phone: '+1987654321',
          relationship: 'Family',
        },
        hasMedicalConditions: false,
        hasMedications: false,
        hasAllergies: false,
        hasDietaryRestrictions: true,
        dietaryRestrictionsDetails: 'Vegetarian',
        bookingDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        status: 'active',
        paymentStatus: 'pending',
        totalAmount: 200,
        currency: 'USD',
      },
    ];
    this.bookings.push(...demoBookings);

    // Demo ceremonies
    const demoCeremonies = [
      {
        id: 'ceremony_1',
        title: 'Cacao Ceremony',
        description: 'A heart-opening ceremonial cacao experience',
        date: '2024-04-15',
        time: '19:00',
        duration: 120,
        capacity: { total: 15, available: 8 },
        price: { amount: 150, currency: 'USD' },
      },
      {
        id: 'ceremony_2',
        title: 'Sound Healing',
        description: 'Deep relaxation through sound vibrations',
        date: '2024-04-20',
        time: '18:30',
        duration: 90,
        capacity: { total: 12, available: 5 },
        price: { amount: 120, currency: 'USD' },
      },
    ];
    this.ceremonies.push(...demoCeremonies);
  }

  findUserByEmail(email: string) {
    return this.users.find(user => user.email === email);
  }

  createUser(user: UserWithPassword) {
    this.users.push(user);
    return user;
  }

  getAllUsers() {
    return this.users;
  }

  // Booking methods
  createBooking(booking: any) {
    this.bookings.push(booking);
    return booking;
  }

  getBookingsByUserId(userId: string) {
    return this.bookings.filter(booking => booking.userId === userId);
  }

  getBookingByReference(reference: string) {
    return this.bookings.find(booking => booking.bookingReference === reference);
  }

  // Ceremony methods
  getCeremonies() {
    return this.ceremonies;
  }

  getCeremonyById(id: string) {
    return this.ceremonies.find(ceremony => ceremony.id === id);
  }
}

// Export a singleton instance
export const mockDb = new MockDatabase(); 
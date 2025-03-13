# Booking System Optimization Todo List

## 0. Authentication Flow Optimization (High Priority)
- [x] Modify the "Book Now" button to trigger authentication only
- [x] Create a simple loading page/component to show during authentication
- [x] Only load the booking form after successful authentication
- [x] Update the authentication flow to use a redirect pattern
- [x] Store the intended destination (booking form) in the session/localStorage
- [x] After successful auth, retrieve destination and redirect
- [x] Create a lightweight "AuthenticatingPage" component
- [x] Show clear loading indicators during the authentication process

## 1. Component Extraction and Structure
- [ ] Extract `PersonalInfoStep` component to `src/components/booking/steps/personal-info-step.tsx`
- [ ] Extract `AdditionalParticipantsStep` component to `src/components/booking/steps/additional-participants-step.tsx`
- [ ] Extract `PaymentInfoStep` component to `src/components/booking/steps/payment-info-step.tsx`
- [ ] Create a `BookingContext` in `src/contexts/booking-context.tsx` to manage shared state
- [ ] Refactor `multi-booking-form.tsx` to use the new components and context

## 2. Form Validation Improvements
- [ ] Implement react-hook-form for robust form validation
- [ ] Add inline validation feedback (replace alert() messages)
- [ ] Create reusable validation schemas for each step
- [ ] Add field-level error messages with proper styling

## 3. Database Integration and Error Handling
- [ ] Implement the `insert_test_booking` SQL function for more robust database operations
- [ ] Add proper error handling with user-friendly messages
- [ ] Implement transaction support for multi-step operations
- [ ] Add retry logic for failed API calls

## 4. User Experience Enhancements
- [ ] Improve loading states with better visual indicators
- [ ] Add confirmation dialogs for important actions
- [ ] Enhance mobile responsiveness
- [ ] Implement better progress saving between sessions

## 5. Testing and Quality Assurance
- [ ] Add unit tests for utility functions (pricing-calculator, currency-formatter)
- [ ] Add integration tests for the booking flow
- [ ] Implement end-to-end testing for critical user journeys
- [ ] Add accessibility testing and improvements

## 6. Performance Optimizations
- [ ] Optimize state management to reduce unnecessary re-renders
- [ ] Implement proper memoization for expensive calculations
- [ ] Optimize database queries and API calls
- [ ] Add proper loading and error states

## 7. Documentation
- [ ] Update component documentation
- [ ] Add inline code comments for complex logic
- [ ] Create a booking flow diagram
- [ ] Document the database schema and relationships

## Starting Point for Next Phase
1. Begin with component extraction and structure
2. Extract the PersonalInfoStep component first
3. Create the BookingContext to manage shared state
4. Test thoroughly before moving to the next component

## Completed Work
1. Authentication Flow Optimization (March 2024)
   - Added loading indicators to "Book Now" buttons
   - Created AuthenticatingPage component for smooth authentication flow
   - Implemented LoadingOverlay component for visual feedback
   - Updated redirect patterns to preserve booking information
   - Improved user experience during authentication process

## Notes on SQL Function
We already have an `insert_test_booking` SQL function that can be used for more robust database operations. This function:
- Takes a JSONB object with booking data
- Validates required fields
- Inserts the booking into the database
- Returns the inserted row or an error message

This function can be used to bypass TypeScript type issues in the client code and provide better error handling. 
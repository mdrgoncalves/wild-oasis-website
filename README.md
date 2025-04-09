# The Wild Oasis Hotel Website 🌴

A modern web application for managing hotel reservations and guest information.

## Project Requirements

### Main Features

- [x] Users of the app are potential guests and actual guests.

### About Feature

- [ ] Guests should be able to learn all about the Wild Oasis Hotel.

### Cabins Feature

- [ ] Guests should be able to get information about each cabin and see booked dates.
- [ ] Guests should be able to filter cabins by their maximum guest capacity.

### Reservations Feature

- [ ] Guests should be able to reserve a cabin for a certain date range.
- [ ] Reservations are not paid online. Payments will be made at the property upon arrival. Therefore, new reservations should be set to "unconfirmed".
- [ ] Guests should be able to view all their past and future reservations.
- [ ] Guests should be able to update or delete a reservation.

### Authentication Feature

- [ ] Guests need to sign up and log in before they can reserve a cabin and perform any operation.
- [ ] On sign up, each guest should get a profile in the DB.

### Profile Feature

- [ ] Guests should be able to set and update basic data about their profile to make check-in at the hotel faster.

## Features & Pages

### Home

- Homepage (`/`)

### About

- About Page (`/about`)

### Cabins

- Cabin Overview (`/cabins/`)
- Cabin Detail (`/cabins/:cabinId`)

### Reservations

- Cabin Detail (`/cabins/:cabinId`) | FOR RESERVATION
- Reservation List (`/account/reservations`)
- Edit Reservation (`/account/reservations/edit`)

### Authentication

- Login (`/login`)

### Profile

- Update Profile (`/account/profile`)

## Technologies Used

- Next.js 14.2.26
- React 18
- TypeScript
- TailwindCSS
- Supabase (Backend)

## Project Setup

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates the production build
- `npm run start` - Starts the production server
- `npm run lint` - Runs linting checks

### Project Structure

```
app/
  ├── _components/     # Reusable components
  ├── _lib/           # Utilities and services
  ├── _styles/        # Global styles and Tailwind configurations
  └── (routes)/       # Application pages and routes
```

### Environment Variables

Create a `.env.local` file in the project root with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
```

### Styling

The project uses TailwindCSS for styling, with a custom color palette:

- Primary Colors: Blue tones
- Accent Colors: Beige/brown tones

### Database

The project uses Supabase as the backend, with the following main tables:

- `cabins`: Cabin information
- `bookings`: Guest reservations
- `guests`: Guest data
- `settings`: General system settings

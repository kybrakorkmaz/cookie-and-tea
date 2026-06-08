# Cookie and Tea

A creator support platform built with React and Vite. Cookie and Tea allows creators to build meaningful connections with their supporters through donations and supportive messages.

## Overview

Cookie and Tea is a web application similar to Buy Me a Coffee or Ko-fi, designed specifically for creators who want to receive support from their community. Unlike traditional social platforms that incentivize engagement metrics, Cookie and Tea focuses on genuine creator support.

### Key Features

- Creator profiles with customizable information
- Three donation tier options (5, 7, and 12 dollars)
- Support messages with donations
- Feed displaying creator content and supporter activity
- Activity tracking for donations and support messages
- User authentication and authorization
- Creator discovery and follower system
- Content sharing (text, images, and videos)

### Design Philosophy

This platform intentionally excludes "like" functionality and nested comments to prevent distraction from the core purpose of supporting creators. By removing vanity metrics, the platform encourages meaningful interactions focused on genuine support rather than engagement numbers.

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A modern web browser

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd cookie-and-tea
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env` and update the values with your configuration:
   ```bash
   cp .env.example .env
   ```

### Development

Start the development server (Vite):
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port)

### Building for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page-level components
├── api/              # API integration and axios configuration
├── context/          # React context for state management
├── helpers/          # Utility functions
├── validations/      # Input validation schemas
├── constants/        # Application constants
├── index.css         # Global styles and color palette
└── main.jsx          # Application entry point
```

### Key Pages

- **Home**: Landing page for new users
- **Feed**: Displays creator content and supporter activity
- **Profile**: Creator profile page with biography and support options
- **Posts**: Creator's content management
- **Activity**: User activity tracking and notifications
- **People**: Creator discovery and follower management
- **Settings**: User account settings
- **About**: Platform information and FAQ
- **YourPassions**: Creator onboarding and profile setup

---

## Technology Stack

### Frontend Framework
- React 19: Modern UI library with hooks
- Vite: Lightning-fast build tool and dev server

### Styling
- Tailwind CSS 4: Utility-first CSS framework
- Emotion: CSS-in-JS for component styling
- Material-UI Icons: Icon library

### State Management
- React Context API: Built-in state management

### Animations & Effects
- Framer Motion: React animation library
- GSAP: Animation and interaction library

### Form Management & Validation
- Zod: Runtime schema validation
- React Hook Form: Form state management (via Emotion integration)

### HTTP Client
- Axios: Promise-based HTTP client

### Additional Libraries
- React Router: Client-side routing
- EmailJS: Client-side email sending
- React Icons: Icon library

### Development Tools
- ESLint: Code quality and style
- WebStorm: IDE (recommended)

---

## Code Quality

### Linting

Check code quality:
```bash
npm run lint
```

---

## Environment Configuration

Environment variables are managed through `.env` files. Use the `.env.example` file as a reference template.

### Key Environment Variables

- `VITE_API_BASE_URL`: Backend API endpoint
- `VITE_EMAILJS_SERVICE_ID`: EmailJS service identifier
- `VITE_EMAILJS_TEMPLATE_ID`: EmailJS email template identifier
- `VITE_EMAILJS_PUBLIC_KEY`: EmailJS public key

---

## API Integration

API calls are configured and managed through:
- `src/api/axios.js`: Axios instance with base configuration and interceptors

All backend endpoints are called through this centralized configuration to ensure consistency and ease of maintenance.

---

## Validation

User input validation is handled through Zod schemas:
- `src/validations/userRegisterLoginValidation.js`: Authentication validation
- `src/validations/sendEmailValidation.js`: Email validation
- `src/validations/envValidation.js`: Environment variable validation

---

## Design & User Experience

### Design Tools
- Figma: UI/UX design and prototyping ([Cookie and Tea Design](https://www.figma.com/design/RjrtJpLfLmu4fB0rpPdoM5/cookie-and-tea))

### Color Palette & Typography
Global styles, color palette, and typography are defined in `src/index.css`

### Component Design Patterns
- Responsive design across all screen sizes
- Consistent hover effects and interactive states
- Accessible color contrasts and element sizing

---

## Notifications

Real-time notification system for:
- Donations received
- New support messages
- Follower actions
- Activity updates

Notifications are managed through:
- Helper functions in `src/helpers/followingNotifications.js`
- Notification component in `src/components/Notifications.jsx`

---

## Donation System

### Donation Tiers

Users can choose one of three support levels:
- Tea option: $5
- Cookie option: $7
- Both options: $12

Donation processing is handled through the backend API with optional support messages included.

---

## Email Communication

Email functionality is implemented through:
- EmailJS integration for client-side email sending
- Nodemailer on backend for automated email notifications
- Validation schemas for email input

---

## Contributing

When contributing to this project:

1. Follow the existing code structure and naming conventions
2. Run ESLint before committing
3. Ensure responsive design works across different screen sizes
4. Maintain consistency with the design system in Figma
5. Use meaningful commit messages

---

## License

ISC

---

## Support & Resources

- Design reference: [Figma Project](https://www.figma.com/design/RjrtJpLfLmu4fB0rpPdoM5/cookie-and-tea)
- Backend repository: [cookie-and-tea-backend](https://github.com/kybrakorkmaz/cookie-and-tea-backend)
- Issue tracker: [GitHub Issues](https://github.com/kybrakorkmaz/cookie-and-tea/issues) 

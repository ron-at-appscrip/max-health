# MaxHealth Broker Portal

A modern React application built with TypeScript, Tailwind CSS, Lucide React icons, and shadcn/ui components for the MaxHealth Broker Portal authentication system.

## 🚀 Features

### Authentication System
- **Login Page** (`/login`) - Secure broker authentication
- **Registration Page** (`/register`) - Broker onboarding with admin approval workflow
- **Dashboard** (`/dashboard`) - Post-login broker portal
- **Form Validation** - Real-time validation using Zod schemas
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI/UX** - Beautiful design with smooth animations

### Technical Features
- **React 18** with TypeScript for type safety
- **Tailwind CSS v3** for utility-first styling
- **Lucide React** for beautiful, customizable icons
- **shadcn/ui** components for consistent, accessible UI
- **React Hook Form** with Zod validation
- **React Router** for client-side routing
- **Radix UI** for accessibility and advanced components

## 🛠️ Tech Stack

- React 18
- TypeScript
- Tailwind CSS v3
- Lucide React Icons
- shadcn/ui Components
- React Hook Form
- Zod Validation
- React Router DOM
- Radix UI Primitives

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd max-life-broker-portal
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🎯 Project Structure

```
src/
├── components/
│   └── ui/           # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── checkbox.tsx
│       └── select.tsx
├── pages/            # Application pages
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── DashboardPage.tsx
├── lib/
│   └── utils.ts      # Utility functions
├── App.tsx           # Main application with routing
├── index.tsx         # Application entry point
└── index.css         # Global styles with Tailwind
```

## 🔐 Authentication Flow

### Login Page (`/login`)
- **URL**: `https://portal.maxhealth.ae/auth/login`
- **Features**:
  - Email and password validation
  - Show/hide password toggle
  - Remember me checkbox
  - Forgot password link
  - Get Started CTA (navigates to registration)
  - Real-time form validation
  - Loading states and error handling

**Demo Credentials**:
- Email: `demo@maxhealth.ae`
- Password: `password123`

### Registration Page (`/register`)
- **URL**: `https://portal.maxhealth.ae/auth/register`
- **Form Fields**:
  - Title dropdown (Mr./Mrs./Ms.)
  - First Name, Middle Name, Last Name
  - Email Address (validated format)
  - Mobile Number with country code (defaults to UAE +971)
  - Company Name, Department, Position
  - Insurance Authorization Registration Number
- **Workflow**:
  - Form validation on input
  - Submission to admin team for review
  - Confirmation message with next steps
  - 48-hour review timeline
  - Email notification upon approval

### Dashboard (`/dashboard`)
- **Post-login broker portal**
- **Features**:
  - Welcome header with logout
  - Statistics cards (clients, revenue, growth)
  - Feature overview
  - Responsive layout

## 🎨 UI Components

### Form Components
- **Input** - Text fields with validation states
- **Select** - Dropdown menus for title and country code
- **Checkbox** - Remember me functionality
- **Button** - Multiple variants (default, outline, loading states)
- **Label** - Form field labels
- **Card** - Content containers

### Layout Components
- **Responsive Design** - Mobile-first approach
- **Split Layout** - Left branding panel, right form panel
- **Navigation** - Header with logout functionality
- **Footer** - Company information and legal links

## 🔧 Configuration

### Tailwind CSS
- Custom color scheme with CSS variables
- Dark mode support (ready for implementation)
- Responsive breakpoints
- Custom animations and transitions

### Form Validation
- **Zod Schemas** for type-safe validation
- **Real-time validation** with React Hook Form
- **Error messages** for all required fields
- **Loading states** during form submission

### Routing
- **React Router DOM** for client-side navigation
- **Protected routes** (ready for implementation)
- **Redirect logic** for authentication flow

## 🚀 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🎨 Customization

### Adding New shadcn/ui Components

1. Install the component:
```bash
npx shadcn@latest add [component-name]
```

2. Import and use in your components:
```tsx
import { ComponentName } from "@/components/ui/component-name"
```

### Adding New Lucide Icons

1. Import the icon from lucide-react:
```tsx
import { IconName } from 'lucide-react'
```

2. Use in your JSX:
```tsx
<IconName className="h-6 w-6" />
```

### Styling with Tailwind CSS

The project uses Tailwind CSS v3 with custom CSS variables for theming. You can customize colors, spacing, and other design tokens in the `tailwind.config.js` file.

## 🔒 Security Features

- **Form Validation** - Client-side validation with Zod
- **Password Masking** - Show/hide password functionality
- **CSRF Protection** - Ready for implementation
- **HTTPS Ready** - Secure communication protocols
- **Session Management** - Ready for implementation

## 📱 Responsive Design

The application is fully responsive and includes:
- Mobile-first design approach
- Responsive navigation
- Flexible grid layouts
- Adaptive typography
- Touch-friendly interactions

## 🌐 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔧 Configuration Files

- `tailwind.config.js` - Tailwind CSS configuration with shadcn/ui theme
- `tsconfig.json` - TypeScript configuration with path aliases
- `postcss.config.js` - PostCSS configuration for Tailwind
- `package.json` - Project dependencies and scripts

## 🚀 Deployment

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

### Production Considerations
- Set up environment variables for API endpoints
- Configure HTTPS certificates
- Set up proper CORS policies
- Implement proper session management
- Add error monitoring and logging

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository.

## 🔄 Backend Integration

The application is ready for backend integration. Key areas to implement:

1. **API Endpoints**:
   - `/api/auth/login` - User authentication
   - `/api/auth/register` - User registration
   - `/api/auth/logout` - User logout

2. **Session Management**:
   - JWT tokens or session cookies
   - Token refresh mechanisms
   - Secure storage implementation

3. **Admin Workflow**:
   - Registration approval system
   - Email notifications
   - Admin dashboard for managing brokers

4. **Security**:
   - Password hashing
   - Rate limiting
   - Input sanitization
   - CSRF protection
# max-health

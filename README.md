# Eugen Birich - Frontend Developer Portfolio

A modern, responsive portfolio website showcasing my skills and projects as a Frontend Developer. Built with Angular 20 and featuring server-side rendering (SSR) for optimal performance.

## 🚀 Live Demo

Visit my portfolio: [https://birich.it](https://birich.it)

## 🛠️ Technologies Used

- **Angular 20** - Latest Angular framework with standalone components
- **TypeScript** - Type-safe development
- **SCSS** - Modern CSS preprocessing
- **Angular SSR** - Server-side rendering for SEO and performance
- **Express.js** - Node.js server for SSR
- **Responsive Design** - Mobile-first approach

## ✨ Features

- **Multilingual Support** - German and English language toggle
- **Responsive Design** - Optimized for all devices
- **Contact Form** - Working email functionality with validation
- **Interactive Elements** - Smooth animations and hover effects
- **Privacy Policy** - GDPR compliant modal dialog
- **Modern UI/UX** - Clean, professional design
- **Performance Optimized** - SSR for fast loading times

## 🏗️ Project Structure

```
src/
├── app/
│   ├── about-me/           # About section component
│   ├── contact/            # Contact form with validation
│   ├── featured-projects/  # Project showcase
│   ├── landing-page/       # Hero section
│   ├── services/           # Shared services
│   ├── shared/             # Reusable components
│   ├── skill-set/          # Skills display
│   └── social/             # Testimonials slider
├── assets/                 # Images, fonts, and static files
└── styles/                 # Global SCSS files
```

## 🚀 Development

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI

### Installation

```bash
# Clone the repository
git clone https://github.com/b-rich-dev/portfolio.git

# Navigate to project directory
cd portfolio

# Install dependencies
npm install
```

### Development Server

```bash
# Start development server
ng serve

# Or with SSR
npm run serve:ssr:portfolio
```

Navigate to `http://localhost:4200/` for development or `http://localhost:4000/` for SSR.

### Building

```bash
# Development build
ng build

# Production build
ng build --configuration production

# SSR build
ng build && npm run serve:ssr:portfolio
```

## 📦 Deployment

The project is configured for production deployment with:
- Angular Universal SSR
- Optimized bundle sizes
- SEO-friendly routing
- Express.js server setup

## 📧 Contact Form

The contact form includes:
- Real-time validation
- Test mode for development
- GDPR-compliant privacy policy
- Email sending via PHP backend
- Success/error feedback

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 👨‍💻 Author

**Eugen Birich** - Frontend Developer

- Website: [birich.it](https://birich.it)
- GitHub: [@b-rich-dev](https://github.com/b-rich-dev)
- Email: info@birich.it

## 📄 License

This project is private and proprietary. All rights reserved.

---

Built with ❤️ using Angular 20

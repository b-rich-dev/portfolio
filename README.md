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

### FTP Deployment with `up.bat`

#### Prerequisites

Install [git-ftp](https://github.com/git-ftp/git-ftp) before using the deployment script:

```bash
# Windows (via Chocolatey)
choco install git-ftp

# macOS (via Homebrew)
brew install git-ftp
```

Then configure your FTP credentials once:

```bash
git config git-ftp.url "ftp://your-server.com"
git config git-ftp.user "your-ftp-username"
git config git-ftp.password "your-ftp-password"
```

The `up.bat` script automates the full deployment pipeline in one command:

```bash
up.bat "Your commit message"
```

It will:
1. Pull the latest changes from the remote (`git pull`)
2. Stage all changes (`git add .`)
3. Commit with your message (`git commit -m "..."`)
4. Push to the remote repository (`git push`)
5. Build the Angular project (`ng build`)
6. Upload only the browser build to the FTP server (`git ftp push --syncroot dist/portfolio/browser`)

> **First-time setup:** Run `git ftp init --syncroot dist/portfolio/browser` once before using `up.bat` to initialize the FTP tracking.

### PHP Mail Backend

The contact form requires a PHP file on the server to send emails.

1. Copy `sendMail.template.php` and rename it to `sendMail.php`
2. Replace the placeholders with your actual values:
   - `YOUR_EMAIL@EXAMPLE.COM` → the recipient email address
   - `noreply@YOUR_DOMAIN.COM` → the sender domain (must match your hosting domain)
3. Upload `sendMail.php` to your server root

> **Note:** `sendMail.php` is excluded from version control to protect sensitive data. Never commit it with real credentials.

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

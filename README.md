# 🚀 Developer Portfolio Website + Admin Panel (CMS)

A modern, full-stack developer portfolio website with a comprehensive Content Management System (CMS) built with React Router v7, TypeScript, and React 19.

![Portfolio Preview](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=400&fit=crop)

---

## 🔐 Quick Start - Admin Access

### Demo Admin Credentials

**Admin Panel URL:** `/admin/login`

```
📧 Email: admin@demo.com
🔑 Password: Admin@2024
```

> ⚠️ **Important:** These are demo credentials for development/testing only. Change these before deploying to production!

---

## ✨ Features

### Public Website

- ✅ **Fully Responsive** - Mobile, tablet, and desktop optimized
- 🌓 **Dark/Light Mode** - Theme toggle with system preference detection
- 🚀 **Fast Performance** - Optimized images and code splitting
- 🎨 **Modern UI** - Clean, professional design with smooth animations
- 📱 **Mobile-First** - Designed for mobile, enhanced for desktop
- 🔍 **SEO Optimized** - Meta tags, Open Graph, and semantic HTML

### Admin Panel (CMS)

- 🔐 **Secure Authentication** - Login/logout system
- 📊 **Dashboard** - Overview with statistics and quick actions
- 📝 **Content Management**
  - Pages Editor
  - Projects Manager (CRUD)
  - Blog Manager (CRUD)
  - Skills Manager
  - Experience/Education Timeline
  - Media Library
- 📧 **Contact Form Inbox** - View and manage messages
- ⚙️ **Site Settings** - Global configuration
- 👤 **User Management** - Admin roles

---

## 📁 Project Structure

```
app/
├── components/          # React components
│   ├── navigation.tsx   # Main navigation bar
│   ├── footer.tsx       # Site footer
│   └── ui/              # Reusable UI components (30+ components)
│
├── routes/              # Page routes
│   ├── home.tsx         # Homepage
│   ├── about.tsx        # About page
│   ├── projects.tsx     # Projects listing
│   ├── projects.$id.tsx # Project details
│   ├── services.tsx     # Services page
│   ├── blog.tsx         # Blog listing
│   ├── blog.$id.tsx     # Blog post details
│   ├── contact.tsx      # Contact page
│   ├── privacy.tsx      # Privacy policy
│   ├── $.tsx            # 404 page
│   ├── admin.tsx        # Admin layout
│   ├── admin.login.tsx  # Admin login
│   └── admin.dashboard.tsx # Admin dashboard
│
├── data/
│   ├── portfolio.ts     # Portfolio content data
│   └── admin.ts         # Admin user data
│
├── styles/
│   ├── global.css       # Global styles
│   ├── theme.css        # Theme variables
│   └── tokens/          # Design tokens
│       ├── colors.css   # 40+ color scales
│       ├── typography.css
│       ├── spacings.css
│       └── animations.css
│
└── root.tsx             # App root component
```

---

## 🛠️ Tech Stack

### Core Technologies

- **React 19** - Latest React with enhanced performance
- **TypeScript** - Type-safe development
- **React Router v7** - Modern routing and framework
- **Vite** - Lightning-fast build tool
- **CSS Modules** - Scoped styling

### UI & Styling

- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **OpenProps** - Design system tokens
- **Custom Design System** - Professional color scales and tokens

### Form & Charts

- **React Hook Form** - Performant form validation
- **Recharts** - Data visualization

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd portfolio-cms

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run typecheck    # Run TypeScript type checking
```

---

## 📝 Content Management

### Professional Categories

**Project Categories:**
- Full-Stack Development
- Frontend Development
- Backend Development
- Mobile Development
- DevOps & Cloud
- UI/UX Design

**Blog Categories:**
- Web Development
- Frontend Development
- Backend Development
- DevOps
- Mobile Development
- Software Engineering
- Career & Growth

### Editing Content

All content is managed in `app/data/portfolio.ts`:

```typescript
// Add a new project
export const projects: Project[] = [
  {
    id: "unique-id",
    title: "Project Name",
    description: "Short description",
    longDescription: "Detailed description...",
    image: "https://images.unsplash.com/...",
    gallery: ["image1.jpg", "image2.jpg"],
    techStack: ["React", "Node.js", "PostgreSQL"],
    category: "Full-Stack Development",
    featured: true,
    liveUrl: "https://demo.com",
    githubUrl: "https://github.com/user/repo",
    completedDate: "2024-01",
  },
  // ... more projects
];
```

### Adding New Blog Posts

```typescript
export const blogPosts: BlogPost[] = [
  {
    id: "unique-id",
    title: "Blog Post Title",
    excerpt: "Short preview...",
    content: "# Full content in Markdown...",
    image: "https://images.unsplash.com/...",
    author: "Your Name",
    publishedDate: "2024-01-15",
    tags: ["React", "Tutorial"],
    category: "Frontend Development",
    readTime: 10,
  },
  // ... more posts
];
```

---

## 🎨 Customization

### Theme Colors

Edit `app/styles/theme.css` to customize colors:

```css
/* Change accent color */
--color-accent-1 through --color-accent-12: Use any scale from tokens/colors.css

/* Available color scales */
- Indigo (default)
- Blue, Purple, Violet
- Green, Teal, Mint
- Red, Pink, Crimson
- Orange, Amber, Yellow
- And many more...
```

### Typography

Change fonts in `app/root.tsx`:

```typescript
export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Your+Font&display=swap",
  },
];
```

Then update in `app/styles/theme.css`:

```css
--font-heading: 'Your Font', sans-serif;
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy build folder
netlify deploy --prod --dir=build/client
```

### Environment Variables

Create `.env` file for production:

```env
NODE_ENV=production

# Admin Credentials (CHANGE THESE!)
ADMIN_EMAIL=your-secure-email@domain.com
ADMIN_PASSWORD=your-very-secure-password-here

# Email Configuration (for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Optional
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

---

## 🔒 Security Notes

### ⚠️ Important for Production

The current implementation uses **mock authentication** for demonstration purposes. For production deployment:

1. **Implement Real Authentication**
   - Use bcrypt for password hashing
   - Implement JWT or session-based auth
   - Add CSRF protection
   - Enable rate limiting

2. **Database Integration**
   - Replace mock data with real database (PostgreSQL, MongoDB, etc.)
   - Use Prisma or Mongoose ORM
   - Implement proper data validation

3. **Security Best Practices**
   - Use HTTPS only
   - Implement CORS properly
   - Sanitize all user inputs
   - Regular security audits
   - Keep dependencies updated

4. **File Uploads**
   - Validate file types and sizes
   - Use cloud storage (AWS S3, Cloudinary)
   - Scan uploads for malware

---

## 📚 Documentation

### Complete Admin Guide

See [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) for:
- Detailed admin panel walkthrough
- Content management tutorials
- Data model documentation
- Advanced customization
- Production deployment guide
- Security recommendations

### Key Pages

- **Home** (`/`) - Hero, featured projects, stats
- **About** (`/about`) - Bio, skills, experience, education
- **Projects** (`/projects`) - Portfolio with category filters
- **Services** (`/services`) - Service offerings
- **Blog** (`/blog`) - Articles with category filters
- **Contact** (`/contact`) - Contact form with social links
- **Admin** (`/admin/login`) - CMS login and dashboard

---

## 🎯 Features Roadmap

### Coming Soon

- [ ] Real backend API integration
- [ ] Database connectivity
- [ ] WYSIWYG editor for blog posts
- [ ] Image upload functionality
- [ ] Email notification system
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (i18n)
- [ ] Comment system for blog
- [ ] Newsletter integration
- [ ] SEO sitemap generation

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available for personal and commercial use.

---

## 💡 Tips & Tricks

### Image Sources

Use royalty-free images from:
- [Unsplash](https://unsplash.com) - High-quality photos
- [Pexels](https://pexels.com) - Free stock photos
- [Pixabay](https://pixabay.com) - Free images and videos

### Icon Library

The project uses [Lucide React](https://lucide.dev) icons:

```tsx
import { Icon, Icon2, Icon3 } from "lucide-react";

<Icon size={20} />
```

### Color System

40+ professional color scales available in `app/styles/tokens/colors.css`

Each scale has 12 steps from lightest to darkest, with automatic dark mode support.

---

## 📞 Support

For questions, issues, or feature requests:

- Open an issue on GitHub
- Contact: admin@demo.com
- Documentation: See [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)

---

## 🙏 Acknowledgments

Built with modern web technologies:
- [React Router](https://reactrouter.com)
- [TypeScript](https://www.typescriptlang.org)
- [Radix UI](https://www.radix-ui.com)
- [Vite](https://vitejs.dev)
- [Lucide Icons](https://lucide.dev)

---

**Made with ❤️ for developers by developers**

Happy coding! 🚀

// Mock data for the portfolio - This will be managed through the admin panel in production

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 0-100
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  current: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  techStack: string[];
  category: string;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  completedDate: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedDate: string;
  tags: string[];
  category: string;
  readTime: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  bio: string;
  fullBio: string;
  email: string;
  phone: string;
  location: string;
  cvUrl: string;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
}

export const siteSettings: SiteSettings = {
  siteName: "John Developer",
  tagline: "Full-Stack Developer & UI/UX Enthusiast",
  bio: "Passionate developer crafting elegant solutions to complex problems. Specialized in modern web technologies and user-centric design.",
  fullBio:
    "I'm a full-stack developer with over 5 years of experience building scalable web applications. My passion lies in creating intuitive user experiences backed by robust, efficient code. I specialize in React, Node.js, and modern cloud architectures.",
  email: "john@developer.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  cvUrl: "/assets/cv.pdf",
  metaTitle: "John Developer - Full-Stack Developer Portfolio",
  metaDescription: "Explore my portfolio of web development projects, technical blog posts, and professional services.",
  ogImage: "/assets/og-image.jpg",
};

export const socialLinks: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com/johndeveloper", icon: "github" },
  { platform: "LinkedIn", url: "https://linkedin.com/in/johndeveloper", icon: "linkedin" },
  { platform: "Twitter", url: "https://twitter.com/johndev", icon: "twitter" },
  { platform: "Email", url: "mailto:john@developer.com", icon: "mail" },
];

export const skills: Skill[] = [
  { id: "1", name: "React", category: "Frontend", level: 95 },
  { id: "2", name: "TypeScript", category: "Frontend", level: 90 },
  { id: "3", name: "Node.js", category: "Backend", level: 88 },
  { id: "4", name: "PostgreSQL", category: "Database", level: 85 },
  { id: "5", name: "AWS", category: "DevOps", level: 80 },
  { id: "6", name: "Docker", category: "DevOps", level: 82 },
  { id: "7", name: "Next.js", category: "Frontend", level: 92 },
  { id: "8", name: "GraphQL", category: "Backend", level: 78 },
  { id: "9", name: "MongoDB", category: "Database", level: 83 },
  { id: "10", name: "CSS/Sass", category: "Frontend", level: 90 },
];

export const experience: Experience[] = [
  {
    id: "1",
    title: "Senior Full-Stack Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    startDate: "2021-03",
    endDate: null,
    current: true,
    description:
      "Leading development of cloud-native applications using React, Node.js, and AWS. Mentoring junior developers and architecting scalable solutions for enterprise clients.",
  },
  {
    id: "2",
    title: "Full-Stack Developer",
    company: "Digital Solutions Co.",
    location: "Remote",
    startDate: "2019-06",
    endDate: "2021-02",
    current: false,
    description:
      "Built responsive web applications and RESTful APIs. Collaborated with design teams to implement pixel-perfect UIs and optimize application performance.",
  },
  {
    id: "3",
    title: "Frontend Developer",
    company: "StartupXYZ",
    location: "New York, NY",
    startDate: "2018-01",
    endDate: "2019-05",
    current: false,
    description:
      "Developed interactive user interfaces using React and modern JavaScript. Implemented state management solutions and integrated third-party APIs.",
  },
];

export const education: Education[] = [
  {
    id: "1",
    degree: "Bachelor of Science in Computer Science",
    institution: "University of California",
    location: "Berkeley, CA",
    startDate: "2014-09",
    endDate: "2018-05",
    description: "Focused on software engineering, algorithms, and web development. Graduated with honors.",
  },
];

// Professional project categories
export const PROJECT_CATEGORIES = [
  "Full-Stack Development",
  "Frontend Development",
  "Backend Development",
  "Mobile Development",
  "DevOps & Cloud",
  "UI/UX Design",
] as const;

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-featured online shopping platform with real-time inventory management",
    longDescription:
      "Built a comprehensive e-commerce solution featuring user authentication, product catalog, shopping cart, payment integration with Stripe, order tracking, and an admin dashboard. Implemented real-time inventory updates using WebSockets and optimized for high traffic with Redis caching.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "Redis", "Stripe", "AWS"],
    category: "Full-Stack Development",
    featured: true,
    liveUrl: "https://ecommerce-demo.com",
    githubUrl: "https://github.com/johndeveloper/ecommerce",
    completedDate: "2023-11",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates",
    longDescription:
      "Developed a Trello-like task management application with drag-and-drop functionality, real-time collaboration, team workspaces, and advanced filtering. Features include task assignments, due dates, file attachments, and activity tracking.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"],
    techStack: ["Next.js", "TypeScript", "MongoDB", "Socket.io", "Tailwind CSS"],
    category: "Full-Stack Development",
    featured: true,
    liveUrl: "https://taskmanager-demo.com",
    githubUrl: "https://github.com/johndeveloper/taskmanager",
    completedDate: "2023-08",
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description: "Real-time weather tracking with interactive maps and forecasts",
    longDescription:
      "Created a weather application that displays current conditions, 7-day forecasts, and interactive weather maps. Integrated multiple weather APIs for accurate data and implemented geolocation for automatic location detection.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop"],
    techStack: ["React", "OpenWeather API", "Mapbox", "Chart.js"],
    category: "Frontend Development",
    featured: false,
    liveUrl: "https://weather-demo.com",
    githubUrl: "https://github.com/johndeveloper/weather",
    completedDate: "2023-05",
  },
  {
    id: "4",
    title: "Portfolio CMS",
    description: "Content management system for developer portfolios",
    longDescription:
      "Built a headless CMS specifically designed for developer portfolios. Features include project management, blog posting, media library, SEO optimization, and a customizable theme system.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"],
    techStack: ["Next.js", "PostgreSQL", "Prisma", "AWS S3"],
    category: "Backend Development",
    featured: true,
    githubUrl: "https://github.com/johndeveloper/portfolio-cms",
    completedDate: "2023-03",
  },
  {
    id: "5",
    title: "React Native Fitness App",
    description: "Cross-platform mobile fitness tracker with workout plans",
    longDescription:
      "Developed a mobile fitness application for iOS and Android featuring workout tracking, exercise library, progress analytics, and personalized workout plans. Integrated with health APIs for step counting and calorie tracking.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop"],
    techStack: ["React Native", "TypeScript", "Firebase", "Redux"],
    category: "Mobile Development",
    featured: false,
    githubUrl: "https://github.com/johndeveloper/fitness-app",
    completedDate: "2023-06",
  },
  {
    id: "6",
    title: "DevOps Pipeline Automation",
    description: "CI/CD pipeline with automated testing and deployment",
    longDescription:
      "Designed and implemented a comprehensive DevOps pipeline using GitHub Actions, Docker, and Kubernetes. Features automated testing, security scanning, blue-green deployments, and monitoring with Prometheus and Grafana.",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop"],
    techStack: ["Docker", "Kubernetes", "GitHub Actions", "AWS", "Terraform"],
    category: "DevOps & Cloud",
    featured: true,
    githubUrl: "https://github.com/johndeveloper/devops-pipeline",
    completedDate: "2023-09",
  },
];

// Professional blog categories
export const BLOG_CATEGORIES = [
  "Web Development",
  "Frontend Development",
  "Backend Development",
  "DevOps",
  "Mobile Development",
  "Software Engineering",
  "Career & Growth",
] as const;

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable React Applications",
    excerpt:
      "Learn best practices for structuring large-scale React applications with proper state management and component architecture.",
    content:
      "# Building Scalable React Applications\n\nWhen building large React applications, proper architecture is crucial...",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    author: "John Developer",
    publishedDate: "2024-01-15",
    tags: ["React", "Architecture", "Best Practices"],
    category: "Frontend Development",
    readTime: 8,
  },
  {
    id: "2",
    title: "Mastering TypeScript Generics",
    excerpt: "A deep dive into TypeScript generics and how they can make your code more reusable and type-safe.",
    content: "# Mastering TypeScript Generics\n\nGenerics are one of the most powerful features in TypeScript...",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop",
    author: "John Developer",
    publishedDate: "2024-01-08",
    tags: ["TypeScript", "Programming", "Tutorial"],
    category: "Web Development",
    readTime: 12,
  },
  {
    id: "3",
    title: "Optimizing Node.js Performance",
    excerpt: "Techniques and tools for improving the performance of your Node.js applications in production.",
    content: "# Optimizing Node.js Performance\n\nPerformance optimization is critical for production applications...",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    author: "John Developer",
    publishedDate: "2023-12-20",
    tags: ["Node.js", "Performance", "Backend"],
    category: "Backend Development",
    readTime: 10,
  },
  {
    id: "4",
    title: "Docker Best Practices for Developers",
    excerpt: "Essential Docker practices to optimize your containerized applications and workflows.",
    content: "# Docker Best Practices for Developers\n\nContainerization has become essential in modern development...",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=600&fit=crop",
    author: "John Developer",
    publishedDate: "2023-12-10",
    tags: ["Docker", "DevOps", "Containers"],
    category: "DevOps",
    readTime: 15,
  },
];

export const contactMessages: ContactMessage[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    subject: "Project Inquiry",
    message: "Hi, I'm interested in discussing a web development project for my startup.",
    createdAt: "2024-01-20T10:30:00Z",
    read: false,
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@company.com",
    subject: "Collaboration Opportunity",
    message: "Would love to explore potential collaboration on our upcoming e-commerce platform.",
    createdAt: "2024-01-19T14:15:00Z",
    read: true,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@tech.io",
    subject: "Consulting Request",
    message: "We need technical consulting for our React application architecture.",
    createdAt: "2024-01-18T09:45:00Z",
    read: false,
  },
];

export const services: Service[] = [
  {
    id: "1",
    title: "Web Application Development",
    description: "Custom web applications built with modern technologies and best practices",
    icon: "code",
    features: ["Full-stack development", "Responsive design", "API integration", "Database design", "Cloud deployment"],
  },
  {
    id: "2",
    title: "UI/UX Design & Implementation",
    description: "Beautiful, intuitive interfaces that users love",
    icon: "palette",
    features: [
      "User research",
      "Wireframing & prototyping",
      "Visual design",
      "Accessibility compliance",
      "Usability testing",
    ],
  },
  {
    id: "3",
    title: "Technical Consulting",
    description: "Expert guidance on technology stack and architecture decisions",
    icon: "lightbulb",
    features: [
      "Architecture review",
      "Technology selection",
      "Performance optimization",
      "Code review",
      "Team mentoring",
    ],
  },
  {
    id: "4",
    title: "Maintenance & Support",
    description: "Ongoing support to keep your applications running smoothly",
    icon: "wrench",
    features: ["Bug fixes", "Feature updates", "Security patches", "Performance monitoring", "24/7 support"],
  },
];

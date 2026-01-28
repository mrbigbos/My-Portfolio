// Mock admin data and authentication

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor";
  avatar?: string;
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

// DEMO CREDENTIALS - In production, use proper authentication system with hashed passwords
export const DEMO_ADMIN_EMAIL = "admin@demo.com";
export const DEMO_ADMIN_PASSWORD = "Admin@2024";

// In production, this would be handled by a proper authentication system
export const adminUser: User = {
  id: "1",
  email: DEMO_ADMIN_EMAIL,
  name: "Admin User",
  role: "admin",
};

// Mock password (in production, use proper hashing with bcrypt)
export const ADMIN_PASSWORD = DEMO_ADMIN_PASSWORD;

export const contactMessages: ContactMessage[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    subject: "Project Inquiry",
    message: "Hi, I'm interested in discussing a potential web development project. Could we schedule a call?",
    createdAt: "2024-01-20T10:30:00Z",
    read: false,
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@techcorp.com",
    subject: "Collaboration Opportunity",
    message: "We're looking for a senior developer to join our team on a contract basis. Would you be interested?",
    createdAt: "2024-01-19T14:15:00Z",
    read: true,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily@startup.io",
    subject: "Technical Consulting",
    message: "Our startup needs help with architecture decisions for our new platform. Can you help?",
    createdAt: "2024-01-18T09:00:00Z",
    read: true,
  },
];

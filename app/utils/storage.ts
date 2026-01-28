// Storage utility for persisting admin data to localStorage

const STORAGE_KEYS = {
  SITE_SETTINGS: "portfolio_site_settings",
  SOCIAL_LINKS: "portfolio_social_links",
  SKILLS: "portfolio_skills",
  EXPERIENCE: "portfolio_experience",
  EDUCATION: "portfolio_education",
  PROJECTS: "portfolio_projects",
  BLOG_POSTS: "portfolio_blog_posts",
  CONTACT_MESSAGES: "portfolio_messages",
  SERVICES: "portfolio_services",
  MEDIA_LIBRARY: "portfolio_media",
} as const;

export class Storage {
  static get<T>(key: string, defaultValue: T): T {
    if (typeof window === "undefined") return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  static set<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Storage error:", error);
    }
  }

  static remove(key: string): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Storage remove error:", error);
    }
  }

  static clear(): void {
    if (typeof window === "undefined") return;
    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error("Storage clear error:", error);
    }
  }
}

export { STORAGE_KEYS };

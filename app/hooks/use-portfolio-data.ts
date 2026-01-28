import { useState, useEffect } from "react";
import { Storage, STORAGE_KEYS } from "~/utils/storage";
import * as portfolio from "~/data/portfolio";
import type {
  SiteSettings,
  SocialLink,
  Skill,
  Experience,
  Education,
  Project,
  BlogPost,
  ContactMessage,
  Service,
} from "~/data/portfolio";

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(() =>
    Storage.get(STORAGE_KEYS.SITE_SETTINGS, portfolio.siteSettings)
  );

  useEffect(() => {
    Storage.set(STORAGE_KEYS.SITE_SETTINGS, settings);
  }, [settings]);

  return [settings, setSettings] as const;
}

export function useSocialLinks() {
  const [links, setLinks] = useState<SocialLink[]>(() =>
    Storage.get(STORAGE_KEYS.SOCIAL_LINKS, portfolio.socialLinks)
  );

  useEffect(() => {
    Storage.set(STORAGE_KEYS.SOCIAL_LINKS, links);
  }, [links]);

  return [links, setLinks] as const;
}

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>(() => Storage.get(STORAGE_KEYS.SKILLS, portfolio.skills));

  useEffect(() => {
    Storage.set(STORAGE_KEYS.SKILLS, skills);
  }, [skills]);

  return [skills, setSkills] as const;
}

export function useExperience() {
  const [experience, setExperience] = useState<Experience[]>(() =>
    Storage.get(STORAGE_KEYS.EXPERIENCE, portfolio.experience)
  );

  useEffect(() => {
    Storage.set(STORAGE_KEYS.EXPERIENCE, experience);
  }, [experience]);

  return [experience, setExperience] as const;
}

export function useEducation() {
  const [education, setEducation] = useState<Education[]>(() =>
    Storage.get(STORAGE_KEYS.EDUCATION, portfolio.education)
  );

  useEffect(() => {
    Storage.set(STORAGE_KEYS.EDUCATION, education);
  }, [education]);

  return [education, setEducation] as const;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(() => Storage.get(STORAGE_KEYS.PROJECTS, portfolio.projects));

  useEffect(() => {
    Storage.set(STORAGE_KEYS.PROJECTS, projects);
  }, [projects]);

  return [projects, setProjects] as const;
}

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>(() => Storage.get(STORAGE_KEYS.BLOG_POSTS, portfolio.blogPosts));

  useEffect(() => {
    Storage.set(STORAGE_KEYS.BLOG_POSTS, posts);
  }, [posts]);

  return [posts, setPosts] as const;
}

export function useContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>(() =>
    Storage.get(STORAGE_KEYS.CONTACT_MESSAGES, portfolio.contactMessages)
  );

  useEffect(() => {
    Storage.set(STORAGE_KEYS.CONTACT_MESSAGES, messages);
  }, [messages]);

  return [messages, setMessages] as const;
}

export function useServices() {
  const [services, setServices] = useState<Service[]>(() => Storage.get(STORAGE_KEYS.SERVICES, portfolio.services));

  useEffect(() => {
    Storage.set(STORAGE_KEYS.SERVICES, services);
  }, [services]);

  return [services, setServices] as const;
}

interface MediaItem {
  id: string;
  url: string;
  name: string;
  uploadedAt: string;
}

export function useMediaLibrary() {
  const [media, setMedia] = useState<MediaItem[]>(() => Storage.get(STORAGE_KEYS.MEDIA_LIBRARY, []));

  useEffect(() => {
    Storage.set(STORAGE_KEYS.MEDIA_LIBRARY, media);
  }, [media]);

  return [media, setMedia] as const;
}

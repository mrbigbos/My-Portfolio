import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  // Public routes
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("projects", "routes/projects.tsx"),
  route("projects/:id", "routes/projects.$id.tsx"),
  route("services", "routes/services.tsx"),
  route("blog", "routes/blog.tsx"),
  route("blog/:id", "routes/blog.$id.tsx"),
  route("contact", "routes/contact.tsx"),
  route("privacy", "routes/privacy.tsx"),

  // Admin routes
  layout("routes/admin.tsx", [
    route("admin/login", "routes/admin.login.tsx"),
    route("admin/dashboard", "routes/admin.dashboard.tsx"),
    route("admin/pages", "routes/admin.pages.tsx"),
    route("admin/projects", "routes/admin.projects.tsx"),
    route("admin/blog", "routes/admin.blog.tsx"),
    route("admin/skills", "routes/admin.skills.tsx"),
    route("admin/experience", "routes/admin.experience.tsx"),
    route("admin/media", "routes/admin.media.tsx"),
    route("admin/messages", "routes/admin.messages.tsx"),
    route("admin/settings", "routes/admin.settings.tsx"),
  ]),

  // 404 catch-all
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;

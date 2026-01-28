import type { Route } from "./+types/admin.pages";
import { Link, useNavigate } from "react-router";
import {
  Settings,
  LogOut,
  Edit,
  Eye,
  LayoutDashboard,
  FileText,
  FolderOpen,
  Newspaper,
  Briefcase,
  Mail,
  Image,
  Award,
  Home,
  User,
  Wrench,
  Phone,
} from "lucide-react";
import { Button } from "~/components/ui/button/button";
import { ColorSchemeToggle } from "~/components/ui/color-scheme-toggle/color-scheme-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar/sidebar";
import styles from "./admin.pages.module.css";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Manage Pages - Admin" }];
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
  { icon: FileText, label: "Pages", path: "/admin/pages" },
  { icon: FolderOpen, label: "Projects", path: "/admin/projects" },
  { icon: Newspaper, label: "Blog", path: "/admin/blog" },
  { icon: Award, label: "Skills", path: "/admin/skills" },
  { icon: Briefcase, label: "Experience", path: "/admin/experience" },
  { icon: Image, label: "Media", path: "/admin/media" },
  { icon: Mail, label: "Messages", path: "/admin/messages" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

const sitePages = [
  { icon: Home, name: "Home", path: "/", description: "Main landing page with hero section and featured projects" },
  {
    icon: User,
    name: "About",
    path: "/about",
    description: "About page with bio, skills, and experience timeline",
  },
  { icon: FolderOpen, name: "Projects", path: "/projects", description: "Portfolio projects showcase" },
  { icon: Wrench, name: "Services", path: "/services", description: "Professional services offered" },
  { icon: Newspaper, name: "Blog", path: "/blog", description: "Blog posts and articles" },
  { icon: Phone, name: "Contact", path: "/contact", description: "Contact form and information" },
];

export default function AdminPages() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  return (
    <SidebarProvider>
      <div className={styles.page}>
        <Sidebar>
          <SidebarHeader>
            <div style={{ padding: "var(--space-4)", fontWeight: 600, fontSize: "var(--font-size-2)" }}>
              Portfolio CMS
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton asChild isActive={item.path === "/admin/pages"}>
                        <Link to={item.path}>
                          <item.icon size={20} />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </Button>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className={styles.header}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
              <SidebarTrigger />
              <h1 className={styles.headerTitle}>Site Pages</h1>
            </div>
            <div className={styles.headerActions}>
              <ColorSchemeToggle />
            </div>
          </header>

          <main className={styles.main}>
            <div className={styles.container}>
              <div className={styles.pagesGrid}>
                {sitePages.map((page) => (
                  <div key={page.path} className={styles.pageCard}>
                    <div className={styles.pageIcon}>
                      <page.icon size={32} />
                    </div>
                    <div className={styles.pageContent}>
                      <h3>{page.name}</h3>
                      <p className={styles.pagePath}>{page.path}</p>
                      <p className={styles.pageDescription}>{page.description}</p>
                    </div>
                    <div className={styles.pageActions}>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={page.path}>
                          <Eye size={14} /> View Page
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" disabled>
                        <Edit size={14} /> Edit (Coming Soon)
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.infoBox}>
                <h2>Page Management</h2>
                <p>
                  View and manage all pages of your portfolio website. Content for each page can be edited through the
                  respective sections:
                </p>
                <ul>
                  <li>
                    <strong>Home Page:</strong> Edit in Settings (site name, tagline, bio) and Projects (featured
                    projects)
                  </li>
                  <li>
                    <strong>About Page:</strong> Edit in Settings (bio), Skills, and Experience sections
                  </li>
                  <li>
                    <strong>Projects:</strong> Manage in the Projects section
                  </li>
                  <li>
                    <strong>Services:</strong> Content management coming soon
                  </li>
                  <li>
                    <strong>Blog:</strong> Manage in the Blog section
                  </li>
                  <li>
                    <strong>Contact:</strong> View messages in Messages section, edit contact info in Settings
                  </li>
                </ul>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

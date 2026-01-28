import type { Route } from "./+types/admin.dashboard";
import { Link, useNavigate } from "react-router";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Newspaper,
  Settings,
  LogOut,
  Briefcase,
  Mail,
  Image,
  Award,
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
import { useProjects, useBlogPosts, useContactMessages } from "~/hooks/use-portfolio-data";
import styles from "./admin.dashboard.module.css";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Admin Dashboard" }];
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

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [projects] = useProjects();
  const [blogPosts] = useBlogPosts();
  const [contactMessages] = useContactMessages();

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const unreadMessages = contactMessages.filter((m) => !m.read).length;

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
                      <SidebarMenuButton asChild>
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
              <h1 className={styles.headerTitle}>Dashboard</h1>
            </div>
            <div className={styles.headerActions}>
              <ColorSchemeToggle />
              <Button asChild variant="outline">
                <Link to="/">View Site</Link>
              </Button>
            </div>
          </header>

          <main className={styles.main}>
            <div className={styles.container}>
              <div className={styles.welcome}>
                <h1>Welcome back, Admin!</h1>
                <p>Here's what's happening with your portfolio today</p>
              </div>

              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <FolderOpen size={28} />
                  </div>
                  <div className={styles.statContent}>
                    <h3>Projects</h3>
                    <div className={styles.number}>{projects.length}</div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <Newspaper size={28} />
                  </div>
                  <div className={styles.statContent}>
                    <h3>Blog Posts</h3>
                    <div className={styles.number}>{blogPosts.length}</div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <Mail size={28} />
                  </div>
                  <div className={styles.statContent}>
                    <h3>Messages</h3>
                    <div className={styles.number}>{contactMessages.length}</div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <Mail size={28} />
                  </div>
                  <div className={styles.statContent}>
                    <h3>Unread</h3>
                    <div className={styles.number}>{unreadMessages}</div>
                  </div>
                </div>
              </div>

              <div className={styles.quickActions}>
                <h2>Quick Actions</h2>
                <div className={styles.actionsGrid}>
                  <Button asChild>
                    <Link to="/admin/projects">
                      <FolderOpen size={16} /> Add Project
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/admin/blog">
                      <Newspaper size={16} /> New Post
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/admin/media">
                      <Image size={16} /> Upload Media
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/admin/settings">
                      <Settings size={16} /> Settings
                    </Link>
                  </Button>
                </div>
              </div>

              <div className={styles.recentActivity}>
                <h2>Recent Messages</h2>
                <div className={styles.activityList}>
                  {contactMessages.slice(0, 5).map((message: { id: string; subject: string; name: string; createdAt: string }) => (
                    <div key={message.id} className={styles.activityItem}>
                      <div className={styles.activityIcon}>
                        <Mail size={20} />
                      </div>
                      <div className={styles.activityContent}>
                        <h4>{message.subject}</h4>
                        <p>
                          From {message.name} - {new Date(message.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

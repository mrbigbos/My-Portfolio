import type { Route } from "./+types/admin.messages";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Settings,
  LogOut,
  Trash2,
  Eye,
  MailOpen,
  LayoutDashboard,
  FileText,
  FolderOpen,
  Newspaper,
  Briefcase,
  Mail,
  Image,
  Award,
} from "lucide-react";
import { Button } from "~/components/ui/button/button";
import { ColorSchemeToggle } from "~/components/ui/color-scheme-toggle/color-scheme-toggle";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog/dialog";
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
import type { ContactMessage } from "~/data/portfolio";
import { toast } from "~/hooks/use-toast";
import { useContactMessages } from "~/hooks/use-portfolio-data";
import styles from "./admin.messages.module.css";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Messages - Admin" }];
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

export default function AdminMessages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useContactMessages();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
    if (!message.read) {
      handleMarkAsRead(message.id);
    }
  };

  const handleMarkAsRead = (id: string) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  const handleDeleteMessage = (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      setMessages(messages.filter((m) => m.id !== id));
      toast({ title: "Success", description: "Message deleted successfully" });
      if (selectedMessage?.id === id) {
        setIsDialogOpen(false);
      }
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

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
                      <SidebarMenuButton asChild isActive={item.path === "/admin/messages"}>
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
              <h1 className={styles.headerTitle}>
                Messages {unreadCount > 0 && <span className={styles.unreadBadge}>{unreadCount} unread</span>}
              </h1>
            </div>
            <div className={styles.headerActions}>
              <ColorSchemeToggle />
            </div>
          </header>

          <main className={styles.main}>
            <div className={styles.container}>
              <div className={styles.messagesList}>
                {messages.map((message) => (
                  <div key={message.id} className={`${styles.messageCard} ${!message.read ? styles.unread : ""}`}>
                    <div className={styles.messageHeader}>
                      <div>
                        <h3>{message.subject}</h3>
                        <p className={styles.sender}>
                          From: {message.name} ({message.email})
                        </p>
                        <p className={styles.date}>{new Date(message.createdAt).toLocaleString()}</p>
                      </div>
                      {!message.read && (
                        <div className={styles.unreadIndicator}>
                          <MailOpen size={20} />
                        </div>
                      )}
                    </div>
                    <p className={styles.messagePreview}>
                      {message.message.length > 150 ? `${message.message.substring(0, 150)}...` : message.message}
                    </p>
                    <div className={styles.messageActions}>
                      <Dialog open={isDialogOpen && selectedMessage?.id === message.id} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => handleViewMessage(message)}>
                            <Eye size={14} /> View Full Message
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{message.subject}</DialogTitle>
                          </DialogHeader>
                          <div className={styles.messageDetails}>
                            <div className={styles.detailRow}>
                              <strong>From:</strong> {message.name}
                            </div>
                            <div className={styles.detailRow}>
                              <strong>Email:</strong>{" "}
                              <a href={`mailto:${message.email}`}>{message.email}</a>
                            </div>
                            <div className={styles.detailRow}>
                              <strong>Date:</strong> {new Date(message.createdAt).toLocaleString()}
                            </div>
                            <div className={styles.messageContent}>
                              <strong>Message:</strong>
                              <p>{message.message}</p>
                            </div>
                            <div className={styles.dialogActions}>
                              <Button asChild>
                                <a href={`mailto:${message.email}?subject=Re: ${message.subject}`}>Reply</a>
                              </Button>
                              <Button variant="destructive" onClick={() => handleDeleteMessage(message.id)}>
                                Delete
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteMessage(message.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {messages.length === 0 && (
                <div className={styles.emptyState}>
                  <Mail size={48} />
                  <h3>No messages yet</h3>
                  <p>Messages from your contact form will appear here</p>
                </div>
              )}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

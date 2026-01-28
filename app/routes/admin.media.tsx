import type { Route } from "./+types/admin.media";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Settings,
  LogOut,
  Upload,
  Trash2,
  Copy,
  Check,
  LayoutDashboard,
  FileText,
  FolderOpen,
  Newspaper,
  Briefcase,
  Mail,
  Image as ImageIcon,
  Award,
  ExternalLink,
} from "lucide-react";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { Label } from "~/components/ui/label/label";
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
import { toast } from "~/hooks/use-toast";
import { Storage, STORAGE_KEYS } from "~/utils/storage";
import styles from "./admin.media.module.css";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Media Library - Admin" }];
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
  { icon: FileText, label: "Pages", path: "/admin/pages" },
  { icon: FolderOpen, label: "Projects", path: "/admin/projects" },
  { icon: Newspaper, label: "Blog", path: "/admin/blog" },
  { icon: Award, label: "Skills", path: "/admin/skills" },
  { icon: Briefcase, label: "Experience", path: "/admin/experience" },
  { icon: ImageIcon, label: "Media", path: "/admin/media" },
  { icon: Mail, label: "Messages", path: "/admin/messages" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

interface MediaItem {
  id: string;
  url: string;
  name: string;
  type: "image" | "video" | "document";
  addedAt: string;
}

const suggestedImages = [
  {
    category: "Portfolio Headers",
    images: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop",
    ],
  },
  {
    category: "Project Screenshots",
    images: [
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=600&fit=crop",
    ],
  },
  {
    category: "Profile & About",
    images: [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    ],
  },
  {
    category: "Blog Posts",
    images: [
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=450&fit=crop",
    ],
  },
];

export default function AdminMedia() {
  const navigate = useNavigate();
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>(() => 
    Storage.get<MediaItem[]>(STORAGE_KEYS.MEDIA_LIBRARY, [])
  );
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageName, setNewImageName] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const handleAddImage = () => {
    if (!newImageUrl) {
      toast({ title: "Error", description: "Please enter an image URL", variant: "destructive" });
      return;
    }

    const newMedia: MediaItem = {
      id: String(Date.now()),
      url: newImageUrl,
      name: newImageName || "Untitled Image",
      type: "image",
      addedAt: new Date().toISOString(),
    };

    const updated = [...mediaLibrary, newMedia];
    setMediaLibrary(updated);
    Storage.set(STORAGE_KEYS.MEDIA_LIBRARY, updated);

    setNewImageUrl("");
    setNewImageName("");
    toast({ title: "Success", description: "Image added to media library" });
  };

  const handleQuickAdd = (url: string, name: string) => {
    const newMedia: MediaItem = {
      id: String(Date.now()),
      url,
      name,
      type: "image",
      addedAt: new Date().toISOString(),
    };

    const updated = [...mediaLibrary, newMedia];
    setMediaLibrary(updated);
    Storage.set(STORAGE_KEYS.MEDIA_LIBRARY, updated);

    toast({ title: "Added!", description: `${name} added to library` });
  };

  const handleDeleteImage = (id: string) => {
    if (confirm("Delete this image from library?")) {
      const updated = mediaLibrary.filter((m) => m.id !== id);
      setMediaLibrary(updated);
      Storage.set(STORAGE_KEYS.MEDIA_LIBRARY, updated);
      toast({ title: "Deleted", description: "Image removed from library" });
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({ title: "Copied!", description: "Image URL copied to clipboard" });
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
                      <SidebarMenuButton asChild isActive={item.path === "/admin/media"}>
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
              <h1 className={styles.headerTitle}>Media Library</h1>
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
              {/* Add New Image Section */}
              <div className={styles.uploadSection}>
                <h2>Add Image by URL</h2>
                <div className={styles.uploadForm}>
                  <div className={styles.formGroup}>
                    <Label htmlFor="imageUrl">Image URL *</Label>
                    <Input
                      id="imageUrl"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <Label htmlFor="imageName">Image Name</Label>
                    <Input
                      id="imageName"
                      value={newImageName}
                      onChange={(e) => setNewImageName(e.target.value)}
                      placeholder="My Project Screenshot"
                    />
                  </div>
                  <Button onClick={handleAddImage}>
                    <Upload size={16} /> Add to Library
                  </Button>
                </div>

                <div className={styles.uploadTips}>
                  <h3>📸 Where to Get Images?</h3>
                  <ul>
                    <li>
                      <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">
                        Unsplash <ExternalLink size={14} />
                      </a>{" "}
                      - Free high-quality photos
                    </li>
                    <li>
                      <a href="https://pexels.com" target="_blank" rel="noopener noreferrer">
                        Pexels <ExternalLink size={14} />
                      </a>{" "}
                      - Free stock photos & videos
                    </li>
                    <li>
                      <a href="https://pixabay.com" target="_blank" rel="noopener noreferrer">
                        Pixabay <ExternalLink size={14} />
                      </a>{" "}
                      - Free images & illustrations
                    </li>
                    <li>
                      <strong>cPanel Upload:</strong> Upload to <code>/public/images/</code> folder, then use{" "}
                      <code>/images/filename.jpg</code>
                    </li>
                  </ul>
                </div>
              </div>

              {/* My Media Library */}
              {mediaLibrary.length > 0 && (
                <div className={styles.section}>
                  <h2>My Media Library ({mediaLibrary.length})</h2>
                  <div className={styles.mediaGrid}>
                    {mediaLibrary.map((media) => (
                      <div key={media.id} className={styles.mediaCard}>
                        <div className={styles.mediaPreview}>
                          <img src={media.url} alt={media.name} loading="lazy" />
                        </div>
                        <div className={styles.mediaInfo}>
                          <h4>{media.name}</h4>
                          <p className={styles.mediaUrl}>{media.url}</p>
                          <div className={styles.mediaActions}>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCopyUrl(media.url, media.id)}
                            >
                              {copiedId === media.id ? (
                                <>
                                  <Check size={14} /> Copied
                                </>
                              ) : (
                                <>
                                  <Copy size={14} /> Copy URL
                                </>
                              )}
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteImage(media.id)}>
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested Images */}
              <div className={styles.section}>
                <h2>Suggested Images</h2>
                <p className={styles.sectionDesc}>Click any image to add it to your library</p>

                {suggestedImages.map((category) => (
                  <div key={category.category} className={styles.categorySection}>
                    <h3>{category.category}</h3>
                    <div className={styles.suggestedGrid}>
                      {category.images.map((url, idx) => (
                        <div key={url} className={styles.suggestedCard}>
                          <div className={styles.suggestedPreview}>
                            <img src={url} alt={`${category.category} ${idx + 1}`} loading="lazy" />
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuickAdd(url, `${category.category} ${idx + 1}`)}
                          >
                            <Upload size={14} /> Add to Library
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

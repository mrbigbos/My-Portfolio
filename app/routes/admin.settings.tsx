import type { Route } from "./+types/admin.settings";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Settings, LogOut, Save, Upload, X } from "lucide-react";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { Label } from "~/components/ui/label/label";
import { Textarea } from "~/components/ui/textarea/textarea";
import { ColorSchemeToggle } from "~/components/ui/color-scheme-toggle/color-scheme-toggle";
import { ImageUploadButton } from "~/components/admin/image-upload-button";
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
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Newspaper,
  Briefcase,
  Mail,
  Image,
  Award,
} from "lucide-react";
import { toast } from "~/hooks/use-toast";
import { useSiteSettings, useSocialLinks } from "~/hooks/use-portfolio-data";
import styles from "./admin.settings.module.css";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Site Settings - Admin" }];
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

export default function AdminSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useSiteSettings();
  const [socials, setSocials] = useSocialLinks();
  const [formData, setFormData] = useState(settings);

  // Update formData when settings change from storage
  useState(() => {
    setFormData(settings);
  });

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSocialChange = (index: number, field: string, value: string) => {
    const newSocials = [...socials];
    newSocials[index] = { ...newSocials[index], [field]: value };
    setSocials(newSocials);
  };

  const addSocial = () => {
    setSocials([...socials, { platform: "", url: "", icon: "" }]);
  };

  const removeSocial = (index: number) => {
    setSocials(socials.filter((_, i) => i !== index));
  };

  const handleSaveSettings = () => {
    setSettings(formData);
    toast({
      title: "Settings saved!",
      description: "Your site settings have been updated successfully.",
    });
  };

  const handleSaveSocials = () => {
    setSocials(socials);
    toast({
      title: "Social links saved!",
      description: "Your social media links have been updated.",
    });
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
                      <SidebarMenuButton asChild isActive={item.path === "/admin/settings"}>
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
              <h1 className={styles.headerTitle}>Site Settings</h1>
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
              <div className={styles.section}>
                <h2>General Information</h2>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      name="siteName"
                      value={formData.siteName}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      name="tagline"
                      value={formData.tagline}
                      onChange={handleInputChange}
                      placeholder="Your professional tagline"
                    />
                  </div>
                  <div className={styles.formGroupFull}>
                    <Label htmlFor="bio">Short Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Brief introduction (1-2 sentences)"
                      rows={3}
                    />
                  </div>
                  <div className={styles.formGroupFull}>
                    <Label htmlFor="fullBio">Full Bio</Label>
                    <Textarea
                      id="fullBio"
                      name="fullBio"
                      value={formData.fullBio}
                      onChange={handleInputChange}
                      placeholder="Detailed biography"
                      rows={6}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <h2>Contact Information</h2>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <Label htmlFor="cvUrl">CV/Resume URL</Label>
                    <Input
                      id="cvUrl"
                      name="cvUrl"
                      value={formData.cvUrl}
                      onChange={handleInputChange}
                      placeholder="/assets/cv.pdf"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <h2>Social Media Links</h2>
                <div className={styles.socialList}>
                  {socials.map((social, index) => (
                    <div key={index} className={styles.socialItem}>
                      <Input
                        value={social.platform}
                        onChange={(e) => handleSocialChange(index, "platform", e.target.value)}
                        placeholder="Platform (e.g., GitHub)"
                      />
                      <Input
                        value={social.url}
                        onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                        placeholder="https://..."
                      />
                      <Input
                        value={social.icon}
                        onChange={(e) => handleSocialChange(index, "icon", e.target.value)}
                        placeholder="Icon name"
                      />
                      <Button variant="destructive" size="sm" onClick={() => removeSocial(index)}>
                        <X size={16} />
                      </Button>
                    </div>
                  ))}
                  <Button onClick={addSocial} variant="outline">
                    Add Social Link
                  </Button>
                  <Button onClick={handleSaveSocials} className={styles.saveSocialBtn}>
                    <Save size={16} /> Save Social Links
                  </Button>
                </div>
              </div>

              <div className={styles.section}>
                <h2>SEO & Meta Tags</h2>
                <div className={styles.formGrid}>
                  <div className={styles.formGroupFull}>
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      name="metaTitle"
                      value={formData.metaTitle}
                      onChange={handleInputChange}
                      placeholder="Page title for search engines"
                    />
                  </div>
                  <div className={styles.formGroupFull}>
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      name="metaDescription"
                      value={formData.metaDescription}
                      onChange={handleInputChange}
                      placeholder="Brief description for search results"
                      rows={3}
                    />
                  </div>
                  <div className={styles.formGroupFull}>
                    <ImageUploadButton
                      label="OG Image (Social Media Preview)"
                      value={formData.ogImage}
                      onChange={(url) => setFormData({ ...formData, ogImage: url })}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.saveSection}>
                <Button size="lg" onClick={handleSaveSettings}>
                  <Save size={20} /> Save Settings
                </Button>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

import type { Route } from "./+types/admin.skills";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
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
import { Input } from "~/components/ui/input/input";
import { Label } from "~/components/ui/label/label";
import { ColorSchemeToggle } from "~/components/ui/color-scheme-toggle/color-scheme-toggle";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select/select";
import { Slider } from "~/components/ui/slider/slider";
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
import type { Skill } from "~/data/portfolio";
import { toast } from "~/hooks/use-toast";
import { useSkills } from "~/hooks/use-portfolio-data";
import styles from "./admin.skills.module.css";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Manage Skills - Admin" }];
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

const SKILL_CATEGORIES = ["Frontend", "Backend", "Database", "DevOps", "Mobile", "Other"];

export default function AdminSkills() {
  const navigate = useNavigate();
  const [skillList, setSkillList] = useSkills();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState<Partial<Skill>>({
    name: "",
    category: "Frontend",
    level: 50,
  });

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const handleOpenDialog = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData(skill);
    } else {
      setEditingSkill(null);
      setFormData({
        name: "",
        category: "Frontend",
        level: 50,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveSkill = () => {
    if (!formData.name) {
      toast({ title: "Error", description: "Please enter skill name", variant: "destructive" });
      return;
    }

    if (editingSkill) {
      setSkillList(skillList.map((s) => (s.id === editingSkill.id ? { ...editingSkill, ...formData } as Skill : s)));
      toast({ title: "Success", description: "Skill updated successfully" });
    } else {
      const newSkill: Skill = {
        id: String(Date.now()),
        ...formData,
      } as Skill;
      setSkillList([...skillList, newSkill]);
      toast({ title: "Success", description: "Skill added successfully" });
    }

    setIsDialogOpen(false);
  };

  const handleDeleteSkill = (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      setSkillList(skillList.filter((s) => s.id !== id));
      toast({ title: "Success", description: "Skill deleted successfully" });
    }
  };

  const groupedSkills = skillList.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

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
                      <SidebarMenuButton asChild isActive={item.path === "/admin/skills"}>
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
              <h1 className={styles.headerTitle}>Skills</h1>
            </div>
            <div className={styles.headerActions}>
              <ColorSchemeToggle />
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => handleOpenDialog()}>
                    <Plus size={16} /> Add Skill
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingSkill ? "Edit Skill" : "Add New Skill"}</DialogTitle>
                  </DialogHeader>
                  <div className={styles.form}>
                    <div className={styles.formGroup}>
                      <Label htmlFor="name">Skill Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., React"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SKILL_CATEGORIES.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className={styles.formGroup}>
                      <Label htmlFor="level">Proficiency Level: {formData.level}%</Label>
                      <Slider
                        id="level"
                        value={[formData.level || 50]}
                        onValueChange={(values) => setFormData({ ...formData, level: values[0] })}
                        min={0}
                        max={100}
                        step={5}
                      />
                    </div>
                    <div className={styles.dialogActions}>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveSkill}>Save Skill</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </header>

          <main className={styles.main}>
            <div className={styles.container}>
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category} className={styles.categorySection}>
                  <h2>{category}</h2>
                  <div className={styles.skillsList}>
                    {categorySkills.map((skill) => (
                      <div key={skill.id} className={styles.skillCard}>
                        <div className={styles.skillHeader}>
                          <h3>{skill.name}</h3>
                          <div className={styles.skillActions}>
                            <Button variant="outline" size="sm" onClick={() => handleOpenDialog(skill)}>
                              <Edit size={14} />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteSkill(skill.id)}>
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                        <div className={styles.progressBar}>
                          <div className={styles.progressFill} style={{ width: `${skill.level}%` }} />
                        </div>
                        <div className={styles.levelText}>{skill.level}% Proficiency</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {skillList.length === 0 && (
                <div className={styles.emptyState}>
                  <Award size={48} />
                  <h3>No skills yet</h3>
                  <p>Click "Add Skill" to add your first skill</p>
                </div>
              )}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

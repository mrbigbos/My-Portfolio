import type { Route } from "./+types/admin.projects";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  X,
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
import { Textarea } from "~/components/ui/textarea/textarea";
import { ColorSchemeToggle } from "~/components/ui/color-scheme-toggle/color-scheme-toggle";
import { ImageUploadButton } from "~/components/admin/image-upload-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select/select";
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
import { PROJECT_CATEGORIES } from "~/data/portfolio";
import type { Project } from "~/data/portfolio";
import { toast } from "~/hooks/use-toast";
import { useProjects } from "~/hooks/use-portfolio-data";
import styles from "./admin.projects.module.css";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Manage Projects - Admin" }];
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

export default function AdminProjects() {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useProjects();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    description: "",
    longDescription: "",
    image: "",
    gallery: [],
    techStack: [],
    category: "Full-Stack Development",
    featured: false,
    liveUrl: "",
    githubUrl: "",
    completedDate: new Date().toISOString().split("T")[0],
  });

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData(project);
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        longDescription: "",
        image: "",
        gallery: [],
        techStack: [],
        category: "Full-Stack Development",
        featured: false,
        liveUrl: "",
        githubUrl: "",
        completedDate: new Date().toISOString().split("T")[0],
      });
    }
    setIsDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleArrayInputChange = (field: "techStack" | "gallery", value: string) => {
    setFormData({ ...formData, [field]: value.split(",").map((s) => s.trim()).filter(Boolean) });
  };

  const handleSaveProject = () => {
    if (!formData.title || !formData.description) {
      toast({ title: "Error", description: "Please fill in required fields", variant: "destructive" });
      return;
    }

    if (editingProject) {
      // Update existing
      const updated = projectList.map((p) => (p.id === editingProject.id ? { ...editingProject, ...formData } as Project : p));
      setProjectList(updated);
      toast({ title: "Success", description: "Project updated successfully" });
    } else {
      // Add new
      const newProject: Project = {
        id: String(Date.now()),
        ...formData,
      } as Project;
      setProjectList([...projectList, newProject]);
      toast({ title: "Success", description: "Project created successfully" });
    }

    setIsDialogOpen(false);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjectList(projectList.filter((p) => p.id !== id));
      toast({ title: "Success", description: "Project deleted successfully" });
    }
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
                      <SidebarMenuButton asChild isActive={item.path === "/admin/projects"}>
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
              <h1 className={styles.headerTitle}>Projects</h1>
            </div>
            <div className={styles.headerActions}>
              <ColorSchemeToggle />
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => handleOpenDialog()}>
                    <Plus size={16} /> Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent className={styles.dialogContent}>
                  <DialogHeader>
                    <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
                  </DialogHeader>
                  <div className={styles.form}>
                    <div className={styles.formGroup}>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Project Title"
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
                          {PROJECT_CATEGORIES.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className={styles.formGroupFull}>
                      <Label htmlFor="description">Short Description *</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Brief project description"
                        rows={2}
                      />
                    </div>
                    <div className={styles.formGroupFull}>
                      <Label htmlFor="longDescription">Full Description</Label>
                      <Textarea
                        id="longDescription"
                        name="longDescription"
                        value={formData.longDescription}
                        onChange={handleInputChange}
                        placeholder="Detailed project description"
                        rows={4}
                      />
                    </div>
                    <div className={styles.formGroupFull}>
                      <ImageUploadButton
                        label="Main Project Image *"
                        value={formData.image}
                        onChange={(url) => setFormData({ ...formData, image: url })}
                      />
                    </div>
                    <div className={styles.formGroupFull}>
                      <Label htmlFor="techStack">Tech Stack (comma separated)</Label>
                      <Input
                        id="techStack"
                        value={formData.techStack?.join(", ")}
                        onChange={(e) => handleArrayInputChange("techStack", e.target.value)}
                        placeholder="React, Node.js, PostgreSQL"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <Label htmlFor="liveUrl">Live URL</Label>
                      <Input
                        id="liveUrl"
                        name="liveUrl"
                        value={formData.liveUrl}
                        onChange={handleInputChange}
                        placeholder="https://..."
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <Label htmlFor="githubUrl">GitHub URL</Label>
                      <Input
                        id="githubUrl"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleInputChange}
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <Label htmlFor="completedDate">Completed Date</Label>
                      <Input
                        id="completedDate"
                        name="completedDate"
                        type="date"
                        value={formData.completedDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <Label htmlFor="featured" style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                        <input
                          id="featured"
                          name="featured"
                          type="checkbox"
                          checked={formData.featured}
                          onChange={handleInputChange}
                        />
                        Featured Project
                      </Label>
                    </div>
                    <div className={styles.dialogActions}>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProject}>Save Project</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </header>

          <main className={styles.main}>
            <div className={styles.container}>
              <div className={styles.projectsGrid}>
                {projectList.map((project) => (
                  <div key={project.id} className={styles.projectCard}>
                    {project.featured && <div className={styles.featuredBadge}>Featured</div>}
                    <div className={styles.projectImage}>
                      <img src={project.image} alt={project.title} />
                    </div>
                    <div className={styles.projectContent}>
                      <h3>{project.title}</h3>
                      <p className={styles.category}>{project.category}</p>
                      <p className={styles.description}>{project.description}</p>
                      <div className={styles.techStack}>
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span key={tech} className={styles.techBadge}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.projectActions}>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/projects/${project.id}`}>
                          <Eye size={14} /> View
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleOpenDialog(project)}>
                        <Edit size={14} /> Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteProject(project.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {projectList.length === 0 && (
                <div className={styles.emptyState}>
                  <FolderOpen size={48} />
                  <h3>No projects yet</h3>
                  <p>Click "Add Project" to create your first project</p>
                </div>
              )}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

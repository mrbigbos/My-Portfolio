import type { Route } from "./+types/admin.experience";
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
import { Textarea } from "~/components/ui/textarea/textarea";
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
import type { Experience, Education } from "~/data/portfolio";
import { toast } from "~/hooks/use-toast";
import { useExperience, useEducation } from "~/hooks/use-portfolio-data";
import styles from "./admin.experience.module.css";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Manage Experience - Admin" }];
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

export default function AdminExperience() {
  const navigate = useNavigate();
  const [experienceList, setExperienceList] = useExperience();
  const [educationList, setEducationList] = useEducation();
  const [isExpDialogOpen, setIsExpDialogOpen] = useState(false);
  const [isEduDialogOpen, setIsEduDialogOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);

  const [expFormData, setExpFormData] = useState<Partial<Experience>>({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: null,
    current: false,
    description: "",
  });

  const [eduFormData, setEduFormData] = useState<Partial<Education>>({
    degree: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const handleOpenExpDialog = (exp?: Experience) => {
    if (exp) {
      setEditingExp(exp);
      setExpFormData(exp);
    } else {
      setEditingExp(null);
      setExpFormData({
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: null,
        current: false,
        description: "",
      });
    }
    setIsExpDialogOpen(true);
  };

  const handleOpenEduDialog = (edu?: Education) => {
    if (edu) {
      setEditingEdu(edu);
      setEduFormData(edu);
    } else {
      setEditingEdu(null);
      setEduFormData({
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    }
    setIsEduDialogOpen(true);
  };

  const handleSaveExperience = () => {
    if (!expFormData.title || !expFormData.company) {
      toast({ title: "Error", description: "Please fill in required fields", variant: "destructive" });
      return;
    }

    if (editingExp) {
      setExperienceList(experienceList.map((e) => (e.id === editingExp.id ? { ...editingExp, ...expFormData } as Experience : e)));
      toast({ title: "Success", description: "Experience updated successfully" });
    } else {
      const newExp: Experience = {
        id: String(Date.now()),
        ...expFormData,
      } as Experience;
      setExperienceList([newExp, ...experienceList]);
      toast({ title: "Success", description: "Experience added successfully" });
    }

    setIsExpDialogOpen(false);
  };

  const handleSaveEducation = () => {
    if (!eduFormData.degree || !eduFormData.institution) {
      toast({ title: "Error", description: "Please fill in required fields", variant: "destructive" });
      return;
    }

    if (editingEdu) {
      setEducationList(educationList.map((e) => (e.id === editingEdu.id ? { ...editingEdu, ...eduFormData } as Education : e)));
      toast({ title: "Success", description: "Education updated successfully" });
    } else {
      const newEdu: Education = {
        id: String(Date.now()),
        ...eduFormData,
      } as Education;
      setEducationList([newEdu, ...educationList]);
      toast({ title: "Success", description: "Education added successfully" });
    }

    setIsEduDialogOpen(false);
  };

  const handleDeleteExperience = (id: string) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      setExperienceList(experienceList.filter((e) => e.id !== id));
      toast({ title: "Success", description: "Experience deleted successfully" });
    }
  };

  const handleDeleteEducation = (id: string) => {
    if (confirm("Are you sure you want to delete this education entry?")) {
      setEducationList(educationList.filter((e) => e.id !== id));
      toast({ title: "Success", description: "Education deleted successfully" });
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
                      <SidebarMenuButton asChild isActive={item.path === "/admin/experience"}>
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
              <h1 className={styles.headerTitle}>Experience & Education</h1>
            </div>
            <div className={styles.headerActions}>
              <ColorSchemeToggle />
            </div>
          </header>

          <main className={styles.main}>
            <div className={styles.container}>
              {/* Work Experience Section */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2>Work Experience</h2>
                  <Dialog open={isExpDialogOpen} onOpenChange={setIsExpDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={() => handleOpenExpDialog()}>
                        <Plus size={16} /> Add Experience
                      </Button>
                    </DialogTrigger>
                    <DialogContent className={styles.dialogContent}>
                      <DialogHeader>
                        <DialogTitle>{editingExp ? "Edit Experience" : "Add Work Experience"}</DialogTitle>
                      </DialogHeader>
                      <div className={styles.form}>
                        <div className={styles.formGroup}>
                          <Label htmlFor="title">Job Title *</Label>
                          <Input
                            id="title"
                            value={expFormData.title}
                            onChange={(e) => setExpFormData({ ...expFormData, title: e.target.value })}
                            placeholder="Senior Developer"
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <Label htmlFor="company">Company *</Label>
                          <Input
                            id="company"
                            value={expFormData.company}
                            onChange={(e) => setExpFormData({ ...expFormData, company: e.target.value })}
                            placeholder="Tech Inc."
                          />
                        </div>
                        <div className={styles.formGroupFull}>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={expFormData.location}
                            onChange={(e) => setExpFormData({ ...expFormData, location: e.target.value })}
                            placeholder="San Francisco, CA"
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input
                            id="startDate"
                            type="month"
                            value={expFormData.startDate}
                            onChange={(e) => setExpFormData({ ...expFormData, startDate: e.target.value })}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <Label htmlFor="endDate">End Date</Label>
                          <Input
                            id="endDate"
                            type="month"
                            value={expFormData.endDate || ""}
                            onChange={(e) => setExpFormData({ ...expFormData, endDate: e.target.value })}
                            disabled={expFormData.current}
                          />
                        </div>
                        <div className={styles.formGroupFull}>
                          <Label style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                            <input
                              type="checkbox"
                              checked={expFormData.current}
                              onChange={(e) =>
                                setExpFormData({ ...expFormData, current: e.target.checked, endDate: null })
                              }
                            />
                            Currently working here
                          </Label>
                        </div>
                        <div className={styles.formGroupFull}>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={expFormData.description}
                            onChange={(e) => setExpFormData({ ...expFormData, description: e.target.value })}
                            placeholder="Describe your role and achievements..."
                            rows={4}
                          />
                        </div>
                        <div className={styles.dialogActions}>
                          <Button variant="outline" onClick={() => setIsExpDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleSaveExperience}>Save</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className={styles.timeline}>
                  {experienceList.map((exp) => (
                    <div key={exp.id} className={styles.timelineItem}>
                      <div className={styles.timelineDot} />
                      <div className={styles.timelineCard}>
                        <div className={styles.cardHeader}>
                          <div>
                            <h3>{exp.title}</h3>
                            <p className={styles.company}>{exp.company}</p>
                            <p className={styles.meta}>
                              {exp.location} • {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                            </p>
                          </div>
                          <div className={styles.cardActions}>
                            <Button variant="outline" size="sm" onClick={() => handleOpenExpDialog(exp)}>
                              <Edit size={14} />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteExperience(exp.id)}>
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                        <p className={styles.description}>{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Section */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2>Education</h2>
                  <Dialog open={isEduDialogOpen} onOpenChange={setIsEduDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={() => handleOpenEduDialog()}>
                        <Plus size={16} /> Add Education
                      </Button>
                    </DialogTrigger>
                    <DialogContent className={styles.dialogContent}>
                      <DialogHeader>
                        <DialogTitle>{editingEdu ? "Edit Education" : "Add Education"}</DialogTitle>
                      </DialogHeader>
                      <div className={styles.form}>
                        <div className={styles.formGroupFull}>
                          <Label htmlFor="degree">Degree *</Label>
                          <Input
                            id="degree"
                            value={eduFormData.degree}
                            onChange={(e) => setEduFormData({ ...eduFormData, degree: e.target.value })}
                            placeholder="Bachelor of Science in Computer Science"
                          />
                        </div>
                        <div className={styles.formGroupFull}>
                          <Label htmlFor="institution">Institution *</Label>
                          <Input
                            id="institution"
                            value={eduFormData.institution}
                            onChange={(e) => setEduFormData({ ...eduFormData, institution: e.target.value })}
                            placeholder="University Name"
                          />
                        </div>
                        <div className={styles.formGroupFull}>
                          <Label htmlFor="eduLocation">Location</Label>
                          <Input
                            id="eduLocation"
                            value={eduFormData.location}
                            onChange={(e) => setEduFormData({ ...eduFormData, location: e.target.value })}
                            placeholder="City, Country"
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <Label htmlFor="eduStartDate">Start Date</Label>
                          <Input
                            id="eduStartDate"
                            type="month"
                            value={eduFormData.startDate}
                            onChange={(e) => setEduFormData({ ...eduFormData, startDate: e.target.value })}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <Label htmlFor="eduEndDate">End Date</Label>
                          <Input
                            id="eduEndDate"
                            type="month"
                            value={eduFormData.endDate}
                            onChange={(e) => setEduFormData({ ...eduFormData, endDate: e.target.value })}
                          />
                        </div>
                        <div className={styles.formGroupFull}>
                          <Label htmlFor="eduDescription">Description</Label>
                          <Textarea
                            id="eduDescription"
                            value={eduFormData.description}
                            onChange={(e) => setEduFormData({ ...eduFormData, description: e.target.value })}
                            placeholder="Achievements, honors, relevant coursework..."
                            rows={4}
                          />
                        </div>
                        <div className={styles.dialogActions}>
                          <Button variant="outline" onClick={() => setIsEduDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleSaveEducation}>Save</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className={styles.timeline}>
                  {educationList.map((edu) => (
                    <div key={edu.id} className={styles.timelineItem}>
                      <div className={styles.timelineDot} />
                      <div className={styles.timelineCard}>
                        <div className={styles.cardHeader}>
                          <div>
                            <h3>{edu.degree}</h3>
                            <p className={styles.company}>{edu.institution}</p>
                            <p className={styles.meta}>
                              {edu.location} • {edu.startDate} - {edu.endDate}
                            </p>
                          </div>
                          <div className={styles.cardActions}>
                            <Button variant="outline" size="sm" onClick={() => handleOpenEduDialog(edu)}>
                              <Edit size={14} />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteEducation(edu.id)}>
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                        <p className={styles.description}>{edu.description}</p>
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

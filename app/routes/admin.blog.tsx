import type { Route } from "./+types/admin.blog";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
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
import { BLOG_CATEGORIES } from "~/data/portfolio";
import type { BlogPost } from "~/data/portfolio";
import { toast } from "~/hooks/use-toast";
import { useBlogPosts } from "~/hooks/use-portfolio-data";
import styles from "./admin.blog.module.css";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Manage Blog - Admin" }];
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

export default function AdminBlog() {
  const navigate = useNavigate();
  const [postList, setPostList] = useBlogPosts();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    author: "Admin",
    publishedDate: new Date().toISOString().split("T")[0],
    tags: [],
    category: "Web Development",
    readTime: 5,
  });

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const handleOpenDialog = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post);
      setFormData(post);
    } else {
      setEditingPost(null);
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        image: "",
        author: "Admin",
        publishedDate: new Date().toISOString().split("T")[0],
        tags: [],
        category: "Web Development",
        readTime: 5,
      });
    }
    setIsDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagsChange = (value: string) => {
    setFormData({ ...formData, tags: value.split(",").map((s) => s.trim()).filter(Boolean) });
  };

  const handleSavePost = () => {
    if (!formData.title || !formData.excerpt || !formData.content) {
      toast({ title: "Error", description: "Please fill in required fields", variant: "destructive" });
      return;
    }

    if (editingPost) {
      setPostList(postList.map((p) => (p.id === editingPost.id ? { ...editingPost, ...formData } as BlogPost : p)));
      toast({ title: "Success", description: "Blog post updated successfully" });
    } else {
      const newPost: BlogPost = {
        id: String(Date.now()),
        ...formData,
      } as BlogPost;
      setPostList([newPost, ...postList]);
      toast({ title: "Success", description: "Blog post created successfully" });
    }

    setIsDialogOpen(false);
  };

  const handleDeletePost = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setPostList(postList.filter((p) => p.id !== id));
      toast({ title: "Success", description: "Blog post deleted successfully" });
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
                      <SidebarMenuButton asChild isActive={item.path === "/admin/blog"}>
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
              <h1 className={styles.headerTitle}>Blog Posts</h1>
            </div>
            <div className={styles.headerActions}>
              <ColorSchemeToggle />
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => handleOpenDialog()}>
                    <Plus size={16} /> New Post
                  </Button>
                </DialogTrigger>
                <DialogContent className={styles.dialogContent}>
                  <DialogHeader>
                    <DialogTitle>{editingPost ? "Edit Blog Post" : "Create New Post"}</DialogTitle>
                  </DialogHeader>
                  <div className={styles.form}>
                    <div className={styles.formGroupFull}>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Post Title"
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
                          {BLOG_CATEGORIES.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className={styles.formGroup}>
                      <Label htmlFor="readTime">Read Time (minutes)</Label>
                      <Input
                        id="readTime"
                        name="readTime"
                        type="number"
                        value={formData.readTime}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className={styles.formGroupFull}>
                      <Label htmlFor="excerpt">Excerpt *</Label>
                      <Textarea
                        id="excerpt"
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleInputChange}
                        placeholder="Brief summary"
                        rows={2}
                      />
                    </div>
                    <div className={styles.formGroupFull}>
                      <Label htmlFor="content">Content * (Markdown supported)</Label>
                      <Textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        placeholder="# Heading\n\nYour content here..."
                        rows={10}
                      />
                    </div>
                    <div className={styles.formGroupFull}>
                      <ImageUploadButton
                        label="Featured Image *"
                        value={formData.image}
                        onChange={(url) => setFormData({ ...formData, image: url })}
                      />
                    </div>
                    <div className={styles.formGroupFull}>
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input
                        id="tags"
                        value={formData.tags?.join(", ")}
                        onChange={(e) => handleTagsChange(e.target.value)}
                        placeholder="React, TypeScript, Tutorial"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <Label htmlFor="publishedDate">Published Date</Label>
                      <Input
                        id="publishedDate"
                        name="publishedDate"
                        type="date"
                        value={formData.publishedDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className={styles.dialogActions}>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSavePost}>Publish</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </header>

          <main className={styles.main}>
            <div className={styles.container}>
              <div className={styles.postsList}>
                {postList.map((post) => (
                  <div key={post.id} className={styles.postCard}>
                    <div className={styles.postImage}>
                      <img src={post.image} alt={post.title} />
                    </div>
                    <div className={styles.postContent}>
                      <div className={styles.postMeta}>
                        <span className={styles.category}>{post.category}</span>
                        <span className={styles.readTime}>{post.readTime} min read</span>
                      </div>
                      <h3>{post.title}</h3>
                      <p className={styles.excerpt}>{post.excerpt}</p>
                      <div className={styles.tags}>
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className={styles.postFooter}>
                        <span className={styles.date}>{new Date(post.publishedDate).toLocaleDateString()}</span>
                        <div className={styles.postActions}>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/blog/${post.id}`}>
                              <Eye size={14} /> View
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleOpenDialog(post)}>
                            <Edit size={14} /> Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post.id)}>
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {postList.length === 0 && (
                <div className={styles.emptyState}>
                  <Newspaper size={48} />
                  <h3>No blog posts yet</h3>
                  <p>Click "New Post" to create your first blog post</p>
                </div>
              )}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

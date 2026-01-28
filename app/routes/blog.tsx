import type { Route } from "./+types/blog";
import { useState } from "react";
import { Link } from "react-router";
import { Calendar, Clock } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Footer } from "~/components/footer";
import { blogPosts, siteSettings, BLOG_CATEGORIES } from "~/data/portfolio";
import styles from "./blog.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Blog - ${siteSettings.siteName}` },
    { name: "description", content: "Technical articles, tutorials, and insights on web development." },
  ];
}

export default function Blog() {
  const categories = ["All Posts", ...BLOG_CATEGORIES];
  const [selectedCategory, setSelectedCategory] = useState("All Posts");

  const filteredPosts =
    selectedCategory === "All Posts" ? blogPosts : blogPosts.filter((p) => p.category === selectedCategory);

  return (
    <div className={styles.page}>
      <Navigation />

      <section className={styles.hero}>
        <h1>Blog</h1>
        <p>Thoughts, tutorials, and insights on web development</p>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.filters}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className={styles.postsGrid}>
            {filteredPosts.map((post) => (
              <Link to={`/blog/${post.id}`} key={post.id} className={styles.postCard}>
                <div className={styles.postImage}>
                  <img src={post.image} alt={post.title} />
                </div>
                <div className={styles.postContent}>
                  <div className={styles.postMeta}>
                    <span>
                      <Calendar size={14} /> {new Date(post.publishedDate).toLocaleDateString()}
                    </span>
                    <span>
                      <Clock size={14} /> {post.readTime} min read
                    </span>
                  </div>
                  <h3>{post.title}</h3>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                  <div className={styles.postTags}>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

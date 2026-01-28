import type { Route } from "./+types/blog.$id";
import { Link, useParams } from "react-router";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Footer } from "~/components/footer";
import { blogPosts, siteSettings } from "~/data/portfolio";
import styles from "./blog.$id.module.css";

export function meta({ params }: Route.MetaArgs) {
  const post = blogPosts.find((p) => p.id === params.id);
  return [
    { title: `${post?.title || "Post"} - ${siteSettings.siteName}` },
    { name: "description", content: post?.excerpt || "" },
  ];
}

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className={styles.page}>
        <Navigation />
        <div className={styles.section}>
          <div className={styles.container}>
            <h1>Post not found</h1>
            <Link to="/blog">Back to Blog</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Navigation />

      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <Link to="/blog" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <div className={styles.heroContent}>
            <h1>{post.title}</h1>
            <div className={styles.postMeta}>
              <div className={styles.metaItem}>
                <User size={16} />
                <span>{post.author}</span>
              </div>
              <div className={styles.metaItem}>
                <Calendar size={16} />
                <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
              </div>
              <div className={styles.metaItem}>
                <Clock size={16} />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.featuredImage}>
            <img src={post.image} alt={post.title} />
          </div>

          <div className={styles.content}>
            <p>{post.content}</p>
          </div>

          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

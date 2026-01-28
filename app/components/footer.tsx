import { Link } from "react-router";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { socialLinks } from "~/data/portfolio";
import styles from "./footer.module.css";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3>About</h3>
            <p>
              Full-stack developer passionate about creating elegant solutions to complex problems. Let's build
              something amazing together.
            </p>
          </div>

          <div className={styles.section}>
            <h3>Quick Links</h3>
            <ul className={styles.links}>
              <li>
                <Link to="/about" className={styles.link}>
                  About Me
                </Link>
              </li>
              <li>
                <Link to="/projects" className={styles.link}>
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/blog" className={styles.link}>
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className={styles.link}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3>Connect</h3>
            <ul className={styles.socialLinks}>
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <li key={social.platform}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={social.platform}
                    >
                      {Icon && <Icon size={20} />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>© {currentYear} John Developer. All rights reserved.</p>
          <ul className={styles.bottomLinks}>
            <li>
              <Link to="/privacy" className={styles.bottomLink}>
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

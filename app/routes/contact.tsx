import type { Route } from "./+types/contact";
import { useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, CheckCircle } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Footer } from "~/components/footer";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { Textarea } from "~/components/ui/textarea/textarea";
import { siteSettings, socialLinks } from "~/data/portfolio";
import styles from "./contact.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Contact - ${siteSettings.siteName}` },
    { name: "description", content: "Get in touch to discuss your project or collaboration opportunities." },
  ];
}

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API endpoint
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={styles.page}>
      <Navigation />

      <section className={styles.hero}>
        <h1>Get In Touch</h1>
        <p>Have a project in mind? Let's work together to bring your ideas to life</p>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.contactInfo}>
            <h2>Contact Information</h2>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <Mail size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h3>Email</h3>
                  <p>
                    <a href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a>
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <Phone size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h3>Phone</h3>
                  <p>
                    <a href={`tel:${siteSettings.phone}`}>{siteSettings.phone}</a>
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <MapPin size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h3>Location</h3>
                  <p>{siteSettings.location}</p>
                </div>
              </div>
            </div>

            <h2>Follow Me</h2>
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={social.platform}
                  >
                    {Icon && <Icon size={24} />}
                  </a>
                );
              })}
            </div>
          </div>

          <div className={styles.contactForm}>
            <h2>Send a Message</h2>
            {submitted && (
              <div className={styles.successMessage}>
                <CheckCircle size={20} />
                <span>Thank you! Your message has been sent successfully.</span>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject</label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button type="submit" size="lg">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

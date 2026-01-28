import type { Route } from "./+types/services";
import { Link } from "react-router";
import { Code, Palette, Lightbulb, Wrench, Check } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Footer } from "~/components/footer";
import { Button } from "~/components/ui/button/button";
import { services, siteSettings } from "~/data/portfolio";
import styles from "./services.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Services - ${siteSettings.siteName}` },
    { name: "description", content: "Professional web development and consulting services tailored to your needs." },
  ];
}

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  code: Code,
  palette: Palette,
  lightbulb: Lightbulb,
  wrench: Wrench,
};

export default function Services() {
  return (
    <div className={styles.page}>
      <Navigation />

      <section className={styles.hero}>
        <h1>Services</h1>
        <p>Professional solutions to bring your ideas to life</p>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.servicesGrid}>
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <div key={service.id} className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>
                    <Icon size={32} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className={styles.featuresList}>
                    {service.features.map((feature) => (
                      <li key={feature} className={styles.featureItem}>
                        <Check size={16} className={styles.checkIcon} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.container}>
          <h2>Ready to Start Your Project?</h2>
          <p>Let's discuss how I can help bring your vision to life</p>
          <Button asChild size="lg">
            <Link to="/contact">Get In Touch</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

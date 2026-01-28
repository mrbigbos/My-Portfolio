import type { Route } from "./+types/privacy";
import { Navigation } from "~/components/navigation";
import { Footer } from "~/components/footer";
import { siteSettings } from "~/data/portfolio";
import styles from "./about.module.css";

export function meta({}: Route.MetaArgs) {
  return [{ title: `Privacy Policy - ${siteSettings.siteName}` }];
}

export default function Privacy() {
  return (
    <div className={styles.page}>
      <Navigation />

      <section className={styles.hero}>
        <h1>Privacy Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.bioContent}>
            <h2>Introduction</h2>
            <p>
              This Privacy Policy describes how your personal information is collected, used, and shared when you visit
              this website.
            </p>

            <h2>Information We Collect</h2>
            <p>
              When you visit the site, we automatically collect certain information about your device, including
              information about your web browser, IP address, time zone, and some of the cookies that are installed on
              your device.
            </p>

            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to improve and optimize our site, to communicate with you if you contact
              us through the contact form, and to screen for potential risk or fraud.
            </p>

            <h2>Contact Form</h2>
            <p>
              When you fill out a contact form on this site, we collect your name, email address, and any other
              information you choose to provide. This information is used solely to respond to your inquiry.
            </p>

            <h2>Cookies</h2>
            <p>
              We use cookies to maintain your session and remember your preferences (such as dark mode settings). You
              can disable cookies in your browser settings, but this may affect site functionality.
            </p>

            <h2>Data Security</h2>
            <p>
              We take reasonable measures to protect your personal information from unauthorized access, use, or
              disclosure.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time to reflect changes to our practices or for other
              operational, legal, or regulatory reasons.
            </p>

            <h2>Contact Us</h2>
            <p>
              For more information about our privacy practices, if you have questions, or if you would like to make a
              complaint, please contact us at {siteSettings.email}.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

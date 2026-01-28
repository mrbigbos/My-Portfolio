import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";
import { Navigation } from "~/components/navigation";
import { Footer } from "~/components/footer";
import { Button } from "~/components/ui/button/button";
import styles from "./home.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <Navigation />

      <section className={styles.hero}>
        <div className={styles.heroContainer} style={{ gridTemplateColumns: "1fr", textAlign: "center" }}>
          <div className={styles.heroContent}>
            <h1 style={{ fontSize: "6rem", margin: "0" }}>404</h1>
            <p className={styles.tagline}>Page Not Found</p>
            <p>Sorry, the page you're looking for doesn't exist or has been moved.</p>
            <div className={styles.heroActions} style={{ justifyContent: "center" }}>
              <Button asChild size="lg">
                <Link to="/">
                  <Home size={20} /> Go Home
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" onClick={() => window.history.back()}>
                <span>
                  <ArrowLeft size={20} /> Go Back
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

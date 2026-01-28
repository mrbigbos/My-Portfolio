import { Link, useLocation } from "react-router";
import { Menu, X, Code2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button/button";
import { ColorSchemeToggle } from "~/components/ui/color-scheme-toggle/color-scheme-toggle";
import styles from "./navigation.module.css";

export function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Services", path: "/services" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <Code2 className={styles.logoIcon} />
          <span>John Developer</span>
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navLinks}>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className={`${styles.navLink} ${isActive(item.path) ? styles.active : ""}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <ColorSchemeToggle />
            <Button
              variant="outline"
              size="icon"
              className={styles.mobileMenuButton}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu />
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileOverlay}>
          <div className={styles.mobileNav}>
            <div className={styles.mobileNavHeader}>
              <Link to="/" className={styles.logo} onClick={() => setMobileMenuOpen(false)}>
                <Code2 className={styles.logoIcon} />
                <span>John Developer</span>
              </Link>
              <Button variant="outline" size="icon" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <X />
              </Button>
            </div>
            <ul className={styles.mobileNavLinks}>
              {navItems.map((item, index) => (
                <li key={item.path} style={{ animationDelay: `${index * 60}ms` }}>
                  <Link
                    to={item.path}
                    className={`${styles.mobileNavLink} ${isActive(item.path) ? styles.active : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.mobileNavFooter}>
              <ColorSchemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

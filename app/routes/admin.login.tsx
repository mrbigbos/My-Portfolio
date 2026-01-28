import type { Route } from "./+types/admin.login";
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Lock } from "lucide-react";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { ADMIN_PASSWORD } from "~/data/admin";
import styles from "./admin.login.module.css";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Admin Login" }];
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple authentication check (in production, use proper auth)
    if (formData.email === "admin@portfolio.com" && formData.password === ADMIN_PASSWORD) {
      // Set authentication (in production, use proper session management)
      sessionStorage.setItem("adminAuth", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Lock size={32} />
          </div>
          <h1>Admin Login</h1>
          <p>Sign in to manage your portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="admin@portfolio.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              placeholder="Enter your password"
              required
            />
          </div>

          <Button type="submit" size="lg">
            Sign In
          </Button>
        </form>

        <div className={styles.footer}>
          <Link to="/">← Back to Website</Link>
        </div>
      </div>
    </div>
  );
}

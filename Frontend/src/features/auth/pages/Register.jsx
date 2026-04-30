import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router";

const Register = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    contact: "",
    isSeller: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { fullname, email, password, contact, isSeller } = formData;
    await handleRegister({ fullname, email, password, contact, isSeller });
    setIsLoading(false);
    navigate("/");
  };

  return (
    <div className="auth-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-wrapper {
          min-height: 100vh;
          display: flex;
          font-family: 'Inter', sans-serif;
          background: #080808;
        }

        /* ── Left Brand Panel ── */
        .auth-brand {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 60px;
          position: relative;
          overflow: hidden;
          background: #0e0e0e;
        }

        .auth-brand::before {
          content: '';
          position: absolute;
          top: -200px;
          left: -200px;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245,197,24,0.12) 0%, transparent 70%);
          animation: pulse-glow 4s ease-in-out infinite;
        }

        .auth-brand::after {
          content: '';
          position: absolute;
          bottom: -150px;
          right: -150px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245,197,24,0.07) 0%, transparent 70%);
          animation: pulse-glow 4s ease-in-out infinite reverse;
        }

        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }

        .brand-content { position: relative; z-index: 1; }

        .brand-logo {
          font-size: 3rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #F5C518;
          line-height: 1;
          margin-bottom: 20px;
        }

        .brand-logo span {
          display: inline-block;
          animation: logo-shine 3s ease-in-out infinite;
        }

        @keyframes logo-shine {
          0%, 100% { color: #F5C518; }
          50% { color: #ffd74d; }
        }

        .brand-tagline {
          font-size: 1.5rem;
          font-weight: 300;
          color: #888;
          max-width: 340px;
          line-height: 1.6;
          margin-bottom: 48px;
        }

        .brand-tagline em {
          font-style: normal;
          color: #bbb;
          font-weight: 400;
        }

        .brand-features {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .brand-feature {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #666;
          font-size: 0.875rem;
        }

        .feature-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #F5C518;
          flex-shrink: 0;
        }

        .brand-divider {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(245,197,24,0.15) 30%, rgba(245,197,24,0.15) 70%, transparent);
        }

        /* ── Right Form Panel ── */
        .auth-form-panel {
          width: 480px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 56px;
          background: #080808;
        }

        .auth-form-inner {
          width: 100%;
        }

        .form-header {
          margin-bottom: 40px;
        }

        .form-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #f0ece4;
          margin-bottom: 8px;
        }

        .form-subtitle {
          font-size: 0.875rem;
          color: #555;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #666;
          margin-bottom: 8px;
        }

        .form-input {
          width: 100%;
          background: #141414;
          border: 1px solid #222;
          border-radius: 10px;
          padding: 14px 16px;
          font-size: 0.9rem;
          font-family: 'Inter', sans-serif;
          color: #e5e2e1;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          caret-color: #F5C518;
        }

        .form-input::placeholder { color: #333; }

        .form-input:focus {
          border-color: rgba(245,197,24,0.4);
          box-shadow: 0 0 0 3px rgba(245,197,24,0.07);
          background: #161616;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        /* Seller Toggle */
        .seller-toggle {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #111;
          border: 1px solid #1e1e1e;
          border-radius: 12px;
          padding: 16px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          margin-bottom: 32px;
        }

        .seller-toggle.active {
          border-color: rgba(245,197,24,0.3);
          background: rgba(245,197,24,0.04);
        }

        .toggle-switch {
          width: 40px;
          height: 22px;
          border-radius: 11px;
          background: #222;
          position: relative;
          flex-shrink: 0;
          transition: background 0.25s;
        }

        .seller-toggle.active .toggle-switch { background: #F5C518; }

        .toggle-knob {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #555;
          transition: transform 0.25s, background 0.25s;
        }

        .seller-toggle.active .toggle-knob {
          transform: translateX(18px);
          background: #241a00;
        }

        .seller-label-wrap { flex: 1; }

        .seller-label-title {
          font-size: 0.875rem;
          font-weight: 500;
          color: #bbb;
          transition: color 0.2s;
        }

        .seller-toggle.active .seller-label-title { color: #F5C518; }

        .seller-label-sub {
          font-size: 0.75rem;
          color: #444;
          margin-top: 2px;
        }

        /* Submit Button */
        .btn-submit {
          width: 100%;
          padding: 15px;
          border-radius: 10px;
          border: none;
          background: #F5C518;
          color: #1a1200;
          font-size: 0.9rem;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }

        .btn-submit::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .btn-submit:hover { filter: brightness(1.1); transform: translateY(-1px); }
        .btn-submit:hover::after { opacity: 1; }
        .btn-submit:active { transform: scale(0.98) translateY(0); }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .btn-submit-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(26,18,0,0.3);
          border-top-color: #1a1200;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .form-footer {
          text-align: center;
          margin-top: 28px;
          font-size: 0.8rem;
          color: #3d3d3d;
        }

        .form-footer a {
          color: #888;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .form-footer a:hover { color: #F5C518; }

        /* Responsive */
        @media (max-width: 900px) {
          .auth-brand { display: none; }
          .auth-form-panel { width: 100%; padding: 40px 24px; }
        }
      `}</style>

      {/* Brand Panel */}
      <div className="auth-brand">
        <div className="brand-content">
          <div className="brand-logo"><span>Snitch</span></div>
          <p className="brand-tagline">
            The platform where <em>truth travels fast</em> and sellers thrive.
          </p>
          <div className="brand-features">
            {["Verified marketplace for genuine products", "Seller dashboard with real-time analytics", "Secure payments & buyer protection", "Community-driven reviews & ratings"].map((f) => (
              <div key={f} className="brand-feature">
                <div className="feature-dot" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="brand-divider" />
      </div>

      {/* Form Panel */}
      <div className="auth-form-panel">
        <div className="auth-form-inner">
          <div className="form-header">
            <h1 className="form-title">Create account</h1>
            <p className="form-subtitle">Join Snitch in under a minute</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Full Name + Contact side-by-side */}
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="fullname" className="form-label">Full Name</label>
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  autoComplete="name"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact" className="form-label">Contact</label>
                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  autoComplete="tel"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="form-input"
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="form-input"
                required
              />
            </div>

            {/* Seller Toggle */}
            <div
              className={`seller-toggle${formData.isSeller ? " active" : ""}`}
              onClick={() => setFormData((prev) => ({ ...prev, isSeller: !prev.isSeller }))}
            >
              <div className="toggle-switch">
                <div className="toggle-knob" />
              </div>
              <div className="seller-label-wrap">
                <div className="seller-label-title">Register as a Seller</div>
                <div className="seller-label-sub">List products & manage your storefront</div>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="btn-submit" disabled={isLoading}>
              <span className="btn-submit-inner">
                {isLoading && <span className="spinner" />}
                {isLoading ? "Creating Account…" : "Create Account"}
              </span>
            </button>
          </form>

          <p className="form-footer">
            Already have an account?{" "}
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

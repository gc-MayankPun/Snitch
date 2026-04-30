import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await handleLogin({ email: formData.email, password: formData.password });
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

        .auth-form-inner { width: 100%; }

        .form-header { margin-bottom: 40px; }

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

        .form-group { margin-bottom: 24px; }

        .form-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #666;
          margin-bottom: 8px;
        }

        .input-wrapper { position: relative; }

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

        .form-input.has-toggle { padding-right: 48px; }

        .form-input::placeholder { color: #333; }

        .form-input:focus {
          border-color: rgba(245,197,24,0.4);
          box-shadow: 0 0 0 3px rgba(245,197,24,0.07);
          background: #161616;
        }

        .toggle-visibility {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: #444;
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }

        .toggle-visibility:hover { color: #888; }

        /* Divider */
        .form-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 8px 0 28px;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #1a1a1a;
        }

        .divider-text {
          font-size: 0.7rem;
          color: #333;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* Remember row */
        .form-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .remember-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 0.825rem;
          color: #555;
        }

        .remember-check {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          border: 1px solid #2a2a2a;
          background: #141414;
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
          position: relative;
          transition: background 0.2s, border-color 0.2s;
        }

        .remember-check:checked {
          background: #F5C518;
          border-color: #F5C518;
        }

        .remember-check:checked::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 4px;
          width: 5px;
          height: 8px;
          border: 2px solid #1a1200;
          border-top: none;
          border-left: none;
          transform: rotate(40deg);
        }

        .forgot-link {
          font-size: 0.8rem;
          color: #555;
          text-decoration: none;
          transition: color 0.2s;
        }

        .forgot-link:hover { color: #F5C518; }

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

        /* Welcome back badge */
        .welcome-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(245,197,24,0.08);
          border: 1px solid rgba(245,197,24,0.15);
          border-radius: 20px;
          padding: 5px 12px;
          margin-bottom: 20px;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #9a8030;
        }

        .badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #F5C518;
          animation: blink 1.5s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

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
            Welcome back. The <em>marketplace awaits</em> you.
          </p>
          <div className="brand-features">
            {["Real-time order tracking & notifications", "Your seller dashboard, ready to go", "Verified community, zero compromise", "Pick up right where you left off"].map((f) => (
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
            <div className="welcome-badge">
              <div className="badge-dot" />
              Welcome back
            </div>
            <h1 className="form-title">Sign in</h1>
            <p className="form-subtitle">Continue to your Snitch account</p>
          </div>

          <form onSubmit={handleSubmit}>
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
              <div className="input-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="form-input has-toggle"
                  required
                />
                <button
                  type="button"
                  className="toggle-visibility"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="form-row">
              <label className="remember-label">
                <input type="checkbox" className="remember-check" id="remember" />
                Remember me
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            {/* Submit */}
            <button type="submit" className="btn-submit" disabled={isLoading}>
              <span className="btn-submit-inner">
                {isLoading && <span className="spinner" />}
                {isLoading ? "Signing in…" : "Sign In"}
              </span>
            </button>
          </form>

          <p className="form-footer">
            Don't have an account?{" "}
            <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
import { useState } from "react";
import { Link } from "react-router";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    contact: "",
    isSeller: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-4 py-16 font-sans">
      {/* Card */}
      <div
        className="w-full max-w-md bg-[#1c1b1b] rounded-xl p-12"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
      >
        {/* Logo */}
        <div className="mb-10">
          <h1
            className="text-3xl font-bold tracking-widest uppercase text-[#F5C518]"
            style={{ letterSpacing: "0.15em" }}
          >
            Snitch
          </h1>
          <p className="mt-2 text-sm text-[#9a9078] tracking-wide">
            Create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="fullname"
              className="text-xs font-medium text-[#9a9078] uppercase tracking-widest"
            >
              Full Name
            </label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              autoComplete="name"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full bg-[#2a2a2a] text-[#e5e2e1] text-sm rounded-lg px-4 py-3.5 outline-none border-none caret-[#F5C518] placeholder:text-[#4e4633] transition-shadow duration-200 focus:shadow-[0_0_0_2px_rgba(240,193,16,0.3)]"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium text-[#9a9078] uppercase tracking-widest"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-[#2a2a2a] text-[#e5e2e1] text-sm rounded-lg px-4 py-3.5 outline-none border-none caret-[#F5C518] placeholder:text-[#4e4633] transition-shadow duration-200 focus:shadow-[0_0_0_2px_rgba(240,193,16,0.3)]"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-medium text-[#9a9078] uppercase tracking-widest"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-[#2a2a2a] text-[#e5e2e1] text-sm rounded-lg px-4 py-3.5 outline-none border-none caret-[#F5C518] placeholder:text-[#4e4633] transition-shadow duration-200 focus:shadow-[0_0_0_2px_rgba(240,193,16,0.3)]"
              required
            />
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact"
              className="text-xs font-medium text-[#9a9078] uppercase tracking-widest"
            >
              Contact
            </label>
            <input
              id="contact"
              name="contact"
              type="tel"
              autoComplete="tel"
              value={formData.contact}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full bg-[#2a2a2a] text-[#e5e2e1] text-sm rounded-lg px-4 py-3.5 outline-none border-none caret-[#F5C518] placeholder:text-[#4e4633] transition-shadow duration-200 focus:shadow-[0_0_0_2px_rgba(240,193,16,0.3)]"
              required
            />
          </div>

          {/* isSeller Checkbox */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              role="checkbox"
              aria-checked={formData.isSeller}
              id="isSeller"
              onClick={() =>
                setFormData((prev) => ({ ...prev, isSeller: !prev.isSeller }))
              }
              className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                formData.isSeller
                  ? "bg-[#F5C518]"
                  : "bg-[#2a2a2a] shadow-[0_0_0_1.5px_rgba(154,144,120,0.3)]"
              }`}
            >
              {formData.isSeller && (
                <svg
                  className="w-3 h-3 text-[#241a00]"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 6L5 9L10 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <label
              htmlFor="isSeller"
              className="text-sm text-[#d1c5ac] cursor-pointer select-none"
              onClick={() =>
                setFormData((prev) => ({ ...prev, isSeller: !prev.isSeller }))
              }
            >
              I want to register as a{" "}
              <span
                className={`font-medium transition-colors duration-200 ${
                  formData.isSeller ? "text-[#F5C518]" : "text-[#9a9078]"
                }`}
              >
                Seller
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-[#F5C518] text-[#241a00] text-sm font-semibold tracking-wide transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Login link */}
        <p className="mt-8 text-center text-xs text-[#4e4633]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#9a9078] hover:text-[#F5C518] transition-colors duration-200"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
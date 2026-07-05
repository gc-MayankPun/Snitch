import { useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router";
import { useProduct } from "../hook/useProduct";

const CURRENCIES = ["USD", "INR", "EUR", "GBP"];
const MAX_IMAGES = 7;

const CreateProduct = () => {
  const { handleCreateProduct } = useProduct();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: "USD",
  });

  const [images, setImages] = useState([]); // [{ file, preview }]
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  /* ── Field change ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* ── Image helpers ── */
  const addFiles = (files) => {
    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) return;
    const accepted = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, remaining);
    const newEntries = accepted.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newEntries]);
  };

  const removeImage = (idx) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
  };

  /* ── Drag-and-drop ── */
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [images]
  );
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  /* ── Validation ── */
  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = "Title is required";
    if (!formData.description.trim()) errs.description = "Description is required";
    if (!formData.priceAmount || Number(formData.priceAmount) <= 0)
      errs.priceAmount = "Enter a valid price";
    return errs;
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setIsLoading(true);
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("priceAmount", formData.priceAmount);
      data.append("priceCurrency", formData.priceCurrency);
      images.forEach(({ file }) => data.append("images", file));
      await handleCreateProduct(data);
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Shared input classes ── */
  const inputBase =
    "w-full bg-[#141414] rounded-[10px] px-4 py-[14px] text-[0.9rem] text-[#e5e2e1] placeholder-[#333] outline-none caret-[#F5C518] transition-all duration-200 border";
  const inputIdle =
    "border-[#1e1e1e] focus:border-[rgba(245,197,24,0.4)] focus:shadow-[0_0_0_3px_rgba(245,197,24,0.07)] focus:bg-[#161616]";
  const inputErr =
    "border-[rgba(255,77,77,0.5)] focus:border-[rgba(255,77,77,0.7)]";

  return (
    <div className="min-h-screen bg-[#0e0e0e]" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@600;700;800&display=swap');`}</style>

      <div className="max-w-[720px] mx-auto px-6 py-16">

        {/* ── Back ── */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-[#555] text-sm font-medium tracking-wide hover:text-[#F5C518] transition-colors duration-200 mb-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </Link>

        {/* ── Header ── */}
        <div className="mb-12">
          <h1
            className="text-4xl font-bold text-[#f0ece4] mb-3 leading-tight tracking-tight"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Create Product
          </h1>
          <p className="text-[#555] text-sm leading-relaxed">
            Fill in the details to list your product on Snitch
          </p>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Title */}
          <div>
            <label htmlFor="cp-title"
              className="block text-[10px] font-semibold tracking-[0.12em] uppercase text-[#555] mb-3">
              Title
            </label>
            <input
              id="cp-title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Product title"
              autoComplete="off"
              className={`${inputBase} ${errors.title ? inputErr : inputIdle}`}
            />
            {errors.title && (
              <p className="mt-2 text-[11px] text-[#ff6b6b]">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="cp-description"
              className="block text-[10px] font-semibold tracking-[0.12em] uppercase text-[#555] mb-3">
              Description
            </label>
            <textarea
              id="cp-description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your product in detail…"
              className={`${inputBase} ${errors.description ? inputErr : inputIdle} resize-none`}
            />
            {errors.description && (
              <p className="mt-2 text-[11px] text-[#ff6b6b]">{errors.description}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-[10px] font-semibold tracking-[0.12em] uppercase text-[#555] mb-3">
              Price
            </label>
            <div className="grid grid-cols-[1fr_auto] gap-3">
              {/* Amount */}
              <div>
                <input
                  id="cp-priceAmount"
                  name="priceAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.priceAmount}
                  onChange={handleChange}
                  placeholder="0.00"
                  className={`${inputBase} ${errors.priceAmount ? inputErr : inputIdle}`}
                />
                {errors.priceAmount && (
                  <p className="mt-2 text-[11px] text-[#ff6b6b]">{errors.priceAmount}</p>
                )}
              </div>

              {/* Currency */}
              <select
                id="cp-priceCurrency"
                name="priceCurrency"
                value={formData.priceCurrency}
                onChange={handleChange}
                className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] px-4 py-[14px] text-[0.9rem] text-[#e5e2e1] outline-none appearance-none cursor-pointer transition-all duration-200 focus:border-[rgba(245,197,24,0.4)] focus:shadow-[0_0_0_3px_rgba(245,197,24,0.07)] focus:bg-[#161616] min-w-[100px] pr-9"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c} className="bg-[#1a1a1a]">{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-[10px] font-semibold tracking-[0.12em] uppercase text-[#555] mb-3">
              Images{" "}
              <span className="normal-case tracking-normal font-normal text-[#333]">
                (up to {MAX_IMAGES})
              </span>
            </label>

            {/* Drop zone */}
            <div
              onClick={() => images.length < MAX_IMAGES && fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`flex flex-col items-center justify-center gap-3 rounded-[12px] border-2 border-dashed py-10 transition-all duration-200 select-none
                ${images.length >= MAX_IMAGES
                  ? "opacity-40 cursor-not-allowed border-[#222] bg-[#111]"
                  : "cursor-pointer " + (isDragging
                      ? "border-[rgba(245,197,24,0.5)] bg-[rgba(245,197,24,0.04)]"
                      : "border-[#222] bg-[#111] hover:border-[#333] hover:bg-[#141414]")
                }`}
            >
              {/* Upload icon */}
              <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-200 ${isDragging ? "bg-[rgba(245,197,24,0.12)]" : "bg-[#1a1a1a]"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                  viewBox="0 0 24 24" fill="none"
                  stroke={isDragging ? "#F5C518" : "#555"}
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 16 12 12 8 16" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
                </svg>
              </div>

              <div className="text-center">
                <p className="text-[#888] text-sm font-medium">
                  Drop images here{" "}
                  <span className="text-[#F5C518]">or click to browse</span>
                </p>
                <p className="text-[#333] text-xs mt-1">PNG, JPG, WEBP — max {MAX_IMAGES} files</p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => addFiles(e.target.files)}
              />
            </div>

            {/* Preview grid — 7 slots */}
            <div className="mt-4 grid grid-cols-7 gap-2">
              {Array.from({ length: MAX_IMAGES }).map((_, idx) => {
                const img = images[idx];
                return img ? (
                  <div key={idx} className="relative aspect-square rounded-[8px] overflow-hidden group">
                    <img src={img.preview} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                    {/* Remove overlay */}
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        viewBox="0 0 24 24" fill="none" stroke="#ff6b6b"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div key={idx} className="aspect-square rounded-[8px] bg-[#111] border border-[#1a1a1a]" />
                );
              })}
            </div>

            <p className="mt-2 text-[11px] text-[#333]">
              {images.length}/{MAX_IMAGES} images added
            </p>
          </div>

          {/* ── Submit ── */}
          <div className="pt-4">
            <button
              type="submit"
              id="btn-list-product"
              disabled={isLoading}
              className="w-full py-[15px] rounded-[10px] bg-[#F5C518] text-[#1a1200] text-[0.9rem] font-bold tracking-[0.05em] transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <span className="relative flex items-center justify-center gap-2">
                {isLoading && (
                  <span className="w-4 h-4 border-2 border-[#1a1200]/30 border-t-[#1a1200] rounded-full animate-spin" />
                )}
                {isLoading ? "Listing Product…" : "List Product"}
              </span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateProduct;

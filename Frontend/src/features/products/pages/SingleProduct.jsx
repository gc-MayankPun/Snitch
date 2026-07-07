import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router";
import { useProduct } from "../hook/useProduct";

const SingleProduct = () => {
  const { productId } = useParams();
  const { handleGetProductDetails, handleAddToCartProduct } = useProduct();
  const productDetail = useSelector((state) => state.product.productDetail);
  const user = useSelector((state) => state.auth?.user);
  const navigate = useNavigate();

  const [activeImage, setActiveImage] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImage((prev) =>
      prev === (productDetail?.images?.length || 0) - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImage((prev) =>
      prev === 0 ? (productDetail?.images?.length || 0) - 1 : prev - 1,
    );
  };

  useEffect(() => {
    handleGetProductDetails(productId);
    window.scrollTo(0, 0);
  }, [productId]);

  if (!productDetail) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center text-[#F5C518]">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        `}</style>
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[#1e1e1e] border-t-[#F5C518] rounded-full animate-spin mb-4"></div>
          <p
            className="font-light tracking-widest text-sm"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            LOADING ARTIFACT...
          </p>
        </div>
      </div>
    );
  }

  const images = productDetail.images || [];

  return (
    <div
      className="min-h-screen bg-[#0e0e0e] text-[#e5e2e1]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap');
      `}</style>

      {/* Navbar */}
      <header className="px-6 py-5 border-b border-[#1e1e1e] flex justify-between items-center max-w-[1400px] mx-auto">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1
            className="text-2xl font-bold tracking-widest text-[#F5C518]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            SNITCH.
          </h1>
        </div>
        <div className="flex gap-6 items-center">
          {user ? (
            <div className="flex items-center gap-6">
              <span className="text-[#e5e2e1] text-sm font-medium">
                Welcome, <span className="text-[#F5C518]">{user.fullname}</span>
              </span>
              <Link to="/cart" className="text-[#888] hover:text-[#F5C518] transition-colors flex items-center gap-1 text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                Cart
              </Link>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[#888] hover:text-[#f0ece4] transition-colors text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 bg-[#F5C518] text-[#1a1200] rounded-md text-sm font-bold hover:brightness-110 transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 py-4 md:py-8">
        <Link
          to="/"
          className="inline-flex items-center text-[#888] hover:text-[#F5C518] transition-colors mb-4 md:mb-6 text-sm font-medium group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 transform group-hover:-translate-x-1 transition-transform"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          {/* Left: Images */}
          <div className="flex flex-col gap-3">
            <div
              className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] bg-[#141414] rounded-[16px] overflow-hidden border border-[#1e1e1e] relative group cursor-pointer"
              onClick={() => images.length > 0 && setIsPreviewOpen(true)}
            >
              {images.length > 0 ? (
                <>
                  <img
                    src={images[activeImage]?.url}
                    alt={productDetail.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#F5C518] hover:text-black text-white p-1.5 md:p-2 rounded-full backdrop-blur-sm transition-all opacity-80 md:opacity-0 md:group-hover:opacity-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#F5C518] hover:text-black text-white p-1.5 md:p-2 rounded-full backdrop-blur-sm transition-all opacity-80 md:opacity-0 md:group-hover:opacity-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#555]">
                  No Image Available
                </div>
              )}
            </div>

            {/* Thumbnails (Max 4 slots) */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-2">
                {images.slice(0, 4).map((img, index) => {
                  const isLastSlot = index === 3;
                  const extraImagesCount = images.length - 4;
                  const isExtra = isLastSlot && extraImagesCount > 0;
                  const isActive =
                    activeImage === index || (activeImage >= 3 && isLastSlot);

                  return (
                    <div
                      key={index}
                      className={`relative w-full aspect-square rounded-lg overflow-hidden border transition-all cursor-pointer ${
                        isActive
                          ? "border-[#F5C518] opacity-100"
                          : "border-[#1e1e1e] opacity-60 hover:opacity-100"
                      }`}
                      onClick={() =>
                        isExtra ? setIsPreviewOpen(true) : setActiveImage(index)
                      }
                    >
                      <img
                        src={img.url}
                        alt={`Thumbnail ${index}`}
                        className="w-full h-full object-cover"
                      />
                      {isExtra && (
                        <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex items-center justify-center text-[#F5C518] font-bold text-lg md:text-xl">
                          +{extraImagesCount}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-2">
              <span className="text-[#F5C518] text-xs font-bold tracking-widest uppercase bg-[#1a1200] px-3 py-1 rounded-full border border-[#403105]">
                Exclusive Artifact
              </span>
            </div>
            <h1
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#f0ece4] mt-3 md:mt-4 mb-2 md:mb-3 leading-tight"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {productDetail.title}
            </h1>

            <div className="text-xl md:text-2xl text-[#F5C518] font-medium tracking-wide mb-4 md:mb-6">
              {productDetail.price?.currency === "INR"
                ? "₹"
                : productDetail.price?.currency === "USD"
                  ? "$"
                  : productDetail.price?.currency}{" "}
              {productDetail.price?.amount?.toLocaleString()}
            </div>

            <div className="h-px w-full bg-gradient-to-r from-[#1e1e1e] via-[#333] to-[#1e1e1e] mb-4 md:mb-6"></div>

            <div className="mb-6 md:mb-8">
              <h3 className="text-[#e5e2e1] text-[11px] md:text-xs font-medium tracking-widest uppercase mb-2 md:mb-3 opacity-70">
                Description
              </h3>
              <p className="text-[#a0a0a0] leading-relaxed font-light text-sm md:text-base">
                {productDetail.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <button
                onClick={() => handleAddToCartProduct(productDetail._id)}
                className="flex-1 bg-[#1a1a1a] border border-[#333] hover:border-[#555] text-[#e5e2e1] py-2.5 md:py-3 px-5 md:px-6 rounded-lg text-sm md:text-base font-medium transition-all flex items-center justify-center gap-2 hover:bg-[#222]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Add to Cart
              </button>
              <button className="flex-1 bg-[#F5C518] hover:bg-[#ffe16b] text-[#0e0e0e] py-2.5 md:py-3 px-5 md:px-6 rounded-lg text-sm md:text-base font-bold transition-all shadow-[0_0_20px_rgba(245,197,24,0.15)] hover:shadow-[0_0_30px_rgba(245,197,24,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                Buy Now
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-[13px] text-[#777] font-light">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Worldwide Shipping
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Image Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
          <button
            onClick={() => setIsPreviewOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-[#F5C518] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="relative w-full max-w-5xl max-h-[90vh] px-4 flex items-center justify-center">
            {images.length > 1 && (
              <button
                onClick={prevImage}
                className="absolute left-4 md:left-12 bg-black/50 hover:bg-[#F5C518] hover:text-black text-white p-3 rounded-full backdrop-blur-sm transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}

            <img
              src={images[activeImage]?.url}
              alt={productDetail.title}
              className="max-w-full max-h-[85vh] object-contain rounded-md"
            />

            {images.length > 1 && (
              <button
                onClick={nextImage}
                className="absolute right-4 md:right-12 bg-black/50 hover:bg-[#F5C518] hover:text-black text-white p-3 rounded-full backdrop-blur-sm transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;

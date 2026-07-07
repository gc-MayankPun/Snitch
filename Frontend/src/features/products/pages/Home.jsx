import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../hook/useProduct";
import { Link, useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col group cursor-pointer hover:opacity-95 transition-opacity"
      onClick={() => {
        navigate(`/product/${product._id}`);
      }}
    >
      <div className="relative aspect-[4/5] bg-[#141414] mb-4 overflow-hidden rounded-[12px] border border-[#1e1e1e] group-hover:border-[#333] transition-colors">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0].url}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#555] text-sm">
            No Image
          </div>
        )}
      </div>

      <div className="px-1">
        <h3
          className="text-[#f0ece4] font-medium text-[16px] leading-tight mb-1"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {product.title}
        </h3>
        <p className="text-[#888] text-[13px] line-clamp-1 mb-2 font-light">
          {product.description}
        </p>
        <p className="text-[#F5C518] text-[14px] tracking-wide font-medium">
          {product.price?.currency === "INR"
            ? "₹"
            : product.price?.currency === "USD"
              ? "$"
              : product.price?.currency}{" "}
          {product.price?.amount?.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

const Home = () => {
  const products = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.auth?.user);
  const { handleGetAllProducts } = useProduct();

  useEffect(() => {
    handleGetAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <div className="flex items-center gap-2">
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

      <div className="max-w-[1400px] mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold text-[#f0ece4] mb-4 leading-tight"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Discover the Collection
          </h2>
          <p className="text-[#888] text-sm tracking-wide font-light max-w-xl leading-relaxed">
            Explore curated artifacts and exclusive items listed by our
            community of luxury merchants.
          </p>
        </div>

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-6 rounded-[12px] border border-dashed border-[#222] bg-[#111]">
            <div className="w-16 h-16 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#555"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h3
              className="text-2xl font-bold text-[#e5e2e1] mb-2"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              No Artifacts Found
            </h3>
            <p className="text-[#666] text-sm text-center max-w-sm font-light">
              There are currently no items listed on the platform. Check back
              later for exclusive drops.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

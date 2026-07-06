import { useEffect, useState } from "react";
import { useProduct } from "../hook/useProduct";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const nextImage = (e) => {
    e.stopPropagation();
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  return (
    <>
      <div className="flex flex-col group">
        <div 
          className="relative aspect-[4/5] bg-[#141414] mb-4 overflow-hidden rounded-[12px] cursor-zoom-in border border-[#1e1e1e] group-hover:border-[#333] transition-colors"
          onClick={() => setIsPreviewOpen(true)}
        >
          {product.images && product.images.length > 0 ? (
            <>
              <img
                src={product.images[currentImageIndex].url}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {product.images.map((_, idx) => (
                      <div key={idx} className={`w-1.5 h-1.5 rounded-full ${idx === currentImageIndex ? 'bg-[#F5C518] scale-125' : 'bg-white/40'} transition-all`} />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#555] text-sm">
              No Image
            </div>
          )}
        </div>
        
        <div className="px-1">
          <h3 className="text-[#f0ece4] font-medium text-[16px] leading-tight mb-1" style={{ fontFamily: "Playfair Display, serif" }}>
            {product.title}
          </h3>
          <p className="text-[#888] text-[13px] line-clamp-1 mb-2 font-light">
            {product.description}
          </p>
          <p className="text-[#F5C518] text-[14px] tracking-wide font-medium">
            {product.price?.currency === "INR" ? "₹" : product.price?.currency === "USD" ? "$" : product.price?.currency} {product.price?.amount?.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Full Screen Image Preview Modal */}
      {isPreviewOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setIsPreviewOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={() => setIsPreviewOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          
          <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <img 
              src={product.images[currentImageIndex]?.url} 
              alt={product.title} 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            
            {/* Modal Navigation */}
            {product.images?.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const Dashboard = () => {
  const { handleGetSellerProduct } = useProduct();
  const sellerProducts = useSelector((state) => state.product.sellerProducts);

  useEffect(() => {
    handleGetSellerProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#e5e2e1]" style={{ fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap');
      `}</style>
      
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-[#1e1e1e] pb-8">
          <div>
            <h1
              className="text-4xl md:text-5xl font-bold text-[#f0ece4] mb-3 leading-tight"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Your Vault
            </h1>
            <p className="text-[#888] text-sm tracking-wide font-light">
              Manage and view all your listed artifacts
            </p>
          </div>
          
          <Link
            to="/seller/create-product"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[8px] bg-[#F5C518] text-[#1a1200] text-[0.85rem] font-bold tracking-[0.1em] transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            ADD NEW LISTING
          </Link>
        </div>

        {/* Toolbar */}
        <div className="flex justify-between items-center mb-8 text-[11px] tracking-[0.15em] text-[#767676] uppercase">
          <div>
            Showing {sellerProducts?.length || 0} Artifacts
          </div>
        </div>

        {/* Products Grid */}
        {sellerProducts && sellerProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {sellerProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-6 rounded-[12px] border border-dashed border-[#222] bg-[#111]">
            <div className="w-16 h-16 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#e5e2e1] mb-2" style={{ fontFamily: "Playfair Display, serif" }}>The Vault is Empty</h3>
            <p className="text-[#666] text-sm text-center max-w-sm font-light">
              You haven't listed any artifacts yet. Begin your journey by adding a new listing above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

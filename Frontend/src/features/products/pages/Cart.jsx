import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

const Cart = () => {
  const cartItems = useSelector((state) => state.product.cartItems);
  const user = useSelector((state) => state.auth?.user);
  const navigate = useNavigate();

  // If cartItems has arrays inside (due to push), flatten it, but assume it's flat for now.
  // Actually, handle both cases safely.
  const flatCartItems = Array.isArray(cartItems) 
    ? cartItems.flat().filter(Boolean) 
    : [];

  return (
    <div
      className="min-h-screen bg-[#0e0e0e] text-[#e5e2e1]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap');
      `}</style>

      {/* Navbar */}
      <header className="px-6 py-5 border-b border-[#1e1e1e] flex justify-between items-center max-w-[1100px] mx-auto">
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
            </div>
          ) : (
            <Link
              to="/login"
              className="text-[#888] hover:text-[#f0ece4] transition-colors text-sm font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 py-8 md:py-12">
        <Link
          to="/"
          className="inline-flex items-center text-[#888] hover:text-[#F5C518] transition-colors mb-6 md:mb-10 text-sm font-medium group"
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

        <h2 
          className="text-3xl md:text-4xl font-bold text-[#f0ece4] mb-8"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Your Cart
        </h2>

        {flatCartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-6 rounded-[12px] border border-dashed border-[#222] bg-[#111]">
            <div className="w-16 h-16 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <h3
              className="text-2xl font-bold text-[#e5e2e1] mb-2"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Your Cart is Empty
            </h3>
            <p className="text-[#666] text-sm text-center max-w-sm font-light">
              You haven't added any exclusive artifacts to your cart yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {flatCartItems.map((item, index) => {
                // Determine item structure. If the payload was a full product, use it.
                // If the backend returned a cart item with nested product, handle it.
                const product = item.product || item; 
                
                return (
                  <div key={index} className="flex gap-4 p-4 bg-[#141414] rounded-xl border border-[#1e1e1e]">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-[#111] overflow-hidden flex-shrink-0">
                      {product.images && product.images.length > 0 ? (
                        <img 
                          src={product.images[0].url} 
                          alt={product.title || "Product"} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-[#555]">No Image</div>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 py-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-[#f0ece4] font-medium text-lg" style={{ fontFamily: "Playfair Display, serif" }}>
                          {product.title || "Artifact"}
                        </h4>
                        <div className="text-[#F5C518] font-medium">
                          {product.price?.currency === "INR" ? "₹" : product.price?.currency === "USD" ? "$" : ""}
                          {product.price?.amount?.toLocaleString() || "0"}
                        </div>
                      </div>
                      <p className="text-[#888] text-sm line-clamp-2 font-light mb-3">
                        {product.description || "Exclusive item from Snitch"}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-xs text-[#666] uppercase tracking-widest bg-[#1a1a1a] px-2 py-1 rounded">Qty: {item.quantity || 1}</span>
                        <button className="text-[#e74c3c] hover:text-[#ff6b6b] text-sm font-medium transition-colors flex items-center gap-1">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-[#141414] rounded-xl border border-[#1e1e1e] p-6 h-fit">
              <h3 className="text-xl font-bold text-[#f0ece4] mb-4" style={{ fontFamily: "Playfair Display, serif" }}>Order Summary</h3>
              <div className="space-y-3 text-sm text-[#a0a0a0] mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#e5e2e1]">Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-[#e5e2e1]">Free</span>
                </div>
                <div className="h-px bg-[#1e1e1e] my-2"></div>
                <div className="flex justify-between text-base font-medium text-[#f0ece4]">
                  <span>Total</span>
                  <span className="text-[#F5C518]">Checkout to see total</span>
                </div>
              </div>
              <button className="w-full bg-[#F5C518] hover:bg-[#ffe16b] text-[#0e0e0e] py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;

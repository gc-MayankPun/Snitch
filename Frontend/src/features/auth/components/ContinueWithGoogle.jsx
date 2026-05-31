const ContinueWithGoogle = () => {
  return (
    <div className="form-label">
      <a
        href="/api/auth/google"
        className="text-sm text-[#e5e2e1] hover:text-[#FFD700] cursor-pointer select-none transition-colors duration-300 block text-center"
      >
        Continue with Google
      </a>
    </div>
  );
};

export default ContinueWithGoogle;

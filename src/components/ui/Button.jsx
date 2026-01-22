import { Loader2 } from "lucide-react";

export const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  loading = false,
  type = "button",
  className = "",
}) => {
  const baseStyles =
    "px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 min-w-[120px]";

  const variants = {
    primary:
      "bg-post-yellow text-post-black hover:bg-yellow-400 disabled:bg-post-gray-200 disabled:text-post-gray-400",
    secondary:
      "bg-white text-post-black border border-post-gray-200 hover:bg-post-gray-100 disabled:bg-post-gray-100 disabled:text-post-gray-400",
    ghost:
      "bg-transparent text-post-gray-600 hover:bg-post-gray-100 disabled:text-post-gray-400",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};

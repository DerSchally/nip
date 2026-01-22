import { Check } from "lucide-react";

export const Checkbox = ({
  label,
  checked,
  onChange,
  disabled = false,
  className = "",
}) => {
  return (
    <label
      className={`
        flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all duration-200
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-post-gray-100"}
        ${className}
      `}
    >
      <div
        className={`
          w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
          ${
            checked
              ? "bg-post-yellow border-post-yellow"
              : "bg-white border-post-gray-400"
          }
          ${disabled ? "bg-post-gray-200 border-post-gray-300" : ""}
        `}
      >
        {checked && <Check className="w-3 h-3 text-post-black" />}
      </div>
      <span
        className={`font-medium ${disabled ? "text-post-gray-400" : "text-post-black"}`}
      >
        {label}
      </span>
    </label>
  );
};

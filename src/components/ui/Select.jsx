import { ChevronDown } from "lucide-react";

export const Select = ({
  label,
  value,
  onChange,
  options = [],
  disabled = false,
  required = false,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-post-black">
          {label}
          {required && <span className="text-post-red ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`
            w-full px-4 py-3 rounded-md border border-post-gray-200
            bg-white appearance-none cursor-pointer
            focus:border-post-yellow focus:ring-1 focus:ring-post-yellow outline-none
            transition-colors duration-200
            ${disabled ? "bg-post-gray-100 text-post-gray-400 cursor-not-allowed" : ""}
          `}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-post-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

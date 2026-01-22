export const Input = ({
  label,
  value,
  onChange,
  onBlur,
  placeholder = "",
  type = "text",
  error = "",
  disabled = false,
  maxLength,
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
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className={`
          px-4 py-3 rounded-md border transition-colors duration-200
          ${
            error
              ? "border-post-red focus:border-post-red focus:ring-1 focus:ring-post-red"
              : "border-post-gray-200 focus:border-post-yellow focus:ring-1 focus:ring-post-yellow"
          }
          ${disabled ? "bg-post-gray-100 text-post-gray-400" : "bg-white"}
          outline-none
        `}
      />
      {error && <span className="text-sm text-post-red">{error}</span>}
    </div>
  );
};

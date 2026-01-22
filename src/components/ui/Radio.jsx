export const Radio = ({
  label,
  value,
  checked,
  onChange,
  name,
  disabled = false,
  description = "",
}) => {
  return (
    <label
      className={`
        flex items-start gap-3 p-4 rounded-md border cursor-pointer transition-all duration-200
        ${
          checked
            ? "border-post-yellow bg-yellow-50"
            : "border-post-gray-200 bg-white hover:border-post-gray-400"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        disabled={disabled}
        className="mt-1 w-4 h-4 accent-post-yellow"
      />
      <div className="flex flex-col">
        <span className="font-medium text-post-black">{label}</span>
        {description && (
          <span className="text-sm text-post-gray-600">{description}</span>
        )}
      </div>
    </label>
  );
};

export const RadioGroup = ({ children, className = "" }) => {
  return <div className={`flex flex-col gap-3 ${className}`}>{children}</div>;
};

import React from "react";
interface ButtonProps {
  variant: "primary" | "text" | "outline" | "icon" | "link";
  children?: React.ReactNode;
  label?: string;
  icon?: string; // Only used for icon variant
  className?: string;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
}
export function Button({
  variant,
  children,
  label,
  icon,
  title,
  className,
  disabled,
  loading,
  onClick,
}: ButtonProps) {
  console.assert(
    label !== undefined || children !== undefined,
    "Either label or children must be passed"
  );
  // Conditionally disable the button
  if (variant === "icon") {
    return (
      <button
        onClick={onClick}
        className={`flex items-center ${className}`}
        title={title}
        disabled={disabled}
        aria-label={label}
        aria-disabled={disabled}
      >
        {children ?? <img src={icon} alt={label} className="w-4 h-4" />}
      </button>
    );
  }
  if (variant === "primary") {
    return (
      <button
        onClick={onClick}
        title={title}
        disabled={disabled}
        aria-label={label}
        aria-disabled={disabled}
        aria-busy={loading}
        className={`${className} font-medium text-white bg-primaryBtn px-6 py-2 capitalize border text-xs md:text-sm rounded-full transition duration-100 disabled:opacity-50 `}
      >
        <div className="flex items-center">
          {children ?? <span className={`flex-grow text-center`}>{label}</span>}
        </div>
      </button>
    );
  }
  if (variant === "text") {
    return (
      <button
        onClick={onClick}
        title={title}
        disabled={disabled}
        aria-label={label}
        aria-disabled={disabled}
        className={`text-primary-50 text-xs hover:text-primary-300 active:text-primary-400 w-72 disabled:text-disabled disabled:cursor-not-allowed ${className}`}
      >
        {children ?? label}
      </button>
    );
  }
  if (variant === "outline") {
    return (
      <button
        onClick={onClick}
        title={title}
        disabled={disabled}
        aria-label={label}
        aria-disabled={disabled}
        className={`hover:bg-outlineBtnHover text-gray-400 ${className} px-6 py-2 capitalize border-outlineBtnHover text-xs md:text-sm rounded-full transition duration-100 disabled:opacity-50`}
      >
        <div className="flex items-center">
          {children ?? <span className={`flex-grow text-center`}>{label}</span>}
        </div>
      </button>
    );
  }
  return null; // Return nothing if no valid variant is provided
}

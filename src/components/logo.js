import { MapPin, Search } from "lucide-react";

export function Logo({ className = "", size = "default" }) {
  const sizeClasses = {
    small: "h-6",
    default: "h-8",
    large: "h-10",
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="relative">
        <Search className={`text-primary ${sizeClasses[size]}`} />
        <MapPin
          className={`absolute -bottom-1 -right-1 text-primary ${
            size === "small" ? "h-4" : size === "large" ? "h-6" : "h-5"
          }`}
        />
      </div>
      <span
        className={`font-bold ${
          size === "small" ? "text-lg" : size === "large" ? "text-2xl" : "text-xl"
        }`}
      >
        Find My Stuff
      </span>
    </div>
  );
}

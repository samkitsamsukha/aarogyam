import React from "react";

type StatusType = "Pending" | "Matched" | "None" | "Transplanted";

interface StatusBadgeProps {
  status: StatusType;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Matched":
        return "bg-teal-100 text-teal-800 border-teal-300";
      case "Transplanted":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "None":
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyles()} transition-all duration-300`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
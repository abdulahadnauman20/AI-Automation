import { Book, Calendar, Mail, UsersRound } from "lucide-react";
import { MdKeyboardArrowRight } from "react-icons/md";

function MetricCard({
  icon,
  label,
  value,
  iconColor = "text-gray-700",
  bgColor = "bg-gray-200",
  className,
}) {
  const Icon = {
    mail: Mail,
    users: UsersRound,
    calendar: Calendar,
    briefcase: Book,
  }[icon];

  return (
    <div
      className={`rounded-lg p-3 sm:p-4 shadow-md bg-white transition-all border-white hover:border-2 hover:border-green-300 duration-300 hover:shadow-[0_4px_10px_rgba(45,212,191,0.4)] ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className={`p-2 sm:p-3 rounded-full ${bgColor} flex-shrink-0`}>
            <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${iconColor}`} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xl sm:text-2xl font-semibold truncate">
              {value}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 truncate">
              {label}
            </div>
          </div>
        </div>
        <div className="flex gap-1 group hover:cursor-pointer flex-shrink-0">
          <p className="w-1 sm:w-1.5 h-4 sm:h-5 border border-gray-300 bg-gray-100 rounded transition-all duration-300 group-hover:bg-gradient-to-t group-hover:from-green-500 group-hover:to-gray-100 group-hover:via-green-500 via-2/4"></p>
          <p className="w-1 sm:w-1.5 h-4 sm:h-5 border border-gray-300 bg-gray-100 rounded transition-all duration-300 group-hover:bg-gradient-to-t group-hover:from-green-500 group-hover:to-gray-100 group-hover:via-green-500 via-2/4"></p>
          <p className="w-1 sm:w-1.5 h-4 sm:h-5 border border-gray-300 bg-gray-100 rounded transition-all duration-300 group-hover:bg-gradient-to-t group-hover:from-green-500 group-hover:to-gray-100 group-hover:via-green-500 via-2/4"></p>
        </div>
      </div>

      <p className="py-2 text-gray-300 overflow-hidden text-xs sm:text-sm">
        {" "}
        - - - - - - - - - - - - - - - - - - - - - - - - - -{" "}
      </p>

      <button className="mt-2 sm:mt-4 flex justify-between w-full text-xs sm:text-sm text-gray-500 hover:text-black cursor-pointer items-center">
        <p>View details</p>
        <MdKeyboardArrowRight className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
      </button>
    </div>
  );
}

export default MetricCard;

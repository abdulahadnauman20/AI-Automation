import { Book, Calendar, Mail, UsersRound } from "lucide-react";
import { MdKeyboardArrowRight } from "react-icons/md";

function MetricCard({ icon, label, value, iconColor = "text-gray-700", bgColor = "bg-gray-200", className }) {
  const Icon = {
    mail: Mail,
    users: UsersRound,
    calendar: Calendar,
    briefcase: Book,
  }[icon];

  return (
    <div
      className={`rounded-lg p-4 shadow-md bg-white transition-all border-white hover:border-2 hover:border-green-300 duration-300 hover:shadow-[0_4px_10px_rgba(45,212,191,0.4)] ${className}`}>

        <div className="flex  items-center justify-between">

        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${bgColor}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          <div>
            <div className="text-2xl font-semibold">{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        </div>
        <div className="flex gap-1 group hover:cursor-pointer">
          <p className="w-1.5 h-5 border border-gray-300 bg-gray-100 rounded transition-all duration-300 group-hover:bg-gradient-to-t group-hover:from-green-500 group-hover:to-gray-100 group-hover:via-green-500 via-2/4"></p>
          <p className="w-1.5 h-5 border border-gray-300 bg-gray-100 rounded transition-all duration-300 group-hover:bg-gradient-to-t group-hover:from-green-500 group-hover:to-gray-100 group-hover:via-green-500 via-2/4"></p>
          <p className="w-1.5 h-5 border border-gray-300 bg-gray-100 rounded transition-all duration-300 group-hover:bg-gradient-to-t group-hover:from-green-500 group-hover:to-gray-100 group-hover:via-green-500 via-2/4"></p>
        </div>


      </div>

      <p className="py-2 text-gray-300"> - - - - - - - - - - - - - - - - - - - - - - - - - - </p>

      <button className="mt-4 flex justify-between w-full text-sm text-gray-500 hover:text-black cursor-pointer">
        <p>View details</p>
        <MdKeyboardArrowRight size={25} />
      </button>
    </div>
  );
}

export default MetricCard;
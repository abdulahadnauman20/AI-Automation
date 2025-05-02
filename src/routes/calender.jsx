import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Calendar1, CircleCheckBig } from "lucide-react";
import SideDrawer from "../components/SideDrawer";
import Modal from "../components/Modal";
import { useGoogleCalendarQuery } from "../reactQuery/hooks/useCalenderQuery";

// const { connectCalendarMutation, oAuthCallbackQuery, getAllEventsQuery, createEventMutation, getSingleEventQuery, updateEventMutation, deleteEventMutation, syncEventsMutation } = useGoogleCalendarQuery();


function Calendar() {
  const [modelOpen, setmodelOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedView, setSelectedView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleModal = () => {
    setmodelOpen(!modelOpen);
  };

  const handlePreviousMonth = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };
  

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayIndex = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
  
    const previousMonth = new Date(year, month, 0);
    const daysInPreviousMonth = previousMonth.getDate();
  
    // Get current week range (Sunday to Saturday)
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
  
    const days = [];
  
    // Previous month's tail
    for (let i = startingDayIndex - 1; i >= 0; i--) {
      days.push({ date: daysInPreviousMonth - i, isCurrentMonth: false, events: [] });
    }
  
    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      const thisDate = new Date(year, month, i);
      const isInWeek =
        selectedView === "week" &&
        thisDate >= startOfWeek &&
        thisDate <= endOfWeek;
  
      const eventList = [
        i === 2 && { type: "meeting", title: "Meeting with Carl Pei" },
        i === 2 && { type: "task", title: "Client Demo Task" },
        i === 14 && { type: "meeting", title: "Meeting with Carl Pei" },
        i === 14 && { type: "task", title: "Client Demo Task" },
      ].filter(Boolean);
  
      days.push({
        date: i,
        isCurrentMonth: true,
        events: selectedView === "month" || isInWeek ? eventList : [],
      });
    }
  
    return days;
  };
  
  

  return (
    <div className="max-w-9xl mx-auto p-4 ">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
            <h1 className="text-lg sm:text-2xl flex items-center gap-2 font-semibold">
              <Calendar1 size={20} /> {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
            </h1>

              <p className="text-sm sm:text-[16px] text-gray-400">
                Manage your reminders, events, and meetings
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-full bg-gray-200 p-1">
                <button
                  className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full cursor-pointer transition-all duration-300 ${
                    selectedView === "month" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-400"
                  }`}
                  onClick={() => setSelectedView("month")}>
                  Month
                </button>
                <button
                  className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full cursor-pointer transition-all duration-300 ${
                    selectedView === "week" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-400"
                  }`}
                  onClick={() => setSelectedView("week")}>
                  Week
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handlePreviousMonth}
                  className="border cursor-pointer border-gray-400 p-2 rounded-full bg-gray-100">
                  <ChevronLeft size={18} className="text-gray-400" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="border cursor-pointer border-gray-400 p-2 rounded-full bg-gray-100">
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex cursor-pointer gap-2 rounded-full py-2 px-4 sm:px-5 items-center text-white bg-[rgb(21,163,149)] hover:bg-teal-600 text-sm sm:text-base">
                <Plus size={18} />
                New
              </button>
              <SideDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
          </div>
        </div>

        <div className="py-3 overflow-x-auto">
          <div className={`grid ${selectedView === "week" ? "grid-cols-7" : "grid-cols-3 sm:grid-cols-7"}`}>
            {daysOfWeek.map((day) => (
              <div key={day} className="px-3 text-sm sm:text-[17px] text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="border border-gray-300 rounded-lg">
            <div className="grid grid-cols-3 sm:grid-cols-7">
              {generateCalendarDays().map((day, index) => (
                <div
                  onClick={handleModal}
                  key={index}
                  className={`min-h-[100px] sm:min-h-[120px] p-2 border-r border-b border-gray-300 hover:bg-green-50 cursor-pointer ${
                    !day.isCurrentMonth ? "bg-gray-50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between group">
                    <Plus size={16} className="text-green-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className={`text-xs sm:text-sm font-medium ${!day.isCurrentMonth ? "text-gray-400" : ""}`}>
                      {day.date}
                    </span>
                  </div>
                  <Modal modelOpen={modelOpen} setmodelOpen={setmodelOpen} />
                  <div className="mt-1 space-y-1">
                    {day.events.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`text-[10px] sm:text-xs p-1 flex gap-1 ps-2 sm:ps-3 rounded font-medium ${
                          event.type === "meeting" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-600"
                        }`}
                      >
                        <CircleCheckBig size={12} sm:size={14} /> {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Calendar;
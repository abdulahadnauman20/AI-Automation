// // // // // import { useState, useEffect } from "react";
// // // // // import { ChevronLeft, ChevronRight, Plus, Calendar1, CircleCheckBig } from "lucide-react";
// // // // // import SideDrawer from "../components/SideDrawer";
// // // // // import Modal from "../components/Modal";
// // // // // import { useGoogleCalendarQuery } from "../reactQuery/hooks/useCalenderQuery";
// // // // // import { toast } from "react-hot-toast";
// // // // // import { useNavigate } from "react-router-dom";


// // // // // function Calendar() {
// // // // //   const {  
// // // // //     authData, authLoading, authError,
// // // // //     // Events
// // // // //     getAllEventsQuery,
// // // // //     createEventMutation,
// // // // //     getSingleEventQuery,
// // // // //     updateEventMutation,
// // // // //     deleteEventMutation, 
// // // // //   } = useGoogleCalendarQuery();
// // // // //   const navigate = useNavigate();
// // // // //   const [modelOpen, setmodelOpen] = useState(false);
// // // // //   const [isOpen, setIsOpen] = useState(false);
// // // // //   const [selectedView, setSelectedView] = useState("month");
// // // // //   const [currentDate, setCurrentDate] = useState(new Date());

// // // // //   const handleModal = () => {
// // // // //     setmodelOpen(!modelOpen);
// // // // //   };

// // // // //   const handlePreviousMonth = () => {
// // // // //     setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
// // // // //   };
  
// // // // //   const handleNextMonth = () => {
// // // // //     setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
// // // // //   };

// // // // //   const goToPrevious = () => {
// // // // //     setCurrentDate(prev => {
// // // // //       const newDate = new Date(prev);
// // // // //       if (selectedView === "week") {
// // // // //         newDate.setDate(newDate.getDate() - 7);
// // // // //       } else {
// // // // //         newDate.setMonth(newDate.getMonth() - 1);
// // // // //       }
// // // // //       return newDate;
// // // // //     });
// // // // //   };
  
// // // // //   const goToNext = () => {
// // // // //     setCurrentDate(prev => {
// // // // //       const newDate = new Date(prev);
// // // // //       if (selectedView === "week") {
// // // // //         newDate.setDate(newDate.getDate() + 7);
// // // // //       } else {
// // // // //         newDate.setMonth(newDate.getMonth() + 1);
// // // // //       }
// // // // //       return newDate;
// // // // //     });
// // // // //   };
  
// // // // //   useEffect(() => {
// // // // //     if (!authLoading) {
// // // // //       if (!authData?.success) {
// // // // //         navigate('/settings');
// // // // //         toast.error("You need to connect to Google Calendar to use this feature.");
// // // // //       }
// // // // //       console.log(authData);
// // // // //     }
// // // // //   }, [authLoading, authData, authError]);
  

// // // // //   const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// // // // //   // const generateCalendarDays = () => {
// // // // //   //   const year = currentDate.getFullYear();
// // // // //   //   const month = currentDate.getMonth();
// // // // //   //   const firstDay = new Date(year, month, 1);
// // // // //   //   const lastDay = new Date(year, month + 1, 0);
// // // // //   //   const startingDayIndex = firstDay.getDay();
// // // // //   //   const daysInMonth = lastDay.getDate();
  
// // // // //   //   const previousMonth = new Date(year, month, 0);
// // // // //   //   const daysInPreviousMonth = previousMonth.getDate();
  
// // // // //   //   // Get current week range (Sunday to Saturday)
// // // // //   //   const today = new Date();
// // // // //   //   const startOfWeek = new Date(today);
// // // // //   //   startOfWeek.setDate(today.getDate() - today.getDay());
// // // // //   //   const endOfWeek = new Date(startOfWeek);
// // // // //   //   endOfWeek.setDate(startOfWeek.getDate() + 6);
  
// // // // //   //   const days = [];
  
// // // // //   //   // Previous month's tail
// // // // //   //   for (let i = startingDayIndex - 1; i >= 0; i--) {
// // // // //   //     days.push({ date: daysInPreviousMonth - i, isCurrentMonth: false, events: [] });
// // // // //   //   }
  
// // // // //   //   // Current month
// // // // //   //   for (let i = 1; i <= daysInMonth; i++) {
// // // // //   //     const thisDate = new Date(year, month, i);
// // // // //   //     const isInWeek =
// // // // //   //       selectedView === "week" &&
// // // // //   //       thisDate >= startOfWeek &&
// // // // //   //       thisDate <= endOfWeek;
  
// // // // //   //     const eventList = [
// // // // //   //       i === 2 && { type: "meeting", title: "Meeting with Carl Pei" },
// // // // //   //       i === 2 && { type: "task", title: "Client Demo Task" },
// // // // //   //       i === 14 && { type: "meeting", title: "Meeting with Carl Pei" },
// // // // //   //       i === 14 && { type: "task", title: "Client Demo Task" },
// // // // //   //     ].filter(Boolean);
  
// // // // //   //     days.push({
// // // // //   //       date: i,
// // // // //   //       isCurrentMonth: true,
// // // // //   //       events: selectedView === "month" || isInWeek ? eventList : [],
// // // // //   //     });
// // // // //   //   }
  
// // // // //   //   return days;
// // // // //   // };
  
// // // // //   const generateCalendarDays = () => {
// // // // //     const year = currentDate.getFullYear();
// // // // //     const month = currentDate.getMonth();
// // // // //     const firstDay = new Date(year, month, 1);
// // // // //     const lastDay = new Date(year, month + 1, 0);
// // // // //     const startingDayIndex = firstDay.getDay();
// // // // //     const daysInMonth = lastDay.getDate();
  
// // // // //     const previousMonth = new Date(year, month, 0);
// // // // //     const daysInPreviousMonth = previousMonth.getDate();
  
// // // // //     const days = [];
  
// // // // //     if (selectedView === "week") {
// // // // //       // Get the Sunday of the current week
// // // // //       const weekStart = new Date(currentDate);
// // // // //       weekStart.setDate(currentDate.getDate() - currentDate.getDay());
  
// // // // //       // Fill 7 days (Sunday to Saturday)
// // // // //       for (let i = 0; i < 7; i++) {
// // // // //         const thisDate = new Date(weekStart);
// // // // //         thisDate.setDate(weekStart.getDate() + i);
  
// // // // //         const isCurrentMonth = thisDate.getMonth() === month;
  
// // // // //         const day = thisDate.getDate();
  
// // // // //         const eventList = [
// // // // //           day === 2 && { type: "meeting", title: "Meeting with Carl Pei" },
// // // // //           day === 2 && { type: "task", title: "Client Demo Task" },
// // // // //           day === 14 && { type: "meeting", title: "Meeting with Carl Pei" },
// // // // //           day === 14 && { type: "task", title: "Client Demo Task" },
// // // // //         ].filter(Boolean);
  
// // // // //         days.push({
// // // // //           date: day,
// // // // //           isCurrentMonth,
// // // // //           events: eventList,
// // // // //         });
// // // // //       }
// // // // //     } else {
// // // // //       // Month view (your existing logic)
// // // // //       for (let i = startingDayIndex - 1; i >= 0; i--) {
// // // // //         days.push({ date: daysInPreviousMonth - i, isCurrentMonth: false, events: [] });
// // // // //       }
  
// // // // //       for (let i = 1; i <= daysInMonth; i++) {
// // // // //         const eventList = [
// // // // //           i === 2 && { type: "meeting", title: "Meeting with Carl Pei" },
// // // // //           i === 2 && { type: "task", title: "Client Demo Task" },
// // // // //           i === 14 && { type: "meeting", title: "Meeting with Carl Pei" },
// // // // //           i === 14 && { type: "task", title: "Client Demo Task" },
// // // // //         ].filter(Boolean);
  
// // // // //         days.push({
// // // // //           date: i,
// // // // //           isCurrentMonth: true,
// // // // //           events: eventList,
// // // // //         });
// // // // //       }
// // // // //     }
  
// // // // //     return days;
// // // // //   };
  
  

// // // // //   return (
// // // // //     <div className="max-w-9xl mx-auto p-4 ">
// // // // //       <div className="space-y-6">
// // // // //         {/* Header */}
// // // // //         <div className="flex flex-col gap-2">
// // // // //           <div className="flex flex-wrap items-center justify-between gap-4">
// // // // //             <div>
// // // // //             <h1 className="text-lg sm:text-2xl flex items-center gap-2 font-semibold">
// // // // //               <Calendar1 size={20} /> {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
// // // // //             </h1>

// // // // //               <p className="text-sm sm:text-[16px] text-gray-400">
// // // // //                 Manage your reminders, events, and meetings
// // // // //               </p>
// // // // //             </div>
// // // // //             <div className="flex flex-wrap items-center gap-2">
// // // // //               <div className="flex rounded-full bg-gray-200 p-1">
// // // // //                 <button
// // // // //                   className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full cursor-pointer transition-all duration-300 ${
// // // // //                     selectedView === "month" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-400"
// // // // //                   }`}
// // // // //                   onClick={() => setSelectedView("month")}>
// // // // //                   Month
// // // // //                 </button>
// // // // //                 <button
// // // // //                   className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full cursor-pointer transition-all duration-300 ${
// // // // //                     selectedView === "week" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-400"
// // // // //                   }`}
// // // // //                   onClick={() => setSelectedView("week")}>
// // // // //                   Week
// // // // //                 </button>
// // // // //               </div>
// // // // //               <div className="flex gap-2">
// // // // //                 <button
// // // // //                   onClick={goToPrevious}
// // // // //                   className="border cursor-pointer border-gray-400 p-2 rounded-full bg-gray-100">
// // // // //                   <ChevronLeft size={18} className="text-gray-400" />
// // // // //                 </button>
// // // // //                 <button
// // // // //                   onClick={goToNext}
// // // // //                   className="border cursor-pointer border-gray-400 p-2 rounded-full bg-gray-100">
// // // // //                   <ChevronRight size={18} className="text-gray-400" />
// // // // //                 </button>
// // // // //               </div>
// // // // //               <button
// // // // //                 onClick={() => setIsOpen(!isOpen)}
// // // // //                 className="flex cursor-pointer gap-2 rounded-full py-2 px-4 sm:px-5 items-center text-white bg-[rgb(21,163,149)] hover:bg-teal-600 text-sm sm:text-base">
// // // // //                 <Plus size={18} />
// // // // //                 New
// // // // //               </button>
// // // // //               <SideDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="py-3 overflow-x-auto">
// // // // //           <div className={`grid ${selectedView === "week" ? "grid-cols-7" : "grid-cols-3 sm:grid-cols-7"}`}>
// // // // //             {daysOfWeek.map((day) => (
// // // // //               <div key={day} className="px-3 text-center text-sm sm:text-[17px] text-gray-500">
// // // // //                 {day}
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>

// // // // //           {/* Calendar days */}
// // // // //           <div className="border border-gray-300 rounded-lg">
// // // // //           <div className={`grid ${selectedView === "week" ? "grid-cols-7" : "grid-cols-3 sm:grid-cols-7"}`}>
// // // // //               {generateCalendarDays().map((day, index) => (
// // // // //                 <div
// // // // //                   onClick={handleModal}
// // // // //                   key={index}
// // // // //                   className={`min-h-[100px] sm:min-h-[120px] p-2 border-r border-b border-gray-300 hover:bg-green-50 cursor-pointer ${
// // // // //                     !day.isCurrentMonth ? "bg-gray-50" : ""
// // // // //                   }`}
// // // // //                 >
// // // // //                   <div className="flex items-center justify-between group">
// // // // //                     <Plus size={16} className="text-green-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
// // // // //                     <span className={`text-xs sm:text-sm font-medium ${!day.isCurrentMonth ? "text-gray-400" : ""}`}>
// // // // //                       {day.date}
// // // // //                     </span>
// // // // //                   </div>
// // // // //                   <Modal modelOpen={modelOpen} setmodelOpen={setmodelOpen} />
// // // // //                   <div className="mt-1 space-y-1">
// // // // //                     {day.events.map((event, eventIndex) => (
// // // // //                       <div
// // // // //                         key={eventIndex}
// // // // //                         className={`text-[10px] sm:text-xs p-1 flex gap-1 ps-2 sm:ps-3 rounded font-medium ${
// // // // //                           event.type === "meeting" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-600"
// // // // //                         }`}
// // // // //                       >
// // // // //                         <CircleCheckBig size={12} sm:size={14} /> {event.title}
// // // // //                       </div>
// // // // //                     ))}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               ))}
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // // export default Calendar;



// // // // import { useState, useEffect } from "react";
// // // // import { ChevronLeft, ChevronRight, Plus, Calendar1, CircleCheckBig } from "lucide-react";
// // // // import SideDrawer from "../components/SideDrawer";
// // // // import Modal from "../components/Modal";
// // // // import { useGoogleCalendarQuery } from "../reactQuery/hooks/useCalenderQuery";
// // // // import { toast } from "react-hot-toast";
// // // // import { useNavigate } from "react-router-dom";


// // // // function Calendar() {
// // // //   const {  
// // // //     authData, authLoading, authError,
// // // //     // Events
// // // //     getAllEventsQuery,
// // // //     createEventMutation,
// // // //     getSingleEventQuery,
// // // //     updateEventMutation,
// // // //     deleteEventMutation, 
// // // //   } = useGoogleCalendarQuery();

// // // //   const navigate = useNavigate();
// // // //   const [modelOpen, setmodelOpen] = useState(false);
// // // //   const [isOpen, setIsOpen] = useState(false);
// // // //   const [events, setEvents] = useState([]);
// // // //   const [selectedView, setSelectedView] = useState("month");
// // // //   const [currentDate, setCurrentDate] = useState(new Date());

// // // //   const handleModal = () => {
// // // //     setmodelOpen(!modelOpen);
// // // //   };

// // // //   const handlePreviousMonth = () => {
// // // //     setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
// // // //   };
  
// // // //   const handleNextMonth = () => {
// // // //     setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
// // // //   };

// // // //   const getStartAndEndDates = () => {
// // // //     const year = currentDate.getFullYear();
// // // //     const month = currentDate.getMonth();

// // // //     let startDate, endDate;

// // // //     if (selectedView === "month") {
// // // //       // For the month view, calculate the start and end of the current month
// // // //       startDate = new Date(year, month, 1);
// // // //       endDate = new Date(year, month + 1, 0); // last day of the current month
// // // //     } else if (selectedView === "week") {
// // // //       // For the week view, calculate the start (Sunday) and end (Saturday) of the current week
// // // //       const firstDayOfWeek = currentDate.getDate() - currentDate.getDay(); // Sunday of this week
// // // //       startDate = new Date(year, month, firstDayOfWeek);
// // // //       endDate = new Date(year, month, firstDayOfWeek + 6); // Saturday of this week
// // // //     }

// // // //     // Format the dates to 'YYYY-MM-DD' format (ISO format)
// // // //     const formattedStartDate = startDate.toISOString().split('T')[0];
// // // //     const formattedEndDate = endDate.toISOString().split('T')[0];

// // // //     return { formattedStartDate, formattedEndDate };
// // // //   };

// // // //   const { formattedStartDate, formattedEndDate } = getStartAndEndDates();

// // // //   const {
// // // //     data: allEvents,
// // // //     isLoading: isEventsLoading,
// // // //     isError: isEventsError,
// // // //     error: eventsError,
// // // //   } = getAllEventsQuery({
// // // //     startDate: formattedStartDate,
// // // //     endDate: formattedEndDate,
// // // //   });

// // // //   useEffect(() => {
// // // //     if (allEvents?.tasks) {
// // // //       setEvents(allEvents.tasks); // Set the events data when available
// // // //     }
// // // //   }, [allEvents]);

// // // //   useEffect(() => {
// // // //     console.log(events);
// // // //   }, [events]);

// // // //   const goToPrevious = () => {
// // // //     setCurrentDate(prev => {
// // // //       const newDate = new Date(prev);
// // // //       if (selectedView === "week") {
// // // //         newDate.setDate(newDate.getDate() - 7);
// // // //       } else {
// // // //         newDate.setMonth(newDate.getMonth() - 1);
// // // //       }
// // // //       return newDate;
// // // //     });
// // // //   };
  
// // // //   const goToNext = () => {
// // // //     setCurrentDate(prev => {
// // // //       const newDate = new Date(prev);
// // // //       if (selectedView === "week") {
// // // //         newDate.setDate(newDate.getDate() + 7);
// // // //       } else {
// // // //         newDate.setMonth(newDate.getMonth() + 1);
// // // //       }
// // // //       return newDate;
// // // //     });
// // // //   };
  
// // // //   useEffect(() => {
// // // //     if (!authLoading) {
// // // //       if (!authData?.success) {
// // // //         navigate('/settings');
// // // //         toast.error("You need to connect to Google Calendar to use this feature.");
// // // //       }
// // // //       console.log(authData);
// // // //     }
// // // //   }, [authLoading, authData, authError]);
  

// // // //   const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


// // // //   const generateCalendarDays = () => {
// // // //     const year = currentDate.getFullYear();
// // // //     const month = currentDate.getMonth();
// // // //     const firstDay = new Date(year, month, 1);
// // // //     const lastDay = new Date(year, month + 1, 0);
// // // //     const startingDayIndex = firstDay.getDay();
// // // //     const daysInMonth = lastDay.getDate();
  
// // // //     const previousMonth = new Date(year, month, 0);
// // // //     const daysInPreviousMonth = previousMonth.getDate();
  
// // // //     const days = [];
  
// // // //     if (selectedView === "week") {
// // // //       // Get the Sunday of the current week
// // // //       const weekStart = new Date(currentDate);
// // // //       weekStart.setDate(currentDate.getDate() - currentDate.getDay());
  
// // // //       // Fill 7 days (Sunday to Saturday)
// // // //       for (let i = 0; i < 7; i++) {
// // // //         const thisDate = new Date(weekStart);
// // // //         thisDate.setDate(weekStart.getDate() + i);
  
// // // //         const isCurrentMonth = thisDate.getMonth() === month;
  
// // // //         const day = thisDate.getDate();
  
// // // //         const eventList = [
// // // //           day === 2 && { type: "meeting", title: "Meeting with Carl Pei" },
// // // //           day === 2 && { type: "task", title: "Client Demo Task" },
// // // //           day === 14 && { type: "meeting", title: "Meeting with Carl Pei" },
// // // //           day === 14 && { type: "task", title: "Client Demo Task" },
// // // //         ].filter(Boolean);
  
// // // //         days.push({
// // // //           date: day,
// // // //           isCurrentMonth,
// // // //           events: eventList,
// // // //         });
// // // //       }
// // // //     } else {
// // // //        // For month view, we generate days from the 1st of the month
// // // //        for (let i = startingDayIndex - 1; i >= 0; i--) {
// // // //         days.push({ date: daysInPreviousMonth - i, isCurrentMonth: false, events: [] });
// // // //       }

// // // //       for (let i = 1; i <= daysInMonth; i++) {
// // // //         const eventList = events
// // // //           .filter((event) => {
// // // //             const eventDate = new Date(event.eventDate);
// // // //             return eventDate.getDate() === i && eventDate.getMonth() === month;
// // // //           })
// // // //           .map((event) => event.Task_Title); // Directly map to event titles

// // // //         days.push({
// // // //           date: i,
// // // //           isCurrentMonth: true,
// // // //           events: eventList,
// // // //         });
// // // //       }
// // // //     }

// // // //     return days;
// // // //   };
  
  

// // // //   return (
// // // //     <div className="max-w-9xl mx-auto p-4 ">
// // // //       <div className="space-y-6">
// // // //         {/* Header */}
// // // //         <div className="flex flex-col gap-2">
// // // //           <div className="flex flex-wrap items-center justify-between gap-4">
// // // //             <div>
// // // //             <h1 className="text-lg sm:text-2xl flex items-center gap-2 font-semibold">
// // // //               <Calendar1 size={20} /> {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
// // // //             </h1>

// // // //               <p className="text-sm sm:text-[16px] text-gray-400">
// // // //                 Manage your reminders, events, and meetings
// // // //               </p>
// // // //             </div>
// // // //             <div className="flex flex-wrap items-center gap-2">
// // // //               <div className="flex rounded-full bg-gray-200 p-1">
// // // //                 <button
// // // //                   className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full cursor-pointer transition-all duration-300 ${
// // // //                     selectedView === "month" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-400"
// // // //                   }`}
// // // //                   onClick={() => setSelectedView("month")}>
// // // //                   Month
// // // //                 </button>
// // // //                 <button
// // // //                   className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full cursor-pointer transition-all duration-300 ${
// // // //                     selectedView === "week" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-400"
// // // //                   }`}
// // // //                   onClick={() => setSelectedView("week")}>
// // // //                   Week
// // // //                 </button>
// // // //               </div>
// // // //               <div className="flex gap-2">
// // // //                 <button
// // // //                   onClick={goToPrevious}
// // // //                   className="border cursor-pointer border-gray-400 p-2 rounded-full bg-gray-100">
// // // //                   <ChevronLeft size={18} className="text-gray-400" />
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={goToNext}
// // // //                   className="border cursor-pointer border-gray-400 p-2 rounded-full bg-gray-100">
// // // //                   <ChevronRight size={18} className="text-gray-400" />
// // // //                 </button>
// // // //               </div>
// // // //               <button
// // // //                 onClick={() => setIsOpen(!isOpen)}
// // // //                 className="flex cursor-pointer gap-2 rounded-full py-2 px-4 sm:px-5 items-center text-white bg-[rgb(21,163,149)] hover:bg-teal-600 text-sm sm:text-base">
// // // //                 <Plus size={18} />
// // // //                 New
// // // //               </button>
// // // //               <SideDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         <div className="py-3 overflow-x-auto">
// // // //           <div className={`grid ${selectedView === "week" ? "grid-cols-7" : "grid-cols-3 sm:grid-cols-7"}`}>
// // // //             {daysOfWeek.map((day) => (
// // // //               <div key={day} className="px-3 text-center text-sm sm:text-[17px] text-gray-500">
// // // //                 {day}
// // // //               </div>
// // // //             ))}
// // // //           </div>

// // // //           {/* Calendar days */}
// // // //           <div className="border border-gray-300 rounded-lg">
// // // //           <div className={`grid ${selectedView === "week" ? "grid-cols-7" : "grid-cols-3 sm:grid-cols-7"}`}>
// // // //               {generateCalendarDays().map((day, index) => (
// // // //                 <div
// // // //                   onClick={handleModal}
// // // //                   key={index}
// // // //                   className={`min-h-[100px] sm:min-h-[120px] p-2 border-r border-b border-gray-300 hover:bg-green-50 cursor-pointer ${
// // // //                     !day.isCurrentMonth ? "bg-gray-50" : ""
// // // //                   }`}
// // // //                 >
// // // //                   <div className="flex items-center justify-between group">
// // // //                     <Plus size={16} className="text-green-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
// // // //                     <span className={`text-xs sm:text-sm font-medium ${!day.isCurrentMonth ? "text-gray-400" : ""}`}>
// // // //                       {day.date}
// // // //                     </span>
// // // //                   </div>
// // // //                   <Modal modelOpen={modelOpen} setmodelOpen={setmodelOpen} />
// // // //                   <div className="mt-1 space-y-1">
// // // //                     {day.events.map((event, eventIndex) => (
// // // //                       <div
// // // //                         key={eventIndex}
// // // //                         className={`text-[10px] sm:text-xs p-1 flex gap-1 ps-2 sm:ps-3 rounded font-medium ${
// // // //                           event.type === "meeting" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-600"
// // // //                         }`}
// // // //                       >
// // // //                         <CircleCheckBig size={12} sm:size={14} /> {event.Task_Title}
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // // export default Calendar;


// // // import { useState, useEffect } from "react";
// // // import { ChevronLeft, ChevronRight, Plus, Calendar1, CircleCheckBig } from "lucide-react";
// // // import SideDrawer from "../components/SideDrawer";
// // // import Modal from "../components/Modal";
// // // import { useGoogleCalendarQuery } from "../reactQuery/hooks/useCalenderQuery";
// // // import { toast } from "react-hot-toast";
// // // import { useNavigate } from "react-router-dom";

// // // function Calendar() {
// // //   const {  
// // //     authData, authLoading, authError,
// // //     // Events
// // //     getAllEventsQuery,
// // //     createEventMutation,
// // //     getSingleEventQuery,
// // //     updateEventMutation,
// // //     deleteEventMutation, 
// // //   } = useGoogleCalendarQuery();

// // //   const navigate = useNavigate();
// // //   const [modelOpen, setmodelOpen] = useState(false);
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [events, setEvents] = useState([]);
// // //   const [selectedView, setSelectedView] = useState("month");
// // //   const [currentDate, setCurrentDate] = useState(new Date());

// // //   const handleModal = () => {
// // //     setmodelOpen(!modelOpen);
// // //   };

// // //   const handlePreviousMonth = () => {
// // //     setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
// // //   };
  
// // //   const handleNextMonth = () => {
// // //     setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
// // //   };

// // //   const getStartAndEndDates = () => {
// // //     const year = currentDate.getFullYear();
// // //     const month = currentDate.getMonth();

// // //     let startDate, endDate;

// // //     if (selectedView === "month") {
// // //       // For the month view, calculate the start and end of the current month
// // //       startDate = new Date(year, month, 1);
// // //       endDate = new Date(year, month + 1, 0); // last day of the current month
// // //     } else if (selectedView === "week") {
// // //       // For the week view, calculate the start (Sunday) and end (Saturday) of the current week
// // //       const firstDayOfWeek = currentDate.getDate() - currentDate.getDay(); // Sunday of this week
// // //       startDate = new Date(year, month, firstDayOfWeek);
// // //       endDate = new Date(year, month, firstDayOfWeek + 6); // Saturday of this week
// // //     }

// // //     // Format the dates to 'YYYY-MM-DD' format (ISO format)
// // //     const formattedStartDate = startDate.toISOString().split('T')[0];
// // //     const formattedEndDate = endDate.toISOString().split('T')[0];

// // //     return { formattedStartDate, formattedEndDate };
// // //   };

// // //   const { formattedStartDate, formattedEndDate } = getStartAndEndDates();

// // //   const {
// // //     data: allEvents,
// // //     isLoading: isEventsLoading,
// // //     isError: isEventsError,
// // //     error: eventsError,
// // //   } = getAllEventsQuery({
// // //     startDate: formattedStartDate,
// // //     endDate: formattedEndDate,
// // //   });

// // //   useEffect(() => {
// // //     if (allEvents?.tasks) {
// // //       setEvents(allEvents.tasks); // Set the events data when available
// // //     }
// // //   }, [allEvents]);
// // //
// // // const handleDayClick = (day) => {
// // //   // Filter the events for the selected day
// // //   const dayEvents = events.filter((event) => {
// // //     const eventDate = new Date(event.eventDate);
// // //     return eventDate.getDate() === day && eventDate.getMonth() === currentDate.getMonth();
// // //   });
// // //   setSelectedDayEvents(dayEvents); // Store the events for the selected day
// // //   setmodelOpen(true); // Open the modal
// // // };
// // //
// // //   const goToPrevious = () => {
// // //     setCurrentDate(prev => {
// // //       const newDate = new Date(prev);
// // //       if (selectedView === "week") {
// // //         newDate.setDate(newDate.getDate() - 7);
// // //       } else {
// // //         newDate.setMonth(newDate.getMonth() - 1);
// // //       }
// // //       return newDate;
// // //     });
// // //   };
  
// // //   const goToNext = () => {
// // //     setCurrentDate(prev => {
// // //       const newDate = new Date(prev);
// // //       if (selectedView === "week") {
// // //         newDate.setDate(newDate.getDate() + 7);
// // //       } else {
// // //         newDate.setMonth(newDate.getMonth() + 1);
// // //       }
// // //       return newDate;
// // //     });
// // //   };
  
// // //   useEffect(() => {
// // //     if (!authLoading) {
// // //       if (!authData?.success) {
// // //         navigate('/settings');
// // //         toast.error("You need to connect to Google Calendar to use this feature.");
// // //       }
// // //       console.log(authData);
// // //     }
// // //   }, [authLoading, authData, authError]);

// // //   const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// // //   const generateCalendarDays = () => {
// // //     const year = currentDate.getFullYear();
// // //     const month = currentDate.getMonth();
// // //     const firstDay = new Date(year, month, 1);
// // //     const lastDay = new Date(year, month + 1, 0);
// // //     const startingDayIndex = firstDay.getDay();
// // //     const daysInMonth = lastDay.getDate();
  
// // //     const previousMonth = new Date(year, month, 0);
// // //     const daysInPreviousMonth = previousMonth.getDate();
  
// // //     const days = [];
  
// // //     if (selectedView === "week") {
// // //       // Get the Sunday of the current week
// // //       const weekStart = new Date(currentDate);
// // //       weekStart.setDate(currentDate.getDate() - currentDate.getDay());
  
// // //       // Fill 7 days (Sunday to Saturday)
// // //       for (let i = 0; i < 7; i++) {
// // //         const thisDate = new Date(weekStart);
// // //         thisDate.setDate(weekStart.getDate() + i);
  
// // //         const isCurrentMonth = thisDate.getMonth() === month;
  
// // //         const day = thisDate.getDate();
  
// // //         const eventList = events
// // //           .filter((event) => {
// // //             const eventDate = new Date(event.eventDate);
// // //             return eventDate.getDate() === day && eventDate.getMonth() === month;
// // //           })
// // //           .map((event) => event.Task_Title);
  
// // //         days.push({
// // //           date: day,
// // //           isCurrentMonth,
// // //           events: eventList,
// // //         });
// // //       }
// // //     } else {
// // //        // For month view, we generate days from the 1st of the month
// // //        for (let i = startingDayIndex - 1; i >= 0; i--) {
// // //         days.push({ date: daysInPreviousMonth - i, isCurrentMonth: false, events: [] });
// // //       }

// // //       for (let i = 1; i <= daysInMonth; i++) {
// // //         const eventList = events
// // //           .filter((event) => {
// // //             const eventDate = new Date(event.eventDate);
// // //             return eventDate.getDate() === i && eventDate.getMonth() === month;
// // //           })
// // //           .map((event) => event.Task_Title); // Directly map to event titles

// // //         days.push({
// // //           date: i,
// // //           isCurrentMonth: true,
// // //           events: eventList,
// // //         });
// // //       }
// // //     }

// // //     return days;
// // //   };

// // //   return (
// // //     <div className="max-w-9xl mx-auto p-4 ">
// // //       <div className="space-y-6">
// // //         {/* Header */}
// // //         <div className="flex flex-col gap-2">
// // //           <div className="flex flex-wrap items-center justify-between gap-4">
// // //             <div>
// // //               <h1 className="text-lg sm:text-2xl flex items-center gap-2 font-semibold">
// // //                 <Calendar1 size={20} /> {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
// // //               </h1>
// // //               <p className="text-sm sm:text-[16px] text-gray-400">
// // //                 Manage your reminders, events, and meetings
// // //               </p>
// // //             </div>
// //             // <div className="flex flex-wrap items-center gap-2">
// //             //   <div className="flex rounded-full bg-gray-200 p-1">
// //             //     <button
// //             //       className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full cursor-pointer transition-all duration-300 ${
// //             //         selectedView === "month" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-400"
// //             //       }`}
// //             //       onClick={() => setSelectedView("month")}>
// //             //       Month
// //             //     </button>
// //             //     <button
// //             //       className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full cursor-pointer transition-all duration-300 ${
// //             //         selectedView === "week" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-400"
// //             //       }`}
// //             //       onClick={() => setSelectedView("week")}>
// //             //       Week
// //             //     </button>
// //             //   </div>
// // //               <div className="flex gap-2">
// // //                 <button
// // //                   onClick={goToPrevious}
// // //                   className="border cursor-pointer border-gray-400 p-2 rounded-full bg-gray-100">
// // //                   <ChevronLeft size={18} className="text-gray-400" />
// // //                 </button>
// // //                 <button
// // //                   onClick={goToNext}
// // //                   className="border cursor-pointer border-gray-400 p-2 rounded-full bg-gray-100">
// // //                   <ChevronRight size={18} className="text-gray-400" />
// // //                 </button>
// // //               </div>
// //         //       <button
// //         //         onClick={() => setIsOpen(!isOpen)}
// //         //         className="flex cursor-pointer gap-2 rounded-full py-2 px-4 sm:px-5 items-center text-white bg-[rgb(21,163,149)] hover:bg-teal-600 text-sm sm:text-base">
// //         //         <Plus size={18} />
// //         //         New
// //         //       </button>
// //         //       <SideDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
// //         //     </div>
// //         //   </div>
// //         // </div>

// // //         <div className="py-3 overflow-x-auto">
// // //           <div className={`grid ${selectedView === "week" ? "grid-cols-7" : "grid-cols-3 sm:grid-cols-7"}`}>
// // //             {daysOfWeek.map((day) => (
// // //               <div key={day} className="px-3 text-center text-sm sm:text-[17px] text-gray-500">
// // //                 {day}
// // //               </div>
// // //             ))}
// // //           </div>

// // //           {/* Calendar days */}
// // //           <div className="border border-gray-300 rounded-lg">
// // //             <div className={`grid ${selectedView === "week" ? "grid-cols-7" : "grid-cols-3 sm:grid-cols-7"}`}>
// // //               {generateCalendarDays().map((day, index) => (
// // //                 <div
// // //                   onClick={handleModal}
// // //                   key={index}
// // //                   className={`min-h-[100px] sm:min-h-[120px] p-2 border-r border-b border-gray-300 hover:bg-green-50 cursor-pointer ${
// // //                     !day.isCurrentMonth ? "bg-gray-50" : ""
// // //                   }`}>
// // //                   <div className="flex items-center justify-between group">
// // //                     <Plus size={16} className="text-green-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
// // //                     <span className={`text-xs sm:text-sm font-medium ${!day.isCurrentMonth ? "text-gray-400" : ""}`}>
// // //                       {day.date}
// // //                     </span>
// // //                   </div>
// // //                   <Modal modelOpen={modelOpen} setmodelOpen={setmodelOpen} />
// // //                   <div className="mt-1 space-y-1">
// // //                     {day.events.map((event, eventIndex) => (
// // //                       <div key={eventIndex} className="text-[10px] sm:text-xs p-1 flex items-center gap-1 ps-2 sm:ps-3 rounded font-medium bg-green-100 text-green-600">
// // //                         <CircleCheckBig size={12} sm:size={14} /> {event}
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // // export default Calendar;



// // import { useState, useEffect } from "react";
// // import { ChevronLeft, ChevronRight, Plus, Calendar1, CircleCheckBig } from "lucide-react";
// // import SideDrawer from "../components/SideDrawer";
// // import Modal from "../components/Modal";
// // import { useGoogleCalendarQuery } from "../reactQuery/hooks/useCalenderQuery";
// // import { toast } from "react-hot-toast";
// // import { useNavigate } from "react-router-dom";

// // function Calendar() {
// //   const {  
// //     authData, authLoading, authError,
// //     getAllEventsQuery,
// //     createEventMutation,
// //     getSingleEventQuery,
// //     updateEventMutation,
// //     deleteEventMutation, 
// //   } = useGoogleCalendarQuery();

// //   const navigate = useNavigate();
// //   const [modelOpen, setmodelOpen] = useState(false);
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [events, setEvents] = useState([]);
// //   const [selectedView, setSelectedView] = useState("month");
// //   const [currentDate, setCurrentDate] = useState(new Date());
// //   const [selectedDayEvents, setSelectedDayEvents] = useState([]); // State to hold selected day's events

// //   const handleModal = () => {
// //     setmodelOpen(!modelOpen);
// //   };

// //   const handlePreviousMonth = () => {
// //     setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
// //   };
  
// //   const handleNextMonth = () => {
// //     setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
// //   };

// //   const getStartAndEndDates = () => {
// //     const year = currentDate.getFullYear();
// //     const month = currentDate.getMonth();

// //     let startDate, endDate;

// //     if (selectedView === "month") {
// //       startDate = new Date(year, month, 1);
// //       endDate = new Date(year, month + 1, 0);
// //     } else if (selectedView === "week") {
// //       const firstDayOfWeek = currentDate.getDate() - currentDate.getDay(); 
// //       startDate = new Date(year, month, firstDayOfWeek);
// //       endDate = new Date(year, month, firstDayOfWeek + 6);
// //     }

// //     const formattedStartDate = startDate.toISOString().split('T')[0];
// //     const formattedEndDate = endDate.toISOString().split('T')[0];

// //     return { formattedStartDate, formattedEndDate };
// //   };

// //   const { formattedStartDate, formattedEndDate } = getStartAndEndDates();

// //   const {
// //     data: allEvents,
// //     isLoading: isEventsLoading,
// //     isError: isEventsError,
// //     error: eventsError,
// //   } = getAllEventsQuery({
// //     startDate: formattedStartDate,
// //     endDate: formattedEndDate,
// //   });

// //   useEffect(() => {
// //     if (allEvents?.tasks) {
// //       setEvents(allEvents.tasks); 
// //     }
// //   }, [allEvents]);

// //   const handleDayClick = (day) => {
// //     // Filter the events for the selected day
// //     const dayEvents = events.filter((event) => {
// //       const eventDate = new Date(event.eventDate);
// //       return eventDate.getDate() === day && eventDate.getMonth() === currentDate.getMonth();
// //     });
// //     setSelectedDayEvents(dayEvents); // Store the events for the selected day
// //     setmodelOpen(true); // Open the modal
// //   };

// //   const goToPrevious = () => {
// //     setCurrentDate(prev => {
// //       const newDate = new Date(prev);
// //       if (selectedView === "week") {
// //         newDate.setDate(newDate.getDate() - 7);
// //       } else {
// //         newDate.setMonth(newDate.getMonth() - 1);
// //       }
// //       return newDate;
// //     });
// //   };
  
// //   const goToNext = () => {
// //     setCurrentDate(prev => {
// //       const newDate = new Date(prev);
// //       if (selectedView === "week") {
// //         newDate.setDate(newDate.getDate() + 7);
// //       } else {
// //         newDate.setMonth(newDate.getMonth() + 1);
// //       }
// //       return newDate;
// //     });
// //   };
  
// //   useEffect(() => {
// //     if (!authLoading) {
// //       if (!authData?.success) {
// //         navigate('/settings');
// //         toast.error("You need to connect to Google Calendar to use this feature.");
// //       }
// //     }
// //   }, [authLoading, authData, authError]);

// //   const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// //   const generateCalendarDays = () => {
// //     const year = currentDate.getFullYear();
// //     const month = currentDate.getMonth();
// //     const firstDay = new Date(year, month, 1);
// //     const lastDay = new Date(year, month + 1, 0);
// //     const startingDayIndex = firstDay.getDay();
// //     const daysInMonth = lastDay.getDate();
  
// //     const previousMonth = new Date(year, month, 0);
// //     const daysInPreviousMonth = previousMonth.getDate();
  
// //     const days = [];
  
// //     if (selectedView === "week") {
// //       const weekStart = new Date(currentDate);
// //       weekStart.setDate(currentDate.getDate() - currentDate.getDay());
  
// //       for (let i = 0; i < 7; i++) {
// //         const thisDate = new Date(weekStart);
// //         thisDate.setDate(weekStart.getDate() + i);
  
// //         const isCurrentMonth = thisDate.getMonth() === month;
// //         const day = thisDate.getDate();
  
// //         const eventList = events
// //           .filter((event) => {
// //             const eventDate = new Date(event.eventDate);
// //             return eventDate.getDate() === day && eventDate.getMonth() === month;
// //           })
// //           .map((event) => event.Task_Title);
  
// //         days.push({
// //           date: day,
// //           isCurrentMonth,
// //           events: eventList,
// //         });
// //       }
// //     } else {
// //       for (let i = startingDayIndex - 1; i >= 0; i--) {
// //         days.push({ date: daysInPreviousMonth - i, isCurrentMonth: false, events: [] });
// //       }

// //       for (let i = 1; i <= daysInMonth; i++) {
// //         const eventList = events
// //           .filter((event) => {
// //             const eventDate = new Date(event.eventDate);
// //             return eventDate.getDate() === i && eventDate.getMonth() === month;
// //           })
// //           .map((event) => event.Task_Title);

// //         days.push({
// //           date: i,
// //           isCurrentMonth: true,
// //           events: eventList,
// //         });
// //       }
// //     }

// //     return days;
// //   };

// //   return (
// //     <div className="max-w-9xl mx-auto p-4 ">
// //       <div className="space-y-6">
// //         <div className="flex flex-col gap-2">
// //           <div className="flex flex-wrap items-center justify-between gap-4">
// //             <div>
// //               <h1 className="text-lg sm:text-2xl flex items-center gap-2 font-semibold">
// //                 <Calendar1 size={20} /> {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
// //               </h1>
// //               <p className="text-sm sm:text-[16px] text-gray-400">
// //                 Manage your reminders, events, and meetings
// //               </p>
// //             </div>
// //             <div className="flex flex-wrap items-center gap-2">
// //               <div className="flex rounded-full bg-gray-200 p-1">
// //                 <button
// //                   className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full cursor-pointer transition-all duration-300 ${
// //                     selectedView === "month" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-400"
// //                   }`}
// //                   onClick={() => setSelectedView("month")}>
// //                   Month
// //                 </button>
// //                 <button
// //                   className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full cursor-pointer transition-all duration-300 ${
// //                     selectedView === "week" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-400"
// //                   }`}
// //                   onClick={() => setSelectedView("week")}>
// //                   Week
// //                 </button>
// //               </div>
// //               {/* </div>
// //             <div className="flex flex-wrap items-center gap-2"> */}
// //               <button
// //                 onClick={goToPrevious}
// //                 className="border cursor-pointer border-gray-400 p-2 rounded-full bg-gray-100">
// //                 <ChevronLeft size={18} className="text-gray-400" />
// //               </button>
// //               <button
// //                 onClick={goToNext}
// //                 className="border cursor-pointer border-gray-400 p-2 rounded-full bg-gray-100">
// //                 <ChevronRight size={18} className="text-gray-400" />
// //               </button>
// //               <button
// //                 onClick={() => setIsOpen(!isOpen)}
// //                 className="flex cursor-pointer gap-2 rounded-full py-2 px-4 sm:px-5 items-center text-white bg-[rgb(21,163,149)] hover:bg-teal-600 text-sm sm:text-base">
// //                 <Plus size={18} />
// //                 New
// //               </button>
// //               <SideDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
// //             </div>
// //           </div>
// //         </div>

// //         <div className="py-3 overflow-x-auto">
// //           <div className={`grid ${selectedView === "week" ? "grid-cols-7" : "grid-cols-3 sm:grid-cols-7"}`}>
// //             {daysOfWeek.map((day) => (
// //               <div key={day} className="px-3 text-center text-sm sm:text-[17px] text-gray-500">
// //                 {day}
// //               </div>
// //             ))}
// //           </div>

// //           {/* Calendar days */}
// //           <div className="border border-gray-300 rounded-lg">
// //             <div className={`grid ${selectedView === "week" ? "grid-cols-7" : "grid-cols-3 sm:grid-cols-7"}`}>
// //               {generateCalendarDays().map((day, index) => (
// //                 <div
// //                   onClick={() => handleDayClick(day.date)} // Pass the day to handleDayClick
// //                   key={index}
// //                   className={`min-h-[100px] sm:min-h-[120px] p-2 border-r border-b border-gray-300 hover:bg-green-50 cursor-pointer ${
// //                     !day.isCurrentMonth ? "bg-gray-50" : ""
// //                   }`}>
// //                   <div className="flex items-center justify-between group">
// //                     <span className={`text-xs sm:text-sm font-medium ${!day.isCurrentMonth ? "text-gray-400" : ""}`}>
// //                       {day.date}
// //                     </span>
// //                   </div>
// //                   <div className="mt-1 space-y-1">
// //                     {day.events.map((event, eventIndex) => (
// //                       <div key={eventIndex} className="text-[10px] sm:text-xs p-1 flex gap-1 ps-2 sm:ps-3 rounded font-medium bg-green-100 text-green-600">
// //                         <CircleCheckBig size={12} sm:size={14} /> {event}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <Modal modelOpen={modelOpen} setmodelOpen={setmodelOpen} selectedDayEvents={selectedDayEvents} />
// //     </div>
// //   );
// // }

// // export default Calendar;


// import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight, Plus, Calendar1, CircleCheckBig } from "lucide-react";
// import SideDrawer from "../components/SideDrawer";
// import Modal from "../components/Modal";
// import { useGoogleCalendarQuery } from "../reactQuery/hooks/useCalenderQuery";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// function Calendar() {
//   const {  
//     authData, authLoading, authError,
//     getAllEventsQuery,
//     createEventMutation,
//     getSingleEventQuery,
//     updateEventMutation,
//     deleteEventMutation, 
//   } = useGoogleCalendarQuery();

//   const navigate = useNavigate();
//   const [modelOpen, setmodelOpen] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [events, setEvents] = useState([]);
//   const [selectedView, setSelectedView] = useState("month");
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDayEvents, setSelectedDayEvents] = useState([]); 

//   const handleModal = () => {
//     setmodelOpen(!modelOpen);
//   };

//   const handlePreviousMonth = () => {
//     setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
//   };
  
//   const handleNextMonth = () => {
//     setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
//   };

//   const getStartAndEndDates = () => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();

//     let startDate, endDate;

//     if (selectedView === "month") {
//       startDate = new Date(year, month, 1);
//       endDate = new Date(year, month + 1, 0);
//     } else if (selectedView === "week") {
//       const firstDayOfWeek = currentDate.getDate() - currentDate.getDay(); 
//       startDate = new Date(year, month, firstDayOfWeek);
//       endDate = new Date(year, month, firstDayOfWeek + 6);
//     }

//     const formattedStartDate = startDate.toISOString().split('T')[0];
//     const formattedEndDate = endDate.toISOString().split('T')[0];

//     return { formattedStartDate, formattedEndDate };
//   };

//   const { formattedStartDate, formattedEndDate } = getStartAndEndDates();

//   const {
//     data: allEvents,
//     isLoading: isEventsLoading,
//     isError: isEventsError,
//     error: eventsError,
//   } = getAllEventsQuery({
//     startDate: formattedStartDate,
//     endDate: formattedEndDate,
//   });

//   useEffect(() => {
//     if (allEvents?.tasks) {
//       setEvents(allEvents.tasks); 
//     }
//   }, [allEvents]);

//   const handleDayClick = (day) => {
//     const dayEvents = events.filter((event) => {
//       const eventDate = new Date(event.eventDate);
//       return eventDate.getDate() === day && eventDate.getMonth() === currentDate.getMonth();
//     });
//     setSelectedDayEvents(dayEvents);
//     setmodelOpen(true); 
//   };

//   const goToPrevious = () => {
//     setCurrentDate(prev => {
//       const newDate = new Date(prev);
//       if (selectedView === "week") {
//         newDate.setDate(newDate.getDate() - 7);
//       } else {
//         newDate.setMonth(newDate.getMonth() - 1);
//       }
//       return newDate;
//     });
//   };
  
//   const goToNext = () => {
//     setCurrentDate(prev => {
//       const newDate = new Date(prev);
//       if (selectedView === "week") {
//         newDate.setDate(newDate.getDate() + 7);
//       } else {
//         newDate.setMonth(newDate.getMonth() + 1);
//       }
//       return newDate;
//     });
//   };

//   useEffect(() => {
//     if (!authLoading) {
//       if (!authData?.success) {
//         navigate('/settings');
//         toast.error("You need to connect to Google Calendar to use this feature.");
//       }
//     }
//   }, [authLoading, authData, authError]);

//   const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//   const generateCalendarDays = () => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const startingDayIndex = firstDay.getDay();
//     const daysInMonth = lastDay.getDate();
  
//     const previousMonth = new Date(year, month, 0);
//     const daysInPreviousMonth = previousMonth.getDate();
  
//     const days = [];
  
//     if (selectedView === "week") {
//       const weekStart = new Date(currentDate);
//       weekStart.setDate(currentDate.getDate() - currentDate.getDay());
  
//       for (let i = 0; i < 7; i++) {
//         const thisDate = new Date(weekStart);
//         thisDate.setDate(weekStart.getDate() + i);
  
//         const isCurrentMonth = thisDate.getMonth() === month;
//         const day = thisDate.getDate();
  
//         const eventList = events
//           .filter((event) => {
//             const eventDate = new Date(event.eventDate);
//             return eventDate.getDate() === day && eventDate.getMonth() === month;
//           })
//           .map((event) => event.Task_Title);
  
//         days.push({
//           date: day,
//           isCurrentMonth,
//           events: eventList,
//         });
//       }
//     } else {
//       for (let i = startingDayIndex - 1; i >= 0; i--) {
//         days.push({ date: daysInPreviousMonth - i, isCurrentMonth: false, events: [] });
//       }

//       for (let i = 1; i <= daysInMonth; i++) {
//         const eventList = events
//           .filter((event) => {
//             const eventDate = new Date(event.eventDate);
//             return eventDate.getDate() === i && eventDate.getMonth() === month;
//           })
//           .map((event) => event.Task_Title);

//         days.push({
//           date: i,
//           isCurrentMonth: true,
//           events: eventList,
//         });
//       }
//     }

//     return days;
//   };

//   return (
//     <div className="max-w-9xl mx-auto p-4 ">
//       <div className="space-y-6">
//         <div className="flex flex-col gap-2">
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div>
//               <h1 className="text-lg sm:text-2xl flex items-center gap-2 font-semibold">
//                 <Calendar1 size={20} /> {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
//               </h1>
//               <p className="text-sm sm:text-[16px] text-gray-400">
//                 Manage your reminders, events, and meetings
//               </p>
//             </div>
//             <div className="flex flex-wrap items-center gap-2">
//               <div className="flex rounded-full bg-gray-200 p-1">
//                 <button
//                   className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full cursor-pointer transition-all duration-300 ${selectedView === "month" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-400"}`}
//                   onClick={() => setSelectedView("month")}>
//                   Month
//                 </button>
//                 <button
//                   className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full cursor-pointer transition-all duration-300 ${selectedView === "week" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-400"}`}
//                   onClick={() => setSelectedView("week")}>
//                   Week
//                 </button>
//               </div>
//               <button onClick={goToPrevious} className="border cursor-pointer border-gray-400 p-2 rounded-full bg-gray-100">
//                 <ChevronLeft size={18} className="text-gray-400" />
//               </button>
//               <button onClick={goToNext} className="border cursor-pointer border-gray-400 p-2 rounded-full bg-gray-100">
//                 <ChevronRight size={18} className="text-gray-400" />
//               </button>
//               <button onClick={() => setIsOpen(!isOpen)} className="flex cursor-pointer gap-2 rounded-full py-2 px-4 sm:px-5 items-center text-white bg-[rgb(21,163,149)] hover:bg-teal-600 text-sm sm:text-base">
//                 <Plus size={18} />
//                 New
//               </button>
//               <SideDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
//             </div>
//           </div>
//         </div>

//         <div className="py-3 overflow-x-auto">
//           <div className={`grid ${selectedView === "week" ? "grid-cols-7" : "grid-cols-3 sm:grid-cols-7"}`}>
//             {daysOfWeek.map((day) => (
//               <div key={day} className="px-3 text-center text-sm sm:text-[17px] text-gray-500">{day}</div>
//             ))}
//           </div>

//           <div className="border border-gray-300 rounded-lg">
//             <div className={`grid ${selectedView === "week" ? "grid-cols-7" : "grid-cols-3 sm:grid-cols-7"}`}>
//               {generateCalendarDays().map((day, index) => (
//                 <div onClick={() => handleDayClick(day.date)} key={index} className={`min-h-[100px] sm:min-h-[120px] p-2 border-r border-b border-gray-300 hover:bg-green-50 cursor-pointer ${!day.isCurrentMonth ? "bg-gray-50" : ""}`}>
//                   <div className="flex items-center justify-between group">
//                     <span className={`text-xs sm:text-sm font-medium ${!day.isCurrentMonth ? "text-gray-400" : ""}`}>{day.date}</span>
//                   </div>
//                   <div className="mt-1 space-y-1">
//                     {day.events.map((event, eventIndex) => (
//                       <div key={eventIndex} className="text-[10px] sm:text-xs p-1 flex gap-1 ps-2 sm:ps-3 rounded font-medium bg-green-100 text-green-600">
//                         <CircleCheckBig size={12} sm:size={14} /> {event}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <Modal modelOpen={modelOpen} setmodelOpen={setmodelOpen} selectedDayEvents={selectedDayEvents} />
//     </div>
//   );
// }

// export default Calendar;


import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, Calendar1, CircleCheckBig } from "lucide-react";
import SideDrawer from "../components/SideDrawer";
import Modal from "../components/Modal";
import { useGoogleCalendarQuery } from "../reactQuery/hooks/useCalenderQuery";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Calendar() {
  const {  
    authData, authLoading, authError,
    getAllEventsQuery,
    createEventMutation,
    getSingleEventQuery,
    updateEventMutation,
    deleteEventMutation, 
  } = useGoogleCalendarQuery();

  const navigate = useNavigate();
  const [modelOpen, setmodelOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedView, setSelectedView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // New state for the selected event

  const handleModal = () => {
    setmodelOpen(!modelOpen);
  };

  const handlePreviousMonth = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  const getStartAndEndDates = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    let startDate, endDate;

    if (selectedView === "month") {
      startDate = new Date(year, month, 1);
      endDate = new Date(year, month + 1, 0);
    } else if (selectedView === "week") {
      const firstDayOfWeek = currentDate.getDate() - currentDate.getDay(); 
      startDate = new Date(year, month, firstDayOfWeek);
      endDate = new Date(year, month, firstDayOfWeek + 6);
    }

    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    return { formattedStartDate, formattedEndDate };
  };

  const { formattedStartDate, formattedEndDate } = getStartAndEndDates();

  const {
    data: allEvents,
    isLoading: isEventsLoading,
    isError: isEventsError,
    error: eventsError,
  } = getAllEventsQuery({
    startDate: formattedStartDate,
    endDate: formattedEndDate,
  });

  useEffect(() => {
    if (allEvents?.tasks) {
      setEvents(allEvents.tasks); 
    }
  }, [allEvents]);

  const handleDayClick = (day) => {
    const dayEvents = events.filter((event) => {
      const eventDate = new Date(event.eventDate);
      return eventDate.getDate() === day && eventDate.getMonth() === currentDate.getMonth();
    });
    setSelectedDayEvents(dayEvents); // This stores the events for the selected day
    setmodelOpen(true); // Open the modal with events for the day
  };
  
  const handleOpenSideDrawer = (event) => {
    setSelectedEvent(event); // Set the selected event
    setIsOpen(true); // Open the side drawer with event details
  };

  const goToPrevious = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (selectedView === "week") {
        newDate.setDate(newDate.getDate() - 7);
      } else {
        newDate.setMonth(newDate.getMonth() - 1);
      }
      return newDate;
    });
  };
  
  const goToNext = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (selectedView === "week") {
        newDate.setDate(newDate.getDate() + 7);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  useEffect(() => {
    if (!authLoading) {
      if (!authData?.success) {
        navigate('/settings');
        toast.error("You need to connect to Google Calendar to use this feature.");
      }
    }
  }, [authLoading, authData, authError]);

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
  
    const days = [];
  
    if (selectedView === "week") {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
  
      for (let i = 0; i < 7; i++) {
        const thisDate = new Date(weekStart);
        thisDate.setDate(weekStart.getDate() + i);
  
        const isCurrentMonth = thisDate.getMonth() === month;
        const day = thisDate.getDate();
  
        const eventList = events
          .filter((event) => {
            const eventDate = new Date(event.eventDate);
            return eventDate.getDate() === day && eventDate.getMonth() === month;
          })
          .map((event) => event.Task_Title);
  
        days.push({
          date: day,
          isCurrentMonth,
          events: eventList,
        });
      }
    } else {
      for (let i = startingDayIndex - 1; i >= 0; i--) {
        days.push({ date: daysInPreviousMonth - i, isCurrentMonth: false, events: [] });
      }

      for (let i = 1; i <= daysInMonth; i++) {
        const eventList = events
          .filter((event) => {
            const eventDate = new Date(event.eventDate);
            return eventDate.getDate() === i && eventDate.getMonth() === month;
          })
          .map((event) => event.Task_Title);

        days.push({
          date: i,
          isCurrentMonth: true,
          events: eventList,
        });
      }
    }

    return days;
  };

  return (
    <div className="max-w-9xl mx-auto p-4 ">
      <div className="space-y-6">
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
                  className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full cursor-pointer transition-all duration-300 ${selectedView === "month" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-400"}`}
                  onClick={() => setSelectedView("month")}>
                  Month
                </button>
                <button
                  className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full cursor-pointer transition-all duration-300 ${selectedView === "week" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-400"}`}
                  onClick={() => setSelectedView("week")}>
                  Week
                </button>
              </div>
              <button onClick={goToPrevious} className="border cursor-pointer border-gray-400 p-2 rounded-full bg-gray-100">
                <ChevronLeft size={18} className="text-gray-400" />
              </button>
              <button onClick={goToNext} className="border cursor-pointer border-gray-400 p-2 rounded-full bg-gray-100">
                <ChevronRight size={18} className="text-gray-400" />
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="flex cursor-pointer gap-2 rounded-full py-2 px-4 sm:px-5 items-center text-white bg-[rgb(21,163,149)] hover:bg-teal-600 text-sm sm:text-base">
                <Plus size={18} />
                New
              </button>
              <SideDrawer isOpen={isOpen} setIsOpen={setIsOpen} data={selectedEvent} setSelectedEvent={setSelectedEvent} />
            </div>
          </div>
        </div>

        <div className="py-3 overflow-x-auto">
          <div className={`grid ${selectedView === "week" ? "grid-cols-7" : "grid-cols-3 sm:grid-cols-7"}`}>
            {daysOfWeek.map((day) => (
              <div key={day} className="px-3 py-3 text-center text-sm sm:text-[17px] text-gray-500">{day}</div>
            ))}
          </div>

          <div className="border border-gray-300 rounded-lg">
            <div className={`grid ${selectedView === "week" ? "grid-cols-7" : "grid-cols-3 sm:grid-cols-7"}`}>
              {generateCalendarDays().map((day, index) => (
                <div onClick={() => handleDayClick(day.date)} key={index} className={`min-h-[100px] sm:min-h-[120px] p-2 border-r border-b border-gray-300 hover:bg-green-50 cursor-pointer ${!day.isCurrentMonth ? "bg-gray-50" : ""}`}>
                  <div className="flex items-center justify-between group">
                    <span className={`text-xs sm:text-sm font-medium ${!day.isCurrentMonth ? "text-gray-400" : ""}`}>{day.date}</span>
                  </div>
                  <div className="mt-1 space-y-1">
                    {day.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="text-[10px] sm:text-xs p-1 flex gap-1 ps-2 sm:ps-3 rounded font-medium bg-green-100 text-green-600">
                        <CircleCheckBig size={12} sm:size={14} /> {event}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal modelOpen={modelOpen} setmodelOpen={setmodelOpen} selectedDayEvents={selectedDayEvents} openSideDrawerWithEvent={handleOpenSideDrawer} />
    </div>
  );
}

export default Calendar;

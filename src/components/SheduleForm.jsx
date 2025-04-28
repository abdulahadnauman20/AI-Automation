// // // import { useState } from "react";
// // // import { ChevronDown, Plus, Calendar, X } from "lucide-react";
// // // import { useCampaignQuery } from "../reactQuery/hooks/useCampaignQuery";

// // // function ScheduleForm({ campaignId }) {
// // //   const [schedules, setSchedules] = useState([{ id: 1, name: "Schedule 1" }]);
// // //   const [activeSchedule, setActiveSchedule] = useState(1);
// // //   const [scheduleName, setScheduleName] = useState("Schedule 1");
// // //   const [startDate] = useState("Now");
// // //   const [endDate] = useState("No end date");
// // //   const [fromTime, setFromTime] = useState("9:00 AM");
// // //   const [toTime, setToTime] = useState("6:00 PM");
// // //   const [timezone, setTimezone] = useState("Eastern Time (US & Canada)");
// // //   const [selectedDays, setSelectedDays] = useState({
// // //     Monday: false,
// // //     Tuesday: false,
// // //     Wednesday: false,
// // //     Thursday: false,
// // //     Friday: false,
// // //     Saturday: false,
// // //   });

// // //   const { getCampaignScheduleQuery } = useCampaignQuery();


// // //   const {
// // //     data: campaignSchedule,
// // //     isLoading: isScheduleLoading,
// // //     isError: isScheduleError,
// // //     error: scheduleError,
// // //   } = getCampaignScheduleQuery(campaignId);

// // //   useEffect(() => {
// // //     if (campaignSchedule?.schedule) {
// // //       const scheduleData = campaignSchedule.schedule.map((schedule, index) => ({
// // //         id: index + 1,
// // //         name: `Schedule ${index + 1}`,
// // //         fromTime: schedule.FromTime,
// // //         toTime: schedule.ToTime,
// // //         timezone: schedule.Timezone,
// // //         days: schedule.Days,
// // //       }));
// // //       setSchedules(scheduleData);
// // //       setActiveSchedule(scheduleData[0]?.id);
// // //       setScheduleName(scheduleData[0]?.name);
// // //     }
// // //   }, [campaignSchedule]);

// // //   const handleDayToggle = (day) => {
// // //     setSelectedDays((prev) => ({
// // //       ...prev,
// // //       [day]: !prev[day],
// // //     }));
// // //   };

// // //   const addSchedule = () => {
// // //     if (schedules.length >= 3) {
// // //       alert("You can't add more than 3 schedules");
// // //       return;
// // //     }
// // //     const newId = schedules.length + 1;
// // //     const newSchedule = { id: newId, name: `Schedule ${newId}` };
// // //     setSchedules([...schedules, newSchedule]);
// // //     setActiveSchedule(newId);
// // //     setScheduleName(newSchedule.name);
// // //   };

// // //   const deleteSchedule = (id) => {
// // //     if (schedules.length === 1) return;
// // //     const updated = schedules.filter((s) => s.id !== id);
// // //     setSchedules(updated);
// // //     if (activeSchedule === id && updated.length > 0) {
// // //       const next = updated[0];
// // //       setActiveSchedule(next.id);
// // //       setScheduleName(next.name);
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto p-4">
// // //       {/* Sidebar */}
// // //       <div className="w-full md:w-64 space-y-4">
// // //         <div className="flex items-center text-gray-600 mb-4 space-x-2">
// // //           <Calendar className="h-5 w-5" />
// // //           <span>Start</span>
// // //           <span className="text-teal-500 ml-auto">{startDate}</span>
// // //         </div>

// // //         <div className="flex items-center text-gray-600 mb-6 space-x-2">
// // //           <Calendar className="h-5 w-5" />
// // //           <span>End date</span>
// // //           <span className="text-teal-500 ml-auto">{endDate}</span>
// // //         </div>

// // //         <div className="border-t border-gray-200 pt-6">
// // //           {schedules.map((schedule) => (
// // //             <div
// // //               key={schedule.id}
// // //               className={`px-4 py-2 mb-2 rounded-md cursor-pointer border relative ${
// // //                 activeSchedule === schedule.id
// // //                   ? "border-teal-500 text-teal-500"
// // //                   : "border-gray-200"
// // //               }`}
// // //               onClick={() => {
// // //                 setActiveSchedule(schedule.id);
// // //                 setScheduleName(schedule.name);
// // //               }}
// // //             >
// // //               <span>{schedule.name}</span>
// // //               {schedules.length > 1 && (
// // //                 <button
// // //                   className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer"
// // //                   onClick={(e) => {
// // //                     e.stopPropagation();
// // //                     deleteSchedule(schedule.id);
// // //                   }}
// // //                 >
// // //                   <X className="h-4 w-4" />
// // //                 </button>
// // //               )}
// // //             </div>
// // //           ))}

// // //           <button
// // //             className={`w-full flex items-center justify-center px-4 py-2 border rounded-full cursor-pointer ${
// // //               schedules.length >= 3
// // //                 ? "text-gray-300 cursor-not-allowed border-gray-200"
// // //                 : "text-gray-500 hover:text-teal-500 border-gray-200"
// // //             }`}
// // //             onClick={addSchedule}
// // //             disabled={schedules.length >= 3}
// // //           >
// // //             <Plus className="h-5 w-5 mr-2" />
// // //             Add schedule
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Main Form */}
// // //       <div className="flex-1 space-y-6">
// // //         <div className="bg-white p-6 shadow rounded-md">
// // //           <h2 className="text-base font-medium mb-2">Schedule Name</h2>
// // //           <input
// // //             value={scheduleName}
// // //             onChange={(e) => setScheduleName(e.target.value)}
// // //             className="w-full border border-teal-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
// // //           />
// // //         </div>

// // //         <div className="bg-white p-6 shadow rounded-md">
// // //           <h2 className="text-base font-medium mb-4">Timing</h2>
// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //             <div>
// // //               <label className="block text-sm text-gray-500 mb-2">From</label>
// // //               <div className="relative">
// // //                 <select
// // //                   value={fromTime}
// // //                   onChange={(e) => setFromTime(e.target.value)}
// // //                   className="w-full border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500"
// // //                 >
// // //                   <option>9:00 AM</option>
// // //                   <option>10:00 AM</option>
// // //                   <option>11:00 AM</option>
// // //                   <option>12:00 PM</option>
// // //                 </select>
// // //               </div>
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm text-gray-500 mb-2">To</label>
// // //               <div className="relative">
// // //                 <select
// // //                   value={toTime}
// // //                   onChange={(e) => setToTime(e.target.value)}
// // //                   className="w-full border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500"
// // //                 >
// // //                   <option>5:00 PM</option>
// // //                   <option>6:00 PM</option>
// // //                   <option>7:00 PM</option>
// // //                   <option>8:00 PM</option>
// // //                 </select>
// // //               </div>
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm text-gray-500 mb-2">Timezone</label>
// // //               <div className="relative">
// // //                 <select
// // //                   value={timezone}
// // //                   onChange={(e) => setTimezone(e.target.value)}
// // //                   className="w-full border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500"
// // //                 >
// // //                   <option>Eastern Time (US & Canada)</option>
// // //                   <option>Central Time (US & Canada)</option>
// // //                   <option>Pacific Time (US & Canada)</option>
// // //                 </select>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="bg-white p-6 shadow rounded-md">
// // //           <h2 className="text-base font-medium mb-4">Days</h2>
// // //           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
// // //             {Object.keys(selectedDays).map((day) => (
// // //               <label key={day} className="flex items-center space-x-2 cursor-pointer">
// // //                 <input
// // //                   type="checkbox"
// // //                   checked={selectedDays[day]}
// // //                   onChange={() => handleDayToggle(day)}
// // //                   className="form-checkbox h-4 w-4 text-teal-500 border-gray-300 rounded cursor-pointer"
// // //                 />
// // //                 <span className="text-sm font-medium">{day}</span>
// // //               </label>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         <div className="flex justify-start">
// // //           <button className="flex items-center cursor-pointer bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md focus:outline-none">
// // //             Save
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default ScheduleForm;


// // import { useState, useEffect } from "react";
// // import { useCampaignQuery } from "../reactQuery/hooks/useCampaignQuery";
// // import { ChevronDown, Plus, Calendar, X } from "lucide-react";

// // function ScheduleForm({ campaignId }) {
// //   const [schedules, setSchedules] = useState([]);
// //   const [activeSchedule, setActiveSchedule] = useState(1);
// //   const [scheduleName, setScheduleName] = useState("Schedule 1");
// //   const [startDate] = useState("Now");
// //   const [endDate] = useState("No end date");
// //   const [fromTime, setFromTime] = useState("9:00 AM");
// //   const [toTime, setToTime] = useState("6:00 PM");
// //   const [timezone, setTimezone] = useState("Eastern Time (US & Canada)");
// //   const [selectedDays, setSelectedDays] = useState({
// //     Monday: false,
// //     Tuesday: false,
// //     Wednesday: false,
// //     Thursday: false,
// //     Friday: false,
// //     Saturday: false,
// //   });

// //   const { getCampaignScheduleQuery } = useCampaignQuery();

// //   const {
// //     data: campaignSchedule,
// //     isLoading: isScheduleLoading,
// //     isError: isScheduleError,
// //     error: scheduleError,
// //   } = getCampaignScheduleQuery(campaignId);

// //   useEffect(() => {
// //     console.log("Campaign Schedule Data:", campaignSchedule);

// //     if (campaignSchedule?.schedule?.Schedule) {
// //       const scheduleData = campaignSchedule.schedule.Schedule.map((schedule, index) => ({
// //         id: index + 1, // Assigning an ID based on the index, modify if you have a unique identifier
// //         name: schedule.Name,
// //         fromTime: convertTime(schedule.TimingFrom), // Adjusted to match your format
// //         toTime: convertTime(schedule.TimingTo), // Adjusted to match your format
// //         timezone: schedule.Timezone,
// //         days: schedule.Days.reduce((acc, day) => {
// //           acc[day] = true;
// //           return acc;
// //         }, {}),
// //       }));

// //       setSchedules(scheduleData);
// //       console.log(schedules);
// //       setActiveSchedule(scheduleData[0]?.id); // Set the first schedule as active by default
// //       setScheduleName(scheduleData[0]?.name);
// //     }
// //   }, [campaignSchedule]);

// //   const convertTime = (timeString) => {
// //     // Convert 24-hour time format to 12-hour time format
// //     const [hours, minutes] = timeString.split(":");
// //     const period = hours >= 12 ? "PM" : "AM";
// //     const hour12 = hours % 12 || 12; // Convert hour to 12-hour format
// //     return `${hour12}:${minutes} ${period}`;
// //   };

// //   const handleDayToggle = (day) => {
// //     setSelectedDays((prev) => ({
// //       ...prev,
// //       [day]: !prev[day],
// //     }));
// //   };

// //   const addSchedule = () => {
// //     if (schedules.length >= 3) {
// //       alert("You can't add more than 3 schedules");
// //       return;
// //     }
// //     const newId = schedules.length + 1;
// //     const newSchedule = { id: newId, name: `Schedule ${newId}` };
// //     setSchedules([...schedules, newSchedule]);
// //     setActiveSchedule(newId);
// //     setScheduleName(newSchedule.name);
// //   };

// //   const deleteSchedule = (id) => {
// //     if (schedules.length === 1) return;
// //     const updated = schedules.filter((s) => s.id !== id);
// //     setSchedules(updated);
// //     if (activeSchedule === id && updated.length > 0) {
// //       const next = updated[0];
// //       setActiveSchedule(next.id);
// //       setScheduleName(next.name);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto p-4">
// //       {/* Sidebar */}
// //       <div className="w-full md:w-64 space-y-4">
// //         <div className="flex items-center text-gray-600 mb-4 space-x-2">
// //           <Calendar className="h-5 w-5" />
// //           <span>Start</span>
// //           <span className="text-teal-500 ml-auto">{startDate}</span>
// //         </div>

// //         <div className="flex items-center text-gray-600 mb-6 space-x-2">
// //           <Calendar className="h-5 w-5" />
// //           <span>End date</span>
// //           <span className="text-teal-500 ml-auto">{endDate}</span>
// //         </div>

// //         <div className="border-t border-gray-200 pt-6">
// //           {schedules.map((schedule) => (
// //             <div
// //               key={schedule.id}
// //               className={`px-4 py-2 mb-2 rounded-md cursor-pointer border relative ${
// //                 activeSchedule === schedule.id
// //                   ? "border-teal-500 text-teal-500"
// //                   : "border-gray-200"
// //               }`}
// //               onClick={() => {
// //                 setActiveSchedule(schedule.id);
// //                 setScheduleName(schedule.name);
// //               }}
// //             >
// //               <span>{schedule.name}</span>
// //               {schedules.length > 1 && (
// //                 <button
// //                   className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer"
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     deleteSchedule(schedule.id);
// //                   }}
// //                 >
// //                   <X className="h-4 w-4" />
// //                 </button>
// //               )}
// //             </div>
// //           ))}

// //           <button
// //             className={`w-full flex items-center justify-center px-4 py-2 border rounded-full cursor-pointer ${
// //               schedules.length >= 3
// //                 ? "text-gray-300 cursor-not-allowed border-gray-200"
// //                 : "text-gray-500 hover:text-teal-500 border-gray-200"
// //             }`}
// //             onClick={addSchedule}
// //             disabled={schedules.length >= 3}
// //           >
// //             <Plus className="h-5 w-5 mr-2" />
// //             Add schedule
// //           </button>
// //         </div>
// //       </div>

// //       {/* Main Form */}
// //       <div className="flex-1 space-y-6">
// //         <div className="bg-white p-6 shadow rounded-md">
// //           <h2 className="text-base font-medium mb-2">Schedule Name</h2>
// //           <input
// //             value={scheduleName}
// //             onChange={(e) => setScheduleName(e.target.value)}
// //             className="w-full border border-teal-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
// //           />
// //         </div>

// //         <div className="bg-white p-6 shadow rounded-md">
// //           <h2 className="text-base font-medium mb-4">Timing</h2>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //             <div>
// //               <label className="block text-sm text-gray-500 mb-2">From</label>
// //               <div className="relative">
// //                 <select
// //                   value={fromTime}
// //                   onChange={(e) => setFromTime(e.target.value)}
// //                   className="w-full border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500"
// //                 >
// //                   <option>9:00 AM</option>
// //                   <option>10:00 AM</option>
// //                   <option>11:00 AM</option>
// //                   <option>12:00 PM</option>
// //                 </select>
// //               </div>
// //             </div>

// //             <div>
// //               <label className="block text-sm text-gray-500 mb-2">To</label>
// //               <div className="relative">
// //                 <select
// //                   value={toTime}
// //                   onChange={(e) => setToTime(e.target.value)}
// //                   className="w-full border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500"
// //                 >
// //                   <option>5:00 PM</option>
// //                   <option>6:00 PM</option>
// //                   <option>7:00 PM</option>
// //                   <option>8:00 PM</option>
// //                 </select>
// //               </div>
// //             </div>

// //             <div>
// //               <label className="block text-sm text-gray-500 mb-2">Timezone</label>
// //               <div className="relative">
// //                 <select
// //                   value={timezone}
// //                   onChange={(e) => setTimezone(e.target.value)}
// //                   className="w-full border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500"
// //                 >
// //                   <option>America/Los_Angeles</option>
// //                   <option>Asia/Dubai</option>
// //                   <option>America/Chicago</option>
// //                   <option>America/New_York</option>
// //                   <option>Europe/London</option>
// //                 </select>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white p-6 shadow rounded-md">
// //           <h2 className="text-base font-medium mb-4">Days</h2>
// //           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
// //             {Object.keys(selectedDays).map((day) => (
// //               <label key={day} className="flex items-center space-x-2 cursor-pointer">
// //                 <input
// //                   type="checkbox"
// //                   checked={selectedDays[day]}
// //                   onChange={() => handleDayToggle(day)}
// //                   className="form-checkbox h-4 w-4 text-teal-500 border-gray-300 rounded cursor-pointer"
// //                 />
// //                 <span className="text-sm font-medium">{day}</span>
// //               </label>
// //             ))}
// //           </div>
// //         </div>

// //         <div className="flex justify-start">
// //           <button className="flex items-center cursor-pointer bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md focus:outline-none">
// //             Save
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ScheduleForm;


// import { useState, useEffect } from "react";
// import { useCampaignQuery } from "../reactQuery/hooks/useCampaignQuery";
// import { ChevronDown, Plus, Calendar, X } from "lucide-react";

// function ScheduleForm({ campaignId }) {
//   const [schedules, setSchedules] = useState([]);
//   const [activeSchedule, setActiveSchedule] = useState(1);

//   const { getCampaignScheduleQuery } = useCampaignQuery();

//   const {
//     data: campaignSchedule,
//     isLoading: isScheduleLoading,
//     isError: isScheduleError,
//     error: scheduleError,
//   } = getCampaignScheduleQuery(campaignId);

//   useEffect(() => {
//     console.log("Campaign Schedule Data:", campaignSchedule);

//     if (campaignSchedule?.schedule?.Schedule) {
//       const scheduleData = campaignSchedule.schedule.Schedule.map((schedule, index) => ({
//         id: index + 1, // Assigning an ID based on the index, modify if you have a unique identifier
//         name: schedule.Name,
//         fromTime: schedule.TimingFrom,
//         toTime: schedule.TimingTo,
//         timezone: schedule.Timezone,
//         days: schedule.Days.reduce((acc, day) => {
//           acc[day] = true;
//           return acc;
//         }, {}),
//       }));

//       setSchedules(scheduleData);
//       setActiveSchedule(scheduleData[0]?.id); // Set the first schedule as active by default
//     }
//   }, [campaignSchedule]);

//   const handleDayToggle = (day, scheduleId) => {
//     setSchedules((prevSchedules) =>
//       prevSchedules.map((schedule) =>
//         schedule.id === scheduleId
//           ? {
//               ...schedule,
//               days: {
//                 ...schedule.days,
//                 [day]: !schedule.days[day],
//               },
//             }
//           : schedule
//       )
//     );
//   };

//   const addSchedule = () => {
//     if (schedules.length >= 3) {
//       alert("You can't add more than 3 schedules");
//       return;
//     }
//     const newId = schedules.length + 1;
//     const newSchedule = { id: newId, name: `Schedule ${newId}`, fromTime: "09:00", toTime: "18:00", days: {} };
//     setSchedules([...schedules, newSchedule]);
//     setActiveSchedule(newId);
//   };

//   const deleteSchedule = (id) => {
//     if (schedules.length === 1) return;
//     const updated = schedules.filter((s) => s.id !== id);
//     setSchedules(updated);
//     if (activeSchedule === id && updated.length > 0) {
//       const next = updated[0];
//       setActiveSchedule(next.id);
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto p-4">
//       {/* Sidebar */}
//       <div className="w-full md:w-64 space-y-4">
//         <div className="flex items-center text-gray-600 mb-4 space-x-2">
//           <Calendar className="h-5 w-5" />
//           <span>Start</span>
//           <span className="text-teal-500 ml-auto">Now</span>
//         </div>

//         <div className="flex items-center text-gray-600 mb-6 space-x-2">
//           <Calendar className="h-5 w-5" />
//           <span>End date</span>
//           <span className="text-teal-500 ml-auto">No end date</span>
//         </div>

//         <div className="border-t border-gray-200 pt-6">
//           {schedules.map((schedule) => (
//             <div
//               key={schedule.id}
//               className={`px-4 py-2 mb-2 rounded-md cursor-pointer border relative ${
//                 activeSchedule === schedule.id
//                   ? "border-teal-500 text-teal-500"
//                   : "border-gray-200"
//               }`}
//               onClick={() => {
//                 setActiveSchedule(schedule.id);
//               }}
//             >
//               <span>{schedule.name}</span>
//               {schedules.length > 1 && (
//                 <button
//                   className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     deleteSchedule(schedule.id);
//                   }}
//                 >
//                   <X className="h-4 w-4" />
//                 </button>
//               )}
//             </div>
//           ))}

//           <button
//             className={`w-full flex items-center justify-center px-4 py-2 border rounded-full cursor-pointer ${
//               schedules.length >= 3
//                 ? "text-gray-300 cursor-not-allowed border-gray-200"
//                 : "text-gray-500 hover:text-teal-500 border-gray-200"
//             }`}
//             onClick={addSchedule}
//             disabled={schedules.length >= 3}
//           >
//             <Plus className="h-5 w-5 mr-2" />
//             Add schedule
//           </button>
//         </div>
//       </div>

//       {/* Main Form */}
//       <div className="flex-1 space-y-6">
//         {schedules.map((schedule) => (
//           <div key={schedule.id} className="bg-white p-6 shadow rounded-md">
//             <h2 className="text-base font-medium mb-2">Schedule Name</h2>
//             <input
//               value={schedule.name}
//               onChange={(e) =>
//                 setSchedules((prevSchedules) =>
//                   prevSchedules.map((prevSchedule) =>
//                     prevSchedule.id === schedule.id
//                       ? { ...prevSchedule, name: e.target.value }
//                       : prevSchedule
//                   )
//                 )
//               }
//               className="w-full border border-teal-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
//             />

//             <h2 className="text-base font-medium mb-4">Timing</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm text-gray-500 mb-2">From</label>
//                 <input
//                   type="time"
//                   value={schedule.fromTime}
//                   onChange={(e) =>
//                     setSchedules((prevSchedules) =>
//                       prevSchedules.map((prevSchedule) =>
//                         prevSchedule.id === schedule.id
//                           ? { ...prevSchedule, fromTime: e.target.value }
//                           : prevSchedule
//                       )
//                     )
//                   }
//                   className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-500 mb-2">To</label>
//                 <input
//                   type="time"
//                   value={schedule.toTime}
//                   onChange={(e) =>
//                     setSchedules((prevSchedules) =>
//                       prevSchedules.map((prevSchedule) =>
//                         prevSchedule.id === schedule.id
//                           ? { ...prevSchedule, toTime: e.target.value }
//                           : prevSchedule
//                       )
//                     )
//                   }
//                   className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-500 mb-2">Timezone</label>
//                 <input
//                   value={schedule.timezone}
//                   onChange={(e) =>
//                     setSchedules((prevSchedules) =>
//                       prevSchedules.map((prevSchedule) =>
//                         prevSchedule.id === schedule.id
//                           ? { ...prevSchedule, timezone: e.target.value }
//                           : prevSchedule
//                       )
//                     )
//                   }
//                   className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 />
//               </div>
//             </div>

//             <h2 className="text-base font-medium mb-4">Days</h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               {Object.keys(schedule.days).map((day) => (
//                 <label key={day} className="flex items-center space-x-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={schedule.days[day]}
//                     onChange={() => handleDayToggle(day, schedule.id)}
//                     className="form-checkbox h-4 w-4 text-teal-500 border-gray-300 rounded cursor-pointer"
//                   />
//                   <span className="text-sm font-medium">{day}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         ))}

//         <div className="flex justify-start">
//           <button className="flex items-center cursor-pointer bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md focus:outline-none">
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ScheduleForm;


import { useState, useEffect } from "react";
import { useCampaignQuery } from "../reactQuery/hooks/useCampaignQuery";
import { ChevronDown, Plus, Calendar, X } from "lucide-react";

function ScheduleForm({ campaignId, newSchedulesData  }) {
  const [schedules, setSchedules] = useState([]);
  const [activeSchedule, setActiveSchedule] = useState(null);
  const [scheduleName, setScheduleName] = useState("");
  const [startDate] = useState("Now");
  const [endDate] = useState("No end date");
  const [selectedDays, setSelectedDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });

  const { getCampaignScheduleQuery, updateScheduleMutationQuery } = useCampaignQuery();

  const {
    data: campaignSchedule,
    isLoading: isScheduleLoading,
    isError: isScheduleError,
    error: scheduleError,
  } = getCampaignScheduleQuery(campaignId);

  useEffect(() => {
    console.log(campaignSchedule);
    if (campaignSchedule?.schedule?.Schedule) {
      const scheduleData = campaignSchedule.schedule.Schedule.map((schedule, index) => ({
        id: index + 1,
        name: schedule.Name,
        fromTime: schedule.TimingFrom,
        toTime: schedule.TimingTo,
        timezone: schedule.Timezone,
        days: schedule.Days.reduce((acc, day) => {
          acc[day] = true;
          return acc;
        }, {}),
      }));

      setSchedules(scheduleData);
      setActiveSchedule(scheduleData[0]?.id); // Set first schedule as active
      setScheduleName(scheduleData[0]?.name);
    }
  }, [campaignSchedule]);

  useEffect(() => {
    console.log("Schedules by AI: ", newSchedulesData);
    setSchedules(null);
    if (newSchedulesData && newSchedulesData.length > 0) {
      console.log("Received new schedules from parent:", newSchedulesData);
  
      const formattedSchedules = newSchedulesData.map((schedule, index) => ({
        id: index + 1,
        name: schedule.Name,
        fromTime: schedule.TimingFrom,
        toTime: schedule.TimingTo,
        timezone: schedule.Timezone,
        days: schedule.Days.reduce((acc, day) => {
          acc[day] = true;
          return acc;
        }, {}),
      }));
  
      setSchedules(formattedSchedules);
      setActiveSchedule(formattedSchedules[0]?.id);
      setScheduleName(formattedSchedules[0]?.name);
    }
  }, [newSchedulesData]);
  
  
  const handleDayToggle = (day) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const addSchedule = () => {
    if (schedules.length >= 3) {
      alert("You can't add more than 3 schedules");
      return;
    }
    const newId = schedules.length + 1;
    const newSchedule = { id: newId, name: `Schedule ${newId}` };
    setSchedules([...schedules, newSchedule]);
    setActiveSchedule(newId);
    setScheduleName(newSchedule.name);
  };

  const deleteSchedule = (id) => {
    if (schedules.length === 1) return;
    const updated = schedules.filter((s) => s.id !== id);
    setSchedules(updated);
    if (activeSchedule === id && updated.length > 0) {
      const next = updated[0];
      setActiveSchedule(next.id);
      setScheduleName(next.name);
    }
  };

  const handleScheduleChange = (scheduleId) => {
    const selectedSchedule = schedules.find((schedule) => schedule.id === scheduleId);
    setActiveSchedule(scheduleId);
    setScheduleName(selectedSchedule?.name);
    setSelectedDays((prev) => {
      const updatedDays = { ...prev };
      Object.keys(updatedDays).forEach((day) => {
        updatedDays[day] = selectedSchedule?.days[day] || false;
      });
      return updatedDays;
    });
  };

  const handleSaveSchedules = () => {
    const scheduleData = {
      Schedule: schedules.map(schedule => ({
        Name: schedule.name || "",
        TimingFrom: schedule.fromTime || "",
        TimingTo: schedule.toTime || "",
        Timezone: schedule.timezone || "",
        Days: schedule.days ? Object.keys(schedule.days).filter(day => schedule.days[day]) : [], 
      })),
    };

    console.log("Saving schedule Object:", scheduleData);

    updateScheduleMutationQuery.mutate(
      { campaignId, scheduleData },
      {
        onSuccess: (response) => {
          console.log("Campaign schedule updated!", response);
        },
      }
    );
  };


  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto p-4">
      {/* Sidebar */}
      <div className="w-full md:w-64 space-y-4">
        <div className="flex items-center text-gray-600 mb-4 space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Start</span>
          <span className="text-teal-500 ml-auto">{startDate}</span>
        </div>

        <div className="flex items-center text-gray-600 mb-6 space-x-2">
          <Calendar className="h-5 w-5" />
          <span>End date</span>
          <span className="text-teal-500 ml-auto">{endDate}</span>
        </div>

        <div className="border-t border-gray-200 pt-6">
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className={`px-4 py-2 mb-2 rounded-md cursor-pointer border relative ${
                activeSchedule === schedule.id
                  ? "border-teal-500 text-teal-500"
                  : "border-gray-200"
              }`}
              onClick={() => handleScheduleChange(schedule.id)}
            >
              <span>{schedule.name}</span>
              {schedules.length > 1 && (
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSchedule(schedule.id);
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}

          <button
            className={`w-full flex items-center justify-center px-4 py-2 border rounded-full cursor-pointer ${
              schedules.length >= 3
                ? "text-gray-300 cursor-not-allowed border-gray-200"
                : "text-gray-500 hover:text-teal-500 border-gray-200"
            }`}
            onClick={addSchedule}
            disabled={schedules.length >= 3}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add schedule
          </button>
        </div>
      </div>

      {/* Main Form */}
      <div className="flex-1 space-y-6">
        {/* Display only the active schedule */}
        {schedules.length > 0 && (
          <div className="bg-white p-6 shadow rounded-md">
            <h2 className="text-base font-medium mb-2">Schedule Name</h2>
            <input
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
              className="w-full border border-teal-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        )}

        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-base font-medium mb-4">Timing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-2">From</label>
              <input
                type="time"
                value={schedules[activeSchedule - 1]?.fromTime}
                onChange={(e) =>
                  setSchedules((prevSchedules) =>
                    prevSchedules.map((schedule, idx) =>
                      idx === activeSchedule - 1
                        ? { ...schedule, fromTime: e.target.value }
                        : schedule
                    )
                  )
                }
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">To</label>
              <input
                type="time"
                value={schedules[activeSchedule - 1]?.toTime}
                onChange={(e) =>
                  setSchedules((prevSchedules) =>
                    prevSchedules.map((schedule, idx) =>
                      idx === activeSchedule - 1
                        ? { ...schedule, toTime: e.target.value }
                        : schedule
                    )
                  )
                }
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">Timezone</label>
              <div className="relative">
                <select
                  value={schedules[activeSchedule - 1]?.timezone}
                  onChange={(e) =>
                    setSchedules((prevSchedules) =>
                      prevSchedules.map((schedule, idx) =>
                        idx === activeSchedule - 1
                          ? { ...schedule, timezone: e.target.value }
                          : schedule
                      )
                    )
                  }
                  className="w-full border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option>America/Los_Angeles</option>
                  <option>Asia/Dubai</option>
                  <option>America/Chicago</option>
                  <option>America/New_York</option>
                  <option>Europe/London</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-base font-medium mb-4">Days</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(selectedDays).map((day) => (
              <label key={day} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedDays[day]}
                  onChange={() => handleDayToggle(day)}
                  className="form-checkbox h-4 w-4 text-teal-500 border-gray-300 rounded cursor-pointer"
                />
                <span className="text-sm font-medium">{day}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-start">
          <button onClick={handleSaveSchedules} className="flex items-center cursor-pointer bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md focus:outline-none">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleForm;

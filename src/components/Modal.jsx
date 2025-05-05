import { useState } from "react";
import { CircleCheckBig, X } from "lucide-react";
import SideDrawer from "./SideDrawer";

// // // function Modal({ modelOpen, setmodelOpen }) {
// // //   const [selectedJob, setSelectedJob] = useState("");
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [drawerData, setDrawerData] = useState(null);

// // //   const jobList = [
// // //     {
// // //       id: "job-1",
// // //       title: "Meeting with Carl Pie",
// // //       time: "8:30 - 10:45",
// // //       bg: "bg-[rgb(245,237,255)]",
// // //       text: "text-[rgb(175,113,255)]",
// // //       image:
// // //         "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg",
// // //       description: "Discuss Q3 strategy and product updates.",
// // //       date: "2025-05-30",
// // //       person: "Carl Pie",
// // //       meetingLink: "https://zoom.us/example1",
// // //       notes: "Prepare a product roadmap PDF.",
// // //     },
// // //     {
// // //       id: "job-2",
// // //       title: "Setup client demo",
// // //       time: "11:00 - 12:00",
// // //       bg: "bg-[rgb(232,247,240)]",
// // //       text: "text-[rgb(65,188,132)]",
// // //       description: "Showcase our solution to the new client.",
// // //       date: "2025-05-30",
// // //       person: "Sarah Tan",
// // //       meetingLink: "https://meet.google.com/demo",
// // //       notes: "Include live analytics view.",
// // //     },
// // //     {
// // //       id: "job-3",
// // //       title: "Sign Client contract",
// // //       time: "14:00 - 15:00",
// // //       bg: "bg-[rgb(232,247,240)]",
// // //       text: "text-[rgb(65,188,132)]",
// // //       description: "Finalize the agreement for project start.",
// // //       date: "2025-05-30",
// // //       person: "Legal Team",
// // //       meetingLink: "https://zoom.us/contract-sign",
// // //       notes: "Ensure all NDA points are included.",
// // //     },
// // //   ];

// // //   const handleSelect = (job) => {
// // //     setSelectedJob(job.id);
// // //     setDrawerData(job);
// // //     setIsOpen(true); // This will open the drawer
// // //   };



// // //   return (
// // //     <>
// // //       {modelOpen && (
// // //         <div className="fixed inset-0 z-50 flex items-center w-full justify-center h-full bg-[#0f0f0f05]">
// // //           <div className="relative p-4 w-[270px] md:w-[450px] max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-lg">
// // //             {/* Header */}
// // //             <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
// // //               <h3 className="text-lg font-semibold text-gray-900">
// // //                 Thursday 30 2025
// // //               </h3>
// // //               <button onClick={() => setmodelOpen(false)}>
// // //                 <X size={24} className="text-gray-600 cursor-pointer font-medium bg-gray-200 p-1 rounded-full" />
// // //               </button>
// // //             </div>

// // //             {/* Content */}
// // //             <div className="p-3">
// // //               <ul className="space-y-4 mb-4">
// // //                 {jobList.map((job) => (
// // //                   <li key={job.id} onClick={() => handleSelect(job)}>
// // //                     <label
// // //                       htmlFor={job.id}
// // //                       className={`flex items-center justify-between w-full p-2 ${job.text} ${job.bg} border border-gray-200 rounded-lg cursor-pointer transition hover:shadow-md`}
// // //                     >
// // //                       <div className="flex gap-3 items-center">
// // //                         {job.image ? (
// // //                           <img
// // //                             className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
// // //                             src={job.image}
// // //                             alt="Profile"
// // //                           />
// // //                         ) : (
// // //                           <CircleCheckBig size={24} className="text-green-500" />
// // //                         )}
// // //                         <div>
// // //                           <div className="text-sm font-bold">{job.title}</div>
// // //                           <div className={`text-sm ${job.text}`}>{job.time}</div>
// // //                         </div>
// // //                       </div>
// // //                     </label>
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       <SideDrawer isOpen={isOpen} setIsOpen={setIsOpen} data={drawerData} />
// // //     </>
// // //   );
// // // }

// // // export default Modal;

// // function Modal({ modelOpen, setmodelOpen, selectedDayEvents }) {
// //   return (
// //     <>
// //       {modelOpen && (
// //         <div className="fixed inset-0 z-50 flex items-center w-full justify-center h-full bg-[#0f0f0f05]">
// //           <div className="relative p-4 w-[270px] md:w-[450px] max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-lg">
// //             {/* Header */}
// //             <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
// //               <h3 className="text-lg font-semibold text-gray-900">
// //                 Events for {selectedDayEvents.length > 0 ? selectedDayEvents[0].date : ""}
// //               </h3>
// //               <button onClick={() => setmodelOpen(false)}>
// //                 <X size={24} className="text-gray-600 cursor-pointer font-medium bg-gray-200 p-1 rounded-full" />
// //               </button>
// //             </div>

// //             {/* Content */}
// //             <div className="p-3">
// //               <ul className="space-y-4 mb-4">
// //                 {selectedDayEvents.map((event) => (
// //                   <li key={event.id}>
// //                     <div className={`flex items-center justify-between w-full p-2 bg-[rgb(245,237,255)] text-[rgb(139, 56, 249)] border border-gray-200 rounded-lg`}>
// //                       <div className="flex gap-3 items-center">
// //                         <div>
// //                           <div className="text-sm font-bold">{event.Task_Title}</div>
// //                           <div className="text-sm">Date: {event.eventDate}</div>
// //                           <div className="text-sm">Time: {event.eventTime}</div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }

// // export default Modal;


// function Modal({ modelOpen, setmodelOpen, selectedDayEvents }) {
//   return (
//     <>
//       {modelOpen && (
//         <div className="fixed inset-0 z-50 flex items-center w-full justify-center h-full bg-[#0f0f0f05]">
//           <div className="relative p-4 w-[270px] md:w-[450px] max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-lg">
//             <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 Events for {selectedDayEvents.length > 0 ? selectedDayEvents[0].date : ""}
//               </h3>
//               <button onClick={() => setmodelOpen(false)}>
//                 <X size={24} className="text-gray-600 cursor-pointer font-medium bg-gray-200 p-1 rounded-full" />
//               </button>
//             </div>

//             <div className="p-3">
//               <ul className="space-y-4 mb-4">
//                 {selectedDayEvents.map((event) => (
//                   <li key={event.id}>
//                     <div className={`flex items-center justify-between w-full p-2 bg-[rgb(245,237,255)] text-[rgb(139, 56, 249)] border border-gray-200 rounded-lg`}>
//                       <div className="flex gap-3 items-center">
//                         <div>
//                           <div className="text-sm font-bold">{event.Task_Title}</div>
//                           <div className="text-sm">Date: {event.eventDate}</div>
//                           <div className="text-sm">Time: {event.eventTime}</div>
//                         </div>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Modal;


function Modal({ modelOpen, setmodelOpen, selectedDayEvents, openSideDrawerWithEvent }) {
  const handleEventClick = (event) => {
    openSideDrawerWithEvent(event); // Pass event data to the SideDrawer
    setmodelOpen(false); // Close the modal after the event is selected
  };

  const handleOverlayClick = () => {
    setmodelOpen(false); // Close the modal when overlay is clicked
  };

  const formatTime= (time) => {
    const date = new Date('1970-01-01T' + time); // Use a fixed date as we are only interested in the time
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12; // Convert to 12-hour format
    hours = hours ? hours : 12; // Handle midnight case (0 -> 12)
    minutes = minutes < 10 ? '0' + minutes : minutes; // Ensure two-digit minutes
    
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <>
      {modelOpen && (
        <div className="fixed inset-0 z-50 flex items-center w-full justify-center h-full bg-[#00000080]" onClick={handleOverlayClick}>
          <div className="relative p-4 w-[270px] md:w-[450px] max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-lg">
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Events for {selectedDayEvents.length > 0 ? selectedDayEvents[0].eventDate : ""}
              </h3>
              <button onClick={() => setmodelOpen(false)}>
                <X size={24} className="text-gray-600 cursor-pointer font-medium bg-gray-200 p-1 rounded-full" />
              </button>
            </div>

            <div className="p-3">
              <ul className="space-y-4 mb-4">
                {selectedDayEvents.map((event) => (
                  <li key={event.id} onClick={() => handleEventClick(event)} className="cursor-pointer">
                    <div className={`flex items-center justify-between w-full p-2 bg-green-100 text-green-600 border border-gray-200 rounded-lg`}>
                      <div className="flex gap-3 items-center">
                      <CircleCheckBig size={24} className="text-green-500" />
                        <div className="w-full">
                          <div className="text-md font-bold">{event.Task_Title}</div>  
                          <div className="text-sm">{event.Description}</div>
                          <div className="text-sm">{formatTime(event.eventTime)}</div>
                        </div>

                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;

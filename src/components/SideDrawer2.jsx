// import { CircleX, Mail, MoveDown } from "lucide-react";
// import { useCampaignQuery } from "../reactQuery/hooks/useCampaignQuery";

// function SideDrawer2({ isOpen, setIsOpen }) {
//   const { getAllTemaplteQuery } = useCampaignQuery();

//   const {
//     data: templates,
//     isLoading,
//     error,
//   } = getAllTemaplteQuery();

//   // console.log(templates, "template");

//   return (
//     <div className="relative">
//       <div
//         className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-gray-50 w-80 shadow-lg transform ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h5 className="text-base font-semibold text-gray-500 dark:text-gray-400 flex items-center">
//             AI sequence template
//           </h5>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="text-gray-400 cursor-pointer bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
//           >
//             <CircleX size={22} />
//           </button>
//         </div>

//         {isLoading && <p>Loading campaigns...</p>}
//         {error && <p className="text-red-500">Failed to load campaigns</p>}

//         {templates &&
//           templates?.Templates.map((campaign) => (
//             <div key={campaign.id} className="border hover:border-teal-300 bg-white p-3 rounded-xl mb-3">
//               <div className="flex items-center gap-1">
//                 <Mail size={17} />
//                 <p className="py-0 font-medium">{campaign?.Name}</p>
//               </div>
//               <p className="text-gray-400 text-[15px]">
//                 {campaign?.Body
//                   ? campaign.Body.split(" ").slice(0, 10).join(" ") + "..."
//                   : "No description provided."}
//               </p>

//               <hr className="text-gray-200 py-2" />
//                 <button className="px-3 py-1 cursor-pointer hover:text-white hover:bg-teal-600 rounded-full border border-gray-500">
//                   Use template
//                 </button>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

// export default SideDrawer2;

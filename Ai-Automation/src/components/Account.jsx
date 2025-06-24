// import { ChevronDown, ChevronUp, CircleCheck, Clock, Globe, MapPin } from 'lucide-react'
// import React from 'react'
// import { FcGoogle } from 'react-icons/fc';

// function Account({people}) {
//   const [selectAll, setSelectAll] = useState(false);
// //   const [people, setPeople] = useState([]);

//   return (
//    <div className="bg-white rounded-lg shadow overflow-hidden">
//     <div className="min-w-full overflow-auto">
//         <table className="w-full">
//         <thead>
//             <tr className="border-b border-gray-300 text-sm text-muted-foreground">
//             <th className="whitespace-nowrap px-4 py-3 text-left font-medium">
//                 <input 
//                 type="checkbox" 
//                 className="rounded border-muted cursor-pointer"
//                 checked={selectAll}
//                 onChange={(e) => setSelectAll(e.target.checked)}
//                 />
//             </th>
//             <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400">EMAIL</th>
//             <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400">CONTACT</th>
//             <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400">COMPANY</th>
//             <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400">TITLE</th>
//             <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400">EMAIL PROVIDER</th>
//             <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400">STATUS</th>
//             </tr>
//         </thead>
//         <tbody>
//             {people
//             .filter(person => 
//                 person.Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 person.Email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 person.Company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 person.Title?.toLowerCase().includes(searchQuery.toLowerCase())
//             )
//             .map((person) => (
//                 <tr key={person.id} className="border-b border-gray-200 text-sm hover:bg-gray-50">
//                 <td className="px-4 py-3">
//                     <input type="checkbox" className="rounded border-muted cursor-pointer" />
//                 </td>
//                 <td className="px-4 py-3 text-gray-600">
//                     <a href={`mailto:${person.Email}`} className="hover:text-blue-500">
//                     {person.Email}
//                     </a>
//                 </td>
//                 <td className="px-4 py-3 text-gray-600">{person.Name}</td>
//                 <td className="px-4 py-3 text-gray-600">{person.Company || 'Not specified'}</td>
//                 <td className="px-4 py-3 text-gray-600">{person.Title || 'Not specified'}</td>
//                 <td className="px-4 py-3 text-gray-600 flex items-center gap-1">
//                     {person.provider === 'Google' && <FcGoogle size={20} />}
//                     {person.provider}
//                 </td>
//                 <td className="px-4 py-3">
//                     <div className="flex items-center gap-2">
//                     {person.status === 'Verified' ? (
//                         <div className="flex items-center gap-1 bg-blue-50 rounded-full px-2 py-0.5">
//                         <CircleCheck size={17} className="text-blue-500" />
//                         <span className="text-blue-500">Verified</span>
//                         </div>
//                     ) : (
//                         <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1.5">
//                         <Clock className="h-4 w-4 text-gray-400" />
//                         <span className="text-xs text-gray-400">Not yet contacted</span>
//                         </div>
//                     )}
//                     </div>
//                 </td>
//                 </tr>
//             ))}
//             </tbody>
//         </table>
//         </div>
//     </div>
//   )
// }

// export default Account
// "use client"

// import { useEffect, useState } from "react"
import { ChevronDown, ChevronLeft, ChevronRight, MoreVertical, Phone, Search } from "lucide-react"
// import { 
//   FaBriefcase, 
//   FaMapMarkerAlt, 
//   FaIndustry, 
//   FaUsers, 
//   FaDollarSign, 
//   FaGlobe, 
//   FaCogs, 
//   FaMoneyCheckAlt,
//   FaUser,
//   FaBuilding
// } from "react-icons/fa"
// import { useAILeadScoutQuery } from "../reactQuery/hooks/useAILeadScoutQuery";

// export default function AILeadSearch({ queryParam }) {
//   const [selectAll, setSelectAll] = useState(false)
//   const [skipOwned, setSkipOwned] = useState(true)
//   const [showCampaignForm, setShowCampaignForm] = useState(false)
//   const [campaignName, setCampaignName] = useState("")
  
//   const { allLeads, isLeadsLoading, leadsError, refetch } = useAILeadScoutQuery(searchQuery, false);

//   useEffect(() => {
//     // Trigger the refetch function as soon as the page loads with the search query
//     if (searchQuery && searchQuery !== "No search query provided") {
//       refetch();
//     }
//   }, [searchQuery, refetch]);

//   const queryParams = new URLSearchParams(location.search);
//   const searchQuery = queryParams.get("searchQuery") || "No search query provided";

//   const [leads, setLeads] = useState([
//     {
//       id: 1,
//       checked: false,
//       name: "Alexis Sanchez",
//       avatar: "👩",
//       avatarColor: "bg-red-100",
//       company: "Hubspot",
//       title: "CEO",
//       email: "alexis@hubspot.com",
//       phone: "+1263 263513",
//       lastInteraction: "Feb 2024",
//       owned: false
//     },
//     {
//       id: 2,
//       checked: false,
//       name: "Emily Carter",
//       avatar: "👩",
//       avatarColor: "bg-amber-100",
//       company: "Twitter",
//       title: "CTO",
//       email: "emily@twitter.com",
//       phone: "+1263 263513",
//       lastInteraction: "Feb 2024",
//       owned: true
//     },
//     {
//       id: 3,
//       checked: false,
//       name: "James Harrison",
//       avatar: "👨",
//       avatarColor: "bg-blue-100",
//       company: "Facebook",
//       title: "CEO",
//       email: "james@facebook.com",
//       phone: "+1263 263513",
//       lastInteraction: "Feb 2024",
//       owned: false
//     },
//     {
//       id: 4,
//       checked: false,
//       name: "Olivia Bennett",
//       avatar: "👩",
//       avatarColor: "bg-green-100",
//       company: "Monday.com",
//       title: "CEO",
//       email: "olivia.ben@monday.com",
//       phone: "+1263 263513",
//       lastInteraction: "Feb 2024",
//       owned: false
//     },
//     {
//       id: 5,
//       checked: false,
//       name: "Benjamin Cooper",
//       avatar: "👨",
//       avatarColor: "bg-red-100",
//       company: "Megawatt",
//       title: "CTO",
//       email: "cooper@megawatt.ai",
//       phone: "+1263 263513",
//       lastInteraction: "Feb 2024",
//       owned: true
//     },
//   ])

//   const toggleSelectAll = () => {
//     const newSelectAll = !selectAll
//     setSelectAll(newSelectAll)
//     setLeads(leads.map(lead => ({
//       ...lead,
//       checked: newSelectAll && (!skipOwned || !lead.owned)
//     })))
//   }

//   const toggleLeadSelection = (id) => {
//     setLeads(leads.map(lead => 
//       lead.id === id ? {...lead, checked: !lead.checked} : lead
//     ))
//     setSelectAll(false)
//   }

//   const toggleSkipOwned = () => {
//     const newSkipOwned = !skipOwned
//     setSkipOwned(newSkipOwned)
//     if (selectAll) {
//       setLeads(leads.map(lead => ({
//         ...lead,
//         checked: !newSkipOwned || !lead.owned
//       })))
//     }
//   }

//   const handleAddToCampaign = () => {
//     const selectedLeads = leads.filter(lead => lead.checked)
//     if (selectedLeads.length === 0) {
//       alert("Please select at least one lead")
//       return
//     }
//     setShowCampaignForm(true)
//   }

//   const handleCampaignSubmit = (e) => {
//     e.preventDefault()
//     console.log("Creating campaign:", campaignName)
//     console.log("With leads:", leads.filter(lead => lead.checked))
    
//     setCampaignName("")
//     setShowCampaignForm(false)
//     setLeads(leads.map(lead => ({...lead, checked: false})))
//     setSelectAll(false)
    
//     alert(`Campaign "${campaignName}" created successfully!`)
//   }

//   const query = searchQuery || "No search query provided";

//   useEffect(() => {
//     console.log("Search Query:", searchQuery);  // This will print the searchQuery in the console
//   }, [searchQuery]); 

//   const filteredLeads = skipOwned ? leads.filter(lead => !lead.owned) : leads

//   return (
//     <div className="flex min-h-screen w-full h-full flex-col md:flex-row gap-5 md:gap-0 pl-[10px] md:pl-[25px] bg-white relative">
//       {/* Campaign Form Modal */}
//       {showCampaignForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4">Create New Campaign</h2>
//             <form onSubmit={handleCampaignSubmit}>
//               <div className="mb-4">
//                 <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700 mb-1">
//                   Campaign Name
//                 </label>
//                 <input
//                   type="text"
//                   id="campaignName"
//                   value={campaignName}
//                   onChange={(e) => setCampaignName(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter campaign name"
//                   required
//                 />
//               </div>
//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowCampaignForm(false)}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
//                 >
//                   Create Campaign
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Sidebar */}
//       <div className="w-full h-full md:w-[400px] bg-white border border-gray-200 rounded-2xl flex flex-col">
//         <div className="p-4 border-b border-gray-200 w-full">
//           <h2 className="text-l md:text-xl font-bold mb-[40px]">Search Manually</h2>
//           <div className="flex items-center justify-between">
//             <FaMapMarkerAlt className="text-gray-400" />
//             <span className="text-md md:text-lg text-gray-500">Skip already owned</span>
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input 
//                 type="checkbox" 
//                 className="sr-only peer" 
//                 checked={skipOwned}
//                 onChange={toggleSkipOwned}
//               />
//               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//             </label>
//           </div>
//         </div>
//         <nav className="p-2 space-y-4 overflow-y-auto">
//           {[
//             { icon: FaBriefcase, label: "Job titles" },
//             { icon: FaMapMarkerAlt, label: "Location" },
//             { icon: FaIndustry, label: "Industry & Keywords" },
//             { icon: FaUsers, label: "Employees" },
//             { icon: FaDollarSign, label: "Revenue" },
//             { icon: FaGlobe, label: "Lookalike domain" },
//             { icon: FaCogs, label: "Technologies" },
//             { icon: FaMoneyCheckAlt, label: "Funding type" },
//             { icon: FaUser, label: "Name" },
//             { icon: FaBuilding, label: "Company" }
//           ].map((item, index) => (
//             <div key={index} className="w-full p-2 rounded text-md md:text-lg text-gray-400 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
//               <item.icon />
//               <span className="pl-[15px]">{item.label}</span>
//             </div>
//           ))}
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col pr-[10px] md:pr-[25px]">
//         {/* Header */}
        

//         {/* Search Section */}
//         <div className="p-6 border-b">
//           <h2 className="text-lg font-medium mb-4">Search Manually</h2>
//           <div className="flex items-center gap-4">
//             <div className="text-sm text-gray-500">{filteredLeads.length} results found</div>
//             <div className="flex-1 relative">
//               <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="E.g Engineers in New York in software ..."
//                 className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <button className="bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white flex items-center gap-2 rounded-full px-4 py-2 border-none">
//               <span>✨</span> AI Search
//             </button>
//             <button 
//               onClick={handleAddToCampaign}
//               className="bg-teal-500 hover:bg-teal-600 text-white flex items-center gap-2 rounded-md px-4 py-2"
//             >
//               <span>✓</span> Add to campaign
//             </button>
//           </div>
//           <div className="flex items-center gap-4 mt-4">
//             <div className="flex items-center gap-2">
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path
//                   d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5C15 6.10457 14.1046 7 13 7H11C9.89543 7 9 6.10457 9 5Z"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//               <span className="text-sm text-gray-700">Skip already owned</span>
//             </div>
//             <div 
//               className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${skipOwned ? 'bg-teal-500' : 'bg-gray-200'}`}
//               onClick={toggleSkipOwned}
//             >
//               <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${skipOwned ? 'transform translate-x-6' : 'transform translate-x-0'}`}></div>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-1 overflow-hidden">
//           {/* Table */}
//           <div className="flex-1 overflow-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b">
//                 <tr>
//                   <th className="w-10 p-4">
//                     <CustomCheckbox 
//                       checked={selectAll}
//                       onChange={toggleSelectAll}
//                     />
//                   </th>
//                   <th className="text-left p-4 text-sm font-medium text-gray-500">Lead</th>
//                   <th className="text-left p-4 text-sm font-medium text-gray-500">Company</th>
//                   <th className="text-left p-4 text-sm font-medium text-gray-500">Title</th>
//                   <th className="text-left p-4 text-sm font-medium text-gray-500">Email</th>
//                   <th className="text-left p-4 text-sm font-medium text-gray-500">Phone</th>
//                   <th className="text-left p-4 text-sm font-medium text-gray-500">Last Interaction</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredLeads.map(lead => (
//                   <LeadRow
//                     key={lead.id}
//                     checked={lead.checked}
//                     onChange={() => toggleLeadSelection(lead.id)}
//                     name={lead.name}
//                     avatar={lead.avatar}
//                     avatarColor={lead.avatarColor}
//                     company={lead.company}
//                     title={lead.title}
//                     email={lead.email}
//                     phone={lead.phone}
//                     lastInteraction={lead.lastInteraction}
//                     owned={lead.owned}
//                   />
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Pagination */}
//         <div className=" p-4 flex items-center justify-center">
//           <div className="flex items-center gap-2">
//             <CustomButton variant="outline" className="flex items-center gap-1">
//               <ChevronLeft className="w-4 h-4" /> Previous
//             </CustomButton>
//             <CustomButton variant="outline" className="w-8 h-8 p-0 bg-gray-100">
//               1
//             </CustomButton>
//             <CustomButton variant="outline" className="w-8 h-8 p-0">
//               2
//             </CustomButton>
//             <CustomButton variant="outline" className="w-8 h-8 p-0">
//               3
//             </CustomButton>
//             <span className="text-sm">...</span>
//             <CustomButton variant="outline" className="w-8 h-8 p-0">
//               45
//             </CustomButton>
//             <CustomButton variant="outline" className="flex items-center gap-1">
//               Next <ChevronRight className="w-4 h-4" />
//             </CustomButton>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function LeadRow({ checked, onChange, name, avatar, avatarColor, company, title, email, phone, lastInteraction, owned }) {
//   return (
//     <tr className={`border-b hover:bg-gray-50 ${owned ? 'bg-gray-50' : ''}`}>
//       <td className="p-4">
//         <CustomCheckbox 
//           checked={checked} 
//           onChange={onChange}
//           disabled={owned}
//         />
//       </td>
//       <td className="p-4">
//         <div className="flex items-center gap-2">
//           <div className={`w-8 h-8 rounded-full ${avatarColor} flex items-center justify-center`}>{avatar}</div>
//           <span className={`text-sm ${owned ? 'text-gray-400' : ''}`}>{name}</span>
//           {owned && <span className="text-xs text-gray-400">(owned)</span>}
//         </div>
//       </td>
//       <td className="p-4">
//         <span className={`text-sm ${owned ? 'text-gray-400' : ''}`}>{company}</span>
//       </td>
//       <td className="p-4">
//         <span className={`text-sm ${owned ? 'text-gray-400' : ''}`}>{title}</span>
//       </td>
//       <td className="p-4">
//         <span className={`text-sm ${owned ? 'text-gray-400' : 'text-blue-500'}`}>{email}</span>
//       </td>
//       <td className="p-4">
//         <span className={`text-sm ${owned ? 'text-gray-400' : ''}`}>{phone}</span>
//       </td>
//       <td className="p-4">
//         <span className={`text-sm ${owned ? 'text-gray-400' : ''}`}>{lastInteraction}</span>
//       </td>
//     </tr>
//   )
// }

function CustomCheckbox({ id, checked = false, onChange = () => {}, disabled = false }) {
  return (
    <div className="relative">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
      />
      <div
        onClick={!disabled ? onChange : undefined}
        className={`rounded-sm h-4 w-4 border flex items-center justify-center transition-colors
          ${disabled ? 'bg-gray-100 border-gray-200 cursor-not-allowed' : 
            checked ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}
        `}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
    </div>
  )
}

function CustomButton({ children, variant = "default", className = "", ...props }) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 h-9 text-sm",
  }

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  )
}


import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAILeadScoutQuery } from "../reactQuery/hooks/useAILeadScoutQuery";
import { FaBriefcase, FaMapMarkerAlt, FaIndustry, FaUsers, FaDollarSign, FaGlobe, FaCogs, FaMoneyCheckAlt, FaUser, FaBuilding } from "react-icons/fa";
// import { ChevronDown, ChevronLeft, ChevronRight, MoreVertical, Phone, Search } from "lucide-react"

export default function AILeadSearch() {
  const [selectAll, setSelectAll] = useState(false);
  const [skipOwned, setSkipOwned] = useState(true);
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [campaignName, setCampaignName] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("searchQuery") || "No search query provided";
  const page = 1;

  const { allLeads, isLeadsLoading, leadsError, refetch } = useAILeadScoutQuery({
    query: searchQuery,
    page: page,
  });

  useEffect(() => {
    // Trigger the refetch function as soon as the page loads with the search query
    if (searchQuery && searchQuery !== "No search query provided") {
      refetch();
    }
  }, [searchQuery, refetch]);  // Refetch will trigger if searchQuery changes

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setLeads(allLeads?.map((lead) => ({
      ...lead,
      checked: newSelectAll && (!skipOwned || !lead.owned),
    })));
  };

  const toggleLeadSelection = (id) => {
    setLeads(allLeads?.map((lead) =>
      lead.id === id ? { ...lead, checked: !lead.checked } : lead
    ));
    setSelectAll(false);
  };

  const toggleSkipOwned = () => {
    const newSkipOwned = !skipOwned;
    setSkipOwned(newSkipOwned);
    if (selectAll) {
      setLeads(allLeads?.map((lead) => ({
        ...lead,
        checked: !newSkipOwned || !lead.owned,
      })));
    }
  };

  const handleAddToCampaign = () => {
    const selectedLeads = leads.filter((lead) => lead.checked);
    if (selectedLeads.length === 0) {
      alert("Please select at least one lead");
      return;
    }
    setShowCampaignForm(true);
  };

  const handleCampaignSubmit = (e) => {
    e.preventDefault();
    console.log("Creating campaign:", campaignName);
    console.log("With leads:", leads.filter((lead) => lead.checked));

    setCampaignName("");
    setShowCampaignForm(false);
    setLeads(allLeads.map((lead) => ({ ...lead, checked: false })));
    setSelectAll(false);

    alert(`Campaign "${campaignName}" created successfully!`);
  };

  const filteredLeads = skipOwned ? allLeads?.filter((lead) => !lead.owned) : leads;

  return (
    <div className="flex min-h-screen w-full h-full flex-col md:flex-row gap-5 md:gap-0 pl-[10px] md:pl-[25px] bg-white relative">
      {/* Campaign Form Modal */}
      {showCampaignForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Campaign</h2>
            <form onSubmit={handleCampaignSubmit}>
              <div className="mb-4">
                <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700 mb-1">
                  Campaign Name
                </label>
                <input
                  type="text"
                  id="campaignName"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter campaign name"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCampaignForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="w-full h-full md:w-[400px] bg-white border border-gray-200 rounded-2xl flex flex-col">
        <div className="p-4 border-b border-gray-200 w-full">
          <h2 className="text-l md:text-xl font-bold mb-[40px]">Search Manually</h2>
          <div className="flex items-center justify-between">
            <FaMapMarkerAlt className="text-gray-400" />
            <span className="text-md md:text-lg text-gray-500">Skip already owned</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={skipOwned}
                onChange={toggleSkipOwned}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        <nav className="p-2 space-y-4 overflow-y-auto">
          {[
            { icon: FaBriefcase, label: "Job titles" },
            { icon: FaMapMarkerAlt, label: "Location" },
            { icon: FaIndustry, label: "Industry & Keywords" },
            { icon: FaUsers, label: "Employees" },
            { icon: FaDollarSign, label: "Revenue" },
            { icon: FaGlobe, label: "Lookalike domain" },
            { icon: FaCogs, label: "Technologies" },
            { icon: FaMoneyCheckAlt, label: "Funding type" },
            { icon: FaUser, label: "Name" },
            { icon: FaBuilding, label: "Company" }
          ].map((item, index) => (
            <div key={index} className="w-full p-2 rounded text-md md:text-lg text-gray-400 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
              <item.icon />
              <span className="pl-[15px]">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col pr-[10px] md:pr-[25px]">
        {/* Header */}
        {/* Search Section */}
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium mb-4">Search Manually</h2>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">{filteredLeads?.length} results found</div>
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="E.g Engineers in New York in software ..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white flex items-center gap-2 rounded-full px-4 py-2 border-none">
              <span>✨</span> AI Search
            </button>
            <button
              onClick={handleAddToCampaign}
              className="bg-teal-500 hover:bg-teal-600 text-white flex items-center gap-2 rounded-md px-4 py-2"
            >
              <span>✓</span> Add to campaign
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="w-10 p-4">
                    <CustomCheckbox checked={selectAll} onChange={toggleSelectAll} />
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Lead</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Company</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Title</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Email</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Phone</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-500">Last Interaction</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads?.map((lead) => (
                  <LeadRow
                    key={lead.id}
                    checked={lead.checked}
                    onChange={() => toggleLeadSelection(lead.id)}
                    name={lead.name}
                    avatar={lead.avatar}
                    avatarColor={lead.avatarColor}
                    company={lead.company}
                    title={lead.title}
                    email={lead.email}
                    phone={lead.phone}
                    lastInteraction={lead.lastInteraction}
                    owned={lead.owned}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="p-4 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <CustomButton variant="outline" className="flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" /> Previous
            </CustomButton>
            <CustomButton variant="outline" className="w-8 h-8 p-0 bg-gray-100">
              1
            </CustomButton>
            <CustomButton variant="outline" className="w-8 h-8 p-0">
              2
            </CustomButton>
            <CustomButton variant="outline" className="w-8 h-8 p-0">
              3
            </CustomButton>
            <span className="text-sm">...</span>
            <CustomButton variant="outline" className="w-8 h-8 p-0">
              45
            </CustomButton>
            <CustomButton variant="outline" className="flex items-center gap-1">
              Next <ChevronRight className="w-4 h-4" />
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

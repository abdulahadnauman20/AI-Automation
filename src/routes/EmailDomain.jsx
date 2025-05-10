import { useState } from "react"
import { Check, CircleX, File } from "lucide-react"
import { Link } from "react-router-dom";
import { useEmailAccountQuery } from "../reactQuery/hooks/useEmailAccountsQuery";

export default function EmailDomain() {
  const { getDomainSuggestionsMutation, getDomainPricingMutation } = useEmailAccountQuery();

  const [activeTab, setActiveTab] = useState("new");
  const [isModal, setIsModal] = useState(false);
  const [domainExtensions, setDomainExtensions] = useState({
    com: true,
    co: false,
    org: true,
    net: false,
  })

  

  const handleExtensionToggle = (extension) => {
    setDomainExtensions((prev) => ({
      ...prev,
      [extension]: !prev[extension],
    }))
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Tabs */}
      <div className="flex border-none">
        <button
          className={`py-2 px-4 font-medium cursor-pointer ${
            activeTab === "new" ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("new")}
        >
          New Domain
        </button>
        <button
          className={`py-2 px-4 font-medium cursor-pointer ${
            activeTab === "existing" ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("existing")}
        >
          Existing Domains
        </button>
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "new" && (
          <div className="space-y-6">
            {/* Input field */}
            <input
              type="text"
              placeholder="Type your domain name to start"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
            />

            {/* Domain extensions */}
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  className={`w-4 h-4 border rounded flex items-center justify-center ${domainExtensions.com ? "bg-teal-500 border-teal-500" : "border-gray-300"}`}
                >
                  {domainExtensions?.com && <Check className="w-4 h-3 text-white" />}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={domainExtensions.com}
                  onChange={() => handleExtensionToggle("com")}
                />
                <span>.com</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  className={`w-4 h-4 border rounded flex items-center justify-center ${domainExtensions.co ? "bg-teal-500 border-teal-500" : "border-gray-300"}`}
                >
                  {domainExtensions.co && <Check className="w-4 h-4 text-white" />}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={domainExtensions.co}
                  onChange={() => handleExtensionToggle("co")}
                />
                <span>.co</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  className={`w-4 h-4 border rounded flex items-center justify-center ${domainExtensions.org ? "bg-teal-500 border-teal-500" : "border-gray-300"}`}
                >
                  {domainExtensions.org && <Check className="w-4 h-4 text-white" />}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={domainExtensions.org}
                  onChange={() => handleExtensionToggle("org")}
                />
                <span>.org</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  className={`w-4 h-4 border rounded flex items-center justify-center ${domainExtensions.net ? "bg-teal-500 border-teal-500" : "border-gray-300"}`}
                >
                  {domainExtensions.net && <Check className="w-4 h-4 text-white" />}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={domainExtensions.net}
                  onChange={() => handleExtensionToggle("net")}
                />
                <span>.net</span>
              </label>
            </div>

            {/* CSV upload option */}
            <div>
              <button onClick={() => setIsModal(true)} className="text-teal-500 cursor-pointer text-sm font-medium flex items-center gap-1">Or upload a CSV</button>
            </div>

            {isModal && <div class="overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-gray-200 rounded-lg shadow-sm">
                        <button onClick={() => setIsModal(false)} type="button" className="absolute top-2 end-2.5 cursor-pointer text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                        <CircleX />
                        </button>
                        <div className="p-4 md:p-5 text-center">
                        <div className="mt-6 border-2 border-dashed border-teal-400 rounded-lg h-40 flex flex-col items-center justify-center gap-2 transition">
                            <label htmlFor="csvUpload" className="cursor-pointer flex flex-col items-center">
                            <File className="text-teal-500" size={36} />
                            <p className="text-teal-600 font-medium">Upload CSV File</p>
                            </label>
                            <input
                            id="csvUpload"
                            type="file"
                            accept=".csv"
                            className="hidden"
                            />
                        </div>
                        </div>
                    </div>
                </div>
            </div>}
            <p className="font-bold text-black mb-0" >Suggested</p>
            <div className="flex flex-wrap gap-2">
              <p className="flex items-center gap-2 mt-4 bg-teal-50 border w-fit text-[13px] border-teal-300 p-2 rounded-full">
                <span className="">Quickpipie.com</span>
                <CircleX size={17} className="cursor-pointer" />
              </p>
              <p className="flex items-center gap-2 mt-4 bg-teal-50 border w-fit text-[13px] border-teal-300 p-2 rounded-full">
                <span className="">Quickpipie.com</span>
                <CircleX size={17} className="cursor-pointer" />
              </p>
              <p className="flex items-center gap-2 mt-4 bg-teal-50 border w-fit text-[13px] border-teal-300 p-2 rounded-full">
                <span className="">Quickpipie.com</span>
                <CircleX size={17} className="cursor-pointer" />
              </p>
              <p className="flex items-center gap-2 mt-4 bg-teal-50 border w-fit text-[13px] border-teal-300 p-2 rounded-full">
                <span className="">Quickpipie.com</span>
                <CircleX size={17} className="cursor-pointer" />
              </p>
            </div>
            <button className="bg-[#15A395] cursor-pointer text-white py-2 px-4 rounded-full w-fit mb-6">
              Search for more
            </button>
            <p className="font-semibold text-black mb-0" >Selected Domains</p>
            <div className="flex items-center gap-2">
              <input type="text" className="border border-teal-200 outline-none w-full rounded-full py-2 ps-5 pe-2" placeholder="abc.com" />
              <CircleX size={24} className="cursor-pointer text-gray-400" />
            </div>
            <div className="flex items-center gap-x-2 justify-between">
              <p className="text-gray-400 text-[14px] font-semibold">Subtotal (Annual Domain): $30</p>
              <Link to="/email-domain-order">
                <button className="bg-[#15A395] cursor-pointer text-white py-1 px-4 rounded-full w-fit">
                  Next
                </button>
              </Link>
            </div>
          </div>
        )}

        {activeTab === "existing" && (
          <div className="py-8 text-center text-gray-500">Your existing domains will appear here.</div>
        )}
      </div>
    </div>
  )
}


// // // // import { useState, useEffect } from "react";
// // // // import { Check, CircleX, File } from "lucide-react";
// // // // import { Link } from "react-router-dom";
// // // // import { useEmailAccountQuery } from "../reactQuery/hooks/useEmailAccountsQuery";

// // // // export default function EmailDomain() {
// // // //   const { getDomainSuggestionsMutation, getDomainPricingMutation } = useEmailAccountQuery();

// // // //   const [activeTab, setActiveTab] = useState("new");
// // // //   const [isModal, setIsModal] = useState(false);
// // // //   const [domainExtensions, setDomainExtensions] = useState({
// // // //     com: true,
// // // //     co: false,
// // // //     org: true,
// // // //     net: false,
// // // //   });

// // // //   const [domainName, setDomainName] = useState("quickpipe"); // Assume quickpipe is your domain name for simplicity
// // // //   const [selectedExtensions, setSelectedExtensions] = useState(["com", "org"]); // Initial selected extensions

// // // //   const handleExtensionToggle = (extension) => {
// // // //     setDomainExtensions((prev) => {
// // // //       const newState = {
// // // //         ...prev,
// // // //         [extension]: !prev[extension], // Toggle the state of the extension
// // // //       };

// // // //       // Update the selectedExtensions based on the new state
// // // //       const newSelectedExtensions = Object.keys(newState).filter(
// // // //         (key) => newState[key]
// // // //       );
// // // //       setSelectedExtensions(newSelectedExtensions);

// // // //       // Prepare the object to be sent in the API request
// // // //       const requestData = {
// // // //         domain: domainName, // The domain name input
// // // //         tlds: newSelectedExtensions, // The updated list of selected TLDs
// // // //         limit: 10, // Adjust as needed
// // // //       };

// // // //       // Log the object to see what we are sending
// // // //       console.log("Prepared request data:", requestData);

// // // //       // Trigger the mutation for domain suggestions with the updated selected extensions
// // // //       getDomainSuggestionsMutation.mutate(requestData);

// // // //       return newState;
// // // //     });
// // // //   };

// // // //   useEffect(() => {
// // // //     // Optionally, trigger the domain suggestions fetch when the component first mounts
// // // //     getDomainSuggestionsMutation.mutate({
// // // //       domain: domainName,
// // // //       tlds: selectedExtensions,
// // // //       limit: 10,
// // // //     });
// // // //   }, []); // Empty dependency array to only run on mount

// // // //   return (
// // // //     <div className="max-w-xl mx-auto p-4">
// // // //       {/* Tabs */}
// // // //       <div className="flex border-none">
// // // //         <button
// // // //           className={`py-2 px-4 font-medium cursor-pointer ${
// // // //             activeTab === "new" ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-500"
// // // //           }`}
// // // //           onClick={() => setActiveTab("new")}
// // // //         >
// // // //           New Domain
// // // //         </button>
// // // //         <button
// // // //           className={`py-2 px-4 font-medium cursor-pointer ${
// // // //             activeTab === "existing" ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-500"
// // // //           }`}
// // // //           onClick={() => setActiveTab("existing")}
// // // //         >
// // // //           Existing Domains
// // // //         </button>
// // // //       </div>

// // // //       {/* Content */}
// // // //       <div className="mt-6">
// // // //         {activeTab === "new" && (
// // // //           <div className="space-y-6">
// // // //             {/* Input field */}
// // // //             <input
// // // //               type="text"
// // // //               placeholder="Type your domain name to start"
// // // //               value={domainName}
// // // //               onChange={(e) => setDomainName(e.target.value)} // Allow editing domain name
// // // //               className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
// // // //             />

// // // //             {/* Domain extensions */}
// // // //             <div className="flex gap-6">
// // // //               {["com", "co", "org", "net"].map((extension) => (
// // // //                 <label key={extension} className="flex items-center gap-2 cursor-pointer">
// // // //                   <div
// // // //                     className={`w-4 h-4 border rounded flex items-center justify-center ${
// // // //                       domainExtensions[extension] ? "bg-teal-500 border-teal-500" : "border-gray-300"
// // // //                     }`}
// // // //                   >
// // // //                     {domainExtensions[extension] && <Check className="w-4 h-4 text-white" />}
// // // //                   </div>
// // // //                   <input
// // // //                     type="checkbox"
// // // //                     className="sr-only"
// // // //                     checked={domainExtensions[extension]}
// // // //                     onChange={() => handleExtensionToggle(extension)} // Toggle extension
// // // //                   />
// // // //                   <span>.{extension}</span>
// // // //                 </label>
// // // //               ))}
// // // //             </div>

// // // //             {/* Other elements and buttons */}
// // // //             <p className="font-bold text-black mb-0">Suggested</p>
// // // //             {/* Render suggested domains here */}

// // // //             <button className="bg-[#15A395] cursor-pointer text-white py-2 px-4 rounded-full w-fit mb-6">
// // // //               Search for more
// // // //             </button>
// // // //           </div>
// // // //         )}

// // // //         {activeTab === "existing" && (
// // // //           <div className="py-8 text-center text-gray-500">Your existing domains will appear here.</div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // import { useState, useEffect } from "react";
// // // import { Check, CircleX, File } from "lucide-react";
// // // import { Link } from "react-router-dom";
// // // import { useEmailAccountQuery } from "../reactQuery/hooks/useEmailAccountsQuery";

// // // export default function EmailDomain() {
// // //   const { getDomainSuggestionsMutation, getDomainPricingMutation } = useEmailAccountQuery();

// // //   const [activeTab, setActiveTab] = useState("new");
// // //   const [isModal, setIsModal] = useState(false);
// // //   const [domainExtensions, setDomainExtensions] = useState({
// // //     com: true,
// // //     co: false,
// // //     org: true,
// // //     net: false,
// // //   });

// // //   const [domainName, setDomainName] = useState("quickpipe"); // Assume quickpipe is your domain name for simplicity
// // //   const [selectedExtensions, setSelectedExtensions] = useState(["com", "org"]); // Initial selected extensions

// // //   const handleExtensionToggle = (extension) => {
// // //     setDomainExtensions((prev) => {
// // //       const newState = {
// // //         ...prev,
// // //         [extension]: !prev[extension], // Toggle the state of the extension
// // //       };

// // //       // Update the selectedExtensions based on the new state
// // //       const newSelectedExtensions = Object.keys(newState).filter(
// // //         (key) => newState[key]
// // //       );
// // //       setSelectedExtensions(newSelectedExtensions);

// // //       // Prepare the object to be sent in the API request
// // //       const requestData = {
// // //         domain: domainName, // The domain name input
// // //         tlds: newSelectedExtensions, // The updated list of selected TLDs
// // //         limit: 10, // Adjust as needed
// // //       };

// // //       // Log the object to see what we are sending
// // //       console.log("Prepared request data:", requestData);

// // //       // Trigger the mutation for domain suggestions with the updated selected extensions
// // //       getDomainSuggestionsMutation.mutate(requestData);

// // //       return newState;
// // //     });
// // //   };

// // //   useEffect(() => {
// // //     // Optionally, trigger the domain suggestions fetch when the component first mounts
// // //     const requestData = {
// // //       domain: domainName,
// // //       tlds: selectedExtensions,
// // //       limit: 10,
// // //     };
// // //     console.log("Initial request data on mount:", requestData);
// // //     getDomainSuggestionsMutation.mutate(requestData);
// // //   }, []); // Empty dependency array to only run on mount

// // //   return (
// // //     <div className="max-w-xl mx-auto p-4">
// // //       {/* Tabs */}
// // //       <div className="flex border-none">
// // //         <button
// // //           className={`py-2 px-4 font-medium cursor-pointer ${
// // //             activeTab === "new" ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-500"
// // //           }`}
// // //           onClick={() => setActiveTab("new")}
// // //         >
// // //           New Domain
// // //         </button>
// // //         <button
// // //           className={`py-2 px-4 font-medium cursor-pointer ${
// // //             activeTab === "existing" ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-500"
// // //           }`}
// // //           onClick={() => setActiveTab("existing")}
// // //         >
// // //           Existing Domains
// // //         </button>
// // //       </div>

// // //       {/* Content */}
// // //       <div className="mt-6">
// // //         {activeTab === "new" && (
// // //           <div className="space-y-6">
// // //             {/* Input field */}
// // //             <input
// // //               type="text"
// // //               placeholder="Type your domain name to start"
// // //               value={domainName}
// // //               onChange={(e) => setDomainName(e.target.value)} // Allow editing domain name
// // //               className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
// // //             />

// // //             {/* Domain extensions */}
// // //             <div className="flex gap-6">
// // //               {["com", "co", "org", "net"].map((extension) => (
// // //                 <label key={extension} className="flex items-center gap-2 cursor-pointer">
// // //                   <div
// // //                     className={`w-4 h-4 border rounded flex items-center justify-center ${
// // //                       domainExtensions[extension] ? "bg-teal-500 border-teal-500" : "border-gray-300"
// // //                     }`}
// // //                   >
// // //                     {domainExtensions[extension] && <Check className="w-4 h-4 text-white" />}
// // //                   </div>
// // //                   <input
// // //                     type="checkbox"
// // //                     className="sr-only"
// // //                     checked={domainExtensions[extension]}
// // //                     onChange={() => handleExtensionToggle(extension)} // Toggle extension
// // //                   />
// // //                   <span>.{extension}</span>
// // //                 </label>
// // //               ))}
// // //             </div>

// // //             {/* CSV upload option */}
// // //             <div>
// // //               <button onClick={() => setIsModal(true)} className="text-teal-500 cursor-pointer text-sm font-medium flex items-center gap-1">Or upload a CSV</button>
// // //             </div>

// // //             {isModal && <div class="overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
// // //                 <div className="relative p-4 w-full max-w-md max-h-full">
// // //                     <div className="relative bg-gray-200 rounded-lg shadow-sm">
// // //                         <button onClick={() => setIsModal(false)} type="button" className="absolute top-2 end-2.5 cursor-pointer text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
// // //                         <CircleX />
// // //                         </button>
// // //                         <div className="p-4 md:p-5 text-center">
// // //                         <div className="mt-6 border-2 border-dashed border-teal-400 rounded-lg h-40 flex flex-col items-center justify-center gap-2 transition">
// // //                             <label htmlFor="csvUpload" className="cursor-pointer flex flex-col items-center">
// // //                             <File className="text-teal-500" size={36} />
// // //                             <p className="text-teal-600 font-medium">Upload CSV File</p>
// // //                             </label>
// // //                             <input
// // //                             id="csvUpload"
// // //                             type="file"
// // //                             accept=".csv"
// // //                             className="hidden"
// // //                             />
// // //                         </div>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </div>}

// // //             <p className="font-bold text-black mb-0">Suggested</p>
            
// // //             <div className="flex flex-wrap gap-2">
// // //               <p className="flex items-center gap-2 mt-4 bg-teal-50 border w-fit text-[13px] border-teal-300 p-2 rounded-full">
// // //                 <span className="">Quickpipie.com</span>
// // //                 <CircleX size={17} className="cursor-pointer" />
// // //               </p>
// // //               <p className="flex items-center gap-2 mt-4 bg-teal-50 border w-fit text-[13px] border-teal-300 p-2 rounded-full">
// // //                 <span className="">Quickpipie.com</span>
// // //                 <CircleX size={17} className="cursor-pointer" />
// // //               </p>
// // //               <p className="flex items-center gap-2 mt-4 bg-teal-50 border w-fit text-[13px] border-teal-300 p-2 rounded-full">
// // //                 <span className="">Quickpipie.com</span>
// // //                 <CircleX size={17} className="cursor-pointer" />
// // //               </p>
// // //               <p className="flex items-center gap-2 mt-4 bg-teal-50 border w-fit text-[13px] border-teal-300 p-2 rounded-full">
// // //                 <span className="">Quickpipie.com</span>
// // //                 <CircleX size={17} className="cursor-pointer" />
// // //               </p>
// // //             </div>

// // //             <button className="bg-[#15A395] cursor-pointer text-white py-2 px-4 rounded-full w-fit mb-6">
// // //               Search for more
// // //             </button>
// // //             <p className="font-semibold text-black mb-0" >Selected Domains</p>
// // //             <div className="flex items-center gap-2">
// // //               <input type="text" className="border border-teal-200 outline-none w-full rounded-full py-2 ps-5 pe-2" placeholder="abc.com" />
// // //               <CircleX size={24} className="cursor-pointer text-gray-400" />
// // //             </div>
// // //             <div className="flex items-center gap-x-2 justify-between">
// // //               <p className="text-gray-400 text-[14px] font-semibold">Subtotal (Annual Domain): $30</p>
// // //               <Link to="/email-domain-order">
// // //                 <button className="bg-[#15A395] cursor-pointer text-white py-1 px-4 rounded-full w-fit">
// // //                   Next
// // //                 </button>
// // //               </Link>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {activeTab === "existing" && (
// // //           <div className="py-8 text-center text-gray-500">Your existing domains will appear here.</div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import { useState, useEffect } from "react";
// // import { Check, CircleX, File } from "lucide-react";
// // import { Link } from "react-router-dom";
// // import { useEmailAccountQuery } from "../reactQuery/hooks/useEmailAccountsQuery";

// // export default function EmailDomain() {
// //   const { getDomainSuggestionsMutation, getDomainPricingMutation } = useEmailAccountQuery();

// //   const [activeTab, setActiveTab] = useState("new");
// //   const [isModal, setIsModal] = useState(false);
// //   const [domainExtensions, setDomainExtensions] = useState({
// //     com: true,
// //     co: false,
// //     org: true,
// //     net: false,
// //   });

// //   const [domainName, setDomainName] = useState("quickpipe"); // Assume quickpipe is your domain name for simplicity
// //   const [selectedExtensions, setSelectedExtensions] = useState(["com", "org"]); // Initial selected extensions
// //   const [domainSuggestions, setDomainSuggestions] = useState([]); // State for storing domain suggestions

// //   const handleExtensionToggle = (extension) => {
// //     setDomainExtensions((prev) => {
// //       const newState = {
// //         ...prev,
// //         [extension]: !prev[extension], // Toggle the state of the extension
// //       };

// //       const newSelectedExtensions = Object.keys(newState).filter(
// //         (key) => newState[key]
// //       );
// //       setSelectedExtensions(newSelectedExtensions);

// //       const requestData = {
// //         domain: domainName,
// //         tlds: newSelectedExtensions,
// //         limit: 10,
// //       };

// //       console.log("Updated request data on extension toggle:", requestData);

// //       getDomainSuggestionsMutation.mutate(requestData, {
// //         onSuccess: (data) => {
// //           setDomainSuggestions(data.Suggestions); // Update the suggestions
// //         },
// //         onError: (error) => {
// //           console.error("Error fetching domain suggestions:", error);
// //         },
// //       });

// //       return newState;
// //     });
// //   };

// //   useEffect(() => {
// //     // Fetch domain suggestions when the component mounts or when domainName or selectedExtensions change
// //     const requestData = {
// //       domain: domainName,
// //       tlds: selectedExtensions,
// //       limit: 10,
// //     };

// //     console.log("Initial request data on mount:", requestData);

// //     getDomainSuggestionsMutation.mutate(requestData, {
// //       onSuccess: (data) => {
// //         setDomainSuggestions(data.Suggestions); // Set domain suggestions from API response
// //       },
// //       onError: (error) => {
// //         console.error("Error fetching domain suggestions:", error);
// //       },
// //     });
// //   }, [domainName, selectedExtensions]); // Fetch on domain name or selected extension change

// //   return (
// //     <div className="max-w-xl mx-auto p-4">
// //       {/* Tabs */}
// //       <div className="flex border-none">
// //         <button
// //           className={`py-2 px-4 font-medium cursor-pointer ${
// //             activeTab === "new" ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-500"
// //           }`}
// //           onClick={() => setActiveTab("new")}
// //         >
// //           New Domain
// //         </button>
// //         <button
// //           className={`py-2 px-4 font-medium cursor-pointer ${
// //             activeTab === "existing" ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-500"
// //           }`}
// //           onClick={() => setActiveTab("existing")}
// //         >
// //           Existing Domains
// //         </button>
// //       </div>

// //       {/* Content */}
// //       <div className="mt-6">
// //         {activeTab === "new" && (
// //           <div className="space-y-6">
// //             {/* Input field */}
// //             <input
// //               type="text"
// //               placeholder="Type your domain name to start"
// //               value={domainName}
// //               onChange={(e) => setDomainName(e.target.value)} // Allow editing domain name
// //               className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
// //             />

// //             {/* Domain extensions */}
// //             <div className="flex gap-6">
// //               {["com", "co", "org", "net"].map((extension) => (
// //                 <label key={extension} className="flex items-center gap-2 cursor-pointer">
// //                   <div
// //                     className={`w-4 h-4 border rounded flex items-center justify-center ${
// //                       domainExtensions[extension] ? "bg-teal-500 border-teal-500" : "border-gray-300"
// //                     }`}
// //                   >
// //                     {domainExtensions[extension] && <Check className="w-4 h-4 text-white" />}
// //                   </div>
// //                   <input
// //                     type="checkbox"
// //                     className="sr-only"
// //                     checked={domainExtensions[extension]}
// //                     onChange={() => handleExtensionToggle(extension)} // Toggle extension
// //                   />
// //                   <span>.{extension}</span>
// //                 </label>
// //               ))}
// //             </div>

// //             {/* Domain suggestions */}
// //             <p className="font-bold text-black mb-0">Suggested</p>
// //             <div className="flex flex-wrap gap-2">
// //               {domainSuggestions.length > 0 ? (
// //                 domainSuggestions.map((suggestion, index) => (
// //                   <p key={index} className="flex items-center gap-2 mt-4 bg-teal-50 border w-fit text-[13px] border-teal-300 p-2 rounded-full">
// //                     <span className="">{suggestion}</span>
// //                     <CircleX size={17} className="cursor-pointer" />
// //                   </p>
// //                 ))
// //               ) : (
// //                 <p>No suggestions available. Try changing the domain or extensions.</p>
// //               )}
// //             </div>

// //             <button className="bg-[#15A395] cursor-pointer text-white py-2 px-4 rounded-full w-fit mb-6">
// //               Search for more
// //             </button>

// //             {/* Selected Domains */}
// //             <p className="font-semibold text-black mb-0" >Selected Domains</p>
// //             <div className="flex items-center gap-2">
// //               <input type="text" className="border border-teal-200 outline-none w-full rounded-full py-2 ps-5 pe-2" placeholder="abc.com" />
// //               <CircleX size={24} className="cursor-pointer text-gray-400" />
// //             </div>
// //             <div className="flex items-center gap-x-2 justify-between">
// //               <p className="text-gray-400 text-[14px] font-semibold">Subtotal (Annual Domain): $30</p>
// //               <Link to="/email-domain-order">
// //                 <button className="bg-[#15A395] cursor-pointer text-white py-1 px-4 rounded-full w-fit">
// //                   Next
// //                 </button>
// //               </Link>
// //             </div>
// //           </div>
// //         )}

// //         {activeTab === "existing" && (
// //           <div className="py-8 text-center text-gray-500">Your existing domains will appear here.</div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


// import { useState, useEffect } from "react";
// import { Check, CircleX, File } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useEmailAccountQuery } from "../reactQuery/hooks/useEmailAccountsQuery";

// export default function EmailDomain() {
//   const { getDomainSuggestionsMutation, getDomainPricingMutation } = useEmailAccountQuery();

//   const [activeTab, setActiveTab] = useState("new");
//   const [isModal, setIsModal] = useState(false);
//   const [domainExtensions, setDomainExtensions] = useState({
//     com: true,
//     co: false,
//     org: true,
//     net: false,
//   });

//   const [domainName, setDomainName] = useState("quickpipe");
//   const [selectedExtensions, setSelectedExtensions] = useState(["com", "org"]);
//   const [domainSuggestions, setDomainSuggestions] = useState([]);
//   const [selectedDomains, setSelectedDomains] = useState(new Set()); // Set to track selected domains

//   const handleExtensionToggle = (extension) => {
//     setDomainExtensions((prev) => {
//       const newState = { ...prev, [extension]: !prev[extension] };

//       const newSelectedExtensions = Object.keys(newState).filter(
//         (key) => newState[key]
//       );
//       setSelectedExtensions(newSelectedExtensions);

//       const requestData = {
//         domain: domainName,
//         tlds: newSelectedExtensions,
//         limit: 10,
//       };

//       console.log("Updated request data on extension toggle:", requestData);

//       getDomainSuggestionsMutation.mutate(requestData, {
//         onSuccess: (data) => {
//           setDomainSuggestions(data.Suggestions);
//         },
//         onError: (error) => {
//           console.error("Error fetching domain suggestions:", error);
//         },
//       });

//       return newState;
//     });
//   };

//   useEffect(() => {
//     // Fetch domain suggestions when the component mounts or when domainName or selectedExtensions change
//     const requestData = {
//       domain: domainName,
//       tlds: selectedExtensions,
//       limit: 10,
//     };

//     console.log("Initial request data on mount:", requestData);

//     getDomainSuggestionsMutation.mutate(requestData, {
//       onSuccess: (data) => {
//         setDomainSuggestions(data.Suggestions); // Set domain suggestions from API response
//       },
//       onError: (error) => {
//         console.error("Error fetching domain suggestions:", error);
//       },
//     });
//   }, [domainName, selectedExtensions]);

//   const handleDomainSelection = (domain) => {
//     setSelectedDomains((prevSelected) => {
//       const newSelected = new Set(prevSelected);
//       if (newSelected.has(domain)) {
//         newSelected.delete(domain); // Deselect the domain
//       } else {
//         newSelected.add(domain); // Select the domain
//       }

//       const requestData = {
//         domains: Array.from(newSelected)
//       }

//       console.log("Sending data: ", requestData);

//       // Trigger pricing mutation with selected domains
//       getDomainPricingMutation.mutate(requestData, {
//         onSuccess: (data) => {
//           console.log("Pricing data for selected domains:", data);
//         },
//         onError: (error) => {
//           console.error("Error fetching domain pricing:", error);
//         },
//       });

//       return newSelected;
//     });
//   };

//   return (
//     <div className="max-w-xl mx-auto p-4">
//       {/* Tabs */}
//       <div className="flex border-none">
//         <button
//           className={`py-2 px-4 font-medium cursor-pointer ${
//             activeTab === "new" ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-500"
//           }`}
//           onClick={() => setActiveTab("new")}
//         >
//           New Domain
//         </button>
//         <button
//           className={`py-2 px-4 font-medium cursor-pointer ${
//             activeTab === "existing" ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-500"
//           }`}
//           onClick={() => setActiveTab("existing")}
//         >
//           Existing Domains
//         </button>
//       </div>

//       {/* Content */}
//       <div className="mt-6">
//         {activeTab === "new" && (
//           <div className="space-y-6">
//             {/* Input field */}
//             <input
//               type="text"
//               placeholder="Type your domain name to start"
//               value={domainName}
//               onChange={(e) => setDomainName(e.target.value)} // Allow editing domain name
//               className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
//             />

//             {/* Domain extensions */}
//             <div className="flex gap-6">
//               {["com", "co", "org", "net"].map((extension) => (
//                 <label key={extension} className="flex items-center gap-2 cursor-pointer">
//                   <div
//                     className={`w-4 h-4 border rounded flex items-center justify-center ${
//                       domainExtensions[extension] ? "bg-teal-500 border-teal-500" : "border-gray-300"
//                     }`}
//                   >
//                     {domainExtensions[extension] && <Check className="w-4 h-4 text-white" />}
//                   </div>
//                   <input
//                     type="checkbox"
//                     className="sr-only"
//                     checked={domainExtensions[extension]}
//                     onChange={() => handleExtensionToggle(extension)} // Toggle extension
//                   />
//                   <span>.{extension}</span>
//                 </label>
//               ))}
//             </div>

//             {/* Domain suggestions */}
//             <p className="font-bold text-black mb-0">Suggested</p>
//             <div className="flex flex-wrap gap-2">
//               {domainSuggestions.length > 0 ? (
//                 domainSuggestions.map((suggestion, index) => (
//                   <p
//                     key={index}
//                     className="flex items-center gap-2 mt-4 bg-teal-50 border w-fit text-[13px] border-teal-300 p-2 rounded-full cursor-pointer"
//                     onClick={() => handleDomainSelection(suggestion)} // Handle select/deselect
//                   >
//                     <span>{suggestion}</span>
//                     {selectedDomains.has(suggestion) ? (
//                       <CircleX size={17} className="cursor-pointer" />
//                     ) : (
//                       <Check size={17} className="cursor-pointer" />
//                     )}
//                   </p>
//                 ))
//               ) : (
//                 <p>No suggestions available. Try changing the domain or extensions.</p>
//               )}
//             </div>

//             <button className="bg-[#15A395] cursor-pointer text-white py-2 px-4 rounded-full w-fit mb-6">
//               Search for more
//             </button>

//             {/* Selected Domains */}
//             <p className="font-semibold text-black mb-0">Selected Domains</p>
//             <div className="flex items-center gap-2">
//               <input
//                 type="text"
//                 className="border border-teal-200 outline-none w-full rounded-full py-2 ps-5 pe-2"
//                 placeholder="abc.com"
//               />
//               <CircleX size={24} className="cursor-pointer text-gray-400" />
//             </div>
//             <div className="flex items-center gap-x-2 justify-between">
//               <p className="text-gray-400 text-[14px] font-semibold">Subtotal (Annual Domain): $30</p>
//               <Link to="/email-domain-order">
//                 <button className="bg-[#15A395] cursor-pointer text-white py-1 px-4 rounded-full w-fit">
//                   Next
//                 </button>
//               </Link>
//             </div>
//           </div>
//         )}

//         {activeTab === "existing" && (
//           <div className="py-8 text-center text-gray-500">Your existing domains will appear here.</div>
//         )}
//       </div>
//     </div>
//   );
// }

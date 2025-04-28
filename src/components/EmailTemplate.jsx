// // // // // import { useEffect, useState } from "react"
// // // // // import { ChevronDown, Eye, Share2, Plus, X } from "lucide-react"
// // // // // import { Editor } from '@tinymce/tinymce-react'; 
// // // // // import { useCampaignQuery } from "../reactQuery/hooks/useCampaignQuery"

// // // // // export default function EmailTemplateBuilder({ campaignId }) {
// // // // //   const { getCampaignSequenceQuery } = useCampaignQuery();
// // // // //   const [subject, setSubject] = useState("Boost {company}'s Sales with Smart Lead Management 🚀");
// // // // //   const[selectStep, setSelectStep]  = useState(null);
// // // // //   const [steps, setSteps] = useState([
// // // // //     { id: 1, value: "Boost {company}'s Sales with Smart Lead Management" }
// // // // //   ]) 

// // // // //   const {
// // // // //     data: campaignSequence,
// // // // //     isLoading: isSequenceLoading,
// // // // //     isError: isSequenceError,
// // // // //     error: sequenceError,
// // // // //   } = getCampaignSequenceQuery(campaignId);

// // // // //   useEffect(() => {
// // // // //     if (campaignSequence) {
// // // // //       console.log("Campaign sequence data:", campaignSequence);
// // // // //     }
// // // // //   }, [campaignSequence]);


// // // // //   const [content, setContent] = useState(`
// // // // //     <p>Hi {user},</p>
// // // // //     <p>Growing a small business is challenging, and keeping track of leads shouldn't slow you down. 
// // // // //     That's why Quickpipe AI helps businesses like {company} stay organized, automate follow-ups, 
// // // // //     and close deals faster—all in one place.</p>
// // // // //     <p>With integrations for Slack, Salesforce, Google Calendar, and more, Quickpipe AI ensures you 
// // // // //     never miss an opportunity. Ready to scale your sales without the hassle? Try Quickpipe AI today 
// // // // //     and see the difference!</p>
// // // // //     <p><a href="#" style="color: #3b82f6;">[Start Your Free Trial]</a></p>
// // // // //     <p>Best,<br>The Quickpipe AI Team</p>
// // // // //   `)

// // // // //   const addStep = () => {
// // // // //     if (steps.length < 3) {
// // // // //       setSteps([...steps, { id: steps.length + 1, value: "" }]) // Add new step
// // // // //     }
// // // // //   }

// // // // //   const deleteStep = (id) => {
// // // // //     setSteps(steps.filter(step => step.id !== id)) // Remove the step with the matching id
// // // // //   }

// // // // //   const handleStepChange = (id, value) => {
// // // // //     setSteps(steps.map(step => step.id === id ? { ...step, value } : step)) // Update the value of a specific step
// // // // //   }

// // // // //   if (isSequenceLoading) return <div>Loading campaign sequence...</div>;
// // // // //   if (isSequenceError) return <div>Error: {sequenceError.message}</div>;

// // // // //   return (
// // // // //     <div className="flex h-screen bg-white">
// // // // //       {/* Sidebar */}
// // // // //       <div className="w-80 p-4 flex flex-col gap-4">
// // // // //         {steps.map((step) => (
// // // // //           <div key={step.id} onClick={() => setSelectStep(step.id)} className={`p-4 border rounded-lg cursor-pointer 
// // // // //             ${selectStep === step.id ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'}`}>
// // // // //             <div className="flex justify-between items-center my-2">
// // // // //                 <p className="font-semibold">Day1</p>
// // // // //                 <button
// // // // //                 onClick={() => deleteStep(step.id)}
// // // // //                 className="text-red-500 ml-2 cursor-pointer"
// // // // //                 >
// // // // //                 <X size={16} />
// // // // //                 </button>
// // // // //             </div>
// // // // //             <hr className="my-2 text-gray-300" />
// // // // //             <input
// // // // //               type="text"
// // // // //               value={step.value}
// // // // //               onChange={(e) => handleStepChange(step.id, e.target.value)}
// // // // //               className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
// // // // //               placeholder={`Step ${step.id}`}
// // // // //             />
// // // // //           </div>
// // // // //         ))}

// // // // //         <button
// // // // //           onClick={addStep}
// // // // //           disabled={steps.length >= 3}
// // // // //           className="w-full py-2 border border-gray-300 rounded-full flex items-center justify-center gap-2 text-gray-500 hover:bg-gray-100 transition-colors border-dashed"
// // // // //         >
// // // // //           <Plus size={16} />
// // // // //           <span className="cursor-pointer">Add step</span>
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* Main */}
// // // // //       <div className="flex-1 border-l border-gray-200 p-4 overflow-y-auto">
// // // // //         <div className="max-w-4xl mx-auto">
// // // // //           {/* Subject and Action Buttons */}
// // // // //           <div className="flex justify-between items-center mb-6">
// // // // //             <div className="text-gray-700 text-sm">
// // // // //               <span className="font-medium">Subject: </span>
// // // // //               {subject}
// // // // //             </div>
// // // // //             <div className="flex gap-2">
// // // // //               <button className="px-3 py-2 border border-teal-500 text-teal-500 hover:bg-teal-50 text-sm rounded flex items-center gap-1">
// // // // //                 <Eye size={16} />
// // // // //                 <span>Preview</span>
// // // // //               </button>
// // // // //               <button className="p-2 border border-gray-300 text-gray-500 rounded hover:bg-gray-100">
// // // // //                 <Share2 size={16} />
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* TinyMCE Editor */}
// // // // //           <div className="mb-6">
// // // // //             <Editor
// // // // //               apiKey="0bzfzjjqiuia2rn540o4c8ptxbh5gxwyj9jhvpk1aww16juk" // You need to set your TinyMCE API key here
// // // // //               value={content}
// // // // //               onEditorChange={(newContent) => setContent(newContent)}
// // // // //               init={{
// // // // //                 height: 400,
// // // // //                 menubar: false,
// // // // //                 plugins: [
// // // // //                   "advlist autolink lists link image charmap print preview anchor",
// // // // //                   "searchreplace visualblocks code fullscreen",
// // // // //                   "insertdatetime media table paste code help wordcount",
// // // // //                 ],
// // // // //                 toolbar:
// // // // //                   "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
// // // // //               }}
// // // // //             />
// // // // //           </div>

// // // // //           <div className="mt-6">
// // // // //             <button className="bg-teal-600  hover:bg-teal-600 text-white px-6 py-1.5 rounded-full text-[15px]">
// // // // //               Save
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }



// // // // import { useEffect, useState } from "react";
// // // // import { ChevronDown, Eye, Share2, Plus, X } from "lucide-react";
// // // // import { Editor } from '@tinymce/tinymce-react';
// // // // import { useCampaignQuery } from "../reactQuery/hooks/useCampaignQuery";

// // // // export default function EmailTemplateBuilder({ campaignId }) {
// // // //   const { getCampaignSequenceQuery } = useCampaignQuery();
// // // //   const [selectStep, setSelectStep] = useState(null);
// // // //   const [steps, setSteps] = useState([]);
// // // //   const [content, setContent] = useState("");
// // // //   const [subject, setSubject] = useState("");

// // // //   const {
// // // //     data: campaignSequence,
// // // //     isLoading: isSequenceLoading,
// // // //     isError: isSequenceError,
// // // //     error: sequenceError,
// // // //   } = getCampaignSequenceQuery(campaignId);

// // // //   // Once campaign sequence data is fetched, populate the steps and set the initial content
// // // //   useEffect(() => {

// // // //     console.log(campaignSequence);

// // // //     if (campaignSequence?.sequence?.Emails) {
// // // //       const emailSteps = campaignSequence.sequence.Emails.map((email, index) => ({
// // // //         id: index + 1,
// // // //         value: email.Name, // Name will be used as the step name
// // // //         subject: email.Subject, // Subject for the step
// // // //         body: email.Body, // Body will be the content of the editor
// // // //       }));

// // // //       // Set the first step as selected
// // // //       setSteps(emailSteps);
// // // //       setSelectStep(emailSteps[0]?.id);
// // // //       setSubject(emailSteps[0]?.subject);
// // // //       setContent(emailSteps[0]?.body);
// // // //     }
// // // //   }, [campaignSequence]);

// // // //   const addStep = () => {
// // // //     if (steps.length < 3) {
// // // //       setSteps([...steps, { id: steps.length + 1, value: "", subject: "", body: "" }]); // Add new step
// // // //     }
// // // //   };

// // // //   const deleteStep = (id) => {
// // // //     setSteps(steps.filter(step => step.id !== id)); // Remove the step with the matching id
// // // //     if (selectStep === id) {
// // // //       setSelectStep(null); // Deselect if the deleted step was selected
// // // //     }
// // // //   };

// // // //   const handleStepChange = (id, value) => {
// // // //     setSteps(steps.map(step => step.id === id ? { ...step, value } : step)); // Update the value of a specific step
// // // //   };

// // // //   const handleSelectStep = (id) => {
// // // //     const selectedStep = steps.find(step => step.id === id);
// // // //     if (selectedStep) {
// // // //       setSelectStep(id);
// // // //       setSubject(selectedStep.subject); // Set the subject for the main area
// // // //       setContent(selectedStep.body); // Set the body for the main area editor
// // // //     }
// // // //   };

// // // //   if (isSequenceLoading) return <div>Loading campaign sequence...</div>;
// // // //   if (isSequenceError) return <div>Error: {sequenceError.message}</div>;

// // // //   return (
// // // //     <div className="flex h-screen bg-white">
// // // //       {/* Sidebar */}
// // // //       <div className="w-80 p-4 flex flex-col gap-4">
// // // //         {steps.map((step) => (
// // // //           <div
// // // //             key={step.id}
// // // //             onClick={() => handleSelectStep(step.id)}
// // // //             className={`p-4 border rounded-lg cursor-pointer 
// // // //               ${selectStep === step.id ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'}`}
// // // //           >
// // // //             <div className="flex justify-between items-center my-2">
// // // //               <p className="font-semibold">{step.value}</p>
// // // //               <button
// // // //                 onClick={() => deleteStep(step.id)}
// // // //                 className="text-red-500 ml-2 cursor-pointer"
// // // //               >
// // // //                 <X size={16} />
// // // //               </button>
// // // //             </div>
// // // //             <hr className="my-2 text-gray-300" />
// // // //             <input
// // // //               type="text"
// // // //               value={step.subject}
// // // //               onChange={(e) => handleStepChange(step.id, e.target.value)}
// // // //               className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
// // // //               placeholder={`Step ${step.id}`}
// // // //             />
// // // //           </div>
// // // //         ))}

// // // //         <button
// // // //           onClick={addStep}
// // // //           disabled={steps.length >= 3}
// // // //           className="w-full py-2 border border-gray-300 rounded-full flex items-center justify-center gap-2 text-gray-500 hover:bg-gray-100 transition-colors border-dashed"
// // // //         >
// // // //           <Plus size={16} />
// // // //           <span className="cursor-pointer">Add step</span>
// // // //         </button>
// // // //       </div>

// // // //       {/* Main */}
// // // //       <div className="flex-1 border-l border-gray-200 p-4 overflow-y-auto">
// // // //         <div className="max-w-4xl mx-auto">
// // // //           {/* Subject and Action Buttons */}
// // // //           <div className="flex justify-between items-center mb-6">
// // // //             <div className="text-gray-700 text-sm">
// // // //               <span className="font-medium">Subject: </span>
// // // //               {subject}
// // // //             </div>
// // // //             <div className="flex gap-2">
// // // //               <button className="px-3 py-2 border border-teal-500 text-teal-500 hover:bg-teal-50 text-sm rounded flex items-center gap-1">
// // // //                 <Eye size={16} />
// // // //                 <span>Preview</span>
// // // //               </button>
// // // //               <button className="p-2 border border-gray-300 text-gray-500 rounded hover:bg-gray-100">
// // // //                 <Share2 size={16} />
// // // //               </button>
// // // //             </div>
// // // //           </div>

// // // //           {/* TinyMCE Editor */}
// // // //           <div className="mb-6">
// // // //             <Editor
// // // //               apiKey="0bzfzjjqiuia2rn540o4c8ptxbh5gxwyj9jhvpk1aww16juk" // You need to set your TinyMCE API key here
// // // //               value={content}
// // // //               onEditorChange={(newContent) => setContent(newContent)}
// // // //               init={{
// // // //                 height: 400,
// // // //                 menubar: false,
// // // //                 plugins: [
// // // //                   "advlist autolink lists link image charmap print preview anchor",
// // // //                   "searchreplace visualblocks code fullscreen",
// // // //                   "insertdatetime media table paste code help wordcount",
// // // //                 ],
// // // //                 toolbar:
// // // //                   "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
// // // //                 statusbar: false,  
// // // //                 branding: false, 
// // // //                 inline: false,
// // // //                 // Add content styling if necessary
// // // //                 content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; }',
// // // //               }}
// // // //             />
// // // //           </div>

// // // //           <div className="mt-6">
// // // //             <button className="bg-teal-600  hover:bg-teal-600 text-white px-6 py-1.5 rounded-full text-[15px]">
// // // //               Save
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // import { useEffect, useState } from "react";
// // // import { ChevronDown, Eye, Share2, Plus, X } from "lucide-react";
// // // import { Editor } from '@tinymce/tinymce-react';
// // // import { useCampaignQuery } from "../reactQuery/hooks/useCampaignQuery";

// // // export default function EmailTemplateBuilder({ campaignId }) {
// // //   const { getCampaignSequenceQuery } = useCampaignQuery();
// // //   const [selectStep, setSelectStep] = useState(null);
// // //   const [steps, setSteps] = useState([]);
// // //   const [content, setContent] = useState("");
// // //   const [subject, setSubject] = useState("");

// // //   const {
// // //     data: campaignSequence,
// // //     isLoading: isSequenceLoading,
// // //     isError: isSequenceError,
// // //     error: sequenceError,
// // //   } = getCampaignSequenceQuery(campaignId);

// // //   // Once campaign sequence data is fetched, populate the steps and set the initial content
// // //   useEffect(() => {
// // //     if (campaignSequence?.sequence?.Emails) {
// // //       const emailSteps = campaignSequence.sequence.Emails.map((email, index) => ({
// // //         id: index + 1,
// // //         value: email.Name, // Name will be used as the step name
// // //         subject: email.Subject, // Subject for the step
// // //         body: email.Body, // Body will be the content of the editor
// // //       }));

// // //       // Set the first step as selected
// // //       setSteps(emailSteps);
// // //       setSelectStep(emailSteps[0]?.id);
// // //       setSubject(emailSteps[0]?.subject);
// // //       setContent(emailSteps[0]?.body);
// // //     }
// // //   }, [campaignSequence]);

// // //   const addStep = () => {
// // //     if (steps.length < 3) {
// // //       setSteps([...steps, { id: steps.length + 1, value: "", subject: "", body: "" }]); // Add new step
// // //     }
// // //   };

// // //   const deleteStep = (id) => {
// // //     setSteps(steps.filter(step => step.id !== id)); // Remove the step with the matching id
// // //     if (selectStep === id) {
// // //       setSelectStep(null); // Deselect if the deleted step was selected
// // //     }
// // //   };

// // //   const handleStepChange = (id, value) => {
// // //     setSteps(steps.map(step => step.id === id ? { ...step, value } : step)); // Update the value of a specific step
// // //   };

// // //   const handleSelectStep = (id) => {
// // //     const selectedStep = steps.find(step => step.id === id);
// // //     if (selectedStep) {
// // //       setSelectStep(id);
// // //       setSubject(selectedStep.subject); // Set the subject for the main area
// // //       setContent(selectedStep.body); // Set the body for the main area editor
// // //     }
// // //   };

// // //   const handleWriteWithAI = () => {
// // //     const selectedStep = steps.find(step => step.id === selectStep);
// // //     const emailIndex = selectStep - 1; // The index of the selected step (0-based)
    
// // //     // Construct the object to send
// // //     const emailObject = {
// // //       Emails: campaignSequence.sequence.Emails.map((email, index) => ({
// // //         Name: email.Name,
// // //         Subject: email.Subject,
// // //         Body: email.Body,
// // //       })),
// // //       EmailIndex: emailIndex,
// // //     };

// // //     console.log("Generated Object to Send:", emailObject);
// // //     // Here, you will call your API with the object
// // //     // Example: apiCall(emailObject);
// // //   };

// // //   if (isSequenceLoading) return <div>Loading campaign sequence...</div>;
// // //   if (isSequenceError) return <div>Error: {sequenceError.message}</div>;

// // //   return (
// // //     <div className="flex h-screen bg-white">
// // //       {/* Sidebar */}
// // //       <div className="w-80 p-4 flex flex-col gap-4">
// // //         {steps.map((step) => (
// // //           <div
// // //             key={step.id}
// // //             onClick={() => handleSelectStep(step.id)}
// // //             className={`p-4 border rounded-lg cursor-pointer 
// // //               ${selectStep === step.id ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'}`}
// // //           >
// // //             <div className="flex justify-between items-center my-2">
// // //               <p className="font-semibold">{step.value}</p>
// // //               <button
// // //                 onClick={() => deleteStep(step.id)}
// // //                 className="text-red-500 ml-2 cursor-pointer"
// // //               >
// // //                 <X size={16} />
// // //               </button>
// // //             </div>
// // //             <hr className="my-2 text-gray-300" />
// // //             <input
// // //               type="text"
// // //               value={step.value}
// // //               onChange={(e) => handleStepChange(step.id, e.target.value)}
// // //               className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
// // //               placeholder={`Step ${step.id}`}
// // //             />
// // //           </div>
// // //         ))}

// // //         <button
// // //           onClick={addStep}
// // //           disabled={steps.length >= 3}
// // //           className="w-full py-2 border border-gray-300 rounded-full flex items-center justify-center gap-2 text-gray-500 hover:bg-gray-100 transition-colors border-dashed"
// // //         >
// // //           <Plus size={16} />
// // //           <span className="cursor-pointer">Add step</span>
// // //         </button>
// // //       </div>

// // //       {/* Main */}
// // //       <div className="flex-1 border-l border-gray-200 p-4 overflow-y-auto">
// // //         <div className="max-w-4xl mx-auto">
// // //           {/* Subject and Action Buttons */}
// // //           <div className="flex justify-between items-center mb-6">
// // //             <div className="text-gray-700 text-sm">
// // //               <span className="font-medium">Subject: </span>
// // //               {subject}
// // //             </div>
// // //             <div className="flex gap-2">
// // //               <button className="px-3 py-2 border border-teal-500 text-teal-500 hover:bg-teal-50 text-sm rounded flex items-center gap-1">
// // //                 <Eye size={16} />
// // //                 <span>Preview</span>
// // //               </button>
// // //               <button className="p-2 border border-gray-300 text-gray-500 rounded hover:bg-gray-100">
// // //                 <Share2 size={16} />
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {/* TinyMCE Editor */}
// // //           <div className="mb-6">
// // //             <Editor
// // //               apiKey="0bzfzjjqiuia2rn540o4c8ptxbh5gxwyj9jhvpk1aww16juk" // You need to set your TinyMCE API key here
// // //               value={content}
// // //               onEditorChange={(newContent) => setContent(newContent)}
// // //               init={{
// // //                 height: 400,
// // //                 menubar: false,
// // //                 plugins: [
// // //                   "advlist autolink lists link image charmap print preview anchor",
// // //                   "searchreplace visualblocks code fullscreen",
// // //                   "insertdatetime media table paste code help wordcount",
// // //                 ],
// // //                 toolbar:
// // //                   "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
// // //               }}
// // //             />
// // //           </div>

// // //           {/* Write with AI Button */}
// // //           <div className="mt-4">
// // //             <button
// // //               onClick={handleWriteWithAI}
// // //               className="px-6 py-2 rounded-full text-white text-lg font-semibold"
// // //               style={{
// // //                 backgroundColor: 'lightgray',
// // //                 background: 'linear-gradient(90deg, rgba(255,0,150,1) 0%, rgba(0,204,255,1) 100%)',
// // //               }}
// // //             >
// // //               Write with AI
// // //             </button>
// // //           </div>

// // //           <div className="mt-6">
// // //             <button className="bg-teal-600 hover:bg-teal-600 text-white px-6 py-1.5 rounded-full text-[15px]">
// // //               Save
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // import { useEffect, useState } from "react";
// // import { ChevronDown, Eye, Share2, Plus, X } from "lucide-react";
// // import { Editor } from '@tinymce/tinymce-react';
// // import { useCampaignQuery } from "../reactQuery/hooks/useCampaignQuery";

// // export default function EmailTemplateBuilder({ campaignId }) {
// //   const { getCampaignSequenceQuery } = useCampaignQuery();
// //   const [selectStep, setSelectStep] = useState(null);
// //   const [steps, setSteps] = useState([]);
// //   const [content, setContent] = useState("");
// //   const [subject, setSubject] = useState("");

// //   const {
// //     data: campaignSequence,
// //     isLoading: isSequenceLoading,
// //     isError: isSequenceError,
// //     error: sequenceError,
// //   } = getCampaignSequenceQuery(campaignId);

// //   // Once campaign sequence data is fetched, populate the steps and set the initial content
// //   useEffect(() => {
// //     if (campaignSequence?.sequence?.Emails) {
// //       const emailSteps = campaignSequence.sequence.Emails.map((email, index) => ({
// //         id: index + 1,
// //         value: email.Name, // Name will be used as the step name
// //         subject: email.Subject, // Subject for the step
// //         body: email.Body, // Body will be the content of the editor
// //       }));

// //       // Set the first step as selected
// //       setSteps(emailSteps);
// //       setSelectStep(emailSteps[0]?.id);
// //       setSubject(emailSteps[0]?.subject);
// //       setContent(emailSteps[0]?.body);
// //     }
// //   }, [campaignSequence]);

// //   const addStep = () => {
// //     if (steps.length < 3) {
// //       setSteps([...steps, { id: steps.length + 1, value: "", subject: "", body: "" }]); // Add new step
// //     }
// //   };

// //   const deleteStep = (id) => {
// //     setSteps(steps.filter(step => step.id !== id)); // Remove the step with the matching id
// //     if (selectStep === id) {
// //       setSelectStep(null); // Deselect if the deleted step was selected
// //     }
// //   };

// //   const handleStepChange = (id, value) => {
// //     setSteps(steps.map(step => step.id === id ? { ...step, value } : step)); // Update the value of a specific step
// //   };

// //   const handleSelectStep = (id) => {
// //     const selectedStep = steps.find(step => step.id === id);
// //     if (selectedStep) {
// //       setSelectStep(id);
// //       setSubject(selectedStep.subject); // Set the subject for the main area
// //       setContent(selectedStep.body); // Set the body for the main area editor
// //     }
// //   };

// //   const handleWriteWithAI = () => {
// //     const selectedStep = steps.find(step => step.id === selectStep);
// //     const emailIndex = selectStep - 1; // The index of the selected step (0-based)
    
// //     // Construct the object to send
// //     const emailObject = {
// //       Emails: campaignSequence.sequence.Emails.map((email, index) => ({
// //         Name: email.Name,
// //         Subject: email.Subject,
// //         Body: email.Body,
// //       })),
// //       EmailIndex: emailIndex,
// //     };

// //     console.log("Generated Object to Send:", emailObject);
// //     // Here, you will call your API with the object
// //     // Example: apiCall(emailObject);
// //   };

// //   if (isSequenceLoading) return <div>Loading campaign sequence...</div>;
// //   if (isSequenceError) return <div>Error: {sequenceError.message}</div>;

// //   return (
// //     <div className="flex min-h-screen bg-white">
// //       {/* Sidebar */}
// //       <div className="w-80 p-4 flex flex-col gap-4">
// //         {steps.map((step) => (
// //           <div
// //             key={step.id}
// //             onClick={() => handleSelectStep(step.id)}
// //             className={`p-4 border rounded-lg cursor-pointer 
// //               ${selectStep === step.id ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'}`}
// //           >
// //             <div className="flex justify-between items-center my-2">
// //               <p className="font-semibold">{step.value}</p>
// //               <button
// //                 onClick={() => deleteStep(step.id)}
// //                 className="text-red-500 ml-2 cursor-pointer"
// //               >
// //                 <X size={16} />
// //               </button>
// //             </div>
// //             <hr className="my-2 text-gray-300" />
// //             <input
// //               type="text"
// //               value={step.subject}
// //               onChange={(e) => handleStepChange(step.id, e.target.value)}
// //               className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
// //               placeholder={`Step ${step.id}`}
// //             />
// //           </div>
// //         ))}

// //         <button
// //           onClick={addStep}
// //           disabled={steps.length >= 3}
// //           className="w-full py-2 border border-gray-300 rounded-full flex items-center justify-center gap-2 text-gray-500 hover:bg-gray-100 transition-colors border-dashed"
// //         >
// //           <Plus size={16} />
// //           <span className="cursor-pointer">Add step</span>
// //         </button>
// //       </div>

// //       {/* Main */}
// //       <div className="flex-1 border-l border-gray-200 p-4 overflow-y-auto">
// //         <div className="max-w-4xl mx-auto">
// //           {/* Subject and Action Buttons */}
// //           <div className="flex justify-between items-center mb-6">
// //             <div className="text-gray-700 text-sm">
// //               <span className="font-medium">Subject: </span>
// //               {subject}
// //             </div>
// //             <div className="flex gap-2">
// //               <button className="px-3 py-2 border border-teal-500 text-teal-500 hover:bg-teal-50 text-sm rounded flex items-center gap-1">
// //                 <Eye size={16} />
// //                 <span>Preview</span>
// //               </button>
// //               <button className="p-2 border border-gray-300 text-gray-500 rounded hover:bg-gray-100">
// //                 <Share2 size={16} />
// //               </button>
// //             </div>
// //           </div>

// //           {/* TinyMCE Editor */}
// //           <div className="mb-6 relative">
// //             <Editor
// //               apiKey="0bzfzjjqiuia2rn540o4c8ptxbh5gxwyj9jhvpk1aww16juk" // You need to set your TinyMCE API key here
// //               value={content}
// //               onEditorChange={(newContent) => setContent(newContent)}

// //               init={{
// //                 height: 400,
// //                 menubar: false,
// //                 plugins: [
// //                   "advlist autolink lists link image charmap print preview anchor",
// //                   "searchreplace visualblocks code fullscreen",
// //                   "insertdatetime media table paste code help wordcount",
// //                 ],
// //                 toolbar:
// //                   "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
// //                 statusbar: false,  
// //                 branding: false, 
// //                 inline: false,
// //               }}
// //             />
// //             {/* Write with AI Button Inside the Editor */}
// //             <div className=" bg-gray-100 bottom-8 right-8 absolute mr-2 mb-2 rounded-full z-10 ">
// //             <button
// //               onClick={handleWriteWithAI}
// //               className="cursor-pointer transform px-6 py-2 rounded-full font-semibold"
// //               style={{
// //                 color: 'transparent',
// //                 background: 'linear-gradient(90deg, #FB8805 0%, #15A395 100%)',
// //                 WebkitBackgroundClip: 'text', // To make text gradient
// //               }}
// //             >
// //               Write with AI
// //             </button>
// //             </div>
// //           </div>

// //           <div className="mt-6">
// //             <button className="bg-teal-600 hover:bg-teal-600 text-white px-6 py-1.5 rounded-full text-[15px]">
// //               Save
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import { ChevronDown, Eye, Share2, Plus, X } from "lucide-react";
// import { Editor } from '@tinymce/tinymce-react';
// import { useCampaignQuery } from "../reactQuery/hooks/useCampaignQuery";

// export default function EmailTemplateBuilder({ campaignId }) {
//   const { getCampaignSequenceQuery } = useCampaignQuery();
//   const [selectStep, setSelectStep] = useState(null);
//   const [steps, setSteps] = useState([]);
//   const [content, setContent] = useState("");
//   const [subject, setSubject] = useState("");

//   const {
//     data: campaignSequence,
//     isLoading: isSequenceLoading,
//     isError: isSequenceError,
//     error: sequenceError,
//   } = getCampaignSequenceQuery(campaignId);

//   // Fetch and populate steps when campaign sequence is available
//   useEffect(() => {
//     if (campaignSequence?.sequence?.Emails) {
//       const emailSteps = campaignSequence.sequence.Emails.map((email, index) => ({
//         id: index + 1,
//         value: email.Name,
//         subject: email.Subject,
//         body: email.Body,
//       }));

//       setSteps(emailSteps);
//       setSelectStep(emailSteps[0]?.id);
//       setSubject(emailSteps[0]?.subject);
//       setContent(emailSteps[0]?.body);
//     }
//   }, [campaignSequence]);

//   // Update step data when subject/content changes
//   useEffect(() => {
//     if (selectStep !== null) {
//       setSteps(prevSteps => 
//         prevSteps.map(step =>
//           step.id === selectStep ? { ...step, subject, body: content } : step
//         )
//       );
//     }
//   }, [subject, content, selectStep]);

//   const addStep = () => {
//     if (steps.length < 3) {
//       setSteps([...steps, { id: steps.length + 1, value: "", subject: "", body: "" }]);
//     }
//   };

//   const deleteStep = (id) => {
//     setSteps(steps.filter(step => step.id !== id));
//     if (selectStep === id) {
//       setSelectStep(null);
//     }
//   };

//   const handleStepChange = (id, value) => {
//     setSteps(steps.map(step => step.id === id ? { ...step, value } : step));
//   };

//   const handleSelectStep = (id) => {
//     const selectedStep = steps.find(step => step.id === id);
//     if (selectedStep) {
//       setSelectStep(id);
//       setSubject(selectedStep.subject);
//       setContent(selectedStep.body);
//     }
//   };

//   const handleWriteWithAI = () => {
//     const emailIndex = selectStep - 1;

//     const emailObject = {
//       Emails: campaignSequence.sequence.Emails.map((email) => ({
//         Name: email.Name,
//         Subject: email.Subject,
//         Body: email.Body,
//       })),
//       EmailIndex: emailIndex,
//     };

//     console.log("Generated Object to Send:", emailObject);
//     // API call goes here
//   };

//   // --- LOADING & ERROR UI Improvements ---

//   if (isSequenceLoading) {
//     return (
//       <div className="min-h-[50vh] flex items-center justify-center">
//         <div className="text-gray-500 text-lg animate-pulse">
//           Loading campaign sequence...
//         </div>
//       </div>
//     );
//   }

//   if (isSequenceError) {
//     return (
//       <div className="min-h-[80vh] flex items-center justify-center">
//         <div className="text-red-500 font-semibold">
//           Error: {sequenceError.message}
//         </div>
//       </div>
//     );
//   }

//   // --- MAIN RENDER ---
//   return (
//     <div className="flex min-h-[50vh] bg-white">
//       {/* Sidebar */}
//       <div className="w-80 p-4 flex flex-col gap-4">
//         {steps.map((step) => (
//           <div
//             key={step.id}
//             onClick={() => handleSelectStep(step.id)}
//             className={`p-4 border rounded-lg cursor-pointer 
//               ${selectStep === step.id ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'}`}
//           >
//             <div className="flex justify-between items-center my-2">
//               <p className="font-semibold">{step.value}</p>
//               <button
//                 onClick={() => deleteStep(step.id)}
//                 className="text-red-500 ml-2 cursor-pointer"
//               >
//                 <X size={16} />
//               </button>
//             </div>
//             <hr className="my-2 text-gray-300" />
//             <input
//               type="text"
//               value={step.subject}
//               onChange={(e) => handleStepChange(step.id, e.target.value)}
//               className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//               placeholder={`Step ${step.id}`}
//             />
//           </div>
//         ))}

//         <button
//           onClick={addStep}
//           disabled={steps.length >= 3}
//           className="w-full py-2 border border-gray-300 rounded-full flex items-center justify-center gap-2 text-gray-500 hover:bg-gray-100 transition-colors border-dashed"
//         >
//           <Plus size={16} />
//           <span className="cursor-pointer">Add step</span>
//         </button>
//       </div>

//       {/* Main */}
//       <div className="flex-1 border-l border-gray-200 p-4 overflow-y-auto">
//         <div className="max-w-4xl mx-auto">
//           {/* Subject and Action Buttons */}
//           <div className="flex justify-between items-center mb-6">
//             <div className="text-gray-700 text-sm">
//               <span className="font-medium">Subject: </span>
//               {subject}
//             </div>
//             <div className="flex gap-2">
//               <button className="px-3 py-2 border border-teal-500 text-teal-500 hover:bg-teal-50 text-sm rounded flex items-center gap-1">
//                 <Eye size={16} />
//                 <span>Preview</span>
//               </button>
//               <button className="p-2 border border-gray-300 text-gray-500 rounded hover:bg-gray-100">
//                 <Share2 size={16} />
//               </button>
//             </div>
//           </div>

//           {/* TinyMCE Editor */}
//           <div className="mb-6 relative">
//             <Editor
//               apiKey={import.meta.env.VITE_TINYMCE_API_KEY} // Now from ENV
//               value={content}
//               onEditorChange={(newContent) => setContent(newContent)}
//               init={{
//                 height: 400,
//                 menubar: false,
//                 plugins: [
//                   "advlist autolink lists link image charmap print preview anchor",
//                   "searchreplace visualblocks code fullscreen",
//                   "insertdatetime media table paste code help wordcount",
//                 ],
//                 toolbar:
//                   "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
//                 statusbar: false,
//                 branding: false,
//                 inline: false,
//               }}
//             />

//             {/* Write with AI Button */}
//             <div className="bg-gray-100 bottom-8 right-8 absolute mr-2 mb-2 rounded-full z-10">
//               <button
//                 onClick={handleWriteWithAI}
//                 className="cursor-pointer transform px-6 py-2 rounded-full font-semibold"
//                 style={{
//                   color: 'transparent',
//                   background: 'linear-gradient(90deg, #FB8805 0%, #15A395 100%)',
//                   WebkitBackgroundClip: 'text',
//                 }}
//               >
//                 Write with AI
//               </button>
//             </div>
//           </div>

//           <div className="mt-6">
//             <button className="bg-teal-600 hover:bg-teal-600 text-white px-6 py-1.5 rounded-full text-[15px]">
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { ChevronDown, Eye, Share2, Plus, X } from "lucide-react";
import { Editor } from '@tinymce/tinymce-react';
import { useCampaignQuery } from "../reactQuery/hooks/useCampaignQuery";

export default function EmailTemplateBuilder({ campaignId }) {
  const { getCampaignSequenceQuery, generateEmailWithAI } = useCampaignQuery();
  const [selectStep, setSelectStep] = useState(null);
  const [steps, setSteps] = useState([]);
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");

  const {
    data: campaignSequence,
    isLoading: isSequenceLoading,
    isError: isSequenceError,
    error: sequenceError,
  } = getCampaignSequenceQuery(campaignId);



  // Fetch and populate steps when campaign sequence is available
  useEffect(() => {
    if (campaignSequence?.sequence?.Emails) {
      const emailSteps = campaignSequence.sequence.Emails.map((email, index, arr) => {
        const isFollowUp = !email.Subject && index > 0; // No subject and not first email
        return {
          id: index + 1,
          value: isFollowUp ? `Follow-up to "${arr[index - 1]?.Name || 'Previous Email'}"` : email.Name,
          subject: email.Subject,
          body: email.Body,
        };
      });

      setSteps(emailSteps);
      setSelectStep(emailSteps[0]?.id);
      setSubject(emailSteps[0]?.subject);
      setContent(emailSteps[0]?.body);
    }
  }, [campaignSequence]);

  // Update step data when subject/content changes
  useEffect(() => {
    if (selectStep !== null) {
      setSteps(prevSteps => 
        prevSteps.map(step =>
          step.id === selectStep ? { ...step, subject, body: content } : step
        )
      );
    }
  }, [subject, content, selectStep]);

  const addSeqStep = () => {
    if (steps.length < 3) {
      setSteps([...steps, { id: steps.length + 1, value: "", subject: "", body: "" }]);
    }
  };

  const deleteSeqStep = (id) => {
    setSteps(steps.filter(step => step.id !== id));
    if (selectStep === id) {
      setSelectStep(null);
    }
  };

  const handleEmailSubjectChange = (id, subject) => {
    setSteps(prevSteps => 
      prevSteps.map(step => 
        step.id === id ? { ...step, subject } : step
      )
    );

    if (id === selectStep) {
      setSubject(subject); // Also update subject displayed above editor
    }
  };
  

  const handleSelectSeqStep = (id) => {
    const selectedStep = steps.find(step => step.id === id);
    if (selectedStep) {
      setSelectStep(id);
      setSubject(selectedStep.subject);
      setContent(selectedStep.body);
    }
  };
  
  const handleWriteEmailWithAI = () => {
    const emailIndex = selectStep - 1;
  
    const emailObject = {
      Emails: campaignSequence.sequence.Emails.map((email) => ({
        Name: email.Name,
        Subject: email.Subject,
        Body: email.Body,
      })),
      EmailIndex: emailIndex,
    };
  
    console.log("Generated Object to Send:", emailObject);
  
    // Use the mutation hook to generate the email with AI
    generateEmailWithAI(
      { campaignId, emailData: emailObject },
      {
        onSuccess: (response) => {
          console.log("AI Email generated successfully:", response);
    
          if (response?.content) {
            const { Subject, Body } = response.content;
    
            setSteps(prevSteps =>
              prevSteps.map((step, idx) =>
                idx === emailIndex
                  ? {
                      ...step,
                      subject: Subject ?? step.subject,
                      body: Body ?? step.body,
                    }
                  : step
              )
            );
    
            if (selectStep - 1 === emailIndex) {
              if (Subject) setSubject(Subject);
              if (Body) setContent(Body);
            }
          }
        },
      }
    );
  };
  

  // --- LOADING & ERROR UI Improvements ---

  if (isSequenceLoading) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center">
        <div className="text-gray-500 text-lg animate-pulse">
          Loading campaign sequence...
        </div>
      </div>
    );
  }

  if (isSequenceError) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center">
        <div className="text-red-500 font-semibold">
          Error: {sequenceError.message}
        </div>
      </div>
    );
  }

  // --- MAIN RENDER ---
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-80 p-4 flex flex-col gap-4">
        {steps.map((step) => (
          <div
            key={step.id}
            onClick={() => handleSelectStep(step.id)}
            className={`p-4 border rounded-lg cursor-pointer 
              ${selectStep === step.id ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'}`}
          >
            <div className="flex justify-between items-center my-2">
              <p className="font-semibold">{step.value}</p>
              <button
                onClick={() => deleteStep(step.id)}
                className="text-red-500 ml-2 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            <hr className="my-2 text-gray-300" />
            <input
              type="text"
              value={step.subject}
              onChange={(e) => handleSubjectChange(step.id, e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder={`Step ${step.id}`}
            />
          </div>
        ))}

        <button
          onClick={addStep}
          disabled={steps.length >= 3}
          className="w-full py-2 border border-gray-300 rounded-full flex items-center justify-center gap-2 text-gray-500 hover:bg-gray-100 transition-colors border-dashed"
        >
          <Plus size={16} />
          <span className="cursor-pointer">Add step</span>
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 border-l border-gray-200 p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Subject and Action Buttons */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-700 text-sm">
              <span className="font-medium">Subject: </span>
              {subject || "No Subject"}
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-2 border border-teal-500 text-teal-500 hover:bg-teal-50 text-sm rounded flex items-center gap-1">
                <Eye size={16} />
                <span>Preview</span>
              </button>
              <button className="p-2 border border-gray-300 text-gray-500 rounded hover:bg-gray-100">
                <Share2 size={16} />
              </button>
            </div>
          </div>

          {/* TinyMCE Editor */}
          <div className="mb-6 relative">
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              value={content}
              onEditorChange={(newContent) => setContent(newContent)}
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
                statusbar: false,
                branding: false,
                inline: false,
              }}
            />

            {/* Write with AI Button */}
            <div className="bg-gray-100 bottom-8 right-8 absolute mr-2 mb-2 rounded-full z-10">
              <button
                onClick={handleWriteWithAI}
                className="cursor-pointer transform px-6 py-2 rounded-full font-semibold"
                style={{
                  color: 'transparent',
                  background: 'linear-gradient(90deg, #FB8805 0%, #15A395 100%)',
                  WebkitBackgroundClip: 'text',
                }}
              >
                Write with AI
              </button>
            </div>
          </div>

          <div className="mt-6">
            <button className="bg-teal-600 hover:bg-teal-600 text-white px-6 py-1.5 rounded-full text-[15px]">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

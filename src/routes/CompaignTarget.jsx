import { useState, useEffect } from "react"
import {
Search,
MoreVertical,
Plus,
MapPin,
Globe,
ChevronDown,
Play,
Pause,
CircleCheck,
ChevronLeft,
ChevronRight,
Clock,
Sparkles,
Phone,
Zap,
Eye,
Hand,
CircleDollarSign,
CircleCheckBig,
Ellipsis,
ArrowDownToLine,
Share2,
ListFilter,
User,
PhoneIncoming,
FileMinus,
MailOpen,
X,
} from "lucide-react"
import { useCampaignQuery } from "../reactQuery/hooks/useCampaignQuery";
import { useParams } from "react-router-dom"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Funnel } from "recharts";
import ScheduleForm from "../components/SheduleForm";
import EmailTemplateBuilder from "../components/EmailTemplate";
import { IoClose } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { Editor } from '@tinymce/tinymce-react';
import { toast } from "react-hot-toast";


// const opportunities = [
//   {
//     id: 1,
//     opportunity: "BetaTech",
//     contact: "Michael Regan",
//     amount: "-",
//     owner: "Beeto Leru",
//     source: "Phone",
//     expectedClosing: "12/2/2025",
//     actualClosing: "12/4/2025",
//     lastInteraction: "12/2/2025 9:23 AM",
//     stage: "Discovery",
//   },
//   {
//     id: 2,
//     opportunity: "Greenfield",
//     contact: "Jordyn Botosh",
//     amount: "$12,839",
//     owner: "Beeto Leru",
//     source: "Email",
//     expectedClosing: "12/2/2025",
//     actualClosing: "12/4/2025",
//     lastInteraction: "12/2/2025 9:23 AM",
//     stage: "Discovery",
//   },
//   {
//     id: 3,
//     opportunity: "Acme Corp.",
//     contact: "Emerson Saris",
//     amount: "-",
//     owner: "Beeto Leru",
//     source: "Phone",
//     expectedClosing: "12/2/2025",
//     actualClosing: "12/4/2025",
//     lastInteraction: "12/2/2025 9:23 AM",
//     stage: "Proposal",
//   },
//   {
//     id: 4,
//     opportunity: "Vertex Health",
//     contact: "Emerson Franci",
//     amount: "-",
//     owner: "Beeto Leru",
//     source: "Phone",
//     expectedClosing: "12/2/2025",
//     actualClosing: "12/4/2025",
//     lastInteraction: "12/2/2025 9:23 AM",
//     stage: "Evaluation",
//   },
//   {
//     id: 5,
//     opportunity: "EcoBuild",
//     contact: "Aspen Vaccaro",
//     amount: "$200",
//     owner: "Beeto Leru",
//     source: "Email",
//     expectedClosing: "12/2/2025",
//     actualClosing: "12/4/2025",
//     lastInteraction: "12/2/2025 9:23 AM",
//     stage: "Evaluation",
//   },
//   {
//     id: 6,
//     opportunity: "EcoBuild",
//     contact: "Ruben Torff",
//     amount: "$12,839",
//     owner: "Beeto Leru",
//     source: "Phone",
//     expectedClosing: "12/2/2025",
//     actualClosing: "12/4/2025",
//     lastInteraction: "12/2/2025 9:23 AM",
//     stage: "Evaluation",
//   },
//   {
//     id: 7,
//     opportunity: "OmniTech",
//     contact: "Carter Rosser",
//     amount: "$12,839",
//     owner: "Beeto Leru",
//     source: "Email",
//     expectedClosing: "12/2/2025",
//     actualClosing: "12/4/2025",
//     lastInteraction: "12/2/2025 9:23 AM",
//     stage: "Evaluation",
//   },
//   {
//     id: 8,
//     opportunity: "Zenoth Co.",
//     contact: "Lynn Tanner",
//     amount: "$12,839",
//     owner: "Beeto Leru",
//     source: "Email",
//     expectedClosing: "12/2/2025",
//     actualClosing: "12/4/2025",
//     lastInteraction: "12/2/2025 9:23 AM",
//     stage: "Sales",
//   },
// ]

export default function CompaignTarget() {
  const { campaignId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)
  const { getCampaignLeadsQuery, getCampaignSequenceQuery, generateEmailWithAI, generateSequenceWithAI, updateCampaignSequenceMutation } = useCampaignQuery();

  const [selectStep, setSelectStep] = useState(null);
  const [steps, setSteps] = useState([]);
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");

  const { 
    data: leads, // Now directly the array of leads
    isLoading: isLeadsLoading, 
    error: leadsError 
  } = getCampaignLeadsQuery(campaignId);
  const {
    data: campaignSequence,
    isLoading: isSequenceLoading,
    isError: isSequenceError,
    error: sequenceError,
  } = getCampaignSequenceQuery(campaignId);


  // const people = [
  //   {
  //     email: "xmitchell@hotmail.com",
  //     contact: "Lynn Tanner",
  //     provider: "Microsoft",
  //     status: "Verified",
  //     company: "Tuxedo Suits Inc.",
  //     website: "https://tuxedosuits.com",
  //     title: "Design manager",
  //   },
  //   {
  //     email: "tbaker@outlook.com",
  //     contact: "Capt. Trunk",
  //     provider: "Google",
  //     status: "Verified",
  //     company: "Tuxedo Suits Inc.",
  //     website: "https://tuxedosuits.com",
  //     title: "Design manager",
  //   },
  //   {
  //     email: "mgonzalez@aol.com",
  //     contact: "Thomas Anum",
  //     provider: "Google",
  //     status: "Verified",
  //     company: "Tuxedo Suits Inc.",
  //     website: "https://tuxedosuits.com",
  //     title: "Design manager",
  //   },
  //   {
  //     email: "xmitchell@hotmail.com",
  //     contact: "Lynn Tanner",
  //     provider: "Microsoft",
  //     status: "Verified",
  //     company: "Tuxedo Suits Inc.",
  //     website: "https://tuxedosuits.com",
  //     title: "Design manager",
  //   },
  //   {
  //     email: "tbaker@outlook.com",
  //     contact: "Capt. Trunk",
  //     provider: "Google",
  //     status: "Verified",
  //     company: "Tuxedo Suits Inc.",
  //     website: "https://tuxedosuits.com",
  //     title: "Design manager",
  //   },
  //   {
  //     email: "mgonzalez@aol.com",
  //     contact: "Thomas Anum",
  //     provider: "Google",
  //     status: "Verified",
  //     company: "Tuxedo Suits Inc.",
  //     website: "https://tuxedosuits.com",
  //     title: "Design manager",
  //   },
  //   {
  //     email: "yrodriguez@aol.com",
  //     contact: "B.A. Baracus",
  //     provider: "Microsoft",
  //     status: "Verified",
  //     company: "Tuxedo Suits Inc.",
  //     website: "https://tuxedosuits.com",
  //     title: "Design manager",
  //   },
  //   {
  //     email: "vflores@gmail.com",
  //     contact: "Devon Miles",
  //     provider: "Google",
  //     status: "Verified",
  //     company: "Tuxedo Suits Inc.",
  //     website: "https://tuxedosuits.com",
  //     title: "Design manager",
  //   },
  //   {
  //     email: "yrodriguez@aol.com",
  //     contact: "B.A. Baracus",
  //     provider: "Microsoft",
  //     status: "Verified",
  //     company: "Tuxedo Suits Inc.",
  //     website: "https://tuxedosuits.com",
  //     title: "Design manager",
  //   },
  // ]

  // Fetch and populate steps when campaign sequence is available
  useEffect(() => {
    if (campaignSequence?.sequence?.Emails) {
      const emailSteps = campaignSequence.sequence.Emails.map((email, index, arr) => {
        const isFollowUp = email.Subject === "" && index > 0; // No subject and not first email
        return {
          id: index + 1,
          value: isFollowUp ? `Follow-up to "${arr[index - 1]?.Name || 'Previous Email'}"` : email.Name,
          subject: email.Subject,
          body: email.Body,
          delay: email.Delay
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

  const handleWriteFullSequenceWithAI = () => {
    const sequenceData = {
      Emails: steps.map(step => ({
        Name: step.value || "",
        Subject: step.subject || "",
        Body: step.body || "",
      })),
    };
  
    console.log("Generated Sequence Object to Send:", sequenceData);
  
    generateSequenceWithAI(
      { campaignId, sequenceData },
      {
        onSuccess: (response) => {
          console.log("AI Sequence generated successfully:", response);
  
          if (response?.content?.Emails?.length) {
            const updatedSteps = response.content.map((email, index, arr) => {
              const isFollowUp = !email.Subject && index > 0;
              return {
                id: index + 1,
                value: isFollowUp ? `Follow-up to "${arr[index - 1]?.Name || 'Previous Email'}"` : email.Name,
                subject: email.Subject,
                body: email.Body,
                delay: email.Delay
              };
            });
  
            setSteps(updatedSteps);
  
            if (updatedSteps.length > 0) {
              setSelectStep(updatedSteps[0].id);
              setSubject(updatedSteps[0].subject);
              setContent(updatedSteps[0].body);
            }
          }
        },
      }
    );
  };
  
  const handleSaveSequence = () => {
    const sequenceData = {
      Emails: steps.map(step => ({
        Name: step.value || "",
        Subject: step.subject || "",
        Body: step.body || "",
        Delay: step.delay || 0, 
      })),
    };

    console.log("Saving Sequence Object:", sequenceData);

    updateCampaignSequenceMutation(
      { campaignId, sequenceData },
      {
        onSuccess: (response) => {
          console.log("Campaign sequence updated!", response);
          toast.success("Sequence saved successfully!");
        },
      }
    );
  };


  const box = [
    { amount: '214', icon: <Zap size={24} className="text-blue-500" />, text: "Sequence started", bg: "bg-blue-100" },
    { amount: '45%', icon: <Eye size={24} className="text-purple-500" />, text: "Open rate", bg: "bg-purple-100" },
    { amount: '67%', icon: <Hand size={24} className="text-pink-500" />, text: "Click rate", bg: "bg-pink-100" },
    { amount: '145', icon: <CircleDollarSign size={24} className="text-red-500" />, text: "Opportunities", bg: "bg-red-100" },
    { amount: '26', icon: <CircleDollarSign size={24} className="text-yellow-500" />, text: "Conversion", bg: "bg-yellow-100" },
  ];

  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const handleAnother = () => {
    setIsSecondModalOpen(true);
    setIsModalOpen(false);
  }


  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("People")

  return (
    <div className="min-h-screen bg-gray-50 ps-20">
      <div className="container mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6 flex justify-between items-center">
          <nav className="flex -mb-px">
            {["Analytics", "People", "Sequence", "Shedule", "Options"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`mr-8 py-4 px-1 border-b-2 cursor-pointer font-medium text-sm ${
                  activeTab === tab
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
          <div className="flex gap-4">

            {activeTab !== "People" && activeTab !== "Options" && 
              <button onClick={handleWriteFullSequenceWithAI} className="bg-gradient-to-br from-green-400 to-orange-500 shrink-0 text-white text-[14px] font-semibold border border-gray-400 flex gap-1 items-center rounded-full px-3 cursor-pointer">
                <p>AI Sequence</p>
              </button>
            }


            <div className="border border-gray-300 flex gap-1 items-center rounded-full px-2.5 py-1.5">
              <Pause size={20} className="text-gray-400" />
              <p className="text-gray-400 text-[14px]">Pause campaign</p>
            </div>

            <div className="relative inline-block text-left">
              <button
                onClick={() => setIsOpen2(!isOpen2)}
                className="p-2 border cursor-pointer border-gray-300 text-gray-600 rounded-lg">
                <Ellipsis />
              </button>
              {isOpen2 && (
                <div className="absolute z-10 mt-2 right-0 bg-white shadow-md w-48 rounded-lg">
                  <ul className="py-1 text-sm text-gray-700">
                    <li className="px-3 py-2 flex text-gray-400 text-[13px] gap-2 items-center hover:bg-gray-100">
                    <ArrowDownToLine size={20} className="text-green-500" /> Download Analytics CSV
                    </li>
                    <li className="px-3 py-2 flex text-gray-400 text-[13px] gap-2 items-center hover:bg-gray-100">
                    <Share2 size={20} /> Share Compaign
                    </li>
                  </ul>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Search and Filters */}
        {activeTab == "People" && (
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <div className="relative inline-block text-left">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="px-4 py-2 cursor-pointer border  border-gray-300 text-gray-500 rounded-full flex gap-1 items-center">
                  <ListFilter size={20} /> Filter 
                </button>
                {isOpen && (
                  <div className="absolute z-10 mt-2 bg-white shadow-md w-44 rounded-lg">
                    <ul className="py-2 text-sm text-gray-700">
                    <li className="px-4 py-2 hover:bg-gray-100">Newest first</li>
                    <li className="px-4 py-2 hover:bg-gray-100">Oldest first</li>
                    <li className="px-4 py-2 hover:bg-gray-100">Name A-Z</li>
                    <li className="px-4 py-2  hover:bg-gray-100">Name Z-A</li>
                    </ul>
                  </div>
                )}
              </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center cursor-pointer px-4 py-2 border border-transparent text-sm font-normal rounded-full shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none"  >
                  <User className="mr-2 h-5 w-5" />
                  Add lead
                </button>
              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-[#3a3939a3] bg-opacity-50">
                  <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Add leads</h3>
                      <button onClick={() => setIsModalOpen(false)}>
                        <IoClose className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
                      </button>
                    </div>
                    <div className="mt-4 space-y-4">
                      <div className="shadow-lg p-2">
                        <div className="flex gap-4 cursor-pointer items-center px-10">
                          <div>
                          <FileMinus className="text-green-400" size={35} />
                          </div>
                          <p className="h-8 border border-gray-200"></p>
                          <div>
                            <p className="text-gray-400">Upload</p>
                            <p className="font-semibold">CSV</p>
                          </div>
                        </div>
                      </div>

                      <div className="shadow-lg p-2">
                        <div className="flex gap-4 items-center px-10">
                          <div>
                          <FileMinus className="text-green-400" size={35} />
                          </div>
                          <p className="h-8 border border-gray-200"></p>
                          <div>
                            <p className="text-gray-400">Use</p>
                            <p className="font-semibold">AI lead Finder</p>
                          </div>
                        </div>
                      </div>
                      <div className="shadow-lg p-2">
                        <div  onClick={handleAnother} className="flex gap-4 cursor-pointer items-center px-10">
                          <div>
                          <MailOpen size={30}  className="cursor-pointer" />
                          </div>
                          <p className="h-8 border border-gray-200"></p>
                          <div>
                            <p className="text-gray-400">Enter</p>
                            <p className="font-semibold">Email Manually</p>
                          </div>
                        </div>
                      </div>

                      <div className="shadow-lg p-2">
                        <div className="flex gap-4 cursor-pointer items-center px-10">
                          <div>
                            <FcGoogle size={27} />
                          </div>
                          <p className="h-8 border border-gray-200"></p>
                          <div>
                            <p className="text-gray-400">Use</p>
                            <p className="font-semibold">Google Sheets</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

                {/* Second M`odal (MailOpen Click) */}
                {isSecondModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-[#3a3939a3] bg-opacity-50">
                    <div className="rounded-lg bg-white p-6 shadow-lg">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold inline-flex gap-1"> <User className="text-gray-300" /> Add new lead</h3>
                        <button onClick={() => setIsSecondModalOpen(false)}>
                          <IoClose className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
                        </button>
                      </div>
                      <div className="mt-4">
                        lead owner
                        <div className="bg-gray-200 w-fit rounded-full px-2 flex gap-2 items-center my-2 border border-gray-300">
                          <img src="https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg" className="h-10 w-10 rounded-full object-cover " alt="" />
                          Beetao lenu
                        </div>
                        <p className="bg-gray-200 rounded p-1">Personal Information</p>
                        <form className="space-y-4" action="#">
                          <div className="flex gap-2 my-2">
                              <div className="w-72">
                                  <label for="email" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                                  <input type="email" name="email" id="email"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border-green-500 focus:bg-green-100 focus:outline-none "  placeholder="name@company.com" required />
                              </div>
                              <div className="w-72">
                                  <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lead Status</label>
                                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border-green-500 focus:bg-green-100 focus:outline-none "  required />
                              </div>
                          </div>
                          <div className="flex gap-2">
                              <div className="w-72">
                                  <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border-green-500 focus:bg-green-100 focus:outline-none "  placeholder="name@company.com" required />
                              </div>
                              <div className="w-72">
                                  <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border-green-500 focus:bg-green-100 focus:outline-none "  required />
                              </div>
                          </div>
                              <div className="w-72">
                                  <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border-green-500 focus:bg-green-100 focus:outline-none " required />
                              </div>
                              <p className="bg-gray-200 rounded p-1">Company Information</p>
                              <div className="flex gap-2">
                              <div className="w-72">
                                  <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Company</label>
                                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border-green-500 focus:bg-green-100 focus:outline-none " placeholder="name@company.com" required />
                              </div>
                              <div className="w-72">
                                  <label for="password" className="block mb-2  text-sm font-medium text-gray-900 dark:text-white">Website</label>
                                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border-green-500 focus:bg-green-100 focus:outline-none " required />
                              </div>
                          </div>
                          <button type="button" class="text-white bg-blue-700 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Submit</button>
                          </form>
                      </div>
                    </div>
                  </div>
                )}`

              <button className="bg-gradient-to-br border-none from-green-400 to-orange-500 shrink-0 text-white text-[14px] font-semibold border border-gray-400 flex gap-1 items-center rounded-full px-3 cursor-pointer">
              <PhoneIncoming size={15} /> <p>Call with AI</p>
              </button>

            </div>
          </div>
        )}

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full">
        {activeTab === "Analytics" && (
            <>
            {box.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg px-4 py-6 flex items-center gap-3 bg-white">
                <div className={`p-3 rounded-full ${item.bg}`}>{item.icon}</div>
                <div>
                    <div className="text-2xl font-bold">{item.amount}</div>
                    <div className="text-sm text-gray-500">{item.text}</div>
                </div>
                </div>
            ))}
            </>
        )}

          {activeTab === "People" && (
            <div className="col-span-full w-full overflow-x-hidden">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-none text-sm text-muted-foreground">
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium w-[40px]">
                      <input type="checkbox" className="rounded border-muted cursor-pointer" />
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-[13px] text-gray-400 w-[220px]">EMAIL</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-[13px] text-gray-400 w-[150px]">
                      CONTACT
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-[13px] text-gray-400 w-[140px]">
                      EMAIL PROVIDER
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-[13px] text-gray-400 w-[260px]">
                      STATUS
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-[13px] text-gray-400 w-[200px]">
                      COMPANY
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-[13px] text-gray-400 w-[200px]">
                      WEBSITE
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-[13px] text-gray-400 w-[140px]">TITLE</th>
                  </tr>
                </thead>
                <tbody>
                  {leads?.map((person, idx) => (
                    <tr key={idx} className="border border-gray-300 text-sm">
                      <td className="px-4 py-3">
                        <input type="checkbox" className="rounded border-muted cursor-pointer" />
                      </td>
                      <td className="px-4 py-3 text-gray-600">{person.Email}</td>
                      <td className="px-4 py-3">{person.Name}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          {person.provider === "Microsoft" ? (
                            <>
                              <div className="h-5 w-5 mr-2 flex items-center justify-center">
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                                  <path d="M10 1H1V10H10V1Z" fill="#F25022" />
                                  <path d="M20 1H11V10H20V1Z" fill="#7FBA00" />
                                  <path d="M10 11H1V20H10V11Z" fill="#00A4EF" />
                                  <path d="M20 11H11V20H20V11Z" fill="#FFB900" />
                                </svg>
                              </div>
                              Microsoft
                            </>
                          ) : (
                            <>
                              <div className="h-5 w-5 mr-2 flex items-center justify-center">
                                <svg viewBox="0 0 24 24" width="18" height="18">
                                  <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                  />
                                  <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                  />
                                  <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                  />
                                  <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                  />
                                </svg>
                              </div>
                              Google
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 bg-blue-100 rounded-full px-2 py-0.5 text-sm">
                            <CircleCheckBig size={13} className="text-blue-500" />
                            <span className="text-blue-500 ">Verified</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <Clock className="h-4 w-4" />
                            <span>Not yet contacted</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{person.Company}</td>
                      <td className="px-4 py-3 text-blue-500">{person.Website}</td>
                      <td className="px-4 py-3">{person.Title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "Sequence" && (
            <div className="col-span-full w-full overflow-x-auto">
              {/* <EmailTemplateBuilder campaignId={campaignId}/> */}
              <div className="flex min-h-screen bg-white">
                {/* Sidebar */}
                <div className="w-80 p-4 flex flex-col gap-4">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      onClick={() => handleSelectSeqStep(step.id)}
                      className={`p-4 border rounded-lg cursor-pointer 
                        ${selectStep === step.id ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'}`}
                    >
                      <div className="flex justify-between items-center my-2">
                        <p className="font-semibold">{step.value}</p>
                        <button
                          onClick={() => deleteSeqStep(step.id)}
                          className="text-red-500 ml-2 cursor-pointer"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <hr className="my-2 text-gray-300" />
                      <input
                        type="text"
                        value={step.subject}
                        onChange={(e) => handleEmailSubjectChange(step.id, e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder={`Step ${step.id}`}
                      />
                    </div>
                  ))}

                  <button
                    onClick={addSeqStep}
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
                          onClick={handleWriteEmailWithAI}
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
                      <button onClick={handleSaveSequence} className="bg-teal-600 hover:bg-teal-600 text-white px-6 py-1.5 rounded-full text-[15px]">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
          {activeTab === "Shedule" && (
            <div className="col-span-full w-full overflow-x-auto">
              <main className="min-h-screen bg-gray-50 py-8">
                  <ScheduleForm />
              </main>
            </div>
          )}
          {activeTab === "Options" && (
            <div className="col-span-full w-full overflow-x-auto">
              <div className="border border-gray-200 rounded-lg p-4 w-[900px] mx-auto bg-white my-2">
                <div className="flex justify-between items-center mb-4 my-2">
                  <div>
                    <h3 className="font-semibold">Owner of Campaign</h3>
                    <p className="text-gray-400 text-[14px] mt-2">Select the owner of thid compaign</p>
                  </div>
                  <div className="border border-gray-50">Select</div>
                </div>
                <div className="flex justify-between items-center mb-4 my-2">
                  <div>
                    <h3 className="font-semibold">Daily Lmit</h3>
                    <p className="text-gray-400 text-[14px]">Max number of emails to send per day for this compaign</p>
                  </div>
                  <div className="border border-gray-200 ps-2 pe-10 py-1 rounded w-36">50</div>
                </div>
                <div className="flex justify-between items-center mb-4 my-2">
                  <div>
                    <h3 className="font-semibold">Max new leads per day</h3>
                  </div>
                  <div className="border border-gray-200 ps-2 pe-10 py-1 rounded w-36">No limit</div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 w-[900px] mx-auto bg-white my-2">
                <div className="flex justify-between items-center mb-4 my-2">
                  <div>
                    <h3 className="font-semibold">Stop campaign for company on reply</h3>
                    <p className="text-gray-400 text-[14px] mt-2">Stop the compaign automaticlly for all leads from a company if a reply is received from any of them.</p>
                  </div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer"/>
                    <div class="relative w-11 h-6 bg-gray-200  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 "></div>
                  </label>
                </div>
                <div className="flex justify-between items-center mb-4 my-2">
                  <div>
                    <h3 className="font-semibold">Stop sending emails on Auto-reply</h3>
                    <p className="text-gray-400 text-[14px]">Stop sending emails to a lead if a response has been received</p>
                  </div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer"/>
                    <div class="relative w-11 h-6 bg-gray-200  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 "></div>
                  </label>
                </div>
                <div className="flex justify-between items-center mb-4 my-2">
                  <div>
                    <h3 className="font-semibold">Open tracking</h3>
                    <p className="text-gray-400 text-[14px]">Track email opens</p>
                  </div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer"/>
                    <div class="relative w-11 h-6 bg-gray-200  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 "></div>
                  </label>
                </div>
                <div className="flex justify-between items-center mb-4 my-2">
                  <div>
                    <h3 className="font-semibold">Insert insubscribe to link header</h3>
                    <p className="text-gray-400 text-[14px]">Automatically adds an unsubscribe link to email headers for on-click unsubscription by supported email providers</p>
                  </div>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer"/>
                    <div class="relative w-11 h-6 bg-gray-200  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 "></div>
                  </label>
                </div>
              </div>



              <div className="border border-gray-200 rounded-lg p-4 w-[900px] mx-auto bg-white my-2">
                <div className="flex justify-between items-center mb-4 my-2">
                  <div>
                    <h3 className="font-semibold">CC</h3>
                    <p className="text-gray-400 text-[14px] mt-2">Send a copy of the email to the addresses listed in the field</p>
                  </div>
                  <input type="text"className="w-80 px-10 border border-gray-500 rounded" />
                </div>
                <div className="flex justify-between items-center mb-4 my-2">
                  <div>
                    <h3 className="font-semibold">BCC</h3>
                    <p className="text-gray-400 text-[14px] w-48">Send a copy of the email to certain receipients without the other receipients knowing about it</p>
                  </div>
                  <input type="text"className="w-80 px-10 border border-gray-500 rounded" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

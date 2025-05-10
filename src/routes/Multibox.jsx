import { AlarmClockMinus, ArchiveRestore, ChevronDown, CornerDownLeft, FileMinus, List, Sparkles, Trash2, User, X } from "lucide-react";
import React, { useState } from "react";
import { FaSearch, FaPlus, FaEllipsisH } from "react-icons/fa";

const emails = [
  { id: 1, name: "Casper Nelly", initials: "CN", bgColor: "bg-yellow-500", subject: "Re: Request for Overview of Your Solutions", time: "7 hrs ago", unread: true },
  { id: 2, name: "Phillip Passaquindici", initials: "PP", bgColor: "bg-red-500", subject: "Re: Request for Overview of Your Solutions", time: "7 hrs ago", unread: false },
  { id: 3, name: "Anika Rosser", initials: "AR", bgColor: "bg-green-500", subject: "Re: Request for Overview of Your Solutions", time: "7 hrs ago", unread: false },
];

const Inbox = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedTab, setSelectedTab] = useState("All Inboxes");
  const [text, setText] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);


  return (
    <div className="flex min-h-screen bg-gray-200 text-gray-400 px-[5px] md:pl-[120px] pt-[40px] md:pr-[120px] flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-[40%] p-6 border-r border-gray-300 bg-white rounded-2xl md:mr-6">
      <div className="mb-4 flex space-x-4">
          {['All Inboxes', 'Emails', 'SMS'].map((tab) => (
            <span
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`cursor-pointer ${selectedTab === tab ? "text-green-500 border-b-2 border-green-500" : "text-gray-500"}`}
            >
              {tab}
            </span>
          ))}
        </div>
        <div className="mb-4 text-2xl text-gray-400">Primary</div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search emails..."
            className="w-full p-2 border border-gray-300 rounded-full pl-10"
          />
        </div>
        <div>
          {emails.map((email) => (
            <div
              key={email.id}
              onClick={() => setSelectedEmail(email)}
              className={`p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer rounded-lg transition-colors ${selectedEmail?.id === email.id ? "bg-[#15A395] text-white" : "hover:bg-[#f5fffb]"} ${email.unread ? "font-bold" : "font-normal"}`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${email.bgColor}`}> 
                  {email.initials} 
                </div>
                <div>
                  <p>{email.name}</p>
                  <p className="text-sm">{email.subject}</p>
                </div>
              </div>
              <span className="text-sm">{email.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="flex-1 mt-6 md:mt-0">
        {/* Buttons Container */}
        <div className="flex justify-between items-center mb-4 overflow-auto">
          <div className="bg-white p-1 rounded-xl flex space-x-2">
            <button className="p-2 flex items-center gap-1">Archive <ArchiveRestore size={16} /></button>
            <button className="p-2 flex items-center gap-1">Snooze <AlarmClockMinus size={18} /></button>
            <button className="p-2 flex items-center gap-1">Delete <Trash2 size={16} /></button>
          </div>
          <div className="bg-white p-1 rounded-xl flex space-x-2">
            <button className="p-2 bg-white rounded-xl flex items-center gap-1">About Lead <User size={20} /></button>
          </div>
          
        </div>
        {/* Email Content */}
        <div className="flex-1 flex flex-col bg-white rounded-2xl p-3 mb-[10px]">
          {selectedEmail && <h2 className="text-xl-center font-bold rounded">{selectedEmail.subject}</h2>}
        </div>
        <div className="flex-1 flex flex-col bg-white rounded-2xl p-6">
          {selectedEmail ? (
            <div className="w-full">
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${selectedEmail.bgColor}`}>{selectedEmail.initials}</div>
                <div className="ml-3">
                  <p className="font-bold">{selectedEmail.name}</p>
                  <p className="text-sm text-gray-500">To: support@quickpipe.com</p>
                </div>
                <span className="ml-auto text-sm text-gray-500">{selectedEmail.time}</span>
              </div>
              <div className="rounded-xl">
                <p className="text-gray-700">Hi Support Team,</p>
                <p className="text-gray-700 mt-2">My name is Alex Carter, and I work as a Sales Representative at Greenfield Solutions. We’re currently exploring tools to help us scale our team operations effectively, particularly in areas like client follow-ups, reporting, and team collaboration.</p>
                <p className="text-gray-700 mt-2">Would it be possible to set up a meeting to discuss this further? I’m generally available on weekdays after 1 PM and can adjust if needed. Looking forward to your insights!</p>
                <p className="text-gray-700 mt-4">Best regards,</p>
                <p className="text-gray-700">Alex Carter</p>
              </div>
              <div className="flex justify-end mt-4">
                <button onClick={() => setShowReplyBox(true)} className="px-3 py-2 flex items-center gap-1 cursor-pointer bg-[#15A395] text-white rounded-xl"> <CornerDownLeft className="w-4 h-4" />
                Reply</button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div role="status" class="animate-pulse">
                  <div class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm">
                  <FileMinus size={40} />
                  </div>
                  <div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                  <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                  <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                  <div class="h-2 bg-gray-200 rounded-full"></div>
                  <div class="flex items-center mt-4">
                    <svg class="w-10 h-10 me-3 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                      </svg>
                      <div>
                          <div class="h-2.5 bg-gray-200 rounded-full w-32 mb-2"></div>
                          <div class="w-48 h-2 bg-gray-200 rounded-full"></div>
                      </div>
                  </div>
              </div>
            </div>
          )}
        </div>
        {showReplyBox && <div className="max-w-3xl bg-white mx-auto mt-3 rounded-lg">
            <div className="shadow-sm p-4 relative">
              <button  onClick={() => setShowReplyBox(false)} className="absolute cursor-pointer right-4 top-4 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>

            <div className="mb-4 mt-2">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full min-h-[100px] outline-none resize-none"
                placeholder="Write your reply..."
              />
              </div>

            <div className="flex justify-end mb-3">
              <button className="text-teal-500 font-medium flex items-center gap-1 text-sm">
                Reply with AI <Sparkles className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            <div className="flex items-center gap-1 border-t border-b py-2 flex-wrap">
              <button className="p-1.5 rounded  hover:bg-gray-100 flex items-center">
                <List className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="flex justify-end mt-4">
              <button onClick={() => setShowReplyBox(false)} className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-full flex items-center cursor-pointer gap-2">
                <CornerDownLeft className="w-4 h-4" />
                Reply
              </button>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default Inbox;
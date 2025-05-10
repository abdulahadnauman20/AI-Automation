import { useState } from "react"
import { Check, CircleX, File } from "lucide-react"
import { Link } from "react-router-dom";

export default function EmailDomain() {
  const [activeTab, setActiveTab] = useState("new");
  const [isModal, setIsModal] = useState(false);
  const [domainExtensions, setDomainExtensions] = useState({
    com: true,
    co: false,
    org: true,
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

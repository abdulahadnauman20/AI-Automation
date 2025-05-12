import { Search } from "lucide-react"
import { FaBriefcase, FaMapMarkerAlt, FaIndustry, FaUsers, FaDollarSign, FaGlobe, FaCogs, FaMoneyCheckAlt, FaUser, FaBuilding } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // useNavigate added
import { useAILeadScoutQuery } from "../reactQuery/hooks/useAILeadScoutQuery";

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



export default function AILeadSearch() {
  const [selectAll, setSelectAll] = useState(false);
  const [skipOwned, setSkipOwned] = useState(true);
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Added state for search input

  const location = useLocation();
  const navigate = useNavigate(); // useNavigate hook for changing the URL

  // Extract the initial search query from the URL
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get("searchQuery") || "";

  
  useEffect(() => {
    setSearchTerm(initialSearchQuery);
  }, [initialSearchQuery]);

  const page = 1;

  // Fetch leads with the current search query
  const { allLeads, isLeadsLoading, leadsError, refetch } = useAILeadScoutQuery({
    query: searchTerm,
    page: page,
  });

  useEffect(() => {
    console.log("Data: ", allLeads);
  }, [allLeads]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`?searchQuery=${searchTerm}`, { replace: true });
    refetch();
  };

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

  const filteredLeads = allLeads?.results;

  useEffect(() => {
    console.log("Filtered:", filteredLeads);
  }, [filteredLeads])

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
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  value={searchTerm} // Controlled input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="E.g Engineers in New York in software ..."
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
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
      </div>
    </div>
  );
}


function LeadRow({ checked, onChange, name, avatar, avatarColor, company, title, email, phone, lastInteraction, owned }) {
  return (
    <tr className={`border-b hover:bg-gray-50 ${owned ? 'bg-gray-50' : ''}`}>
      <td className="p-4">
        <CustomCheckbox 
          checked={checked} 
          onChange={onChange}
          disabled={owned}
        />
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full ${avatarColor} flex items-center justify-center`}>{avatar}</div>
          <span className={`text-sm ${owned ? 'text-gray-400' : ''}`}>{name}</span>
          {owned && <span className="text-xs text-gray-400">(owned)</span>}
        </div>
      </td>
      <td className="p-4">
        <span className={`text-sm ${owned ? 'text-gray-400' : ''}`}>{company}</span>
      </td>
      <td className="p-4">
        <span className={`text-sm ${owned ? 'text-gray-400' : ''}`}>{title}</span>
      </td>
      <td className="p-4">
        <span className={`text-sm ${owned ? 'text-gray-400' : 'text-blue-500'}`}>{email}</span>
      </td>
      <td className="p-4">
        <span className={`text-sm ${owned ? 'text-gray-400' : ''}`}>{phone}</span>
      </td>
      <td className="p-4">
        <span className={`text-sm ${owned ? 'text-gray-400' : ''}`}>{lastInteraction}</span>
      </td>
    </tr>
  )
}
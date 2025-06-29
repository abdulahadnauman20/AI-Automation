import { Search, EyeOff } from "lucide-react"
import { FaBriefcase, FaMapMarkerAlt, FaIndustry, FaUsers, FaDollarSign, FaGlobe, FaCogs, FaMoneyCheckAlt, FaUser, FaBuilding } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAILeadScoutQuery } from "../reactQuery/hooks/useAILeadScoutQuery";
import { toast } from "react-hot-toast";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [leads, setLeads] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showJobTitles, setShowJobTitles] = useState(false);
  const [showIndustry, setShowIndustry] = useState(false);
  const [selectedJobTitles, setSelectedJobTitles] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const debounceTimeout = useRef();

  // Extract the initial search query from the URL
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get("searchQuery") || "";
  
  useEffect(() => {
    setSearchTerm(initialSearchQuery);
  }, [initialSearchQuery]);

  // Debounce searchTerm
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page on new search
      navigate(`?searchQuery=${searchTerm}`, { replace: true });
    }, 500);
    return () => clearTimeout(debounceTimeout.current);
  }, [searchTerm, navigate]);

  // Always send a non-empty query
  const safeSearchTerm = debouncedSearchTerm && debouncedSearchTerm.trim() ? debouncedSearchTerm : 'all';

  // Fetch leads with the debounced search query, selected job titles, and selected industries
  const { data, isLoading, error, refetch } = useAILeadScoutQuery(
    safeSearchTerm,
    currentPage,
    perPage,
    selectedJobTitles.length > 0 ? selectedJobTitles : undefined,
    selectedIndustries.length > 0 ? selectedIndustries : undefined
  );

  useEffect(() => {
    if (data?.results) {
      console.log('Setting leads from data:', data.results);
      setLeads(data.results.map(lead => ({
        ...lead,
        checked: false
      })));
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error('Error fetching leads:', error);
      toast.error(error.message || "Failed to fetch leads");
    }
  }, [error]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // No need to manually refetch, as debouncedSearchTerm will trigger it
  };

  const handlePerPageChange = (e) => {
    const newPerPage = parseInt(e.target.value);
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing per page
    refetch();
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || (data?.pagination?.totalPages && newPage > data.pagination.totalPages)) return;
    console.log('Changing to page:', newPage);
    setCurrentPage(newPage);
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setLeads(leads.map((lead) => ({
      ...lead,
      checked: newSelectAll && (!skipOwned || !lead.owned),
    })));
  };

  const toggleLeadSelection = (id) => {
    setLeads(leads.map((lead) =>
      lead.id === id ? { ...lead, checked: !lead.checked } : lead
    ));
    setSelectAll(false);
  };

  const toggleSkipOwned = () => {
    const newSkipOwned = !skipOwned;
    setSkipOwned(newSkipOwned);
    if (selectAll) {
      setLeads(leads.map((lead) => ({
        ...lead,
        checked: !newSkipOwned || !lead.owned,
      })));
    }
  };

  const handleAddToCampaign = () => {
    const selectedLeads = leads.filter((lead) => lead.checked);
    if (selectedLeads.length === 0) {
      toast.error("Please select at least one lead");
      return;
    }
    setShowCampaignForm(true);
  };

  const handleCampaignSubmit = (e) => {
    e.preventDefault();
    if (!campaignName.trim()) {
      toast.error("Please enter a campaign name");
      return;
    }
    
    console.log("Creating campaign:", campaignName);
    console.log("With leads:", leads.filter((lead) => lead.checked));

    setCampaignName("");
    setShowCampaignForm(false);
    setLeads(leads.map((lead) => ({ ...lead, checked: false })));
    setSelectAll(false);

    toast.success(`Campaign "${campaignName}" created successfully!`);
  };

  // Handler for job title checkbox
  const handleJobTitleChange = (title) => {
    setSelectedJobTitles((prev) => {
      const updated = prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title];
      setCurrentPage(1); // Reset to first page on filter change
      return updated;
    });
  };

  // Handler for industry checkbox
  const handleIndustryChange = (industry) => {
    setSelectedIndustries((prev) => {
      const updated = prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry];
      setCurrentPage(1); // Reset to first page on filter change
      return updated;
    });
  };

  return (
    <div className="flex min-h-screen w-full h-full flex-col md:flex-row gap-5 md:gap-0 pl-[10px] md:pl-[25px]">
      {/* Sidebar */}
      <div className="w-full h-full md:w-[400px] bg-white border border-gray-200 rounded-2xl flex flex-col">
        <div className="p-4 border-b border-gray-200 w-full">
          <h2 className="text-l md:text-xl font-bold mb-[40px]">Search Manually</h2>
          <div className="flex items-center justify-between">
            <FaMapMarkerAlt />
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
        <nav className="p-2 space-y-4">
          {/* Job Titles Dropdown */}
          <div className="w-full p-2 rounded text-md md:text-lg text-gray-400 hover:bg-gray-100 cursor-pointer flex flex-col">
            <div className="flex items-center space-x-2 justify-between" onClick={() => setShowJobTitles((prev) => !prev)}>
              <span className="flex items-center space-x-2">
                <FaBriefcase />
                <span className="pl-[15px]">Job titles</span>
              </span>
              <span>{showJobTitles ? '▲' : '▼'}</span>
            </div>
            {showJobTitles && (
              <div className="pl-8 pt-2 flex flex-col gap-2">
                {["CEO", "PTO", "Manager", "Developer"].map((title, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={selectedJobTitles.includes(title)}
                      onChange={() => handleJobTitleChange(title)}
                    />
                    <span>{title}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          {/* Location (not a dropdown) */}
          <div className="w-full p-2 rounded text-md md:text-lg text-gray-400 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
            <FaMapMarkerAlt />
            <span className="pl-[15px]">Location</span>
          </div>
          {/* Industry & Keywords Dropdown */}
          <div className="w-full p-2 rounded text-md md:text-lg text-gray-400 hover:bg-gray-100 cursor-pointer flex flex-col">
            <div className="flex items-center space-x-2 justify-between" onClick={() => setShowIndustry((prev) => !prev)}>
              <span className="flex items-center space-x-2">
                <FaIndustry />
                <span className="pl-[15px]">Industry & Keywords</span>
              </span>
              <span>{showIndustry ? '▲' : '▼'}</span>
            </div>
            {showIndustry && (
              <div className="pl-8 pt-2 flex flex-col gap-2">
                {[ "Finance", "Healthcare", "Retail"].map((industry, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={selectedIndustries.includes(industry)}
                      onChange={() => handleIndustryChange(industry)}
                    />
                    <span>{industry}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          {/* The rest of the filters */}
          {[{ icon: FaUsers, label: "Employees" },
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
      <div className="flex-1 p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Search Results</h2>
          
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="mb-6">
            <div className="flex items-center gap-2">
                <input
                  type="text"
                value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for leads..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Search"}
              </button>
            </div>
              </form>

          {/* Results */}
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Searching for leads...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              {error.message || "Failed to fetch leads"}
            </div>
          ) : leads.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No leads found. Try a different search query.
            </div>
          ) : (
            <div className="space-y-4">
              {/* Results Header with Per Page Selector */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 text-blue-500"
                  />
                  <span>Select All</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Show:</span>
                  <select
                    value={perPage}
                    onChange={handlePerPageChange}
                    className="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  <span className="text-gray-600">contacts per page</span>
          </div>
        </div>

              {/* Leads List */}
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={lead.checked}
                      onChange={() => toggleLeadSelection(lead.id)}
                      className="h-4 w-4 text-blue-500 mt-2"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{lead.name}</h3>
                          <p className="text-gray-600 font-medium">{lead.title}</p>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <FaMapMarkerAlt className="text-gray-400" />
                          <span>
                            {lead.location && lead.location.trim() !== '' 
                              ? lead.location 
                              : lead.organization?.location || 'N/A'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaBuilding className="text-gray-400" />
                          <span>{lead.company || 'Company not specified'}</span>
                        </div>
                        
                        {lead.organization && (
                          <div className="mt-2 text-sm text-gray-500 space-y-1">
                            {lead.organization.employee_count && (
                              <div className="flex items-center gap-2">
                                <FaUsers className="text-gray-400" />
                                <span>Company Size: {lead.organization.employee_count}</span>
                              </div>
                            )}
                            {lead.organization.website && (
                              <div className="flex items-center gap-2">
                                <FaGlobe className="text-gray-400" />
                                <a 
                                  href={lead.organization.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:text-blue-600"
                                >
                                  {lead.organization.website}
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-3">
                        {lead.email && (
                          <a
                            href={`mailto:${lead.email}`}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <span>✉</span> Email
                          </a>
                        )}
                        {lead.phone && (
                          <a
                            href={`tel:${lead.phone}`}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors"
                          >
                            <span>📞</span> Call
                          </a>
                        )}
                        {lead.linkedin_url && (
                          <a
                            href={lead.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                          >
                            <span>🔗</span> LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              {data?.pagination && (
                <div className="flex justify-end items-center mt-6">
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <span className="text-gray-600">Page {currentPage} of {data?.pagination?.totalPages ?? 1}</span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === (data?.pagination?.totalPages ?? 1)}
                      className="px-3 cursor-pointer py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Campaign Button */}
              <button
                onClick={handleAddToCampaign}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Add Selected to Campaign
              </button>
          </div>
          )}
        </div>
      </div>

      {/* Campaign Modal */}
      {showCampaignForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Create New Campaign</h3>
            <form onSubmit={handleCampaignSubmit}>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Campaign Name"
                className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCampaignForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
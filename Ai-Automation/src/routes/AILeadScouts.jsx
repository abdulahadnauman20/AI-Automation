import React, { useState, useEffect } from "react";
import { 
  FaSearch, FaBriefcase, FaMapMarkerAlt, FaIndustry, FaUsers, FaDollarSign, 
  FaGlobe, FaCogs, FaMoneyCheckAlt, FaUser, FaBuilding, FaHandSparkles 
} from "react-icons/fa";
import backgroundImage from "../assets/AILead_Scouts.jpeg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function LeadSearch() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showJobTitles, setShowJobTitles] = useState(false);
  const [showIndustry, setShowIndustry] = useState(false);
  const [selectedJobTitles, setSelectedJobTitles] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [skipOwned, setSkipOwned] = useState(true);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedRevenues, setSelectedRevenues] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [showLocation, setShowLocation] = useState(false);
  const [showEmployees, setShowEmployees] = useState(false);
  const [showRevenue, setShowRevenue] = useState(false);
  const [showNames, setShowNames] = useState(false);
  const [showCompanies, setShowCompanies] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");

  // Handler for job title checkbox
  const handleJobTitleChange = (title) => {
    setSelectedJobTitles((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  // Handler for industry checkbox
  const handleIndustryChange = (industry) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  const handleLocationChange = (loc) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  const handleLocationInputChange = (e) => {
    setLocationInput(e.target.value);
  };

  const handleLocationInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Build query params and navigate directly
      const params = new URLSearchParams();
      params.set("searchQuery", searchQuery || "all");
      if (selectedJobTitles.length > 0) params.set("jobTitles", selectedJobTitles.join(","));
      if (selectedIndustries.length > 0) params.set("industries", selectedIndustries.join(","));
      params.set("skipOwned", skipOwned ? "1" : "0");
      if (selectedLocations.length > 0) params.set("locations", selectedLocations.join(","));
      if (locationInput.trim() !== "") params.set("locationInput", locationInput.trim());
      if (selectedEmployees.length > 0) params.set("employees", selectedEmployees.join(","));
      if (selectedRevenues.length > 0) params.set("revenues", selectedRevenues.join(","));
      if (selectedNames.length > 0) params.set("names", selectedNames.join(","));
      if (selectedCompanies.length > 0) params.set("companies", selectedCompanies.join(","));
      
      const url = `/ai-lead-search?${params.toString()}`;
      navigate(url);
    }
  };

  const handleNameInputChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleNameInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Build query params and navigate directly
      const params = new URLSearchParams();
      params.set("searchQuery", searchQuery || "all");
      if (selectedJobTitles.length > 0) params.set("jobTitles", selectedJobTitles.join(","));
      if (selectedIndustries.length > 0) params.set("industries", selectedIndustries.join(","));
      params.set("skipOwned", skipOwned ? "1" : "0");
      if (selectedLocations.length > 0) params.set("locations", selectedLocations.join(","));
      if (locationInput.trim() !== "") params.set("locationInput", locationInput.trim());
      if (selectedEmployees.length > 0) params.set("employees", selectedEmployees.join(","));
      if (selectedRevenues.length > 0) params.set("revenues", selectedRevenues.join(","));
      if (nameInput.trim() !== "") params.set("nameInput", nameInput.trim());
      if (selectedCompanies.length > 0) params.set("companies", selectedCompanies.join(","));
      
      const url = `/ai-lead-search?${params.toString()}`;
      navigate(url);
    }
  };

  const handleCompanyInputChange = (e) => {
    setCompanyInput(e.target.value);
  };

  const handleCompanyInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Build query params and navigate directly
      const params = new URLSearchParams();
      params.set("searchQuery", searchQuery || "all");
      if (selectedJobTitles.length > 0) params.set("jobTitles", selectedJobTitles.join(","));
      if (selectedIndustries.length > 0) params.set("industries", selectedIndustries.join(","));
      params.set("skipOwned", skipOwned ? "1" : "0");
      if (selectedLocations.length > 0) params.set("locations", selectedLocations.join(","));
      if (locationInput.trim() !== "") params.set("locationInput", locationInput.trim());
      if (selectedEmployees.length > 0) params.set("employees", selectedEmployees.join(","));
      if (selectedRevenues.length > 0) params.set("revenues", selectedRevenues.join(","));
      if (selectedNames.length > 0) params.set("names", selectedNames.join(","));
      if (companyInput.trim() !== "") params.set("companyInput", companyInput.trim());
      
      const url = `/ai-lead-search?${params.toString()}`;
      navigate(url);
    }
  };

  const handleEmployeesChange = (emp) => {
    setSelectedEmployees((prev) =>
      prev.includes(emp) ? prev.filter((e) => e !== emp) : [...prev, emp]
    );
  };

  const handleRevenueChange = (rev) => {
    setSelectedRevenues((prev) =>
      prev.includes(rev) ? prev.filter((r) => r !== rev) : [...prev, rev]
    );
  };

  const handleNamesChange = (name) => {
    setSelectedNames((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleCompaniesChange = (company) => {
    setSelectedCompanies((prev) =>
      prev.includes(company) ? prev.filter((c) => c !== company) : [...prev, company]
    );
  };

  // Immediate redirect on filter change
  useEffect(() => {
    if (
      selectedJobTitles.length > 0 ||
      selectedIndustries.length > 0 ||
      skipOwned === false ||
      selectedLocations.length > 0 ||
      selectedEmployees.length > 0 ||
      selectedRevenues.length > 0 ||
      selectedNames.length > 0 ||
      selectedCompanies.length > 0 ||
      locationInput.trim() !== "" ||
      nameInput.trim() !== "" ||
      companyInput.trim() !== ""
    ) {
      const params = new URLSearchParams();
      params.set("searchQuery", searchQuery || "");
      if (selectedJobTitles.length > 0) params.set("jobTitles", selectedJobTitles.join(","));
      if (selectedIndustries.length > 0) params.set("industries", selectedIndustries.join(","));
      params.set("skipOwned", skipOwned ? "1" : "0");
      if (selectedLocations.length > 0) params.set("locations", selectedLocations.join(","));
      if (locationInput.trim() !== "") params.set("locationInput", locationInput.trim());
      if (selectedEmployees.length > 0) params.set("employees", selectedEmployees.join(","));
      if (selectedRevenues.length > 0) params.set("revenues", selectedRevenues.join(","));
      if (selectedNames.length > 0) params.set("names", selectedNames.join(","));
      if (selectedCompanies.length > 0) params.set("companies", selectedCompanies.join(","));
      if (nameInput.trim() !== "") params.set("nameInput", nameInput.trim());
      if (companyInput.trim() !== "") params.set("companyInput", companyInput.trim());
      navigate(`/ai-lead-search?${params.toString()}`);
    }
    // eslint-disable-next-line
  }, [selectedJobTitles, selectedIndustries, skipOwned, selectedLocations, selectedEmployees, selectedRevenues, selectedNames, selectedCompanies, locationInput, nameInput, companyInput]);

  const handleSearch = (query = searchQuery) => {
    if (!query.trim()) {
      toast.error("Please enter a search query");
      return;
    }
    setIsLoading(true);
    // Build query params
    const params = new URLSearchParams();
    params.set("searchQuery", query);
    if (selectedJobTitles.length > 0) params.set("jobTitles", selectedJobTitles.join(","));
    if (selectedIndustries.length > 0) params.set("industries", selectedIndustries.join(","));
    params.set("skipOwned", skipOwned ? "1" : "0");
    if (selectedLocations.length > 0) params.set("locations", selectedLocations.join(","));
    if (locationInput.trim() !== "") params.set("locationInput", locationInput.trim());
    if (selectedEmployees.length > 0) params.set("employees", selectedEmployees.join(","));
    if (selectedRevenues.length > 0) params.set("revenues", selectedRevenues.join(","));
    if (selectedNames.length > 0) params.set("names", selectedNames.join(","));
    if (selectedCompanies.length > 0) params.set("companies", selectedCompanies.join(","));
    if (nameInput.trim() !== "") params.set("nameInput", nameInput.trim());
    if (companyInput.trim() !== "") params.set("companyInput", companyInput.trim());
    navigate(`/ai-lead-search?${params.toString()}`);
      setIsLoading(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <div className="flex min-h-screen w-full h-full flex-col md:flex-row gap-5 md:gap-0 pl-[10px] md:pl-[25px]">
      {/* Sidebar - same as AILeadSearch */}
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
                onChange={() => setSkipOwned((v) => !v)}
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
          {/* Location Input */}
          <div className="w-full p-2 rounded text-md md:text-lg text-gray-400 hover:bg-gray-100 cursor-pointer flex flex-col">
            <div className="flex items-center space-x-2 justify-between" onClick={() => setShowLocation((prev) => !prev)}>
              <span className="flex items-center space-x-2">
                <FaMapMarkerAlt />
                <span className="pl-[15px]">Location</span>
              </span>
              <span>{showLocation ? '▲' : '▼'}</span>
            </div>
            {showLocation && (
              <div className="pl-8 pt-2 flex flex-col gap-2">
                <div onClick={(e) => e.stopPropagation()}>
                  <input
                    type="text"
                    placeholder="Enter location (e.g., New York, London, Remote)"
                    value={locationInput}
                    onChange={handleLocationInputChange}
                    onKeyDown={handleLocationInputKeyDown}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full"
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Start typing to search for leads in this location
                </div>
              </div>
            )}
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
          {/* Employees Dropdown */}
          <div className="w-full p-2 rounded text-md md:text-lg text-gray-400 hover:bg-gray-100 cursor-pointer flex flex-col">
            <div className="flex items-center space-x-2 justify-between" onClick={() => setShowEmployees((prev) => !prev)}>
              <span className="flex items-center space-x-2">
                <FaUsers />
                <span className="pl-[15px]">Employees</span>
              </span>
              <span>{showEmployees ? '▲' : '▼'}</span>
            </div>
            {showEmployees && (
              <div className="pl-8 pt-2 flex flex-col gap-2">
                {["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"].map((emp, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={selectedEmployees.includes(emp)}
                      onChange={() => handleEmployeesChange(emp)}
                    />
                    <span>{emp}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          {/* Revenue Dropdown */}
          <div className="w-full p-2 rounded text-md md:text-lg text-gray-400 hover:bg-gray-100 cursor-pointer flex flex-col">
            <div className="flex items-center space-x-2 justify-between" onClick={() => setShowRevenue((prev) => !prev)}>
              <span className="flex items-center space-x-2">
                <FaDollarSign />
                <span className="pl-[15px]">Revenue</span>
              </span>
              <span>{showRevenue ? '▲' : '▼'}</span>
            </div>
            {showRevenue && (
              <div className="pl-8 pt-2 flex flex-col gap-2">
                {["$0-1M", "$1M-10M", "$10M-50M", "$50M-250M", "$250M-1B", "$1B+"].map((rev, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={selectedRevenues.includes(rev)}
                      onChange={() => handleRevenueChange(rev)}
                    />
                    <span>{rev}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          {/* Name Dropdown */}
          <div className="w-full p-2 rounded text-md md:text-lg text-gray-400 hover:bg-gray-100 cursor-pointer flex flex-col">
            <div className="flex items-center space-x-2 justify-between" onClick={() => setShowNames((prev) => !prev)}>
              <span className="flex items-center space-x-2">
                <FaUser />
                <span className="pl-[15px]">Name</span>
              </span>
              <span>{showNames ? '▲' : '▼'}</span>
            </div>
            {showNames && (
              <div className="pl-8 pt-2 flex flex-col gap-2">
                <div onClick={(e) => e.stopPropagation()}>
                  <input
                    type="text"
                    placeholder="Enter person name (e.g., John Smith, Jane Doe)"
                    value={nameInput}
                    onChange={handleNameInputChange}
                    onKeyDown={handleNameInputKeyDown}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full"
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Start typing to search for leads with this name
                </div>
              </div>
            )}
          </div>
          {/* Company Dropdown */}
          <div className="w-full p-2 rounded text-md md:text-lg text-gray-400 hover:bg-gray-100 cursor-pointer flex flex-col">
            <div className="flex items-center space-x-2 justify-between" onClick={() => setShowCompanies((prev) => !prev)}>
              <span className="flex items-center space-x-2">
                <FaBuilding />
                <span className="pl-[15px]">Company</span>
              </span>
              <span>{showCompanies ? '▲' : '▼'}</span>
            </div>
            {showCompanies && (
              <div className="pl-8 pt-2 flex flex-col gap-2">
                <div onClick={(e) => e.stopPropagation()}>
                  <input
                    type="text"
                    placeholder="Enter company name (e.g., Google, Microsoft)"
                    value={companyInput}
                    onChange={handleCompanyInputChange}
                    onKeyDown={handleCompanyInputKeyDown}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full"
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Start typing to search for leads at this company
                </div>
              </div>
            )}
          </div>
          {/* The rest of the filters */}
          {[{ icon: FaGlobe, label: "Lookalike domain" },
            { icon: FaCogs, label: "Technologies" },
            { icon: FaMoneyCheckAlt, label: "Funding type" }
          ].map((item, index) => (
            <div key={index} className="w-full p-2 rounded text-md md:text-lg text-gray-400 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
              <item.icon />
              <span className="pl-[15px]">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex justify-center items-center w-full bg-black relative bg-cover bg-center rounded-2xl md:mx-4 md:p-10" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="bg-opacity-60 rounded-2xl shadow-lg w-full max-w-[1000px] md:w-[750px] text-center p-4 md:p-10">
          <h2 className="text-white text-xl md:text-3xl mb-[15px] md:mb-[75px] pb-[15px] md:pb-[30px] mt-[0px]">
            Discover high-value leads with ease
          </h2>
          {/* Quick Search Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-6 w-full max-w-[350px] md:w-[650px] mx-auto">
            {[
              "Sales Representative",
              "Marketing Director in Sweden",
              "Chief Executive Officer in Switzerland",
              "IT Manager",
              "Small Business Owner in Los Angeles"
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => handleSearch(item)}
                className="px-4 py-3 text-sm bg-gray-500/30 text-white rounded-full shadow my-[10px] mx-[6px] hover:bg-gray-500/50 transition-colors duration-200"
                disabled={isLoading}
                title={`Quick search: ${item}`}
              >
                {isLoading ? "Searching..." : item}
              </button>
            ))}
          </div>
          {/* Search Manually Bar */}
          <form onSubmit={handleSearchSubmit} className="mb-6">
            <div className="flex items-center gap-2 bg-white rounded-full shadow-md overflow-hidden justify-between w-full max-w-xl mx-auto border border-gray-200 px-2 py-1">
              <div className="text-gray-500 ml-2 md:block hidden">
              <FaSearch size={20} />
            </div>
            <input
              type="text"
              placeholder="E.g Engineers in New York in software ..."
                className="flex-1 px-4 py-3 text-gray-700 focus:outline-none text-sm bg-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit(e)}
            />
            <div className="md:mr-2">
              <button
                  type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-amber-500 to-emerald-600 px-4 py-2 text-white font-semibold text-sm md:text-md rounded-full flex items-center w-full hover:from-amber-600 hover:to-emerald-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="AI Search"
              >
                <FaHandSparkles size={16} className="mr-1 md:block hidden" />
                <span>{isLoading ? "Searching..." : "AI Search"}</span>
              </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}

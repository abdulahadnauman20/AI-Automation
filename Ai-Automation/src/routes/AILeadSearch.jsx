import { Search, EyeOff } from "lucide-react"
import { FaBriefcase, FaMapMarkerAlt, FaIndustry, FaUsers, FaDollarSign, FaGlobe, FaCogs, FaMoneyCheckAlt, FaUser, FaBuilding, FaSearch, FaTimes, FaFilter, FaUserPlus } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAILeadScoutQuery } from "../reactQuery/hooks/useAILeadScoutQuery";
import { toast } from "react-hot-toast";
import axiosInstance from "../services/axiosInstance";

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

// Helper to fetch alternatives from GotAlt
async function fetchDomainAlternatives(domain) {
  try {
    // Call backend proxy with /integration prefix
    const url = `${import.meta.env.VITE_API_URL}integration/gotalt-alternatives?domain=${encodeURIComponent(domain)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch alternatives");
    const data = await res.json();
    return data.alternatives || [];
  } catch (err) {
    return null;
  }
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
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedRevenues, setSelectedRevenues] = useState([]);
  const [selectedFundingTypes, setSelectedFundingTypes] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [showLocation, setShowLocation] = useState(false);
  const [showEmployees, setShowEmployees] = useState(false);
  const [showRevenue, setShowRevenue] = useState(false);
  const [showNames, setShowNames] = useState(false);
  const [showCompanies, setShowCompanies] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const [allLocations] = useState([
    "New York", "London", "San Francisco", "Berlin", "Paris", "Toronto", "Sydney", "Singapore", "Dubai", "Remote", "Los Angeles", "Chicago", "Boston", "Austin", "Seattle", "Tokyo", "Delhi", "Karachi", "Lahore", "Islamabad", "Mumbai", "Bangalore", "Shanghai", "Beijing", "Moscow", "Madrid", "Rome", "Istanbul", "Cairo", "Johannesburg"
  ]);
  const [nameInput, setNameInput] = useState("");
  const [debouncedNameInput, setDebouncedNameInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [debouncedCompanyInput, setDebouncedCompanyInput] = useState("");
  const [showTechnologies, setShowTechnologies] = useState(false);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [showFundingType, setShowFundingType] = useState(false);
  const [showLookalikeInput, setShowLookalikeInput] = useState(false);
  const [lookalikeDomain, setLookalikeDomain] = useState('');
  const [alternatives, setAlternatives] = useState([]);
  const [altDomain, setAltDomain] = useState("");
  const [showOnlyAlternatives, setShowOnlyAlternatives] = useState(false);
  const [backToLeads, setBackToLeads] = useState(false);
  const [jobTitleInput, setJobTitleInput] = useState("");
  const allJobTitles = [
    "CEO", "CTO", "CFO", "COO", "CMO", "Manager", "Developer", "Engineer", "Designer", "Product Manager", "Sales", "Marketing", "HR", "Recruiter", "Data Scientist", "Analyst", "Consultant", "Director", "VP", "President", "Founder", "Owner"
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const debounceTimeout = useRef();
  const locationDebounceTimeout = useRef();
  const nameDebounceTimeout = useRef();
  const companyDebounceTimeout = useRef();

  // Extract the initial search query and filters from the URL
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get("searchQuery") || "";
  const initialJobTitles = queryParams.get("jobTitles") ? queryParams.get("jobTitles").split(",") : [];
  const initialIndustries = queryParams.get("industries") ? queryParams.get("industries").split(",") : [];
  const initialSkipOwned = queryParams.get("skipOwned") === "0" ? false : true;
  const initialLocations = queryParams.get("locations") ? queryParams.get("locations").split(",") : [];
  const initialEmployees = queryParams.get("employees") ? queryParams.get("employees").split(",") : [];
  const initialRevenues = queryParams.get("revenues") ? queryParams.get("revenues").split(",") : [];
  const initialTechnologies = queryParams.get("technologies") ? queryParams.get("technologies").split(",") : [];
  const initialFundingTypes = queryParams.get("fundingTypes") ? queryParams.get("fundingTypes").split(",") : [];
  const initialNames = queryParams.get("names") ? queryParams.get("names").split(",") : [];
  const initialCompanies = queryParams.get("companies") ? queryParams.get("companies").split(",") : [];
  const initialLocationInput = queryParams.get("locationInput") || "";
  const initialNameInput = queryParams.get("nameInput") || "";
  const initialCompanyInput = queryParams.get("companyInput") || "";

  // Initialize state from URL params on mount
  useEffect(() => {
    setSearchTerm(initialSearchQuery);
    setSelectedJobTitles(initialJobTitles);
    setSelectedIndustries(initialIndustries);
    setSkipOwned(initialSkipOwned);
    setSelectedLocations(initialLocations);
    setSelectedEmployees(initialEmployees);
    setSelectedRevenues(initialRevenues);
    setSelectedTechnologies(initialTechnologies);
    setSelectedFundingTypes(initialFundingTypes);
    setSelectedNames(initialNames);
    setSelectedCompanies(initialCompanies);
    setLocationInput(initialLocationInput);
    setNameInput(initialNameInput);
    setDebouncedNameInput(initialNameInput);
    setCompanyInput(initialCompanyInput);
    setDebouncedCompanyInput(initialCompanyInput);
  }, [initialSearchQuery, location.search]);

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

  // Debounce location input
  useEffect(() => {
    console.log('Location input useEffect triggered with:', locationInput);
    if (locationDebounceTimeout.current) clearTimeout(locationDebounceTimeout.current);
    locationDebounceTimeout.current = setTimeout(() => {
      console.log('Setting debouncedLocationInput to:', locationInput);
      setLocationInput(locationInput);
      setCurrentPage(1); // Reset to first page on new location search
    }, 500);
    return () => clearTimeout(locationDebounceTimeout.current);
  }, [locationInput]);

  // Debounce name input
  useEffect(() => {
    console.log('Name input useEffect triggered with:', nameInput);
    if (nameDebounceTimeout.current) clearTimeout(nameDebounceTimeout.current);
    nameDebounceTimeout.current = setTimeout(() => {
      console.log('Setting debouncedNameInput to:', nameInput);
      setDebouncedNameInput(nameInput);
      setCurrentPage(1); // Reset to first page on new name search
    }, 500);
    return () => clearTimeout(nameDebounceTimeout.current);
  }, [nameInput]);

  // Debounce company input
  useEffect(() => {
    console.log('Company input useEffect triggered with:', companyInput);
    if (companyDebounceTimeout.current) clearTimeout(companyDebounceTimeout.current);
    companyDebounceTimeout.current = setTimeout(() => {
      console.log('Setting debouncedCompanyInput to:', companyInput);
      setDebouncedCompanyInput(companyInput);
      setCurrentPage(1); // Reset to first page on new company search
    }, 500);
    return () => clearTimeout(companyDebounceTimeout.current);
  }, [companyInput]);

  // Trigger immediate search when locationInput is set from URL
  useEffect(() => {
    if (initialLocationInput && initialLocationInput !== locationInput) {
      setLocationInput(initialLocationInput);
      setCurrentPage(1);
    }
  }, [initialLocationInput]);

  // Trigger immediate search when nameInput is set from URL
  useEffect(() => {
    if (initialNameInput && initialNameInput !== nameInput) {
      setDebouncedNameInput(initialNameInput);
      setCurrentPage(1);
    }
  }, [initialNameInput]);

  // Trigger immediate search when companyInput is set from URL
  useEffect(() => {
    if (initialCompanyInput && initialCompanyInput !== companyInput) {
      setDebouncedCompanyInput(initialCompanyInput);
      setCurrentPage(1);
    }
  }, [initialCompanyInput]);

  // Always send a non-empty query
  const safeSearchTerm = debouncedSearchTerm && debouncedSearchTerm.trim() ? debouncedSearchTerm : 'all';

  // Prepare location array for the query
  const locationArray = locationInput ? [locationInput] : selectedLocations;
  
  // Prepare name array for the query
  const nameArray = debouncedNameInput ? [debouncedNameInput] : selectedNames;
  
  // Prepare company array for the query
  const companyArray = debouncedCompanyInput ? [debouncedCompanyInput] : selectedCompanies;
  
  console.log('AILeadSearch - Current state:', {
    locationInput,
    locationArray,
    selectedLocations,
    hasLocation: locationInput ? true : false,
    nameInput,
    debouncedNameInput,
    nameArray,
    selectedNames,
    hasName: debouncedNameInput ? true : false,
    companyInput,
    debouncedCompanyInput,
    companyArray,
    selectedCompanies,
    hasCompany: debouncedCompanyInput ? true : false
  });

  // Fetch leads with the debounced search query, selected job titles, and selected industries
  const { data, isLoading, error, refetch } = useAILeadScoutQuery(
    safeSearchTerm,
    currentPage,
    perPage,
    selectedJobTitles.length > 0 ? selectedJobTitles : undefined,
    selectedIndustries.length > 0 ? selectedIndustries : undefined,
    locationArray,
    selectedEmployees,
    selectedRevenues.length > 0 ? selectedRevenues : undefined,
    selectedTechnologies.length > 0 ? selectedTechnologies : undefined,
    selectedFundingTypes.length > 0 ? selectedFundingTypes : undefined,
    nameArray,
    companyArray,
  );

  useEffect(() => {
    if (data?.results) {
      console.log('Setting leads from data:', data.results);
      setLeads(
        data.results.map(lead =>
          lead.person
            ? {
                id: lead.person.id,
                name: lead.person.name,
                email: lead.person.email,
                company: lead.person.organization?.name,
                title: lead.person.title,
                location: [lead.person.city, lead.person.state, lead.person.country].filter(Boolean).join(', '),
                website: lead.person.organization?.website_url,
                employeeCount: lead.person.organization?.estimated_num_employees,
                checked: false
              }
            : { ...lead, checked: false }
        )
      );
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

  const handleLocationInputChange = (e) => {
    console.log('Location input changed:', e.target.value);
    setLocationInput(e.target.value);
  };

  const handleLocationInputKeyDown = (e) => {
    console.log('Key pressed:', e.key);
    if (e.key === "Enter") {
      console.log('Enter pressed, triggering search immediately');
      e.preventDefault();
      // Trigger search immediately instead of waiting for debounce
      setLocationInput(locationInput);
      setCurrentPage(1);
    }
  };

  const handleNameInputChange = (e) => {
    console.log('Name input changed:', e.target.value);
    setNameInput(e.target.value);
  };

  const handleNameInputKeyDown = (e) => {
    console.log('Name key pressed:', e.key);
    if (e.key === "Enter") {
      console.log('Enter pressed, triggering name search immediately');
      e.preventDefault();
      // Trigger search immediately instead of waiting for debounce
      setDebouncedNameInput(nameInput);
      setCurrentPage(1);
    }
  };

  const handleCompanyInputChange = (e) => {
    console.log('Company input changed:', e.target.value);
    setCompanyInput(e.target.value);
  };

  const handleCompanyInputKeyDown = (e) => {
    console.log('Company key pressed:', e.key);
    if (e.key === "Enter") {
      console.log('Enter pressed, triggering company search immediately');
      e.preventDefault();
      // Trigger search immediately instead of waiting for debounce
      setDebouncedCompanyInput(companyInput);
      setCurrentPage(1);
    }
  };

  const handleLookalikeKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!lookalikeDomain.trim()) {
        toast.error("Please enter a domain.");
        return;
      }
      setAlternatives([]);
      setAltDomain("");
      const findCompanies = async () => {
        try {
          const response = await axiosInstance.post('/lead/lookalike', { domain: lookalikeDomain });
          return { type: 'companies', data: response.data };
        } catch (err) {
          if (err.response && err.response.status === 404) {
            // Fallback to GotAlt/static alternatives, do not log as error
            const alts = await fetchDomainAlternatives(lookalikeDomain);
            if (alts && alts.length > 0) {
              return { type: 'alternatives', data: alts };
            } else {
              throw new Error('No similar companies or alternatives found.');
            }
          } else {
            // Only log unexpected errors
            console.error(err);
            throw err;
          }
        }
      };
      toast.promise(
        findCompanies(),
        {
          loading: `Finding companies similar to ${lookalikeDomain}...`,
          success: (result) => {
            if (result.type === 'companies') {
              const newCompanies = result.data.companies;
              if (newCompanies.length === 0) {
                return "No similar companies found.";
              }
              const updatedCompanies = [...new Set([...selectedCompanies, ...newCompanies])];
              setSelectedCompanies(updatedCompanies);
              setLookalikeDomain('');
              setShowLookalikeInput(false);
              setAlternatives([]);
              setAltDomain("");
              return "Found and added similar companies to your filter!";
            } else if (result.type === 'alternatives') {
              setLookalikeDomain('');
              setShowLookalikeInput(false);
              setAlternatives(result.data);
              setAltDomain(lookalikeDomain);
              return "No similar companies in your DB, but here are some alternatives!";
            }
          },
          error: (err) => err.message || "Could not find similar companies or alternatives.",
        }
      );
    }
  };

  // On mount, check for altDomain in query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const alt = params.get("altDomain");
    if (alt) {
      setShowOnlyAlternatives(true);
      setAltDomain(alt);
      fetchDomainAlternatives(alt).then((alts) => setAlternatives(alts || []));
    } else {
      setShowOnlyAlternatives(false);
      setAltDomain("");
      setAlternatives([]);
    }
  }, [location.search]);

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
                <input
                  type="text"
                  placeholder="Search or add job title..."
                  value={jobTitleInput}
                  onChange={e => setJobTitleInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && jobTitleInput.trim()) {
                      if (!selectedJobTitles.includes(jobTitleInput.trim())) {
                        setSelectedJobTitles([...selectedJobTitles, jobTitleInput.trim()]);
                        setCurrentPage(1);
                      }
                      setJobTitleInput("");
                    }
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mb-2"
                />
                {/* Suggestions dropdown */}
                {jobTitleInput && (
                  <div className="bg-white border rounded shadow max-h-32 overflow-y-auto z-10">
                    {allJobTitles.filter(jt => jt.toLowerCase().includes(jobTitleInput.toLowerCase()) && !selectedJobTitles.includes(jt)).map(jt => (
                      <div
                        key={jt}
                        className="px-3 py-1 hover:bg-blue-100 cursor-pointer"
                        onClick={() => {
                          setSelectedJobTitles([...selectedJobTitles, jt]);
                          setCurrentPage(1);
                          setJobTitleInput("");
                        }}
                      >
                        {jt}
                      </div>
                    ))}
                    {allJobTitles.filter(jt => jt.toLowerCase().includes(jobTitleInput.toLowerCase()) && !selectedJobTitles.includes(jt)).length === 0 && (
                      <div className="px-3 py-1 text-gray-400">No matches</div>
                    )}
                  </div>
                )}
                {/* Selected job titles as chips */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedJobTitles.map((jt, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                      {jt}
                      <button
                        className="ml-1 text-blue-500 hover:text-blue-700"
                        onClick={() => {
                          setSelectedJobTitles(selectedJobTitles.filter(t => t !== jt));
                          setCurrentPage(1);
                        }}
                        aria-label={`Remove ${jt}`}
                      >
                        <FaTimes size={10} />
                      </button>
                    </span>
                  ))}
                </div>
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
              <div className="pl-8 pt-2 flex flex-col gap-2" onClick={e => e.stopPropagation()}>
                <input
                  type="text"
                  placeholder="Search or add location..."
                  value={locationInput}
                  onChange={e => setLocationInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && locationInput.trim()) {
                      if (!selectedLocations.includes(locationInput.trim())) {
                        setSelectedLocations([...selectedLocations, locationInput.trim()]);
                        setCurrentPage(1);
                      }
                      setLocationInput("");
                    }
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mb-2"
                />
                {/* Suggestions dropdown */}
                {locationInput && (
                  <div className="bg-white border rounded shadow max-h-32 overflow-y-auto z-10">
                    {allLocations.filter(loc => loc.toLowerCase().includes(locationInput.toLowerCase()) && !selectedLocations.includes(loc)).map(loc => (
                      <div
                        key={loc}
                        className="px-3 py-1 hover:bg-blue-100 cursor-pointer"
                        onClick={() => {
                          setSelectedLocations([...selectedLocations, loc]);
                          setCurrentPage(1);
                          setLocationInput("");
                        }}
                      >
                        {loc}
                      </div>
                    ))}
                    {allLocations.filter(loc => loc.toLowerCase().includes(locationInput.toLowerCase()) && !selectedLocations.includes(loc)).length === 0 && (
                      <div className="px-3 py-1 text-gray-400">No matches</div>
                    )}
                  </div>
                )}
                {/* Selected locations as chips */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedLocations.map((loc, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                      {loc}
                      <button
                        className="ml-1 text-blue-500 hover:text-blue-700"
                        onClick={() => {
                          setSelectedLocations(selectedLocations.filter(l => l !== loc));
                          setCurrentPage(1);
                        }}
                        aria-label={`Remove ${loc}`}
                      >
                        <FaTimes size={10} />
                      </button>
                    </span>
                  ))}
                </div>
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
                      onChange={() => {
                        setSelectedEmployees((prev) => prev.includes(emp) ? prev.filter((e) => e !== emp) : [...prev, emp]);
                        setCurrentPage(1); // Reset to first page on filter change
                      }}
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
                      onChange={() => {
                        setSelectedRevenues((prev) => prev.includes(rev) ? prev.filter((r) => r !== rev) : [...prev, rev]);
                        setCurrentPage(1); // Reset to first page on filter change
                      }}
                    />
                    <span>{rev}</span>
                  </label>
                ))}
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
          {/* Technologies Dropdown */}
          <div className="w-full p-2 rounded text-md md:text-lg text-gray-400 hover:bg-gray-100 cursor-pointer flex flex-col">
            <div className="flex items-center space-x-2 justify-between" onClick={() => setShowTechnologies((prev) => !prev)}>
              <span className="flex items-center space-x-2">
                <FaCogs />
                <span className="pl-[15px]">Technologies</span>
              </span>
              <span>{showTechnologies ? '▲' : '▼'}</span>
            </div>
            {showTechnologies && (
              <div className="pl-8 pt-2 flex flex-col gap-2 h-48 overflow-y-auto">
                {[
                  "JavaScript", "Python", "Java", "C++", "C#", "PHP", "Ruby", "Go", "Swift", "Kotlin",
                  "TypeScript", "HTML5", "CSS3", "SQL", "NoSQL",
                  "React", "Angular", "Vue.js", "jQuery", "Next.js", "Gatsby",
                  "Node.js", "Express.js", "Django", "Flask", "Ruby on Rails", "ASP.NET", "Spring",
                  "MySQL", "PostgreSQL", "MongoDB", "Redis", "SQLite", "Firebase",
                  "Amazon Web Services (AWS)", "Microsoft Azure", "Google Cloud Platform (GCP)",
                  "Docker", "Kubernetes", "Terraform", "Ansible",
                  "TensorFlow", "PyTorch", "scikit-learn",
                  "Git", "Jira", "Slack", "Salesforce", "Shopify", "WordPress", "HubSpot"
                ].map((tech, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={selectedTechnologies.includes(tech)}
                      onChange={() => {
                        setSelectedTechnologies((prev) =>
                          prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
                        );
                        setCurrentPage(1); // Reset to first page on filter change
                      }}
                    />
                    <span>{tech}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          {/* Funding Type Dropdown */}
          <div className="w-full p-2 rounded text-md md:text-lg text-gray-400 hover:bg-gray-100 cursor-pointer flex flex-col">
            <div className="flex items-center space-x-2 justify-between" onClick={() => setShowFundingType((prev) => !prev)}>
              <span className="flex items-center space-x-2">
                <FaMoneyCheckAlt />
                <span className="pl-[15px]">Funding Type</span>
              </span>
              <span>{showFundingType ? '▲' : '▼'}</span>
            </div>
            {showFundingType && (
              <div className="pl-8 pt-2 flex flex-col gap-2">
                {[
                  "Seed", "Series A", "Series B", "Series C+", "IPO", "Acquired", "Bootstrapped"
                ].map((type, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={selectedFundingTypes.includes(type)}
                      onChange={() => {
                        setSelectedFundingTypes((prev) =>
                          prev.includes(type) ? prev.filter((f) => f !== type) : [...prev, type]
                        );
                        setCurrentPage(1);
                      }}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          {/* Lookalike Domain Input */}
          <div className="w-full p-2 rounded text-md md:text-lg text-gray-400 hover:bg-gray-100 cursor-pointer flex flex-col">
            <div
              className="flex items-center space-x-2 justify-between"
              onClick={() => setShowLookalikeInput((prev) => !prev)}
            >
              <span className="flex items-center space-x-2">
                <FaGlobe />
                <span className="pl-[15px]">Lookalike Domain</span>
              </span>
              <span>{showLookalikeInput ? '▲' : '▼'}</span>
            </div>
            {showLookalikeInput && (
              <div className="pl-8 pt-2" onClick={(e) => e.stopPropagation()}>
                <input
                  type="text"
                  placeholder="e.g., stripe.com"
                  value={lookalikeDomain}
                  onChange={(e) => setLookalikeDomain(e.target.value)}
                  onKeyDown={handleLookalikeKeyDown}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Enter a domain to find similar companies.
                </div>
              </div>
            )}
          </div>
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

          {/* Alternatives display (moved from sidebar) */}
          {alternatives.length > 0 && !showOnlyAlternatives && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded p-3">
              <p className="font-bold text-black mb-1">Alternatives to <span className="text-blue-600">{altDomain}</span>:</p>
              <ul className="list-disc ml-6">
                {alternatives.map((alt, idx) => (
                  <li key={idx} className="mb-1">
                    <button
                      className="text-blue-700 underline font-medium bg-transparent border-none p-0 cursor-pointer"
                      onClick={() => {
                        navigate(`?altDomain=${alt.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}`);
                      }}
                    >
                      {alt.name || alt.url}
                    </button>
                    {alt.description && <span className="text-gray-600 ml-2">- {alt.description}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Results */}
          {showOnlyAlternatives && (
            <div className="mb-6">
              <button
                className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={() => {
                  navigate("?");
                }}
              >
                ← Back to Leads
              </button>
              <h2 className="text-xl font-bold mb-4">Alternatives to <span className="text-blue-600">{altDomain}</span></h2>
              {alternatives.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No alternatives found for this domain.</div>
              ) : (
                <div className="space-y-4">
                  {alternatives.map((alt, idx) => (
                    <div key={idx} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{alt.name || alt.url}</h3>
                              <p className="text-gray-600 font-medium">Alternative Service</p>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                              <FaGlobe className="text-gray-400" />
                              <a href={alt.url.startsWith('http') ? alt.url : `https://${alt.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                                {alt.url}
                              </a>
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center gap-2 text-gray-600">
                              <FaBuilding className="text-gray-400" />
                              <span>{alt.name || alt.url}</span>
                            </div>
                            {alt.description && (
                              <div className="mt-2 text-sm text-gray-500">{alt.description}</div>
                            )}
                          </div>
                          <div className="mt-3 flex flex-wrap gap-3">
                            <a
                              href={alt.url.startsWith('http') ? alt.url : `https://${alt.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                            >
                              <span>🌐</span> Visit
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

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
                      className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
import { useState, useEffect } from "react"
import {Search, Plus, MapPin, Globe, ChevronDown, ChevronUp, Ellipsis, CircleCheck, Clock, DollarSign, Users, FileText, Handshake, CheckCircle, XCircle, PhoneCall, Video, CalendarDays} from "lucide-react"
import axiosInstance from "../services/axiosInstance";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Menu } from '@headlessui/react';

export default function Crm() {
  const [accounts, setAccounts] = useState([]);
  const [people, setPeople] = useState([]);
  const [opportunities, setOpportunities] = useState({
    Discovery: [],
    Evaluation: [],
    Proposal: [],
    Negotiation: [],
    Commit: [],
    Closed: []
  });
  const [expandedCompanies, setExpandedCompanies] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Accounts");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState('Oldest first');
  const [selectAll, setSelectAll] = useState(false);
  const [draggedLead, setDraggedLead] = useState(null);
  const [opportunityStatus, setOpportunityStatus] = useState('All statuses');
  const [events, setEvents] = useState([]);
  const [calls, setCalls] = useState([]);
  const [meetings, setMeetings] = useState([]);

  const sortOptions = [
    { value: 'Newest first', label: 'Newest first' },
    { value: 'Oldest first', label: 'Oldest first' },
    { value: 'Name A - Z', label: 'Name A - Z' },
    { value: 'Name Z - A', label: 'Name Z - A' }
  ];

  const statusConfig = {
    Discovery: { color: "bg-blue-100", textColor: "text-blue-700", icon: Users },
    Evaluation: { color: "bg-yellow-100", textColor: "text-yellow-700", icon: FileText },
    Proposal: { color: "bg-purple-100", textColor: "text-purple-700", icon: DollarSign },
    Negotiation: { color: "bg-orange-100", textColor: "text-orange-700", icon: Handshake },
    Commit: { color: "bg-green-100", textColor: "text-green-700", icon: CheckCircle },
    Closed: { color: "bg-gray-100", textColor: "text-gray-700", icon: XCircle }
  };

  // Fetch leads and group them by company
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        console.log('Attempting to fetch leads...');
        const response = await axiosInstance.get("/lead/GetAllLeads");
        console.log('API Response:', response);
        
        if (response.data.success) {
          console.log('Leads data:', response.data.leads);
          // Group leads by company for Accounts tab
          const groupedLeads = response.data.leads.reduce((acc, lead) => {
            const companyName = lead.Company || 'Unassigned';
            if (!acc[companyName]) {
              acc[companyName] = {
                id: companyName,
                name: companyName,
                logo: null,
                logoBackground: "bg-gray-100",
                location: lead.Location || 'Not specified',
                website: lead.Website || 'Not specified',
                leads: []
              };
            }
            acc[companyName].leads.push(lead);
            return acc;
          }, {});

          // Convert to array and sort for Accounts tab
          const accountsArray = Object.values(groupedLeads).map(company => ({
            ...company,
            contacts: company.leads.length,
            contactAvatars: company.leads.slice(0, 3).map(lead => 
              lead.Name.split(' ').map(n => n[0]).join('').toUpperCase()
            )
          }));

          // Set people data for People tab
          setPeople(response.data.leads.map(lead => ({
            ...lead,
            status: lead.Status || 'Not yet contacted',
            provider: lead.Email?.includes('@gmail.com') ? 'Google' : 
                     lead.Email?.includes('@outlook.com') ? 'Microsoft' : 
                     lead.Email?.includes('@yahoo.com') ? 'Yahoo' : 'Other'
          })));

          // Group leads by status for Opportunities tab
          const opportunitiesByStatus = response.data.leads.reduce((acc, lead) => {
            const status = lead.Status || 'Discovery';
            if (!acc[status]) {
              acc[status] = [];
            }
            acc[status].push(lead);
            return acc;
          }, {
            Discovery: [],
            Evaluation: [],
            Proposal: [],
            Negotiation: [],
            Commit: [],
            Closed: []
          });

          setOpportunities(opportunitiesByStatus);
          console.log('Processed accounts:', accountsArray);
          setAccounts(accountsArray);
        } else {
          console.error('API returned unsuccessful response:', response.data);
          toast.error(response.data.message || 'Failed to fetch leads');
        }
      } catch (error) {
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          config: error.config
        });
        
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          toast.error(error.response.data?.message || `Error ${error.response.status}: Failed to fetch leads`);
        } else if (error.request) {
          // The request was made but no response was received
          toast.error('No response from server. Please check your connection.');
        } else {
          // Something happened in setting up the request that triggered an Error
          toast.error('Error setting up request: ' + error.message);
        }
      }
    };

    fetchLeads();
  }, []);

  // Fetch calls data (from /calls endpoint)
  useEffect(() => {
    const fetchCallsData = async () => {
      try {
        const response = await axiosInstance.get("/calls");
        if (response.data.success) {
          setCalls(response.data.calls || []);
        } else {
          toast.error(response.data.message || 'Failed to fetch calls');
        }
      } catch (error) {
        console.error('Error fetching calls:', error);
        toast.error('Failed to fetch calls');
      }
    };
    fetchCallsData();
  }, []);

  // Fetch meetings data (from /meetings endpoint)
  useEffect(() => {
    const fetchMeetingsData = async () => {
      try {
        const response = await axiosInstance.get("/meetings");
        if (response.data.success) {
          setMeetings(response.data.meetings || []);
        } else {
          toast.error(response.data.message || 'Failed to fetch meetings');
        }
      } catch (error) {
        console.error('Error fetching meetings:', error);
        toast.error('Failed to fetch meetings');
      }
    };
    fetchMeetingsData();
  }, []);

  const toggleCompanyExpand = (companyId) => {
    setExpandedCompanies(prev => ({
      ...prev,
      [companyId]: !prev[companyId]
    }));
  };

  const handleSortChange = (sort) => {
    setSortOrder(sort);
    setShowSortDropdown(false);
    
    const sortedAccounts = [...accounts];
    switch (sort) {
      case 'Newest first':
        sortedAccounts.sort((a, b) => 
          new Date(b.leads[0]?.createdAt) - new Date(a.leads[0]?.createdAt)
        );
        break;
      case 'Oldest first':
        sortedAccounts.sort((a, b) => 
          new Date(a.leads[0]?.createdAt) - new Date(b.leads[0]?.createdAt)
        );
        break;
      case 'Name A - Z':
        sortedAccounts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Name Z - A':
        sortedAccounts.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    setAccounts(sortedAccounts);
  };

  const handleDragStart = (lead, status) => {
    setDraggedLead({ ...lead, sourceStatus: status });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (targetStatus) => {
    if (!draggedLead || draggedLead.sourceStatus === targetStatus) {
      setDraggedLead(null);
      return;
    }

    try {
      // Update the lead's status in the backend
      const response = await axiosInstance.post(`/lead/UpdateLead/${draggedLead.id}`, {
        Status: targetStatus
      });

      if (response.data.success) {
        // Update local state
        setOpportunities(prev => {
          const newState = { ...prev };
          // Remove from source status
          newState[draggedLead.sourceStatus] = newState[draggedLead.sourceStatus].filter(
            lead => lead.id !== draggedLead.id
          );
          // Add to target status
          newState[targetStatus] = [...newState[targetStatus], { ...draggedLead, Status: targetStatus }];
          return newState;
        });

        toast.success('Lead status updated successfully');
      } else {
        toast.error('Failed to update lead status');
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
      toast.error('Failed to update lead status');
    }

    setDraggedLead(null);
  };

  // Filter helpers
  const meetingEvents = events.filter(ev => ev.Meeting_Link || (ev.Task_Title && ev.Task_Title.toLowerCase().includes('meeting')));
  const callEvents = events.filter(ev => (ev.Task_Title && ev.Task_Title.toLowerCase().includes('call')) || (ev.Description && ev.Description.toLowerCase().includes('call')));

  return (
    <div className="min-h-screen bg-[rgb(245,245,245)] md:ps-20">
      <div className="container mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex flex-col md:flex-row">
            {["Accounts", "People", "Opportunities", "Calls", "Meetings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Search and Filters */}
        {(activeTab === "Accounts" || activeTab === "People" || activeTab === "Opportunities" || activeTab === "Calls" || activeTab === "Meetings") && (
          <div className="flex flex-wrap justify-center md:justify-between mb-6 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder={
                  activeTab === "Accounts" ? "Search companies..." :
                  activeTab === "People" ? "Search people..." :
                  activeTab === "Opportunities" ? "Search opportunities..." :
                  activeTab === "Calls" ? "Search calls..." :
                  "Search meetings..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4">
              {activeTab === "Accounts" && (
              <div className="relative inline-block text-left">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)} 
                  className="px-4 py-2 border border-gray-300 cursor-pointer text-gray-600 rounded-full flex gap-1 items-center">
                    <span className="text-gray-400">{sortOrder}</span>
                  <ChevronDown className="text-gray-400" />
                </button>
                {showSortDropdown && (
                    <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                            onClick={() => handleSortChange(option.value)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              </div>
              )}

              {(activeTab === "Calls" || activeTab === "Meetings") && (
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="flex items-center px-4 py-2 border border-gray-300 rounded-full text-gray-600">
                    {sortOrder}
                    <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
                  </Menu.Button>
                  <Menu.Items className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    {sortOptions.map(option => (
                      <Menu.Item key={option.value}>
                        {({ active }) => (
                          <button
                            className={`w-full text-left px-4 py-2 text-sm ${active ? "bg-gray-100" : ""}`}
                            onClick={() => handleSortChange(option.value)}
                          >
                            {option.label}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              )}

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:ring-teal-500"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add new
              </button>
            </div>
          </div>
        )}

        {/* Accounts Grid */}
        {activeTab === "Accounts" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts
              .filter(account => 
                account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                account.leads.some(lead => 
                  lead.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  lead.Email?.toLowerCase().includes(searchQuery.toLowerCase())
                )
              )
              .map((account) => (
                <div key={account.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className={`${account.logoBackground} w-12 h-12 rounded-md flex items-center justify-center text-white`}>
                          {account.logo ? (
                            <img src={account.logo} alt={account.name} className="w-8 h-8" />
                          ) : (
                            <span className="text-xl font-bold">{account.name[0]}</span>
                          )}
                    </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{account.name}</h3>
                          <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {account.location}
                  </div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleCompanyExpand(account.id)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        {expandedCompanies[account.id] ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                  </div>

                    <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="flex -space-x-2 mr-2">
                      {account.contactAvatars.map((avatar, index) => (
                        <div
                          key={index}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white border-2 border-white ${
                            index % 3 === 0 ? "bg-blue-500" : index % 3 === 1 ? "bg-yellow-500" : "bg-green-500"
                          }`}
                        >
                          {avatar}
                        </div>
                      ))}
                    </div>
                        <span className="text-gray-500">{account.contacts} Contacts</span>
                      </div>
                      {account.website !== 'Not specified' && (
                        <a
                          href={account.website.startsWith('http') ? account.website : `https://${account.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-600 flex items-center"
                        >
                          <Globe className="h-4 w-4 mr-1" />
                          Website
                        </a>
                      )}
                  </div>

                    {expandedCompanies[account.id] && (
                      <div className="mt-4 border-t pt-4">
                        <div className="space-y-3">
                          {account.leads.map((lead) => (
                            <div key={lead.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                  <span className="text-sm font-medium text-gray-600">
                                    {lead.Name.split(' ').map(n => n[0]).join('')}
                                  </span>
                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{lead.Name}</p>
                                  <p className="text-xs text-gray-500">{lead.Title}</p>
              </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {lead.Email && (
                                  <a
                                    href={`mailto:${lead.Email}`}
                                    className="text-blue-500 hover:text-blue-600 text-sm"
                                  >
                                    {lead.Email}
                                  </a>
                          )}
                        </div>
                          </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        {/* People Table */}
        {activeTab === "People" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="min-w-full overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-300 text-sm text-muted-foreground">
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium">
                      <input 
                        type="checkbox" 
                        className="rounded border-muted cursor-pointer"
                        checked={selectAll}
                        onChange={(e) => setSelectAll(e.target.checked)}
                      />
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400">EMAIL</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400">CONTACT</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400">COMPANY</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400">TITLE</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400">EMAIL PROVIDER</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-gray-400">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {people
                    .filter(person => 
                      person.Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      person.Email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      person.Company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      person.Title?.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((person) => (
                      <tr key={person.id} className="border-b border-gray-200 text-sm hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <input type="checkbox" className="rounded border-muted cursor-pointer" />
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          <a href={`mailto:${person.Email}`} className="hover:text-blue-500">
                            {person.Email}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{person.Name}</td>
                        <td className="px-4 py-3 text-gray-600">{person.Company || 'Not specified'}</td>
                        <td className="px-4 py-3 text-gray-600">{person.Title || 'Not specified'}</td>
                        <td className="px-4 py-3 text-gray-600 flex items-center gap-1">
                          {person.provider === 'Google' && <FcGoogle size={20} />}
                          {person.provider}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {person.status === 'Verified' ? (
                              <div className="flex items-center gap-1 bg-blue-50 rounded-full px-2 py-0.5">
                                <CircleCheck size={17} className="text-blue-500" />
                                <span className="text-blue-500">Verified</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1.5">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span className="text-xs text-gray-400">Not yet contacted</span>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        {/* Opportunities Kanban Board */}
        {activeTab === "Opportunities" && (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b">
              <div className="relative w-full max-w-xs">
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
              <div className="flex gap-2 flex-wrap items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="flex items-center px-4 py-2 border border-gray-300 rounded-full text-gray-600">
                    {opportunityStatus}
                    <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
                  </Menu.Button>
                  <Menu.Items className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`w-full text-left px-4 py-2 text-sm ${active ? "bg-gray-100" : ""}`}
                          onClick={() => setOpportunityStatus('All statuses')}
                        >
                          All statuses
                        </button>
                      )}
                    </Menu.Item>
                    {Object.keys(statusConfig).map(status => (
                      <Menu.Item key={status}>
                        {({ active }) => (
                          <button
                            className={`w-full text-left px-4 py-2 text-sm ${active ? "bg-gray-100" : ""}`}
                            onClick={() => setOpportunityStatus(status)}
                          >
                            {status}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="flex items-center px-4 py-2 border border-gray-300 rounded-full text-gray-600">
                    {sortOrder}
                    <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
                  </Menu.Button>
                  <Menu.Items className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    {sortOptions.map(option => (
                      <Menu.Item key={option.value}>
                        {({ active }) => (
                <button
                            className={`w-full text-left px-4 py-2 text-sm ${active ? "bg-gray-100" : ""}`}
                            onClick={() => handleSortChange(option.value)}
                >
                            {option.label}
                </button>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
                <button className="bg-gradient-to-r from-teal-400 to-green-400 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-teal-500 hover:to-green-500 transition">Call with AI</button>
              </div>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-3 text-left font-medium"><input type="checkbox" className="rounded border-muted cursor-pointer" /></th>
                  <th className="px-4 py-3 text-left font-medium">Opportunity</th>
                  <th className="px-4 py-3 text-left font-medium">Contact Name</th>
                  <th className="px-4 py-3 text-left font-medium">Amount</th>
                  <th className="px-4 py-3 text-left font-medium">Owner</th>
                  <th className="px-4 py-3 text-left font-medium">Source</th>
                  <th className="px-4 py-3 text-left font-medium">Expected Closing Date</th>
                  <th className="px-4 py-3 text-left font-medium">Actual Closing Date</th>
                  <th className="px-4 py-3 text-left font-medium">Last Interaction</th>
                  <th className="px-4 py-3 text-left font-medium">Stage</th>
                  </tr>
                </thead>
              <tbody className="bg-white divide-y divide-gray-100 text-sm">
                {people
                  .filter(lead =>
                    (opportunityStatus === 'All statuses' || lead.Status === opportunityStatus) &&
                    (
                      lead.Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      lead.Company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      lead.Email?.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                  )
                  .map(lead => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3"><input type="checkbox" className="rounded border-muted cursor-pointer" /></td>
                      <td className="px-4 py-3 font-medium text-gray-900">{lead.Company || '-'}</td>
                      <td className="px-4 py-3 text-blue-600 underline cursor-pointer">{lead.Name}</td>
                      <td className="px-4 py-3">{lead.Amount ? `$${lead.Amount}` : '-'}</td>
                      <td className="px-4 py-3 text-blue-500">{lead.Owner || 'Beeto Leru'}</td>
                      <td className="px-4 py-3">{lead.Source || '-'}</td>
                      <td className="px-4 py-3">{lead.ExpectedClosingDate ? new Date(lead.ExpectedClosingDate).toLocaleDateString() : '-'}</td>
                      <td className="px-4 py-3">{lead.ActualClosingDate ? new Date(lead.ActualClosingDate).toLocaleDateString() : '-'}</td>
                      <td className="px-4 py-3">{lead.LastInteraction ? new Date(lead.LastInteraction).toLocaleString() : '-'}</td>
                      <td className="px-4 py-3">{lead.Status || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        {/* Calls Table */}
        {activeTab === "Calls" && (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-3 text-left font-medium">Contact Name</th>
                  <th className="px-4 py-3 text-left font-medium">Call Date</th>
                  <th className="px-4 py-3 text-left font-medium">Duration</th>
                  <th className="px-4 py-3 text-left font-medium">Phone Number</th>
                  <th className="px-4 py-3 text-left font-medium">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 text-sm">
                {calls
                  .filter(call => 
                    call.Lead?.Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    call.PhoneNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    call.Notes?.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map(call => (
                    <tr key={call.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 flex items-center gap-2 font-medium text-gray-900"><PhoneCall className="h-4 w-4 text-green-500" />{call.Lead ? call.Lead.Name : '-'}</td>
                      <td className="px-4 py-3">{call.CallDate ? new Date(call.CallDate).toLocaleDateString() : '-'}</td>
                      <td className="px-4 py-3">{call.CallDuration ? `${call.CallDuration} min` : '-'}</td>
                      <td className="px-4 py-3">{call.PhoneNumber || '-'}</td>
                      <td className="px-4 py-3">{call.Notes || '-'}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Meetings Table */}
        {activeTab === "Meetings" && (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-3 text-left font-medium">Topic</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-left font-medium">Time</th>
                  <th className="px-4 py-3 text-left font-medium">Contact Name</th>
                  <th className="px-4 py-3 text-left font-medium">Host</th>
                  <th className="px-4 py-3 text-left font-medium">Meeting Link</th>
                  <th className="px-4 py-3 text-left font-medium">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 text-sm">
                {meetings
                  .filter(meeting => 
                    meeting.Topic?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    meeting.Lead?.Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    meeting.User?.Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    meeting.Notes?.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map(meeting => (
                    <tr key={meeting.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 flex items-center gap-2 font-medium text-gray-900"><CalendarDays className="h-4 w-4 text-blue-500" />{meeting.Topic}</td>
                      <td className="px-4 py-3">{meeting.MeetingDate ? new Date(meeting.MeetingDate).toLocaleDateString() : '-'}</td>
                      <td className="px-4 py-3">{meeting.MeetingTime || '-'}</td>
                      <td className="px-4 py-3">{meeting.Lead ? meeting.Lead.Name : '-'}</td>
                      <td className="px-4 py-3">{meeting.User ? meeting.User.Name : '-'}</td>
                      <td className="px-4 py-3">
                        {meeting.Meeting_Link ? <a href={meeting.Meeting_Link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Join</a> : '-'}</td>
                      <td className="px-4 py-3">{meeting.Notes || '-'}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Other tabs content */}
        {!["Accounts", "People", "Opportunities", "Calls", "Meetings"].includes(activeTab) && (
          <div className="text-center py-10 text-gray-500">
            {activeTab} tab content will be implemented soon
          </div>
        )}
      </div>
    </div>
  );
}
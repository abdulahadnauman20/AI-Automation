import React, { useState, useEffect } from 'react';
import { Play, Pause, MoreHorizontal, Search, Filter, PlusCircle, ChevronDown, CheckCircle, AlertCircle, Circle, ArrowUpDown, X, Zap, Plus, SquarePen, ShieldX, CircleCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCampaignQuery } from "../reactQuery/hooks/useCampaignQuery";

function Campaigns() {
  // const [campaigns, setCampaigns] = useState([
  //   {
  //     id: 1,
  //     name: 'SMB Target',
  //     status: 'Error',
  //     progress: 12,
  //     sent: 1500,
  //     clicks: 58,
  //     replies: 20,
  //     replyRate: 2,
  //     opportunities: 5
  //   },
  //   {
  //     id: 2,
  //     name: 'My Campaign',
  //     status: 'Active',
  //     progress: 72,
  //     sent: 89,
  //     clicks: 0,
  //     replies: 0,
  //     replyRate: 0,
  //     opportunities: 0
  //   }
  // ]);

  const {
    campaignsObject,
    // isCampaignsLoading,
    // createCampaignMutation,
    // deleteCampaignMutation,
    // updateCampaignMutation,
  } = useCampaignQuery();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [sortOrder, setSortOrder] = useState('Oldest first');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');
  const [campaigns, setCampaigns] = useState([]);

  const statusOptions = [
    { name: "All Statuses", icon: "⚡" },
    { name: "Active", icon: <Play size={20} className="text-blue-400" /> },
    { name: "Draft", icon: <SquarePen size={20} className="text-gray-600" /> },
    { name: "Paused", icon: <Pause size={20} className="text-orange-400" /> },
    { name: "Error", icon: <ShieldX size={20} className="text-red-600" /> },
    { name: "Completed", icon: <CircleCheck size={20} className="text-green-400" /> },
  ];

  const sortOptions = [
    { value: 'Newest first', label: 'Newest first' },
    { value: 'Oldest first', label: 'Oldest first' },
    { value: 'Name A - Z', label: 'Name A - Z' },
    { value: 'Name Z - A', label: 'Name Z - A' }
  ];

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setShowStatusDropdown(false);
  };

  const handleSortChange = (sort) => {
    setSortOrder(sort);
    setShowSortDropdown(false);
    const sortedCampaigns = [...campaigns];
    
    if (sort === 'Newest first') {
      sortedCampaigns.sort((a, b) => b.id - a.id);
    } else if (sort === 'Oldest first') {
      sortedCampaigns.sort((a, b) => a.id - b.id);
    } else if (sort === 'Name A - Z') {
      sortedCampaigns.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'Name Z - A') {
      sortedCampaigns.sort((a, b) => b.name.localeCompare(a.name));
    }

    setCampaigns(sortedCampaigns);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setShowStatusDropdown(false);
      setShowSortDropdown(false);
    };
    console.log(campaigns);

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };

    
  }, []);

  useEffect(() => {
    console.log("H: ", campaignsObject);

    setCampaigns(campaignsObject?.campaigns || []);
    console.log("Campaigns: ", campaigns);
  }, [campaignsObject])

  useEffect(() => {
    console.log("Updated campaigns state:", campaigns);
  }, [campaigns]);

  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  const handleCreateCampaign = () => {
    if (newCampaignName.trim()) {
      const newCampaign = {
        id: campaigns.length + 1,
        name: newCampaignName.trim(),
        status: 'Draft',
        progress: 0,
        sent: 0,
        clicks: 0,
        replies: 0,
        replyRate: 0,
        opportunities: 0
      };
      
      setCampaigns([...campaigns, newCampaign]);
      setNewCampaignName('');
      setShowNewCampaignModal(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      <main className="max-w-7xl px-3 py-6 overflow-hidden">
        {/* Filters and actions */}
        <div className="flex flex-col md:flex-row gap-2 justify-between mb-6">
          <div className="relative rounded-md w-64">
            <div className="relative flex items-center w-72">
            <Search size={20} className="absolute left-3 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 outline-none text-gray-700"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          </div>
          <div className="flex flex-col w-52 md:w-auto gap-2 md:flex-row space-x-4">
            <div className="relative">
              <button
                type="button"
                className="inline-flex items-center cursor-pointer justify-center w-full rounded-full border border-gray-300 px-4 py-2 bg-white text-sm font-medium gap-1 text-gray-400 hover:bg-gray-50 focus:outline-none"
                id="filter-menu"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowStatusDropdown(!showStatusDropdown);
                  setShowSortDropdown(false);
                }}
              >
                <Zap size={18} className='text-gray-400' />
                {statusFilter}
                <ChevronDown size={16} className="ml-2 text-gray-400" />
              </button>
              
              {/* Status dropdown */}
              {showStatusDropdown && (
                <div 
                  className="origin-top-right absolute right-0 left-1 mt-2 w-56 rounded-md shadow-lg bg-white border-gray-300 ring-opacity-5 focus:outline-none z-10"
                  onClick={handleDropdownClick}
                >
                  <div className="py-1">
                    {statusOptions.map((option) => (
                      <button
                        key={option.name}
                        className="w-full text-left px-4 py-2 text-sm hover:text-[#15a395] hover:bg-[#defffcf7] flex gap-2 items-center"
                        onClick={() => handleStatusChange(option.name)}>
                        {option.icon} {option.name} 
                        <hr className="text-gray-100" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                className="inline-flex justify-center cursor-pointer w-full rounded-full border border-gray-300 px-4 py-2 bg-white text-sm font-medium gap-1 text-gray-400 hover:bg-gray-50 focus:outline-none"
                id="sort-menu"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSortDropdown(!showSortDropdown);
                  setShowStatusDropdown(false);
                }}
              >
                {sortOrder}
                <ChevronDown size={16} className="ml-2 text-gray-400" />
              </button>
              
              {/* Sort dropdown */}
              {showSortDropdown && (
                <div 
                  className="origin-top-right absolute right-0 left-1 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                  onClick={handleDropdownClick}
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center ${
                          sortOrder === option.value ? 'text-teal-600 font-medium' : 'text-gray-700'
                        }`}
                        onClick={() => handleSortChange(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => setShowNewCampaignModal(true)} type="button" className="text-white flex justify-center bg-teal-600 hover:bg-teal-600 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
              <Plus size={18} className="mr-2" />
              Add new
            </button>
          </div>
        </div>

        {/* Campaigns table */}
        <div className="bg-white shadow overflow-x-auto sm:rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sent
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Click
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Replies
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Opportunities
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="sr-only">More</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* <Link to='/campaigns/target/'> */}
                    <Link to={`/campaigns/target/${campaign.id}`}>
                      <div className="text-sm font-medium text-gray-900">{campaign.Name}</div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      campaign.Status === 'Active' ? 'bg-blue-100 text-blue-800' : 
                      campaign.Status === 'Error' ? 'bg-red-100 text-red-800' : 
                      campaign.Status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
                      campaign.Status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {campaign.Status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-32">
                      <div className="bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            campaign.status === 'Active' ? 'bg-teal-500' : 
                            campaign.status === 'Error' ? 'bg-red-500' :
                            campaign.status === 'Completed' ? 'bg-green-500' :
                            'bg-yellow-500'
                          }`} 
                          style={{ width: `${campaign.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{campaign.progress}%</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.sent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.clicks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-1">
                    <div className="text-sm text-gray-400 font-bold">{campaign.replies}</div>
                    <p className='w-0.5 h-4 border text-gray-400 rounded'></p>
                    <div className="text-xs text-gray-400">{campaign.replyRate}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.opportunities}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.status === 'Active' ? (
                      <button className="text-gray-400 hover:text-gray-500">
                        <Pause size={18} />
                      </button>
                    ) : (
                      <button className="text-gray-400 hover:text-gray-500">
                        <Play size={18} />
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* New Campaign Modal */}
      {showNewCampaignModal && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          {/* Overlay */}
          <div className="fixed inset-0 bg-opacity-25" onClick={() => setShowNewCampaignModal(false)}></div>
          
          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full ms-16 me-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Let's create a new campaign</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setShowNewCampaignModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-6">
              <label htmlFor="campaign-name" className="block text-sm font-medium text-gray-700 mb-2">
                What would you like to name it?
              </label>
              <input
                type="text"
                id="campaign-name"
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="My Campaign"
                value={newCampaignName}
                onChange={(e) => setNewCampaignName(e.target.value)}
                autoFocus
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={() => setShowNewCampaignModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={handleCreateCampaign}
                disabled={!newCampaignName.trim()}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Campaigns;
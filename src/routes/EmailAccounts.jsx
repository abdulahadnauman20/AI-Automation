import React, { useState, useEffect } from "react";
import { FaEllipsisH, FaFilter, FaChevronDown } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEmailAccountQuery } from "../reactQuery/hooks/useEmailAccountsQuery";
import { ChevronDown, ChevronLeft, CircleCheck, CircleCheckBig, Pause, Play, ShieldX, SquarePen, Zap } from "lucide-react";


// OAuth Callback Component
const OAuthCallback = () => {
  const [status, setStatus] = useState('Processing...');
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get all URL parameters
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        const error = params.get('error');
        const provider = params.get('provider') || 'microsoft'; // Default to microsoft if not specified

        // Get Google-specific parameters if provider is Google
        // make all the letters of provider small
        const lowerCaseProvider = provider.toLowerCase();
        let callbackUrl;
        console.log(lowerCaseProvider);
        if (lowerCaseProvider === 'google') {
          const scope = params.get('scope');
          const authuser = params.get('authuser');
          const prompt = params.get('prompt');
          callbackUrl = `https://quick-pipe-backend.vercel.app/EmailAccount/google/callback?code=${code}&scope=${scope}&authuser=${authuser}&prompt=${prompt}`;
        } else {
          // Microsoft callback only needs the code
          callbackUrl = `https://quick-pipe-backend.vercel.app/EmailAccount/microsoft/callback?code=${code}`;
        }

        if (error) {
          setStatus(`Error: ${error}`);
          return;
        }

        if (!code) {
          setStatus('No authorization code received');
          return;
        }

        // Get token from localStorage
        const tokenData = localStorage.getItem('Token');
        if (!tokenData) {
          setStatus('No authentication token found');
          return;
        }

        const { token } = JSON.parse(tokenData);

        console.log('Making callback request to:', callbackUrl);

        // Send the request to your backend
        const response = await axios.get(callbackUrl, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Callback response:', response.data);

        if (response.data.success) {
          setStatus('Successfully connected!');
          // Close this window and notify the opener
          window.opener.postMessage({
            type: 'OAUTH_SUCCESS',
            data: response.data,
            provider: provider
          }, window.opener.origin);
          setTimeout(() => window.close(), 2000);
        } else {
          setStatus('Failed to connect: ' + response.data.message);
        }
      } catch (error) {
        console.error('Callback error:', error);
        setStatus('Error: ' + (error.response?.data?.message || error.message));
      }
    };

    handleCallback();
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Connecting Your Account</h2>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#15A395] mx-auto mb-4"></div>
          <p className="text-gray-600">{status}</p>
        </div>
      </div>
    </div>
  );
};

const EmailAccounts = () => {
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showAccountsPage, setShowAccountsPage] = useState(false);
  const [authWindow, setAuthWindow] = useState(null);
  const [error, setError] = useState(null);
  const[isOpen, setIsOpen] = useState(false);

  const listItems = [
  { name: "All Statuses", icon: "⚡" },
  { name: "Active", icon: <Play size={20} className="text-blue-400" /> },
  { name: "Draft", icon: <SquarePen size={20} className="text-gray-600" /> },
  { name: "Paused", icon: <Pause size={20} className="text-orange-400" /> },
  { name: "Error", icon: <ShieldX size={20} className="text-red-600" /> },
  { name: "Completed", icon: <CircleCheck size={20} className="text-green-400" /> },
]

  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [sortOrder, setSortOrder] = useState('Oldest first');
  const [campaigns, setCampaigns] = useState([]);
  const sortOptions = [
    { value: 'Newest first', label: 'Newest first' },
    { value: 'Oldest first', label: 'Oldest first' },
    { value: 'Name A - Z', label: 'Name A - Z' },
    { value: 'Name Z - A', label: 'Name Z - A' }
  ];


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

  
  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  // Get email accounts data from the query
  const { emailAccountsObject, isEmailAccountsLoading, emailAccountsError } = useEmailAccountQuery();

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelected([]);
    } else {
      setSelected(emailAccountsObject?.emailAccounts?.map((account) => account.id) || []);
    }
    setSelectAll(!selectAll);
  };

  // Function to validate OAuth URL
  const validateOAuthUrl = (url) => {
    try {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);

      const missingParams = [];
      if (!params.get('client_id')) missingParams.push('client_id');
      if (!params.get('redirect_uri') || params.get('redirect_uri').includes('undefined')) {
        missingParams.push('redirect_uri');
      }
      if (!params.get('scope')) missingParams.push('scope');
      if (!params.get('response_type')) missingParams.push('response_type');

      if (missingParams.length > 0) {
        throw new Error(`Missing or invalid parameters: ${missingParams.join(', ')}`);
      }

      return true;
    } catch (error) {
      console.error('URL validation error:', error);
      return false;
    }
  };

  // Function to handle Google OAuth
  const handleGoogleAuth = async () => {
    try {
      setError(null);
      // Get token from localStorage
      const tokenData = localStorage.getItem('Token');
      console.log('Token from localStorage:', tokenData);

      if (!tokenData) {
        setError('No authentication token found');
        console.error('No authentication token found');
        return;
      }

      const { token } = JSON.parse(tokenData);
      console.log('Extracted token:', token);

      // Get the Google OAuth URL from your backend
      console.log('Making request to backend...');
      const response = await axios.get('https://quick-pipe-backend.vercel.app/EmailAccount/ReadyGmailAccount', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Full backend response:', response);
      console.log('Response data:', response.data);
      console.log('Auth URL from backend:', response.data.url);

      if (response.data.success) {
        const authUrl = response.data.url;

        // Validate the URL before opening
        if (!validateOAuthUrl(authUrl)) {
          setError('Invalid OAuth configuration. Please contact support.');
          console.error('Invalid OAuth URL:', authUrl);
          return;
        }

        console.log('Opening Google auth URL:', authUrl);
        const width = 500;
        const height = 600;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        const authWindow = window.open(
          authUrl,
          'Google Auth',
          `width=${width},height=${height},left=${left},top=${top}`
        );

        // Listen for the success message from the callback page
        const handleMessage = (event) => {
          if (event.data.type === 'OAUTH_SUCCESS') {
            console.log('OAuth successful:', event.data);
            // Update your UI or refresh data here
            authWindow.close();
          }
        };

        window.addEventListener('message', handleMessage);

        // Add event listener for window close
        const checkWindow = setInterval(() => {
          if (authWindow.closed) {
            console.log('Auth window was closed');
            clearInterval(checkWindow);
            window.removeEventListener('message', handleMessage);
            // You might want to refresh the page or update the UI here
          }
        }, 1000);

      } else {
        setError(response.data.message || 'Failed to get Google auth URL');
        console.error('Failed to get Google auth URL:', response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      setError(errorMessage);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
    }
  };

  // Function to handle Microsoft OAuth
  const handleMicrosoftAuth = async () => {
    try {
      setError(null);
      // Get token from localStorage
      const tokenData = localStorage.getItem('Token');
      console.log('Token from localStorage:', tokenData);

      if (!tokenData) {
        setError('No authentication token found');
        console.error('No authentication token found');
        return;
      }

      const { token } = JSON.parse(tokenData);
      console.log('Extracted token:', token);

      // Get the Microsoft OAuth URL from your backend
      console.log('Making request to backend...');
      const response = await axios.get('https://quick-pipe-backend.vercel.app/EmailAccount/ReadyMicrosoftAccount', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Full backend response:', response);
      console.log('Response data:', response.data);
      console.log('Auth URL from backend:', response.data.url);

      if (response.data.success) {
        const authUrl = response.data.url;

        // Validate the URL before opening
        if (!authUrl) {
          setError('Invalid OAuth configuration. Please contact support.');
          console.error('Invalid OAuth URL:', authUrl);
          return;
        }

        console.log('Opening Microsoft auth URL:', authUrl);
        const width = 500;
        const height = 600;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        let authWindow = null;
        try {
          authWindow = window.open(
            authUrl,
            'Microsoft Auth',
            `width=${width},height=${height},left=${left},top=${top}`
          );

          if (!authWindow) {
            throw new Error('Popup window was blocked. Please allow popups for this site.');
          }

          // Listen for the success message from the callback page
          const handleMessage = (event) => {
            if (event.data.type === 'OAUTH_SUCCESS' && event.data.provider === 'microsoft') {
              console.log('Microsoft OAuth successful:', event.data);
              // Update your UI or refresh data here
              if (authWindow) {
                authWindow.close();
              }
            }
          };

          window.addEventListener('message', handleMessage);

          // Add event listener for window close
          const checkWindow = setInterval(() => {
            if (authWindow && authWindow.closed) {
              console.log('Auth window was closed');
              clearInterval(checkWindow);
              window.removeEventListener('message', handleMessage);
              // You might want to refresh the page or update the UI here
            }
          }, 1000);

        } catch (windowError) {
          console.error('Error opening auth window:', windowError);
          setError(windowError.message || 'Failed to open authentication window. Please allow popups for this site.');
        }

      } else {
        setError(response.data.message || 'Failed to get Microsoft auth URL');
        console.error('Failed to get Microsoft auth URL:', response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      setError(errorMessage);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
    }
  };

  const AccountsSelectionPage = () => (
    <div className="p-4 md:p-24 px-auto pt-[20px] md:pt-[40px] bg-white min-h-screen flex justify-center flex-col">
      <div className="flex items-center mb-4">
        <button
          onClick={() => setShowAccountsPage(false)}
          className="flex items-center font-bold cursor-pointer text-gray-600 hover:text-gray-800">
            <ChevronLeft /> Back
        </button>
      </div>

      <div className="grid md:grid-cols-3 mx-auto gap-3 mt-8 max-w-5xl">
        {/* First Card */}
        <div className="border border-gray-200 rounded-2xl p-4 flex flex-col w-[275px] md:w-auto">
          <div className="flex justify-center mb-4">
            <img src="/src/assets/customer-support.jpeg" alt="Email setup" className="w-70 h-40 object-contain" />
          </div>
          <h3 className="text-lg font-semibold text-center mb-4">Ready-to-send accounts</h3>
          <Link to="/email-domain">
            <button className="bg-[#15A395] cursor-pointer text-white py-2 px-4 rounded-full w-full mb-6">
              Continue
            </button>
          </Link>

          <div className="space-y-4 mt-2">
            <div className="flex items-center gap-1">
              <CircleCheckBig size={17} className="text-gray-400" />
              <span className="text-sm text-gray-600">Ready-to-use accounts & domains</span>
            </div>
            <div className="flex items-center gap-1">
              <CircleCheckBig size={17} className="text-gray-400" />
              <span className="text-sm text-gray-600">Launch your outreach immediately</span>
            </div>
            <div className="flex items-center gap-1">
              <CircleCheckBig size={17} className="text-gray-400" />
              <span className="text-sm text-gray-600">Expand your campaigns seamlessly</span>
            </div>
            <div className="flex items-center gap-1">
              <CircleCheckBig size={17} className="text-gray-400" />
              <span className="text-sm text-gray-600">Enhanced email deliverability</span>
            </div>
            <div className="flex items-center gap-1">
              <CircleCheckBig size={17} className="text-gray-400" />
              <span className="text-sm text-gray-600">Premium US-based IP accounts</span>
            </div>
          </div>
        </div>

        {/* Second Card */}
        <div className="border border-gray-200 rounded-lg p-6 flex flex-col w-[275px] md:w-auto">
          <div className="flex justify-center mb-4">
            <img src="/src/assets/send-message.jpeg" alt="Hassle-free setup" className="w-70 h-40 object-contain" />
          </div>
          <h3 className="text-lg font-semibold text-center mb-4">Hassle-free email setup</h3>

          <div className="mb-6">
            <button
              onClick={handleGoogleAuth}
              className="flex items-center justify-center cursor-pointer bg-gray-100 text-gray-800 py-2 px-4 rounded-full w-full mb-2 hover:bg-gray-200 transition-colors"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 mr-2" />
              Gmail/ Google Suite
            </button>
          </div>

          <div className="space-y-4 mt-2 gap-1">
            <div className="flex items-center">
              <CircleCheckBig size={17} className="text-gray-400" />
              <span className="text-sm text-gray-600">Accounts set up for you</span>
            </div>
            <div className="flex items-center gap-1">
              <CircleCheckBig size={17} className="text-gray-400" />
              <span className="text-sm text-gray-600">Pick your domain & account names</span>
            </div>
            <div className="flex items-center gap-1">
              <CircleCheckBig size={17} className="text-gray-400" />
              <span className="text-sm text-gray-600">Seamless auto-reconnect</span>
            </div>
            <div className="flex items-center gap-1">
              <CircleCheckBig size={17} className="text-gray-400" />
              <span className="text-sm text-gray-600">Cut costs & boost efficiency</span>
            </div>
            <div className="flex items-center gap-1">
              <CircleCheckBig size={17} className="text-gray-400" />
              <span className="text-sm text-gray-600">Premium US-based IP accounts</span>
            </div>
          </div>
        </div>

        {/* Third Card */}
        <div className="border border-gray-200 rounded-lg p-6 flex flex-col w-[275px] md:w-auto">
          <div className="flex justify-center mb-4">
            <img src="/src/assets/businessman-sends-marketing-mails (1).jpeg" alt="Ready accounts" className="w-70 h-40 object-contain" />
          </div>
          <h3 className="text-lg font-semibold text-center mb-4">Ready-to-send accounts</h3>

          <div className="mb-6 space-y-2">
            {/* <button className="flex items-center justify-center bg-gray-100 text-gray-800 py-2 px-4 rounded-full w-full">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 mr-2" />
              Gmail/ Google Suite
            </button> */}
            <button
              onClick={handleMicrosoftAuth}
              className="flex items-center justify-center cursor-pointer bg-gray-100 text-gray-800 py-2 px-4 rounded-full w-full mb-2 hover:bg-gray-200 transition-colors"
            >
              <img src="https://c.s-microsoft.com/favicon.ico" alt="Microsoft" className="w-4 h-4 mr-2" />
              Microsoft Office 365 Suite
            </button>
            {error && (
              <div className="text-red-500 text-sm mt-2 text-center">
                {error}
              </div>
            )}
            {/* <button className="flex items-center justify-center bg-gray-100 text-gray-800 py-2 px-4 rounded-full w-full">
              SMTP/IMAP
            </button> */}
          </div>

          <div className="space-y-4 mt-2">
            <div className="flex items-center gap-1">
              <CircleCheckBig size={17} className="text-gray-400" />
              <span className="text-sm text-gray-600">Connect any IMAP or SMTP email provider</span>
            </div>
            <div className="flex items-center gap-1">
              <CircleCheckBig size={17} className="text-gray-400" />
              <span className="text-sm text-gray-600">Sync up replies in the Multibox</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showAccountsPage ? (
        <AccountsSelectionPage />
      ) : (
        <div className="bg-white overflow-auto min-h-screen pl-[5px] md:px-[140px] pt-[10px] md:pt-[35px] text-gray-400 flex flex-col  align-center text-sm">
          <div className="flex items-center justify-between mb-4 flex-col md:flex-row gap-2 md:mx-5">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border border-gray-300 rounded-full md:w-1/3 w-full"
            />
            <div className="flex md:gap-4 gap-1 items-center ">
              <div className="relative inline-block text-left">
             <button
                  onClick={() => setIsOpen(!isOpen)}  
                  className="px-4 cursor-pointer relative py-2 border border-gray-300 text-gray-400 rounded-full flex gap-1 items-center"
                >
                 <Zap size={18} className="text-gray-400" /> All Statuses <ChevronDown className="text-gray-400" />
                </button>
                {isOpen && (
                  <div className="absolute z-10 mt-2 bg-white shadow-md w-44 rounded-lg">
                    <ul className="py-2 text-sm text-gray-700">
                      {listItems.map((val, index) => (
                        <li key={index} className="px-4 py-2 flex gap-2 items-center hover:bg-gray-100">
                          {val.icon} {val.name}
                        </li>
                      ))}
                    </ul>
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
            
            {showSortDropdown && (
            <div 
                className="origin-top-right absolute right-0 left-1 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 border-none focus:outline-none z-10"
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
              <button className="px-3 py-2 cursor-pointer bg-[#15A395] text-white rounded-full"
                onClick={() => setShowAccountsPage(true)}>
                + Add new
              </button>
            </div>
          </div>

          <div className="overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 font-medium py-4">
                  <th className="text-left py-4 pl-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="w-3 h-3 text-green-500"
                      />
                      Email Address
                    </div>
                  </th>
                  <th className="text-center py-4">Email Sent</th>
                  <th className="text-center py-4">Warmup Emails</th>
                  <th className="text-center py-4">Health Score</th>
                  <th className="w-[50px]"></th>
                </tr>
              </thead>
              <tbody>
                {isEmailAccountsLoading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">Loading email accounts...</td>
                  </tr>
                ) : emailAccountsError ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-red-500">Error loading email accounts</td>
                  </tr>
                ) : (
                  emailAccountsObject?.emailAccounts?.map((account) => (
                    <tr
                      key={account.id}
                      className={`transition-all cursor-pointer ${selected.includes(account.id) ? "bg-[#c3ffe8]" : "hover:bg-[#e4fff5]"
                        } text-gray-500`}
                      onClick={() => toggleSelect(account.id)}
                    >
                      <td className="py-4 pl-4">
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            checked={selected.includes(account.id)}
                            onChange={(e) => {
                              e.stopPropagation(); // Prevent row click when clicking checkbox
                              toggleSelect(account.id);
                            }}
                            className="w-3 h-3 text-green-500"
                          />
                          <div
                            className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-full text-white font-bold ${account.bgColor || "bg-gray-300"
                              }`}
                          >
                            {account.initials || (account.Email ? account.Email.charAt(0).toUpperCase() : '?')}
                          </div>
                          <span className="truncate">{account.name || account.Email || 'Unnamed Account'}</span>
                        </div>
                      </td>
                      <td className="text-center py-4">{account.emailsSent || "0 of 0"}</td>
                      <td className="text-center py-4">{account.warmupEmails || "0"}</td>
                      <td className="text-center py-4">{account.healthScore || "0%"}</td>
                      <td className="text-gray-600 cursor-pointer py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end pr-4">
                          <FaEllipsisH />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export { OAuthCallback };
export default EmailAccounts;
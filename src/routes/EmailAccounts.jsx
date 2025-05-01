import React, { useState, useEffect } from "react";
import { FaEllipsisH, FaFilter, FaChevronDown } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const contacts = [
  {
    id: 1,
    name: "Support",
    email: "support@manaflow.com",
    emailsSent: "12 of 67",
    warmupEmails: "56",
    healthScore: "99%",
    initials: "S",
    bgColor: "bg-gray-300",
  },
  {
    id: 2,
    name: "Help",
    email: "help@manaflow.com",
    emailsSent: "0 of 32",
    warmupEmails: "0",
    healthScore: "99%",
    initials: "H",
    bgColor: "bg-red-300",
  },
  {
    id: 3,
    name: "Manager",
    email: "manager@manaflow.com",
    emailsSent: "11 of 89",
    warmupEmails: "78",
    healthScore: "98%",
    initials: "M",
    bgColor: "bg-yellow-300",
  },
  {
    id: 4,
    name: "HR",
    email: "hr@manaflow.com",
    emailsSent: "0 of 120",
    warmupEmails: "34",
    healthScore: "2%",
    initials: "HR",
    bgColor: "bg-green-300",
  },
  {
    id: 5,
    name: "CEO",
    email: "ceo@manaflow.com",
    emailsSent: "27 of 122",
    warmupEmails: "120",
    healthScore: "98%",
    initials: "CE",
    bgColor: "bg-purple-300",
  },
  {
    id: 6,
    name: "Branch Manager",
    email: "nybranchmanager@manaflow.com",
    emailsSent: "0 of 2",
    warmupEmails: "0",
    healthScore: "98%",
    initials: "BM",
    bgColor: "bg-yellow-500",
  },
];

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
        const provider = params.get('provider') || 'google'; // Default to google if not specified

        // Get Google-specific parameters if provider is Google
        let callbackUrl;
        if (provider === 'google' || 'Google' ) {
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

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelected([]);
    } else {
      setSelected(contacts.map((contact) => contact.id));
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
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <span className="mr-2">
            <FaBackward />
          </span> Back
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mt-8">
        {/* First Card */}
        <div className="border border-gray-200 rounded-2xl p-4 flex flex-col w-[275px] md:w-auto">
          <div className="flex justify-center mb-4">
            <img src="/src/assets/customer-support.jpeg" alt="Email setup" className="w-70 h-40 object-contain" />
          </div>
          <h3 className="text-lg font-semibold text-center mb-4">Ready-to-send accounts</h3>
          <button className="bg-[#15A395] text-white py-2 px-4 rounded-full w-full mb-6">
            Continue
          </button>

          <div className="space-y-4 mt-2">
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 rounded-full border border-gray-300 flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-600">Ready-to-use accounts & domains</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 rounded-full border border-gray-300 flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-600">Launch your outreach immediately</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 rounded-full border border-gray-300 flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-600">Expand your campaigns seamlessly</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 rounded-full border border-gray-300 flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-600">Enhanced email deliverability</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 rounded-full border border-gray-300 flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
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
              className="flex items-center justify-center bg-gray-100 text-gray-800 py-2 px-4 rounded-full w-full mb-2 hover:bg-gray-200 transition-colors"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 mr-2" />
              Gmail/ Google Suite
            </button>
          </div>

          <div className="space-y-4 mt-2">
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 rounded-full border border-gray-300 flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-600">Accounts set up for you</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 rounded-full border border-gray-300 flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-600">Pick your domain & account names</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 rounded-full border border-gray-300 flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-600">Seamless auto-reconnect</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 rounded-full border border-gray-300 flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-600">Cut costs & boost efficiency</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 rounded-full border border-gray-300 flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
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
              className="flex items-center justify-center bg-gray-100 text-gray-800 py-2 px-4 rounded-full w-full mb-2 hover:bg-gray-200 transition-colors"
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
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 rounded-full border border-gray-300 flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-600">Connect any IMAP or SMTP email provider</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 rounded-full border border-gray-300 flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
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
        <div className="bg-white overflow-auto min-h-screen pl-[5px] md:px-[140px] pt-[10px] md:pt-[35px] text-gray-400 flex flex-col md:justify-center align-center text-sm">
          <div className="flex items-center justify-between mb-4 flex-col md:flex-row gap-2 md:mx-5">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border border-gray-300 rounded-full md:w-1/3 w-full"
            />
            <div className="flex md:gap-4 gap-1 items-center ">
              <button className="flex items-center px-3 md:px-4 py-2 border border-gray-300 rounded-full text-sm">
                All Statuses
              </button>
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded-full">
                Oldest First
              </button>
              <button className="px-3 py-2 bg-[#15A395] text-white rounded-full"
                onClick={() => setShowAccountsPage(true)}>
                + Add new
              </button>
            </div>
          </div>

          <div className="overflow-auto">
            <div className="flex md:grid grid-cols-5 gap-2 md:gap-4 my-6 md:my-12 text-gray-400 font-medium pl-[12px] py-4 w-150 md:w-auto">
              <div className="flex items-center gap-2 w-[200px] md:w-auto">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-4 h-4 md:w-5 md:h-5 text-green-500"
                />
                Email Address
              </div>
              <div className="w-[100px] md:w-auto">Email Sent</div>
              <div className="w-[100px] md:w-auto">Warmup Emails</div>
              <div className="w-[100px] md:w-auto">Health Score</div>
            </div>

            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`flex jusitfy-between w-150 md:w-auto flex-shrink-0 md:grid grid-cols-5 gap-4 items-center p-4 rounded-lg transition-all ${selected.includes(contact.id) ? "bg-[#c3ffe8]" : "hover:bg-[#e4fff5]"
                  } text-gray-500`}
              >
                <div className="flex items-center md:gap-4 gap-2 w-[200px] md:w-auto">
                  <input
                    type="checkbox"
                    checked={selected.includes(contact.id)}
                    onChange={() => toggleSelect(contact.id)}
                    className="w-4 h-4 md:w-5 md:h-5 text-green-500"
                  />
                  <div
                    className={`md:w-10 md:h-10 h-8 w-8 shrink-0 flex items-center justify-center rounded-full text-white font-bold ${contact.bgColor}`}
                  >
                    {contact.initials}
                  </div>
                  <span>{contact.name}</span>
                </div>
                <div className="w-[100px] md:w-auto">{contact.emailsSent}</div>
                <div className="w-[100px] md:w-auto">{contact.warmupEmails}</div>
                <div className="w-[100px] md:w-auto">{contact.healthScore}</div>
                <div className="text-gray-600 w-[30px] md:w-auto cursor-pointer flex justify-end ">
                  <FaEllipsisH />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export { OAuthCallback };
export default EmailAccounts;
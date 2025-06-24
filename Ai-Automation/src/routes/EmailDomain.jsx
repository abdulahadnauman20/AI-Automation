import { useState, useEffect, useRef } from "react";
import { Check, CircleX, X, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { useEmailAccountQuery } from "../reactQuery/hooks/useEmailAccountsQuery";
import { useNavigate } from "react-router-dom";
import CreateDomain from "../components/CreateDomain";

// Add: fetch alternatives for a domain using GotAlt
async function fetchDomainAlternatives(domain) {
  try {
    // Call backend proxy with /integration prefix
    const url = `${import.meta.env.VITE_API_URL}integration/gotalt-alternatives?domain=${encodeURIComponent(domain)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch alternatives");
    const data = await res.json();
    // data.alternatives is an array of { url, name, description }
    return data.alternatives || [];
  } catch (err) {
    return null; // null means error
  }
}

export default function EmailDomain() {
  const { getDomainSuggestionsMutation, getDomainPricingMutation } = useEmailAccountQuery();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("new");
  const [domainExtensions, setDomainExtensions] = useState({
    com: true,
    co: false,
    org: true,
    net: false,
  });

  const [domainName, setDomainName] = useState("");
  const [selectedExtensions, setSelectedExtensions] = useState(["com", "org"]);
  const [domainSuggestions, setDomainSuggestions] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [suggestionLimit, setSuggestionLimit] = useState(10);

  const [existingDomains, setExistingDomains] = useState([]);
  const [existingLoading, setExistingLoading] = useState(false);
  const [existingError, setExistingError] = useState(false);

  const [domainAlternatives, setDomainAlternatives] = useState([]);
  const [altLoading, setAltLoading] = useState(false);
  const [altError, setAltError] = useState("");

  useEffect(() => {
    if (activeTab !== "existing") return;

    const fetchExistingDomains = async () => {
      setExistingLoading(true);
      setExistingError(false);
      const token = localStorage.getItem("Token")?.replace(/^"|"$/g, "");

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}EmailAccount/GetDomains`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.success) {
          setExistingDomains(data.domains || []);
        } else {
          setExistingError(true);
        }
      } catch (err) {
        console.error("Error fetching existing domains:", err);
        setExistingError(true);
      } finally {
        setExistingLoading(false);
      }
    };

    fetchExistingDomains();
  }, [activeTab]);

  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [categorizedDomains, setCategorizedDomains] = useState({
    premiumAvailable: [],
    nonPremiumAvailable: [],
    unavailablePremium: [],
    unavailableNonPremium: [],
  });

  const [error, setError] = useState(false); // For tracking API errors
  const [totalPrice, setTotalPrice] = useState(0); // For the total price from the API response

  // ⏳ Debounced suggestion fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!domainName.trim() || selectedExtensions.length === 0) return;
  
      getDomainSuggestionsMutation.mutate(
        {
          domain: domainName.trim(),
          tlds: selectedExtensions,
          limit: suggestionLimit,
        },
        {
          onSuccess: (data) => {
            setDomainSuggestions(data.Suggestions || []);
          },
          onError: (err) => {
            console.error("Error fetching domain suggestions", err);
          },
        }
      );
    }, 300);
  
    return () => clearTimeout(timer);
  }, [domainName, selectedExtensions, suggestionLimit]);
  
  // Fetch alternatives when domainName changes and is a valid domain
  useEffect(() => {
    if (!domainName || !domainName.includes(".")) {
      setDomainAlternatives([]);
      setAltError("");
      return;
    }
    setAltLoading(true);
    setAltError("");
    fetchDomainAlternatives(domainName)
      .then((alts) => {
        if (alts === null) {
          setAltError("Could not fetch alternatives. Try again later.");
          setDomainAlternatives([]);
        } else {
          setDomainAlternatives(alts);
        }
      })
      .catch(() => {
        setAltError("Could not fetch alternatives. Try again later.");
        setDomainAlternatives([]);
      })
      .finally(() => setAltLoading(false));
  }, [domainName]);

  const handleExtensionToggle = (ext) => {
    const updated = { ...domainExtensions, [ext]: !domainExtensions[ext] };
    setDomainExtensions(updated);
    setSelectedExtensions(Object.keys(updated).filter((k) => updated[k]));
  };

  const handleDomainSelection = (domain) => {
    const alreadySelected = selectedDomains.find((d) => d.name === domain);

    if (alreadySelected) {
      setSelectedDomains((prev) => prev.filter((d) => d.name !== domain));
    } else {
      const newDomain = { name: domain, price: null, fetched: false, error: false };
      setSelectedDomains((prev) => [...prev, newDomain]);
    }
  };

  const handleConfirm = () => {
    setShowConfirmModal(true);  // Show the modal immediately
    setCategorizedDomains({});  // Reset categorized domains
    setLoading(true); // Show loading state in the modal
    setError(false);

    const domainNames = selectedDomains.map((d) => d.name);

    console.log(domainNames);

    getDomainPricingMutation.mutateAsync({
      Domains: domainNames,
    })
    .then((res) => {
      console.log(res);
      const { Available, Unavailable } = res.prices;

      // Categorize domains based on availability and premium status
      const categorized = {
        premiumAvailable: Available.PremiumDomains,
        nonPremiumAvailable: Available.NonPremiumDomains,
        unavailablePremium: Unavailable.PremiumDomains,
        unavailableNonPremium: Unavailable.NonPremiumDomains,
      };

      setCategorizedDomains(categorized);
      setTotalPrice(res.totalPrice);
      setLoading(false); // Stop the loader when data is available
    })
    .catch((err) => {
      console.error("Error confirming domains", err);
      setError(true)
      setLoading(false); // Stop the loader in case of an error
    });
  };
  
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRY_COUNT = 3;

  const handleRetry = () => {
    if (!error) return;
    setLoading(true);
    setError(false);
    setCategorizedDomains({});

    getDomainPricingMutation
      .mutateAsync({ Domains: selectedDomains.map((d) => d.name) })
      .then((res) => {
        const { Available, Unavailable } = res.prices;

        const categorized = {
          premiumAvailable: Available.PremiumDomains,
          nonPremiumAvailable: Available.NonPremiumDomains,
          unavailablePremium: Unavailable.PremiumDomains,
          unavailableNonPremium: Unavailable.NonPremiumDomains,
        };

        setCategorizedDomains(categorized);
        setTotalPrice(res.totalPrice); // Set the total price from the API response
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error confirming domains", err);
        setError(true);
        setLoading(false);
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mb-12">
      {/* Tabs */}
      <div className="flex border-none">
        {["new", "existing", "create"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 font-medium cursor-pointer ${
              activeTab === tab ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "new" ? "New Domain" : tab === "existing"? "Existing Domains" : "Create New Domain" }
          </button>
        ))}
      </div>

      {activeTab === "new" && (
        <div className="space-y-6 mt-6">
          <input
            type="text"
            placeholder="Type your domain name to start"
            value={domainName}
            onChange={(e) => setDomainName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
          />

          {/* Domain extensions */}
          <div className="flex gap-6">
            {Object.keys(domainExtensions).map((ext) => (
              <label key={ext} className="flex items-center gap-2 cursor-pointer">
                <div
                  className={`w-4 h-4 border rounded flex items-center justify-center ${
                    domainExtensions[ext] ? "bg-teal-500 border-teal-500" : "border-gray-300"
                  }`}
                >
                  {domainExtensions[ext] && <Check className="w-4 h-4 text-white" />}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={domainExtensions[ext]}
                  onChange={() => handleExtensionToggle(ext)}
                />
                <span>.{ext}</span>
              </label>
            ))}
          </div>

          {domainSuggestions.length > 0 && (
            <>
              <p className="font-bold text-black mb-0">Suggested</p>
              <div className="flex flex-wrap gap-2">
                {domainSuggestions.map((domain, idx) => {
                  const selected = selectedDomains.some((d) => d.name === domain);
                  return (
                    <p
                      key={idx}
                      className="flex items-center gap-2 mt-2 bg-teal-50 border w-fit text-[13px] border-teal-300 p-2 rounded-full cursor-pointer"
                      onClick={() => handleDomainSelection(domain)}
                    >
                      <span>{domain}</span>
                      {selected ? <CircleX size={17} /> : <Check size={17} />}
                    </p>
                  );
                })}
              </div>
              <button
                className="bg-[#15A395] text-white py-2 px-4 rounded-full mt-2 cursor-pointer"
                onClick={() => setSuggestionLimit((prev) => prev + 5)}
              >
                Search for more
              </button>
              {/* Show alternatives for the entered domain */}
              {altLoading && (
                <div className="mt-4 text-gray-500">Loading alternatives...</div>
              )}
              {altError && (
                <div className="mt-4 text-red-500">{altError}</div>
              )}
              {domainAlternatives.length > 0 && !altLoading && !altError && (
                <div className="mt-4">
                  <p className="font-bold text-black mb-1">Alternatives to <span className="text-teal-600">{domainName}</span>:</p>
                  <ul className="list-disc ml-6">
                    {domainAlternatives.map((alt, idx) => (
                      <li key={idx} className="mb-1">
                        <a href={alt.url.startsWith('http') ? alt.url : `https://${alt.url}`} target="_blank" rel="noopener noreferrer" className="text-teal-700 underline font-medium">{alt.name || alt.url}</a>
                        {alt.description && <span className="text-gray-600 ml-2">- {alt.description}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {selectedDomains.length > 0 && (
            <>
              <p className="font-semibold text-black mt-2">Selected Domains</p>
              <div className="space-y-2">
                {selectedDomains.map((domain, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex justify-between items-center border-2 border-teal-500 p-4 w-full rounded-2xl">
                      <span className="text-sm">{domain.name}</span>
                    </div>
                    <button
                      className="cursor-pointer"
                      onClick={() =>
                        setSelectedDomains((prev) => prev.filter((d) => d.name !== domain.name))
                      }
                    >
                      <X size={20} className="text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  className="bg-[#15A395] text-white py-2 px-4 rounded-full mt-2 cursor-pointer"
                  onClick={() => handleConfirm()}
                >
                  Confirm
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === "existing" && (
        <div className="py-8">
    {existingLoading ? (
      <p className="text-center text-gray-500">Loading your domains...</p>
    ) : existingError ? (
      <p className="text-center text-red-500">Failed to load domains. Please try again.</p>
    ) : existingDomains.length === 0 ? (
      <p className="text-center text-gray-500">You haven't purchased any domains yet.</p>
    ) : (
      <div className="space-y-4">
        {existingDomains.map((d, idx) => (
          <div
            key={d.id || idx}
            className="border border-gray-300 p-4 rounded-lg shadow-sm"
          >
            <p><strong>Domain:</strong> {d.DomainName}</p>
            <p><strong>Type:</strong> {d.Type}</p>
            <p><strong>Price:</strong> ${d.Price}</p>
            <p><strong>Renewal Price:</strong> ${d.RenewalPrice}</p>
            <p><strong>Transfer Price:</strong> ${d.TransferPrice}</p>
            {d.EapFee && <p><strong>EAP Fee:</strong> ${d.EapFee}</p>}
            <p><strong>Renewal Date:</strong> {new Date(d.RenewalDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    )}
  </div>
)}

        {activeTab === "create" && (
          <CreateDomain />
        )}

    
    {showConfirmModal && (
      <DomainConfirmModal
        isOpen={showConfirmModal}
        categorizedDomains={categorizedDomains}
        onClose={() => setShowConfirmModal(false)}
        onNext={() =>
          navigate("/payment", {
            state: {
              totalPrice,
              paymentIntentDomains: {
                PremiumDomains: categorizedDomains.premiumAvailable, // has domain, price, eapFee
                NonPremiumDomains: categorizedDomains.nonPremiumAvailable, // has domain, registerPrice, etc.
              },
            },
          })
        }
        loading={loading} // Pass loading state
        onRetry={handleRetry} // Pass retry handler
        error={error}
        totalPrice={totalPrice}
      />
    )}


    </div>
  );
}

const DomainConfirmModal = ({ isOpen, categorizedDomains, onClose, onNext, loading, onRetry, error, totalPrice }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-6">Confirm Your Domains</h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-gray-700">Loading pricing information...</p>
            <div className="animate-spin rounded-full border-4 border-teal-500 border-t-transparent w-10 h-10"></div>
          </div>
        ) : (
          <>
            {/* Conditional rendering of categories */}
            {categorizedDomains?.premiumAvailable?.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xl font-medium text-teal-600 mb-2">Premium Available</h3>
                {categorizedDomains.premiumAvailable.map((domain, idx) => (
                  <div key={idx} className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-800">{domain.domain}</span>
                    <span className="text-teal-500">${domain.price}</span>
                  </div>
                ))}
              </div>
            )}

            {categorizedDomains?.nonPremiumAvailable?.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xl font-medium text-teal-600 mb-2">Non-Premium Available</h3>
                {categorizedDomains.nonPremiumAvailable.map((domain, idx) => (
                  <div key={idx} className="flex justify-between py-2 border-gray-200">
                    <span className="text-gray-800">{domain.domain}</span>
                    <span className="text-teal-500">${domain.registerPrice}</span>
                  </div>
                ))}
              </div>
            )}

            {categorizedDomains?.unavailablePremium?.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xl font-medium text-teal-600 mb-2">Unavailable Premium</h3>
                {categorizedDomains.unavailablePremium.map((domain, idx) => (
                  <div key={idx} className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-800">{domain}</span>
                    <span className="text-red-500">Unavailable</span>
                  </div>
                ))}
              </div>
            )}

            {categorizedDomains?.unavailableNonPremium?.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xl font-medium text-teal-600 mb-2">Unavailable Non-Premium</h3>
                {categorizedDomains.unavailableNonPremium.map((domain, idx) => (
                  <div key={idx} className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-800">{domain}</span>
                    <span className="text-red-500">Unavailable</span>
                  </div>
                ))}
              </div>
            )}

            {/* Display Total Price */}
            <div className="flex justify-between items-center mt-4 border-t pt-4">
              <p className="text-lg font-semibold">Total Price:</p>
              <span className="text-teal-500 text-lg">$ {totalPrice}</span>
            </div>
          </>
        )}

        {/* Retry Button only visible if there was an error */}
        {!loading && error && (
          <div className="flex justify-between mt-6">
            <button
              onClick={onRetry}
              className="bg-yellow-400 text-white py-2 px-4 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Retry
            </button>
          </div>
        )}

        {/* Action buttons */}
        {!loading && !error && (
          <div className="flex justify-between mt-6">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Back
            </button>
            <button
              onClick={onNext}
              className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import { useState, useEffect, useRef } from "react";
import { Check, CircleX, X, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { useEmailAccountQuery } from "../reactQuery/hooks/useEmailAccountsQuery";

export default function EmailDomain() {
  const { getDomainSuggestionsMutation, getDomainPricingMutation } = useEmailAccountQuery();

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
  const [suggestionLimit, setSuggestionLimit] = useState(5);

  const priceQueue = useRef([]);
  const isFetching = useRef(false);

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
  

  const handleExtensionToggle = (ext) => {
    const updated = { ...domainExtensions, [ext]: !domainExtensions[ext] };
    setDomainExtensions(updated);
    setSelectedExtensions(Object.keys(updated).filter((k) => updated[k]));
  };

  const enqueuePriceFetch = (domainName) => {
    priceQueue.current.push(domainName);
  };

  // 🧠 Run queue one-by-one with delay
  useEffect(() => {
    const processQueue = async () => {
      if (isFetching.current || priceQueue.current.length === 0) return;

      isFetching.current = true;
      const domain = priceQueue.current.shift();

      try {
        const res = await getDomainPricingMutation.mutateAsync({ domains: [domain] });
        const priceInfo = res.prices[0];

        setSelectedDomains((prev) =>
          prev.map((d) =>
            d.name === domain
              ? { ...d, price: priceInfo.price, fetched: true, error: false }
              : d
          )
        );
      } catch (err) {
        console.error("Price fetch error for", domain);
        setSelectedDomains((prev) =>
          prev.map((d) =>
            d.name === domain ? { ...d, fetched: true, error: true } : d
          )
        );
      }

      setTimeout(() => {
        isFetching.current = false;
        processQueue(); // Continue next after 10s
      }, 10000);
    };

    const interval = setInterval(processQueue, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDomainSelection = (domain) => {
    const alreadySelected = selectedDomains.find((d) => d.name === domain);

    if (alreadySelected) {
      setSelectedDomains((prev) => prev.filter((d) => d.name !== domain));
    } else {
      const newDomain = { name: domain, price: null, fetched: false, error: false };
      setSelectedDomains((prev) => [...prev, newDomain]);
      enqueuePriceFetch(domain);
    }
  };

  const handleRetry = (domainName) => {
    setSelectedDomains((prev) =>
      prev.map((d) =>
        d.name === domainName ? { ...d, fetched: false, error: false, price: null } : d
      )
    );
    enqueuePriceFetch(domainName);
  };

  const getSubtotal = () => {
    return selectedDomains
      .filter((d) => d.price && !d.error)
      .reduce((sum, d) => sum + d.price, 0)
      .toFixed(2);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mb-12">
      {/* Tabs */}
      <div className="flex border-none">
        {["new", "existing"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 font-medium cursor-pointer ${
              activeTab === tab ? "text-teal-500 border-b-2 border-teal-500" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "new" ? "New Domain" : "Existing Domains"}
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
                      <div className="flex items-center gap-2">
                        {domain.fetched && domain.error ? (
                          <button onClick={() => handleRetry(domain.name)}>
                            <RotateCcw size={16} className="text-red-500" />
                          </button>
                        ) : domain.fetched && domain.price !== null ? (
                          <span className="text-sm text-gray-600">${domain.price.toFixed(2)}</span>
                        ) : (
                          <span className="text-xs text-gray-500">Fetching...</span>
                        )}
                      </div>
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
                <p className="text-gray-400 text-[14px] font-semibold">
                  Subtotal (Annual Domain Price): <span className="text-black"> ${getSubtotal()}</span>
                </p>
                <Link to="/email-domain-order">
                  <button className="bg-[#15A395] text-white py-1 px-4 rounded-full cursor-pointer">
                    Next
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === "existing" && (
        <div className="py-8 text-center text-gray-500">Your existing domains will appear here.</div>
      )}
    </div>
  );
}

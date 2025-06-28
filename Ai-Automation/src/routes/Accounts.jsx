import { ChevronDown, ChevronUp, CircleCheck, Clock, Globe, MapPin, Search } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../api/axios';

function Accounts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [people, setPeople] = useState({});
  const param = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/lead/GetAllLeads");
        const updatedLeads = response.data.leads.map((lead) => ({
          ...lead,
          status: lead.Status || "Not yet contacted",
          provider: lead.Email?.includes("@gmail.com")
            ? "Google"
            : lead.Email?.includes("@outlook.com")
            ? "Microsoft"
            : lead.Email?.includes("@yahoo.com")
            ? "Yahoo"
            : "Other",
        }));
        // Group by company
        const groupedByCompany = updatedLeads.reduce((acc, lead) => {
          const company = lead.Company || 'Unassigned';
          if (!acc[company]) acc[company] = [];
          acc[company].push(lead);
          return acc;
        }, {});
        setPeople(groupedByCompany);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [param.name]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          placeholder='Search emails...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="min-w-full overflow-auto">
        {(() => {
          const companyName = param.name || Object.keys(people)[0];
          const leads = people[companyName] || [];
          return (
            <div className="mb-8">
              {/* Company Card Header */}
              <div className="flex items-center gap-4 bg-gradient-to-r from-teal-100 to-green-100 rounded-xl p-6 mb-4 shadow">
                <div className="w-16 h-16 rounded-full bg-teal-400 flex items-center justify-center text-2xl font-bold text-white shadow">
                  {companyName[0]}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{companyName}</h2>
                  <div className="text-gray-500 text-sm">{leads.length} Contact{leads.length !== 1 ? 's' : ''}</div>
                </div>
              </div>
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="w-full bg-white rounded-lg">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-sm">
                      <th className="px-6 py-3 text-left font-semibold">Contact</th>
                      <th className="px-6 py-3 text-left font-semibold">Email</th>
                      <th className="px-6 py-3 text-left font-semibold">Company</th>
                      <th className="px-6 py-3 text-left font-semibold">Title</th>
                      <th className="px-6 py-3 text-left font-semibold">Provider</th>
                      <th className="px-6 py-3 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads
                      .filter(person =>
                        person.Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        person.Email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        person.Company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        person.Title?.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((person, idx) => (
                        <tr key={person.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          {/* Contact Avatar and Name */}
                          <td className="px-6 py-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-teal-200 flex items-center justify-center text-lg font-semibold text-teal-700">
                              {person.Name ? person.Name.split(' ').map(n => n[0]).join('').toUpperCase() : '?'}
                            </div>
                            <span className="font-medium text-gray-800">{person.Name}</span>
                          </td>
                          {/* Email */}
                          <td className="px-6 py-4">
                            <a href={`mailto:${person.Email}`} className="text-blue-600 hover:underline">
                              {person.Email}
                            </a>
                          </td>
                          {/* Company */}
                          <td className="px-6 py-4 text-gray-700">{person.Company || 'Not specified'}</td>
                          {/* Title */}
                          <td className="px-6 py-4 text-gray-700">{person.Title || 'Not specified'}</td>
                          {/* Provider */}
                          <td className="px-6 py-4 flex items-center gap-2">
                            {person.provider === 'Google' && <FcGoogle size={20} />}
                            <span className="text-gray-600">{person.provider}</span>
                          </td>
                          {/* Status */}
                          <td className="px-6 py-4">
                            {person.status === 'Verified' ? (
                              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 rounded-full px-3 py-1 text-xs font-semibold">
                                <CircleCheck size={15} /> Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 rounded-full px-3 py-1 text-xs font-medium">
                                <Clock className="h-4 w-4" /> Not yet contacted
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  )
}

export default Accounts
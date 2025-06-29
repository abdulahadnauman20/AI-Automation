import { Share2, ChevronDown, Zap, Eye, Hand, CircleCheck, CircleDollarSign, Play, Pause } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
    { name: "SEP", sent: 250, opens: 200, clicks: 150, opportunities: 100, conversions: 50 },
    { name: "OCT", sent: 150, opens: 120, clicks: 90, opportunities: 60, conversions: 30 },
    { name: "NOV", sent: 180, opens: 140, clicks: 100, opportunities: 80, conversions: 40 },
    { name: "DEC", sent: 220, opens: 170, clicks: 130, opportunities: 90, conversions: 60 },
];

const listItems = [
    { name: "All Statuses", icon: "⚡" },
    { name: "Play", icon: <Play size={20} className="text-blue-400" /> },
    { name: "Paused", icon: <Pause size={20} className="text-orange-400" /> },
    { name: "Completed", icon: <CircleCheck size={20} className="text-green-400" /> }
];

const box = [
    { amount: '214', icon: <Zap size={24} className="text-blue-500" />, text: "Sequence started", bg: "bg-blue-100" },
    { amount: '45%', icon: <Eye size={24} className="text-purple-500" />, text: "Open rate", bg: "bg-purple-100" },
    { amount: '67%', icon: <Hand size={24} className="text-pink-500" />, text: "Click rate", bg: "bg-pink-100" },
    { amount: '145', icon: <CircleDollarSign size={24} className="text-red-500" />, text: "Opportunities", bg: "bg-red-100" },
    { amount: '26', icon: <CircleDollarSign size={24} className="text-yellow-500" />, text: "Conversion", bg: "bg-yellow-100" },
];

function Analytics() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedView, setSelectedView] = useState("month");

    return (
        <div className="p-6 space-y-8 bg-gray-50 min-h-screen sm:px-8 md:px-16 lg:px-32 ">
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-4">
                <div className="flex rounded-full bg-gray-200 p-1">
                    <button
                        className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                            selectedView === "month" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-400"
                        }`}
                        onClick={() => setSelectedView("month")}
                    >
                        Month view
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                            selectedView === "week" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-400"
                        }`}
                        onClick={() => setSelectedView("week")}
                    >
                        Week view
                    </button>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <button className="flex items-center gap-2 text-gray-600 border border-gray-300 py-2 px-4 rounded-full md:text-md text-sm">
                        <Share2 className="md:h-4 md:w-4 w-3 h-3" />
                        Share
                    </button>
                    <div className="relative">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="px-4 py-2 border border-gray-300 text-gray-600 rounded-full flex gap-1 items-center text-sm md:text-md"
                        >
                            All Statuses <ChevronDown className="md:h-auto h-5" />
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
                </div>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {box.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg px-4 py-6 flex items-center gap-3 bg-white">
                        <div className={`p-3 rounded-full ${item.bg}`}>{item.icon}</div>
                        <div>
                            <div className="text-2xl font-bold">{item.amount}</div>
                            <div className="text-sm text-gray-500">{item.text}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chart Section */}
            <div className="p-0 md:p-6 rounded-lg">
                <div className="h-[300px] md:h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 30, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid stroke="#E5E7EB" strokeDasharray="0" />
                            <XAxis dataKey="name" stroke="#4A5568" tick={{ fontSize: 12 }} />
                            <YAxis stroke="#4A5568" tick={{ fontSize: 12 }} />
                            <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "5px", padding: "10px" }} />
                            <Legend />
                            <Bar dataKey="conversions" stackId="a" fill="#6c6cf0" barSize={40} />
                            <Bar dataKey="opportunities" stackId="a" fill="#a16ff2" barSize={40} />
                            <Bar dataKey="clicks" stackId="a" fill="#e271db" barSize={40} />
                            <Bar dataKey="opens" stackId="a" fill="#f19888" barSize={40} />
                            <Bar dataKey="sent" stackId="a" fill="#ffc195" barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
import { useState } from "react";
import { Bell, ChartSpline, ClipboardList, MoveUpRight, Plus, Ratio, Search, UsersRound, X, Calendar, Clock3, FileText } from "lucide-react";
import MetricCard from "../components/MetricCard";
import LiveFeed from "../components/LiveFeed";
import TaskList from "../components/TaskList";
import StatsChart from "../components/StartChart";
import TopPeople from "../components/ToPeople";
import { RiEditCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import widget from "../assets/widget.png";

export default function DashboardPage() {
  const [selectedView, setSelectedView] = useState("month");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for first modal
  const [isPlusModalOpen, setIsPlusModalOpen] = useState(false); // State for second modal

  return (
    <div className="pl-[10px] md:pl-[20px] bg-[rgb(251,251,251)]">
      <div className="min-h-screen bg-background">
        <main className="container mx-auto p-3 md:p-6">
          <div className="mb-8 flex items-center justify-between flex-col md:flex-row gap-4">
            <div>
              <h2 className="text-2xl font-bold">Evening, Beetoo 👋</h2>
              <p className="text-sm text-gray-400 text-semibold">
                Track your activities, leads, analytics, and more
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-[rgb(21,163,149)] rounded-full px-4 py-2 text-white cursor-pointer"
            >
              <Ratio className="h-5 w-5" />
              Add widget
            </button>
          </div>

          {isModalOpen && (
          <div className="fixed inset-0 top-10 flex items-center justify-center bg-opacity-50 z-50 p-[30px]">
            <div className="relative bg-white rounded-lg shadow-lg p-3 md:p-6 w-[600px]">
              
              <div className="flex items-center justify-between pb-3">
                <h3 className="text-xl font-semibold">Add Widget</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X />
                </button>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="text-gray-400" />
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full px-4 outline-none py-3 pl-10 text-sm text-gray-900 border border-green-400 rounded-full bg-gray-50"
                    placeholder="Search Mockups, Logos..."
                  />
                </div>
              </div>
              <div className="h-[70vh] overflow-auto">
                <div className="grid md:grid-cols-2 gap-4">
                  {[ 
                    { icon: <ChartSpline className="text-teal-600" size={18} />, title: "Stats" },
                    { icon: <Bell className="text-orange-400" size={18} />, title: "Live Feed" },
                    { icon: <ClipboardList className="text-purple-500" size={18} />, title: "Tasks" },
                    { icon: <UsersRound className="text-blue-400" size={18} />, title: "Top People" },
                  ].map((widgetItem, index) => (
                    <div key={index} className="border-none p-3 rounded-md shadow-md bg-white">
                      <div className="bg-gray-200 p-3 rounded-md">
                        <img src={widget} className="w-full h-40 bg-white border-none rounded-md" alt="Widget" />
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-gray-700">
                        {widgetItem.icon}
                        <span className="font-medium">{widgetItem.title}</span>
                      </div>
                      <p className="text-gray-500 text-sm mt-1">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}


          <div className="mb-8 grid gap-3 md:p-6 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard icon="mail" label="Emails Sent" value="1,245" iconColor="text-blue-600" bgColor="bg-blue-100" />
            <MetricCard icon="users" label="New Users" value="312" iconColor="text-green-600" bgColor="bg-green-100" />
            <MetricCard icon="calendar" label="Meetings" value="27" iconColor="text-purple-600" bgColor="bg-purple-100" />
            <MetricCard icon="briefcase" label="Projects" value="8" iconColor="text-orange-600" bgColor="bg-orange-100" />
          </div>

          <div className="grid gap-3 md:p-6 lg:grid-cols-3">
            <div className="p-6 border-none rounded-lg shadow-md bg-white">
              <h3 className="font-semibold mb-4">Live feed</h3>
              <LiveFeed />
            </div>

            <div className="p-6 border-none rounded-lg shadow-md bg-white">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">Stats</h3>
                <Link to='/analytics'>
                  <MoveUpRight className="text-gray-400"/>
                </Link>
                </div>
                
              <div className="w-fit mx-auto rounded-full bg-gray-200 p-1">
                <button
                  className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full cursor-pointer transition-all duration-300 ${
                    selectedView === "month" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-400"
                  }`}
                  onClick={() => setSelectedView("month")}
                >
                  Monthly
                </button>
                <button
                  className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full cursor-pointer transition-all duration-300 ${
                    selectedView === "week" ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-400"
                  }`}
                  onClick={() => setSelectedView("week")}
                >
                  Weekly
                </button>
              </div>
              <StatsChart />
            </div>

            <div className="p-3 md:p-6 border-none rounded-lg shadow-md bg-white">
              <div className="flex justify-between items-center">
                <div className="mb-4 flex items-center gap-3">
                  <h3 className="font-semibold">Tasks</h3>
                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-600">
                    5 New
                  </span>
                </div>
                <Plus
                  className="bg-gray-300 rounded-lg px-1 cursor-pointer"
                  onClick={() => setIsPlusModalOpen(true)}
                />
              </div>
              <div className="min-h-[400px]">
                <TaskList />
              </div>
            </div>
          </div>

          {isPlusModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
              <div className="relative bg-white rounded-lg shadow-lg w-[90%] md:w-[400px] p-3 md:p-6">
                <div className="flex items-center justify-between pb-3">
                  <h3 className="text-xl font-semibold">Add Task</h3>
                  <button
                    onClick={() => setIsPlusModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X />
                  </button>
                </div>

                <div>
                <form className="space-y-4">
                    <div>
                      <div className="flex gap-1 items-center mb-3">
                          <RiEditCircleLine size={22} className="text-gray-400" />
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Task Title</label>
                      </div>
                      <input type="text" className="mt-1 block w-full p-2 border outline-none border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                    <div className="flex gap-1 items-center mb-3">
                      <FileText size={22} className="text-gray-400" />
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Description</label>
                    </div>
                      <textarea className="mt-1 block w-full p-2 border outline-none border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"></textarea>
                    </div>
                    <div className="flex items-center gap-2">
                    <div>
                    <div className="flex gap-1 items-center mb-3">
                      <Calendar size={21} className="text-gray-400"  />
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Date</label>
                    </div>
                      <input type="text" className="mt-1 block w-full p-2 border outline-none border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                    <div className="flex gap-1 items-center mb-3">
                      <Clock3 size={21} className="text-gray-400"  />
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Time</label>
                    </div>
                      <input type="text" className="mt-1 block w-full p-2 border outline-none border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white" />
                    </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Assign to Person</label>
                      <input type="text" className="mt-1 block w-full p-2 border outline-none border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setIsPlusModalOpen(false)} type="button" class="text-gray-900 cursor-pointer bg-white border border-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</button>
                        <button onClick={() => setIsPlusModalOpen(false)} type="button" class="text-white cursor-pointer flex gap-2 items-center bg-[rgb(21,163,149)] focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"> <FileText size={18} /> Save Task</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          <div className="mt-3 border-none rounded-lg shadow-md bg-white">
            <TopPeople />
          </div>
        </main>
      </div>
    </div>
  );
}
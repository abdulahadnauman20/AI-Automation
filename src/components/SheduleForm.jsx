import { useState } from "react";
import { ChevronDown, Plus, Calendar, X } from "lucide-react";

function ScheduleForm() {
  const [schedules, setSchedules] = useState([{ id: 1, name: "Schedule 1" }]);
  const [activeSchedule, setActiveSchedule] = useState(1);
  const [scheduleName, setScheduleName] = useState("Schedule 1");
  const [startDate] = useState("Now");
  const [endDate] = useState("No end date");
  const [fromTime, setFromTime] = useState("9:00 AM");
  const [toTime, setToTime] = useState("6:00 PM");
  const [timezone, setTimezone] = useState("Eastern Time (US & Canada)");
  const [selectedDays, setSelectedDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });

  const handleDayToggle = (day) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const addSchedule = () => {
    if (schedules.length >= 3) {
      alert("You can't add more than 3 schedules");
      return;
    }
    const newId = schedules.length + 1;
    const newSchedule = { id: newId, name: `Schedule ${newId}` };
    setSchedules([...schedules, newSchedule]);
    setActiveSchedule(newId);
    setScheduleName(newSchedule.name);
  };

  const deleteSchedule = (id) => {
    if (schedules.length === 1) return;
    const updated = schedules.filter((s) => s.id !== id);
    setSchedules(updated);
    if (activeSchedule === id && updated.length > 0) {
      const next = updated[0];
      setActiveSchedule(next.id);
      setScheduleName(next.name);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto p-4">
      {/* Sidebar */}
      <div className="w-full md:w-64 space-y-4">
        <div className="flex items-center text-gray-600 mb-4 space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Start</span>
          <span className="text-teal-500 ml-auto">{startDate}</span>
        </div>

        <div className="flex items-center text-gray-600 mb-6 space-x-2">
          <Calendar className="h-5 w-5" />
          <span>End date</span>
          <span className="text-teal-500 ml-auto">{endDate}</span>
        </div>

        <div className="border-t border-gray-200 pt-6">
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className={`px-4 py-2 mb-2 rounded-md cursor-pointer border relative ${
                activeSchedule === schedule.id
                  ? "border-teal-500 text-teal-500"
                  : "border-gray-200"
              }`}
              onClick={() => {
                setActiveSchedule(schedule.id);
                setScheduleName(schedule.name);
              }}
            >
              <span>{schedule.name}</span>
              {schedules.length > 1 && (
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSchedule(schedule.id);
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}

          <button
            className={`w-full flex items-center justify-center px-4 py-2 border rounded-full cursor-pointer ${
              schedules.length >= 3
                ? "text-gray-300 cursor-not-allowed border-gray-200"
                : "text-gray-500 hover:text-teal-500 border-gray-200"
            }`}
            onClick={addSchedule}
            disabled={schedules.length >= 3}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add schedule
          </button>
        </div>
      </div>

      {/* Main Form */}
      <div className="flex-1 space-y-6">
        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-base font-medium mb-2">Schedule Name</h2>
          <input
            value={scheduleName}
            onChange={(e) => setScheduleName(e.target.value)}
            className="w-full border border-teal-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-base font-medium mb-4">Timing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-2">From</label>
              <div className="relative">
                <select
                  value={fromTime}
                  onChange={(e) => setFromTime(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>12:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">To</label>
              <div className="relative">
                <select
                  value={toTime}
                  onChange={(e) => setToTime(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option>5:00 PM</option>
                  <option>6:00 PM</option>
                  <option>7:00 PM</option>
                  <option>8:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">Timezone</label>
              <div className="relative">
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option>Eastern Time (US & Canada)</option>
                  <option>Central Time (US & Canada)</option>
                  <option>Pacific Time (US & Canada)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-base font-medium mb-4">Days</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(selectedDays).map((day) => (
              <label key={day} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedDays[day]}
                  onChange={() => handleDayToggle(day)}
                  className="form-checkbox h-4 w-4 text-teal-500 border-gray-300 rounded cursor-pointer"
                />
                <span className="text-sm font-medium">{day}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-start">
          <button className="flex items-center cursor-pointer bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-md focus:outline-none">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleForm;

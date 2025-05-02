import { useEffect, useState } from "react";
import { Calendar, CircleX, Clock3, FileText, NotepadText } from "lucide-react";
import { RiEditCircleLine } from "react-icons/ri";
import { IoVideocam } from "react-icons/io5";

function SideDrawer({ isOpen, setIsOpen, data}) {
  
  const getFormattedStartTime = (time) => {
    if (!time || typeof time !== "string") return "";
  
    const start = time.split(" - ")[0]; // "8:30"
    if (!start.includes(":")) return "";
  
    const [h, m] = start.split(":");
    if (h === undefined || m === undefined) return "";
  
    return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
  };
  
  

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    person: "",
    meetingLink: "",
    notes: "",
  });
  
  useEffect(() => {
    if (data) {
      setTaskData({
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        time: data.time || "",
        person: data.person || "",
        meetingLink: data.meetingLink || "",
        notes: data.notes || "",
      });
    }
  }, [data])
   
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const payload = { taskData };
    
    if(payload.length){
      console.log("Submitted Payload:", payload);
      setTaskData({
        title: "",
        description: "",
        date: "",
        time: "",
        person: "",
        meetingLink: "",
        notes: "",
      });
    }
    setIsOpen(false);

  };

  const handleCancel = () => {
    setTaskData({
      title: "",
      description: "",
      date: "",
      time: "",
      person: "",
      meetingLink: "",
      notes: "",
    });
    setIsOpen(false);
  }


  return (
    <div className="relative">
      <div
        className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-gray-50 w-80 shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-base font-semibold text-gray-500 flex items-center">Task Details</h5>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 cursor-pointer bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
          >
            <CircleX size={22} />
          </button>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Task Title */}
          <div>
            <div className="flex gap-1 items-center mb-3">
              <RiEditCircleLine size={22} className="text-gray-400" />
              <label className="block text-sm font-medium text-gray-700">Task Title</label>
            </div>
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border outline-none border-gray-300 rounded-lg"
            />
          </div>

          {/* Description */}
          <div>
            <div className="flex gap-1 items-center mb-3">
              <FileText size={22} className="text-gray-400" />
              <label className="block text-sm font-medium text-gray-700">Description</label>
            </div>
            <textarea
              name="description"
              value={taskData.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border outline-none border-gray-300 rounded-lg"
            ></textarea>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-2">
            <div>
              <div className="flex gap-1 items-center mb-3">
                <Calendar size={21} className="text-gray-400" />
                <label className="block text-sm font-medium text-gray-700">Date</label>
              </div>
              <input
                type="date"
                name="date"
                value={taskData.date}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border outline-none border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <div className="flex gap-1 items-center mb-3">
                <Clock3 size={21} className="text-gray-400" />
                <label className="block text-sm font-medium text-gray-700">Time</label>
              </div>
              <input
                type="time"
                name="time"
                value={getFormattedStartTime(taskData?.time)}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border outline-none border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Person */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Person</label>
            <input
              type="text"
              name="person"
              value={taskData.person}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border outline-none border-gray-300 rounded-lg"
            />
          </div>

          {/* Meeting Link */}
          <div>
            <div className="flex gap-1 items-center mb-3">
              <IoVideocam size={25} className="text-white bg-blue-500 rounded p-1" />
              <label className="block text-sm font-medium text-gray-700">Meeting Link</label>
            </div>
            <input
              type="text"
              name="meetingLink"
              value={taskData.meetingLink}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border-none outline-none bg-gray-100 rounded-lg"
            />
          </div>

          {/* Extra Notes */}
          <div>
            <div className="flex gap-1 items-center mb-3">
              <NotepadText size={21} className="text-gray-400" />
              <label className="block text-sm font-medium text-gray-700">Extra Notes</label>
            </div>
            <textarea
              name="notes"
              value={taskData.notes}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border outline-none rounded-lg border-gray-300"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="text-gray-900 bg-white border cursor-pointer border-gray-300 font-medium rounded-full text-sm px-5 py-2.5">
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="text-white flex gap-2 items-center cursor-pointer bg-[rgb(21,163,149)] font-medium rounded-full text-sm px-5 py-2.5"
            >
              <FileText size={18} /> Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SideDrawer;

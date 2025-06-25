import { useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md"

function TaskList() {
  const tasks = [
    {
      id: 0,
      title: "Respond to Initial Inquiry",
      description: "Reply to Alex Carter with details on ta...",
      time: "9:00 PM",
      status: "upcoming",
    },
    {   
      id: 1,
      title: "Schedule Meeting",
      description: "Confirm a meeting with Alex Carter fo...",
      time: "12 Mar 2025",
      status: "completed",
    },
    {
      id: 2,
      title: "Schedule Meeting",
      description: "Confirm a meeting with Alex Carter fo...",
      time: "12 Mar 2025",
      status: "upcoming",
    },
    {
      id: 3,
      title: "Schedule Meeting",
      description: "Confirm a meeting with Alex Carter fo...",
      time: "12 Mar 2025",
      status: "upcoming",
    },
    {
      id: 4,
      title: "Schedule Meeting",
      description: "Confirm a meeting with Alex Carter fo...",
      time: "12 Mar 2025",
      status: "upcoming",
    },
  ]

  const [completedTasks, setCompletedTasks] = useState({});
  const toggleTaskCompletion = (taskId) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  return (
    <div className="space-y-3 ">
      {tasks.map((task, i) => (
        <div key={i} className="flex items-start gap-3 hover:bg-[#f3faf9] hover:cursor-pointer p-2 rounded">
           <button onClick={() => toggleTaskCompletion(task.id)} className="rounded text-gray-400">
            {completedTasks[task.id] ? (
              <MdCheckBox className="h-5 w-5 text-primary cursor-pointer" />
            ) : (
              <MdCheckBoxOutlineBlank className="h-5 w-5 text-muted-foreground cursor-pointer" />
            )}
          </button>
          <div className="flex-1 ">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-sm ${completedTasks[task.id] ? "line-through text-gray-400" : "text-muted-foreground"}`}>{task.title}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    task.status === "upcoming" ? "bg-purple-100 text-purple-600" : "bg-green-100 text-green-600"
                  }`}
                >
                  {task.status === "completed" ? "Completed" : "Upcoming"}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{task.description}</p>
            <p className="text-xs text-muted-foreground">{task.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList;
import { useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

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
  ];

  const [completedTasks, setCompletedTasks] = useState({});
  const toggleTaskCompletion = (taskId) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  return (
    <div className="space-y-2 sm:space-y-3">
      {tasks.map((task, i) => (
        <div
          key={i}
          className="flex items-start gap-2 sm:gap-3 hover:bg-[#f3faf9] hover:cursor-pointer p-2 rounded"
        >
          <button
            onClick={() => toggleTaskCompletion(task.id)}
            className="rounded text-gray-400 flex-shrink-0 mt-0.5"
          >
            {completedTasks[task.id] ? (
              <MdCheckBox className="h-4 w-4 sm:h-5 sm:w-5 text-primary cursor-pointer" />
            ) : (
              <MdCheckBoxOutlineBlank className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground cursor-pointer" />
            )}
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                <span
                  className={`text-xs sm:text-sm font-medium truncate ${
                    completedTasks[task.id]
                      ? "line-through text-gray-400"
                      : "text-muted-foreground"
                  }`}
                >
                  {task.title}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs w-fit ${
                    task.status === "upcoming"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {task.status === "completed" ? "Completed" : "Upcoming"}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
              {task.description}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{task.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  connectGoogleCalendar,
  getEvents,
  createEvents,
  getAEvent,
  updateAEvent,
  deleteAEvent,
} from "../services/calenderService";

export const useGoogleCalendarQuery = () => {
  const queryClient = useQueryClient();

  // -------------------- Connect / OAuth --------------------
  const connectCalendarMutation = useMutation({
    mutationFn: connectGoogleCalendar,
    onSuccess: (data) => {
      toast.success(data.message);
      window.location.href = data.url;
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to connect Google Calendar");
    },
  });

  // -------------------- Events --------------------
  const getAllEventsQuery = useQuery({
    queryKey: ["calendar-events"],
    queryFn: getEvents,
    onError: (err) => toast.error(err.response?.data?.message || "Failed to fetch events"),
  });

  const createEventMutation = useMutation({
    mutationFn: createEvents,
    onSuccess: () => {
      toast.success("Event created successfully");
      queryClient.invalidateQueries(["calendar-events"]);
    },
    onError: (err) => toast.error(err.response?.data?.message || "Failed to create event"),
  });

  const getSingleEventQuery = (id) =>
    useQuery({
      queryKey: ["calendar-event", id],
      queryFn: () => getAEvent(id),
      enabled: !!id,
      onError: (err) => toast.error(err.response?.data?.message || "Failed to fetch event"),
    });

  const updateEventMutation = useMutation({
    mutationFn: ({ id, data }) => updateAEvent(id, data),
    onSuccess: () => {
      toast.success("Event updated");
      queryClient.invalidateQueries(["calendar-events"]);
    },
    onError: (err) => toast.error(err.response?.data?.message || "Update failed"),
  });

  const deleteEventMutation = useMutation({
    mutationFn: (id) => deleteAEvent(id),
    onSuccess: () => {
      toast.success("Event deleted");
      queryClient.invalidateQueries(["calendar-events"]);
    },
    onError: (err) => toast.error(err.response?.data?.message || "Delete failed"),
  });

  return {
    // OAuth
    connectCalendarMutation,

    // Events
    getAllEventsQuery,
    createEventMutation,
    getSingleEventQuery,
    updateEventMutation,
    deleteEventMutation,
  };
};

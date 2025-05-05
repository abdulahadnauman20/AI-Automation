import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  connectGoogleCalendar,
  getEventsByRange,
  isAuthenticated,
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
  // const getAllEventsQuery = useQuery({
  //   queryKey: ["calendar-events"],
  //   queryFn: ({ startDate, endDate }) => {
  //     console.log("Fetching events with parameters:", { startDate, endDate });
  //     return getEventsByRange(startDate, endDate);
  //   },
  //   onError: (err) => toast.error(err.response?.data?.message || "Failed to fetch events"),
  // });

  const getAllEventsQuery = ({ startDate, endDate }) => 
    useQuery({
      queryKey: ["calendar-events", startDate, endDate],
      queryFn: () => getEventsByRange(startDate, endDate),
      onError: (err) => toast.error(err.response?.data?.message || "Failed to fetch events"),
    });

  const createEventMutation = useMutation({
    mutationFn: (data) => createEvents(data),
    onSuccess: () => {
      toast.success("Event created successfully");
      queryClient.invalidateQueries(["calendar-events"]);
    },
    onError: (err) => toast.error(err.response?.data?.message || "Failed to create event"),
  });

  const getSingleEventQuery = (id) =>
    useQuery({
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

  // --------------Authentication-------------
  const {
    data: authData,
    isLoading: authLoading,
    error: authError,
  } = useQuery({
    queryKey: ['auth-check'],
    queryFn: isAuthenticated,
    retry: true,                  // Don’t retry on failure
    refetchOnWindowFocus: false,  // Don’t run on tab switch
    refetchOnReconnect: false,    // Don’t run on network reconnect
    refetchOnMount: true,         // ✅ Run when the component mounts (each time it mounts)
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to check authentication");
    },
  });

  return {
    // OAuth
    connectCalendarMutation,

    // Authentication
    authData, authLoading, authError,

    // Events
    getAllEventsQuery,
    createEventMutation,
    getSingleEventQuery,
    updateEventMutation,
    deleteEventMutation,
  };
};

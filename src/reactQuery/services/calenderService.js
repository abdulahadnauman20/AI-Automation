import { axiosInstance } from "../../api/axios";

export const connectGoogleCalendar = () => axiosInstance.get("/calendar/connect").then(res => res.data);
export const callCalender = () => axiosInstance.get("/calendar/callback").then(res => res.data);

export const getEvents = () => axiosInstance.get("/calendar/events").then(res => res.data);
export const createEvents = () => axiosInstance.post("/calendar/events").then(res => res.data);

export const getAEvent = (id) => axiosInstance.get(`/calendar/events/${id}`).then(res => res.data);
export const updateAEvent = (id) => axiosInstance.put(`/calendar/events/${id}`).then(res => res.data);
export const deleteAEvent = (id) => axiosInstance.delete(`/calendar/events/${id}`).then(res => res.data);

export const syncGoogleEvents = () => axiosInstance.post("/calendar/sync").then(res => res.data);
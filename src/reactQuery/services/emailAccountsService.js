import { axiosInstance } from "../../api/axios";

// -------------------- People --------------------
export const getEmailAccounts = () =>
    axiosInstance.get("/EmailAccount/GetAllEmailAccounts").then(res => res.data);
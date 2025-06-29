import { axiosInstance } from "../../api/axios";

// -------------------- People --------------------
export const getEmailAccounts = () =>
    axiosInstance.get("/EmailAccount/GetAllEmailAccounts").then(res => res.data);


// -------------------- Porkbun --------------------

export const getDomainSuggestions = (data) =>
    axiosInstance.post("/EmailAccount/GetDomainSuggestions", data).then(res => res.data);

export const getDomainPricing = (data) =>
    axiosInstance.post("/EmailAccount/GetDomainPrices", data).then(res => res.data);
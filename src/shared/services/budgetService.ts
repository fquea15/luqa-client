import API from "./routeService";

export const getUserBudget = async () => {
  const res = await API.get("/budget/user");
  return res.data; 
};


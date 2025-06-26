import API from "./api";

export const getUserBudget = async () => {
  const res = await API.get("/budget/user");
  return res.data; 
};


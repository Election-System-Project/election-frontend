import axios from "axios";

const API_URL = "/authcontroller";

const login = async (email, password) => {
  const res = await axios.post(API_URL + "/login", {
    email,
    password,
  });
  if (res.content.token) {
    localStorage.setItem("user", JSON.stringify(res.content));
  }
  return res.content;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;

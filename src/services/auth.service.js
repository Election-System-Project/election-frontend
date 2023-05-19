import axios from "axios";
import Request from "../helpers/Request";

const API_URL = "/authcontroller";

const login = async (email, password) => {
  const res = await Request("post", API_URL + "/login", {
    email: email,
    password: password,
  });
  return res;
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

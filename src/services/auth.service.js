import Request from "../helpers/Request";

const API_URL = "/loginController";

const login = async (email, password) => {
  const res = await Request("post", API_URL + "/login/", {
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

const synchDatabase = async (userData) => {
  const res = await Request("post", "/userController/save/", {
    user: userData,
  });
};

const authService = {
  login,
  logout,
  getCurrentUser,
  synchDatabase,
};

export default authService;

import Request from "../helpers/Request";

const API_URL = "/applicationController";

const getApplicationById = async (studentid) => {
  const res = await Request("post", API_URL + "/applications/" + studentid, {
    studentid: studentid,
  });
  return res;
};

const apply = async (files, notes) => {
  const res = await Request("post", API_URL + "/application/", {
    files: files,
    notes: notes,
  });
  return res;
};

const applicationService = {
  getApplicationById,
  apply,
};

export default applicationService;

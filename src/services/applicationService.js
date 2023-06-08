import Request from "../helpers/Request";

const API_URL = "/candidateController";

const getApplicationById = async (studentid) => {
  const res = await Request("post", API_URL + "/candidates/getDocument/", {
    studentid: studentid,
  });
  return res;
};

const apply = async (form_) => {
  const res = await Request("put", API_URL + "/candidates/create/", form_);
  return res;
};

const applicationService = {
  getApplicationById,
  apply,
};

export default applicationService;

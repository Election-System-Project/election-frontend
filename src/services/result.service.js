import Request from '../helpers/Request'

const API_URL = "/approvementController"

const fetchData = async () => {
    const res = await Request("post", API_URL + "/resultApprovements/", {});
    return res;
}

const approveUser = async (data) => {
    const res = await Request("post", API_URL + "/resultApprovements/approve/", data);
    return res;
}

const rejectUser = async (data) => {
    const res = await Request("post", API_URL + "/resultApprovements/reject/", data);
    return res;
}

const getDocumentOfUser = async (data) => {
    const res = await Request("post", API_URL + "/resultApprovements/getDocument/", data);
    return res;
}

const resultService = {
    fetchData,
    approveUser,
    rejectUser,
    getDocumentOfUser
}

export default resultService;
import Request from '../helpers/Request'

const API_URL = "/approvementController"

const fetchData = async () => {
    const res = await Request("post", API_URL + "/applicationApprovements/", {});
    return res;
}

const approveUser = async (data) => {
    const res = await Request("post", API_URL + "/applicationApprovements/approve/", data);
    return res;
}

const rejectUser = async (data) => {
    const res = await Request("post", API_URL + "/applicationApprovements/reject/", data);
    return res;
}

const getDocumentOfUser = async (data) => {
    const res = await Request("get", API_URL + "/applicationApprovements/getDocument/", data);
    return res;
}

const approvementService = {
    fetchData,
    approveUser,
    rejectUser,
    getDocumentOfUser
}

export default approvementService;
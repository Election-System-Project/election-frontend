import Request from '../helpers/Request'

const API_URL = "/approvementController"

const fetchData = async () => {
    const res = await Request("post", API_URL + "/applicationApprovement/application/department/", {});
    return res;
}

const approveUser = async (data) => {
    const res = await Request("post", API_URL + "/applicationApprovement/application/department/approve", data);
    return res;
}

const rejectUser = async (data) => {
    const res = await Request("post", API_URL + "/applicationApprovement/application/department/reject/", data);
    return res;
}

const getDocumentOfUser = async (data) => {
    const res = await Request("post", "/candidateController/candidates/getDocument/", {
        studentid: data,
    });
    return res;
}

const approvementService = {
    fetchData,
    approveUser,
    rejectUser,
    getDocumentOfUser
}

export default approvementService;
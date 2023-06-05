import Request from '../helpers/Request'

const API_URL = "/approvementController"

const fetchData = async (name) => {
    const res = await Request("post", API_URL + `/resultApprovements/results/${name}/`, {});
    return res;
}

const approveUser = async (name, data) => {
    const res = await Request("post", API_URL + `/resultApprovements/results/${name}/approve/`, data);
    return res;
}

const rejectUser = async (name, data) => {
    const res = await Request("post", API_URL + `/resultApprovements/results/${name}/reject/`, data);
    return res;
}

const resultService = {
    fetchData,
    approveUser,
    rejectUser,
}

export default resultService;
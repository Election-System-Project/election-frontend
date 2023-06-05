import Request from '../helpers/Request'

const API_URL = "/candidateController"

const fetchCandidates = async () => {
    const res = await Request("post",API_URL+"/candidates/", {});
    console.log(res);
    return res;
}

const currentCandidates = {fetchCandidates};

export default currentCandidates;
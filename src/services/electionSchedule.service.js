import Request from '../helpers/Request'

const API_URL = "/dateController"

const setElectionDates = async (data) => {
    const res = await Request("post", API_URL + "/dates/add/", data);
    return res;
}

const electionScheduleService = {
    setElectionDates,
}

export default electionScheduleService;
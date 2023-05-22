import Request from '../helpers/Request'

const API_URL = "/announcementController"

const createAnnouncement = async (data) => {
    const res = await Request("post", API_URL + "/announcements/create/", data);
    return res;
}

const fetchData = async () => {
    const res = await Request("post", API_URL + "/announcements/", {});
    return res;
}

const announcementService = {
    createAnnouncement,
    fetchData
}

export default announcementService;
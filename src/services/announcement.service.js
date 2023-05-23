import Request from '../helpers/Request'

const API_URL = "/announcementController"

const fetchData = async () => {
    const res = await Request("post", API_URL + "/announcements/", {});
    return res;
}

const createAnnouncement = async (data) => {
    const res = await Request("post", API_URL + "/announcements/create/", data);
    return res;
}

const removeAnnouncement = async (id) => {
    const res = await Request("delete", API_URL + "/announcements/delete/" + id, {});
    return res;
}

const announcementService = {
    fetchData,
    createAnnouncement,
    removeAnnouncement
}

export default announcementService;
import Request from '../helpers/Request'

const API_URL = "/messageController"

const getMessages = async (data) => {
    const res = await Request("post", API_URL + "/messages/", data);
    return res;
}

const userService = {
    getMessages
}

export default userService;
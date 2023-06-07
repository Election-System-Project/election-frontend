import Request from "../helpers/Request";

const API_URL = "/candidateController";

const fetchUser = async () => {
  const res = await Request("post", API_URL + "/candidates/", {});
  console.log(res);
  return res;
};

const vote = async (id, userId) => {
  const res = await Request("post", "/voteController/addvote/", {
    student_id: id,
    user_id: userId,
  });
  return res;
};

const voteService = { fetchUser, vote };

export default voteService;

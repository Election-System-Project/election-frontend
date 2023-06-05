import Request from "../helpers/Request";

const API_URL = "/candidateController";

const fetchUser = async () => {
  const res = await Request("post", API_URL + "/candidates/", {});
  console.log(res);
  return res;
};

const vote = async (id) => {
  const res = await Request("post", "/voteController/addvote/", {
    student_id: id,
  });
  return res;
};

const voteService = { fetchUser, vote };

export default voteService;

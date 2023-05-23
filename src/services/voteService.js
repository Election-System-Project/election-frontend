import Request from '../helpers/Request'

const API_URL ="/candidateController"

const fetchUser = async () => {
    const res = await Request("post",API_URL+"/candidates/", {});
    console.log(res);
    return res;
}

const vote = async (name) => {
    const res = await Request("post", "/voteController/addvote/", {
      candidate_name: name,
    });
    return res;
  };








const voteService={fetchUser,vote}

export  default voteService;
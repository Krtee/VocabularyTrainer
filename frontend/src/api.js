import axios from "axios";

// constants
const url = "http://localhost:8080/api";

const createUser = async (data) => {
  try {
    return axios.post(`${url}/putUsers`, data);
  } catch (error) {
    console.error(error);
  }
};

export default {
  user: {
    createUser: (data) => createUser(data),
  },
};

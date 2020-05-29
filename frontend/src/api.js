import axios from "axios";

// constants
const url = "http://localhost:8080";

// User -------------------------------------------------------------

const createUser = async (data) => {
  try {
    return axios.post(`${url}/api/putUsers`, data);
  } catch (error) {
    console.error(error);
  }
};

const fetchUsers = async () => {
  try {
    return await axios.get(`${url}/api/getUsers`);
  } catch (error) {
    console.error(error);
  }
};

// Vocab ------------------------------------------------------------

const getVocabs = async () => {
  try {
    const res = await axios.get(`${url}/Vocab/`);
    return res.data ? (res.data ? res.data.data : res) : res;
  } catch (error) {
    console.error(error);
  }
};

const insertVocab = async (data) => {
  try {
    const res = await axios.post(`${url}/Vocab/insert`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Language ---------------------------------------------------------

const getLanguages = async () => {
  try {
    const res = await axios.get(`${url}/api/getLanguages`);
    return res.data ? (res.data ? res.data.data : res) : res;
  } catch (error) {
    console.error(error);
  }
};

export default {
  language: {
    getLanguages: () => getLanguages(),
  },
  user: {
    createUser: (data) => createUser(data),
    fetchUsers: () => fetchUsers(),
  },
  vocab: {
    insert: (data) => insertVocab(data),
    getVocab: () => getVocabs(),
  },
};

import axios from "axios";

// constants
const url = "http://localhost:8080";

// User -------------------------------------------------------------

const createUser = async (data) => {
  try {
    return axios.post(`${url}/Users`, data);
  } catch (error) {
    console.error(error);
  }
};

const fetchUsers = async () => {
  try {
    return await axios.get(`${url}/Users`);
  } catch (error) {
    console.error(error);
  }
};

const getUser = async (userId) => {
  try {
    return await axios.get(`${url}/Users/${userId}`)
  } catch (error) {
    console.error(error)
  }
}

const editUser = async (userId) => {
  try {
    return await axios.patch(`${url}/Users/${userId}`)
  } catch (error) {
    console.error(error)
  }
}

const deleteUser = async (userId) => {
  try {
    return await axios.delete(`${url}/Users/${userId}`)
  } catch (error) {
    console.error(error)
  }
}

// Vocab ------------------------------------------------------------

const getVocabs = async () => {
  try {
    const res =  await axios.get(`${url}/Vocab/`);
    return res.data ? (res.data ? res.data.data : res) : res;
  } catch (error) {
    console.error(error);
  }
};

const insertVocab = async (data) => {
  try {
    return await axios.post(`${url}/Vocab/insert`, data);
  } catch (error) {
    console.error(error);
  }
};

// Language ---------------------------------------------------------

const getLanguages = async () => {
  try {
    const res = await axios.get(`${url}/Languages`);
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

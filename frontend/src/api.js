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

const getVocabAndTranslation = async (data) => {
  try {
    const res = await axios.post(`${url}/Vocab/getVocabAndTranslation`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

const getVocabsById = async (id) => {
  try {
    const res = await axios.post(`${url}/Vocab/getByIdArray`, id);
    return res.data;
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

// Progress ---------------------------------------------------------

const getProgress = async () => {
  try {
    const res = await axios.get(`${url}/Vocab/getProgress`);
    return res.data ? (res.data ? res.data.data : res) : res;
  } catch (error) {
    console.error(error);
  }
};

const getProgressByVocabId = async (id) => {
  try {
    const res = await axios.get(`${url}/Vocab/getProgressByVocabId`, {params: {id: id}});
    return res.data ? (res.data ? res.data.data : res) : res;
  } catch (error) {
    console.error(error);
  }
};

const filterProgress = async (query) => {
  console.log(query)
  try {
    const res = await axios.get(`${url}/Vocab/filterProgress`,  {params: query});
    return res.data
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
    fetchUsers: () => fetchUsers()
  },
  vocab: {
    insert: (data) => insertVocab(data),
    getVocab: () => getVocabs(),
    getVocabAndTranslation: (data) => getVocabAndTranslation(data),
    getVocabById: (id) => getVocabsById(id)
  },
  progress: {
    getProgress: () => getProgress(),
    getProgressByVocabId: (id) => getProgressByVocabId(id),
    filterProgress: (id) => filterProgress(id)
  }
};

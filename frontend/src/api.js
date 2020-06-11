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

const getIdForUserName = async (data) => {
  try {
    const res = await axios.post(`${url}/Users/getIdForUserName`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

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

const getVocabById = async (id) => {
  try {
    const res = await axios.get(`${url}/Vocab/byId`, { params: { id: id } });
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

const getProgressById = async (id) => {
  try {
    const res = await axios.get(`${url}/Vocab/getProgressById`, {params: {id: id}});
    return res.data ? (res.data ? res.data.data : res) : res;
  } catch (error) {
    console.error(error);
  }
};


const getProgressForUserAndLanguage = async (data) => {
  try {
    const res = await axios.post(`${url}/Vocab/getProgressForUserAndLanguage`, data);
    return res.data ? (res.data ? res.data.data : res) : res;
  } catch (error) {
    console.error(error);
  }
};

const createProgress = async (data) => {
  try {
    const res = await axios.post(`${url}/Vocab/createProgress`, data);
    return res.data ? (res.data ? res.data.data : res) : res;
  } catch (error) {
    console.error(error);
  }
}


export default {
  language: {
    getLanguages: () => getLanguages(),
  },
  user: {
    createUser: (data) => createUser(data),
    fetchUsers: () => fetchUsers(),
    getIdForUserName: (data) => getIdForUserName(data)
  },
  vocab: {
    insert: (data) => insertVocab(data),
    getVocab: () => getVocabs(),
    getVocabAndTranslation: (data) => getVocabAndTranslation(data),
    getVocabById: (id) => getVocabById(id)
  },
  progress: {
    getProgress: () => getProgress(),
    getProgressById: (id) => getProgressById(id),
    getProgressForUserAndLanguage: (data) => getProgressForUserAndLanguage(data),
    createProgress: (data)=> createProgress(data)
  }
};

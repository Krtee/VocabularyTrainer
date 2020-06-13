import axios from "axios";

// constants
const url = "http://localhost:8080";


// User -------------------------------------------------------------
  const getStatus = async () => {
    return axios.get(`${url}/Users/status`)
  }

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

const editUser = async (userId,data) => {
  try {
    return await axios.patch(`${url}/Users/${userId}`,{data})
  } catch (error) {
    console.error(error)
  }
}

const deleteUser = async (userId) =>{
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

const searchProgress = async (data) => {
  try {
    const res = await axios.post(`${url}/Vocab/searchProgress`, data);
    return res.data ? (res.data ? res.data.data : res) : res;
  } catch (error) {
    console.error(error);
  }
};

const filterProgress = async (query) => {
  try {
    const res = await axios.get(`${url}/Vocab/filterProgress`,  {params: query});
    return res.data
  } catch (error) {
    console.error(error);
  }
};

const increaseRGIAR = async (data) => {
  try {
    const res = await axios.post(`${url}/Vocab/increaseRGIAR`, data);
    return res.data ? (res.data ? res.data.data : res) : res;
  } catch (error) {
    console.error(error);
  }
};

const resetRGIAR = async (data) => {
  try {
    const res = await axios.post(`${url}/Vocab/resetRGIAR`, data);
    return res.data ? (res.data ? res.data.data : res) : res;
  } catch (error) {
    console.error(error);
  }
};

const increaseProgress = async (data) => {
  try {
    const res = await axios.post(`${url}/Vocab/increaseProgress`, data);
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
    editUser: (id,data) => editUser(id,data),
    getIdForUserName: (data) => getIdForUserName(data),
    deleteUser: (data)=> deleteUser(data)
  },
  vocab: {
    insert: (data) => insertVocab(data),
    getVocab: () => getVocabs(),
    getVocabAndTranslation: (data) => getVocabAndTranslation(data),
    getVocabById: (id) => getVocabsById(id)
  },
  progress: {
    getProgress: () => getProgress(),
    searchProgress: (data) => searchProgress(data),
    filterProgress: (id) => filterProgress(id),
    getProgressForUserAndLanguage: (data) => getProgressForUserAndLanguage(data),
    increaseRGIAR: (data) => increaseRGIAR(data),
    resetRGIAR: (data) => resetRGIAR(data),
    increaseProgress: (data) => increaseProgress(data),
    createProgress: (data)=> createProgress(data)
  }, 
  status: {
    get: () => getStatus(),
  }
};

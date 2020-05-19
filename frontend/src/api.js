import axios from "axios"

// constants
const url = "localhost:8080/api"


const createUser = async (data)  => {
    console.log("Creating user...", data)
    try {
        return axios.post(`http://localhost:8080/api/putUsers`, data)
    } catch (error) {
        console.error(error)
    }
}



export default {
    user: {
        createUser: data => createUser(data) 
    }
}
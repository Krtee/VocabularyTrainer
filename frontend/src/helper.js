import api  from "./api"

const serverIsRunning = async () => {
    try {
        await api.status.get()
        return true
    } catch (error) {
        return false
    }
}

export default serverIsRunning
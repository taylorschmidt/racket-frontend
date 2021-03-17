import axios from 'axios'

//get user data

export const getCurrentUser = () =>{
    return axios.get('http://localhost:8000' + `/api/v1/user/`, { withCredentials: true })
}

export const getSinglesMatches = () => {
    return axios
      .get("http://localhost:8000" + `/api/v1/singles/`, {
        withCredentials: true,
      })
}

export const getDoublesMatches = () => {
    return axios
      .get("http://localhost:8000" + `/api/v1/doubles/`, {
        withCredentials: true,
      })
}
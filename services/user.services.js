import axios from 'axios'

//get user data

export const getCurrentUser = () =>{
    return axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/user/`, { withCredentials: true })
}

export const getSinglesMatches = () => {
    return axios
      .get(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/singles/`, {
        withCredentials: true,
      })
}

export const getDoublesMatches = () => {
    return axios
      .get(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/doubles/`, {
        withCredentials: true,
      })
}
import axios from 'axios'

export const postSinglesMatch = () => {
    return axios
      .post("http://localhost:8000" + `/api/v1/singles/`, {
        withCredentials: true,
      })
}


import axios from 'axios'

export const postSinglesMatch = () => {
    return axios
      .post(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/singles/`, {
        withCredentials: true,
      })
}


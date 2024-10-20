import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:
        `${process.env.REACT_APP_GEMINI_API_URL}`,
});
export default axiosInstance;
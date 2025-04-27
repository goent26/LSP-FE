import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000,
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('lsp-token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default axiosInstance

import axios from "axios"; 
import { getTokenFromCookies } from "./cookieUtils";

export const setupAxiosInterceptors = () =>
{
    axios.interceptors.request.use(
        config => 
        {
            const token = getTokenFromCookies()
            if(token){
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        error => 
        {
            return Promise.reject(error)
        }
    )
}
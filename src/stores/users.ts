import { defineStore } from "pinia";
import axios from "axios";
import { getTokenFromCookies } from "@/utils/cookieUtils";

interface User {
    first_name: string;
    last_name: string,
    email: string,
    password: string
}

interface ExistingUser {
    email: string,
    password: string
}

export const useUsersStore = defineStore('user',
    {
        state: () => ({
            users: [] as User[],
            isAuthenticated : false,
            loading: false,
            error: null as string | null,
        }),
        actions:
        {
            async addUser(newUser: User) {
                try {
                    await axios.post('http://localhost:3000/users', newUser)
                } catch (error) {
                    console.log(error)
                    return (error)
                }
            },
            async signIn(loginUser: ExistingUser) {
                if (loginUser) {
                    try {
                        const response = await axios.post('http://localhost:3000/auth/login', loginUser,{ withCredentials: true}) 
                        const token = getTokenFromCookies()
                        if(token)
                        {
                            this.isAuthenticated = true 
                            console.log('Login exitoso', response) 
                        }
                    } catch (error) {
                        return (error)
                    }
                }
                return
            }
        }
    }
)
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
                        console.log('Respuesta del servidor:', response);

                        const token = getTokenFromCookies()
                        console.log('Token recibido:', token);
                            this.isAuthenticated = true 
                            console.log('Login exitoso') 
                        
                    } catch (error) {
                        return (error)
                    }
                }
                return
            },
            async logOut()
            {
                try {
                    await axios.post('http://localhost:3000/auth/logout', null, {
                        withCredentials: true,
                    });
                    this.isAuthenticated = false;
                    console.log('logout successful')
                } catch (error) {
                    console.log(error)
                }
            },

            async checkAuth()
            {
                try {
                    const response = await axios.get('http://localhost:3000/auth/check',{
                        withCredentials: true
                    })
                    this.isAuthenticated = response.data.isAuthenticated
                    console.log(response.data)
                    
                } catch (error) {
                    console.log('error')
                }
            },
            async getProfile()
            {
                try {
                    const response = await axios.get('http://localhost:3000/auth/profile',{
                        withCredentials: true
                    })
                    this.users.push(response.data)
                    console.log(response.data)
                    
                } catch (error) {
                    console.log('error')
                }
            }
        }
    }
)
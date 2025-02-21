import { defineStore } from "pinia";
import axios from "axios";
import { useLogrosStore } from "./logros";
import { API_URL } from "@/utils/constant";
import Swal from "sweetalert2";


interface User {
    user_id?: string,
    first_name: string;
    last_name: string,
    email: string,
    password: string,
    curr_puntos?: number,
}

interface ExistingUser {
    email: string,
    password: string
}

export const useUsersStore = defineStore('users',
    {
        state: () => ({
            users: [] as User[] | null,
            isAuthenticated : false,
            loading: false,
            error: null as string | null,
            user: null,
        }),
        actions:
        {
            async addUser(newUser: User) {
                try {
                    await axios.post(`${API_URL}users`, newUser)
                } catch (error) {
                    console.log(error)
                    return (error)
                }
            },
            async signIn(loginUser: ExistingUser) {
                if (loginUser) {
                    try {
                        const response = await axios.post(`${API_URL}auth/login`, loginUser,{ withCredentials: true}) 
                        console.log('Respuesta del servidor:', response);
                            this.isAuthenticated = true   
                    } catch (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Usuario o contraseña incorrectos',
                        })
                        return (error)
                    }
                }
                return
            },
            async logOut()
            {
                const logrosStore = useLogrosStore()
                try {
                    await axios.post(`${API_URL}auth/logout`, null, {
                        withCredentials: true,
                    });
                    this.isAuthenticated = false;
                    console.log('logout successful')
                    this.users = null
                    logrosStore.clearLogros()
                    this.user = null;
                } catch (error) {
                    console.log(error)
                }
            },

            async checkAuth()
            {
                try {
                    const response = await axios.get(`${API_URL}auth/check`,{
                        withCredentials: true
                    })
                    this.isAuthenticated = response.data.isAuthenticated
                    if (!this.isAuthenticated) {
                        this.users = null
                    } else if (!this.users) {
                        await this.getProfile()
                    }
                    this.user = response.data.user;
                } catch (error) {
                    this.isAuthenticated = false
                    this.users = null
                    this.user = null;
                   
                }
            },
            async getProfile()

            {
                try {
                    const response = await axios.get(`${API_URL}auth/profile`,{
                        withCredentials: true
                    })
                    this.users = [response.data]
                    console.log(response.data)
                    
                } catch (error) {
                    console.log('error')
                }
            },
            async modifyUserScore(puntos: number, user_id: string, operation:string)
            {
                console.log('modifying user score',puntos, user_id, operation)
                if (!this.users) {
                    console.log('No users found')
                    return
                }
                const user = this.users.find(user => user.user_id === user_id)
                console.log(user)
                if (user) {

                        if(operation === 'add' && user.curr_puntos)
                        {
                            user.curr_puntos += puntos
                        }
                        else if(operation === 'subtract' && user.curr_puntos)
                        {
                            user.curr_puntos = Math.max(0, user.curr_puntos - puntos);
                        }
                    }
            },

            clearProfile()
            {
                this.users = []
            }
        }
    }
)
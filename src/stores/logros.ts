import { defineStore } from "pinia";
import axios from 'axios'
import { useUsersStore } from './users'	

interface Logros {
    logro_id:string;
    completado: boolean;

    name: string;
    descripcion: string;
    imagen: string;
    puntos: number;
}

export const useLogrosStore = defineStore('logros',
    {
        state: () => ({
            logros : [] as Logros[],
            loading: false,
            error: null as string | null
        }),
        actions:
        {
            async getLogrosCompletados()
            {
                try {
                    const response = await axios.get('http://localhost:3000/logros/completedAchievements', {withCredentials:true})
                    console.log(response)
                    this.logros = response.data
                } catch (error) {
                    console.log(error)
                    return error
                }
            },
            async assignLogroToUser(puntos:number)
            {
                const userStore = useUsersStore()
                try {
                    await this.getLogrosCompletados()
                    userStore.users[0].curr_puntos = userStore.users[0].curr_puntos + puntos
                } catch (error) {
                    console.log(error)
                    return error
                }
            },
            clearLogros()
            {
                this.logros = []
            }
        }
    }
)
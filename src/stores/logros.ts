import { defineStore } from "pinia";
import axios from 'axios'

interface Logros {
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
            async getAllLogros()
            {
                try {
                    const response = await axios.get('http://localhost:3000/logros', {withCredentials:true})
                    console.log(response)
                    this.logros = [...this.logros, ...response.data]
                } catch (error) {
                    console.log(error)
                    return error
                }
            },
            async getLogrosCompletados()
            {
                try {
                    const response = await axios.get('http://localhost:3000/logros/completedAchievements', {withCredentials:true})
                    console.log(response)
                    this.logros = [...this.logros, ...response.data]
                } catch (error) {
                    console.log(error)
                    return error
                }
            },
            async assignLogroToUser(logro_id: string)
            {
                try {
                    const response = await axios.post('http://localhost:3000/logros/assign-logro', {logro_id} ,{ withCredentials: true})
                    console.log(response)
                } catch (error) {
                    console.log(error)
                    return error
                }
            }
        }
    }
)
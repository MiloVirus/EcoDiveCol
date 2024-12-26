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
                    const response = await axios.get('http://localhost:3000/logros')
                    console.log(response)
                    this.logros = response.data
                } catch (error) {
                    console.log(error)
                    return error
                }
            }
        }
    }
)
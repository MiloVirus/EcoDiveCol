import { defineStore } from "pinia";

interface User {
    id: number;
    name: string;
    lastName: string,
    email: string,
    password: string
}

export const useUsersStore = defineStore('user',
    {
        state:() =>({
            users:[] as User[],
            loading: false,
            error: null as string | null,
        }),
    }
)
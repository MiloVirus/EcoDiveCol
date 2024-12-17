import { defineStore } from "pinia";

interface User {
    name: string;
    lastName: string,
    email: string,
    password: string
}

export const useUsersStore = defineStore('user',
    {
        state:() =>({
            users:[] as Omit<User, 'password'>[],
            loading: false,
            error: null as string | null,
        }),
        actions:
        {
            addUser(newUser : User)
            {
                try {
                    const {password, ...userWithoutPassword} = newUser
                    this.users.push(userWithoutPassword)
                    alert('Register Succesful !')
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
)
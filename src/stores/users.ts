import { defineStore } from "pinia";
import axios from "axios";

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
        state:() =>({
            users:[] as User[],
            loading: false,
            error: null as string | null,
        }),
        actions:
        {
            async addUser(newUser : User)
            {
                try {
                    const response = await axios.post('http://localhost:3000/users', newUser)
                    this.users.push(response.data)
                } catch (error) {
                    console.log(error)
                    return(error)
                }
            },
            getUser(loginUser : ExistingUser)
            {   
                if(loginUser)
                {
                    const emailFound = this.users.find(element=>loginUser.email == element.email)
                    if(emailFound)
                    {
                        alert("Login Successful")
                    }
                    else{
                        alert("Error Try again")
                    }
                }
            return 
            }
        }
    }
)
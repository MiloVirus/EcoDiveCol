import { defineStore } from "pinia";

interface User {
    name: string;
    lastName: string,
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
                    return
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
import { defineStore } from "pinia";
import axios from 'axios'
import { useUsersStore } from './users'
import { API_URL } from "@/utils/constant";
import Swal from "sweetalert2";

interface Reward {
    reward_id: string;
    name: string;
    description: string;
    puntos: number;
    diveshop_id: string;
    claimed?: boolean;
}

export const useRewardsStore = defineStore('rewards',
    {
        state: () => ({
            rewards: [] as Reward[],
            loading: false,
            error: null as string | null
        }),
        actions:
        {
            async getRewards() {
                try {
                    const response = await axios.get(`${API_URL}rewards`, { withCredentials: true })
                    console.log('get Rewards',response)
                    this.rewards = response.data
                } catch (error) {
                    console.log(error)
                    return error
                }
            },
            async claimReward(reward_id: string) {
                try {
                    const userStore = useUsersStore();
                    console.log(reward_id);
                    const response = await axios.post(`${API_URL}rewards/claim`, { reward_id }, { withCredentials: true });
                    console.log('claim', response);

                    const reward = this.rewards.find(r => r.reward_id === reward_id);
                    if (reward) {
                        reward.claimed = true; 
                    }

                    if(reward && response.data.user_id)
                    {
                        userStore.modifyUserScore(reward.puntos, response.data.user_id, 'subtract');
                    }
                    Swal.fire({
                        icon: 'success',
                        title: 'Felicidades!',
                        text: 'Recompensa reclamada con éxito!',
                    })
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: (error as any).response?.data?.message || 'An error occurred',
                    })
                    console.log(error);
                    return error;
                }
            },            
            

            clearRewards() {
                this.rewards = []
            }
        }
    }
)
import { defineStore } from "pinia";
import axios from 'axios'
import { useUsersStore } from './users'

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
                    const response = await axios.get('http://localhost:3000/rewards', { withCredentials: true })
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
                    const response = await axios.post(`http://localhost:3000/rewards/claim`, { reward_id }, { withCredentials: true });
                    console.log('claim', response);

                    const reward = this.rewards.find(r => r.reward_id === reward_id);
                    if (reward) {
                        reward.claimed = true; 
                    }

                    if(reward && response.data.user_id)
                    {
                        userStore.modifyUserScore(reward.puntos, response.data.user_id, 'subtract');
                    }

                } catch (error) {
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
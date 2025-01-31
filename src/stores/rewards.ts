import { defineStore } from "pinia";
import axios from 'axios'

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
                    console.log(response)
                    this.rewards = response.data
                } catch (error) {
                    console.log(error)
                    return error
                }
            },
            async claimReward(reward_id: string) {
                try {
                    console.log(reward_id)
                    const response = await axios.post(`http://localhost:3000/rewards/claim`, { reward_id }, { withCredentials: true })
                    console.log(response)
                } catch (error) {
                    console.log(error)
                    return error
                }
            },

            clearRewards() {
                this.rewards = []
            }
        }
    }
)
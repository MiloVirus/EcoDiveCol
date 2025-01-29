import { defineStore } from "pinia";
import axios from "axios";

interface DiveShop {
  diveshop_id: string;
  name: string;
  description: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  image: string;
}

export const useDiveShopsStore = defineStore("diveshops", {
    state: () => ({
        diveshops: [] as DiveShop[],
        loading: false,
        error: null as string | null,
    }),
    actions: {
        async getDiveShops() {
        try {
            const response = await axios.get(
            "http://localhost:3000/diveshops",
            { withCredentials: true }
            );
            console.log(response);
            this.diveshops = response.data;
        } catch (error) {
            console.log(error);
            return error;
        }
        },
    
        clearDiveShops() {
        this.diveshops = [];
        },
    },
    }
)

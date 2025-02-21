import { defineStore } from "pinia";
import axios from "axios";
import { API_URL } from "@/utils/constant";

interface DiveShop {
  diveshop_id: string;
  name: string;
  description: string;
  city: string;
  phone: string;
  email: string;
  website: string;
  image: string;
  favorite: boolean;
}

export const useDiveShopsStore = defineStore("diveshops", {
  state: () => ({
    diveshops: [] as DiveShop[],
    userDiveshops: [] as DiveShop[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async getDiveShops() {
      try {
        const response = await axios.get(
          `${API_URL}diveshops`,
          { withCredentials: true }
        );
        console.log(response);
        this.diveshops = response.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async getUserDiveshops() {
      try {
        const response = await axios.get(`${API_URL}diveshops/user`, { withCredentials: true });
        console.log(response);
        this.userDiveshops = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async setDiveshopFavorite(diveShopId: string) {
      try {
        const response = await axios.post(`${API_URL}diveshops/setFavorite`, { diveShopId }, { withCredentials: true });
        console.log(response);
        const updatedDiveShop = this.userDiveshops.find(diveshop => diveshop.diveshop_id === response.data.diveshop_id);
        if (updatedDiveShop) {
          updatedDiveShop.favorite = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async unSetFavoriteDiveShop(diveShopId: string)
    {
      const response = await axios.delete(`${API_URL}diveshops/unsetFavorite`, { data: { diveShopId }, withCredentials: true })
      console.log(response)
      const updatedDiveShop = this.userDiveshops.find(diveshop => diveshop.diveshop_id === diveShopId);
      if (updatedDiveShop) {
        updatedDiveShop.favorite = false;
      }
    },

    clearDiveShops() {
      this.diveshops = [];
    },
  },
});

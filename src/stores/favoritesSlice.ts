import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { createRecipesSlice, RecipesSliceType } from "./resipeSlice";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";

export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorites: (recipe: Recipe) => Promise<void>
    favoriteExists: (id: Recipe["idDrink"]) => boolean
    loadFromStorage: () => void
}

export const createFavoriteSlice: StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set,get,api) => ({

    favorites: [],



    handleClickFavorites: async (recipe) => {

        if (get().favorites.some(item => item.idDrink === recipe.idDrink)) {

            set((state) => ({
                favorites: state.favorites.filter(item => item.idDrink !== recipe.idDrink)
            }))
            createNotificationSlice(set, get, api).showNotification({ text: 'Se eilimino de favorito', error: false })

        }else{

            set((state) => ({
                favorites: [...state.favorites, recipe]
            }))
            createNotificationSlice(set, get, api).showNotification({ text: 'Se agrego a favorito', error: false })
        }

        createRecipesSlice(set,get,api).closeModal();
        localStorage.setItem('favorites',JSON.stringify(get().favorites));
    },

    favoriteExists: (id) => {
        return get().favorites.some(item => item.idDrink === id);
    },

    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            set(() => ({
                favorites: JSON.parse(storedFavorites)
            }))
        }
    }
})
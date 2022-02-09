import React, { useContext, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavouritesContext = createContext();
export const useFavourites = () => useContext(FavouritesContext);
export default function FavouritesProvider({ children }) {
  const [favouritesCoinIds, setFavouriteCoinIds] = useState([]);
  const getFavouritesData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@favourites_coins");
      setFavouriteCoinIds(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFavouritesData();
  }, []);

  const storeFavouritesCoinId = async (coinId) => {
    try {
      const newFavourites = [...favouritesCoinIds, coinId];
      const jsonValue = JSON.stringify(newFavourites);
      await AsyncStorage.setItem("@favourites_coins", jsonValue);
      setFavouriteCoinIds(newFavourites);
    } catch (e) {
      console.log(e);
    }
  };

  const removeFavouritesCoinId = async (coinId) => {
    const newFavourite = favouritesCoinIds.filter(
      (coinIdValue) => coinIdValue !== coinId
    );
    const jsonValue = JSON.stringify(newFavourite);
    await AsyncStorage.setItem("@favourites_coins", jsonValue);
    setFavouriteCoinIds(newFavourite);
  };
  return (
    <FavouritesContext.Provider
      value={{
        favouritesCoinIds,
        storeFavouritesCoinId,
        removeFavouritesCoinId,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

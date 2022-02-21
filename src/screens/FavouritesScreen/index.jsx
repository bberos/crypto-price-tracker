import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import { useFavourites } from "./../../context/FavouritesProvider";
import CoinCard from "./../../components/CoinCard";
import { getFavouritesCoins } from "./../../services/requests";
export default function Favourites() {
  const { favouritesCoinIds } = useFavourites();
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const convertCoinIds = () => favouritesCoinIds.join("%2C");

  const fetchFavouritesCoins = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const favouritesCoinsData = await getFavouritesCoins(1, convertCoinIds());
    setCoins(favouritesCoinsData);
    setIsLoading(false);
  };
  useEffect(() => {
    if (favouritesCoinIds.length > 0) {
      fetchFavouritesCoins();
    }
  }, [favouritesCoinIds]);

  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinCard marketCoin={item} />}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          tintColor="white"
          onRefresh={fetchFavouritesCoins}
        />
      }
    />
  );
}

import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, RefreshControl } from "react-native";
import CoinCard from "./../../components/CoinCard";
import cryptocurrencies from "./../../../assets/data/cryptocurrencies.json";
import { getMarketData } from "./../../services/requests";
export default function index() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchCoins = async (page) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const coinsData = await getMarketData(page);
    setCoins((prevCoins) => [...prevCoins, ...coinsData]);
    setIsLoading(false);
  };
  const refetchCoins = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const coinsData = await getMarketData();
    setCoins(coinsData);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinCard marketCoin={item} />}
      onEndReached={() => fetchCoins(coins.length / 50 + 1)}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          tintColor="white"
          onRefresh={refetchCoins}
        />
      }
    />
  );
}

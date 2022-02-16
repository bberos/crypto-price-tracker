import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import SearchableDropwDown from "react-native-searchable-dropdown";
import styles from "./styles";
import { useRecoilState } from "recoil";
import { allPortfolioBoughtAssetsInStorage } from "./../../atoms/PortfolioAssets";
import { getAllCoins, getDetailedCoinData } from "./../../services/requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function AddNewAssetScreen() {
  const [allCoins, setAllCoins] = useState([]);
  const [boughtAssetQuantity, setBoughtAssetQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCoinId, setSelectedCoinId] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [assetsInStorage, setAssetsInStorage] = useRecoilState(
    allPortfolioBoughtAssetsInStorage
  );
  const navigation = useNavigation();
  const isQuantityEmpty = () => {
    boughtAssetQuantity !== "";
  };

  const fetchAllCoins = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const allCoins = await getAllCoins();
    setAllCoins(allCoins);
    setIsLoading(false);
  };
  const fetchCoinInfo = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const coinInfo = await getDetailedCoinData(selectedCoinId);
    setSelectedCoin(coinInfo);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchAllCoins();
  }, []);
  useEffect(() => {
    if (selectedCoinId) {
      fetchCoinInfo();
    }
  }, [selectedCoinId]);

  const handlerNewAsset = async () => {
    const newAsset = {
      id: selectedCoin.id,
      //to do : here implement uuid
      unique_id: selectedCoin.id + Math.random(0, 1e6),
      name: selectedCoin.name,
      image: selectedCoin.image.small,
      ticker: selectedCoin.symbol.toUpperCase(),
      quantityBought: parseFloat(boughtAssetQuantity),
      priceBought: selectedCoin.market_data.current_price.usd,
    };
    const newAssets = [...assetsInStorage, newAsset];
    const jsonValue = JSON.stringify(newAssets);
    await AsyncStorage.setItem("@portfolio_coins", jsonValue);
    setAssetsInStorage(newAssets);
    navigation.goBack();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <SearchableDropwDown
          items={allCoins}
          onItemSelect={(item) => setSelectedCoinId(item.id)}
          containerStyle={styles.dropdownContainer}
          itemStyle={styles.item}
          itemTextStyle={{
            color: "white",
          }}
          resetValue={false}
          placeholder={selectedCoinId || "Select a coin..."}
          placeholderTextColor="white"
          textInputProps={{
            underlineColorAndroid: "transparent",
            style: styles.textInput,
          }}
        />
        {selectedCoin && (
          <>
            <View style={styles.boughtContainer}>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={{ color: "white", fontSize: 90 }}
                  value={boughtAssetQuantity}
                  placeholder="0"
                  keyboardType="numeric"
                  onChangeText={setBoughtAssetQuantity}
                />
                <Text style={styles.ticker}>
                  {selectedCoin.symbol.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.pricePerCoin}>
                ${selectedCoin.market_data.current_price.usd} per coin
              </Text>
            </View>
            <Pressable
              style={{
                ...styles.buttonContainer,
                backgroundColor: isQuantityEmpty() ? "#303030" : "#4169E1",
              }}
              onPress={handlerNewAsset}
              disabled={isQuantityEmpty()}
            >
              <Text
                style={{
                  ...styles.buttonText,
                  color: isQuantityEmpty() ? "grey" : "white",
                }}
              >
                Add New Asset
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

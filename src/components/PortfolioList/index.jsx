import { View, Text, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue, useRecoilState } from "recoil";
import { SwipeListView } from "react-native-swipe-list-view";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./styles";
import PortfolioItem from "../PortfolioItem";
import {
  allPortfolioAssets,
  allPortfolioBoughtAssetsInStorage,
} from "./../../atoms/PortfolioAssets";

export default function PortfolioList() {
  const navigation = useNavigation();
  // const [assets, setAssets] = useRecoilState(allPortfolioAssets);
  const assets = useRecoilValue(allPortfolioAssets);
  const [storageAssets, setStorageAssets] = useRecoilState(
    allPortfolioBoughtAssetsInStorage
  );
  const getCurrentBalance = () =>
    assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.currentPrice * currentAsset.quantityBought,
      0
    );

  const getCurrentValueChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.priceBought * currentAsset.quantityBought,
      0
    );
    return (currentBalance - boughtBalance).toFixed(2);
  };

  const getCurrentPercentageChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.priceBought * currentAsset.quantityBought,
      0
    );
    return (
      (((currentBalance - boughtBalance) / boughtBalance) * 100).toFixed(2) || 0
    );
  };
  const formatCurrentBalance = (fn) => {
    const totalFixed = new Intl.NumberFormat().format(fn);
    return totalFixed;
  };
  const handleDeleteAsset = async (asset) => {
    const newAssets = storageAssets.filter(
      (coin) => coin.unique_id !== asset.item.unique_id
    );
    const jsonValue = JSON.stringify(newAssets);
    await AsyncStorage.setItem("@portfolio_coins", jsonValue);
    setStorageAssets(newAssets);
  };
  const renderDeleteButton = (data) => {
    return (
      <Pressable
        style={styles.deleteButtonContainer}
        onPress={() => handleDeleteAsset(data)}
      >
        <FontAwesome name="trash-o" size={24} color="white" />
      </Pressable>
    );
  };
  return (
    <SwipeListView
      data={assets}
      renderItem={({ item }) => <PortfolioItem item={item} />}
      //fix warning if repeat same coin and prevent if delete don't delete all same coins.
      keyExtractor={({ id }, index) => `${id}${index}`}
      ListHeaderComponent={
        <>
          <View style={styles.balanceContainer}>
            <View>
              <Text style={styles.currentBalance}>Current Balance</Text>
              <Text style={styles.currentBalanceValue}>
                ${formatCurrentBalance(getCurrentBalance().toFixed(2))}
              </Text>
              <Text
                style={{
                  ...styles.valueChange,
                  color: getCurrentValueChange() >= 0 ? "#16c784" : "#ea3943",
                }}
              >
                ${formatCurrentBalance(getCurrentValueChange())} (All Time)
              </Text>
            </View>
            <View
              style={{
                ...styles.priceChangePercentageContainer,
                backgroundColor:
                  getCurrentValueChange() >= 0 ? "#16c784" : "#ea3943",
              }}
            >
              <AntDesign
                name={getCurrentValueChange() >= 0 ? "caretup" : "caretdown"}
                size={12}
                color="white"
                style={{ alignSelf: "center", marginRight: 5 }}
              />
              <Text style={styles.percentageChange}>
                {getCurrentPercentageChange()}%
              </Text>
            </View>
          </View>
          <Text style={styles.assetsTitle}>Your Assets</Text>
        </>
      }
      renderHiddenItem={(data) => renderDeleteButton(data)}
      rightOpenValue={-70}
      disableRightSwipe
      closeOnRowPress
      ListFooterComponent={
        <Pressable
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("AddNewAssetScreen")}
        >
          <Text style={styles.buttonText}>Add New Asset</Text>
        </Pressable>
      }
    />
  );
}

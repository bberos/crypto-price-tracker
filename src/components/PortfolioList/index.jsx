import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import PortfolioItem from "../PortfolioItem";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue, useRecoilState } from "recoil";
import { allPortfolioAssets } from "./../../atoms/PortfolioAssets";

export default function PortfolioList() {
  const navigation = useNavigation();
  // const [assets, setAssets] = useRecoilState(allPortfolioAssets);
  const assets = useRecoilValue(allPortfolioAssets);
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
  return (
    <FlatList
      data={assets}
      renderItem={({ item }) => <PortfolioItem item={item} />}
      ListHeaderComponent={
        <>
          <View style={styles.balanceContainer}>
            <View>
              <Text style={styles.currentBalance}>Current Balance</Text>
              <Text style={styles.currentBalanceValue}>
                ${getCurrentBalance().toFixed(2)}
              </Text>
              <Text
                style={{
                  ...styles.valueChange,
                  color: getCurrentValueChange() >= 0 ? "#16c784" : "#ea3943",
                }}
              >
                ${getCurrentValueChange()} (All Time)
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

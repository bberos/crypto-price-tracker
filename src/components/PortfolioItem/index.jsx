import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";

export default function PortfolioItem({ item }) {
  console.log("🚀 ~ file: index.jsx ~ line 7 ~ PortfolioItem ~ item", item);
  const {
    currentPrice,
    image,
    name,
    priceBought,
    priceChangePercentage,
    quantityBought,
    ticker,
  } = item;

  const isChangePositive = () => {
    priceChangePercentage >= 0;
  };

  const renderHoldings = () => (quantityBought * currentPrice).toFixed(2);

  return (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: image }}
        style={{ height: 30, width: 30, marginRight: 10, alignSelf: "center" }}
      />
      <View>
        <Text style={styles.coinName}>{name}</Text>
        <Text style={styles.coinCode}>{ticker}</Text>
      </View>
      <View style={{ marginLeft: "auto" }}>
        <Text style={styles.coinName}>${currentPrice}</Text>
        <View style={{ flexDirection: "row" }}>
          <AntDesign
            name={isChangePositive() ? "caretup" : "caretdown"}
            size={12}
            color={isChangePositive() ? "#16c784" : "#ea3943"}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text
            style={{
              color: isChangePositive() ? "#16c784" : "#ea3943",
              fontWeight: "600",
            }}
          >
            {priceChangePercentage.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.coinName}>${renderHoldings()}</Text>
        <Text style={styles.coinCode}>
          {quantityBought} {ticker}
        </Text>
      </View>
    </View>
  );
}

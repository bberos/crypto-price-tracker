import React from "react";
import { View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import { ChartYLabel } from "@rainbow-me/animated-charts";
export default function index(props) {
  const { name, currentPrice, priceChangePercentage24h } = props;
  const percentageColor = priceChangePercentage24h < 0 ? "#ea3943" : "#16c784";
  const formatCurrency = (value) => {
    // Worklet for formatting data from the chart. It can be useful when your data is a timestamp or currency.
    "worklet";
    if (value === "") {
      return `$${currentPrice.usd.toFixed(2)}`;
    }
    return `$${parseFloat(value).toFixed(2)}`;
  };
  return (
    <View style={styles.priceContainer}>
      <View>
        <Text style={styles.coinName}>{name}</Text>
        <ChartYLabel format={formatCurrency} style={styles.priceText} />
      </View>
      <View
        style={{
          paddingVertical: 8,
          paddingHorizontal: 5,
          borderRadius: 5,
          flexDirection: "row",
          backgroundColor: percentageColor,
        }}
      >
        <AntDesign
          name={priceChangePercentage24h < 0 ? "caretdown" : "caretup"}
          size={12}
          color="white"
          style={{ alignSelf: "center", marginRight: 5 }}
        />
        <Text style={styles.percentage}>
          {priceChangePercentage24h.toFixed(2)}%
        </Text>
      </View>
    </View>
  );
}

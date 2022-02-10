import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";

export default function PortfolioItem() {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: "" }} style={{ height: 30, width: 30 }} />
      <View>
        <Text style={styles.coinName}>Bitcoin</Text>
        <Text style={styles.coinCode}>BTC</Text>
      </View>
      <View style={{ marginLeft: "auto" }}>
        <Text style={styles.coinName}>$4000</Text>
        <View style={{ flexDirection: "row" }}>
          <AntDesign
            name={"caretup"}
            size={12}
            color="#16c784"
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={{ color: "#16c784", fontWeight: "600" }}>1.2%</Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.coinName}>$44973</Text>
        <Text style={styles.coinCode}>1 BTC</Text>
      </View>
    </View>
  );
}

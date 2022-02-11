import React, { Suspense } from "react";
import { View, Text, FlatList } from "react-native";
import PortfolioList from "../../components/PortfolioList";

export default function PortfolioScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Suspense fallback={<Text style={{ color: "white" }}>Loading</Text>}>
        <PortfolioList />
      </Suspense>
    </View>
  );
}

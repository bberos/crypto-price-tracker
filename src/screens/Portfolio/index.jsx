import React, { Suspense } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import PortfolioList from "../../components/PortfolioList";

export default function PortfolioScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Suspense
        fallback={
          <Text style={{ color: "white", alignSelf: "center" }}>
            <ActivityIndicator />
          </Text>
        }
      >
        <PortfolioList />
      </Suspense>
    </View>
  );
}

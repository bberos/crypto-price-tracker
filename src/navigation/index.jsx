import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoinDetail from "./../screens/CoinDetail";
import BottomTabNavigator from "./BottomTabNavigator";
const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Root"
    >
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="CoinDetail" component={CoinDetail} />
    </Stack.Navigator>
  );
}
export default Navigation;

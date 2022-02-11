import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";
import FavouritesProvider from "./src/context/FavouritesProvider";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: "#121212",
        },
      }}
    >
      <RecoilRoot>
        <FavouritesProvider>
          <View style={styles.container}>
            <Navigation />
            <StatusBar style="light" />
          </View>
        </FavouritesProvider>
      </RecoilRoot>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 50,
  },
});

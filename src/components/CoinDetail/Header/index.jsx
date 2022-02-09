import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons, EvilIcons, FontAwesome } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useFavourites } from "./../../../context/FavouritesProvider";

export default function index(props) {
  const { coinId, image, symbol, marketCapRank } = props;
  const navigation = useNavigation();
  const { favouritesCoinIds, storeFavouritesCoinId, removeFavouritesCoinId } =
    useFavourites();

  const checkIfIsFavourite = () =>
    favouritesCoinIds.some((coinIdValue) => coinIdValue === coinId);

  const handleFavouriteCoin = () => {
    if (checkIfIsFavourite()) {
      return removeFavouritesCoinId(coinId);
    }
    return storeFavouritesCoinId(coinId);
  };
  return (
    <View style={styles.headerContainer}>
      <Ionicons
        name="chevron-back-sharp"
        size={30}
        color="white"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.coinContainer}>
        <Image source={{ uri: image }} style={{ width: 25, height: 25 }} />
        <Text style={styles.symbolText}>{symbol.toUpperCase()}</Text>
        <View style={styles.rankContainer}>
          <Text style={{ color: "white", fontSize: 17 }}>#{marketCapRank}</Text>
        </View>
      </View>
      <FontAwesome
        name={checkIfIsFavourite() ? "star" : "star-o"}
        size={25}
        color={checkIfIsFavourite() ? "#FFBF00" : "white"}
        onPress={() => handleFavouriteCoin()}
      />
    </View>
  );
}

import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import SearchableDropwDown from "react-native-searchable-dropdown";
import styles from "./styles";

export default function AddNewAssetScreen() {
  const [boughtAsset, setBoughtAsset] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <SearchableDropwDown
        items={[]}
        onItemSelect={(item) => console.log(item)}
        containerStyle={styles.dropdownContainer}
        itemStyle={styles.item}
        itemTextStyle={{
          color: "white",
        }}
        resetValue={false}
        placeholder={"Select a coin..."}
        placeholderTextColor="white"
        textInputProps={{
          underlineColorAndroid: "transparent",
          style: styles.textInput,
        }}
      />
      <View style={styles.boughtContainer}>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={{ color: "white", fontSize: 90 }}
            value={boughtAsset}
            placeholder="0"
            keyboardType="numeric"
            onChangeText={setBoughtAsset}
          />
          <Text style={styles.ticker}>BTC</Text>
        </View>
        <Text style={styles.pricePerCoin}>$4000 per coin</Text>
      </View>
      <Pressable
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("AddNewAssetScreen")}
      >
        <Text style={styles.buttonText}>Add New Asset</Text>
      </Pressable>
    </View>
  );
}

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 15,
  },
  coinName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  coinCode: {
    color: "grey",
    fontWeight: "600",
  },
  quantityContainer: {
    marginLeft: "auto",
    alignItems: "flex-end",
  },
});

export default styles;

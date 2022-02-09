import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  coinName: {
    color: "white",
    fontSize: 15,
  },
  priceText: {
    color: "white",
    fontSize: 30,
    fontWeight: "600",
    letterSpacing: 1,
  },
  priceContainer: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  percentageContainer: {
    padding: 5,
    borderRadius: 5,
    flexDirection: "row",
  },
  percentage: {
    fontSize: 17,
    color: "white",
    fontWeight: "500",
  },
});
export default styles;

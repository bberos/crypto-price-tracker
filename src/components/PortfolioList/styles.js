import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  currentBalance: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  currentBalanceValue: {
    color: "white",
    fontWeight: "700",
    fontSize: 40,
    letterSpacing: 1,
  },
  valueChange: {
    fontWeight: "600",
    fontSize: 16,
  },
  percentageChange: {
    color: "white",
    fontWeight: "500",
    fontSize: 17,
  },
  priceChangePercentageContainer: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  assetsTitle: {
    color: "white",
    fontWeight: "700",
    fontSize: 23,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: "#4169E1",
    padding: 10,
    alignItems: "center",
    marginVertical: 25,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },
  deleteButtonContainer: {
    flex: 1,
    backgroundColor: "#EA3943",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 25,
    marginLeft: 20,
  },
});

export default styles;

import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#282828",
    padding: 15,
  },
  icon: {
    height: 35,
    width: 35,
    marginRight: 10,
    alignSelf: "center",
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  dataContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  rankContainer: {
    backgroundColor: "#585858",
    paddingHorizontal: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  rank: {
    color: "white",
  },
  ticket: {
    color: "white",
    marginRight: 5,
    textTransform: "uppercase",
  },
  lastColumn: {
    marginLeft: "auto",
    alignItems: "flex-end",
  },
  price: {
    color: "white",
  },
  mcap: {
    color: "white",
  },
});
export default styles;

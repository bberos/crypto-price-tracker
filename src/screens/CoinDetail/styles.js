import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    width: 130,
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    padding: 10,
    fontSize: 16,
    color: "white",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2b2b2b",
    paddingVertical: 5,
    // borderRadius: 5,
    // marginHorizontal: 5,
    marginVertical: 10,
  },
});
export default styles;

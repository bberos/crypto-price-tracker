import { Text, Pressable } from "react-native";
import React, { memo } from "react";

const Filter = (props) => {
  const { filterDay, filterText, selectedRange, setSelectedRange } = props;
  const isSelected = (filter) => filter === selectedRange;
  return (
    <Pressable
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: isSelected(filterDay) ? "#1e1e1e" : "transparent",
      }}
      onPress={() => setSelectedRange(filterDay)}
    >
      <Text style={{ color: isSelected(filterDay) ? "white" : "grey" }}>
        {filterText}
      </Text>
    </Pressable>
  );
};
export default memo(Filter);

import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { getBorderColor } from "../helperFunctions/styleFunctions";

const bloodStatusItem = (props) => {

  function displayBloodType() {
    if (!props.bloodTypeError) {
      return { display: "flex" };
    } else {
      return { display: "none" };
    }
  }

  return (
    <TouchableOpacity
      style={[styles.containerStatus, getBorderColor(props.status)]}
      onPress={props.refresh}
    >
      <Text style={[{ fontSize: 65 }, displayBloodType()]}>
        {props.bloodType}
      </Text>
      <Text style={{ fontSize: 14 }}>Tap to refresh</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStatus: {
    height: 225,
    width: 225,
    margin: 25,
    borderWidth: 10,
    borderRadius: 365,
    borderColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default bloodStatusItem;

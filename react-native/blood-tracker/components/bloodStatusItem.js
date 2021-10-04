import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const bloodStatusItem = (props) => {
  
  function getBorderColor(status) {
    if (status === "Needed") return { borderColor: "salmon" };
    if (status === "Ok") return { borderColor: "yellow" };
    if (status === "Good") return { borderColor: "lightgreen" };
  }

  function displayBloodStatus() {
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
      <Text style={[{ fontSize: 65 }, displayBloodStatus()]}>
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
    alignItems: "center",
    justifyContent: "center",
  },
});

export default bloodStatusItem;

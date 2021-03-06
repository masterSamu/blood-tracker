/** @author Samu */

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { getBorderColor } from "../helperFunctions/styleFunctions";
import ActivityIndicatorComponent from "./ActivityIndicator";

const bloodStatusItem = (props) => {
  return (
    <View style={styles.container}>
      {props.isLoading ? (
        <ActivityIndicatorComponent
          isLoading={props.isLoading}
        ></ActivityIndicatorComponent>
      ) : (
        <TouchableOpacity
          style={[styles.containerStatus, getBorderColor(props.status)]}
          onPress={props.refresh}
          underlayColor={"black"}
        >
          <Text style={{ fontSize: 65 }}>
            {props.bloodType}
          </Text>
          <Text style={{ fontSize: 14 }}>Touch to refresh</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 225,
    width: 225,
    margin: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  containerStatus: {
    height: "100%",
    width: "100%",
    borderWidth: 10,
    borderRadius: 365,
    borderColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default bloodStatusItem;

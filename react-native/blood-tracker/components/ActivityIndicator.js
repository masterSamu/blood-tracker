/** @author Samu */

import React from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";

const ActivityIndicatorComponent = (props) => {
  return (
    <View>
      <Text style={styles.ActivityIndicatorText}>Loading..</Text>
      <ActivityIndicator
        style={styles.ActivityIndicator}
        visible={props.isLoading}
        size="large"
        color="lightgrey"
      />
    </View>
  );
};

export default ActivityIndicatorComponent;

const styles = StyleSheet.create({
  ActivityIndicator: {
    transform: [{ scaleX: 5 }, { scaleY: 5 }],
  },
  ActivityIndicatorText: {
    top: 20,
    fontSize: 20,
    color: "black",
  },
});

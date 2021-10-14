import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import BloodStatus from "./screens/bloodStatus";
import bloodAllStatus from "./screens/bloodAllStatus";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.mainContainer}>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#FF9999",
            paddingTop: 50
          }
        }}
      >
        <Drawer.Screen
          name="My Bloodtype"
          component={BloodStatus}
          options={screenOptions}
        />
        <Drawer.Screen
          name="All Bloodtypes"
          component={bloodAllStatus}
          options={screenOptions}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const screenOptions = {
  headerStyle: { backgroundColor: "#FF9999" },
  headerTintColor: "black",
  headerTitleStyle: { fontSize: 24 },
  drawerActiveTintColor: "black",
  drawerActiveBackgroundColor: "white",
  drawerItemStyle: {padding: 20, marginVertical: 10},
  drawerLabelStyle: {fontSize: 20},
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    marginTop: 50,
  },
});

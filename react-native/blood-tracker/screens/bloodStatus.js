import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import * as Notifications from "expo-notifications";
import { checkBloodTypeState } from "../helperFunctions/bloodTypeFunctions";
import BloodStatusItem from "../components/bloodStatusItem";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const bloodStatus = () => {
  const [bloodData, setBloodData] = useState();
  const [id, setId] = useState();
  const [status, setStatus] = useState("Good");
  const [bloodType, setBloodType] = useState("B+");
  const [bloodTypeError, setBloodTypeError] = useState(false);

  useEffect(() => {
    fetchBloodData();
    if (status === "Needed") {
      activatePushNotification();
    }
  }, [bloodType]);

  async function fetchBloodData() {
    console.log("Fetching..");
    console.log("bloodtype: " + bloodType);
    let res = null;
    try {
      res = await fetch(
        "https://bloodtracker.ew.r.appspot.com/rest/bloodservice/getdataforonebloodtype",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bloodType: bloodType,
          }),
        }
      );
    } catch (error) {
      console.log(error);
    }

    try {
      const responseData = await res.json();
      console.log(responseData);
      if (responseData !== null) {
        setBloodData(responseData);
        setStatus(checkBloodTypeState(responseData));
        setBloodTypeError(false);
      } else {
        setBloodTypeError(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handlePress() {
    fetchBloodData();
    if (status === "Needed") {
      activatePushNotification();
    }
  }

  return (
    <View style={styles.container}>
      <BloodStatusItem
        status={status}
        bloodType={bloodType}
        refresh={handlePress}
      ></BloodStatusItem>
      <Text>Current blood status: {status}</Text>
    </View>
  );
};
export default bloodStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerStatus: {
    height: 200,
    width: 200,
    margin: 25,
    borderWidth: 10,
    borderRadius: 365,
    alignItems: "center",
    justifyContent: "center",
  },
});

async function activatePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Your blood is needed now!",
      body: "Come donate your blood now.",
    },
    trigger: { seconds: 2 },
  });
}

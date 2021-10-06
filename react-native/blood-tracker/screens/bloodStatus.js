import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Notifications from "expo-notifications";
import { checkBloodTypeState } from "../helperFunctions/bloodTypeFunctions";
import BloodStatusItem from "../components/bloodStatusItem";
import AddBloodTypeModal from "../components/AddBloodTypeModal";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const bloodStatus = () => {
  const [status, setStatus] = useState("");
  const [bloodType, setBloodType] = useState(""); // This value should come from SQLite
  const [bloodTypeError, setBloodTypeError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (bloodType === "") {
      setModalVisible(true);
    } else {
      fetchBloodData();
    }
    if (status === "Needed") {
      activatePushNotification();
    }
  }, [bloodType]);


  async function fetchBloodData() {
    if (bloodType !== "" && bloodType !== null) {
      setIsLoading(true);
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
          setStatus(checkBloodTypeState(responseData));
          setBloodTypeError(false);
        } else {
          setBloodTypeError(true);
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }
  }

  function handlePress() {
    setStatus("");
    fetchBloodData();
    if (status === "Needed") {
      activatePushNotification();
    }
  }

  function openModal() {
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Status for your blood type</Text>
      <BloodStatusItem
        status={status}
        bloodType={bloodType}
        refresh={handlePress}
        bloodTypeError={bloodTypeError}
        isLoading={isLoading}
      ></BloodStatusItem>
      <Text>Current blood status: {status}</Text>

      <Button onPress={openModal} title="Open add blood status" />
      <AddBloodTypeModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setBloodType={setBloodType}
      ></AddBloodTypeModal>
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
});

async function activatePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "We need your blood!",
      body: "Come donate now.",
    },
    trigger: { seconds: 1 },
  });
}

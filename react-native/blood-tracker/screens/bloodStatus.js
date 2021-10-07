import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Notifications from "expo-notifications";
import { checkBloodTypeState } from "../helperFunctions/bloodTypeFunctions";
import BloodStatusItem from "../components/bloodStatusItem";
import AddBloodTypeModal from "../components/AddBloodTypeModal";
import { getBLoodDataForBloodType } from "../Fetch/Fetch";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const bloodStatus = () => {
  const [status, setStatus] = useState("");
  const [bloodType, setBloodType] = useState("O+"); // This value should come from SQLite
  const [bloodTypeError, setBloodTypeError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [generalError, setGeneralError] = useState(false);

  useEffect(() => {
    if (bloodType === "") {
      //setModalVisible(true);  uncomment this when app is finished.
    } else {
      getBloodData();
    }
    if (status === "Needed") {
      activatePushNotification();
    }
  }, [bloodType]);

  async function getBloodData() {
    setIsLoading(true);
    if (bloodType !== "" && bloodType !== null) {
      try {
        const bloodData = await getBLoodDataForBloodType(bloodType);
        if (bloodData !== null) {
          setStatus(checkBloodTypeState(bloodData));
          setBloodTypeError(false);
        } else {
          setBloodTypeError(true);
        }
      } catch (error) {
        console.log(error)
        setGeneralError(true)
        setStatus(null)
      }
    }
    setIsLoading(false);
  }

  function handlePress() {
    setStatus("");
    getBloodData();
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
        generalError={generalError}
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

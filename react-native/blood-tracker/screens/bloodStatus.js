import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import * as SQLite from "expo-sqlite";
import { checkBloodTypeState } from "../helperFunctions/bloodTypeFunctions";
import BloodStatusItem from "../components/bloodStatusItem";
import AddBloodTypeModal from "../components/AddBloodTypeModal";
import { getBLoodDataForBloodType } from "../Fetch/Fetch";
import {init, fetchAllBloodData} from "../sql/db"

init()
  .then(() => {
    console.log("Database creation succeeded!");
  })
  .catch((err) => {
    console.log("Database IS NOT initialized! " + err);
  });

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true
  }),
});

const bloodStatus = () => {
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState();
  const [bloodType, setBloodType] = useState("");
  const [bloodTypeError, setBloodTypeError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [generalError, setGeneralError] = useState(false);

  useEffect(() => {
    setUserBloodType()
  }, [])

  useEffect(() => {
    if (bloodType === "") {
      setModalVisible(true);
    } else {
      setModalVisible(false)
      setBloodStatus();
    }
  }, [bloodType]);

  useEffect(() => {
    if (status === "Needed") {
      activatePushNotification();
    }
  }, [status])

  async function setUserBloodType() {
    let userBloodType = "";
    let userId = null;
    try {
      const dbResult = await fetchAllBloodData();
      if (dbResult.rows._array.length > 0) {
        userBloodType = dbResult.rows._array[0].bloodType;
        userId = dbResult.rows._array[0].id
      } else {
        console.log("result is empty")
      }
    } catch (error) {
      console.log(error)
      Alert.alert("Error! Unable to read data.")
    } finally {
      setUserId(userId);
      setBloodType(userBloodType);
    }
  }

  async function setBloodStatus() {
    setIsLoading(true);
    let status = "";
    if (bloodType !== "" || bloodType !== null) {
      try {
        const bloodData = await getBLoodDataForBloodType(bloodType);
        if (bloodData !== null) {
          status = checkBloodTypeState(bloodData);
          setBloodTypeError(false);
        } else {
          setBloodTypeError(true);
        }
      } catch (error) {
        console.log(error)
        setGeneralError(true)
        setStatus(status)
      } finally {
        setStatus(status);
      }
    }
    setIsLoading(false);
  }

  function handlePress() {
    setStatus("");
    setBloodStatus();
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
      <Text style={{marginBottom: 10}}>Current blood status: {status}</Text>

      <Button onPress={openModal} title="Change blood type" />
      <AddBloodTypeModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        currentBloodType={bloodType}
        setBloodType={setBloodType}
        userId={userId}
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

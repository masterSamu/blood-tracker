/**@author Samu */

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as Notifications from "expo-notifications";
import * as SQLite from "expo-sqlite";
import { checkBloodTypeState } from "../helperFunctions/bloodTypeFunctions";
import BloodStatusItem from "../components/bloodStatusItem";
import AddBloodTypeModal from "../components/AddBloodTypeModal";
import ErrorMsg from "../components/ErrorMsg";
import { getBLoodDataForBloodType } from "../Fetch/Fetch";
import { init, fetchAllBloodData } from "../sql/db";

init()
  .then(() => {
    console.log("Database creation succeeded!");
  })
  .catch((err) => {
    console.log("Database IS NOT initialized! " + err);
  });

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
  }),
});

const bloodStatus = () => {
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState();
  const [bloodType, setBloodType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [fetchingError, setFetchingError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setUserBloodType();
  }, []);

  useEffect(() => {
    if (bloodType === "") {
      setModalVisible(true);
    } else {
      setModalVisible(false);
      setBloodStatus();
    }
  }, [bloodType]);

  useEffect(() => {
    if (status === "Needed") {
      activatePushNotification();
    }
  }, [status]);

  async function setUserBloodType() {
    let userBloodType = "";
    let userId = null;
    try {
      const dbResult = await fetchAllBloodData();
      if (dbResult.rows._array.length > 0) {
        userBloodType = dbResult.rows._array[0].bloodType;
        userId = dbResult.rows._array[0].id;
      }
    } catch (error) {
      console.log(error);
      setFetchingError(true);
      setErrorMsg("Unable to read user's blood type");
    } finally {
      setUserId(userId);
      setBloodType(userBloodType);
      setFetchingError(false);
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
        }
      } catch (error) {
        console.log(error);
        setFetchingError(true);
        setErrorMsg("Unable to check blood status.");
        setStatus(status);
      } finally {
        setStatus(status);
        setFetchingError(false);
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
      <ErrorMsg error={fetchingError} message={errorMsg}></ErrorMsg>
      <Text style={{ fontSize: 26 }}>Status for your blood type</Text>
      <BloodStatusItem
        status={status}
        bloodType={bloodType}
        refresh={handlePress}
        isLoading={isLoading}
      ></BloodStatusItem>
      <Text style={{ marginBottom: 10, fontSize: 18 }}>
        Current blood status: {status}
      </Text>

      <TouchableOpacity style={styles.changeBtn} onPress={openModal} >
        <Text style={styles.changeBtnText}>Change blood type</Text>
      </TouchableOpacity>
      <AddBloodTypeModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        currentBloodType={bloodType}
        setBloodType={setBloodType}
        userId={userId}
        setUserDataFromSQLite={setUserBloodType()}
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
  changeBtn: {
    backgroundColor: "#FF9999",
    padding: 15,
    borderRadius: 8,
    margin: 20,
  },
  changeBtnText: {
    color: "#000",
    fontSize: 18,
  }
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

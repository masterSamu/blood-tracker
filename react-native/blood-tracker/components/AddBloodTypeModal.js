import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, Pressable, Alert } from "react-native";
import BloodDropDownPicker from "./BloodDropDownPicker";
import * as SQLite from "expo-sqlite";
import { init, addBloodType, updateUserBloodType } from "../sql/db";

// Temporarly blood data for testing.
let bloods = [{ id: 1, bloodType: "AB+" }, { id: 2, bloodType: "O-" }];

init()
  .then(() => {
    console.log("Database creation succeeded!");
  })
  .catch((err) => {
    console.log("Database IS NOT initialized! " + err);
  });

const AddBloodTypeModal = (props) => {
  const [bloodTypeList, setBloodTypeList] = useState([]);
  const [selectedBloodType, setSelectedBloodType] = useState("");

  useEffect(() => {
    setBloodTypeList(bloods);
  }, []);

  async function saveBloodType() {
    if (selectedBloodType !== "") {
      try {
        const dbReturn = await addBloodType(selectedBloodType);
      } catch (error) {
        console.log(error);
        Alert.alert("Unable to save blodo type. Try again later.");
      } finally {
        props.setBloodType(selectedBloodType);
        props.setModalVisible(false);
        console.log("Bloodtype saved");
      }
    } else {
      console.log("selectedBloodType is null");
    }
  }

  async function updateBloodType() {
    if (props.userId !== null) {
      try {
        await updateUserBloodType(selectedBloodType, props.userId);
      } catch (error) {
        console.log(error);
        Alert.alert("Unable to update blood type. Try again later");
      } finally {
        props.setBloodType(selectedBloodType);
        props.setModalVisible(false);
        console.log("Bloodtype updated");
      }
    } else {
      console.log("userId is null");
    }
  }

  function handleSelection() {
    if (props.bloodType === "") {
      saveBloodType();
    } else {
      updateBloodType();
    }
  }

  return (
    <View>
      <Modal
        style={styles.modalWindow}
        animationType="fade"
        transparent={true}
        visible={props.modalVisible}
      >
        <View style={styles.container}>
          <Text style={{ fontSize: 25, margin: 15 }}>
            Select your blood type
          </Text>
          <BloodDropDownPicker
            setModalVisible={props.setModalVisible}
            items={bloodTypeList}
            currentBloodType={props.currentBloodType}
            setSelectedBloodType={setSelectedBloodType}
          ></BloodDropDownPicker>
          <View style={styles.btnContainer}>
            <Pressable style={styles.btnSelect} onPress={handleSelection}>
              <Text style={{ fontSize: 25 }}>Select</Text>
            </Pressable>
            <Pressable
              onPress={() => props.setModalVisible(false)}
              style={styles.btnClose}
            >
              <Text style={{ fontSize: 25 }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddBloodTypeModal;

const styles = StyleSheet.create({
  modalWindow: {
    backgroundColor: "grey",
    justifyContent: "center",
    flexDirection: "column",
  },
  container: {
    height: "100%",
    marginTop: "auto",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#FF7F7F",
    padding: 15,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  btnSelect: {
    padding: 10,
    margin: 10,
    backgroundColor: "lightgreen",
    borderWidth: 2,
  },
  btnClose: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    backgroundColor: "lightgrey",
    borderWidth: 2,
  },
});

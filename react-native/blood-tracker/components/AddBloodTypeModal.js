import React, { useState } from "react";
import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import BloodDropDownPicker from "./BloodDropDownPicker";

// Temporarly blood data for testing.
let bloods = [
  { label: "AB+", value: "AB+" },
  { label: "O-", value: "O-" },
];

const AddBloodTypeModal = (props) => {
  const [bloodTypeList, setBloodTypeList] = useState(bloods);
  const [selectedBloodType, setSelectedBloodType] = useState("");

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
            setSelectedBloodType={setSelectedBloodType}
          ></BloodDropDownPicker>
          <View style={styles.btnContainer}>
            <Pressable style={styles.btnSelect}>
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
    height: "50%",
    marginTop: "auto",
    justifyContent: "space-evenly",
    alignItems: "center",
    opacity: 0.85,
    backgroundColor: "lightgrey",
    padding: 15
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
  },
  btnSelect: {
    padding: 10,
    margin: 10,
    backgroundColor: "lightgreen"
  },
  btnClose: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    backgroundColor: "lightgrey",
  },
});

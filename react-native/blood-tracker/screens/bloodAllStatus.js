import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { checkBloodTypeState } from "../helperFunctions/bloodTypeFunctions";

const bloodAllStatus = () => {
    const [bloodData, setBloodData] = useState();
    const [id, setId] = useState();
    const [allBloodtypes, setAllBloodtypes] = useState([]);
    const [bloodTypeError, setBloodTypeError] = useState(false);
    const [status, setStatus] = useState("Good");
    const [bloodType, setBloodType] = useState("0-");

    async function fetchAllBloodtypes(){
        await fetch("http://10.0.2.2:8080/rest/bloodservice/getdataforallbloodtypes") //Function returns a value, which is a parameter
        .then(parameter=>parameter.json()) //to the next part (parameter). And parameter.json() returns a value, which is a parameter
        .then(anotherParameter=>setAllBloodtypes(anotherParameter)); //to the next (anotherParameter), which is set to movies
    }

    function getBorderColor(status) {
      if (status === "Needed") return { borderColor: "salmon" };
      if (status === "Ok") return { borderColor: "lightyellow" };
      if (status === "Good") return { borderColor: "lightgreen" };
    }

    function displayBloodStatus() {
      if (!bloodTypeError) {
        return { display: "flex" };
      } else {
        return { display: "none" };
      }
    }

    return (
        <View style={styles.container}>
          <View
            style={[styles.containerStatus, getBorderColor(status)]}
          >
            <Text style={[{ fontSize: 55 }, displayBloodStatus()]}>
              {bloodType}
            </Text>
          </View>
          <View
            style={[styles.containerStatus, getBorderColor(status)]}
          >
            <Text style={[{ fontSize: 55 }, displayBloodStatus()]}>
              {bloodType}
            </Text>
          </View>
          <View
            style={[styles.containerStatus, getBorderColor(status)]}
          >
            <Text style={[{ fontSize: 55 }, displayBloodStatus()]}>
              {bloodType}
            </Text>
          </View>
          <View
            style={[styles.containerStatus, getBorderColor(status)]}
          >
            <Text style={[{ fontSize: 55 }, displayBloodStatus()]}>
              {bloodType}
            </Text>
          </View>
        </View>
      );
};
export default bloodAllStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
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
  text: {
    
  },
});
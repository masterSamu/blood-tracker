import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from "react-native";
import { checkBloodTypeState } from "../helperFunctions/bloodTypeFunctions";

const bloodAllStatus = () => {
    const [bloodData, setBloodData] = useState();
    const [allBloodtypes, setAllBloodtypes] = useState([]);
    const [bloodTypeError, setBloodTypeError] = useState(false);
    const [status, setStatus] = useState();

    let bloodtypes = JSON.stringify(allBloodtypes);

    const abPlus = bloodtypes.slice(22, 25);
    const abMinus = bloodtypes.slice(62, 65);
    const bPlus = bloodtypes.slice(102, 104);
    const bMinus = bloodtypes.slice(141, 143);
    const aPlus = bloodtypes.slice(181, 183);
    const aMinus = bloodtypes.slice(221, 223);
    const oPlus = bloodtypes.slice(261, 263);
    const oMinus = bloodtypes.slice(300, 302);

    async function fetchAllBloodtypes(){
        await fetch("https://bloodtracker.appspot.com/rest/bloodservice/getdataforallbloodtypes") //Function returns a value, which is a parameter
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

    const pressHandler = () => {
      fetchAllBloodtypes();
      console.log("Pressed...")    
    }

    return (
      <View style={styles.container}>
      <Button onPress={pressHandler} title="fetch" />
      <ScrollView>
      <View  style={[styles.containerStatus, getBorderColor(status)]}>
        <Text style={[{ fontSize: 25 }, displayBloodStatus()]}>
          {abPlus}
        </Text>
      </View>
      <View style={[styles.containerStatus, getBorderColor(status)]}>
        <Text style={[{ fontSize: 25 }, displayBloodStatus()]}>
          {abMinus}
          </Text>
        </View>
      <View  style={[styles.containerStatus, getBorderColor(status)]}>
        <Text style={[{ fontSize: 25 }, displayBloodStatus()]}>
          {bPlus}
        </Text>
      </View>
      <View   style={[styles.containerStatus, getBorderColor(status)]}>
        <Text style={[{ fontSize: 25 }, displayBloodStatus()]}>
             {bMinus}
        </Text>
          </View>
      <View    style={[styles.containerStatus, getBorderColor(status)]}>
            <Text style={[{ fontSize: 25 }, displayBloodStatus()]}>
              {aPlus}
              </Text>
          </View>
          <View   style={[styles.containerStatus, getBorderColor(status)]}>
            <Text style={[{ fontSize: 25 }, displayBloodStatus()]}>
              {aMinus}
            </Text>
          </View>
          <View style={[styles.containerStatus, getBorderColor(status)]}>
            <Text style={[{ fontSize: 25 }, displayBloodStatus()]}>
              {oPlus}
            </Text>
          </View>
          <View style={[styles.containerStatus, getBorderColor(status)]}>
            <Text style={[{ fontSize: 25 }, displayBloodStatus()]}>
              {oMinus}
            </Text>
          </View>
          </ScrollView>
        </View>
      );

    }
export default bloodAllStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  containerStatus: {
    height: 100,
    width: 100,
    margin: 25,
    borderWidth: 10,
    borderRadius: 365,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    
  },
});
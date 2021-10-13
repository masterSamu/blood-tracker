import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from "react-native";
import { checkBloodTypeState } from "../helperFunctions/bloodTypeFunctions";
import { getBorderColor } from "../helperFunctions/styleFunctions";

const bloodAllStatus = () => {
    const [bloodData, setBloodData] = useState();
    const [allBloodtypes, setAllBloodtypes] = useState([]);
    const [bloodTypeError, setBloodTypeError] = useState(false);
    const [status, setStatus] = useState();
    const [bloodType, setBloodType] = useState();
    const [bloodStats, setArray] = useState([]);


    async function fetchAllBloodtypes(){
        await fetch("https://bloodtracker.appspot.com/rest/bloodservice/getdataforallbloodtypes") //Function returns a value, which is a parameter
        .then(parameter=>parameter.json()) //to the next part (parameter). And parameter.json() returns a value, which is a parameter
        .then(anotherParameter=>setAllBloodtypes(anotherParameter)); //to the next (anotherParameter), which is set to movies
    }

    useEffect(() => {
    makeArray();

    }, [allBloodtypes])

    function makeArray() {
      let newArray = [];
      allBloodtypes.forEach((item) => {
        console.log(item)
        newArray.push({bloodType: item.bloodType, status: checkBloodTypeState(item)})
      })
      setArray(newArray)
    }
      
    function displayBloodStatus() {
      if (!bloodTypeError) {
        return { display: "flex" };
      } else {
        return { display: "none" };
      }
    }

    //this fetches and updates

    const pressHandler = () => {

      fetchAllBloodtypes();
      console.log("Pressed...")
      
    }

  useEffect(() => {
    fetchAllBloodtypes();

  }, [])
    
    return (
      <View style={styles.container}>
      <Button onPress={pressHandler} title="Update" />
      <ScrollView>
     
      {
        bloodStats.map((item, index) => {
          return (
          <View key={index} style={[styles.containerStatus, getBorderColor(item.status)]}>
            <Text style={[{fontSize:25}, displayBloodStatus()]}>
              {item.bloodType}
            </Text>
            </View>
            
          )

      } )
      }

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
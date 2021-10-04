import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import {init, addPerson, fetchAllPerson} from './sqlconnection/db';
import * as SQLite from 'expo-sqlite';

init()
.then(()=>{
    console.log('Database creation succeeded! :)');
}).catch((err)=>{
  console.log('Database IS NOT initialized! '+err);
});


var index=1;
export default function App() {
  const [isInserted, setIsInserted]=useState(false);
  const [personList, setpersonList]=useState([]);
  const [newPersonFirstName, setNewPersonFirstName]=useState('');
  const [newPersonLastname, setNewPersonLastname]=useState('');
  const [newPersonBloodType, setNewPersonBloodType]=useState('');

  const addPersonHandler=()=>{
    setpersonList(personList=>[...personList, {firstname:newPersonFirstName, lastname:newPersonLastname, bloodType:newPersonBloodType}]);
    savePerson();
  }
  const firstnameInputHandler=(enteredText)=>{
    setNewPersonFirstName(enteredText);
  }
  const lastnameInputHandler=(enteredText)=>{
    setNewPersonLastname(enteredText);
  }
  const bloodtypeInputHandler=(enteredText)=>{
    setNewPersonBloodType(enteredText);
  }
  async function savePerson(){
    try{
      const dbResult = await addPerson(newPersonFirstName, newPersonLastname, newPersonBloodType);
      console.log(dbResult);
    }
    catch(err){
      console.log(err);
    }
    finally{
      setIsInserted(true);
    }
  }

  async function readAllPerson(){

    try{
      const dbResult = await fetchAllPerson(newPersonFirstName, newPersonLastname, newPersonBloodType);
      console.log("dbResult");
      //Take a look at the stucture of the dbResult printed below
      console.log(dbResult);
      //The structure tells that we have to use dbResult.rows._array
      setpersonList(dbResult.rows._array);
    }
    catch(err){
      console.log(err);
    }
    finally{
      console.log("Verta kehiin!");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputcontainer}>
        <TextInput placeholder="Etunimi" 
                  style={styles.inputStyle} 
                  onChangeText={firstnameInputHandler}
                  value={newPersonFirstName}/>  
        <TextInput placeholder="Sukunimi" 
                  style={styles.inputStyle} 
                  onChangeText={lastnameInputHandler}
                  value={newPersonLastname}/>  
        <TextInput placeholder="Verityyppi" 
                  style={styles.inputStyle} 
                  onChangeText={bloodtypeInputHandler}
                  value={newPersonBloodType}/>                                           
      </View>    

      <View style={styles.buttoncontainer}>
        <Button title="Add" onPress={addPersonHandler}/>
        <Button title="Read all" onPress={readAllPerson}/>
      </View>
      <View style={styles.flatliststyle}>
      <FlatList 
        // keyExtractor={item=>item.id.toString()}
        keyExtractor={item=>personList.indexOf(item).toString()}
        data={personList} 
        renderItem={itemData=>(
          <View style={styles.listItemStyle}>
            <Text>{itemData.item.donorID}) {itemData.item.firstName}. {itemData.item.lastname}. {itemData.item.bloodType}</Text>
          </View>
        )}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30,
  },
  inputcontainer: {
    flex: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',
  },
  buttoncontainer: {
    flex: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
  },
  inputStyle:{
    width:200,
    height:50,
    padding:10,
    borderWidth:2,
    borderColor:'#f00',
  },
  listItemStyle: {
    borderWidth: 1, 
    borderColor: 'blue', 
    padding: 5,
    backgroundColor:"#abc",
    marginVertical:5,
  },
  flatliststyle: {
    borderColor:'black',
    borderWidth:2,
    height:'100%',
    width:'80%',
    flex:1,
  },
});
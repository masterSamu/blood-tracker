/**
 *  Error message component to top of the screen.
 * @author Samu
 * @param boolean error
 * @param String message
 *  */ 


import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Pressable } from "react-native";

const errorMsg = (props) => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (props.error) setDisplay(true); 
    else setDisplay(false);
  }, [props.error]);

  function displayContainer() {
    if (display) return { display: "flex" };
    else return { display: "none" };
  }

  const hanldePress = () => {
    setDisplay(false);
    console.log(display)
  };

  return (
    <Pressable
      onPress={hanldePress}
      style={[styles.errorMsgContainer, displayContainer()]}
    >
      <Text style={styles.errorMsg}>{props.message}</Text>
      <Text style={{ fontSize: 16, color: "grey" }}>Touch to hide</Text>
    </Pressable>
  );
};

export default errorMsg;

const styles = StyleSheet.create({
  errorMsgContainer: {
    position: "relative",
    top: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "red",
    backgroundColor: "lightyellow",
    marginBottom: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  errorMsg: {
    color: "black",
    padding: 15,
    fontSize: 18,
  },
});

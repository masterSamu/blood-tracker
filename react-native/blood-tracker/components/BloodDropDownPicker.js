/** @author Samu */

import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const BloodDropDownPicker = (props) => {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setItems(props.items)
  }, [props.items])

  useEffect(() => {
    setValue(props.currentBloodType)
  }, [props.currentBloodType])

  return (
    <DropDownPicker
      listMode="FLATLIST"
      schema={{
        label: "bloodType",
        value: "bloodType"
      }}
      itemKey="id"
      open={open}
      setOpen={setOpen}
      items={items}
      setItems={setItems}
      value={value}
      setValue={setValue}
      placeholder={props.currentBloodType.length > 0 ? props.currentBloodType : "Select"}
      itemSeparator={true}
      closeAfterSelecting={true}
      onChangeValue={() => props.setSelectedBloodType(value)}
      style={{
        backgroundColor: "lightyellow",
      }}
      containerStyle={{
        width: "50%",
        height: 50
      }}
      textStyle={{
        fontSize: 30,
        fontWeight: "bold",
        marginLeft: "20%",
      }}
    />
  );
};

export default BloodDropDownPicker;

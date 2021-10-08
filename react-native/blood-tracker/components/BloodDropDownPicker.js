import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const BloodDropDownPicker = (props) => {
  const [items, setItems] = useState(props.items);
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setValue(props.currentBloodType)
  }, [])

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
      placeholder={props.currentBloodType === "" ? props.currentBloodType : "Select"}
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

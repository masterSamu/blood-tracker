import React, { useState } from "react";
import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const BloodDropDownPicker = (props) => {
  const [items, setItems] = useState(props.items);
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      listMode="FLATLIST"
      open={open}
      setOpen={setOpen}
      items={items}
      setItems={setItems}
      value={value}
      setValue={setValue}
      itemKey="value"
      placeholder={props.items.length > 0 ? props.items[0].value : "Select"}
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

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
      placeholder="Select your blood type"
      itemSeparator={true}
      closeAfterSelecting={true}
      onChangeValue={() => props.setModalVisible(false)}
    />
  );
};

export default BloodDropDownPicker;

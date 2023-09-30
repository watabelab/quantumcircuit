import React from "react";
import RadioButton from "./RadioButton";

const InputRadio = ({ items, handleChange, checkedValue }) => {
  return items.map((item) => (
    <RadioButton item={item} handleChange={handleChange} checkedValue={checkedValue} />
  ));
};

export default InputRadio;

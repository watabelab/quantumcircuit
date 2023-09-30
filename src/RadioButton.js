import React from "react";

const RadioButton = ({ item, handleChange, checkedValue }) => {
  return (
    <div>
      <label key={item.id}>
        <input
          type="radio"
          value={item.value}
          onChange={handleChange}
          checked={checkedValue === item.value}
          style={{ width: "30px", height: "30px" }}
        />
      </label>
    </div>
  );
};

export default RadioButton;

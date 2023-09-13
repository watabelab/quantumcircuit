import React from "react";
import Controlgate from "./Controlgate";

const Images_ctrl = ({ images }) => {
  return images.map((image) => <Controlgate image={image} />);
};

export default Images_ctrl;

import React from "react";
import Image from "./imageFunc";

const Images = ({ images }) => {
  return images.map((image) => <Image image={image} />);
};

export default Images;

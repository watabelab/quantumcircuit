import React from "react";
import CControlgate from "./CControlgate";

const Images_ctrl_ctrl = ({ images }) => {
    return images.map((image) => <CControlgate image={image} />);
};

export default Images_ctrl_ctrl;

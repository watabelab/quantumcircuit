import React from "react";

function Reload() {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div style={{ position: "absolute", left: "500px", bottom: "250px" }}>
      <button
        style={{
          width: "200px",
          height: "70px",
          // backgroundColor: "#fff",
          borderRadius: "8px",
          fontFamily: "sans-serif",
        }}
        onClick={reloadPage}
      >
        <i class="fa-solid fa-repeat" style={{ fontSize: "25px" }}></i>
        <span style={{ fontWeight: "bold", fontSize: "25px" }}> リセット</span>
      </button>
    </div>
  );
}

export default Reload;

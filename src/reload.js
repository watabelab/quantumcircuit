import React from "react";

function Reload() {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div style={{ position: "absolute", left: "200px", top: "500px" }}>
      <button style={{ width: "150px", height: "50px" }} onClick={reloadPage}>
        ページをリロード
      </button>
    </div>
  );
}

export default Reload;

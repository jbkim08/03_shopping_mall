import React from "react";

// variant: 'primary'(검은색) 또는 'danger'(빨간색)로 스타일에 변화를 줍니다.
function Button({ onClick, variant = "primary", children }) {
  const btnStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    color: "white",
    backgroundColor: variant === "danger" ? "#ff4d4f" : "#1890ff",
  };

  return (
    <button style={btnStyle} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;

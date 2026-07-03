import React from "react";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // Early Return 적용

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          minWidth: "300px",
        }}
      >
        {children} {/* 💡 알맹이가 들어갈 자리 */}
        <hr />
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default Modal;

import React from "react";
import Button from "./Button"; // 지난 시간에 만든 버튼 재사용!
import useCartStore from "../store/useCartStore";

function ProductCard({ product }) {
  const { addToCart } = useCartStore();
  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };
  return (
    <div style={cardStyle}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", borderRadius: "4px" }}
      />
      <h3>{product.name}</h3>
      <p style={{ color: "#888" }}>{product.price.toLocaleString()}원</p>

      {/* 우선은 클릭하면 알림창이 뜨는 임시 기능만 넣어둡니다. */}
      <Button
        onClick={() => {
          addToCart(product);
          alert("장바구니에 담겼습니다!");
        }}
      >
        장바구니 담기
      </Button>
    </div>
  );
}

export default ProductCard;

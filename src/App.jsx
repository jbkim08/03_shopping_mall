import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./components/ProductCard";
import useCartStore from "./store/useCartStore";
import useToggle from "./hook/useToggle";
import Modal from "./components/Modal";
import Button from "./components/Button";

function App() {
  const cart = useCartStore((state) => state.cart);
  const { isOpen, open, close } = useToggle(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products?limit=6").then((res) =>
        res.json(),
      ),
  });

  // 👮 1단계에서 배운 경비원 패턴 (Early Return)
  if (isLoading)
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        ⏳ 상품을 가져오는 중입니다...
      </div>
    );
  if (isError)
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
        ❌ 서버 연결에 실패했습니다.
      </div>
    );

  // 💰 장바구니 금액 합산 (수량 반영)
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div style={{ padding: "20px" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>🛒 미니 굿즈 쇼핑몰</h1>
        <Button onClick={open}>장바구니 보기 ({cart.length})</Button>
      </header>

      {/* 바둑판 모양 상품 목록 화면 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {/* 💡 가짜 데이터 대신 서버에서 받아온 products 배열을 돌립니다! */}
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* 장바구니 모달 창 */}
      <Modal isOpen={isOpen} onClose={close}>
        <h2>🧳 장바구니 목록</h2>
        {cart.length === 0 ? (
          <p>비어있습니다.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.title} - {item.price}달러 ({item.quantity}개)
              </li>
            ))}
          </ul>
        )}
        <hr />
        <h3>합계: {totalPrice.toLocaleString()}달러</h3>
      </Modal>
    </div>
  );
}

export default App;

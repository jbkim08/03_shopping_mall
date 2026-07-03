import React from "react";
import MOCK_PRODUCTS from "./mockData";
import ProductCard from "./components/ProductCard";
import useCartStore from "./store/useCartStore";
import useToggle from "./hook/useToggle";
import Button from "./components/Button";
import Modal from "./components/Modal";

function App() {
  const { cart } = useCartStore();
  console.log(cart);
  const { isOpen, open, close } = useToggle(false);
  // 총 상품 개수
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  // 💰 총금액 계산하기 (배열의 합계 구하기)
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 3열 바둑판 배열
    gap: "20px",
    padding: "20px",
  };

  return (
    <div>
      <header>
        <h1 style={{ textAlign: "center" }}>🛒 미니 굿즈 쇼핑몰</h1>
        <Button onClick={open}>장바구니 보기 ({totalCount})</Button>
      </header>
      <div>
        <div style={gridStyle}>
          {/* 가짜 데이터 배열을 돌면서 상품 카드를 화면에 그립니다. */}
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* 장바구니 모달 내용물 */}
      <Modal isOpen={isOpen} onClose={close}>
        <h2>🧳 장바구니 목록</h2>
        {cart.length === 0 ? (
          <p>비어있습니다.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - {item.price}원 ({item.quantity}개)
              </li>
            ))}
          </ul>
        )}
        <hr />
        <h3>합계: {totalPrice.toLocaleString()}원</h3>
        <Button onClick={() => alert("주문 페이지로 이동!")}>주문하기</Button>
      </Modal>
    </div>
  );
}

export default App;

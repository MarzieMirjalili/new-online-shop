import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/productList/Home";
import { ProductDetail } from "./pages/productDetail/ProductDetail";
import { CartContext } from "./CartContext";
import { useCart } from "./hooks/use-cart";
import { Profile } from "./pages/profile/Profile";
import { lazy, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const Cart = lazy(() => delayForDemo(import("./pages/Cart/Cart")));

function delayForDemo(promise: any) {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}
function App() {
  const { cartItems, addToCart, removeFromCart, removeProduct, clearCart } =
    useCart();

  return (
    <div>
      <CartContext.Provider
        value={{
          cartItems: cartItems,
          addToCart: addToCart,
          removeFromCart: removeFromCart,
          removeProduct: removeProduct,
          clearCart: clearCart,
        }}
      >
        <Suspense fallback={<FontAwesomeIcon icon={faSpinner} />}>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path=":id" element={<ProductDetail />} />
            </Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route path="profile" element={<Profile />}></Route>
          </Routes>
        </Suspense>
      </CartContext.Provider>
    </div>
  );
}

export default App;

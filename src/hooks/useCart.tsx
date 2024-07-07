import { useContext } from "react";

import { CartContext } from "../context/CartProvider";
import { UseCartContextType } from "../context/CartProvider";

const useCart = (): UseCartContextType => {
  const cartContext = useContext(CartContext);

  return cartContext;
};

export default useCart;

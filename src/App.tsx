import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

import { useState } from "react";

const App = () => {
  const [viewCart, setViewCart] = useState<boolean>(false);

  const pageContent = viewCart ? <Cart /> : <ProductList />;

  const content = (
    <section className="h-screen flex flex-col">
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      <div className="flex-grow">{pageContent}</div>
      <Footer viewCart={viewCart} />
    </section>
  );

  return content;
};

export default App;

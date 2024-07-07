import Nav from "./Nav";
import useCart from "../hooks/useCart";

type PropTypes = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropTypes) => {
  const { getTotalItems, getTotalPrice } = useCart();

  const content = (
    <header className="py-5 mx-24 bg-blue-600 text-white">
      <div className="flex items-center justify-between mx-20 text-xl">
        <h1>Testing Store</h1>
        <div className="flex items-center">
          <p className="mr-12">
            Total Items : {getTotalItems ? getTotalItems : 0}{" "}
          </p>
          <p>Total Price : {getTotalPrice ? getTotalPrice : 0} </p>
        </div>
        <Nav viewCart={viewCart} setViewCart={setViewCart} />
      </div>
    </header>
  );

  return content;
};

export default Header;

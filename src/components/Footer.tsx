import useCart from "../hooks/useCart";

type PropTypes = {
  viewCart: boolean;
};

const Footer = ({ viewCart }: PropTypes) => {
  const { getTotalItems, getTotalPrice } = useCart();
  const year: number = new Date().getFullYear();
  return (
    <footer className="bg-blue-600 rounded-lg shadow m-4">
      <div className="w-full mx-auto max-w-screen-xl p-4">
        {!viewCart ? (
          <>
            <div className="flex items-center justify-between mx-20 text-xl">
              <p>© {year} Testing Store</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mx-20 text-xl">
              <p className="mr-12">
                Total Items : {getTotalItems ? getTotalItems : 0}{" "}
              </p>
              <p>Total Price : {getTotalPrice ? getTotalPrice : 0} </p>
              <p>© {year} Testing Store</p>
            </div>
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;

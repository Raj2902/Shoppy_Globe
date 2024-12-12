import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar } from "flowbite-react";

export default function Header() {
  const cart = useSelector((data) => data.cart);

  const navigate = useNavigate();

  /*made navbar with links to route to diffrent pages*/
  /*using flowite components similar to bootstrap components*/

  return (
    <Navbar fluid rounded>
      <Navbar.Brand
        className="hand"
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          src="/images/icon.png"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Shoppy Globe
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          onClick={() => {
            navigate("/");
          }}
          className="hand"
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          onClick={() => {
            navigate("/checkout");
          }}
          className="hand"
        >
          Checkout
        </Navbar.Link>
        <Navbar.Link
          onClick={() => {
            navigate("/cart");
          }}
          className="hand cartNumContainer"
        >
          <i
            className="fa-solid fa-cart-shopping hand"
            onClick={() => navigate("/cart")}
          ></i>
          <span className="cartNumber">
            {cart.length > 0 ? cart.length : 0}
          </span>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

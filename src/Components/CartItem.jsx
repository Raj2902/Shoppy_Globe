import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProductsInCart, removePrdFromCart } from "../utils/Redux/reducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

/*defining props types for cart items*/
CartItem.propTypes = {
  product: PropTypes.object,
};

export default function CartItem({ product }) {
  const navigate = useNavigate();
  const [num, setNum] = useState(product.quantityAdded);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProductsInCart({ quantity: num, product: product }));
  }, [num]);
  return (
    <div className="shadow-md cart-item rounded-lg">
      <div className="leftSideCartItem">
        <div className="prd-img">
          <img src={product.images[0]} alt="prd-img" />
        </div>
        <div className="quantity">
          <span className="round-btn hand" onClick={() => setNum(num + 1)}>
            +
          </span>
          <input
            type="Number"
            value={num}
            name="quantityCounter"
            className="quantity-input"
            onChange={(e) => setNum(e.target.value)}
          />
          <span
            className="round-btn hand"
            onClick={() => setNum(num > 1 ? num - 1 : 1)}
          >
            -
          </span>
        </div>
      </div>
      <div className="rightSideCartItem">
        <div className="prd-info">
          <p
            onClick={() => navigate(`/product/${product.id}`)}
            className="hand cartPrd cartPrdTitle"
          >
            {product.title}
          </p>
          <p className="cartPrd cartPrdSI">{product.shippingInformation}</p>
          <p className="text-gray-900 font-bold mt-4">
            <span
              style={
                product.discountPercentage > 0
                  ? { textDecoration: "line-through", color: "grey" }
                  : { color: "black" }
              }
            >
              ₹{product.price}
            </span>{" "}
            {product.discountPercentage > 0 && (
              <span>
                ₹
                {(
                  product.price -
                  (product.price * product.discountPercentage) / 100
                ).toFixed(2)}
              </span>
            )}
          </p>
          <span
            className="hand"
            onClick={() => {
              dispatch(removePrdFromCart(product));
              toast.success("Product removed from cart.");
            }}
          >
            <b>REMOVE</b>
          </span>
        </div>
      </div>
    </div>
  );
}

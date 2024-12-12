import React from "react";
import Carousel from "./carousel";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPrdToCart } from "../utils/Redux/reducer";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

/*defining proptypes for product item*/
ProductItem.propTypes = {
  product: PropTypes.object,
  enableClick: PropTypes.bool,
};

function ProductItem({ product, enableClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, title, price, images, description } = product;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {enableClick ? (
        <div className="carousel">
          <div className="imgIterator">
            <img
              className={"prdImg" + " " + "prdImg" + id}
              src={images[0]}
              alt="prdImg"
            />
          </div>
        </div>
      ) : (
        <Carousel id={id} images={images} />
      )}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        {/* <p className="text-gray-700">{description}</p> */}
        <p className="text-gray-900 font-bold mt-4">
          <span
            style={
              product.discountPercentage > 0
                ? { textDecoration: "line-through", color: "grey" }
                : { color: "black" }
            }
          >
            ₹{price}
          </span>{" "}
          {product.discountPercentage > 0 && (
            <span>
              ₹{(price - (price * product.discountPercentage) / 100).toFixed(2)}
            </span>
          )}
        </p>
        <div className="btn-actions">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
            onClick={() => {
              dispatch(addPrdToCart(product));
              toast.success("Product added to cart.");
            }}
          >
            <i className="fa-solid fa-cart-shopping"></i> Add to Cart
          </button>
          {enableClick && (
            <Button
              onClick={() => {
                navigate(`/product/${id}`);
              }}
              className="view-details bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
            >
              View Details
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;

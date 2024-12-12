import React from "react";
import Carousel from "./Carousel";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPrdToCart } from "../utils/Redux/reducer";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

/*defining prototypes for product details*/
ProductDetailItem.propTypes = {
  product: PropTypes.object,
};

function ProductDetailItem({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, title, price, images, description } = product;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden prdDetails">
      <div className="leftSection">
        <Carousel id={id} images={images} />
        <div className="btn-actions-detailPage">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
            onClick={() => {
              dispatch(addPrdToCart(product));
              toast.success("Product added to cart.");
            }}
          >
            <i className="fa-solid fa-cart-shopping"></i> Add to Cart
          </button>
        </div>
        <div className="prdInfo">
          <h2 className="text-lg font-bold mb-2">{title}</h2>
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
                ₹
                {(price - (price * product.discountPercentage) / 100).toFixed(
                  2
                )}
              </span>
            )}
          </p>
          <p className="prdAvailibility">{product.availabilityStatus}</p>
          <p className="prdDesc prdBrand">
            <b className="prdDescText">Brand : </b>
            {product.brand}
          </p>
          <p className="prdDesc">
            <b className="prdDescText">Category : </b>
            {product.category}
          </p>
          <p className="prdDesc">
            <b className="prdDescText">Description : </b>
            {product.description}
          </p>
          <p className="prdDesc">
            <b className="prdDescText">Width : </b>
            {product.dimensions.width} cm{" "}
            <b className="prdDescText">Height : </b>
            {product.dimensions.height} cm{" "}
            <b className="prdDescText">Depth : </b>
            {product.dimensions.depth} cm
          </p>
          <p className="prdDesc">
            <b className="prdDescText">Weight : </b>
            {product.weight} gm
          </p>
          <p className="prdDesc">
            <b className="prdDescText">Discount : </b>
            {product.discountPercentage}%
          </p>
          <p className="prdDesc">
            <b className="prdDescText">Minimum Order Quantity : </b>
            {product.minimumOrderQuantity}
          </p>
          <p className="prdDesc">
            <i className="fa-solid fa-star"></i>{" "}
            <b className="prdDescText">Rating : </b>
            {product.rating}
          </p>
          <p className="prdReturnPolicy">
            <i className="fa-solid fa-truck"></i> {product.returnPolicy}
          </p>
          <p className="prdDesc">
            <b className="prdDescText">Delivery : </b>
            <i className="fa-solid fa-ship"></i> {product.shippingInformation}
          </p>
          <p className="prdDesc">
            <b className="prdDescText">sku : </b>
            {product.sku}
          </p>
          <p className="prdDesc">
            <b className="prdDescText">Stock : </b>
            {product.stock}
          </p>
          <p className="prdDesc">
            <b className="prdDescText">Tags : </b>
            {product.tags.map((tag, index) => (
              <span key={tag}>
                {" " + tag}
                {index < product.tags.length - 1 ? (
                  <span>,</span>
                ) : (
                  <span>.</span>
                )}
              </span>
            ))}
          </p>
          <p className="prdReturnPolicy">
            <i className="fa-solid fa-check"></i> {product.warrantyInformation}
          </p>
        </div>
      </div>
      <div className="rightSection">
        <div className="reviews">
          <p className="reviewsText">
            <b>Reviews</b>
          </p>
          {product.reviews.map((review, index) => (
            <div className="reviewSection" key={id + "" + index}>
              <p className="reviewName">{review.reviewerName}</p>
              <p className="reviewEmail">{review.reviewerEmail}</p>
              <p className="reviewRating">
                <i className="fa-solid fa-star"></i> {review.rating}
              </p>
              {/* <p className="date">{review.date}</p> */}
              <b className="comment">{review.comment}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailItem;

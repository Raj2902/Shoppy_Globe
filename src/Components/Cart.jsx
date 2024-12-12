import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import ModalComponent from "./Modal";

export default function Cart() {
  const products = useSelector((data) => data.cart);
  const [openModal, setOpenModal] = useState(false);

  const [total, setTotal] = useState({
    price: 0,
    discount: 0,
    delivery: 0,
    totalAmount: 0,
  });

  /*when data in product changes calculate price,discount,delivery and total amount*/
  useEffect(() => {
    let tp = 0,
      td = 0,
      del = 0,
      ta = 0;
    for (let prd of products) {
      tp += prd.price * prd.quantityAdded;
      td += (prd.price * prd.quantityAdded * prd.discountPercentage) / 100;
    }
    ta = tp - td;
    if (ta < 499) {
      del = 50;
      ta += del;
    }
    setTotal({
      ...total,
      price: tp.toFixed(2),
      discount: td.toFixed(2),
      delivery: del.toFixed(2),
      totalAmount: ta.toFixed(2),
    });
  }, [products]);
  return (
    <>
      {products.length == 0 && (
        <div className="no-item">
          <img
            src="/images/empty-cart.png"
            width="100px"
            height="100px"
            alt="empty-cart"
          />
          <p className="text-2xl font-bold">Your cart is empty</p>
        </div>
      )}
      <div className="cart-container">
        <div className="leftSectionCart">
          {products.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </div>
        {products.length > 0 && (
          <div className="rightSectionCart">
            <b className="priceText">Price Details</b>
            <hr />
            <p>
              Price ({products.length} item){" "}
              <span className="prdCartNum prdPriceCart">{total.price}</span>
            </p>
            <p>
              Discount{" "}
              <span className="prdCartNum prdDiscountCart">
                {total.discount}
              </span>
            </p>
            <p>
              Delivery Charges{" "}
              <span className="prdCartNum prdDeliveryCart">
                {total.delivery}
              </span>
            </p>
            <hr />
            <b>
              Total Amount{" "}
              <span className="prdCartNum prdCartAmount">
                {total.totalAmount}
              </span>
            </b>
            <hr />
            <b className="save">
              You will save ₹{total.discount} on this order
            </b>
            <div className="footer">
              <button
                onClick={() => {
                  setOpenModal(true);
                }}
                className="placeOrderBtn"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
      {/*made a seprate component for modal passing the open modal when the place order button is clicked*/}
      <ModalComponent openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}

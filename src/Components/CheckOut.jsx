import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalComponent from "./Modal";

export default function CheckOut() {
  const [openModal, setOpenModal] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const navigate = useNavigate();
  const [address, setAddress] = useState(null);
  const cart = useSelector((data) => data.cart);

  /*calulating subtotal price when there is something in the cart changes*/
  const calculateSubTotal = () => {
    setSubTotal(
      cart.reduce((sum, item) => {
        return (
          sum +
          (item.price - (item.price * item.discountPercentage) / 100).toFixed(
            2
          ) *
            item.quantityAdded
        );
      }, 0)
    );
  };

  useEffect(() => {
    setAddress(JSON.parse(localStorage.getItem("address")));
  }, [openModal]);
  useEffect(() => {
    calculateSubTotal();
  }, [cart]);
  return (
    <div className="checkOut-main">
      <div className="checkOutLeftSide">
        {address ? (
          <>
            <div className="shippingAddressSection bg-white">
              <i className="text-red-500 fa-solid fa-truck"></i>{" "}
              <b>Shipping Address</b>
              <hr />
              <p>{address.fullName}</p>
              <p>{address.apartment},</p>
              <p>
                {address.landmark}, {address.city}
              </p>
              <p>
                {address.street}, {address.zipcode}
              </p>
              <p>
                {address.state}, {address.country}
              </p>
              <p>
                <b>Email</b> {address.email}
              </p>
              <p>
                <b>Phno.</b> {address.phno}
              </p>
              <button
                onClick={() => setOpenModal(true)}
                className="text-blue-500"
              >
                <b>Edit</b>
              </button>
            </div>
            <div className="paymentMethodsSection bg-white">
              <i className="fa-brands fa-cc-amazon-pay text-red-500"></i>{" "}
              <b>Payment Method (Static Data)</b>
              <hr />
              <div className="paymentMethods">
                <div>
                  <ul>
                    <li>
                      <b className="text-blue-500">Your saved method</b>
                    </li>
                    <li>PhonePe / Wallet</li>
                    <li>Credit / Debit / ATM Card</li>
                    <li>Net Banking</li>
                    <li>EMI (Easy Installments)</li>
                    <li>Cash on Delivery</li>
                    <li>Gift Card \ Vouchers</li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li className="paymentCards border-b border-dashed border-gray-300">
                      <i className="fa-solid fa-check p-2 rounded bg-green-500"></i>
                      <div>
                        <p>Axis Credit Card</p>
                        <p className="text-gray-500">
                          <i className="fa-brands fa-cc-visa"></i> 47** ****
                          **** **66
                        </p>
                      </div>
                      <div>
                        <p>CVV</p>
                        <p>
                          <i className="fa-solid fa-credit-card"></i>
                        </p>
                      </div>
                    </li>
                    <li className="paymentCards border-b border-dashed border-gray-300">
                      <i className="fa-solid fa-check bg-gray-500 rounded p-2"></i>
                      <div>
                        <p>HDFC debit Card</p>
                        <p className="text-gray-500">
                          <i className="fa-regular fa-credit-card"></i> 53**
                          **** **** **00
                        </p>
                      </div>
                      <div>
                        <p>CVV</p>
                        <p>
                          <i className="fa-solid fa-credit-card"></i>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <p>Cant't proceed to pay without an address.</p>
              <button
                className="text-blue-500 font-bold"
                onClick={() => setOpenModal(true)}
              >
                Provide Address
              </button>
            </div>
          </>
        )}
      </div>
      {cart.length > 0 ? (
        <div className="checkOutRightSide">
          <div className="summaryHeader">
            <b>
              <i className="fa-solid fa-bag-shopping text-red-500"></i> Your
              Order Summary
            </b>
            <button onClick={() => navigate("/cart")} className="text-blue-500">
              <b>Edit Bag</b>
            </button>
          </div>
          <hr />
          <div>
            <table className="text-center cartSummary">
              <tbody>
                <tr>
                  <th>Item Description</th>
                  <th>Quantity</th>
                  <th>Saving</th>
                  <th>Price</th>
                </tr>
                {cart.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td className="itemDes expand">
                        <img
                          src={item.images[0]}
                          alt="prdImg"
                          width="100px"
                          height="100px"
                        />{" "}
                        <div>
                          <b>{item.title}</b>
                          <p>
                            {item.brand} | {item.category}
                          </p>
                        </div>
                      </td>
                      <td className="expand">
                        <span className="bg-gray-500 p-2">
                          {item.quantityAdded}
                        </span>
                      </td>
                      <td className="expand">
                        {item.discountPercentage > 0 && (
                          <p className="text-red-500 font-bold">
                            {item.discountPercentage}% Off
                          </p>
                        )}
                        <p
                          style={
                            item.discountPercentage > 0 && {
                              textDecoration: "line-through",
                            }
                          }
                        >
                          ₹{item.price}
                        </p>
                      </td>
                      <td className="expand">
                        {item.discountPercentage > 0 && (
                          <span>
                            ₹
                            {(
                              item.price -
                              (item.price * item.discountPercentage) / 100
                            ).toFixed(2)}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-y border-gray-300 text-left">
                  <td className="leading-10" colSpan="4">
                    <p className="uppercase">
                      <span className="inline-block pr-4">Subtotal</span>
                      <span className="text-gray-500">₹</span>
                      <span className="font-bold">{subTotal.toFixed(2)}</span>
                    </p>
                    <p className="uppercase">
                      <span className="inline-block pr-4">
                        Shipping Charges
                      </span>
                      {subTotal < 499 ? (
                        <>
                          <span className="text-gray-500">₹</span>
                          <span className="font-bold">50.00</span>
                        </>
                      ) : (
                        <span className="font-bold">Free</span>
                      )}
                    </p>
                  </td>
                </tr>
                <tr className="text-left">
                  <td colSpan="4">
                    <span className="font-bold inline-block pr-4 uppercase">
                      Total
                    </span>
                    <span className="text-gray-500">₹</span>
                    <span>
                      {subTotal < 499 ? (
                        <span className="font-bold">
                          {(subTotal + 50).toFixed(2)}
                        </span>
                      ) : (
                        <span className="font-bold">{subTotal.toFixed(2)}</span>
                      )}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center">
            <p>Your cart is empty add some items.</p>
            <button
              className="text-blue-500 font-bold"
              onClick={() => navigate("/")}
            >
              Add items
            </button>
          </div>
        </>
      )}
      {/*made seprate modal component which will be opened on the click if you want to edit address*/}
      <ModalComponent openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}

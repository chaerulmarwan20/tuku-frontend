import React, { useState, useEffect } from "react";
import "./style.css";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import axiosApiInstance from "../../../../helpers/axios";
import { FaTimes } from "react-icons/fa";
import { Button } from "../../../atoms";

export default function ShoppingSum({ total, address, cart }) {
  const urlApi = process.env.REACT_APP_API_URL;

  const history = useHistory();

  const [postage] = useState(15000);
  const [payment, setPayment] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentMethod = (params) => {
    setPaymentMethod(params);
  };

  const handleBuy = () => {
    if (address.length < 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Silahkan masukkan alamat lengkap",
        confirmButtonColor: "#273ac7",
      });
    } else if (paymentMethod === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Silahkan pilih metode pembayaran",
        confirmButtonColor: "#273ac7",
      });
    } else {
      axiosApiInstance
        .post(`${urlApi}/order`, {
          cart: cart,
          address: address.address,
          subTotal: total,
          postage: postage,
          paymentMethod: paymentMethod,
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Checkout berhasil, silahkan lakukan pembayaran!",
            confirmButtonColor: "#273ac7",
          }).then(() => {
            Swal.fire({
              icon: "info",
              title: "Info!",
              text: "Mengarahkan ke home",
              confirmButtonColor: "#273ac7",
            }).then(() => {
              history.push("/");
            });
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.message,
            confirmButtonColor: "#273ac7",
          });
        });
    }
  };

  useEffect(() => {
    if (total !== 0) {
      setPayment(total + postage);
    }
  }, [total, postage]);

  return (
    <div className="box-shop-checkout">
      <h3>Shopping Summary</h3>
      <div className="box-shop-line-checkout">
        <p>Order</p>
        <h5>Rp.{total}</h5>
      </div>
      <div className="box-shop-line-checkout">
        <p>Delivery</p>
        <h5>Rp.{postage}</h5>
      </div>
      <hr />
      <div className="box-shop-line-checkout">
        <h4>Shopping Summary</h4>
        <h5>Rp.{payment}</h5>
      </div>
      <button data-toggle="modal" data-target="#paymentModal">
        Select Payment
      </button>
      <div
        className="modal fade"
        id="paymentModal"
        aria-labelledby="paymentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="paymentModalBody">
              <div className="paymentModalHead">
                <div>
                  <FaTimes
                    style={{ fontSize: "28pxs", cursor: "pointer" }}
                    data-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="paymentModalTitle">
                  <p>Payment</p>
                </div>
              </div>
              <hr />
              <div className="paymentModalMethod">
                <p>Payment method</p>
                <div className="paymentWrapperMethod">
                  <div className="paymentWrapperMethodItem">
                    <div className="paymentModalItemLeft">
                      <div>
                        <img
                          src="./asset/Logo-GoPay-Vector-CDR-dan-PNG 1.png"
                          alt=""
                        />
                      </div>
                      <div>
                        <img
                          src="./asset/kisspng-pos-indonesia-mail-point-of-sale-logo-indonesia-5aeb329c2f74d7 1.png"
                          alt=""
                        />
                      </div>
                      <div>
                        <img src="./asset/Group.png" alt="" />
                      </div>
                    </div>
                    <div className="paymentModalItemRigth">
                      <div className="paymentModalItemRightContent">
                        <div className="paymentModalName">
                          <p>Gopay</p>
                        </div>
                        <div className="paymentModalChecklist">
                          <input
                            type="checkbox"
                            checked={paymentMethod === "Gopay" && true}
                            onChange={() => handlePaymentMethod("Gopay")}
                          />
                        </div>
                      </div>
                      <div className="paymentModalItemRightContent">
                        <div className="paymentModalName">
                          <p>Pos Indonesia</p>
                        </div>
                        <div className="paymentModalChecklist">
                          <input
                            type="checkbox"
                            checked={paymentMethod === "Pos Indonesia" && true}
                            onChange={() =>
                              handlePaymentMethod("Pos Indonesia")
                            }
                          />
                        </div>
                      </div>
                      <div className="paymentModalItemRightContent">
                        <div className="paymentModalName">
                          <p>MasterCard</p>
                        </div>
                        <div className="paymentModalChecklist">
                          <input
                            type="checkbox"
                            checked={paymentMethod === "MasterCard" && true}
                            onChange={() => handlePaymentMethod("MasterCard")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="paymentModalBottom">
                    <p>Shopping summary</p>
                    <div className="paymentModalSummary">
                      <div className="paymentModalSummaryDetil">
                        <div>
                          <p>Order</p>
                        </div>
                        <div>
                          <span>Rp.{total}</span>
                        </div>
                      </div>
                      <div className="paymentModalSummaryDetil">
                        <div>
                          <p>Delivery</p>
                        </div>
                        <div>
                          <span>Rp.{postage}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="paymentModalFooter">
                    <div className="paymentModalFooterBody">
                      <div className="paymentSHoppingSUmmary">
                        <p>Shopping summary</p>
                        <span>Rp.{payment}</span>
                      </div>
                      <div className="paymentModalButton">
                        <Button
                          btnClr="#273AC7"
                          val="Buy"
                          ftClr="white"
                          cls="paymentModalBtn"
                          func={() => handleBuy()}
                          isDismiss
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

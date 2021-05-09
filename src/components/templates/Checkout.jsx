import React, { useState, useEffect } from "react";
import axiosApiInstance from "../../helpers/axios";

// ORGANISMS
import {
  Navbar,
  HeadAddress,
  CardProCheckout,
  ShoppingSum,
} from "../organisms";

export default function Checkout() {
  const urlApi = process.env.REACT_APP_API_URL;

  const [address, setAddress] = useState({});
  const [cart, setCart] = useState([]);
  let total = 0;

  useEffect(() => {
    axiosApiInstance
      .get(`${urlApi}/address/find-one`)
      .then((result) => {
        setAddress(result.data.data[0]);
      })
      .catch((err) => {
        setAddress([]);
      });
  }, [urlApi]);

  useEffect(() => {
    axiosApiInstance
      .get(`${urlApi}/cart`)
      .then((res) => {
        setCart(res.data.data);
      })
      .catch((err) => {
        setCart(true);
      });
  }, [urlApi]);

  cart.map((item, index) => {
    return (total += item.total);
  });

  return (
    <div style={{ background: "#F9F9F9" }} className="pb-4">
      <Navbar />
      <div className="container-fluid">
        <div className="container cont-heading-checkout">
          <h2>Checkout</h2>
          <div className="row row-checkout">
            <div className="col-8 col-left-checkout">
              <h3>Shipping Address</h3>
              <HeadAddress />
              <CardProCheckout cart={cart} />
            </div>
            <div className="col-4 col-right-checkout">
              <ShoppingSum total={total} address={address} cart={cart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

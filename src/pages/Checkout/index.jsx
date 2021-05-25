import React from "react";
import { Helmet } from "react-helmet";

import Checkout from "../../components/templates/Checkout";
import "./style.css";

export default function CheckOut() {
  return (
    <div>
      <Helmet>
        <title>Tuku - Checkout</title>
      </Helmet>
      <Checkout />
    </div>
  );
}

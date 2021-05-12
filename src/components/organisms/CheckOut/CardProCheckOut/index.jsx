import React from "react";
import Rupiah from "../../../../helpers/rupiah";

import "./style.css";

export default function CardProCheckOut({ cart }) {
  const urlImg = process.env.REACT_APP_API_IMG;
  return cart.map((item, index) => {
    return (
      <div className="card-checkout" key={index}>
        <div className="card-checkout-sect-1">
          <img src={`${urlImg}${item.image}`} alt="" width={69} height={69} />
        </div>
        <div className="card-checkout-sect-2">
          <h3>{item.title}</h3>
          <p>{item.brand}</p>
        </div>
        <div className="card-checkout-sect-3">
          <h3>{Rupiah(item.total)}</h3>
        </div>
      </div>
    );
  });
}

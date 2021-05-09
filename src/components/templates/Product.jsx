import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";
// ORGANISMS
import {
  Navbar,
  Filter,
  ProductTop,
  InformationProduct,
  OtherProducts,
} from "../organisms";

export default function Product() {
  window.scrollTo(0, 0);
  const urlApi = process.env.REACT_APP_API_URL;
  let { idproduct } = useParams();
  const [product, setProduct] = useState([]);
  const [filter, showFilter] = useState(false);
  useEffect(() => {
    if (idproduct) {
      axios
        .get(`${urlApi}/product/${idproduct}`)
        .then((result) => {
          const newProduct = result.data.data[0];
          setProduct(newProduct);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Cannot get this product!",
            confirmButtonColor: "#273ac7",
          });
        });
    }
  }, [idproduct, urlApi]);

  return (
    <div style={{ background: "#F9F9F9" }}>
      <Navbar
        func={() => {
          showFilter(true);
        }}
      />
      {filter === true ? (
        <Filter
          func={() => {
            showFilter(false);
          }}
        />
      ) : null}
      <ProductTop product={product} />
      <InformationProduct product={product} />
      <OtherProducts product={product} />
    </div>
  );
}

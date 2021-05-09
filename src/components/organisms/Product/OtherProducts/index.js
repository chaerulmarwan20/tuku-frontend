import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import style from "./otherproducts.module.css";
import Rupiah from "../../../../helpers/rupiah";
import Swal from "sweetalert2";

function OtherProducts({ product }) {
  const urlApi = process.env.REACT_APP_API_URL;
  const urlImg = process.env.REACT_APP_API_IMG;

  const history = useHistory();

  const [getNewProduct, setGetNewProduct] = useState([]);

  useEffect(() => {
    if (product.idCategory !== undefined) {
      axios
        .get(`${urlApi}/product/category/${product.idCategory}`)
        .then((res) => {
          const dataNewProduct = res.data.data;
          setGetNewProduct(dataNewProduct);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            confirmButtonColor: "#273ac7",
          });
        });
    }
  }, [product.idCategory, urlApi]);

  return (
    <div>
      <div className="container">
        <h2 className={style["title"]}>You can also like this</h2>
        <p className={style["teks"]}>You’ve never seen it before!</p>
        <div className="row">
          {getNewProduct.map((item) => {
            return (
              <div
                className="col-lg-3 col-6 mb-5"
                key={item.id}
                onClick={(e) => history.push(`/product/${item.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className={style["card"]}>
                  <img
                    className={[["card-img-top"], style["product-img"]].join(
                      " "
                    )}
                    src={`${urlImg}${item.image}`}
                    alt="product"
                  />
                  <div
                    className={[style["card-body"], ["card-body"]].join(" ")}
                  >
                    <h3 className={style["product-name"]}>{item.title}</h3>
                    <h4 className={style["price"]}>{Rupiah(item.price)}</h4>
                    <p className={style["teks-store"]}>{item.brand}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OtherProducts;

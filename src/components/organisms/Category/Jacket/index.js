import { useState, useEffect } from "react";
import style from "./jacket.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import Rupiah from "../../../../helpers/rupiah";
import { FaStar } from "react-icons/fa";
import { useHistory } from "react-router";

function Jacket() {
  const history = useHistory();
  const [getJacket, setGetJacket] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/product/category/2`)
      .then((res) => {
        const dataAllJacket = res.data.data;
        setGetJacket(dataAllJacket);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: err.response.data.message,
          confirmButtonColor: "#273ac7",
        });
      });
  }, []);

  return (
    <div>
      <div className="container">
        <p className={style["navigation"]}>Home - Category - Jacket</p>
        <p className={style["title"]}>Jacket</p>
        <div className="row">
          {getJacket !== undefined
            ? getJacket.map((item) => {
                return (
                  <>
                    <div className="col-lg-3 col-6 mb-5">
                      <div
                        className={style["card"]}
                        onClick={() => {
                          history.push(`/product/${item.id}`);
                        }}
                      >
                        <img
                          className={[
                            ["card-img-top"],
                            style["product-img"],
                          ].join(" ")}
                          src={`${process.env.REACT_APP_API_IMG}${item.image}`}
                          alt=""
                        />
                        <div className="card-body">
                          <p className={style["product-name"]}>{item.title}</p>
                          <p className={style["price"]}>{Rupiah(item.price)}</p>
                          <p className={style["teks-store"]}>{item.brand}</p>
                          {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;
                            return (
                              <>
                                <FaStar
                                  className={style["star"]}
                                  size={25}
                                  color={
                                    ratingValue <= item.rating
                                      ? "#FFBA49"
                                      : "#D4D4D4"
                                  }
                                />
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            : console.log("try again")}
        </div>
      </div>
    </div>
  );
}

export default Jacket;

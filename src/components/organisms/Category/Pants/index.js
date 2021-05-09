import { useState, useEffect } from "react";
import style from "./pants.module.css";
import axios from "axios";
import Rupiah from "../../../../helpers/rupiah";
import { FaStar } from "react-icons/fa";
import { useHistory } from "react-router";

function Pants() {
  const history = useHistory();
  const [getPants, setGetPants] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/product/category/3`)
      .then((res) => {
        const dataAllPants = res.data.data;
        setGetPants(dataAllPants);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="container">
        <p className={style["navigation"]}>Home - Category - Pants</p>
        <p className={style["title"]}>Pants</p>
        <div className="row">
          {getPants !== undefined
            ? getPants.map((item) => {
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

export default Pants;

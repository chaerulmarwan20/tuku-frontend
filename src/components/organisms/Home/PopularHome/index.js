import { useState, useEffect } from "react";
import style from "./popularhome.module.css";
import axios from "axios";
import Rupiah from "../../../../helpers/rupiah";
import { FaStar } from "react-icons/fa";
import { useHistory } from "react-router";
import { Button } from "../../../atoms";
import Left from "../../../images/left.png";
import Right from "../../../images/right.png";

function PopularHome() {
  const [getNewProduct, setGetNewProduct] = useState([]);
  const history = useHistory();
  // Untuk Banyaknya rating/bintang
  const [rating, setRating] = useState(null);
  const [totalPage, checkTotalPage] = useState(null);
  const [paginationNum, checkPaginationNum] = useState([]);
  const [currentPage, changePage] = useState(1);
  const [startNum, setStart] = useState(0);
  const [endNum, setEnd] = useState(3);
  // FUNCTION
  const pgNum = () => {
    for (let i = 1; i <= totalPage; i++) {
      checkPaginationNum((paginationNum) => [...paginationNum, i]);
    }
  };
  const axiosGet = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/product/popular?perPage=4&page=` +
          currentPage
      )
      .then((res) => {
        const dataNewProduct = res.data.data;
        // console.log(dataNewProduct);
        setGetNewProduct(dataNewProduct);
        checkTotalPage(res.data.totalPage);
        setRating(5);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const leftArrow = () => {
    if (startNum > 0) {
      setStart(startNum - 1);
      setEnd(endNum - 1);
    }
  };
  const rightArrow = () => {
    if (endNum < paginationNum.length) {
      setStart(startNum + 1);
      setEnd(endNum + 1);
    }
  };
  useEffect(() => {
    axiosGet();
  }, []);
  useEffect(() => {
    pgNum();
  }, [rating]);
  useEffect(() => {
    axiosGet();
  }, [currentPage]);

  return (
    <div>
      <div className="container">
        <p className={style["title"]}>Popular</p>
        <p className={style["teks"]}>Find clothes that are trending recently</p>
        <div className="row">
          {getNewProduct !== undefined
            ? getNewProduct.map((item) => {
                return (
                  <>
                    <div className="hoverThis col-lg-3 col-6 mb-5">
                      <div
                        className={style["card"]}
                        onClick={() => {
                          history.push(`./product/${item.id}`);
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
        <div className="displayRow" style={{ justifyContent: "center" }}>
          {paginationNum.length < 3 ? null : startNum === 0 ? (
            <img
              className={style.filterArrowLeft}
              src={Left}
              style={{ opacity: "0.11" }}
              alt="Left"
            />
          ) : (
            <img
              className={"hoverThis " + style.filterArrowLeft}
              onClick={() => {
                leftArrow();
              }}
              src={Left}
              alt="Left"
            />
          )}
          {paginationNum.slice(startNum, endNum).map((item) => {
            return (
              <Button
                cls={
                  currentPage === item
                    ? style.pagBtnOn + " " + style.pagBtn
                    : style.pagBtnOff + " " + style.pagBtn
                }
                func={() => {
                  changePage(item);
                }}
                val={item}
              />
            );
          })}
          {paginationNum.length < 3 ? null : startNum === 1 ? (
            <img
              className={style.filterArrowRight}
              src={Right}
              style={{ opacity: "0.11" }}
              alt="Right"
            />
          ) : (
            <img
              className={"hoverThis " + style.filterArrowRight}
              onClick={() => {
                rightArrow();
              }}
              src={Right}
              alt="Right"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PopularHome;

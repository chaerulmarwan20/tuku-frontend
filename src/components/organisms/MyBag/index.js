import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import style from "./mybag.module.css";
import "./mybag.css";
import { AiOutlineMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import axiosApiInstance from "../../../helpers/axios";
import { Navbar, Filter } from "..";
import Swal from "sweetalert2";

function MyBag() {
  const history = useHistory();
  const urlApi = process.env.REACT_APP_API_URL;
  const urlImg = process.env.REACT_APP_API_IMG;
  const [product, setProduct] = useState([]);
  const [filter, showFilter] = useState(false);
  let total = 0;
  const [checked] = useState([]);
  const [count, setCount] = useState(0);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    axiosApiInstance
      .get(`${urlApi}/cart`)
      .then((res) => {
        const newProduct = res.data.data;
        setProduct(newProduct);
      })
      .catch((err) => {
        setEmpty(true);
      });
  }, [urlApi]);

  const handleBuy = () => {
    history.push("/check-out");
  };

  const showError = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Item tidak bisa kurang dari 1",
      confirmButtonColor: "#273ac7",
    });
  };

  const handleUpdate = (id, qty, price) => {
    axiosApiInstance
      .put(`${urlApi}/cart/${id}`, { qty, price })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Item berhasil diupdate!",
          confirmButtonColor: "#273ac7",
        }).then(() => {
          axiosApiInstance
            .get(`${urlApi}/cart`)
            .then((res) => {
              const newProduct = res.data.data;
              setProduct(newProduct);
            })
            .catch((err) => {
              setEmpty(true);
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
  };

  const deleteCart = () => {
    if (checked.length < 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tidak ada item yang dipilih",
        confirmButtonColor: "#273ac7",
      });
    } else {
      axiosApiInstance
        .delete(`${urlApi}/cart`, { data: { cart: checked } })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Item berhasil dihapus!",
            confirmButtonColor: "#273ac7",
          }).then(() => {
            axiosApiInstance
              .get(`${urlApi}/cart`)
              .then((res) => {
                const newProduct = res.data.data;
                setProduct(newProduct);
              })
              .catch((err) => {
                setEmpty(true);
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

  const handleChecked = (id) => {
    if (checked.includes(id) === false) {
      checked.push(id);
      setCount(count + 1);
    } else {
      const check = checked.indexOf(id);
      setCount(count - 1);
      checked.splice(check, 1);
    }
  };

  product.map((item, index) => {
    return (total += item.total);
  });

  return (
    <div className="pb-5">
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
      <div className="container">
        <p className={style["title-mybag"]}>My bag</p>
        <div className="row">
          {!empty && (
            <>
              <div className="col-lg">
                <div className="container-checkbox d-flex p-4 justify-content-between">
                  <div className="pl-3">
                    {/* <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      style={{ width: "20px" }}
                    /> */}
                    <label className="form-check-label" for="defaultCheck1">
                      {count} items selected
                    </label>
                  </div>
                  <div onClick={() => deleteCart()}>
                    <Link to="#">Delete</Link>
                  </div>
                </div>
                {product.length > 0 &&
                  product.map((item, index) => {
                    return (
                      <div className="row mt-4" key={index}>
                        <div className="col d-flex">
                          <div className={style["select-items"]}>
                            <div className="row">
                              <div className="col-lg-3 col-6 pl-0">
                                <div
                                  className="d-flex align-items-center"
                                  style={{ transform: "translateX(-15px)" }}
                                >
                                  <input
                                    type="checkbox"
                                    onChange={() => handleChecked(item.id)}
                                  />
                                  <img
                                    className={style["item-selected"]}
                                    src={`${urlImg}${item.image}`}
                                    alt=""
                                    width={69}
                                    height={69}
                                  />
                                </div>
                              </div>
                              <div className="col">
                                <p className={style["item-name"]}>
                                  {item.title}
                                </p>
                                <p className={style["store-name"]}>
                                  {item.brand}
                                </p>
                              </div>
                              <div className="col d-flex mt-4 mr-lg-5 ml-lg-0 ml-5">
                                <AiOutlineMinusCircle
                                  size="30"
                                  className={style["min-icon"]}
                                  style={{ cursor: "pointer" }}
                                  onClick={
                                    item.qty === 1
                                      ? () => showError()
                                      : () =>
                                          handleUpdate(
                                            item.id,
                                            item.qty - 1,
                                            item.total - item.price
                                          )
                                  }
                                />
                                <p className={style["value"]}>{item.qty}</p>
                                <AiFillPlusCircle
                                  size="30"
                                  className={["plus-icon"]}
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    handleUpdate(
                                      item.id,
                                      item.qty + 1,
                                      item.total + item.price
                                    )
                                  }
                                />
                                <p className={style["price"]}>
                                  Rp.{item.total}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="col-lg-4 mb-5">
                <div className={style["box-sum"]}>
                  <p className={style["shop-summary-teks"]}>Shopping summary</p>
                  <br />
                  <p className={style["total-price"]}>Total Price</p>
                  <p className={style["price-value"]}>Rp.{total}</p>
                  <br />
                  <button
                    type="button"
                    className={style["btn-buy"]}
                    onClick={handleBuy}
                  >
                    Buy
                  </button>
                  <br />
                </div>
              </div>
            </>
          )}
          {empty && (
            <div className="col d-flex justify-content-center">
              <p className={style["title-mybag"]}>Your bag is empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBag;

import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import style from "./mybag.module.css";
import "./mybag.css";
import { AiOutlineMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import axiosApiInstance from "../../../helpers/axios";
import Rupiah from "../../../helpers/rupiah";
import { Navbar, Filter } from "..";
import Swal from "sweetalert2";

function MyBag() {
  const history = useHistory();
  const urlApi = process.env.REACT_APP_API_URL;
  const urlImg = process.env.REACT_APP_API_IMG;
  const [product, setProduct] = useState([]);
  const [filter, showFilter] = useState(false);
  let total = 0;
  const [count, setCount] = useState(0);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    axiosApiInstance
      .get(`${urlApi}/cart`)
      .then((res) => {
        const newProduct = res.data.data;
        setEmpty(false);
        setProduct(
          newProduct.map((item) => {
            return {
              select: false,
              id: item.id,
              idProduct: item.idProduct,
              idStore: item.idStore,
              color: item.color,
              price: item.price,
              qty: item.qty,
              size: item.size,
              title: item.title,
              total: item.total,
              brand: item.brand,
              image: item.image,
            };
          })
        );
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
      text: "Produk tidak bisa kurang dari 1",
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
          text: "Keranjang berhasil diupdate!",
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
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Kamu tidak akan dapat mengembalikan ini!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      confirmButtonColor: "#db3022",
      cancelButtonText: "Tidak, batalkan!",
      cancelButtonColor: "#1EC15F",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        let arrayids = [];
        product.forEach((d) => {
          if (d.select) {
            arrayids.push(d.id);
          }
        });
        if (arrayids.length < 1) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tidak ada produk yang dipilih",
            confirmButtonColor: "#273ac7",
          });
        } else {
          axiosApiInstance
            .delete(`${urlApi}/cart`, { data: { cart: arrayids } })
            .then((res) => {
              Swal.fire({
                title: "Success!",
                text: res.data.message,
                icon: "success",
                confirmButtonText: "Ok",
                confirmButtonColor: "#273ac7",
              }).then(() => {
                setCount(0);
                axiosApiInstance
                  .get(`${urlApi}/cart`)
                  .then((res) => {
                    const newProduct = res.data.data;
                    setEmpty(false);
                    setProduct(
                      newProduct.map((item) => {
                        return {
                          select: false,
                          id: item.id,
                          idProduct: item.idProduct,
                          idStore: item.idStore,
                          color: item.color,
                          price: item.price,
                          qty: item.qty,
                          size: item.size,
                          title: item.title,
                          total: item.total,
                          brand: item.brand,
                          image: item.image,
                        };
                      })
                    );
                  })
                  .catch((err) => {
                    setEmpty(true);
                  });
              });
            })
            .catch((err) =>
              Swal.fire({
                title: "Error!",
                text: err.response.data.message,
                icon: "error",
                confirmButtonText: "Ok",
                confirmButtonColor: "#273ac7",
              })
            );
        }
      } else {
        Swal.fire({
          title: "Dibatalkan!",
          text: "Keranjang kamu aman :)",
          icon: "info",
          confirmButtonColor: "#273ac7",
        });
      }
    });
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
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="defaultCheck1"
                      style={{ width: "20px" }}
                      checked={product.length === count ? true : false}
                      onChange={(e) => {
                        let checked = e.target.checked;
                        setProduct(
                          product.map((item) => {
                            item.select = checked;
                            if (count === product.length) {
                              setCount(0);
                            } else {
                              setCount(count + product.length);
                            }
                            return item;
                          })
                        );
                      }}
                    />
                    <label
                      className="form-check-label"
                      for="defaultCheck1"
                      style={{ marginLeft: "10px" }}
                    >
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
                                    checked={item.select}
                                    onChange={(e) => {
                                      let checked = e.target.checked;
                                      setProduct(
                                        product.map((data) => {
                                          if (item.id === data.id) {
                                            data.select = checked;
                                            if (item.select) {
                                              setCount(count + 1);
                                            } else {
                                              setCount(count - 1);
                                            }
                                          }
                                          return data;
                                        })
                                      );
                                    }}
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
                                  {Rupiah(item.total)}
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
                  <p className={style["price-value"]}>{Rupiah(total)}</p>
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

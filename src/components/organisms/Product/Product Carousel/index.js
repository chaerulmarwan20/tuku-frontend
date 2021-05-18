import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import "./ProductCarousel.css";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import Button from "../../../atoms/Button";
import star from "../../../atoms/New folder/Star.png";
import { useDispatch } from "react-redux";
import { addType } from "../../../../configs/redux/actions/order";
import axios from "axios";
import axiosApiInstance from "../../../../helpers/axios";
import Rupiah from "../../../../helpers/rupiah";
import Swal from "sweetalert2";

function Index({ product }) {
  const urlApi = process.env.REACT_APP_API_URL;
  const urlImg = process.env.REACT_APP_API_IMG;
  let { idproduct } = useParams();

  const history = useHistory();

  const dispatch = useDispatch();
  const [count, setcount] = useState(0);
  const [size, setSize] = useState("");

  const [gallery, setGallery] = useState([]);
  const [mainImg, setMainImg] = useState("");

  const [colorActive, setColorActive] = useState("");

  useEffect(() => {
    axios
      .get(`${urlApi}/product/image/${idproduct}`)
      .then((result) => {
        const newGallery = result.data.data;
        setGallery(newGallery);
      })
      .catch((err) => {
        Swal.fire({
          icon: "info",
          title: "Info!",
          text: "Hanya satu gambar untuk produk ini",
          confirmButtonColor: "#273ac7",
        });
      });
  }, [idproduct, urlApi]);

  useEffect(() => {
    if (product.category === "Shoes") {
      setSize(28);
    } else {
      setSize("S");
    }
  }, [product.category]);

  const handleSize = (data) => {
    if (product.category === "Shoes") {
      if (data === "plus") {
        setSize(size + 1);
      } else {
        if (size > 0) {
          setSize(size - 1);
        }
      }
    } else {
      if (data === "plus") {
        if (size === "S") {
          setSize("M");
        } else if (size === "M") {
          setSize("L");
        } else if (size === "L") {
          setSize("XL");
        }
      } else {
        if (size === "XL") {
          setSize("L");
        } else if (size === "L") {
          setSize("M");
        } else if (size === "M") {
          setSize("S");
        }
      }
    }
  };

  const handleCount = (data) => {
    if (data === "plus") {
      setcount(count + 1);
    } else {
      if (count > 0) {
        setcount(count - 1);
      }
    }
  };

  const handleType = (data) => {
    dispatch(addType(data));
  };

  const handleColorActive = (params) => {
    setColorActive(params);
  };

  let colors;
  if (product.color !== undefined) {
    colors = JSON.parse(product.color);
  }

  let sizes;
  let arrSizes;
  if (product.size !== undefined) {
    sizes = JSON.parse(product.size);
    arrSizes = Array.from(sizes);
  }

  const handleAddBag = () => {
    const dataBag = {
      idProduct: idproduct,
      idUser: localStorage.getItem("id"),
      idStore: product.idBrand,
      qty: count,
      price: product.price,
      total: product.price * count,
      size: size,
      color: colorActive,
    };
    if (count < 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Masukkan jumlah yang valid",
        confirmButtonColor: "#273ac7",
      });
    } else if (colorActive === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Pilih warna produk`,
        confirmButtonColor: "#273ac7",
      });
    } else if (count > product.stock) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Stok produk ${product.stock}`,
        confirmButtonColor: "#273ac7",
      });
    } else if (arrSizes.includes(String(size)) === false) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Ukuran produk ${arrSizes.join(" ")}`,
        confirmButtonColor: "#273ac7",
      });
    } else {
      axiosApiInstance
        .post(`${urlApi}/cart`, dataBag)
        .then((result) => {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: `Produk berhasil ditambahkan ke keranjang`,
            confirmButtonColor: "#273ac7",
          });
          setColorActive("");
          setcount(0);
          if (product.category === "Shoes") {
            setSize(28);
          } else {
            setSize("S");
          }
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

  const handleBuy = () => {
    const dataBag = {
      idProduct: idproduct,
      idUser: localStorage.getItem("id"),
      idStore: product.idBrand,
      qty: count,
      price: product.price,
      total: product.price * count,
      size: size,
      color: colorActive,
    };
    if (count < 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Masukkan jumlah yang valid",
        confirmButtonColor: "#273ac7",
      });
    } else if (colorActive === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Pilih warna barang`,
        confirmButtonColor: "#273ac7",
      });
    } else if (count > product.stock) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Stok barang ${product.stock}`,
        confirmButtonColor: "#273ac7",
      });
    } else if (arrSizes.includes(String(size)) === false) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Ukuran barang ${arrSizes.join(" ")}`,
        confirmButtonColor: "#273ac7",
      });
    } else {
      axiosApiInstance
        .post(`${urlApi}/cart`, dataBag)
        .then((result) => {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: `Mengarahkan ke halaman checkout`,
            confirmButtonColor: "#273ac7",
          }).then(() => {
            history.push("/check-out");
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

  return (
    <div>
      <div className="productTopContent">
        <div className="productTopContentCarouselWrap">
          <div className="productTopCategoryRoute">
            <p>Home / Category / {product.category}</p>
          </div>
          <div className="productTopContentBody">
            <div className="productTopContetBodyLeft">
              <div className="productTopMainImage">
                <img
                  src={!mainImg ? `${urlImg}${product.image}` : mainImg}
                  alt="product"
                />
              </div>
              <div className="productTopContentTriggerImage">
                {gallery.map((item) => {
                  return (
                    <div
                      className="hoverThis productTriggerImageItem"
                      key={item.id}
                      onClick={() => {
                        handleType("PX28");
                      }}
                    >
                      <img
                        src={`${urlImg}${item.image}`}
                        onClick={(e) => setMainImg(`${urlImg}${item.image}`)}
                        alt="product"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="productTopContentRight">
              <div className="productTopContentRightBody">
                <div className="productTopBotContent">
                  <p>{product.title}</p>
                  <span className="prodTextTiny">{product.brand}</span>
                </div>
                <div className="productTopBotContentStar">
                  {Array.from(Array(product.rating).keys()).map(
                    (item, index) => {
                      return (
                        <div className="prodStarTop" key={index}>
                          <img src={star} alt="star" />
                        </div>
                      );
                    }
                  )}
                  <div className="prodStarTop">
                    <span>({product.rating})</span>
                  </div>
                </div>
                {product.price !== undefined && (
                  <div className="productTopBotContentPrice">
                    <span className="prodTextTiny">Price</span>
                    <p>{Rupiah(product.price)},-</p>
                  </div>
                )}
                <div className="productTopBotContentColor">
                  <p>Color</p>
                  <div className="productTopBotContentColorItem">
                    {colors !== undefined &&
                      colors.map((item, index) => {
                        return (
                          <div
                            className={`ptbccItem ${
                              item === colorActive && "active"
                            }`}
                            key={index}
                          >
                            <div
                              className="color"
                              style={{
                                backgroundColor: item,
                                cursor: "pointer",
                              }}
                              onClick={() => handleColorActive(item)}
                            ></div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="productSizeAndCount">
                  {product.category === "Shoes" ? (
                    <div className="productSizeAndCountItem">
                      <span>Size</span>
                      <div className="productSizeAndCountObjek">
                        <div className="prodStrip">
                          <FaMinusCircle
                            style={{ fontSize: "28px", cursor: "pointer" }}
                            onClick={() => handleSize()}
                          />
                        </div>
                        <div className="prodSizeInput">
                          <p>{size}</p>
                        </div>
                        <div className="prodStrip">
                          <FaPlusCircle
                            style={{ fontSize: "28px", cursor: "pointer" }}
                            onClick={() => handleSize("plus")}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="productSizeAndCountItem">
                      <span>Size</span>
                      <div className="productSizeAndCountObjek">
                        <div className="prodStrip">
                          <FaMinusCircle
                            style={{ fontSize: "28px", cursor: "pointer" }}
                            onClick={() => handleSize()}
                          />
                        </div>
                        <div className="prodSizeInput">
                          <p>{size}</p>
                        </div>
                        <div className="prodStrip">
                          <FaPlusCircle
                            style={{ fontSize: "28px", cursor: "pointer" }}
                            onClick={() => handleSize("plus")}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="productSizeAndCountItem">
                    <span>Jumlah</span>
                    <div className="productSizeAndCountObjek">
                      <div className="prodStrip">
                        <FaMinusCircle
                          style={{ fontSize: "28px", cursor: "pointer" }}
                          onClick={() => handleCount()}
                        />
                      </div>
                      <div className="prodSizeInput">
                        <p>{count}</p>
                      </div>
                      <div className="prodStrip">
                        <FaPlusCircle
                          style={{ fontSize: "28px", cursor: "pointer" }}
                          onClick={() => handleCount("plus")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="prodButtonsBottom">
                  <div className="prodButtonItem">
                    <Button
                      btnClr="transparent"
                      cls="prodButtonChat"
                      ftClr="black"
                      val="Chat"
                    />
                  </div>
                  <div className="prodButtonItem">
                    <Button
                      btnClr="transparent"
                      cls="prodButtonAddBag"
                      ftClr="black"
                      val="Add bag"
                      func={() => handleAddBag()}
                    />
                  </div>
                  <div className="prodButtonItem">
                    <Button
                      btnClr="#273AC7"
                      cls="prodButtonBuyNow"
                      ftClr="white"
                      val="Buy Now"
                      func={() => handleBuy()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;

import css from "./profileStore.module.css";
import { useState } from "react";
// IMAGES
import Left from "../../../images/left.png";
import Right from "../../../images/right.png";
import Search from "../../../images/Search.png";
import NoProduct from "../../../images/NoProduct.png";
// ATOMS
import { Button } from "../../../atoms";
import { useEffect } from "react";
import axiosApiInstance from "../../../../helpers/axios";
import Rupiah from "../../../../helpers/rupiah";

export default function MyProducts({ smpmd, smpmm }) {
  const apiImg = process.env.REACT_APP_API_IMG;
  const btnCls = "hoverThis " + css.myOrderBtn;
  const productButtonRowCarouselMobile = ["All items", "Sold out", "Archieved"];

  const [mpms, setMpms] = useState("All items");
  const [product, setProduct] = useState([]);
  const [status, setStatus] = useState("");
  const [empty, setEmpty] = useState(false);
  const [query, setQuery] = useState("");

  const [buttonOrder, switchButtonOrder] = useState(0);
  // SWITCH CAROUSEL BUTTON
  const switchBtn = (opr) => {
    if (opr === "+") {
      if (buttonOrder < productButtonRowCarouselMobile.length - 1) {
        switchButtonOrder(buttonOrder + 1);
        setStatus(productButtonRowCarouselMobile[buttonOrder + 1]);
        smpmm(productButtonRowCarouselMobile[buttonOrder + 1]);
      }
    } else if (opr === "-") {
      if (buttonOrder > 0) {
        switchButtonOrder(buttonOrder - 1);
        if (status === "Sold out") {
          setStatus("");
        } else {
          setStatus(productButtonRowCarouselMobile[buttonOrder - 1]);
        }
        smpmm(productButtonRowCarouselMobile[buttonOrder - 1]);
      }
    }
  };

  const handleClickStatus = (params) => {
    if (params === "") {
      setMpms("All items");
    } else {
      setMpms(params);
    }
    setStatus(params);
  };

  const searchProduct = (event) => {
    setQuery(event.target.value);
    setMpms("All items");
    setStatus("");
    axiosApiInstance
      .get(
        `${process.env.REACT_APP_API_URL}/store/product?keyword=${event.target.value}`
      )
      .then((res) => {
        if (event.target.value === "") {
          axiosApiInstance
            .get(`${process.env.REACT_APP_API_URL}/store/product`)
            .then((res) => {
              setEmpty(false);
              setProduct(res.data.data);
            })
            .catch((err) => {
              setEmpty(true);
            });
          setEmpty(false);
        }
        setProduct(res.data.data);
        setEmpty(false);
      })
      .catch((err) => {
        setEmpty(true);
      });
  };

  useEffect(() => {
    if (status === "") {
      axiosApiInstance
        .get(`${process.env.REACT_APP_API_URL}/store/product`)
        .then((res) => {
          setEmpty(false);
          setProduct(res.data.data);
        })
        .catch((err) => {
          setEmpty(true);
        });
    } else if (status === "Sold out") {
      axiosApiInstance
        .get(`${process.env.REACT_APP_API_URL}/store/product/sold`)
        .then((res) => {
          setEmpty(false);
          setProduct(res.data.data);
        })
        .catch((err) => {
          setEmpty(true);
        });
    } else {
      axiosApiInstance
        .get(`${process.env.REACT_APP_API_URL}/store/product/archive`)
        .then((res) => {
          setEmpty(false);
          setProduct(res.data.data);
        })
        .catch((err) => {
          setEmpty(true);
        });
    }
  }, [status]);

  return (
    <div className={"displayColumn " + css.rightSideUserProfile}>
      <div className={"displayColumn " + css.rightSideUserTitle}>
        <span
          className={css.rightSideUserTitleBigText + " " + css.hideInMobile}
        >
          My product
        </span>
        <div className={"displayRow " + css.myOrderBtnRowDesktop}>
          <Button
            cls={
              mpms === "All items"
                ? btnCls + " " + css.selectedMyOrderBtn
                : btnCls
            }
            func={() => handleClickStatus("")}
            val="All items"
          />
          <Button
            cls={
              mpms === "Sold out"
                ? btnCls + " " + css.selectedMyOrderBtn
                : btnCls
            }
            func={() => handleClickStatus("Sold out")}
            val="Sold out"
          />
          <Button
            cls={
              mpms === "Archieved"
                ? btnCls + " " + css.selectedMyOrderBtn
                : btnCls
            }
            func={() => handleClickStatus("Archieved")}
            val="Archieved"
          />
        </div>
        <div className={"displayRow " + css.myOrderBtnRowMobile}>
          <img
            alt="Arrow Left"
            className={css.arrowCarousel}
            onClick={() => {
              switchBtn("-");
            }}
            src={Left}
            style={buttonOrder < 1 ? { opacity: "0.25" } : null}
          />
          <Button
            cls={btnCls + " " + css.selectedMyOrderBtn}
            val={productButtonRowCarouselMobile[buttonOrder]}
          />
          <img
            alt="Arrow Right"
            className={css.arrowCarousel}
            onClick={() => {
              switchBtn("+");
            }}
            src={Right}
            style={
              buttonOrder >= productButtonRowCarouselMobile.length - 1
                ? { opacity: "0.25" }
                : null
            }
          />
        </div>
      </div>
      <div className={"displayColumn " + css.rightSideMyOrderDataShow}>
        <div className={"displayRow " + css.rightSideProductSearchBorder}>
          <img alt="Search" className={css.productSearchLogo} src={Search} />
          <input
            className={css.productSearchInput}
            placeholder="Search"
            type="text"
            value={query}
            onChange={searchProduct}
          />
        </div>
        <div className={"displayColumn " + css.productListTable}>
          <div className={"displayRow " + css.productListTableCategory}>
            <span className={css.productNameTitle}>My Products</span>
            {/* <span className={css.productNameTitle}>Product Name</span>
            <span className={css.productPriceTitle}>Price</span>
            <span className={css.productStockTitle}>Stock</span> */}
          </div>
          <div className={"displayColumn " + css.productListData}>
            {empty === false && (
              <table className="table table-responsive-sm text-center">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Condition</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="align-middle">{index + 1}.</td>
                        <td className="align-middle">{item.title}</td>
                        <td>
                          <img
                            src={`${apiImg}${item.image}`}
                            height={69}
                            width={69}
                            style={{ borderRadius: "8px" }}
                            alt="Product"
                          />
                        </td>
                        <td className="align-middle">{item.category}</td>
                        <td className="align-middle">{Rupiah(item.price)}</td>
                        <td className="align-middle">{item.conditions}</td>
                        <td className="align-middle">{item.stock}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            {empty === true && (
              <img
                alt="No Order"
                className={css.noProductImg}
                src={NoProduct}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

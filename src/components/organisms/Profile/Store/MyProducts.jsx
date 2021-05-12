import css from "./profileStore.module.css";
import "./profileStore.css";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
// IMAGES
import Left from "../../../images/left.png";
import Right from "../../../images/right.png";
import Search from "../../../images/Search.png";
import NoProduct from "../../../images/NoProduct.png";
// ATOMS
import { Button } from "../../../atoms";
import axiosApiInstance from "../../../../helpers/axios";
import Rupiah from "../../../../helpers/rupiah";

export default function MyProducts({ smpmd, smpmm }) {
  const apiImg = process.env.REACT_APP_API_IMG;
  const btnCls = "hoverThis " + css.myOrderBtn;
  const productButtonRowCarouselMobile = ["All items", "Sold out", "Archieved"];

  const [mpms, setMpms] = useState("All items");
  const [product, setProduct] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [status, setStatus] = useState("");
  const [empty, setEmpty] = useState(false);
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState("ASC");
  const [sort, setSort] = useState("id");
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const [limit, setLimit] = useState(5);
  const [paginate, setPaginate] = useState(1);
  const [buttonOrder, switchButtonOrder] = useState(0);

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  const handleClickOrder = (params) => {
    setOrder(params);
  };

  const handleChangeLimit = (event) => {
    if (page > 1) {
      setPage(1);
    }
    setLimit(event.target.value);
  };

  const handleClickPaginate = (params) => {
    setPage(params);
  };

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
        `${process.env.REACT_APP_API_URL}/store/product?keyword=${query}&order=${order}&sortBy=${sort}&page=${page}&perPage=${limit}`
      )
      .then((res) => {
        if (event.target.value === "") {
          axiosApiInstance
            .get(
              `${process.env.REACT_APP_API_URL}/store/product?keyword=${query}&order=${order}&sortBy=${sort}&page=${page}&perPage=${limit}`
            )
            .then((res) => {
              setCurrentPage(res.data.currentPage);
              setTotalPage(res.data.totalPage);
              setPaginate(res.data.totalPage < 6 ? res.data.totalPage : 5);
              setEmpty(false);
              setProduct(res.data.data);
            })
            .catch((err) => {
              setEmpty(true);
            });
          setEmpty(false);
        }
        setCurrentPage(res.data.currentPage);
        setTotalPage(res.data.totalPage);
        setPaginate(res.data.totalPage < 6 ? res.data.totalPage : 5);
        setEmpty(false);
        setProduct(res.data.data);
      })
      .catch((err) => {
        setEmpty(true);
      });
  };

  const handleClickDetail = (id) => {
    axiosApiInstance
      .get(`${process.env.REACT_APP_API_URL}/product/${id}`)
      .then((res) => {
        setProductDetail(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const handleClickDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#db3022",
      cancelButtonText: "No, cancel!",
      cancelButtonColor: "#1EC15F",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosApiInstance
          .delete(`${process.env.REACT_APP_API_URL}/product/${id}`)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: res.data.message,
              confirmButtonColor: "#273ac7",
            }).then(() => {
              axiosApiInstance
                .get(`${process.env.REACT_APP_API_URL}/store/product`)
                .then((res) => {
                  setEmpty(false);
                  setProduct(res.data.data);
                })
                .catch((err) => {
                  setEmpty(true);
                });
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: err.response.data.message,
              icon: "error",
              confirmButtonColor: "#273ac7",
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled!",
          text: "Your product is safe :)",
          icon: "info",
          confirmButtonColor: "#273ac7",
        });
      }
    });
  };

  useEffect(() => {
    if (status === "") {
      axiosApiInstance
        .get(
          `${process.env.REACT_APP_API_URL}/store/product?keyword=${query}&order=${order}&sortBy=${sort}&page=${page}&perPage=${limit}`
        )
        .then((res) => {
          setCurrentPage(res.data.currentPage);
          setTotalPage(res.data.totalPage);
          setPaginate(res.data.totalPage < 6 ? res.data.totalPage : 5);
          setEmpty(false);
          setProduct(res.data.data);
        })
        .catch((err) => {
          setEmpty(true);
        });
    } else if (status === "Sold out") {
      axiosApiInstance
        .get(
          `${process.env.REACT_APP_API_URL}/store/product/sold?keyword=${query}&order=${order}&sortBy=${sort}&page=${page}&perPage=${limit}`
        )
        .then((res) => {
          setCurrentPage(res.data.currentPage);
          setTotalPage(res.data.totalPage);
          setPaginate(res.data.totalPage < 6 ? res.data.totalPage : 5);
          setEmpty(false);
          setProduct(res.data.data);
        })
        .catch((err) => {
          setEmpty(true);
        });
    } else {
      axiosApiInstance
        .get(
          `${process.env.REACT_APP_API_URL}/store/product/archive?keyword=${query}&order=${order}&sortBy=${sort}&page=${page}&perPage=${limit}`
        )
        .then((res) => {
          setCurrentPage(res.data.currentPage);
          setTotalPage(res.data.totalPage);
          setPaginate(res.data.totalPage < 6 ? res.data.totalPage : 5);
          setEmpty(false);
          setProduct(res.data.data);
        })
        .catch((err) => {
          setEmpty(true);
        });
    }
  }, [status, order, sort, page, limit, query]);

  return (
    <>
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
              onKeyUp={searchProduct}
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
                <table className="table table-responsive text-center">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama</th>
                      <th>Image</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="align-middle">
                            {index + 1 * (limit * page) - (limit - 1)}.
                          </td>
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
                          <td className="align-middle">{item.stock}</td>
                          <td className="align-middle">
                            <button
                              type="button"
                              className={css.btnDetail}
                              data-toggle="modal"
                              data-target="#exampleModal"
                              onClick={() => handleClickDetail(item.id)}
                            >
                              Detail
                            </button>
                          </td>
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
              {empty === false && (
                <>
                  <div className="d-flex justify-content-center">
                    <ul className="pagination-custom">
                      {Array.from(Array(paginate).keys()).map((data, index) => {
                        return (
                          <li key={index}>
                            <button
                              className={`${
                                currentPage >= 5 && currentPage < totalPage
                                  ? data + (currentPage - 3) === currentPage &&
                                    "page-active"
                                  : currentPage >= 5 &&
                                    currentPage === totalPage
                                  ? data + (currentPage - 3) - 1 ===
                                      currentPage && "page-active"
                                  : data + 1 === currentPage && "page-active"
                              }`}
                              onClick={() =>
                                handleClickPaginate(
                                  `${
                                    currentPage >= 5 && currentPage < totalPage
                                      ? data + (currentPage - 3)
                                      : currentPage >= 5 &&
                                        currentPage === totalPage
                                      ? data + (currentPage - 3) - 1
                                      : data + 1
                                  }`
                                )
                              }
                            >
                              {currentPage >= 5 && currentPage < totalPage
                                ? data + (currentPage - 3)
                                : currentPage >= 5 && currentPage === totalPage
                                ? data + (currentPage - 3) - 1
                                : data + 1}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="d-flex flex-column flex-xl-row justify-content-md-center align-items-center mt-1">
                    <div className="btn-container d-flex">
                      <button
                        type="button"
                        className={`btn btn-order mr-3 d-flex justify-content-center align-items-center ${
                          order === "ASC" ? "active" : ""
                        }`}
                        onClick={() => handleClickOrder("ASC")}
                      >
                        Ascending
                      </button>
                      <button
                        type="button"
                        className={`btn btn-order mr-3 d-flex justify-content-center align-items-center ${
                          order === "DESC" ? "active" : ""
                        }`}
                        onClick={() => handleClickOrder("DESC")}
                      >
                        Descending
                      </button>
                    </div>
                    <div className="select-container d-flex flex-column flex-md-row mt-3 mt-xl-0">
                      <select
                        className="custom-select mr-3"
                        onChange={handleChangeSort}
                      >
                        <option value="id">Sort by Id</option>
                        <option value="title">Sort by name</option>
                        <option value="category">Sort by category</option>
                        <option value="price">Sort by price</option>
                        <option value="stock">Sort by stock</option>
                      </select>
                      <select
                        className="custom-select mt-3 mt-md-0"
                        onChange={handleChangeLimit}
                      >
                        <option value="5">Limit 5</option>
                        <option value="10">Limit 10</option>
                        <option value="15">Limit 15</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Detail Product
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body d-flex flex-column align-items-start justify-content-center pb-4 pt-0">
              <ul className="list-group list-group-flush w-100">
                {productDetail.map((item, index) => {
                  return (
                    <div key={index}>
                      <li className="list-group-item">
                        Condition: <br /> {item.conditions}
                      </li>
                      <li className="list-group-item">
                        Size: <br />
                        {JSON.parse(item.size).map((item) => {
                          return `${item} `;
                        })}
                      </li>
                      <li className="list-group-item">
                        Color: <br />
                        {JSON.parse(item.color).map((item) => {
                          return `${item} `;
                        })}
                      </li>
                      <li className="list-group-item">
                        Description: <br /> {item.description}
                      </li>
                      <li className="list-group-item">
                        <button
                          type="button"
                          className={css.btnDelete}
                          data-dismiss="modal"
                          onClick={() => handleClickDelete(item.id)}
                        >
                          Delete this product
                        </button>
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

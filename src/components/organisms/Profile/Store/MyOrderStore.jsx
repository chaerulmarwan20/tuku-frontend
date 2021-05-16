import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import css from "./profileStore.module.css";
import "./profileStore.css";
// IMAGES
import Left from "../../../images/left.png";
import Right from "../../../images/right.png";
import NoOrder from "../../../images/NoOrder.png";
// ATOMS
import { Button } from "../../../atoms";
import axiosApiInstance from "../../../../helpers/axios";
import Rupiah from "../../../../helpers/rupiah";

export default function MyOrderUser({ smosd, smosm }) {
  const apiImg = process.env.REACT_APP_API_IMG;
  const btnCls = "hoverThis " + css.myOrderBtn;
  const orderButtonRowCarouselMobile = [
    "All items",
    "Not yet paid",
    "Packed",
    "Sent",
    "Completed",
    "Order cancel",
  ];
  const [moss, setMoss] = useState("All items");
  const [buttonOrder, switchButtonOrder] = useState(0);
  const [status, setStatus] = useState("");
  const [myOrder, setMyOrder] = useState([]);
  const [myOrderDetail, setMyOrderDetail] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [order, setOrder] = useState("ASC");
  const [sort, setSort] = useState("id");
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const [limit, setLimit] = useState(5);
  const [paginate, setPaginate] = useState(1);

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
      if (buttonOrder < orderButtonRowCarouselMobile.length - 1) {
        switchButtonOrder(buttonOrder + 1);
        setStatus(orderButtonRowCarouselMobile[buttonOrder + 1]);
        smosm(orderButtonRowCarouselMobile[buttonOrder + 1]);
      }
    } else if (opr === "-") {
      if (buttonOrder > 0) {
        switchButtonOrder(buttonOrder - 1);
        if (status === "Not yet paid") {
          setStatus("");
        } else {
          setStatus(orderButtonRowCarouselMobile[buttonOrder - 1]);
        }
        smosm(orderButtonRowCarouselMobile[buttonOrder - 1]);
      }
    }
  };

  const handleClickStatus = (params) => {
    if (params === "") {
      setMoss("All items");
    } else {
      setMoss(params);
    }
    setStatus(params);
  };

  const handleClickDetail = (id) => {
    axiosApiInstance
      .get(`${process.env.REACT_APP_API_URL}/store/order/${id}`)
      .then((res) => {
        setMyOrderDetail(res.data.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: err.response.data.message,
          confirmButtonColor: "#273ac7",
        });
      });
  };

  useEffect(() => {
    axiosApiInstance
      .get(
        `${process.env.REACT_APP_API_URL}/store/order?order=${order}&sortBy=${sort}&page=${page}&perPage=${limit}&status=${status}`
      )
      .then((res) => {
        setCurrentPage(res.data.currentPage);
        setTotalPage(res.data.totalPage);
        setPaginate(res.data.totalPage < 6 ? res.data.totalPage : 5);
        setEmpty(false);
        setMyOrder(res.data.data);
      })
      .catch((err) => {
        setEmpty(true);
      });
  }, [order, sort, page, limit, status]);

  return (
    <>
      <div className={"displayColumn " + css.rightSideUserProfile}>
        <div className={"displayColumn " + css.rightSideUserTitle}>
          <span
            className={css.rightSideUserTitleBigText + " " + css.hideInMobile}
          >
            My order
          </span>
          <div className={"displayRow " + css.myOrderBtnRowDesktop}>
            <Button
              cls={
                moss === "All items"
                  ? btnCls + " " + css.selectedMyOrderBtn
                  : btnCls
              }
              func={() => handleClickStatus("")}
              val="All items"
            />
            <Button
              cls={
                moss === "Not yet paid"
                  ? btnCls + " " + css.selectedMyOrderBtn
                  : btnCls
              }
              func={() => handleClickStatus("Not yet paid")}
              val="Not yet paid"
            />
            <Button
              cls={
                moss === "Packed"
                  ? btnCls + " " + css.selectedMyOrderBtn
                  : btnCls
              }
              func={() => handleClickStatus("Packed")}
              val="Packed"
            />
            <Button
              cls={
                moss === "Sent" ? btnCls + " " + css.selectedMyOrderBtn : btnCls
              }
              func={() => handleClickStatus("Sent")}
              val="Sent"
            />
            <Button
              cls={
                moss === "Completed"
                  ? btnCls + " " + css.selectedMyOrderBtn
                  : btnCls
              }
              func={() => handleClickStatus("Completed")}
              val="Completed"
            />
            <Button
              cls={
                moss === "Order cancel"
                  ? btnCls + " " + css.selectedMyOrderBtn
                  : btnCls
              }
              func={() => handleClickStatus("Order cancel")}
              val="Order cancel"
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
              val={orderButtonRowCarouselMobile[buttonOrder]}
            />
            <img
              alt="Arrow Right"
              className={css.arrowCarousel}
              onClick={() => {
                switchBtn("+");
              }}
              src={Right}
              style={
                buttonOrder >= orderButtonRowCarouselMobile.length - 1
                  ? { opacity: "0.25" }
                  : null
              }
            />
          </div>
        </div>
        <div className={"displayColumn " + css.rightSideMyOrderDataShow}>
          <div className="myOrderDataShowObjek">
            {empty === false && (
              <table className="table table-responsive text-center">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {myOrder.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="align-middle">
                          {index + 1 * (limit * page) - (limit - 1)}.
                        </td>
                        <td className="align-middle">{item.name}</td>
                        <td className="align-middle">{item.address}</td>
                        <td className="align-middle">{Rupiah(item.total)}</td>
                        <td className="align-middle">{item.paymentMethod}</td>
                        <td className="align-middle">
                          {item.status === "Not yet paid" ? (
                            <span className="badge badge-warning">
                              {item.status}
                            </span>
                          ) : item.status === "Packed" ? (
                            <span className="badge badge-info">
                              {item.status}
                            </span>
                          ) : item.status === "Sent" ? (
                            <span className="badge badge-primary">
                              {item.status}
                            </span>
                          ) : item.status === "Completed" ? (
                            <span className="badge badge-success">
                              {item.status}
                            </span>
                          ) : (
                            <span className="badge badge-danger">
                              {item.status}
                            </span>
                          )}
                        </td>
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
              <div className="w-100 text-center">
                <img alt="No Order" className={css.noOrderImg} src={NoOrder} />
              </div>
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
                                : currentPage >= 5 && currentPage === totalPage
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
                      <option value="id">Sort by id</option>
                      <option value="name">Sort by name</option>
                      <option value="total">Sort by total</option>
                      <option value="paymentMethod">Sort by payment</option>
                      <option value="status">Sort by status</option>
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
                Detail order | Product
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
              {myOrderDetail.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="d-flex align-items-center mt-3 p-3 detial-container w-100"
                  >
                    <span className="number mr-2">{`${index + 1}.`}</span>
                    <div className="mr-3">
                      <img
                        src={`${apiImg}${item.image}`}
                        width={69}
                        height={69}
                        alt="Product"
                        style={{ borderRadius: "8px" }}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <h1 className="title">{item.title}</h1>
                      <span className="detail-order">
                        Size ({item.size}) Qty ({item.qty})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

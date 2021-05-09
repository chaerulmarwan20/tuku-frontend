import css from "./profileUser.module.css";
import "./profileUser.css";
import { useState } from "react";
// IMAGES
import Left from "../../../images/left.png";
import Right from "../../../images/right.png";
import NoOrder from "../../../images/NoOrder.png";
// ATOMS
import { Button } from "../../../atoms";
import { useEffect } from "react";
import axiosApiInstance from "../../../../helpers/axios";
import Rupiah from "../../../../helpers/rupiah";

export default function MyOrderUser({ smoum }) {
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
  const [mous, setMous] = useState("All items");
  const [buttonOrder, switchButtonOrder] = useState(0);
  const [myOrder, setMyOrder] = useState([]);
  const [myOrderDetail, setMyOrderDetail] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [status, setStatus] = useState("");
  // SWITCH CAROUSEL BUTTON
  const switchBtn = (opr) => {
    if (opr === "+") {
      if (buttonOrder < orderButtonRowCarouselMobile.length - 1) {
        switchButtonOrder(buttonOrder + 1);
        setStatus(orderButtonRowCarouselMobile[buttonOrder + 1]);
        smoum(orderButtonRowCarouselMobile[buttonOrder + 1]);
      }
    } else if (opr === "-") {
      if (buttonOrder > 0) {
        switchButtonOrder(buttonOrder - 1);
        if (status === "Not yet paid") {
          setStatus("");
        } else {
          setStatus(orderButtonRowCarouselMobile[buttonOrder - 1]);
        }
        smoum(orderButtonRowCarouselMobile[buttonOrder - 1]);
      }
    }
  };

  const handleClickStatus = (params) => {
    if (params === "") {
      setMous("All items");
    } else {
      setMous(params);
    }
    setStatus(params);
  };

  const handleClickDetail = (id) => {
    axiosApiInstance
      .get(`${process.env.REACT_APP_API_URL}/order/${id}`)
      .then((res) => {
        setMyOrderDetail(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.dat.message);
      });
  };

  // USEEFFECT
  useEffect(() => {
    axiosApiInstance
      .get(`${process.env.REACT_APP_API_URL}/order?perPage=10&status=${status}`)
      .then((res) => {
        setEmpty(false);
        setMyOrder(res.data.data);
      })
      .catch((err) => {
        setEmpty(true);
      });
  }, [status]);

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
                mous === "All items"
                  ? btnCls + " " + css.selectedMyOrderBtn
                  : btnCls
              }
              func={() => handleClickStatus("")}
              val="All items"
            />
            <Button
              cls={
                mous === "Not yet paid"
                  ? btnCls + " " + css.selectedMyOrderBtn
                  : btnCls
              }
              func={() => handleClickStatus("Not yet paid")}
              val="Not yet paid"
            />
            <Button
              cls={
                mous === "Packed"
                  ? btnCls + " " + css.selectedMyOrderBtn
                  : btnCls
              }
              func={() => handleClickStatus("Packed")}
              val="Packed"
            />
            <Button
              cls={
                mous === "Sent" ? btnCls + " " + css.selectedMyOrderBtn : btnCls
              }
              func={() => handleClickStatus("Sent")}
              val="Sent"
            />
            <Button
              cls={
                mous === "Completed"
                  ? btnCls + " " + css.selectedMyOrderBtn
                  : btnCls
              }
              func={() => handleClickStatus("Completed")}
              val="Completed"
            />
            <Button
              cls={
                mous === "Order cancel"
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
          {empty === false && (
            <table className="table table-responsive-sm text-center">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Store</th>
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
                      <td className="align-middle">{index + 1}.</td>
                      <td className="align-middle">{item.store}</td>
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
            <img alt="No Order" className={css.noOrderImg} src={NoOrder} />
          )}
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

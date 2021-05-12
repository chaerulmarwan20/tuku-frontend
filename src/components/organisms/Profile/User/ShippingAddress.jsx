import css from "./profileUser.module.css";
import Swal from "sweetalert2";
// ATOMS
import { Button } from "../../../atoms";
import { useEffect } from "react";
import axiosApiInstance from "../../../../helpers/axios";
import { useState } from "react";

export default function ShippingAddress({ func }) {
  const [shippingDest, setShippingDest] = useState([]);

  const handleChangeAddress = (id) => {
    axiosApiInstance
      .put(`${process.env.REACT_APP_API_URL}/address/${id}`, {
        isPrimary: true,
      })
      .then((res) => {
        Swal.fire({
          title: "Success!",
          text: "Alamat utama berhasil diupdate",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#273ac7",
        }).then(() => {
          axiosApiInstance
            .get(process.env.REACT_APP_API_URL + "/address")
            .then((res) => {
              setShippingDest(res.data.data);
            })
            .catch((err) => {
              Swal.fire({
                title: "Error!",
                text: err.response.data.message,
                icon: "error",
                confirmButtonText: "Ok",
                confirmButtonColor: "#273ac7",
              });
            });
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "#273ac7",
        });
      });
  };

  const handleDeleteAddress = (id) => {
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
          .delete(`${process.env.REACT_APP_API_URL}/address/${id}`)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: res.data.message,
              confirmButtonColor: "#273ac7",
            }).then(() => {
              axiosApiInstance
                .get(process.env.REACT_APP_API_URL + "/address")
                .then((res) => {
                  setShippingDest(res.data.data);
                })
                .catch((err) => {
                  Swal.fire({
                    title: "Error!",
                    text: err.response.data.message,
                    icon: "error",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#273ac7",
                  });
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
          text: "Your address is safe :)",
          icon: "info",
          confirmButtonColor: "#273ac7",
        });
      }
    });
  };

  // USE EFFECT
  useEffect(() => {
    axiosApiInstance
      .get(process.env.REACT_APP_API_URL + "/address")
      .then((res) => {
        setShippingDest(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  return (
    <div className={"displayColumn " + css.rightSideUserProfile}>
      <div className={"displayColumn " + css.rightSideUserTitle}>
        <span className={css.rightSideUserTitleBigText}>
          Choose another address
        </span>
        <span className={css.rightSideUserTitleSmallText}>
          Manage your shipping address
        </span>
      </div>
      <div className={"displayColumn " + css.insideAddressArea}>
        <Button
          btnClr="white"
          cls={css.addNewAddressBtn}
          ftClr="#9B9B9B"
          func={func}
          val="Add new address"
        />
        {shippingDest &&
          shippingDest.map((data, index) => {
            return (
              <div
                className={
                  data.isPrimary
                    ? "displayColumn " + css.changeAddressAreaActive
                    : "displayColumn " + css.changeAddressArea
                }
              >
                <span className={css.changeAddressPeopleName} key={index.id}>
                  {data.name}
                </span>
                <span className={css.changeAddressLocation}>
                  {data.type}, {data.address},{data.city}, {data.postalCode},{" "}
                  <br />
                  Phone: {data.phoneNumber}
                </span>
                {data.isPrimary ? (
                  <span className={css.changeAddressBtn}>
                    {" "}
                    Current address{" "}
                  </span>
                ) : (
                  <div className="d-flex">
                    <span
                      className={"hoverThis mr-3 " + css.changeAddressBtn}
                      onClick={() => handleChangeAddress(data.id)}
                    >
                      {" "}
                      Choose address{" "}
                    </span>
                    <span
                      className={"hoverThis " + css.deleteAddressBtn}
                      onClick={() => handleDeleteAddress(data.id)}
                    >
                      {" "}
                      Delete address{" "}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

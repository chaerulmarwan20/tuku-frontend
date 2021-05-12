import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosApiInstance from "../../../../helpers/axios";
import Swal from "sweetalert2";
import css from "./profileStore.module.css";
// ATOMS
import { Button, Input } from "../../../atoms";

export default function StoreProfile({ cau, au, ud, sd, status, storeImage }) {
  const url = process.env.REACT_APP_API_URL;
  const [store, setStore] = useState({
    store: "",
    email: "",
    phoneNumber: "",
    description: "",
  });

  const handleFormChange = (event) => {
    const storeNew = { ...store };
    storeNew[event.target.name] = event.target.value;
    setStore(storeNew);
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("storeName", store.store);
    formData.append("email", store.email);
    formData.append("phoneNumber", store.phoneNumber);
    formData.append("description", store.description);
    if (status) {
      formData.append("image", storeImage);
    }
    axiosApiInstance
      .put(url + `/store`, formData)
      .then((res) => {
        Swal.fire({
          title: "Success!",
          text: "Toko berhasil diubah",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#273ac7",
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

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/store", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data.data[0];
        setStore({
          store: data.store,
          email: data.email,
          phoneNumber: data.phoneNumber,
          description: data.description,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: err.response.data.message,
          confirmButtonColor: "#273ac7",
        });
      });
  }, []);
  return (
    <div className={"displayColumn " + css.rightSideUserProfile}>
      <div className={"displayColumn " + css.rightSideUserTitle}>
        <span className={css.rightSideUserTitleBigText}>My profile store</span>
        <span className={css.rightSideUserTitleSmallText}>
          Manage your profile information
        </span>
      </div>
      <div className={css.myProfileArea}>
        <div className={"displayColumn " + css.myProfileLeftSide}>
          <div className={"displayRow " + css.insideMyProfileLeftSide}>
            <div className={"displayColumn " + css.myProfileLeftSideLabel}>
              <span className={css.myProfileInputLabel}>Store Name</span>
              <span className={css.myProfileInputLabel}>Email</span>
              <span className={css.myProfileInputLabel}>Phone Number</span>
              <span className={css.myProfileInputLabel}>Store description</span>
            </div>
            <div className={"displayColumn " + css.myProfileLeftSideInputArea}>
              <Input
                cls={css.myProfileInput + " " + css.myProfileLeftSideSetupSpace}
                nm="store"
                onCg={handleFormChange}
                plcHldr="Input your name here"
                type="text"
                val={store.store}
              />
              <Input
                cls={css.myProfileInput + " " + css.myProfileLeftSideSetupSpace}
                nm="email"
                onCg={handleFormChange}
                plcHldr="Input your e-mail here"
                type="text"
                val={store.email}
              />
              <Input
                cls={css.myProfileInput + " " + css.myProfileLeftSideSetupSpace}
                nm="phoneNumber"
                onCg={handleFormChange}
                plcHldr="Input your phone number here"
                type="text"
                val={store.phoneNumber}
              />
              <textarea
                className={
                  css.myProfileInput +
                  " " +
                  css.myProfileLeftSideSetupSpace +
                  " " +
                  css.myProfileTextarea
                }
                name="description"
                onChange={handleFormChange}
                placeholder="Input your store description here"
                value={store.description}
              />
            </div>
          </div>
        </div>
        <div className={"displayColumn " + css.myProfileRightSide}>
          <img alt="Profile" className={css.myProfilePic} src={au} />
          <Button
            btnClr="white"
            cls={css.myProfileSelectImage}
            func={cau}
            val="Select image"
          />
          <Button
            btnClr="#273AC7"
            cls={css.myProfileSelectImage}
            ftClr="white"
            val="Save"
            func={handleSave}
          />
        </div>
      </div>
    </div>
  );
}

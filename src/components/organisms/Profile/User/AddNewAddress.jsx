import css from "./profileUser.module.css";
// IMAGES
import Close from "../../../images/close.png";
// ATOMS
import { Button, Input } from "../../../atoms";
import axiosApiInstance from "../../../../helpers/axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function AddNewAddress({
  closeAddAddress,
  na,
  nac,
  removeExistAddress,
}) {
  const [isPrimary, setIsPrimary] = useState(false);

  const updateAddress = () => {
    na.isPrimary = isPrimary;
    na.phoneNumber = na.phone;
    na.type = na.save;
    na.postalCode = na.code;
    axiosApiInstance
      .post(process.env.REACT_APP_API_URL + "/address", na)
      .then((res) => {
        if (res) {
          Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: "Mengarahkan ke halaman profil",
            confirmButtonColor: "#273ac7",
          }).then(() => {
            window.location.reload();
          });
        }
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
  const checkBox = (e) => {
    if (isPrimary === false) {
      setIsPrimary(true);
    } else {
      setIsPrimary(false);
    }
  };
  return (
    <div>
      <div className={"displayRow " + css.addNewAddress}>
        <div className={"displayRow " + css.transparentBackground} />
        <div className={"displayColumn " + css.insideAddNewAddress}>
          <div className={css.closeArea}>
            <img
              alt="Close"
              className={"hoverThis " + css.closeBtn}
              onClick={closeAddAddress}
              src={Close}
            />
          </div>
          <div className={"displayColumn " + css.insideAddNewAddressForm}>
            <div className={css.addNewAddressText}>Add new address</div>
            <div className={"displayColumn " + css.newAddressInputForm}>
              <span className={css.inputLabel}>Save address as</span>
              <Input
                cls={css.newInputAddress}
                nm="save"
                onCg={nac}
                plcHldr="Rumah"
                val={na.save}
              />
              <div
                className="displayRow"
                style={{ justifyContent: "space-between" }}
              >
                <div className={"displayColumn " + css.gapBetweenInputRow}>
                  <span className={css.inputLabel}>Recipient's name</span>
                  <Input
                    cls={css.newInputAddress}
                    nm="name"
                    onCg={nac}
                    plcHldr="Nama"
                    val={na.name}
                  />
                </div>
                <div className={"displayColumn " + css.gapBetweenInputRow}>
                  <span className={css.inputLabel}>Phone number</span>
                  <Input
                    cls={css.newInputAddress}
                    nm="phone"
                    onCg={nac}
                    plcHldr="Nomor HP"
                    val={na.phone}
                  />
                </div>
              </div>
              <div
                className="displayRow"
                style={{ justifyContent: "space-between" }}
              >
                <div className={"displayColumn " + css.gapBetweenInputRow}>
                  <span className={css.inputLabel}>Address</span>
                  <Input
                    cls={css.newInputAddress}
                    nm="address"
                    onCg={nac}
                    plcHldr="Alamat"
                    val={na.address}
                  />
                </div>
                <div className={"displayColumn " + css.gapBetweenInputRow}>
                  <span className={css.inputLabel}>Postal code</span>
                  <Input
                    cls={css.newInputAddress}
                    nm="code"
                    onCg={nac}
                    plcHldr="Kode pos"
                    type="number"
                    val={na.code}
                  />
                </div>
              </div>
              <div className={"displayColumn " + css.gapBetweenInputRow}>
                <span className={css.inputLabel}>City or Subdistrict</span>
                <Input
                  cls={css.newInputAddress}
                  nm="city"
                  onCg={nac}
                  plcHldr="Kota / kecamatan"
                  val={na.city}
                />
              </div>
              <div className="displayRow">
                <input
                  className={css.inputCheckbox}
                  type="checkbox"
                  onChange={(e) => {
                    checkBox(e);
                  }}
                />
                <span className={css.makeItThePrimaryAddress}>
                  Make it the primary address
                </span>
              </div>
            </div>
            <div>
              <div className={"displayRow " + css.addNewAddressButtonArea}>
                <Button
                  btnClr="white"
                  cls={css.addressCancelButton}
                  func={removeExistAddress}
                  ftClr="#9B9B9B"
                  val="Clear"
                />
                <Button
                  btnClr="#273AC7"
                  cls={css.addressSaveButton}
                  ftClr="white"
                  val="Save"
                  func={() => {
                    updateAddress();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

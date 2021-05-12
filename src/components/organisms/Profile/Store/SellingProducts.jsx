import css from "./profileStore.module.css";
import { useState } from "react";
import axiosApiInstance from "../../../../helpers/axios";
import Swal from "sweetalert2";
// ATOMS
import { Button, Input } from "../../../atoms";
// IMAGES
import SellingProductDescription from "../../../images/SellingProductDescription.png";
import Left from "../../../images/left.png";
import Right from "../../../images/right.png";

export default function SellingProducts({
  pog,
  spp,
  cp,
  ipn,
  imgProduct1,
  imgProduct2,
  imgProduct3,
  imgProduct4,
  imgProduct5,
}) {
  const dummyPhotoArray = [pog[0], pog[1], pog[2], pog[3], pog[4]];
  const [photo, setPhoto] = useState(0);
  const [category, setCategory] = useState(null);
  const switchPhoto = (ops) => {
    if (ops === "-" && photo > 0) {
      setPhoto(photo - 1);
    } else if (ops === "+" && photo < 4) {
      setPhoto(photo + 1);
    }
  };
  const url = process.env.REACT_APP_API_URL;
  const [data, setData] = useState({
    title: "",
    price: "",
    stock: "",
    color: "",
    size: "",
    description: "",
  });

  const handleFormChange = (event) => {
    const dataNew = { ...data };
    dataNew[event.target.name] = event.target.value;
    setData(dataNew);
  };

  const handleChangeCategory = (params) => {
    setCategory(params);
  };

  const handleJual = () => {
    if (
      imgProduct1 === null ||
      imgProduct2 === null ||
      imgProduct3 === null ||
      imgProduct4 === null ||
      imgProduct5 === null
    ) {
      Swal.fire({
        title: "Error!",
        text: "Masukkan minimal 5 gambar product",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#273ac7",
      });
    } else if (
      data.price === "" ||
      data.stock === "" ||
      data.color === "" ||
      data.size === "" ||
      category === null
    ) {
      Swal.fire({
        title: "Error!",
        text: "Isi semua field",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#273ac7",
      });
    } else {
      const formData = new FormData();
      const arrColor = data.color.split(" ");
      const arrSize = data.size.split(" ");
      formData.append("title", data.title);
      formData.append("idCategory", category);
      formData.append("price", data.price);
      formData.append("conditions", cp === true ? "Baru" : "Bekas");
      formData.append("stock", data.stock);
      formData.append("size", JSON.stringify(arrSize));
      formData.append("color", JSON.stringify(arrColor));
      formData.append("description", data.description);
      formData.append("image", imgProduct1);
      formData.append("image", imgProduct2);
      formData.append("image", imgProduct3);
      formData.append("image", imgProduct4);
      formData.append("image", imgProduct5);
      axiosApiInstance
        .post(url + `/store`, formData)
        .then((res) => {
          Swal.fire({
            title: "Success!",
            text: "Product berhasil ditambahkan",
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#273ac7",
          }).then(() => {
            Swal.fire({
              icon: "info",
              title: "Info!",
              text: "Mengarahkan ke halaman profile",
              confirmButtonColor: "#273ac7",
            }).then(() => {
              window.location.reload();
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
    }
  };

  return (
    <div className={"displayColumn " + css.sellingProducts}>
      <div className={"displayColumn " + css.insideSellingProducts}>
        <span className={css.sellingProductsTitle}>Inventory</span>
        <div className={"displayColumn " + css.sellingProductsForm}>
          <span className={css.sellingProductsLabel}>Name of goods</span>
          <Input
            cls={css.sellingProductsInput}
            nm="title"
            onCg={handleFormChange}
            plcHldr="Masukkan nama barang"
            type="text"
          />
        </div>
      </div>
      <div className={"displayColumn " + css.insideSellingProducts}>
        <span className={css.sellingProductsTitle}>Item details</span>
        <div className={"displayColumn " + css.sellingProductsForm}>
          <div className={"displayColumn"}>
            <span className={css.sellingProductsLabel}>Unit price</span>
            <Input
              cls={css.sellingProductsInput}
              nm="price"
              onCg={handleFormChange}
              plcHldr="Masukkan harga barang"
              type="text"
            />
          </div>
          <div className={"displayColumn " + css.sellingProductsStock}>
            <span className={css.sellingProductsLabel}>Stock</span>
            <Input
              cls={css.sellingProductsInput}
              nm="stock"
              onCg={handleFormChange}
              plcHldr="Masukkan stok barang"
              type="text"
            />
          </div>
          <div
            className={"displayColumn " + css.sellingProductsStock}
            style={{ transform: "translateY(-30px)" }}
          >
            <span className={css.sellingProductsLabel}>Color</span>
            <Input
              cls={css.sellingProductsInput}
              nm="color"
              onCg={handleFormChange}
              plcHldr="Masukkan warna barang dalam bahasa inggris"
              type="text"
            />
            <small>
              Jika lebih dari satu warna, pisahkan dengan karakter spasi
            </small>
          </div>
          <div
            className={"displayColumn " + css.sellingProductsStock}
            style={{ transform: "translateY(-60px)" }}
          >
            <span className={css.sellingProductsLabel}>Size</span>
            <Input
              cls={css.sellingProductsInput}
              nm="size"
              onCg={handleFormChange}
              plcHldr="Masukkan size barang"
              type="text"
            />
            <small>
              Jika lebih dari satu size, pisahkan dengan karakter spasi
            </small>
            <small>XS, S, M... untuk category selain Shoes</small>
            <small>30, 31, 32... untuk category Shoes</small>
          </div>
          <div
            className={"displayColumn"}
            style={{ transform: "translateY(-60px)" }}
          >
            <span className={css.sellingProductsLabel}>Category</span>
            <div
              className={"displayRow " + css.myProfileLeftSideSetupSpaceMobile}
            >
              <div className="displayRow">
                <div
                  className={"hoverThis " + css.myProfileRadioButton}
                  onClick={() => handleChangeCategory(1)}
                >
                  <div
                    className={css.myProfileInsideRadioButton}
                    style={category === 1 ? { background: "#273AC7" } : null}
                  />
                </div>
                <span className={css.myProfileGender}>T-Shirt</span>
              </div>
              <div className="displayRow">
                <div
                  className={"hoverThis " + css.myProfileRadioButton}
                  onClick={() => handleChangeCategory(2)}
                >
                  <div
                    className={css.myProfileInsideRadioButton}
                    style={category === 2 ? { background: "#273AC7" } : null}
                  />
                </div>
                <span className={css.myProfileGender}>Jacket</span>
              </div>
            </div>
          </div>
          <div
            className={"displayColumn"}
            style={{ transform: "translateY(-50px)" }}
          >
            <div
              className={"displayRow " + css.myProfileLeftSideSetupSpaceMobile}
            >
              <div className="displayRow">
                <div
                  className={"hoverThis " + css.myProfileRadioButton}
                  onClick={() => handleChangeCategory(3)}
                >
                  <div
                    className={css.myProfileInsideRadioButton}
                    style={category === 3 ? { background: "#273AC7" } : null}
                  />
                </div>
                <span className={css.myProfileGender}>Pants</span>
              </div>
              <div className="displayRow">
                <div
                  className={"hoverThis " + css.myProfileRadioButton}
                  onClick={() => handleChangeCategory(4)}
                >
                  <div
                    className={css.myProfileInsideRadioButton}
                    style={category === 4 ? { background: "#273AC7" } : null}
                  />
                </div>
                <span className={css.myProfileGender}>Shoes</span>
              </div>
              <div className="displayRow">
                <div
                  className={"hoverThis " + css.myProfileRadioButton}
                  onClick={() => handleChangeCategory(5)}
                >
                  <div
                    className={css.myProfileInsideRadioButton}
                    style={category === 5 ? { background: "#273AC7" } : null}
                  />
                </div>
                <span className={css.myProfileGender}>Shorts</span>
              </div>
            </div>
          </div>
          <div
            className={"displayColumn mt-4"}
            style={{ transform: "translateY(-60px)" }}
          >
            <span className={css.sellingProductsLabel}>Condition</span>
            <div
              className={"displayRow " + css.myProfileLeftSideSetupSpaceMobile}
            >
              <div className="displayRow">
                <div
                  className={"hoverThis " + css.myProfileRadioButton}
                  onClick={() => {
                    ipn(true);
                  }}
                >
                  <div
                    className={css.myProfileInsideRadioButton}
                    style={cp === true ? { background: "#273AC7" } : null}
                  />
                </div>
                <span className={css.myProfileGender}>Baru</span>
              </div>
              <div className="displayRow">
                <div
                  className={"hoverThis " + css.myProfileRadioButton}
                  onClick={() => {
                    ipn(false);
                  }}
                >
                  <div
                    className={css.myProfileInsideRadioButton}
                    style={cp === false ? { background: "#273AC7" } : null}
                  />
                </div>
                <span className={css.myProfileGender}>Bekas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={"displayColumn " + css.insideSellingProducts}>
        <span className={css.sellingProductsTitle}>Photo of goods</span>
        <div className={"displayColumn " + css.sellingProductsForm}>
          <div className={"displayColumn " + css.uploadPhotoArea}>
            <div
              className="displayRow"
              style={{ justifyContent: "space-between" }}
            >
              <img
                alt="Product"
                className={"hoverThis " + css.mainPhoto}
                onClick={() => {
                  spp(0);
                }}
                src={dummyPhotoArray[0]}
              />
              <img
                alt="Product"
                className={"hoverThis " + css.otherPhoto}
                onClick={() => {
                  spp(1);
                }}
                src={dummyPhotoArray[1]}
              />
              <img
                alt="Product"
                className={"hoverThis " + css.otherPhoto}
                onClick={() => {
                  spp(2);
                }}
                src={dummyPhotoArray[2]}
              />
              <img
                alt="Product"
                className={"hoverThis " + css.otherPhoto}
                onClick={() => {
                  spp(3);
                }}
                src={dummyPhotoArray[3]}
              />
              <img
                alt="Product"
                className={"hoverThis " + css.otherPhoto}
                onClick={() => {
                  spp(4);
                }}
                src={dummyPhotoArray[4]}
              />
            </div>
            <span className={css.fotoUtama}>Foto utama</span>
            {/* <div className={css.uploadBtnArea}>
              <Button
                btnClr="white"
                cls={css.uploadPhotoBtn}
                ftClr="#9B9B9B"
                val="Upload photo"
              />
            </div> */}
          </div>
          <div className={"displayColumn " + css.uploadPhotoAreaMobile}>
            <div
              className="displayRow hover"
              style={{ justifyContent: "space-between", cursor: "pointer" }}
            >
              <img
                alt="Arrow"
                className={css.arrowSwitch}
                onClick={() => {
                  switchPhoto("-");
                }}
                src={Left}
                style={photo < 1 ? { opacity: "0.11" } : null}
              />
              <img
                alt="Product"
                className={photo === 0 ? css.mainPhoto : css.otherPhoto}
                onClick={() => {
                  spp(photo);
                }}
                src={dummyPhotoArray[photo]}
              />
              <img
                alt="Arrow"
                className={css.arrowSwitch}
                onClick={() => {
                  switchPhoto("+");
                }}
                src={Right}
                style={photo > 3 ? { opacity: "0.11" } : null}
              />
            </div>
            {photo === 0 ? (
              <span className={css.fotoUtama}>Foto utama</span>
            ) : null}
            {/* <Button
              btnClr="white"
              cls={css.uploadPhotoBtnMobile}
              ftClr="#9B9B9B"
              val="Upload photo"
            /> */}
          </div>
        </div>
      </div>
      <div className={"displayColumn " + css.insideSellingProducts}>
        <span className={css.sellingProductsTitle}>Description</span>
        <div className={"displayColumn " + css.sellingProductsFormDescription}>
          <img
            alt="Dummy Button"
            className={css.dummyBtn}
            src={SellingProductDescription}
          />
          <textarea
            className={css.descriptionTextarea}
            name="description"
            onChange={handleFormChange}
          />
        </div>
      </div>
      <Button
        btnClr="#273AC7"
        cls={css.sellBtn}
        ftClr="white"
        val="Jual"
        func={handleJual}
      />
    </div>
  );
}

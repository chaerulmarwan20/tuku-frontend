import css from "./profileStore.module.css";
import React, { useState } from "react";
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
  // FUNGSIONAL - AVAILABLE COLOR (BUTTON & CAROUSEL)
  const colorArray = [
    "#FFB6C1",
    "#F08080",
    "#CD5C5C",
    "#B0E0E6",
    "#87CEEB",
    "#4682B4",
    "#000000",
    "#FFFFFF",
    "#FFFACD",
    "#F0E68C",
    "#FFD700",
    "#90EE90",
    "#3CB371",
    "#2E8B57",
  ];
  const [colorStartPoint, setStartingColor] = useState(0);
  const [colorEndPoint, setEndingColor] = useState(6);
  const colorLeftArrow = () => {
    if (colorStartPoint > 0) {
      setStartingColor(colorStartPoint - 1);
      setEndingColor(colorEndPoint - 1);
    }
  };
  const colorRightArrow = () => {
    if (colorEndPoint < colorArray.length) {
      setStartingColor(colorStartPoint + 1);
      setEndingColor(colorEndPoint + 1);
    }
  };
  // FUNGSIONAL - AVAILABLE SIZE (BUTTON & CAROUSEL)
  const sizeAlphabetArray = ["XS", "S", "M", "L", "XL"];
  const sizeNumericArray = [
    27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
    46, 47, 48, 49, 50, 51, 52,
  ];
  // ARROW FUNCTION
  const [sizeStartPoint, setStartingSize] = useState(0);
  const [sizeEndPoint, setEndingSize] = useState(5);
  const sizeLeftArrow = () => {
    if (sizeStartPoint > 0) {
      setStartingSize(sizeStartPoint - 1);
      setEndingSize(sizeEndPoint - 1);
    }
  };
  const sizeRightArrow = () => {
    if (sizeEndPoint < sizeNumericArray.length) {
      setStartingSize(sizeStartPoint + 1);
      setEndingSize(sizeEndPoint + 1);
    }
  };
  // BASE CONF - SELLING PRODUCTS
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
    selectSize([]);
  };
  // FUNGSIONAL - ONCLICK ADD/REMOVE COLOR & SIZE FROM ARRAY
  const [selectedColor, selectColor] = useState([]);
  const [selectedSize, selectSize] = useState([]);
  const clickColor = (color) => {
    const checkColor = selectedColor.includes(color);
    // KALO WARNA UDAH ADA, DI HAPUS JADI GAK ADA
    if(checkColor === true) { 
      const filterColor = selectedColor.filter(e => e !== color);
      selectColor(filterColor);
    }
    // TAPI KALO WARNA BELOM ADA, TAMBAHIN AJA LANGSUNG
    else if(checkColor === false) { 
      selectColor(selectedColor => [...selectedColor, color]);
    }
  }
  const clickSize = (size) => {
    const checkSize = selectedSize.includes(size);
    // KALO UKURAN UDAH ADA, DI HAPUS JADI GAK ADA
    if(checkSize === true) { 
      const filterSize = selectedSize.filter(e => e !== size);
      selectSize(filterSize);
    }
    // TAPI KALO UKURAN BELOM ADA, TAMBAHIN AJA LANGSUNG
    else if(checkSize === false) { 
      selectSize(selectedSize => [...selectedSize, size]);
    }
  }
  // FUNGSIONAL - KALO TOMBOL JUAL DI PENCET?
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
        text: "Masukkan minimal 5 gambar produk",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#273ac7",
      });
    } else if (
      data.price === "" ||
      data.stock === "" ||
      selectedColor.length === 0 ||
      selectedSize.length === 0 ||
      category === null
    ) {
      Swal.fire({
        title: "Error!",
        text: "Semua data dibutuhkan!",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#273ac7",
      });
    } else {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("idCategory", category);
      formData.append("price", data.price);
      formData.append("conditions", cp === true ? "Baru" : "Bekas");
      formData.append("stock", data.stock);
      formData.append("size", JSON.stringify(selectedSize));
      formData.append("color", JSON.stringify(selectedColor));
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
            text: "Produk berhasil ditambahkan",
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#273ac7",
          }).then(() => {
            Swal.fire({
              icon: "info",
              title: "Info!",
              text: "Mengarahkan ke halaman profil",
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
          <div className={"displayColumn " + css.sellingProductsGap}>
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
            className={"displayColumn " + css.sellingProductsGap}
          >
            <span className={css.sellingProductsLabel}>Color</span>
            <div
              className={
                "displayRow " + css.filterOption + " " + css.filterColorOption
              }
            >
              {colorArray.length < 8 ? null : colorStartPoint === 0 ? (
                <img
                  className={css.filterArrowLeft}
                  src={Left}
                  style={{ opacity: "0.11" }}
                  alt="Left"
                />
              ) : (
                <img
                  className={"hoverThis " + css.filterArrowLeft}
                  onClick={() => {
                    colorLeftArrow();
                  }}
                  src={Left}
                  alt="Left"
                />
              )}
              {colorArray.slice(colorStartPoint, colorEndPoint).map((item) => (
                <div
                  className={
                    selectedColor.includes(item) === true ? css.colorBorderActive : css.colorBtnBorder
                  }
                  color={item}
                  onClick={ () => { clickColor(item) } }
                >
                  <Button
                    btnClr={item}
                    cls={
                      item === "#FFFFFF"
                        ? "hoverThis " + css.whiteColorBtn
                        : "hoverThis " + css.colorBtn
                    }
                  />
                </div>
              ))}
              {colorArray.length < 8 ? null : colorStartPoint === 8 ? (
                <img
                  className={css.filterArrowRight}
                  src={Right}
                  style={{ opacity: "0.11" }}
                  alt="Right"
                />
              ) : (
                <img
                  className={"hoverThis " + css.filterArrowRight}
                  onClick={() => {
                    colorRightArrow();
                  }}
                  src={Right}
                  alt="Right"
                />
              )}
            </div>
          </div>
          <div
            className={"displayColumn " + css.sellingProductsGap}
          >
            <span className={css.sellingProductsLabel}>Size</span>
            <div className={"displayRow " + css.filterOption}>
              {category === 4 ? (
                <div className={"displayRow"}>
                  {sizeNumericArray.length < 5 ? null : sizeStartPoint === 0 ? (
                    <img
                      className={css.filterArrowLeft}
                      src={Left}
                      style={{ opacity: "0.11" }}
                      alt="Left"
                    />
                  ) : (
                    <img
                      className={"hoverThis " + css.filterArrowLeft}
                      onClick={() => {
                        sizeLeftArrow();
                      }}
                      src={Left}
                      alt="Left"
                    />
                  )}
                  {sizeNumericArray.slice(sizeStartPoint, sizeEndPoint).map((item) => (
                    <Button
                      cls={
                        selectedSize.includes(item) === true
                          ? "hoverThis " + css.sizeBtn + " " + css.selectSize
                          : "hoverThis " + css.sizeBtn + " " + css.unselectSize
                      }
                      func={ () => { clickSize(item) } }
                      val={item}
                    />
                  ))}
                  {sizeNumericArray.length < 5 ? null : sizeStartPoint === 21 ? (
                    <img
                      className={css.filterArrowRight}
                      src={Right}
                      style={{ opacity: "0.11" }}
                      alt="Right"
                    />
                  ) : (
                    <img
                      className={"hoverThis " + css.filterArrowRight}
                      onClick={() => {
                        sizeRightArrow();
                      }}
                      src={Right}
                      alt="Right"
                    />
                  )}
                </div>
              ) : (
                sizeAlphabetArray.map((item) => (
                  <Button
                    cls={
                      selectedSize.includes(item) === true
                        ? "hoverThis " + css.sizeBtn + " " + css.selectSize
                        : "hoverThis " + css.sizeBtn + " " + css.unselectSize
                    }
                    func={ () => { clickSize(item) } }
                    val={item}
                  />
                ))
              )}
            </div>
          </div>
          <div
            className={"displayColumn "  + css.sellingProductsGap}
          >
            <span className={css.sellingProductsLabel}>Category</span>
            <div className="dropdown">
              <button className={"btn btn-secondary displayRow dropdown-toggle " + css.sellingProductsCategoryBtn} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {
                category === 1 ? "T-Shirt" 
                :
                category === 2 ? "Jacket" 
                :
                category === 3 ? "Pants" 
                :
                category === 4 ? "Shoes" 
                :
                category === 5 ? "Shorts" 
                :
                "Select"
                }
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <span className="dropdown-item hoverThis" onClick={ () => { handleChangeCategory(1) } }>T-Shirt</span>
                <span className="dropdown-item hoverThis" onClick={ () => { handleChangeCategory(2) } }>Jacket</span>
                <span className="dropdown-item hoverThis" onClick={ () => { handleChangeCategory(3) } }>Pants</span>
                <span className="dropdown-item hoverThis" onClick={ () => { handleChangeCategory(4) } }>Shoes</span>
                <span className="dropdown-item hoverThis" onClick={ () => { handleChangeCategory(5) } }>Shorts</span>
              </div>
            </div>
          </div>
          <div
            className={"displayColumn mt-4 " + css.sellingProductsGap + " " + css.sellingProductsCondition}
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
      <div>
          <Button
            btnClr="#273AC7"
            cls={css.sellBtn}
            ftClr="white"
            val="Jual"
            func={handleJual}
          />
      </div>
    </div>
  );
}

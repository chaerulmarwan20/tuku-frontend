import css from "./style.module.css";
import { useState } from "react";
import Swal from "sweetalert2";
// IMAGES
import Close from "../../images/close.png";
// ATOMS
import { Button } from "../../atoms";
// MOLECULES
import { Colors, Sizes, Categories, Brands } from "../../molecules";

export default function Filter({ func }) {
  // COLORS
  const [color, selectColor] = useState(null);
  // SIZES
  const [alphabetSize, selectAlphabetSize] = useState(null);
  const [numericSize, selectNumericSize] = useState(null);
  // CATEGORIES
  const [category, selectCategory] = useState(null);
  // BRANDS
  const [brand, selectBrand] = useState(null);
  // FUNCS
  const discard = () => {
    selectColor(null);
    selectAlphabetSize(null);
    selectNumericSize(null);
    selectCategory(null);
    selectBrand(null);
  };
  const apply = () => {
    if (
      (category === "Sandals" && numericSize === null) ||
      (category === "Shoes" && numericSize === null)
    ) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Jika ingin mencari sendal dan sepatu, harap masukkan juga ukurannya!",
        confirmButtonColor: "#273ac7",
      });
    } else if (
      category !== "Sandals" &&
      category !== "Shoes" &&
      category !== null &&
      alphabetSize === null
    ) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Jika ingin mencari pakaian atau celana dan semacamnya, harap masukkan juga ukurannya!",
        confirmButtonColor: "#273ac7",
      });
    } else if (
      color === null &&
      alphabetSize === null &&
      numericSize === null &&
      category === null &&
      brand === null
    ) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Setidaknya minimal harus ada satu pilihan untuk fitur filter pencarian!",
        confirmButtonColor: "#273ac7",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Berhasil menambahkan filter pencarian yang dipilih!",
        confirmButtonColor: "#273ac7",
      }).then(() => {
        localStorage.removeItem("color");
        localStorage.removeItem("alphabetSize");
        localStorage.removeItem("numericSize");
        localStorage.removeItem("category");
        localStorage.removeItem("brand");
        color !== null && localStorage.setItem("color", color);
        alphabetSize !== null &&
          localStorage.setItem("alphabetSize", alphabetSize);
        numericSize !== null &&
          localStorage.setItem("numericSize", numericSize);
        category !== null && localStorage.setItem("category", category);
        brand !== null && localStorage.setItem("brand", brand);
        func();
      });
    }
  };
  return (
    <div>
      <div className={"displayRow " + css.filter}>
        <div className={"displayRow " + css.transparentBackground} />
        <div className={"displayColumn " + css.insideFilter}>
          <div className={"displayRow " + css.filterTop}>
            <img
              alt="Filter"
              className={"hoverThis " + css.filterClose}
              onClick={func}
              src={Close}
            />
            <span className={css.filterText}>Filter</span>
          </div>
          <div className={"displayColumn " + css.filterArea}>
            <Colors
              col={[
                color,
                (e) => {
                  selectColor(
                    e.target.parentElement.parentElement.getAttribute("color")
                  );
                },
              ]}
            />
            <Sizes
              alph={[
                alphabetSize,
                (e) => {
                  selectAlphabetSize(e.target.innerText);
                },
              ]}
              cat={category}
              num={[
                numericSize,
                (e) => {
                  selectNumericSize(e.target.innerText);
                },
              ]}
            />
            <Categories
              cat={category}
              catState={(e) => {
                selectCategory(e.target.innerText);
              }}
            />
            <Brands
              brd={brand}
              brdState={(e) => {
                selectBrand(e.target.innerText);
              }}
            />
          </div>
          <div className={"displayRow " + css.filterBottom}>
            <Button
              btnClr="white"
              cls={css.discardBtn}
              func={() => {
                discard();
              }}
              val="Discard"
            />
            <Button
              btnClr="#273AC7"
              cls={css.applyBtn}
              func={() => {
                apply();
              }}
              ftClr="white"
              val="Apply"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import css from "./style.module.css";
import { useState } from "react";
// ATOMS
import Button from "../../../atoms/Button";
// IMAGES
import Left from "../../../images/left.png";
import Right from "../../../images/right.png";

export default function Colors({ col }) {
  // COLOR ARRAY
  const colorArray = [
    "#FFB6C1",
    "#F08080",
    "#CD5C5C",
    "#B0E0E6",
    "#87CEEB",
    "#4682B4",
    "black",
    "white",
    "#FFFACD",
    "#F0E68C",
    "#FFD700",
    "#90EE90",
    "#3CB371",
    "#2E8B57",
  ];
  // STATE HOOKS
  const [startNum, setStart] = useState(0);
  const [endNum, setEnd] = useState(7);
  // ARROW FUNCTION
  const leftArrow = () => {
    if (startNum > 0) {
      setStart(startNum - 1);
      setEnd(endNum - 1);
    }
  };
  const rightArrow = () => {
    if (endNum < colorArray.length) {
      setStart(startNum + 1);
      setEnd(endNum + 1);
    }
  };
  return (
    <div className={"displayColumn " + css.paddingFilter}>
      <div className={css.filterCategoryText}>Colors</div>
      <div
        className={
          "displayRow " + css.filterOption + " " + css.filterColorOption
        }
      >
        {colorArray.length < 8 ? null : startNum === 0 ? (
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
              leftArrow();
            }}
            src={Left}
            alt="Left"
          />
        )}
        {colorArray.slice(startNum, endNum).map((item) => (
          <div
            className={
              col[0] === item ? css.colorBorderActive : css.colorBtnBorder
            }
            color={item}
            onClick={col[1]}
          >
            <Button
              btnClr={item}
              cls={
                item === "white"
                  ? "hoverThis " + css.whiteColorBtn
                  : "hoverThis " + css.colorBtn
              }
            />
          </div>
        ))}
        {colorArray.length < 8 ? null : startNum === 7 ? (
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
              rightArrow();
            }}
            src={Right}
            alt="Right"
          />
        )}
      </div>
    </div>
  );
}

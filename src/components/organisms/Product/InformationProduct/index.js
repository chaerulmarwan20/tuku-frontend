import style from "./information.module.css";
import { FaStar } from "react-icons/fa";

function InformationProduct({ product }) {
  return (
    <div>
      <div className="container">
        <p className={style["title-information"]}>Product Information </p>
        <p className={style["condition-prod"]}>Condition</p>
        <p className={style["condition-value"]}>{product.conditions}</p>

        <p className={style["description-title"]}>Description</p>

        <p className={style["description-prod"]}>{product.description} </p>

        <p className={style["review-title"]}>Product Review</p>
        <p className={style["rating-value"]}>{product.rating}.0 /5.0</p>
        {Array.from(Array(product.rating).keys()).map((item, index) => {
          return (
            <FaStar
              className={style["star"]}
              size={35}
              color={"#FFBA49"}
              key={index}
            />
          );
        })}
        <div className={style["line-width"]}></div>
      </div>
    </div>
  );
}

export default InformationProduct;

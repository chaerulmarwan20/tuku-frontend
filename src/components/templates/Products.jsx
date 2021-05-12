import css from "./style.module.css";
import { useState } from "react";
// ORGANISMS
import Products from "../organisms/Product/Product Carousel";
import InfromationProduct from "../organisms/Product/InformationProduct";
import OtherProduct from "../organisms/Product/OtherProducts";
import { Navbar, Filter } from "../organisms";

export default function Home() {
  const [filter, showFilter] = useState(false);
  return (
    <div style={{ background: "#F9F9F9" }}>
      <Navbar
        func={() => {
          showFilter(true);
        }}
      />
      {filter === true ? (
        <Filter
          func={() => {
            showFilter(false);
          }}
        />
      ) : null}
      <div className={css.homeTemplates}>
        <Products />
        <InfromationProduct />
        <OtherProduct />
      </div>
    </div>
  );
}

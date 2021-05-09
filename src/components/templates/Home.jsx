import css from "./style.module.css";
import { useState } from "react";
// ORGANISMS
import {
  Navbar,
  Filter,
  NewHome,
  PopularHome,
  CarouselOne,
} from "../organisms";

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
        <CarouselOne />
        <NewHome />
        <PopularHome />
      </div>
    </div>
  );
}

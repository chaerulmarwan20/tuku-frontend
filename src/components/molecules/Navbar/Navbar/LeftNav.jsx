import { useHistory } from "react-router";
import css from "./style.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
// IMAGES
import Logo from "../../../images/tukuLogo.png";
import Search from "../../../images/Search.png";
import Filter from "../../../images/filter.png";

export default function LeftNav({ func }) {
  const history = useHistory();
  const [searchResult, saveSearchResult] = useState("Empty");
  const [keyword, setKeyword] = useState("");
  // FUNCTION
  const searchInputChange = (e) => {
    setKeyword(e.target.value);
  };
  const selectSearch = (id) => {
    history.push("/product/" + id);
    saveSearchResult("Empty");
  };
  // USE EFFECT
  useEffect(() => {
    if (keyword === "") {
      saveSearchResult("Empty");
    } else {
      let axiosURL =
        process.env.REACT_APP_API_URL + "/product?keyword=" + keyword;
      if (localStorage.getItem("color") !== null) {
        const convertHashtagColor = localStorage.getItem("color").substring(1);
        axiosURL += "&color=%23" + convertHashtagColor;
      }
      localStorage.getItem("numericSize") !== null &&
        (axiosURL += "&size=" + localStorage.getItem("numericSize"));
      localStorage.getItem("category") !== null &&
        (axiosURL += "&category=" + localStorage.getItem("category"));
      localStorage.getItem("brand") !== null &&
        (axiosURL += "&brand=" + localStorage.getItem("brand"));
      console.log(axiosURL);
      axios
        .get(axiosURL)
        .then((res) => {
          saveSearchResult(res.data.data);
        })
        .catch((err) => {
          saveSearchResult("Not Found");
        });
    }
  }, [keyword]);
  return (
    <div className={"displayRow " + css.leftNav}>
      <img
        alt="Logo"
        className={"hoverThis " + css.logo}
        onClick={() => {
          history.push("/");
        }}
        src={Logo}
      />
      <div className={css.navbarLeftSideNoCenter}>
        <div className={"displayColumn " + css.searchBorder}>
          <div className={"displayRow " + css.searchInputArea}>
            <input
              className={css.inputSearch}
              onChange={(e) => {
                searchInputChange(e);
              }}
              placeholder="Search ..."
              value={keyword}
            />
            <img className={css.searchLogo} src={Search} alt="Search" />
          </div>
          {searchResult === "Empty" ? null : searchResult === "Not Found" ? (
            <div
              className={"displayRow " + css.searchResult}
              style={{ justifyContent: "center" }}
            >
              <span className={css.productCategory}>
                Can't found any products you wanted
              </span>
            </div>
          ) : (
            searchResult.map((item) => {
              return (
                <div
                  className={"displayRow hoverThis " + css.searchResult}
                  onClick={() => {
                    selectSearch(item.id);
                  }}
                >
                  <img
                    alt="Product"
                    className={css.productImage}
                    src={process.env.REACT_APP_API_IMG + item.image}
                  />
                  <div className="displayColumn">
                    <span className={css.productTitle}>{item.title}</span>
                    <span className={css.productCategory}>{item.category}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <img
          className={"hoverThis " + css.filterBtn}
          onClick={func}
          src={Filter}
          alt="Filter"
        />
      </div>
    </div>
  );
}

import css from "./style.module.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
// IMAGES
import Filter from "../../../images/filter.png";
import Cart from "../../../images/cart.png";
// ATOMS
import { Button } from "../../../atoms";

export default function MobileNav({ filter, func, au, ud }) {
  const history = useHistory();
  const [searchResult, saveSearchResult] = useState("Empty");
  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState(null);
  // FUNCTION
  const searchInputChange = (e) => {
    setKeyword(e.target.value);
  };
  const selectSearch = (id) => {
    history.push("/product/" + id);
    saveSearchResult("Empty");
  };
  useEffect(() => {
    if (ud !== null) {
      setRole(ud.role);
    }
  }, [ud]);
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
    <div>
      <div style={{ marginBottom: "25vw", width: "100%" }}>
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <div className={"displayColumn " + css.searchMobile}>
            <input
              className={css.searchMobileInput}
              onChange={(e) => {
                searchInputChange(e);
              }}
              placeholder="Search ..."
              required
              type="text"
            />
            {searchResult === "Empty" ? null : searchResult === "Not Found" ? (
              <div
                className={"displayRow " + css.searchResult}
                style={{ justifyContent: "center" }}
              >
                <span className={css.productCategory}>Product not found!</span>
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
                      <span className={css.productTitle}>
                        {item.title.length > 8
                          ? item.title.slice(0, 8) + " ..."
                          : item.title}
                      </span>
                      <span className={css.productCategory}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="displayRow" style={{ justifyContent: "space-between" }}>
          {role !== null && role !== 1 && (
            <div
              onClick={() => {
                history.push("/bag");
              }}
              style={{
                border: "0.60vw solid #9B9B9B",
                borderRadius: "3.8vw",
                padding: "2.77vw 3.77vw",
              }}
            >
              <img
                alt="Cart"
                src={Cart}
                style={{ height: "6vw", width: "6vw" }}
              />
            </div>
          )}
          <img
            alt="Filter"
            className={css.filterBtnMobile}
            onClick={filter}
            src={Filter}
          />
        </div>
      </div>
      {ud === null ? (
        <div className="displayRow" style={{ justifyContent: "space-between" }}>
          <div
            onClick={() => {
              history.push("/login");
            }}
          >
            <Button
              btnClr="#273AC7"
              cls={css.authBtnMobileLogin}
              ftClr="white"
              val="Login"
            />
          </div>
          <div
            onClick={() => {
              history.push("/register");
            }}
          >
            <Button
              btnClr="white"
              cls={css.authBtnMobileRegister}
              ftClr="#9B9B9B"
              val="Register"
            />
          </div>
        </div>
      ) : (
        <div className={css.userDropdownWrapper}>
          <div className="displayRow">
            <img
              className={"hoverThis " + css.profileImage}
              src={
                au === undefined ? process.env.REACT_APP_API_IMG + ud.image : au
              }
              alt="Profile"
            />
            <div className={css.userProfileNameAndPhone}>
              <p className={css.userProfileName}>{ud.name}</p>
              <p className={css.userProfilePhone}>{ud.phoneNumber}</p>
            </div>
          </div>
          <div className={"displayRow " + css.userBtnArea}>
            <Button
              cls={"hoverThis " + css.settingsBtn}
              func={() => {
                history.push("/profile");
              }}
              val="Settings"
            />
            <Button
              cls={"hoverThis " + css.logoutBtn}
              func={func}
              val="Logout"
            />
          </div>
        </div>
      )}
    </div>
  );
}

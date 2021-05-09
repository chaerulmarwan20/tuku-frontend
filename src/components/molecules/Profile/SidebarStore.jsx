import css from "./profile.module.css";
import { useState } from "react";
// IMAGES
import Store from "../../images/SidebarStore.png";
import Product from "../../images/SidebarProduct.png";
import Order from "../../images/SidebarOrder.png";
import Top from "../../images/Top.png";
import Bottom from "../../images/Bottom.png";

export default function SidebarStore({ ms, sm }) {
  // SET-UP STATE
  const [store, openStore] = useState(true);
  const [product, openProduct] = useState(false);
  const [order, openOrder] = useState(false);
  return (
    <div className={"displayColumn " + css.sidebarStore}>
      {/* STORE */}
      <div
        className={"hoverThis displayRow " + css.sidebarStoreButton}
        onClick={() => {
          openStore(!store);
        }}
      >
        <img
          alt="Store"
          className={css.sidebarButtonLogo}
          src={Store}
          style={store === true ? { opacity: "0.5" } : null}
        />
        <div
          className="displayRow"
          style={{ justifyContent: "space-between", width: "100%" }}
        >
          <span
            className={css.sidebarButtonText}
            style={
              store === true ? { color: "black", fontWeight: "bold" } : null
            }
          >
            Store
          </span>
          <img
            className={css.sidebarStoreMenuArrowButton}
            src={store === true ? Top : Bottom}
            alt="Store"
          />
        </div>
      </div>
      <div
        className={"displayColumn " + css.sidebarStoreMenu}
        style={store === false ? { display: "none" } : null}
      >
        <span
          className={css.sidebarStoreMenuButton}
          name="Store Profile"
          onClick={sm}
          style={ms === "Store Profile" ? { color: "black" } : null}
        >
          Store profile
        </span>
      </div>
      {/* PRODUCT */}
      <div
        className={"hoverThis displayRow " + css.sidebarStoreButton}
        name="Product"
        onClick={() => {
          openProduct(!product);
        }}
      >
        <img
          alt="Product"
          className={css.sidebarButtonLogo}
          src={Product}
          name="Product"
          style={product === true ? { opacity: "0.5" } : null}
        />
        <div
          className="displayRow"
          name="Product"
          style={{ justifyContent: "space-between", width: "100%" }}
        >
          <span
            className={css.sidebarButtonText}
            name="Product"
            style={
              product === true ? { color: "black", fontWeight: "bold" } : null
            }
          >
            Product
          </span>
          <img
            className={css.sidebarStoreMenuArrowButton}
            name="Product"
            src={product === true ? Top : Bottom}
            alt="Product"
          />
        </div>
      </div>
      <div
        className={"displayColumn " + css.sidebarStoreMenu}
        style={product === false ? { display: "none" } : null}
      >
        <span
          className={css.sidebarStoreMenuButton}
          name="My Products"
          onClick={sm}
          style={ms === "My Products" ? { color: "black" } : null}
        >
          My products
        </span>
        <span
          className={css.sidebarStoreMenuButton}
          name="Selling Products"
          onClick={sm}
          style={ms === "Selling Products" ? { color: "black" } : null}
        >
          Selling products
        </span>
      </div>
      {/* ORDER */}
      <div
        className={"hoverThis displayRow " + css.sidebarStoreButton}
        onClick={() => {
          openOrder(!order);
        }}
      >
        <img
          alt="Order"
          className={css.sidebarButtonLogo}
          src={Order}
          style={order === true ? { opacity: "0.5" } : null}
        />
        <div
          className="displayRow"
          style={{ justifyContent: "space-between", width: "100%" }}
        >
          <span
            className={css.sidebarButtonText}
            style={
              order === true ? { color: "black", fontWeight: "bold" } : null
            }
          >
            Order
          </span>
          <img
            className={css.sidebarStoreMenuArrowButton}
            src={order === true ? Top : Bottom}
            alt="Order"
          />
        </div>
      </div>
      <div
        className={"displayColumn " + css.sidebarStoreMenu}
        style={order === false ? { display: "none" } : null}
      >
        <span
          className={css.sidebarStoreMenuButton}
          name="My Order Store"
          onClick={sm}
          style={ms === "My Order Store" ? { color: "black" } : null}
        >
          My order
        </span>
      </div>
    </div>
  );
}

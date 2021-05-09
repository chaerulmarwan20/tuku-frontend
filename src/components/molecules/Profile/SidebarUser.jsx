import css from "./profile.module.css";
// IMAGES
import Account from "../../images/SidebarAccount.png";
import Location from "../../images/SidebarLocation.png";
import MyOrder from "../../images/SidebarMyOrder.png";

export default function SidebarUser({ ms, sm }) {
  return (
    <div className={"displayColumn " + css.sidebarUser}>
      <div
        className={"hoverThis displayRow " + css.sidebarUserButton}
        name="My Account"
        onClick={sm}
      >
        <img
          alt="My Account"
          className={css.sidebarButtonLogo}
          name="My Account"
          src={Account}
          style={ms === "My Account" ? { opacity: "0.5" } : null}
        />
        <span
          className={css.sidebarButtonText}
          name="My Account"
          style={
            ms === "My Account" ? { color: "black", fontWeight: "bold" } : null
          }
        >
          My Account
        </span>
      </div>
      <div
        className={"hoverThis displayRow " + css.sidebarUserButton}
        name="Shipping Address"
        onClick={sm}
      >
        <img
          alt="Shipping Address"
          className={css.sidebarButtonLogo}
          name="Shipping Address"
          src={Location}
          style={ms === "Shipping Address" ? { opacity: "0.5" } : null}
        />
        <span
          className={css.sidebarButtonText}
          name="Shipping Address"
          style={
            ms === "Shipping Address"
              ? { color: "black", fontWeight: "bold" }
              : null
          }
        >
          Shipping Address
        </span>
      </div>
      <div
        className={"hoverThis displayRow " + css.sidebarUserButton}
        name="My Order User"
        onClick={sm}
      >
        <img
          alt="My Order User"
          className={css.sidebarButtonLogo}
          name="My Order User"
          src={MyOrder}
          style={ms === "My Order User" ? { opacity: "0.5" } : null}
        />
        <span
          className={css.sidebarButtonText}
          name="My Order User"
          style={
            ms === "My Order User"
              ? { color: "black", fontWeight: "bold" }
              : null
          }
        >
          My Order
        </span>
      </div>
    </div>
  );
}

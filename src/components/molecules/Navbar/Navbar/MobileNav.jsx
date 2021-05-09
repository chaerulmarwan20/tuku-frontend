import css from "./style.module.css";
import { useHistory } from 'react-router'
// IMAGES
import Search from "../../../images/Search.png";
import Filter from '../../../images/filter.png';
// ATOMS
import { Button } from "../../../atoms";

export default function MobileNav({ filter, func, au, ud }) {
  const history = useHistory()
  return (
    <div className="displayColumn">
      <div
        className="displayRow"
        style={{
          justifyContent: "space-between",
          marginBottom: "36px",
          width: "100%",
        }}
      >
        <div className={"displayRow " + css.searchMobile}>
          <input
            className={css.searchMobileInput}
            placeholder="Search ..."
            required
            type="text"
          />
          <img
            src={Search}
            style={{ height: "24px", paddingLeft: "24px", width: "24px" }}
            alt="Search"
          />
        </div>
        <img alt="Filter" onClick={filter} src={Filter} style={{height: "50px", width: "50px"}}/>
      </div>
      {
      ud === null ?
      <div className="displayRow" style={{ justifyContent: "space-between" }}>
        <div onClick={ () => { history.push("/login"); } }>
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
      :
      <div className={css.userDropdownWrapper}>
        <div className="displayRow">
          <img className={"hoverThis " + css.profileImage} src={au === undefined ? process.env.REACT_APP_API_IMG + ud.image : au}/>
          <div className={css.userProfileNameAndPhone}>
              <p className={css.userProfileName}>{ud.name}</p>
              <p className={css.userProfilePhone}>{ud.phoneNumber}</p>
          </div>
        </div>
        <div className={"displayRow " + css.userBtnArea}>
          <Button cls={"hoverThis " + css.settingsBtn} func={ () => { history.push("/profile") } } val="Settings"/>
          <Button cls={"hoverThis " + css.logoutBtn} func={func} val="Logout"/>
        </div>
      </div>
      }
    </div>
  );
}

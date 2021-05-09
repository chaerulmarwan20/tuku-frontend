import css from "./style.module.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
// IMAGES
import NavBtn from "../../images/navMobile.png";
// MOLECULES
import { LeftNav, RightNav, MobileNav } from "../../molecules";

export default function Navbar({ func, au }) {
  const history = useHistory();
  const [navMobile, showNavMobile] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    localStorage.removeItem("color");
    localStorage.removeItem("alphabetSize");
    localStorage.removeItem("numericSize");
    localStorage.removeItem("category");
    localStorage.removeItem("brand");
    axios
      .get(process.env.REACT_APP_API_URL + "/users/find-one", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setUserData(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  const logout = () => {
    Swal.fire({
      icon: "success",
      title: "Sukses!",
      text: "Logout berhasil, mengarahkan kembali ke halaman login ~",
      confirmButtonColor: "#273ac7",
    }).then(() => {
      localStorage.clear();
      history.push("/login");
    });
  };
  return (
    <div className={css.navbarCSS}>
      <div className={"displayRow " + css.navbarTop}>
        <LeftNav func={func} />
        <RightNav
          func={() => {
            logout();
          }}
          au={au}
          ud={userData}
        />
        <img
          className={css.navBtn}
          onClick={() => showNavMobile(!navMobile)}
          src={NavBtn}
          alt="Nav"
        />
      </div>
      <div
        className={"displayColumn " + css.navbarBottom}
        style={navMobile === false ? { display: "none" } : null}
      >
        <MobileNav
          filter={func}
          func={() => {
            logout();
          }}
          au={au}
          ud={userData}
        />
      </div>
    </div>
  );
}

import "./style.css";
import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
// ATOMS
import { Profile } from "../../components/templates";
// IMAGES
import Default from "../../components/images/PhotoOfGoods.png";

export default function ProfilePage() {
  // SET-UP STATE
  const [storeData, setStoreData] = useState(null);
  const [storeImage, setStoreImage] = useState(null);
  const [imgProduct1, setImgProduct1] = useState(null);
  const [imgProduct2, setImgProduct2] = useState(null);
  const [imgProduct3, setImgProduct3] = useState(null);
  const [imgProduct4, setImgProduct4] = useState(null);
  const [imgProduct5, setImgProduct5] = useState(null);
  const [imageStore, setImageStore] = useState(null);
  const [userData, setUserData] = useState({ name: "Anonymous" });
  const [menuSelected, selectMenu] = useState(null);
  const [myOrderUserSelected, selectMyOrderUser] = useState("All items");
  const [myOrderStoreSelected, selectMyOrderStore] = useState("All items");
  const [myProductMenuSelected, selectMyProductMenu] = useState("All items");
  const [checkProduct, isProductNew] = useState(true);
  const [newAddress, addNewAddress] = useState({
    type: null,
    name: null,
    phoneNumber: null,
    address: null,
    postalCode: null,
    city: null,
    isPrimary: false,
  });
  const [avatarUser, setUpdateImage] = useState(
    "https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif"
  );
  const [dataImage, setdataImage] = useState();
  // FUNCTIONS
  const userDataChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const newAddressChange = (e) => {
    addNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };
  // PHOTO OF GOODS
  const [mainPhoto, setMain] = useState(Default);
  const [secondPhoto, setSecond] = useState(Default);
  const [thirdPhoto, setThird] = useState(Default);
  const [fourthPhoto, setFourth] = useState(Default);
  const [fifthPhoto, setFifth] = useState(Default);
  const [status, setStatus] = useState(false);

  const setProductPhoto = (num) => {
    Swal.fire({
      icon: "info",
      title: "Mengubah avatar",
      text: "Silahkan pilih sebuah gambar dari komputer-mu untuk dijadikan gambar produk jualan kamu :",
      input: "file",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
      confirmButtonText: "Upload",
      showCancelButton: true,
      closeOnConfirm: false,
      animation: "slide-from-top",
      confirmButtonColor: "#273ac7",
    })
      .then((res) => {
        if (res.value === null) {
          Swal.fire({
            icon: "question",
            title: "Kosong ?",
            text: "Gimana uploadnya nih kalau gambarnya tidak ada? XD",
            confirmButtonColor: "#273ac7",
          });
        } else {
          const packValue = res.value;
          const data = new FormData();
          data.append("user_image", res.value);
          setdataImage({
            ...dataImage,
            data,
          });
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            if (num === 0) {
              setMain(reader.result);
              setImgProduct1(res.value);
            } else if (num === 1) {
              setSecond(reader.result);
              setImgProduct2(res.value);
            } else if (num === 2) {
              setThird(reader.result);
              setImgProduct3(res.value);
            } else if (num === 3) {
              setFourth(reader.result);
              setImgProduct4(res.value);
            } else if (num === 4) {
              setFifth(reader.result);
              setImgProduct5(res.value);
            }
          });
          reader.readAsDataURL(packValue);
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Batal",
          text: "Penambahan gambar produk dibatalkan",
          confirmButtonColor: "#273ac7",
        });
      });
  };
  // CHANGE AVATAR
  const changeAvatarUser = () => {
    Swal.fire({
      icon: "info",
      title: "Mengubah avatar",
      text: "Silahkan pilih sebuah gambar dari komputer-mu untuk dijadikan gambar profil baru kamu :",
      input: "file",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
      confirmButtonText: "Upload",
      showCancelButton: true,
      closeOnConfirm: false,
      animation: "slide-from-top",
      confirmButtonColor: "#273ac7",
    })
      .then((res) => {
        if (res.value === null) {
          Swal.fire({
            icon: "question",
            title: "Kosong ?",
            text: "Gimana uploadnya nih kalau gambarnya tidak ada? XD",
            confirmButtonColor: "#273ac7",
          });
        } else {
          const packValue = res.value;
          setStatus(true);
          setUserData({
            ...userData,
            image: res.value,
          });
          setStoreImage(res.value);
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            setUpdateImage(reader.result);
          });
          reader.readAsDataURL(packValue);
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Batal",
          text: "Perubahan gambar profil dibatalkan!",
          confirmButtonColor: "#273ac7",
        });
      });
  };
  // REACT HOOKS - USE EFFECT
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/users/find-one", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data.data[0];
        setUserData(data);
        setUpdateImage(process.env.REACT_APP_API_IMG + data.image);
        if (data.role === 1) {
          selectMenu("Store Profile");
        } else if (data.role === 2) {
          selectMenu("My Account");
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: err.response.data.message,
          confirmButtonColor: "#273ac7",
        });
      });
  }, []);
  return (
    <div className="showInAnimation">
      <Helmet>
        <title>Tuku - Profile</title>
      </Helmet>
      <Profile
        ms={menuSelected}
        mous={myOrderUserSelected}
        moss={myOrderStoreSelected}
        mpms={myProductMenuSelected}
        sm={(e) => {
          selectMenu(e.target.getAttribute("name"));
        }}
        smoud={(e) => {
          selectMyOrderUser(e.target.innerText);
        }}
        smoum={(val) => {
          selectMyOrderUser(val);
        }}
        smosd={(e) => {
          selectMyOrderStore(e.target.innerText);
        }}
        smosm={(val) => {
          selectMyOrderStore(val);
        }}
        smpmd={(e) => {
          selectMyProductMenu(e.target.innerText);
        }}
        smpmm={(val) => {
          selectMyProductMenu(val);
        }}
        na={newAddress}
        nac={(e) => {
          newAddressChange(e);
        }}
        rea={() => {
          addNewAddress({
            type: "",
            name: "",
            phoneNumber: "",
            address: "",
            postalCode: "",
            city: "",
          });
        }}
        sg={(e) => {
          setUserData({ ...userData, gender: e.target.id });
        }}
        udc={(e) => {
          userDataChange(e);
        }}
        cau={() => {
          changeAvatarUser();
        }}
        au={avatarUser}
        pog={[mainPhoto, secondPhoto, thirdPhoto, fourthPhoto, fifthPhoto]}
        spp={(val) => {
          setProductPhoto(val);
        }}
        cp={checkProduct}
        ipn={(val) => {
          isProductNew(val);
        }}
        ud={userData}
        img={dataImage}
        storeData={storeData}
        imageStore={imageStore}
        status={status}
        storeImage={storeImage}
        imgProduct1={imgProduct1}
        imgProduct2={imgProduct2}
        imgProduct3={imgProduct3}
        imgProduct4={imgProduct4}
        imgProduct5={imgProduct5}
      />
    </div>
  );
}

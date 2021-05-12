import { Helmet } from "react-helmet";
import Category from "../../components/templates/Category.jsx";
// import './style.css'
// ATOMS

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import axiosApiInstance from "../../helpers/axios.js";

export default function CategoryPage(props) {
  const { params } = useParams();
  const [category, setCategory] = useState();
  useEffect(() => {
    axiosApiInstance
      .get(`${process.env.REACT_APP_API_URL}/category`)
      .then((res) => {
        setCategory(res.data);
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
        <title>Tuku - Home</title>
      </Helmet>
      {/* Ini nanti di panggil dari category, Untuk navigasi bebas mau pake state atau route */}
      <Category param={params} />
    </div>
  );
}

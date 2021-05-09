import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { login } from "../../configs/redux/actions/user";

import "./style.css";

import Tuku from "../../components/images/tukuLogo.png";

export default function Login() {
  const history = useHistory();

  const dispatch = useDispatch();

  const [isSeller, setIsSeller] = useState(false);
  const [active, setActive] = useState("customer");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
    }),
    onSubmit: (values) => {
      dispatch(login(values, isSeller))
        .then((res) => {
          formik.resetForm();
          Swal.fire({
            title: "Success!",
            text: res,
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#273ac7",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/");
            } else {
              history.push("/");
            }
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Error!",
            text: err.message,
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "#273ac7",
          });
        });
    },
  });

  const handleClickActive = (params) => {
    params === "seller" ? setIsSeller(true) : setIsSeller(false);
    formik.resetForm();
    setActive(params);
  };

  const handleClickLogo = () => {
    history.push("/");
  };

  return (
    <div className="showInAnimation">
      <Helmet>
        <title>Tuku - Login</title>
      </Helmet>
      <section className="login">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex flex-column justify-content-center align-items-center">
              <div className="text-center">
                <img
                  src={Tuku}
                  width={135}
                  height={50}
                  alt="Tuku"
                  onClick={() => handleClickLogo()}
                  style={{ cursor: "pointer" }}
                />
                <h1 className="heading-login mt-4">
                  Please login with your account
                </h1>
              </div>
              <div
                className="btn-group mt-4"
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  className={`btn btn-customer ${
                    active === "customer" && "active"
                  }`}
                  onClick={() => handleClickActive("customer")}
                >
                  Customer
                </button>
                <button
                  type="button"
                  className={`btn btn-seller ${
                    active === "seller" && "active"
                  }`}
                  onClick={() => handleClickActive("seller")}
                >
                  Seller
                </button>
              </div>
              <form
                className="mt-5 d-flex flex-column"
                onSubmit={formik.handleSubmit}
              >
                <input
                  type="text"
                  className={`form-control ${
                    formik.errors.email && formik.touched.email && "error"
                  }`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  name="email"
                  placeholder="Email"
                />
                {formik.errors.email && formik.touched.email && (
                  <small className="text-error mt-2">
                    {formik.errors.email}
                  </small>
                )}
                <input
                  type="password"
                  className={`form-control mt-3 ${
                    formik.errors.password && formik.touched.password && "error"
                  }`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  name="password"
                  placeholder="Password"
                />
                {formik.errors.password && formik.touched.password && (
                  <small className="text-error mt-2">
                    {formik.errors.password}
                  </small>
                )}
                <div className="float-right text-right mt-2">
                  <Link to="/reset" className="mt-2">
                    Forgot password?
                  </Link>
                </div>
                <button type="submit" className="btn btn-submit btn-block mt-4">
                  Primary
                </button>
              </form>
              <p className="mt-4">
                Don't have a Tokopedia account?{" "}
                <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

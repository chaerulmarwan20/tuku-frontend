import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { signUp, verify } from "../../configs/redux/actions/user";

import "./style.css";

import Tuku from "../../components/images/tukuLogo.png";

export default function Register() {
  const useQuery = () => new URLSearchParams(useLocation().search);

  const query = useQuery();
  let email = query.get("email");
  let token = query.get("token");

  const history = useHistory();

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.user);

  const [isSeller, setIsSeller] = useState(false);
  const [active, setActive] = useState("customer");

  let validate;

  if (isSeller) {
    validate = {
      name: Yup.string().min(3, "Mininum 3 characters").required("Required!"),
      email: Yup.string().email("Invalid email format").required("Required!"),
      phoneNumber: Yup.string()
        .min(11, "Mininum 11 characters")
        .required("Required!"),
      store: Yup.string().min(3, "Mininum 3 characters").required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
    };
  } else {
    validate = {
      name: Yup.string().min(3, "Mininum 3 characters").required("Required!"),
      email: Yup.string().email("Invalid email format").required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
    };
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      store: "",
      password: "",
    },
    validationSchema: Yup.object(validate),
    onSubmit: (values) => {
      dispatch(signUp(values, isSeller))
        .then((res) => {
          formik.resetForm();
          Swal.fire({
            title: "Berhasil",
            text: "Akun kamu telah dibuat, silahkan periksa email kamu untuk mengaktifkan akun kamu",
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#273ac7",
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

  useEffect(() => {
    if (email !== null && token !== null) {
      dispatch(verify(email, token))
        .then((res) => {
          Swal.fire({
            title: "Berhasil",
            text: "Akun kamu telah diaktifkan, silahkan masuk.",
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#273ac7",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/login");
            } else {
              history.push("/login");
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
    }
  }, [dispatch, email, token, history]);

  return (
    <div className="showInAnimation">
      <Helmet>
        <title>Tuku - Register</title>
      </Helmet>
      <section className="register">
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
                <h1 className="heading-register mt-4">
                  Please sign up with your account
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
                    formik.errors.name && formik.touched.name && "error"
                  }`}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  name="name"
                  placeholder="Name"
                />
                {formik.errors.name && formik.touched.name && (
                  <small className="text-error mt-2">
                    {formik.errors.name}
                  </small>
                )}
                <input
                  type="text"
                  className={`form-control mt-3 ${
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
                {active === "seller" && (
                  <>
                    <input
                      type="text"
                      className={`form-control mt-3 ${
                        formik.errors.phoneNumber &&
                        formik.touched.phoneNumber &&
                        "error"
                      }`}
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      name="phoneNumber"
                      placeholder="Phone number"
                    />
                    {formik.errors.phoneNumber &&
                      formik.touched.phoneNumber && (
                        <small className="text-error mt-2">
                          {formik.errors.phoneNumber}
                        </small>
                      )}
                    <input
                      type="text"
                      className={`form-control mt-3 ${
                        formik.errors.store && formik.touched.store && "error"
                      }`}
                      value={formik.values.store}
                      onChange={formik.handleChange}
                      name="store"
                      placeholder="Store name"
                    />
                    {formik.errors.store && formik.touched.store && (
                      <small className="text-error mt-2">
                        {formik.errors.store}
                      </small>
                    )}
                  </>
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
                <button type="submit" className="btn btn-submit btn-block mt-4">
                  {!loading ? "Primary" : "Please wait..."}
                </button>
              </form>
              <p className="mt-4">
                Already have a Tokopedia account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

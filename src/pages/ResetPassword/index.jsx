import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { activate, reset } from "../../configs/redux/actions/user";

import "./style.css";

import Tuku from "../../components/images/tukuLogo.png";

export default function Reset() {
  const useQuery = () => new URLSearchParams(useLocation().search);

  const query = useQuery();

  let email = query.get("email");
  let token = query.get("token");

  const history = useHistory();

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState(false);

  let validate;

  if (showPassword) {
    validate = {
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Required!"),
    };
  } else {
    validate = {
      email: Yup.string().email("Invalid email format").required("Required!"),
    };
  }

  const action = (params) => {
    const data = {
      password: params.password,
      confirmPassword: params.confirmPassword,
    };
    if (showPassword) {
      dispatch(reset(email, token, data))
        .then((res) => {
          formik.resetForm();
          Swal.fire({
            title: "Berhasil",
            text: "Kata sandi telah diubah! Silahkan masuk.",
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
            text:
              err.message === `"confirmPassword" must be [ref:password]`
                ? "Kata sandi tidak cocok"
                : err.message,
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "#273ac7",
          });
        });
    } else {
      dispatch(activate(params.email))
        .then((res) => {
          formik.resetForm();
          setStatus(true);
          Swal.fire({
            title: "Berhasil",
            text: "Silahkan periksa email kamu untuk mengatur ulang kata sandi kamu!",
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
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object(validate),
    onSubmit: (values) => {
      action(values);
    },
  });

  const handleClickLogo = () => {
    history.push("/");
  };

  useEffect(() => {
    if (email !== null && token !== null) {
      setShowPassword(true);
    }
  }, [email, token]);

  return (
    <div className="showInAnimation">
      <Helmet>
        <title>Tuku - Reset Password</title>
      </Helmet>
      <section className="reset">
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
                <h1 className="heading-reset mt-4">Reset password</h1>
                {status && (
                  <p className="info-email text-center mt-4">
                    We have sent an email containing a password reset
                    instruction to your email. <br /> Please check your email.
                  </p>
                )}
                {showPassword && (
                  <p className="info mt-4">
                    You need to change your password to activate your account
                  </p>
                )}
              </div>
              <form
                className="mt-4 d-flex flex-column"
                onSubmit={formik.handleSubmit}
              >
                {!showPassword && (
                  <>
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
                  </>
                )}
                {showPassword && (
                  <>
                    <input
                      type="password"
                      className={`form-control mt-3 ${
                        formik.errors.password &&
                        formik.touched.password &&
                        "error"
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
                    <input
                      type="password"
                      className={`form-control mt-3 ${
                        formik.errors.confirmPassword &&
                        formik.touched.confirmPassword &&
                        "error"
                      }`}
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      name="confirmPassword"
                      placeholder="Confirmation New Password"
                    />
                    {formik.errors.confirmPassword &&
                      formik.touched.confirmPassword && (
                        <small className="text-error mt-2">
                          {formik.errors.confirmPassword}
                        </small>
                      )}
                  </>
                )}
                <div className="text-right mt-2">
                  <Link to="/reset" className="mt-2">
                    Forgot password?
                  </Link>
                </div>
                <button type="submit" className="btn btn-submit btn-block mt-4">
                  {showPassword === false
                    ? !loading
                      ? "Send"
                      : "Please wait..."
                    : "Confirm"}
                </button>
              </form>
              {!showPassword && (
                <p className="mt-4">
                  Don't have a Tokopedia account?{" "}
                  <Link to="/register">Register</Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

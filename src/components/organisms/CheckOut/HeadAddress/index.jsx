import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axiosApiInstance from "../../../../helpers/axios";
import "./style.css";

export default function HeadAddress() {
  const urlApi = process.env.REACT_APP_API_URL;

  const [address, setAddress] = useState([]);
  const [allAddress, setAllAddress] = useState([]);
  const [add, setAdd] = useState(false);
  const [choose, setChoose] = useState(false);
  const [primary, setPrimary] = useState(false);

  const handleActiveAdd = () => {
    setAdd(true);
    setChoose(false);
  };

  const handleActiveChoose = () => {
    setChoose(true);
    setAdd(false);
  };

  const handlePrimary = () => {
    setPrimary(!primary);
  };

  const getOneAddress = () => {
    axiosApiInstance
      .get(`${urlApi}/address/find-one`)
      .then((result) => {
        setAddress(result.data.data);
      })
      .catch((err) => {
        setAddress([]);
      });
  };

  const getAllAdress = () => {
    axiosApiInstance
      .get(`${urlApi}/address`)
      .then((result) => {
        setAllAddress(result.data.data);
      })
      .catch((err) => {
        setAllAddress([]);
      });
  };

  const formik = useFormik({
    initialValues: {
      type: "",
      address: "",
      postalCode: "",
      city: "",
      name: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      type: Yup.string().required("Required!"),
      address: Yup.string().required("Required!"),
      postalCode: Yup.string().required("Required!"),
      city: Yup.string().required("Required!"),
      name: Yup.string().min(3, "Mininum 3 characters").required("Required!"),
      phoneNumber: Yup.string()
        .min(11, "Mininum 11 characters")
        .required("Required!"),
    }),
    onSubmit: (values) => {
      if (address.length < 1) {
        values.isPrimary = true;
      } else {
        values.isPrimary = primary;
      }
      axiosApiInstance
        .post(`${urlApi}/address`, values)
        .then((res) => {
          formik.resetForm();
          Swal.fire({
            title: "Success!",
            text: "Alamat berhasil ditambahkan",
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#273ac7",
          }).then(() => {
            getOneAddress();
            getAllAdress();
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Error!",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "#273ac7",
          });
        });
    },
  });

  const handleChangeAddress = (id) => {
    axiosApiInstance
      .put(`${urlApi}/address/${id}`, { isPrimary: true })
      .then((res) => {
        formik.resetForm();
        Swal.fire({
          title: "Success!",
          text: "Alamat utama berhasil diupdate",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#273ac7",
        }).then(() => {
          getOneAddress();
          getAllAdress();
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "#273ac7",
        });
      });
  };

  useEffect(() => {
    getOneAddress();
  }, []);

  useEffect(() => {
    getAllAdress();
  }, []);

  return (
    <>
      <div className="box-head-add" id="main">
        {address.length > 0 ? (
          address.map((item, index) => {
            return (
              <div key={index}>
                <h4>{item.name}</h4>
                <p>{item.address}</p>
              </div>
            );
          })
        ) : (
          <>
            <h4>Alamat belum ditambahkan</h4>
            <p>Alamat akan tampil disini</p>
          </>
        )}
        {address.length > 0 ? (
          <button
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={() => handleActiveChoose()}
          >
            Choose Another Address
          </button>
        ) : (
          <button
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={() => handleActiveAdd()}
          >
            Add Address
          </button>
        )}
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content px-2">
            <div className="modal-header pb-1">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {add && (
              <>
                <div className="modal-body d-flex flex-column justify-content-center pt-2">
                  <h5
                    className="modal-title text-center"
                    id="exampleModalLabel"
                  >
                    Add new address
                  </h5>
                  <form className="mt-4">
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="type">
                          Save address as (ex : home address, office address)
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            formik.errors.type && formik.touched.type && "error"
                          }`}
                          value={formik.values.type}
                          onChange={formik.handleChange}
                          id="type"
                          placeholder=""
                        />
                        {formik.errors.type && formik.touched.type && (
                          <small className="text-error mt-2">
                            {formik.errors.type}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="name">Recipient’s name</label>
                        <input
                          type="text"
                          className={`form-control ${
                            formik.errors.name && formik.touched.name && "error"
                          }`}
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          id="name"
                          placeholder=""
                        />
                        {formik.errors.name && formik.touched.name && (
                          <small className="text-error mt-2">
                            {formik.errors.name}
                          </small>
                        )}
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="phone">
                          Recipient's telephone number
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            formik.errors.phoneNumber &&
                            formik.touched.phoneNumber &&
                            "error"
                          }`}
                          value={formik.values.phoneNumber}
                          onChange={formik.handleChange}
                          id="phoneNumber"
                          placeholder=""
                        />
                        {formik.errors.phoneNumber &&
                          formik.touched.phoneNumber && (
                            <small className="text-error mt-2">
                              {formik.errors.phoneNumber}
                            </small>
                          )}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="address">Address</label>
                        <input
                          type="text"
                          className={`form-control ${
                            formik.errors.address &&
                            formik.touched.address &&
                            "error"
                          }`}
                          value={formik.values.address}
                          onChange={formik.handleChange}
                          id="address"
                          placeholder=""
                        />
                        {formik.errors.address && formik.touched.address && (
                          <small className="text-error mt-2">
                            {formik.errors.address}
                          </small>
                        )}
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="postalCode">Postal code</label>
                        <input
                          type="text"
                          className={`form-control ${
                            formik.errors.postalCode &&
                            formik.touched.postalCode &&
                            "error"
                          }`}
                          value={formik.values.postalCode}
                          onChange={formik.handleChange}
                          id="postalCode"
                          placeholder=""
                        />
                        {formik.errors.postalCode &&
                          formik.touched.postalCode && (
                            <small className="text-error mt-2">
                              {formik.errors.postalCode}
                            </small>
                          )}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="city">City or Subdistrict</label>
                        <input
                          type="text"
                          className={`form-control ${
                            formik.errors.city && formik.touched.city && "error"
                          }`}
                          value={formik.values.city}
                          onChange={formik.handleChange}
                          id="city"
                          placeholder=""
                        />
                        {formik.errors.city && formik.touched.city && (
                          <small className="text-error mt-2">
                            {formik.errors.city}
                          </small>
                        )}
                      </div>
                    </div>
                    {address.length > 0 && (
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="primary"
                            style={{ width: "20px" }}
                            onChange={() => handlePrimary()}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="primary"
                            style={{ marginLeft: "5px" }}
                          >
                            Make it the primary address
                          </label>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
                <div className="modal-footer pb-4">
                  <button
                    type="button"
                    className="btn btn-cancel"
                    data-dismiss="modal"
                    onClick={() => formik.resetForm()}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-save ml-3"
                    data-dismiss="modal"
                    onClick={formik.submitForm}
                  >
                    Save
                  </button>
                </div>
              </>
            )}
            {choose && (
              <>
                <div className="modal-body d-flex flex-column justify-content-center pt-2 choose">
                  <h5
                    className="modal-title text-center"
                    id="exampleModalLabel"
                  >
                    Choose another address
                  </h5>
                  <div
                    className="new-address d-flex justify-content-center align-items-center mt-4"
                    onClick={() => handleActiveAdd()}
                  >
                    <span>Add new address</span>
                  </div>
                  {allAddress.length > 0 &&
                    allAddress.map((item, index) => {
                      return (
                        <div
                          className={`current-address mt-4 p-4 ${
                            item.isPrimary && "active"
                          }`}
                          key={index}
                        >
                          <h3>{item.name}</h3>
                          <p>{item.address}</p>
                          {item.isPrimary ? (
                            <div>Current address</div>
                          ) : (
                            <div
                              className="choose"
                              onClick={() => handleChangeAddress(item.id)}
                            >
                              Choose address
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

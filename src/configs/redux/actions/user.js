import axios from "axios";
import axiosApiInstance from "../../../helpers/axios";

const signUpRequest = () => {
  return { type: "SIGN_UP_REQUEST" };
};

const signUpSuccess = (data) => {
  return { type: "SIGN_UP_SUCCESS", payload: data };
};

const signUpFailure = (error) => {
  return { type: "SIGN_UP_FAILURE", payload: error };
};

const resetRequest = () => {
  return { type: "RESET_REQUEST" };
};

const resetSuccess = () => {
  return { type: "RESET_SUCCESS" };
};

const resetFailure = (error) => {
  return { type: "RESET_FAILURE", payload: error };
};

export const birth = (data) =>(dispatch)=>{
  dispatch({type: 'DATE', payload: data})
}
export const moonth = (data) =>(dispatch)=>{
  dispatch({type: 'MONTH', payload: data})
}
export const yearr = (data) =>(dispatch)=>{
  dispatch({type: 'YEAR', payload: data})
}
export const signUp = (data, isSeller) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_URL;
    dispatch(signUpRequest());
    axios
      .post(`${Url}/users/`, {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        store: data.store,
        isSeller,
      })
      .then((res) => {
        dispatch(signUpSuccess(res.data.data));
        resolve(res.data.message);
      })
      .catch((err) => {
        dispatch(signUpFailure(err.response.data.message));
        reject(new Error(err.response.data.message));
      });
  });
};

export const verify = (email, token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_URL;
    axios
      .get(`${Url}/users/verify/?email=${email}&token=${token}`)
      .then((res) => {
        resolve(res.data.message);
      })
      .catch((err) => {
        reject(new Error(err.response.data.message));
      });
  });
};

export const login = (data, isSeller) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_URL;
    axios
      .post(`${Url}/users/login`, {
        email: data.email,
        password: data.password,
        isSeller,
      })
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.data.data });
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("id", res.data.data.id);
        resolve(res.data.message);
      })
      .catch((err) => {
        reject(new Error(err.response.data.message));
      });
  });
};

export const findUser = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_URL;
    axiosApiInstance
      .get(`${Url}/users/find-one`)
      .then((res) => {
        dispatch({
          type: "FIND_USER",
          payload: res.data.data[0],
        });
        resolve(res.data.data[0]);
      })
      .catch((err) => {
        reject(new Error(err.response.data.message));
      });
  });
};

export const update = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_URL;
    const id = localStorage.getItem("id");
    axiosApiInstance
      .put(`${Url}/users/${id}`, data)
      .then((res) => {
        resolve(res.data.message);
      })
      .catch((err) => {
        reject(new Error(err.response.data.message));
      });
  });
};

export const activate = (email) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_URL;
    dispatch(resetRequest());
    axios
      .post(`${Url}/users/forgot-password`, { email })
      .then((res) => {
        dispatch(resetSuccess());
        resolve(res.data.message);
      })
      .catch((err) => {
        dispatch(resetFailure(err.response.data.message));
        reject(new Error(err.response.data.message));
      });
  });
};

export const reset = (email, token, data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const Url = process.env.REACT_APP_API_URL;
    axios
      .put(`${Url}/users/reset-password/?email=${email}&token=${token}`, data)
      .then((res) => {
        resolve(res.data.message);
      })
      .catch((err) => {
        reject(new Error(err.response.data.message));
      });
  });
};

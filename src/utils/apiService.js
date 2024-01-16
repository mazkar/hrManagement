import { baseUrl } from "./apiURL";
import axios from "axios";
import { encode as btoa } from "base-64";
const apiUrl = baseUrl.URL;

global.btoa = btoa;

const Login = (path) => (data) => {
  const promise = new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}${path}`, {
        auth: {
          username: data.username,
          password: data.password,
        },
      })
      .then(
        (result) => {
          resolve(result);
          console.log(result, "err");
        },
        (err) => {
          reject(err);
          console.log(err, "err");
        }
      );
  });
  return promise;
};

//common api with token
const GET = (path, token) => {
  const promise = new Promise((resolve, reject) => {
    // const token = localStorage.getItem("token");
    axios
      .get(`${apiUrl}${path}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        (result) => {
          console.log("i am get :", result.data);
          resolve(result.data);
        },
        (err) => {
          console.log("err", err);
          reject(err);
        }
      );
  });
  return promise;
};

const GETParam = (path, token, id) => {
  const promise = new Promise((resolve, reject) => {
    // const token = localStorage.getItem("token");
    axios
      .get(`${apiUrl}${path}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        (result) => {
          console.log("i am get :", result.data);
          resolve(result.data);
        },
        (err) => {
          console.log("error get", err);
          reject(err);
        }
      );
  });
  return promise;
};

const getUser = (token) => GET("auth/me", token);

const getMoverTask = (token, uid) =>
  GETParam("transportassignment/getPickupPending", token, uid);

const API = {
  Login,
  getUser,
  getMoverTask,
};

export default API;

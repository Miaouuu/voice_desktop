import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {
      servers: [],
    },
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, { token, user }) {
      state.status = "success";
      state.token = token;
      console.log(user);
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.user = {
        servers: [],
      };
    },
    get_user(state, user) {
      state.user = user;
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/auth/login",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            commit("auth_success", { token, user });
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/auth/register",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
    getUser({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:3000/api/user/profile",
          method: "GET",
        })
          .then((resp) => {
            commit("get_user", resp.data);
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // eslint-disable-next-line no-unused-vars
    createServer({ commit }, name) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:3000/api/server/",
          data: { name: name },
          method: "POST",
        })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    getServers: (state) => state.user.servers,
    getUserId: (state) => state.user._id,
  },
});

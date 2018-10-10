import Vue from "vue";
import Vuex from "vuex";
import uuid from "uuid/v4";
import VuexPersist from "vuex-persist";
import * as types from "./types";
import router from "../router";

const vuexPersist = new VuexPersist({
  key: "balances",
  storage: localStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    account: {
      id: "",
      name: "",
      details: ""
    },
    balance: {
      id: "",
      coin: "",
      qty: ""
    },
    accounts: [],
    balances: [],
    toast: false
  },
  mutations: {
    [types.DISPLAY_TOAST]: (state, payload) => {
      state.toast = payload;
    },
    [types.UPDATE_NAME]: (state, payload) => {
      state.account.name = payload;
    },
    [types.UPDATE_DETAILS]: (state, payload) => {
      state.account.details = payload;
    },
    [types.ADD_ACCOUNT]: (state, account) => {
      state.accounts.push(account);
    },
    [types.DELETE_ACCOUNT]: (state, accounts) => {
      // eslint-disable-next-line
      state.accounts = accounts;
    },
    [types.SELECT_ACCOUNT]: (state, id) => {
      // eslint-disable-next-line
      state.account = id;
    },
    [types.UPDATE_ACCOUNT]: (state, accounts) => {
      // eslint-disable-next-line
      state.accounts = accounts;
    },
    [types.VIEW_BALANCES]: (state, data) => {
      // eslint-disable-next-line
      state.balances = data;
    },
    [types.CLEAR_FORM]: (state, account) => {
      // eslint-disable-next-line
      state.account = account;
    }
  },
  actions: {
    displayToast({ commit }, payload) {
      commit(types.DISPLAY_TOAST, payload);
    },
    updateName({ commit }, payload) {
      commit(types.UPDATE_NAME, payload);
    },
    updateDetails({ commit }, payload) {
      commit(types.UPDATE_DETAILS, payload);
    },
    addAccount({ commit }, account) {
      const setId = uuid();
      const saveAccount = { ...account, id: setId };
      commit(types.ADD_ACCOUNT, saveAccount);
    },
    deleteAccount({ state, commit }, account) {
      const oldAccs = state.accounts;
      const accounts = oldAccs.filter(accs => accs.id !== account.id);
      commit(types.DELETE_ACCOUNT, accounts);
    },
    selectAccount({ commit }, id) {
      commit(types.SELECT_ACCOUNT, id);
    },
    updateAccount({ state, commit }, account) {
      const newAccs = state.accounts;
      const index = newAccs.findIndex(obj => obj.id === account.id);
      newAccs[index] = account;
      commit(types.UPDATE_ACCOUNT, newAccs);
    },

    viewBalances({ commit }, account) {
      Vue.http
        .get(`https://public.xbts.io/account/getbalance/${account.name}`)
        .then(response => response.json())
        .then(data => {
          const keys = Object.keys(data);
          const values = Object.values(data);
          const balances = [];
          const toast = true;
          for (let i = 0; i < keys.length; i += 1) {
            let balance = {};
            balance = { id: uuid(), coin: keys[i], qty: values[i] };
            balances.push(balance);
          }
          commit(types.VIEW_BALANCES, balances);
          commit(types.SELECT_ACCOUNT, account);
          commit(types.DISPLAY_TOAST, toast);
        })
        .catch(error => error);
      //router.push({ path: "balances" });
    },

    clearForm({ commit }) {
      const account = {
        id: "",
        name: "",
        details: ""
      };
      commit(types.CLEAR_FORM, account);
    }
  }
});

import axios from "axios"
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    access_token: "",
    refresh_token: "",
    table_data: []
  },
  getters: {
    get_access_token(state) {
      return state.access_token
    },
    get_refresh_token(state) {
      return state.refresh_token
    },
    get_table_data(state) {
      return state.table_data
    }
  },
  mutations: {
    SET_ACCESS_TOKEN(state, payload) {
      state.access_token = payload
    },
    SET_REFRESH_TOKEN(state, payload) {
      state.refresh_token = payload
    },
    SET_TABLE_DATA(state, payload) {
      state.table_data = payload.map(item => ({...item, opened: false, checked: false}))
    },
    SET_CHECKBOX_STATE(state, id) {
      state.table_data.forEach(element => {
        element.id === id && (
          element.checked = !element.checked
        )
      });
    },
    SET_SUB_STATE(state, id) {
      state.table_data.forEach(element => {
        element.id === id && (
          element.opened = !element.opened
        )
      });
    }
  },
  actions: {
    async logIn(store, payload) {
      let url = `https://zonesmart.su/api/v1/auth/jwt/create/`
      const response = await axios.post(url, payload)
      if (response.status === 200) {
        store.commit("SET_ACCESS_TOKEN", response.data.access)
        localStorage.setItem("access_token", response.data.access)
        store.commit("SET_REFRESH_TOKEN", response.data.refresh)
        localStorage.setItem("refresh_token", response.data.refresh)
        return 1
      }
    },
    async fetchTableData(store, payload) {
      try {
        let url = `https://zonesmart.su/api/v1/zonesmart/order/`
        const response = await axios.get(url, {
          headers: {
            'authorization': `JWT ${store.state.access_token}`
          },
          params: {
            limit: 10,
            offset: 0,
            search: ""
          }
        })
        if (response.status === 200) {
          store.commit("SET_TABLE_DATA", response.data.results)
        }
      } catch (err) {
        try {
          let url = `https://zonesmart.su/api/v1/auth/jwt/refresh/`
          const response = await axios.post(url, { refresh: store.state.refresh_token})
          if (response.status === 200) {
            store.commit("SET_ACCESS_TOKEN", response.data.access)
            localStorage.setItem("access_token", response.data.access)
            store.dispatch('fetchTableData')
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
  }
})
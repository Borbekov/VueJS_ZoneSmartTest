import axios from "axios"
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    access_token: "",
    refresh_token: "",
    total_count: 0,
    table_data: [],
    is_table_data: false,
    checked_rows: []
  }
}

export const store = new Vuex.Store({
  state: getDefaultState(),
  getters: {
    get_access_token(state) {
      return state.access_token
    },
    get_refresh_token(state) {
      return state.refresh_token
    },
    get_total_count(state) {
      return state.total_count
    },
    get_table_data(state) {
      return state.table_data
    },
    get_is_table_data(state) {
      return state.is_table_data
    },
    get_checked_rows(state) {
      return state.checked_rows
    }
  },
  mutations: {
    SET_ACCESS_TOKEN(state, payload) {
      state.access_token = payload
    },
    SET_REFRESH_TOKEN(state, payload) {
      state.refresh_token = payload
    },
    SET_TOTAL_COUNT(state, payload) {
      state.total_count = payload
    },
    SET_TABLE_DATA(state, payload) {
      state.table_data = payload.map(item => ({...item, opened: false, checked: false}))
    },
    SET_IS_TABLE_DATA(state, payload) {
      state.is_table_data = payload
    },
    SET_ALL_CHECKBOX_STATE(state, payload) {
      state.table_data.forEach(element => {
        element.checked = payload,
        payload ? state.checked_rows.push(element.id) : (
          state.checked_rows = []
        )
      })
    },
    SET_CHECKBOX_STATE(state, id) {
      state.table_data.forEach(element => {
        element.id === id && (
          element.checked = !element.checked,
          element.checked ? state.checked_rows.push(element.id) : (
            state.checked_rows = state.checked_rows.filter(elem =>  elem !== id)
          )
        )
      })
    },
    SET_SUB_STATE(state, id) {
      state.table_data.forEach(element => {
        element.id === id && (
          element.opened = !element.opened
        )
      })
    },
    RESET_STATE(state) {
      Object.assign(state, getDefaultState())
    }
  },
  actions: {
    async logIn(store, payload) {
      try {
        let url = `https://zonesmart.su/api/v1/auth/jwt/create/`
        const response = await axios.post(url, payload)
        if (response.status === 200) {
          store.commit("SET_ACCESS_TOKEN", response.data.access)
          localStorage.setItem("access_token", response.data.access)
          store.commit("SET_REFRESH_TOKEN", response.data.refresh)
          localStorage.setItem("refresh_token", response.data.refresh)
          return "success"
        }
      } catch (err) {
        console.log("Error -> ", err)
        return "error"
      }
    },
    async fetchTableData(store, payload) {
      store.commit("SET_IS_TABLE_DATA", false)
      try {
        let url = `https://zonesmart.su/api/v1/zonesmart/order/`
        const response = await axios.get(url, {
          headers: {
            'authorization': `JWT ${store.state.access_token}`
          },
          params: payload
        })
        if (response.status === 200) {
          store.commit("SET_TOTAL_COUNT", response.data.count)
          store.commit("SET_TABLE_DATA", response.data.results)
          store.commit("SET_IS_TABLE_DATA", true)
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
          console.log("Error -> ", err)
        }
      }
    },
  }
})
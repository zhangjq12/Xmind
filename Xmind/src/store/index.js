import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    income: 0,
    outcome: 0,
    items: [],
    datas: []
  },
  getters: {
    getincome: state => {
      return state.income
    },
    getoutcome: state => {
      return state.outcome
    },
    getitems: state => {
      return state.items
    }
  },
  mutations: {
    income (state, num) {
      state.income = num
      // console.log(state.income)
    },
    outcome (state, num) {
      state.outcome = num
      // console.log(state.outcome)
    },
    items (state, items) {
      state.items = items
    },
    datas (state, datas) {
      state.datas = datas
    }
  }
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state: {
      studentId: null,
    },
    mutations: {
      SET_STUDENT_ID(state, id) {
        console.log('Setting student ID to:', id)
        state.studentId = id
      },
    },

    actions: {
      setStudentId({ commit }, id) {
        commit('SET_STUDENT_ID', id)
      },
    },
    getters: {
      studentId: (state) => state.studentId,
    },
  })
}

export default createStore

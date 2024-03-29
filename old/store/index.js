import axios from 'axios'
import config from '~/config'


export const state = () => ({
  user: null
})

export const mutations = {
  setUser: (state, user) => state.user = user
}


export const actions = {
  loadUserBalances({ rootState, state, commit }) {
    if (state.user) {
      
      axios.get(`${config.lightapi}/api/account/${config.name}/${rootState.user.name}`).then((r) => {
        const balances = r.data.balances
        balances.sort((a, b) => {
            if (a.currency < b.currency) { return -1 }
            if (a.currency > b.currency) { return 1 }

            return 0
        })

        balances.map(b => b.id = b.currency + '@' + b.contract)

        commit('setUser', { ...state.user, balances }, { root: true })
      })
    }
  }
}


export const getters = {
  user(state) {
    return state.user
  }
}

import appConfig from '@/config'

export default {
  namespaced: true,
  state: {
    data: JSON.parse(window.localStorage.getItem(appConfig.localStorageKeys.settings)) || {
      showTagsInReadme: true,
      showTagsInNavigate: true
    }
  },
  mutations: {
    'UPDATE_SETTINGS': (state, data) => {
      state.data = Object.assign(state.data, data)
    },
  },
  actions: {
    updateSettings({ commit }, params) {
      commit('UPDATE_SETTINGS', params)
      window.localStorage.setItem(appConfig.localStorageKeys.settings, JSON.stringify(this.state.settings.data))
    },

  },
}

import appConfig from '@/js/config'

export default {
  namespaced: true,
  state: {
    data: JSON.parse(window.localStorage.getItem(appConfig.localStorageKeys.settings)) || {
      showTagsInReadme: true,
      showLanguageBarInReadme: true,
      showTagsInNavigate: true,
      deleteTagDirect: false,
      sortTag: 'Alphabet'
    }
  },
  mutations: {
    'UPDATE_SETTINGS': (state, data) => {
      state.data = Object.assign(state.data, data)
    },
  },
  actions: {
    updateSettings({ commit }) {
      window.localStorage.setItem(appConfig.localStorageKeys.settings, JSON.stringify(this.state.settings.data))
    },

  },
}

import Vue from 'vue'
import Vuex from 'vuex'
import { Notification } from 'element-ui'
import tag from './tag'
import repo from './repo'
import settings from './settings'
import appConfig from '@/js/config'
import { saveGitstarsGist } from '@/api/index.js'
import { loadReposAndLanguageTags, loadGitstarsData, formatReposTag, notifySuccess, notifyWarn, notifyError } from '@/help/index'

if (process.env.NODE_ENV !== 'production') Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gistId: '',
    isEditingTags: false,
    isUpdatingData: false,
    isLoadedData: false,
    showSeting: false,
  },
  mutations: {
    initGistId(state, gistId) {
      state.gistId = gistId
    },
    toggleIsEditingTags(state, bool = !state.isEditingTags) {
      state.isEditingTags = bool
    },
    toggleIsUpdatingData(state, bool = !state.isUpdatingData) {
      state.isUpdatingData = bool
    },
    toggleIsLoadedData(state, bool = !state.isLoadedData) {
      state.isLoadedData = bool
    },
  },
  actions: {
    initGitstars({ commit }) {
      return Promise.all([loadReposAndLanguageTags(), loadGitstarsData()])
        .then(([{ repos, languageTags }, content]) => {
          const { tags } = content
          formatReposTag(repos, tags)

          commit('repo/initRepos', repos)
          commit('tag/initTags', tags)
          commit('toggleIsLoadedData')

          return { languageTags }
        })
        .catch(() => notifyWarn({ title: 'Failed to get data', message: 'Recommend to refresh the page' }))
    },
    updateGitstarsData({ state, commit }, notify) {
      commit('toggleIsUpdatingData')

      const loadingNotify = Notification.info(Object.assign({}, appConfig.notify, {
        iconClass: 'fa fa-cog fa-spin fa-fw',
        message: 'Updating. please wait...',
        duration: 0,
      }))

      const gist = { lastModified: Date.now(), tags: state.tag.tags }

      return saveGitstarsGist(gist)
        .then(() => {
          notifySuccess(notify || { message: 'Update completed' })
          window.localStorage.setItem(window._gitstars.gistId, JSON.stringify(gist))
        })
        .catch(() => {
          const message = 'Update failed'
          notifyError(notify || { message })
          throw new Error(message)
        })
        .finally(() => {
          commit('toggleIsUpdatingData')
          loadingNotify.close()
        })
    },
  },
  modules: { settings, tag, repo },
})

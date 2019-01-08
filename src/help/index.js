import axios from 'axios'
import { Notification } from 'element-ui'
import appConfig from '@/js/config'
import { getStarredRepos, getGitstarsGist, getUserGists, createGitstarsGist } from '@/api/index.js'

export const loadReposAndLanguageTags = async (page = 1) => {
  const repos = []
  let reposByPage = []
  let sortNum = 999999999

  do {
    reposByPage = await getStarredRepos(page++)
    reposByPage.forEach((repo, index) => {
      repo._customTags = []
      repo[appConfig.repoSorts.time.sortKey] = sortNum--
    })
    repos.push(...reposByPage)
  } while (reposByPage.length === appConfig.starredReposPerPage)

  let dateNow = Date.now()
  const languageTags = []

  repos.forEach(({ id: repoId, language }) => {
    if (!language) return

    const languageTag = languageTags.find(tag => tag.name === language)
    if (languageTag) {
      languageTag.repos.push(repoId)
    } else {
      languageTags.push({
        id: dateNow,
        categoryId: appConfig.tagCategorys.language.id,
        name: language,
        repos: [repoId],
      })
      dateNow += 1
    }
  })

  return { repos, languageTags }
}

export const loadGitstarsData = async () => {
  let gitstarsGistId = window.localStorage.getItem(appConfig.localStorageKeys.gistId)
  let content = null
  let isUseStorageContent = false

  if (gitstarsGistId) {
    const { files } = await getGitstarsGist(gitstarsGistId)
    content = JSON.parse(files[appConfig.filename].content)

    let contentFromStorage = window.localStorage.getItem(gitstarsGistId)
    if (contentFromStorage) {
      contentFromStorage = JSON.parse(contentFromStorage)
      /**
       * 客户端之间 localStorage 内保存的数据不共享
       * 需要对比远程数据（使用 lastModified 值）确定最新数据
       *
       * 为什么不能直接使用远程数据？
       *
       * 因为 github api 有 60s 缓存
       * 如果用户更新数据后不久再执行刷新操作
       * 远程数据不一定返回上次更新的最新数据
       *
       * 还有一种情况是无法避免的
       * 用户使用 chrome 和 firefox 同时打开 gitstars
       * 用户在 chrome 客户端更新数据
       * 然后在 60s 之内使用 firefox 客户端刷新页面
       * firefox 客户端获取的远程 gist 数据不一定是 chrome 客户端更新后的最新数据
       */
      if (contentFromStorage.lastModified > content.lastModified) {
        content = contentFromStorage
        isUseStorageContent = true
      }
    }
  } else {
    const gists = await getUserGists()
    for (const { id, description, files } of gists) {
      if (description === appConfig.description) {
        gitstarsGistId = id
        content = await axios.get(files[appConfig.filename].raw_url)
        break
      }
    }

    if (!gitstarsGistId) {
      content = { lastModified: Date.now(), tags: [] }
      const { id } = await createGitstarsGist(content)
      gitstarsGistId = id
    }

    window.localStorage.setItem(appConfig.localStorageKeys.gistId, gitstarsGistId)
  }

  if (!isUseStorageContent) window.localStorage.setItem(gitstarsGistId, JSON.stringify(content))

  window._gitstars.gistId = gitstarsGistId
  return content
}

export const formatReposTag = (repos, tags) => {
  repos.forEach(repo => {
    if (repo._customTags.length) repo._customTags = []
  })

  tags.forEach(tag => {
    tag.repos.forEach((repoId, index, tagRepos) => {
      const repo = repos.find(({ id }) => id === repoId)
      repo ? repo._customTags.push(tag) : tagRepos[index] = undefined
    })
    tag.repos = tag.repos.filter(repo => repo)
  })
}

export const validateTagName = async (tags, name) => {
  if (!name) throw new Error('Tag name can not be empty')
  if (tags.find(tag => tag.name === name)) throw new Error('This tag already exists')
  return name
}

export const colorForLanguage = (name) => {
  const defautColor = {
    'C': 'rgb(85,85,85)',
    'C++': 'rgb(241,86,124)',
    'CoffeeScript': 'rgb(33,71,121)',
    'CSS': 'rgb(84,63,127)',
    'Erlang': 'rgb(181,66,155)',
    'GCC Machine Description': 'rgb(204,204,204)',
    'Go': 'rgb(50,94,175)',
    'HTML': 'rgb(227,84,9)',
    'Java': 'rgb(176,116,0)',
    'JavaScript': 'rgb(243,224,65)',
    'Kotlin': 'rgb(240,145,20)',
    'Objective-C': 'rgb(56,142,255)',
    'Objective-C++': 'rgb(95,105,255)',
    'PHP': 'rgb(77,93,152)',
    'Python': 'rgb(50,113,168)',
    'Ruby': 'rgb(111,28,17)',
    'Scala': 'rgb(192,57,60)',
    'Shell': 'rgb(144,221,57)',
    'Swift': 'rgb(255,174,44)',
    'TypeScript': 'rgb(44,115,139)',
    'XSLT': 'rgb(232,145,239)' }
  return defautColor[name] || '#586069'
}

export const notifySuccess = (notify) => Notification.success(Object.assign({}, notify, appConfig.notify))
export const notifyInfo = (notify) => Notification.info(Object.assign({}, notify, appConfig.notify))
export const notifyWarn = (notify) => Notification.warning(Object.assign({}, notify, appConfig.notify))
export const notifyError = (notify) => Notification.error(Object.assign({}, notify, appConfig.notify))

export const parseURLSearch = (searchStr = window.location.search) => {
  const search = {}

  if (!searchStr.length) return search
  if (searchStr[0] === '?') searchStr = searchStr.slice(1)

  const kvs = searchStr.split('&')
  for (const kv of kvs) {
    const skv = kv.split('=')
    search[skv[0]] = decodeURIComponent(skv[1])
  }
  return search
}

<template>
  <div id="app">
    <sidebar class="sidebar"
             :defaultTags="defaultTags"
             :languageTags="languageTags"
    ></sidebar>
    <repobar class="repobar"></repobar>
    <repo-readme class="readme"></repo-readme>
  </div>

</template>

<script>
import Sidebar from './components/Sidebar'
import Repobar from './components/SubSidebar'
import RepoReadme from './components/RepoReadme'
import appConfig from './config'

const { defaultTags } = appConfig

export default {
  name: 'App',
  components: { Sidebar, Repobar, RepoReadme },
  data() {
    return {
      show: true,
      languageTags: [],
    }
  },
  computed: {
    defaultTags() {
      return [
        Object.assign({}, defaultTags.all, { repos: this.$store.state.repo.repos }),
        Object.assign({}, defaultTags.untagged, { repos: this.$store.getters['repo/untaggedRepos'] }),
      ]
    },
  },
  mounted() {
    this.$store.dispatch('initGitstars').then(tags => Object.assign(this, tags))
  },
}
</script>

<style scoped lang="scss">
#app {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  .sidebar {
    flex: 0 0 auto;
    width: 300px;
    height: 100%;
  }
  .repobar{
    flex: 0 0 auto;
  }
  .readme{
    flex: 1 1;
  }
}

</style>

<style>
@import './css/element-ui.css';
@import './css/app.css';
</style>

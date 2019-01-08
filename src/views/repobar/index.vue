<template>
  <div id="subsidebar">
    <template v-if="isLoadedData">
      <sub-sidebar-header
        :searchValue.sync="searchValue"
        @onSwitchRepoSort="handleSwitchRepoSort"
      ></sub-sidebar-header>
      <ul v-show="repos.length" class="repo-list">
        <repo v-for="repo of repos" :key="repo.id" :repo="repo" :class="{ active: repo.id === activeRepo.id }"></repo>
      </ul>
      <div v-show="!repos.length" class="no-match vc-p">
        <i class="fa fa-bell-o fa-3x" aria-hidden="true"></i>
        <p class="ttc">No matching repository</p>
      </div>
    </template>
    <div v-else class="loader vc-p">
      <i class="fa fa-cog fa-spin fa-2x"></i>
      <p class="ttc">Getting starred repositories ...</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SubSidebarHeader from './header'
import Repo from '../../components/repocell'
import config from '@/js/config'

export default {
  name: 'sub-sidebar',
  components: { SubSidebarHeader, Repo },
  data() {
    return {
      searchValue: '',
      sortKey: config.repoSorts.time.sortKey,
    }
  },
  computed: {
    ...mapState(['isLoadedData']),
    ...mapState('repo', { activeRepo: 'active' }),
    repos() {
      const { searchValue, sortKey } = this
      return this.$store.getters['repo/reposOfTag']
        .filter(repo => {
          const owner = repo.owner.login.toLowerCase().includes(searchValue)
          if (owner) { return true }
          const repoName = repo.name && repo.name.toLowerCase().includes(searchValue)
          if (repoName) { return true }
          const language = repo.language && repo.language.toLowerCase().includes(searchValue)
          if (language) { return true }
          const description = repo.description && repo.description.toLowerCase().includes(searchValue)
          if (description) { return true }
          const tag = repo._customTags && repo._customTags.find(tag => tag.name.toLowerCase().includes(searchValue)) !== undefined
          if (tag) { return true }
          return false
        }).sort((a, b) => b[sortKey] - a[sortKey])
    },
  },
  methods: {
    handleSwitchRepoSort(key) {
      this.sortKey = key
    },
  },
}
</script>

<style scoped lang="scss">
  #subsidebar {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    overflow-x: hidden;

    display: flex;
    flex-direction: column;

    background-color: #fbfbfb;
    border-right: 1px solid #fbfbfb;
    .loader, .no-match {
      position: absolute;
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      font-size: 14px;
      text-align: center;
      color: #bfbfbf;
    }
    .repo-list {
      overflow: auto;
      flex: auto;
      padding: 0;
      margin: 0;
      list-style: none;
      .active {
        background: #f3f3f3;
      }
    }
  }

</style>

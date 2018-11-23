<template>
  <div id="subsidebar"
    :style="{width: `${width}px`}"
    @mousedown="mouseDown">
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
import SubSidebarHeader from './SubSidebarHeader'
import Repo from './Repo'
import config from '@/config'

export default {
  name: 'sub-sidebar',
  components: { SubSidebarHeader, Repo },
  created() {
    window.addEventListener('mouseup', this.mouseUp)
    window.addEventListener('mousemove', this.mouseMove)
  },
  data() {
    return {
      width: 359,
      move: false,
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
        .filter(repo => repo.owner.login.toLowerCase().includes(searchValue) || repo.name.toLowerCase().includes(searchValue))
        .sort((a, b) => b[sortKey] - a[sortKey])
    },
  },
  methods: {
    handleSwitchRepoSort(key) {
      this.sortKey = key
    },
    mouseDown() {
      this.move = true
    },
    mouseMove(event) {
      event.preventDefault()
      if (!this.move) { return }
      this.width = Math.max(this.width + event.movementX, 250)
    },
    mouseUp() {
      this.move = false
    },
  },
}
</script>

<style scoped lang="scss">
  #subsidebar {
    position: relative;
    height: 100%;

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
    }
  }

</style>

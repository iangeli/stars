<template>
  <div id="app">
    <sidebar
      :class="['sidebar', {'hide': hideSidebar}]"
      :defaultTags="defaultTags"
      :languageTags="languageTags"
    ></sidebar>
    <repobar class="repobar"></repobar>
    <repo-readme class="readme"></repo-readme>
    <bubble
      :class="['bubble',{'rotate': rotate}]"
      @click.native="rotateClick"
    >&#376;</bubble>
  </div>
</template>

<script>
import Sidebar from './sidebar'
import Repobar from './repobar'
import RepoReadme from './readme'
import Bubble from '@/components/dragview'
import appConfig from '../js/config'

const { defaultTags } = appConfig

export default {
  name: 'App',
  components: { Sidebar, Repobar, RepoReadme, Bubble },
  data() {
    return {
      show: true,
      languageTags: [],
      rotate: false,
      hideSidebar: false
    }
  },
  created() {
    window.addEventListener('keyup', event => {
      if (event.srcElement.localName === 'input') { return }
      switch (event.key) {
        case 'S':
        case 's':
          window.dispatchEvent(new Event('searchTag'))
          break
        case 'I':
        case 'i':
          window.dispatchEvent(new Event('inputTag'))
          break
        case 'N':
        case 'n':
          window.dispatchEvent(new Event('nextRepo'))
          break
        case 'B':
        case 'b':
          window.dispatchEvent(new Event('browseProject'))
          break
        default:
          break
      }
    })
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
  methods: {
    rotateClick() {
      this.rotate = !this.rotate
      this.hideSidebar = this.rotate
    }
  }
}
</script>

<style scoped lang="scss">
#app {
  position: relative;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  .sidebar {
    flex: 0 7 300px;
    height: 100%;
    transition: flex 0.3s;
    &.hide {
      flex: 0 0 0;
      transition: flex 0.3s;
    }
  }
  .repobar{
    flex: 0 9 354px;
  }
  .readme{
    flex: 1 30 785px;
  }
  .bubble {
    position: fixed;
    right: 20px;
    top: 20px;
    width: 40px;
    height: 40px;
    line-height: 40px;

    box-shadow: 0 0 10px 4px white, 0 0 20px 4px rgb(3,102,214);
    color: rgb(3,102,214);
    text-align: center;
    font-size: 30px;
    transform: rotate(90deg);
    border-radius: 50%;
    transition: transform 0.3s;
    &.rotate {
      transform: rotate(270deg);
      transition: transform 0.3s;
    }
  }
}

</style>

<style>
@import '../css/element-ui.css';
@import '../css/app.css';
</style>

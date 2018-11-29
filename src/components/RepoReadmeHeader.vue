<template>
  <header class="repo-readme__header">
    <div class="top">
      <h3 v-if="visible" class="repo-title">
        <a :href="activeRepo.html_url" target="_blank" rel="noopener noreferrer">
          <i class="fa fa-fw fa-lg fa-github" aria-hidden="true"></i>
        </a>
        <a class="user" :href="activeRepo.owner.html_url" target="_blank">
          <span>{{ activeRepo.owner.login }}</span>
        </a>
        <span> / </span>
        <a class="repo" :href="activeRepo.html_url" target="_blank">
          <span>{{ activeRepo.name }}</span>
        </a>
      </h3>
      <el-autocomplete
        v-model="tagName"
        :fetch-suggestions="handleFetchTagSuggestions"
        placeholder='Add New Tag'
        :debounce="30"
        size="small"
        class="repo-tag-input"
        @select="handleAddRepoTag"
        select-when-unmatched>
        <i slot="prefix" class="fa fa-fw fa-lg fa-tag el-input__icon"></i>
        <el-button slot="append" @click="handleAddRepoTag" class="ttc">add</el-button>
      </el-autocomplete>
    </div>
    <div v-if="activeRepo._customTags.length > 0" class="bottom">
      <repo-tag v-for="tag of activeRepo._customTags" :key="tag.id" :repo="activeRepo" :tag="tag" />
    </div>
  </header>
</template>

<script>
import RepoTag from './RepoTag'

export default {
  name: 'repo-readme-header',
  components: { RepoTag },
  props: {
    visible: { type: Boolean, default: false },
    activeRepo: { type: Object, required: true },
  },
  data() {
    return {
      tagName: '',
    }
  },
  computed: {
    currentRepoUntaggedTags() {
      return this.$store.state.tag.tags
        .filter(tag => !this.activeRepo._customTags.find(({ id }) => id === tag.id))
        .map(({ name }) => name)
    },
  },
  methods: {
    handleFetchTagSuggestions(inputStr, cb) {
      inputStr = inputStr.toLowerCase()
      cb(this.currentRepoUntaggedTags
        .filter(name => name.toLowerCase().includes(inputStr))
        .map(name => ({ value: name })))
    },
    handleAddRepoTag() {
      this.$store.dispatch('repo/addRepoTag', this.tagName.trim())
      this.tagName = ''
    },
  },
}
</script>

<style scoped lang="scss">
.repo-readme__header {
  display: flex;
  flex-direction: column;
  padding: 0 15px;

  border-bottom: 1px solid #e9e9e9;
  background-color: #fbfbfb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;


    .repo-title {
      color: #586069;
      font-weight: 500;
      .fa-github {
        color: #586069;
      }
      .user {
        font-weight: 400;
      }
      .repo {
        font-weight: 600;
      }
    }

    .repo-tag-input {
      width: 200px;
      .el-button {
        padding: 10px;
      }
    }
  }

  .bottom {
      display: flex;
      flex-wrap: wrap;
      padding-left: 0;
      font-size: 12px;
      list-style: none;
      color: #fff;
  }
}


</style>

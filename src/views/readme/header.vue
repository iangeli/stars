<template>
  <div class="repo-readme__header">
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
    </div>
    <div class="bottom">
      <template v-if="showTagsInReadme && activeRepo._customTags">
        <repo-tag v-for="tag of activeRepo._customTags" :key="tag.id" :repo="activeRepo" :tag="tag" />
      </template>

      <el-autocomplete
        v-model="tagName"
        :fetch-suggestions="handleFetchTagSuggestions"
        placeholder='New Tag'
        :debounce="30"
        size="mini"
        class="repo-tag-input"
        @select="confirmInputTag"
        @blur="cancelInputTag"
        @keyup.enter.native="confirmInputTag"
        @keyup.esc.native="cleanInputTag">
        <i slot="prefix" class="fa fa-fw fa-lg fa-tag el-input__icon"></i>
      </el-autocomplete>
    </div>

  </div>
</template>

<script>
  import RepoTag from '../../components/repotag'
  import { mapState } from 'vuex'

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
      ...mapState({
        showTagsInReadme: state => state.settings.data.showTagsInReadme
      }),
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
      confirmInputTag(event) {
        this.$store.dispatch('repo/addRepoTag', this.tagName.trim())
        this.tagName = ''
      },
      cleanInputTag(event) {
        this.tagName = ''
      },
      cancelInputTag(event) {
        event.target.blur()
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
    }

    .bottom {
      display: flex;
      flex-wrap: wrap;
      padding-left: 0;
      font-size: 12px;
      list-style: none;
      color: #fff;

      .repo-tag-input {
        width: 150px;
        padding-bottom: 5px;

        .fa-tag {
          font-size: 10px;
        }
      }
    }
  }


</style>

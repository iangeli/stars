<template>
  <li class="repo-item" @click="handleSwitchActiveRepo">
    <div class="header">
      <div class="titleWrapper">
        <a class="repo" :href="repo.html_url" target="_blank" rel="noopener noreferrer">{{ repo.name }}</a>
        <a class="user" :href="repo.owner.html_url" target="_blank" rel="noopener noreferrer"><i class="fa
fa-user" aria-hidden="true"></i>{{ repo.owner.login }}</a>
      </div>
      <span class="star"><i class="fa fa-star" aria-hidden="true"></i> {{ manageNum(repo.stargazers_count) }}</span>
    </div>
    <p class="repo-desc">{{ repo.description }}</p>

    <footer class="footer">
      <ul class="tag-list" v-if="showTagsInNavigate">
        <repo-tag v-for="tag of repo._customTags" :key="tag.id" :repo="repo" :tag="tag" />
      </ul>
      <div class="language" v-if="repo.language && repo.language.length > 0">
        <div class="color" ref="color" :style="{'background-color':color}"></div>
        <span>{{ repo.language }}</span>
      </div>
    </footer>
  </li>
</template>

<script>
import RepoTag from '../repotag'
import { colorForLanguage } from '@/help'
import { mapState } from 'vuex'

export default {
  name: 'repo',
  components: { RepoTag },
  props: {
    repo: { type: Object, required: true },
  },
  computed: {
    ...mapState({
      showTagsInNavigate: state => state.settings.data.showTagsInNavigate
    }),
    color: function() {
      return colorForLanguage(this.repo.language)
    },
  },
  methods: {
    handleSwitchActiveRepo() {
      this.$store.dispatch('repo/switchActive', this.repo)
    },
    manageNum(num) {
      switch (true) {
        case (num < 1000):
          return num
        case (num < 1000000):
          return `${(num / 1000).toFixed(1)}k`
        default:
          return `${(num / 1000000).toFixed(1)}m`
      }
    },
  },
}
</script>

<style scoped lang="scss">
.repo-item {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;

  padding: 15px;
  border-bottom: 1px solid #e9e9e9;
  cursor: pointer;
  background-color: #fff;
  &:active {
    background: rgba(0,0,0,0.1);
  }
}

.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;

  overflow: hidden;

  .titleWrapper {
    flex: 0 1 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .repo {
      font-weight: 600;
    }
    .user{
      margin-top: 3px;
      font-weight: 400;
      color: #586069;
      font-size: 13px;
      .fa-user {
        margin-right: 7px;
        margin-left: 3px;
      }
    }
  }
  .star {
    flex: 1 0 auto;
    margin-left: 10px;
    color: #5a5a5a;
    font-size: 12px;
    text-align: right;
  }
}

.repo-desc {
  margin: 7px 0;
  font-size: 12px;
  line-height: 1.5;
  color: #828282;
}

.footer {
  display: flex;
  justify-content: space-between;

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    font-size: 12px;
    list-style: none;
    color: #fff;
  }

  .language {
    align-self: flex-start;
    display: flex;
    align-items: center;

    font-size: 12px;
    font-weight: 400;
    color: #5a5a5a;
    text-align: right;
    .color {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
}


</style>

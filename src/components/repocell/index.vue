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
      return defautColor[this.repo.language]
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
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;

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
    flex: 0 0 auto;
    margin-left: 10px;
    color: #5a5a5a;
    font-size: 12px;
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

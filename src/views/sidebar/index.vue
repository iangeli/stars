<template>
  <div id="sidebar">
    <layout-header></layout-header>
    <div class="default-tags">
      <div v-for="tag in defaultTags"
           :key="tag.id"
           :class="['tagWrapper', { 'active': tag.id === activeTag.id }]"
           @click="handleSwitchActiveTag(tag)">
        <div class="tag">
          <i :class="`${tag.icon || 'fa-tag'}`" class="fa fa-fw" aria-hidden="true"></i>
          <span class="nav-item__name slo">{{ tag.repos.length }}</span>
        </div>
      </div>
    </div>
    <div class="sidebar-main">
      <tag-nav-header :isCustomCategoryActive="isCustomCategoryActive" :tagNameFormVisible.sync="tagNameFormVisible"></tag-nav-header>
      <transition name="slide-down">
        <new-tag-name-form v-show="tagNameFormVisible" :visible.sync="tagNameFormVisible"></new-tag-name-form>
      </transition>
      <transition name="slide-down">
        <div v-show="isEditingTags" class="edit-tag-tip">Edit</div>
      </transition>
      <div class="tag-list__group">
        <transition name="slide-to-left">
          <custom-tags-nav v-show="isCustomCategoryActive"></custom-tags-nav>
        </transition>
        <transition name="slide-to-right">
          <tags-nav v-show="activeTagCategory.id === tagCategorys.language.id" :tags="languageTags" class="language-tags"></tags-nav>
        </transition>
      </div>
      <transition name="telescopic">
        <div v-show="isLoadedData && !customTags.length && isCustomCategoryActive" class="no-tag vc-p">
          <i class="fa fa-eercast fa-2x" aria-hidden="true"></i>
        </div>
      </transition>
      <transition name="slide-up">
        <tag-categorys
          v-show="isLoadedData && !isEditingTags && !tagNameFormVisible"
          :categorys="Object.values(tagCategorys)"
          :activeTagCategory.sync="activeTagCategory">
        </tag-categorys>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TagsNav from '../language'
import TagNavHeader from './addOrDelete'
import NewTagNameForm from './tagInput'
import CustomTagsNav from '../custombar'
import TagCategorys from './footer'
import appConfig from '@/js/config'
import LayoutHeader from './header'

export default {
  name: 'sidebar',
  components: { LayoutHeader, TagsNav, TagNavHeader, NewTagNameForm, CustomTagsNav, TagCategorys },
  props: {
    defaultTags: { type: Array, required: true },
    languageTags: { type: Array, required: true },
  },
  data() {
    const { tagCategorys } = appConfig
    return {
      tagCategorys,
      activeTagCategory: appConfig.tagCategorys.custom,
      tagNameFormVisible: false,
    }
  },
  computed: {
    ...mapState(['isEditingTags', 'isLoadedData']),
    ...mapState('tag', { customTags: 'tags', activeTag: 'active' }),
    isCustomCategoryActive() {
      return this.activeTagCategory === this.tagCategorys.custom
    },
  },
  methods: {
    handleSwitchActiveTag(tag) {
      this.$store.commit('tag/switchActive', tag)
    },
  },
}
</script>

<style lang="scss" scoped>
#sidebar {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 0 0 250px;
  height: 100%;
  color: #d9d9d9;
  background-color: #28343d;
}

@media (min-width: 1500px) {
  #sidebar {
    flex: 0 0 290px;
  }
}

.default-tags {
  display: flex;
  flex-direction: row;
  justify-content: center;

  height: 30px;
  .tagWrapper {
    width: 49%;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-left: 1px solid rgba(255, 255, 255, 0.1);

    padding: 5px 20px;
    flex: 1 1 auto;
    &.active {
      border-bottom-color: transparent;
      background-color: rgba(255, 255, 255, 0.1);
    }
    .tag {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}

.sidebar-main {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: auto;
}

.edit-tag-tip {
  overflow: hidden;
  height: 24px;
  font-size: 12px;
  line-height: 2;
  text-align: center;
  color: #919191;
  background-color: rgba(255, 255, 255, 0.1);
}

.tag-list__group {
  overflow-y: auto;
  overflow-x: hidden;
  flex: auto;
  position: relative;
}

.language-tags,
.custom-tags {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.no-tag {
  top: 40%;
  font-size: 14px;
  text-align: center;
  color: #919191;
}

.sidebar-footer {
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 29px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 14px;
  text-align: center;
  font-weight: 700;
  color: #919191;
  background-color: #28343d;
}

.author {
  font-size: inherit;
}

.author-name {
  color: inherit;
}
</style>

<style>
#sidebar .tags-nav {
  padding-left: 0;
  margin: 0;
  list-style: none;
}
</style>

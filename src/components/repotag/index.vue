<template>
  <li class="tag-item" @click.stop="handleToggleTag">
    <el-tag :class="{ clickable: !isEditingTags }" size="small" class="tag">
      <span>{{ tag.name }}</span>
      <el-popover title='Are you sure?' placement="right" @hide="handleHidePopover">
        <i v-show="!isEditingTags" :class="{ active: active }" slot="reference" class="tag-delete-btn" @click.stop="handleDeleteTag">&times;</i>
        <footer class="popover-footer">
          <el-button size="mini" @click="handleCancelDeleteTag">no</el-button>
          <el-button type="primary" size="mini" @click="handleConfirmDeleteTag">yes</el-button>
        </footer>
      </el-popover>
    </el-tag>
  </li>
</template>

<script>
import { mapState } from 'vuex'
import { notifyInfo } from '@/help/index'

export default {
  name: 'repo-tag',
  data() {
    return {
      active: false,
    }
  },
  props: {
    repo: { type: Object, required: true },
    tag: { type: Object, required: true },
  },
  computed: {
    ...mapState(['isEditingTags']),
    ...mapState({
      deleteTagDirect: state => state.settings.data.deleteTagDirect
    }),
  },
  methods: {
    handleToggleTag() {
      if (this.isEditingTags) return notifyInfo({ message: 'Edit state can not switch tag' })
      this.$store.commit('tag/switchActive', this.tag)
    },
    handleDeleteTag() {
      if (this.deleteTagDirect) {
        this.$store.dispatch('repo/deleteRepoTag', { repoId: this.repo.id, tagId: this.tag.id })
      } else {
        document.body.click()
        this.active = true
      }
    },
    handleCancelDeleteTag() {
      document.body.click()
    },
    handleConfirmDeleteTag() {
      document.body.click()
      this.$store.dispatch('repo/deleteRepoTag', { repoId: this.repo.id, tagId: this.tag.id })
    },
    handleHidePopover() {
      this.active = false
    },
  },
}
</script>

<style scoped lang="scss">
.tag-item {
  position: relative;
  margin-bottom: 0.3em;
  margin-right: 0.5em;
}

.tag {
  border: none;
}

.tag-delete-btn {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 14px;
  height: 14px;
  border: 1px solid rgba(66, 161, 255, .5);
  outline: none;
  border-radius: 50%;
  font-size: 14px;
  line-height: 11px;
  text-align: center;
  font-style: normal;
  color: rgba(66, 161, 255, .5);
  background-color: #fff;
  cursor: pointer;
  transform: scale(0);
  transition: transform .15s;
  &:hover, &:active {
    color: #fff;
    background-color: rgba(66, 161, 255, .8);
  }
}

.tag:hover .tag-delete-btn,
.tag-delete-btn:active {
  transform: scale(1);
}
</style>

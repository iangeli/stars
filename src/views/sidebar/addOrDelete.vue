<template>
  <div v-show="isLoadedData && isCustomCategoryActive" class="nav-caption">
    <div :class="{ disabled: isEditingTags || tagNameFormVisible }" class="nav-caption__operate-btn" @click="handleAddNewTag">
      <i class="fa fa-plus-square" aria-hidden="true"></i>
    </div>
    <div
      v-if="isEditingTags"
      key="ok"
      class="nav-caption__operate-btn nav-caption__ok-btn"
      @click="handleCompleteEditTags">
      <span>Done</span>
    </div>
    <div
      v-else
      :class="{ disabled: tagNameFormVisible || !customTags.length }"
      key="edit"
      class="nav-caption__operate-btn"
      @click="handleEditTags">
      <i class="fa fa-minus-square" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

let customTagsClone = null

export default {
  name: 'tag-nav-header',
  props: {
    isCustomCategoryActive: { type: Boolean, default: false },
    tagNameFormVisible: { type: Boolean, default: false },
  },
  computed: {
    ...mapState(['isEditingTags', 'isLoadedData']),
    ...mapState('tag', { customTags: 'tags' }),
  },
  watch: {
    customTags(newVal) {
      if (newVal && newVal.length === 0) {
        this.handleCompleteEditTags()
      }
    }
  },
  methods: {
    handleAddNewTag() {
      if (this.isEditingTags || this.tagNameFormVisible) return
      this.$emit('update:tagNameFormVisible', true)
    },
    handleEditTags() {
      if (this.tagNameFormVisible || !this.customTags.length) return
      customTagsClone = JSON.parse(JSON.stringify(this.customTags))
      this.$store.commit('toggleIsEditingTags', true)
    },
    handleCompleteEditTags() {
      this.$store.commit('toggleIsEditingTags', false)

      let isChanged = false
      if (customTagsClone === null) return
      for (const [index, { id, name }] of customTagsClone.entries()) {
        const tag = this.customTags[index]
        if (!tag || id !== tag.id || name !== tag.name) {
          isChanged = true
          break
        }
      }
      if (!isChanged) return

      this.$store.dispatch('updateGitstarsData')
        .catch(() => this.$store.dispatch('tag/resetTags', customTagsClone))
    },
  },
}
</script>

<style scoped lang="scss">
.nav-caption {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 12px;
  transition: all 0.3s;
  height: 30px;
  i {
    font-size: 16px;
  }
}

.nav-caption__operate-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  text-transform: capitalize;
  cursor: pointer;
  user-select: none;
  &.disabled {
    color: #919191;
    cursor: default;
  }
  &:hover {
    background-color: transparent;
  }
  .fa {
    margin-right: 5px;
  }
}

.nav-caption__ok-btn {
  background-color: rgba(255, 255, 255, 0.1);
  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
  &:active {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

</style>

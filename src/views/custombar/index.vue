<template>
  <draggable :list="customTags" :options="dragOptions" class="custom-tags">
    <transition-group name="tag-nav" tag="ul" class="tags-nav">
      <tag-nav-wrap v-for="tag of customTags" :key="tag.id" :tag="tag" is-custom-tag>
        <custom-tag-label :tag="tag" :isEditingTags="isEditingTags"></custom-tag-label>
        <custom-tag-delete-btn :visible="isEditingTags" :tag="tag"></custom-tag-delete-btn>
      </tag-nav-wrap>
    </transition-group>
  </draggable>
</template>

<script>
import { mapState } from 'vuex'
import Draggable from 'vuedraggable'
import TagNavWrap from '../language/cellwrap'
import CustomTagLabel from './editLb'
import CustomTagDeleteBtn from './deleteBtn'

export default {
  name: 'cutom-tags-nav',
  components: { Draggable, TagNavWrap, CustomTagLabel, CustomTagDeleteBtn },
  computed: {
    ...mapState(['isEditingTags']),
    ...mapState({
      sortTag: state => state.settings.data.sortTag
    }),
    customTags: {
      get() {
        const tags = this.$store.state.tag.tags
        switch (this.sortTag) {
          case 'Alphabet':
            tags.sort((a, b) => { return a.name > b.name ? 1 : -1 })
            break
          case 'Count':
            tags.sort((a, b) => { return b.repos.length - a.repos.length })
            break
          default: break
        }
        return tags
      },
      set(value) {
        this.$store.commit('tag/initTags', value)
      },
    },
    dragOptions() {
      return { disabled: !this.isEditingTags }
    },
  },
}
</script>

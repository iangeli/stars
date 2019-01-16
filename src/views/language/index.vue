<template>
  <ul class="tags-nav">
    <tag-nav-wrap v-for="tag of arr" :key="tag.id" :tag="tag">
      <div class="nav-item__label slo">
        <i :class="`${tag.icon || 'fa-tag'}`" class="fa fa-fw" aria-hidden="true"></i>
        <span class="nav-item__name slo">{{ tag.name || tag.key }}</span>
      </div>
      <slot></slot>
    </tag-nav-wrap>
  </ul>
</template>

<script>
import TagNavWrap from './cellwrap'
import { mapState } from 'vuex'
export default {
  name: 'tags-nav',
  components: { TagNavWrap },
  props: {
    tags: { type: Array, required: true },
  },
  computed: {
    ...mapState({
      sortLanguage: state => state.settings.data.sortLanguage
    }),
    arr() {
      switch (this.sortLanguage) {
        case 'Alphabet':
          this.tags.sort((a, b) => { return (a.name || '').toLowerCase() > (b.name || '').toLowerCase() ? 1 : -1 })
          break
        case 'Count':
          this.tags.sort((a, b) => { return b.repos.length - a.repos.length })
          break
        case 'User Design':
          break
        default: break
      }
      return this.tags
    },
  },
}
</script>

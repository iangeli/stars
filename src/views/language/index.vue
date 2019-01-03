<template>
  <ul class="tags-nav">
    <tag-nav-wrap v-for="tag of tags" :key="tag.id" :tag="tag">
      <div class="nav-item__label slo">
        <i :class="`${tag.icon || 'fa-tag'}`" class="fa fa-fw" aria-hidden="true"></i>
        <span class="nav-item__name slo">{{ tag.name || tag.key }}</span>
      </div>
    </tag-nav-wrap>
  </ul>
</template>

<script>
import TagNavWrap from './cellwrap'

export default {
  name: 'tags-nav',
  components: { TagNavWrap },
  props: {
    tags: { type: Array, required: true },
  },
}
</script>

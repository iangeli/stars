<template>
  <div class="content">
    <el-tabs
      v-model="current">
      <el-tab-pane label="General" name="setting"></el-tab-pane>
      <el-tab-pane label="UI" name="ui"></el-tab-pane>
      <el-tab-pane label="Sponsor" name="sponsor"></el-tab-pane>
      <el-tab-pane label="About" name="about"></el-tab-pane>
    </el-tabs>
    <div class="wrapper">
      <transition name="fade">
        <keep-alive>
          <component class="component" :is="current"></component>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
  import about from './about'
  import setting from './setting'
  import sponsor from './sponsor'
  import ui from './ui'

  export default {
    name: 'index',
    components: { ui, setting, about, sponsor },
    data() {
      return {
        current: 'setting'
      }
    },
  }
</script>

<style scoped  lang="sass">
  .content
    .wrapper
      position: relative
      width: 100%
      height: 300px
      overflow: hidden

      display: flex
      justify-content: center
      align-items: flex-start
      .component
        position: absolute
  .fade-enter
    transform: translateX(100%)
    opacity: 0
  .fade-enter-to, fade-leave
    transform: translateX(0)
  .fade-enter-active, .fade-leave-active
    transition: all 0.5s
  .fade-leave-to
    transform: translateX(-50%)
    opacity: 0
</style>

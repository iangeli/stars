<template>
  <div class="header">
    <div class="user-info">
      <a class="user" :href="`${user.html_url}?tab=repositories`" target="_blank" rel="noopener noreferrer">
        <img :src="user.avatar_url" class="user-avatar">
        <div class="user-name">{{ user.name }}</div>
      </a>
      <div class="set" @click="settingsClick">
        <i class="fa fa-cog" aria-hidden="true"></i>
      </div>
    </div>
    <el-dialog
      title="Settings"
      :visible.sync="showSettingDialog">
      <settings :login="user.login"></settings>
    </el-dialog>
  </div>

</template>

<script>
  import Settings from './Settings.vue'

  export default {
    name: 'header',
    components: { Settings },
    data() {
      return {
        user: window._gitstars.user,
        showSettingDialog: true,
      }
    },
    methods: {
      settingsClick() {
        this.showSettingDialog = true
      },
    }
  }
</script>

<style scoped  lang="sass">
  .setting
    z-index: 999
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%


  .user-info
    position: relative
    width: 100%
    height: 50px

    display: flex
    align-items: center
    .user
      flex: 1 1 auto
    .set
      margin-right: 16px
      color: white
  .user-avatar
    display: inline-block
    height: 40px
    margin: 5px 10px
    border-radius: 5%

  .user-name, .setting
    display: inline-block
    font-size: 20px
    line-height: 50px
    vertical-align: top
    height: 50px
    color: white

  a
    text-decoration: none

  .setting
    display: inline-block
    height: 50px
    position: absolute
    right: 10px

  @keyframes octocat-wave
    0%, 100%
      transform: rotate(0)
    20%, 60%
      transform: rotate(-25deg)
    40%, 80%
      transform: rotate(10deg)

</style>

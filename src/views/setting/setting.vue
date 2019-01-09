<template>
  <div class="content">
    <el-form
      label-position="left"
      size="mini"
      :model="settings"
      label-width="180px">
      <el-form-item label="Database Location: ">
        <a :href="`https://gist.github.com/${login}`" target="_blank">gist.github.com/{{login}}</a>
      </el-form-item>
      <el-form-item label="Database Name: ">
        {{fileName}}
      </el-form-item>
      <el-form-item label="Delete tag directly: ">
        <el-switch v-model="settings.deleteTagDirect"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import appConfig from '@/js/config'

  export default {
    name: 'settings',
    data() {
      return {
        login: window._gitstars.user.login,
        settings: this.$store.state.settings.data
      }
    },
    computed: {
      fileName() {
        return appConfig.filename
      }
    },
  }
</script>

<style scoped  lang="sass">
  .content
    padding: 0 30px

</style>

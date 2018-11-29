<template>
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
    <el-form-item label="Show Tags in Navigate: ">
      <el-switch v-model="settings.showTagsInNavigate"></el-switch>
    </el-form-item>
    <el-form-item label="Show Tags in ReadMe: ">
      <el-switch v-model="settings.showTagsInReadme"></el-switch>
    </el-form-item>
  </el-form>
</template>

<script>
  import appConfig from '@/config'

  export default {
    name: 'settings',
    props: {
      login: String
    },
    data() {
      return {
        settings: this.$store.state.settings.data
      }
    },
    computed: {
      fileName() {
        return appConfig.filename
      }
    },
    created() {
      console.log(this.settings)
    },
    updated() {
      this.$store.dispatch('settings/updateSettings', this.settings)
    },

  }
</script>

<style scoped  lang="sass">
  .el-form
    padding: 0 30px

</style>

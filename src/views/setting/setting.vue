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
      <el-form-item label="Sort Tag: ">
        <el-radio-group v-model="settings.sortTag">
          <el-radio-button label="Alphabet"></el-radio-button>
          <el-radio-button label="Count"></el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import appConfig from '@/js/config'

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
  }
</script>

<style scoped  lang="sass">
  .content
    padding: 0 30px

</style>

<template>
  <div class="content">
    <el-form
      label-position="left"
      size="mini"
      :model="settings"
      label-width="140px">
      <el-form-item label="Project Location: ">
        <a href="https://github.com/iangeli/stars" target="_blank">github.com/iangeli/stars</a>
      </el-form-item>
      <el-form-item label="Personal Blog: ">
        <a href="https://iangeli.com/" target="_blank">iangeli.com</a>
      </el-form-item>
      <el-form-item label="Feedback: ">
        <a href="mailto:harryzjm@live.com">harryzjm@live.com</a>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import appConfig from '@/js/config'

  export default {
    name: 'introduction',
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
  .el-form
    padding: 0 30px

</style>

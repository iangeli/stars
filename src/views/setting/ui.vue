<template>
  <div class="content">
    <el-form
      label-position="left"
      size="mini"
      :model="settings"
      label-width="230px">
      <el-form-item label="Show tags in Navigate: ">
        <el-switch v-model="settings.showTagsInNavigate"></el-switch>
      </el-form-item>
      <el-form-item label="Show tags in ReadMe: ">
        <el-switch v-model="settings.showTagsInReadme"></el-switch>
      </el-form-item>
      <el-form-item label="Show language Bar in ReadMe: ">
        <el-switch v-model="settings.showLanguageBarInReadme"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'ui',
    props: {
      login: String
    },
    data() {
      return {
        settings: this.$store.state.settings.data
      }
    },
  }
</script>

<style scoped  lang="sass">
  .content
    padding: 0 30px

</style>

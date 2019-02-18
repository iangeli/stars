<template>
  <div class="content">
    <el-table
      class="shortcutsTable"
      :data="shortcuts">
      <el-table-column
        prop="key"
        label="Key"
        width="100">
      </el-table-column>
      <el-table-column
        prop="descript"
        label="Description"
        width="250">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'shortcuts',
    data() {
      return {
        shortcuts: [
          { key: 'S', descript: 'Focus search repo input' },
          { key: 'I', descript: 'Focus add tags input' },
          { key: 'N', descript: 'Next repo' }
        ]
      }
    }
  }
</script>

<style scoped  lang="sass">


</style>

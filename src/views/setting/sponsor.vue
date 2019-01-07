<template>
  <div class="content">
    <div class="info" v-html="info"></div>
    <div class="method">
      <img src="https://i.imgur.com/mUZHs67.jpg" class="pay">
      <img src="https://i.imgur.com/xemwztU.jpg" class="pay">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sponsor',
    computed: {
      info() {
        const info = 'Stars Manager is an MIT licensed open source project and completely free to use. However, the amount of effort needed to maintain and develop new features for the project is not sustainable without proper financial backing. You can support Stars Manager development via the following methods:'
        return this.highlightKey(info, 'Stars Manager', 'rgb(3,102,214)')
      },
    },
    methods: {
      highlightKey(text, key, color) {
        if (key && key.length > 0) {
          return text.replace(new RegExp(key, 'g'), `<span style="color: ${color};">${key}</span>`)
        } else {
          return text
        }
      },
    }
  }
</script>

<style scoped  lang="sass">
  .content
    padding: 0 10%
    .info
      font-size: 15px
    .method
      display: flex
      justify-content: flex-start
      align-items: center
      margin-top: 10px
      .pay
        width: 150px
        height: 150px
      .pay + .pay
        margin-left: 30px
</style>

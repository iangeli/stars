<template>
    <div class="user-info">
      <a :href="`${user.html_url}?tab=repositories`" target="_blank" rel="noopener noreferrer">
        <img :src="user.avatar_url" class="user-avatar">
        <div class="user-name">{{ user.name }}</div>
      </a>
    </div>
</template>

<script>

export default {
  name: 'header',
  data() {
    return {
      user: window._gitstars.user,
    }
  },
}
</script>

<style scoped  lang="sass">
.user-info
  position: relative
  width: 100%
  height: 50px

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

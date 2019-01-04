<template>
  <div
    class="dragview"
    :class="{ active , dragging}"
    @mousedown.stop="elmDown"
    :style="style">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'dragview',
    props: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
      parent: { type: Boolean, default: true }, // 是否只能在父级元素中拖动
    },
    data() {
      return {
        top: this.y,
        left: this.x,
        width: 0,
        height: 0,
        dragging: false,
        active: false,
        parentX: 0,
        parentW: 9999,
        parentY: 0,
        parentH: 9999,
        mouseX: 0,
        mouseY: 0,
        lastMouseX: 0,
        lastMouseY: 0,
        mouseOffX: 0,
        mouseOffY: 0,
        elmX: 0,
        elmY: 0,
        elmW: 0,
        elmH: 0
      }
    },
    mounted() {
      if (this.parent) this.calculationParent()

      // 是否支持passive
      try {
        window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
          get() { this.passiveSupported = true }
        }))
      } catch (e) {
        console.log(e)
      }
    },
    methods: {
      calculationParent() {
        this.parentW = parseInt(this.$el.parentNode.clientWidth, 10)
        this.parentH = parseInt(this.$el.parentNode.clientHeight, 10)

        if ((this.x + this.width) > this.parentW) this.left = this.parentW - this.width
        if ((this.y + this.height) > this.parentH) this.top = this.parentH - this.height
      },
      elmDown(e) {
        e.preventDefault()
        const passiveSupported = this.passiveSupported ? { passive: true } : true

        const target = e.target || e.srcElement
        if (this.$el.contains(target)) {
          if (!this.active) {
            this.lastMouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
            this.lastMouseY = e.pageY || e.clientY + document.documentElement.scrollTop
            document.documentElement.addEventListener('mousemove', this.handleMove, passiveSupported)
            document.documentElement.addEventListener('mousedown', this.deselect, passiveSupported)
            document.documentElement.addEventListener('mouseup', this.handleUp, passiveSupported)
            this.active = true
            this.$emit('activated')
          }
          this.elmX = parseInt(this.left)
          this.elmY = parseInt(this.top)
          this.elmW = this.$el.offsetWidth || this.$el.clientWidth
          this.elmH = this.$el.offsetHeight || this.$el.clientHeight
          this.dragging = true
        }
      },
      deselect(e) {
        this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
        this.mouseY = e.pageY || e.clientY + document.documentElement.scrollTop
        this.lastMouseX = this.mouseX
        this.lastMouseY = this.mouseY

        const target = e.target || e.srcElement
        if (!this.$el.contains(target) && this.active) {
          document.documentElement.removeEventListener('mousemove', this.handleMove, true)
          document.documentElement.removeEventListener('mousedown', this.deselect, true)
          document.documentElement.removeEventListener('mouseup', this.handleUp, true)
          this.active = false
          this.$emit('deactivated')
        }
      },
      handleMove(e) {
        this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
        this.mouseY = e.pageY || e.clientY + document.documentElement.scrollTop
        let diffX = this.mouseX - this.lastMouseX + this.mouseOffX
        let diffY = this.mouseY - this.lastMouseY + this.mouseOffY
        this.mouseOffX = this.mouseOffY = 0
        this.lastMouseX = this.mouseX
        this.lastMouseY = this.mouseY
        if (this.dragging) {
          if (this.parent) {
            if (this.elmX + diffX < this.parentX) this.mouseOffX = (diffX - (diffX = this.parentX - this.elmX))
            else if (this.elmX + this.elmW + diffX > this.parentW) this.mouseOffX = (diffX - (diffX = this.parentW - this.elmX - this.elmW))
            if (this.elmY + diffY < this.parentY) this.mouseOffY = (diffY - (diffY = this.parentY - this.elmY))
            else if (this.elmY + this.elmH + diffY > this.parentH) this.mouseOffY = (diffY - (diffY = this.parentH - this.elmY - this.elmH))
          }
          this.elmX += diffX
          this.elmY += diffY
          this.left = this.elmX
          this.top = this.elmY
          this.$emit('dragging', this.left, this.top)
        }
      },
      handleUp() {
        if (this.dragging) {
          this.dragging = false
          this.$emit('dragstop', [this.left, this.top])
        }
        this.elmX = this.left
        this.elmY = this.top
      }
    },
    watch: {
      x(newVal) {
        if (isNaN(newVal)) {
          console.error('传入x值为空!')
        } else {
          this.left = newVal
        }
      },
      y(newVal) {
        if (isNaN(newVal)) {
          console.error('传入y值为空!')
        } else {
          this.top = newVal
        }
      },
    },
    computed: {
      style() {
        return {
          top: this.top + 'px',
          left: this.left + 'px'
        }
      }
    }
  }
</script>

<style scoped>
  .dragview {
    position: absolute;
  }
</style>

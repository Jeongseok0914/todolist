<template>
  <transition :name="transitionName">
    <div v-show="visible" :style="customStyle" class="back-to-ceiling" @click="backToTop">
      <svg-icon name="part03-s-arrow-circle-up" class="backTopIcon" style="width: 2em;height: 2em;" />
      <!-- <svg-icon name="part03-s-arrow-circle-up" /> -->
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import SvgIcon from 'vue-svgicon'

@Component({
  name: 'BackToTop'
})
export default class extends Vue {
  @Prop({ default: 400 }) private visibilityHeight!: number
  @Prop({ default: 'fade' }) private transitionName!: string
  @Prop({ default: 0 }) private backPosition!: number
  @Prop({
    default: () => {
      return {
        right: '1.5%',
        bottom: '3%',
        width: '40px',
        height: '40px',
        // 'border-radius': '50%',
        'line-height': '45px'
        // 'border-style': 'solid',
        // 'border-width': '1px',
        // 'border-color': '#409eff',
        // 'box-shadow': '3px 3px 10px #B7DAFF'
        // 'box-shadow': '3px 3px 10px #E8E8E8'
        // 'border-color': '#e6ebf5',
      }
    }
  })
  private customStyle!: object

  private visible = false
  private isMoving = false
  private interval?: number

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  private handleScroll() {
    this.visible = window.pageYOffset > this.visibilityHeight
  }

  private backToTop() {
    if (this.isMoving) return
    const start = window.pageYOffset
    let i = 0
    this.isMoving = true
    const interval = setInterval(() => {
      const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500))
      if (next <= this.backPosition) {
        window.scrollTo(0, this.backPosition)
        clearInterval(interval)
        this.isMoving = false
      } else {
        window.scrollTo(0, next)
      }
      i++
    }, 16.7)
  }

  private easeInOutQuad(t: number, b: number, c: number, d: number) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t + b
    return (-c / 2) * (--t * (t - 2) - 1) + b
  }
}
</script>

<style lang="scss" scoped>
.back-to-ceiling {
  position: fixed;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  z-index: 1;
  :hover {
    background: #d5dbe7;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.back-to-ceiling .backTopIcon {
  //fill: #2d3032;
  fill: #409eff;
  background: none;
}
</style>

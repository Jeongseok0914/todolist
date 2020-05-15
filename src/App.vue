<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { localize } from 'vee-validate'

@Component({
  name: 'App',
  components: {}
})
export default class extends Vue {
  created() {
    localize('ko')
  }
}
</script>

<style lang="sass"></style>

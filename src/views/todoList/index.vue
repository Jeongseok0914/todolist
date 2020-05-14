<template>
  <div class="title-css">
    {{ title }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { TodoListStoreModule } from '@/store/todoList/store'

@Component({
  name: 'TodoListIndex'
})
export default class extends Vue {
  get title() {
    return TodoListStoreModule.title
  }
}
</script>

<style lang="scss" scoped>
  .title-css {
    color: red;
  }
</style>

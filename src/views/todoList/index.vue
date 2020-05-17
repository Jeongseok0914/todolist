<template>
  <div>
    <h3 class="title">TO-DO LIST</h3>
    <todo-list-collapse />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TodoListCollapse from './TodoListCollapse.vue'

@Component({
  name: 'TodoListIndex',
  components: { TodoListCollapse }
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.title {
  font-size: 3vw;
  font-weight: 800;
  color: #3888fa;
}
.addBtn {
  text-align: right;
}
</style>

<template>
  <div>
    <h3 class="title">TO-DO LIST</h3>
    <div><el-button type="primary" @click.native="isShowRegister = true">ADD</el-button></div>
    <todo-list-content />
    <regster-popup :visible.sync="isShowRegister" :show-dialog="isShowRegister" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TodoListContent from './TodoListContent.vue'
import RegsterPopup from './RegsterPopup.vue'

@Component({
  name: 'TodoListIndex',
  components: { TodoListContent, RegsterPopup }
  
})
export default class extends Vue {
  private isShowRegister: boolean = false

}
</script>

<style lang="scss" scoped>
  .title {
    font-size: 3vw;
    font-weight: 800;
    color: #EBB5F8;
  }
</style>

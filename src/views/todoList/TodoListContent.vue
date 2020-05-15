<template>
  <el-collapse class="el-collapse-area" v-model="collapseActive" accordion @change="tempContents">
    <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css" />
    <transition name="custom-classes-transition" mode="in-out" enter-active-class="animated tada" leave-active-class="animated bounceOutRight">
      <draggable>
        <el-collapse-item v-for="item in todoListItem" :key="item.key" style="width:50%; margin-left:25%;">
          <template slot="title" style="border-top: 4px solid black;">
            <el-checkbox v-model="item.todoListStatus" />
            <el-divider direction="vertical" />
            <span v-bind:class="{ 'is-check': item.todoListStatus }" class="line-item-nm"> Title : [ {{ item.todoListTitle }} ] </span>
            <el-divider direction="vertical" />
            <div class="line-item-ck" v-bind:class="{ 'is-check': item.todoListStatus }">등록일 : {{ item.todoListDate || '없음' }}</div>
            <el-divider direction="vertical" />
            <div class="line-item-ck" v-bind:class="{ 'is-check': item.todoListStatus }">목표일 : {{ item.todoListDate || '없음' }}</div>
          </template>
          <div class="collapse_contents_warpper" style="height:190px;">
            <div class="child-title-text">[ ToDo List Content ]</div>
            <el-button type="text" @click.native="deleteItem(item)">Edit</el-button>
            <el-divider direction="vertical" />
            <el-button type="text" @click.native="deleteItem(item)">Delete</el-button>
            <div class="child-title-text" style="text-align:left; margin-top:1%;">
              <el-input v-model="item.todoListContent" type="textarea" :autosize="{ minRows: 4, maxRows: 5 }" />
            </div>
          </div>
        </el-collapse-item>
      </draggable>
    </transition>
  </el-collapse>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { TodoListStoreModule } from '@/store/todoList/store'
import draggable from 'vuedraggable'
@Component({
  name: 'TodoListContent',
  components: { draggable }
})
export default class extends Vue {
  private collapseActive: string[] = []
  get todoListItem() {
    return TodoListStoreModule.todoListItem
  }

  private tempContents() {
    console.log('this.collapseActive===>', this.collapseActive)
  }
  private deleteItem(item: any) {
    console.log(item)
    TodoListStoreModule.delTodoListItem(item)
  }
}
</script>

<style lang="scss" scoped>
.line-item-nm {
  width: 37vw;
  text-align: left;
  font-size: 1.4vh;
  font-weight: bold;
}

.line-item-ck {
  width: 11vw;
  font-size: 1.4vh;
  font-weight: bold;
}
.is-check {
  text-decoration: line-through;
}
</style>

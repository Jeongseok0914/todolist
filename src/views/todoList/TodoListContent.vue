<template>
  <el-collapse class="el-collapse-area" v-model="collapseActive" accordion @change="tempContents">
    <el-collapse-item v-for="item in todoListItem" :key="item.key" style="width:50%; margin-left:25%;">
        <template slot="title">
            <el-checkbox v-model="item.todoListSucces" />
            <span class="line-item-ck"> [ {{ item.todoListSucces === true ? '완료' : '미완료' }} ] </span>
            <el-divider direction="vertical" />
            <span class="line-item-nm"> 제목 : [ {{ item.todoListTitle }} ] </span>
            <el-divider direction="vertical" />
            <span class="line-item-nm"> 완료일 : [ {{ item.todoListDate || '없음'}} ] </span>
            <el-divider direction="vertical" />
            <el-button type="text" @click.native="deleteItem(item)">Edit</el-button>
            <el-divider direction="vertical" />
            <el-button type="text" @click.native="deleteItem(item)">Delete</el-button>
        </template>
        <div class="collapse_contents_warpper">
            <div class="child-title-text">
                [ ToDo List Content ]
            </div>
             <div class="child-title-text">
                {{ item.todoListContent }}
            </div>
        </div>
    </el-collapse-item> 
  </el-collapse>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { TodoListStoreModule } from '@/store/todoList/store'

@Component({
  name: 'TodoListContent'
})
export default class extends Vue {
 private collapseActive: string[] = [] 
 get todoListItem() {
    return TodoListStoreModule.todoListItem
  }

  private tempContents() {
    console.log('this.collapseActive===>',this.collapseActive);
  }
  private deleteItem(item: any) {
    console.log(item);
  }
}
</script>

<style lang="scss" scoped>
.line-item-nm {
  width: 16vw;
  font-size: 1.4vh;
  font-weight: bold;
}

.line-item-ck {
  width: 4vw;
  font-size: 1.4vh;
  font-weight: bold;
}

</style>

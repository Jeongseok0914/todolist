<template>
  <div>
    <div class="add-btn">
      <el-button type="primary" icon="el-icon-edit" circle @click.native="isShowRegister = true"></el-button>
    </div>
    <el-collapse class="el-collapse-area" v-model="collapseActive" accordion>
      <draggable v-model="todoListItem">
        <transition-group name="list" tag="p">
          <div v-for="item in todoListItem" :key="item.uuid">
            <el-collapse-item style="width:50%; margin-left:25%;">
              <template slot="title" style="border-top: 4px solid black;">
                <el-checkbox v-model="item.status" />
                <el-divider direction="vertical" />
                <span v-bind:class="{ 'is-check': item.status, 'is-last-date': item.status === false && item.tagetDate < Date.now() && item.tagetDate !== '' }" class="line-item-nm">
                  Title : [ {{ item.titleNm }} ]
                </span>
                <el-divider direction="vertical" />
                <div class="line-item-ck" v-bind:class="{ 'is-check': item.status, 'is-last-date': item.status === false && item.tagetDate < Date.now() && item.tagetDate !== '' }">
                  등록일 : {{ formatDate(item.createDate) }}
                </div>
                <el-divider direction="vertical" />
                <div class="line-item-ck" v-bind:class="{ 'is-check': item.status, 'is-last-date': item.status === false && item.tagetDate < Date.now() && item.tagetDate !== '' }">
                  마감일 : {{ formatDate(item.tagetDate) }}
                </div>
              </template>
              <div class="collapse_contents_warpper" style="height:190px;">
                <el-button type="text" @click.native="editPropItem(item)" style="color:green;">Edit</el-button>
                <el-divider direction="vertical" />
                <el-button type="text" @click.native="deleteItem(item)" style="color:red;">Delete</el-button>
                <div class="child-title-text" style="text-align:left; margin-top:1%; margin-left:5%">
                  <el-input v-model="item.content" type="textarea" :autosize="{ minRows: 4, maxRows: 5 }" :disabled="true" />
                </div>
              </div>
            </el-collapse-item>
          </div>
        </transition-group>
      </draggable>
    </el-collapse>
    <regster-todo-item :visible.sync="isShowRegister" :show-dialog="isShowRegister" />
    <edit-todo-item :visible.sync="isShowEdit" :show-dialog="isShowEdit" :prop-uuid="editUuid" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { TodoListStoreModule } from '@/store/todoList/store'
import { TodoItemInfo } from '@/store/todoList/type'
import { MessageService } from '@/utils/supportUtil'
import moment from 'moment'
import draggable from 'vuedraggable'
import RegsterTodoItem from './popup/RegsterTodoItem.vue'
import EditTodoItem from './popup/EditTodoItem.vue'
@Component({
  name: 'TodoListContent',
  components: { draggable, EditTodoItem, RegsterTodoItem }
})
export default class extends Vue {
  private collapseActive: string[] = []
  private isShowEdit: boolean = false
  private isShowRegister: boolean = false
  private editUuid: string = ''

  get todoListItem() {
    const warningData = TodoListStoreModule.todoListItem.filter(item => {
      if (item.status === false && item.tagetDate < Date.now() && item.tagetDate !== '') {
        return { ...item }
      }
    })
    if (warningData.length > 0) {
      MessageService.messageWarning(warningData.length + ' 건 Todo Item 기한이 지났습니다.')
    }
    return TodoListStoreModule.todoListItem
  }

  set todoListItem(item) {
    TodoListStoreModule.changeSortByTodoList(item)
  }

  private formatDate(date) {
    return date !== '' ? moment(date).format('YYYY-MM-DD') : ''
  }

  private editPropItem(item: any) {
    this.isShowEdit = true
    this.editUuid = item.uuid
  }

  private deleteItem(item: any) {
    MessageService.MsgBoxConfirm(['삭제 하시겠습니까?', '확인', '확인', '취소'])
      .then(async result => {
        await TodoListStoreModule.deleteTodoItem(item).then(resovle => {
          if (resovle === 200) {
            this.collapseActive = []
            MessageService.notiSuccess('삭제 되었습니다.')
          } else {
            MessageService.notiError('삭제 실패.')
          }
        })
      })
      .catch(() => {})
  }
}
</script>

<style lang="scss">
.add-btn {
  text-align: right;
  margin-right: 26%;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.line-item-nm {
  width: 30vw;
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
.el-textarea.is-disabled .el-textarea__inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: grey;
  font-weight: 800;
  cursor: not-allowed;
}
.is-last-date {
  color: red;
  font-weight: bold;
}
</style>

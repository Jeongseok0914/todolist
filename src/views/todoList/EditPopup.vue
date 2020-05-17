<template>
  <div class="dialog-container">
    <el-dialog :visible.sync="dialogVisible" title="TO-DO LIST EDIT" :before-close="handleClose" width="500px" top>
      <ValidationObserver ref="editForm" tag="form">
        <el-row>
          <el-col>
            <el-form label-width="110px">
              <el-form-item label="TARGET DAY ">
                <el-date-picker v-model="todoListInfo.tagetDate" type="date" placeholder="Pick a day" :picker-options="pickerOptions" />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form label-width="110px">
              <ValidationProvider name="TITLE" rules="required|max:20">
                <el-form-item slot-scope="{ errors }" :error="errors[0]" label="TITLE ">
                  <el-input v-model="todoListInfo.titleNm" />
                </el-form-item>
              </ValidationProvider>
            </el-form>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form label-width="110px">
              <ValidationProvider name="CONTENT" rules="max:100">
                <el-form-item slot-scope="{ errors }" :error="errors[0]" label="CONTENT ">
                  <el-input type="textarea" v-model="todoListInfo.content" />
                </el-form-item>
              </ValidationProvider>
            </el-form>
          </el-col>
        </el-row>
      </ValidationObserver>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click.native="editTodoItem">
          Edit Now
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { todoListItemInfo } from '@/store/todoList/type'
import { TodoListStoreModule } from '@/store/todoList/store'
import { MessageService } from '@/utils/supportUtil'
import { Debounce } from 'vue-debounce-decorator'
import moment from 'moment'
@Component({
  name: 'EditPopup'
})
export default class extends Vue {
  @Prop({ default: false }) private showDialog!: boolean
  @Prop({ required: true }) private propUuid!: string

  private todoListInfo: todoListItemInfo = {
    sortNum: 0,
    uuid: '',
    titleNm: '',
    content: '',
    createDate: '',
    tagetDate: '',
    status: false
  }

  private pickerOptions = {
    disabledDate(time) {
      return time.getTime() < Date.now()
    }
  }

  $refs!: { editForm: any }

  get dialogVisible() {
    const editItem: todoListItemInfo = TodoListStoreModule.todoListItem.find(item => {
      if (item.uuid === this.propUuid) {
        return { ...item }
      }
    })
    if (editItem) {
      this.todoListInfo.titleNm = editItem.titleNm
      this.todoListInfo.content = editItem.content
      this.todoListInfo.sortNum = editItem.sortNum
      this.todoListInfo.createDate = editItem.createDate
      this.todoListInfo.tagetDate = editItem.tagetDate
      this.todoListInfo.status = editItem.status
      this.todoListInfo.uuid = editItem.uuid
    }
    return this.showDialog
  }
  set dialogVisible(val) {
    this.$emit('update:visible', val)
  }

  private async close(done: any) {
    await this.$refs.editForm.reset()
    this.todoListInfo.titleNm = ''
    this.todoListInfo.content = ''
    this.todoListInfo.sortNum = 0
    this.todoListInfo.createDate = ''
    this.todoListInfo.tagetDate = ''
    this.todoListInfo.status = false
    this.todoListInfo.uuid = ''
    this.dialogVisible = false
  }
  private handleClose(done: any) {
    this.close(done)
  }

  private editTodoItem(done: any) {
    const payload: todoListItemInfo = {
      sortNum: this.todoListInfo.sortNum,
      uuid: this.todoListInfo.uuid,
      titleNm: this.todoListInfo.titleNm,
      content: this.todoListInfo.content,
      createDate: this.todoListInfo.createDate,
      tagetDate: moment(this.todoListInfo.tagetDate).format('YYYY-MM-DD'),
      status: this.todoListInfo.status
    }

    this.$refs.editForm.validate().then(result => {
      if (result) {
        MessageService.MsgBoxConfirm(['수정 하시겠습니까?', '확인', '확인', '취소']).then(async result => {
          await TodoListStoreModule.editTodoListItem(payload).then(resovle => {
            if (resovle === 200) {
              MessageService.notiSuccess('수정 되었습니다.')
              this.close(done)
            } else {
              MessageService.notiError('수정 실패.')
            }
          })
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped></style>

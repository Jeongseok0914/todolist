<template>
  <div class="dialog-container">
    <el-dialog :visible.sync="dialogVisible" title="TO-DO LIST ADD" :before-close="handleClose" width="500px" top>
      <ValidationObserver ref="registerForm" tag="form">
        <el-row>
          <el-col>
            <el-form label-width="110px">
              <el-form-item label="TARGET DAY ">
                <el-date-picker v-model="todoListItem.tagetDate" type="date" placeholder="Pick a day" :picker-options="pickerOptions" />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form label-width="110px">
              <ValidationProvider name="TITLE" rules="required|max:20">
                <el-form-item slot-scope="{ errors }" :error="errors[0]" label="TITLE ">
                  <el-input v-model="todoListItem.titleNm" />
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
                  <el-input type="textarea" v-model="todoListItem.content" />
                </el-form-item>
              </ValidationProvider>
            </el-form>
          </el-col>
        </el-row>
      </ValidationObserver>

      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click.native="addTodoItem">
          Regsteration Now
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { todoListItemInfo } from '@/store/todoList/type'
import { TodoListStoreModule } from '@/store/todoList/store'
import { SupportService, MessageService } from '@/utils/supportUtil'
import { Debounce } from 'vue-debounce-decorator'
import moment from 'moment'

@Component({
  name: 'RegsterPopup'
})
export default class extends Vue {
  @Prop({ default: false }) private showDialog!: boolean
  $refs!: { registerForm: any }
  private todoListItem: todoListItemInfo = {
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

  get dialogVisible() {
    return this.showDialog
  }
  set dialogVisible(val) {
    this.$emit('update:visible', val)
  }

  private async close(done: any) {
    await this.$refs.registerForm.reset()
    this.todoListItem.titleNm = ''
    this.todoListItem.content = ''
    this.todoListItem.tagetDate = ''
    this.dialogVisible = false
  }

  private handleClose(done: any) {
    this.close(done)
  }

  @Debounce(500)
  private addTodoItem(done: any) {
    const payload: todoListItemInfo = {
      sortNum: TodoListStoreModule.todoListItem.length + 1,
      uuid: SupportService.getUuid(),
      titleNm: this.todoListItem.titleNm,
      content: this.todoListItem.content,
      createDate: moment(),
      tagetDate: moment(this.todoListItem.tagetDate),
      status: this.todoListItem.status
    }

    this.$refs.registerForm.validate().then(result => {
      if (result) {
        MessageService.MsgBoxConfirm(['등록 하시겠습니까?', '확인', '확인', '취소']).then(async result => {
          await TodoListStoreModule.setTodoListItem(payload).then(resovle => {
            if (resovle === 200) {
              MessageService.notiSuccess('등록되었습니다.')
              this.close(done)
            } else {
              MessageService.notiError('등록실패.')
            }
          })
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped></style>

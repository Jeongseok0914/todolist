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
import { cloneDeep } from 'lodash'
import { Debounce } from 'vue-debounce-decorator'
import { DEFAULT_TODOLIST, DEFAULT_PICKER_OPTIONS } from '@/store/todoList/default'
import moment from 'moment'

@Component({
  name: 'EditPopup'
})
export default class extends Vue {
  $refs!: { editForm: any }
  @Prop({ default: false }) private showDialog!: boolean
  @Prop({ required: true }) private propUuid!: string

  private todoListInfo: todoListItemInfo = cloneDeep(DEFAULT_TODOLIST)
  private pickerOptions = cloneDeep(DEFAULT_PICKER_OPTIONS)

  get dialogVisible() {
    const editItem: todoListItemInfo = TodoListStoreModule.todoListItem.find(item => {
      if (item.uuid === this.propUuid) {
        return { ...item }
      }
    })
    if (editItem) {
      this.todoListInfo = cloneDeep(editItem)
    }
    return this.showDialog
  }
  set dialogVisible(val) {
    this.$emit('update:visible', val)
  }

  private async close(done: any) {
    await this.$refs.editForm.reset()
    this.todoListInfo = cloneDeep(DEFAULT_TODOLIST)
    this.dialogVisible = false
  }
  private handleClose(done: any) {
    this.close(done)
  }

  private editTodoItem(done: any) {
    const payload: todoListItemInfo = this.todoListInfo
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

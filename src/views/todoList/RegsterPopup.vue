<template>
  <div class="dialog-container">
    <el-dialog :visible.sync="dialogVisible" title="TO-DO LIST ADD" :before-close="handleClose" width="500px" top>
      <ValidationObserver ref="registerForm" tag="form">
        <el-row>
          <el-col>
            <el-form label-width="110px">
              <el-form-item label="TARGET DAY ">
                <el-date-picker v-model="todoListItem.todoListDate" type="date" placeholder="Pick a day" />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form label-width="110px">
              <el-form-item label="TITLE ">
                <el-input v-model="todoListItem.todoListTitle" />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form label-width="110px">
              <el-form-item label="CONTENT ">
                <el-input type="textarea" v-model="todoListItem.todoListContent" />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </ValidationObserver>
      <div slot="footer" class="dialog-footer">
        <el-button type="text">
          Regsteration Now
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { todoListItemInfo } from '@/store/todoList/type'
@Component({
  name: 'RegsterPopup'
})
export default class extends Vue {
  @Prop({ default: false }) private showDialog!: boolean
  private todoListItem: todoListItemInfo = {
    todoListTitle: '',
    todoListContent: '',
    todoListDate: '',
    todoListStatus: false
  }

  $refs!: { registerForm: any }

  get dialogVisible() {
    return this.showDialog
  }
  set dialogVisible(val) {
    this.$emit('update:visible', val)
  }
  private async close(done: any) {
    await this.$refs.registerForm.reset()
    this.dialogVisible = false
  }
  private handleClose(done: any) {
    this.close(done)
  }
}
</script>

<style lang="scss" scoped></style>

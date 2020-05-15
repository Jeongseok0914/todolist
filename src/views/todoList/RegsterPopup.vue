<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" title="TO-DO LIST ADD" :before-close="handleClose" width="500px" top>
      <ValidationObserver ref="registerForm" tag="form">
        <el-row>
          123
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

@Component({
  name: 'RegsterPopup'
})
export default class extends Vue {
  @Prop({ default: false }) private showDialog!: boolean

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

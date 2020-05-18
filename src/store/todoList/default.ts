import { TodoItemInfo } from './type'
import { SupportService } from '@/utils/supportUtil'
import moment from 'moment'

export const DEFAULT_TODOLIST: TodoItemInfo = {
  titleNm: '',
  content: '',
  sortNum: 0,
  createDate: moment(),
  tagetDate: '',
  status: false,
  uuid: ''
}

export const DEFAULT_PICKER_OPTIONS: any = {
  disabledDate(time: any) {
    return time.getTime() < Date.now()
  }
}

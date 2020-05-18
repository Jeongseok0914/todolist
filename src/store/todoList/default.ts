import { todoListItemInfo } from './type'
import { SupportService } from '@/utils/supportUtil'
import moment from 'moment'

export const DEFAULT_TEMPLIST: todoListItemInfo[] = [
  {
    sortNum: 1,
    uuid: 'a67ce701-a3f3-7335-a62f-df73722b6491',
    titleNm: '공과금 납부일1',
    content: '전기요금, 보일러 요금 전기요금, 보일러 요금 전기요금, 보일러 요금',
    createDate: moment(),
    tagetDate: moment().add(4, 'days'),
    status: true
  },
  {
    sortNum: 2,
    uuid: '4bb91d95-75ce-6790-1a21-983baee69f83',
    titleNm: '공과금 납부일2',
    content: '전기요금, 보일러 요금 전기요금, 보일러 요금 전기요금, 보일러 요금',
    createDate: moment(),
    tagetDate: moment().add(8, 'days'),
    status: false
  },
  {
    sortNum: 3,
    uuid: 'ccfe7225-aff3-9983-efa3-ce0d383fa20a',
    titleNm: '공과금 납부일3',
    content: '전기요금, 보일러 요금 전기요금, 보일러 요금 전기요금, 보일러 요금',
    createDate: moment(),
    tagetDate: moment().subtract(4, 'days'),
    status: false
  },
  {
    sortNum: 4,
    uuid: 'ccfe7225-aff3-9983-efa3-ce0d383fa20b',
    titleNm: '공과금 납부일4',
    content: '전기요금, 보일러 요금 전기요금, 보일러 요금 전기요금, 보일러 요금',
    createDate: moment(),
    tagetDate: moment().subtract(1, 'days'),
    status: false
  }
]

export const DEFAULT_TODOLIST: todoListItemInfo = {
  titleNm: '',
  content: '',
  sortNum: 0,
  createDate: moment(),
  tagetDate: '',
  status: false,
  uuid: SupportService.getUuid()
}

export const DEFAULT_PICKER_OPTIONS: any = {
  disabledDate(time: any) {
    return time.getTime() < Date.now()
  }
}

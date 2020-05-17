export interface TodoListState {
  todoListItem: todoListItem[]
}

export interface todoListItemInfo {
  sortNum: number
  uuid: string
  titleNm: string
  content: string
  createDate: date
  tagetDate: date
  status: boolean
}

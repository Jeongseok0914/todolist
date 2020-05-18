export interface TodoListState {
  todoListItem: TodoItemInfo[]
}

export interface TodoItemInfo {
  sortNum: number
  uuid: string
  titleNm: string
  content: string
  createDate: date
  tagetDate: date
  status: boolean
}

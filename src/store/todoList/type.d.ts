export interface TodoListState {
  todoListItem: todoListItem[]
}

export interface todoListItem {
  todoListTitle: string
  todoListContent: string
  todoListDate: string
  todoListSucces: boolean
}

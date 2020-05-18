import { TodoItemInfo } from './type'

export const SelectService = {
  editTodoListItem: (todoList: TodoItemInfo[], todoItem: TodoItemInfo) => {
    return todoList.map(item => {
      if (item.uuid === todoItem.uuid) {
        item.content = todoItem.content
        item.titleNm = todoItem.titleNm
        item.tagetDate = todoItem.tagetDate
      }
      return { ...item }
    })
  }
}

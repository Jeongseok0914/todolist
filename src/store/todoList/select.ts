import { todoListItemInfo } from './type'

export const SelectService = {
  editTodoListItem: (todoList: todoListItemInfo[], todoItem: todoListItemInfo) => {
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

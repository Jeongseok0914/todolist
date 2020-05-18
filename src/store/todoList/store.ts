import store from '@/store'

import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { TodoListState, TodoItemInfo } from './type'
import { DEFAULT_TEMPLIST } from './temp'
import { cloneDeep } from 'lodash'
import { SupportService } from '@/utils/supportUtil'
import { SelectService } from './select'

@Module({ dynamic: true, store, name: 'todoListStore' })
class TodoListStore extends VuexModule implements TodoListState {
  public todoListItem = cloneDeep(DEFAULT_TEMPLIST)

  @Mutation
  private CHANGE_SORT_TODO_LIST(payload: TodoItemInfo[]) {
    this.todoListItem = payload
  }

  @Mutation
  private REGSTER_TODO_LIST(payload: TodoItemInfo) {
    this.todoListItem.unshift(payload)
  }

  @Mutation
  private EDIT_TODO_LIST(payload: TodoItemInfo) {
    this.todoListItem = SelectService.editTodoListItem(this.todoListItem, payload)
  }

  @Mutation
  private DELETE_TODO_LIST(payload: TodoItemInfo[]) {
    this.todoListItem = payload
  }

  @Action
  public changeSortByTodoList(payload: TodoItemInfo[]) {
    let count = 1
    const data = payload.map(item => {
      item.sortNum = count++
      return { ...item }
    })
    this.CHANGE_SORT_TODO_LIST(data)
  }

  @Action({ rawError: true })
  public registerTodoItem(payload: TodoItemInfo) {
    const sortNum = this.todoListItem.length + 1
    payload.sortNum = sortNum
    this.REGSTER_TODO_LIST(payload)

    if (this.todoListItem.length === sortNum) {
      return SupportService.setPromise(200)
    }
  }

  @Action({ rawError: true })
  public editTodoItem(payload: TodoItemInfo) {
    this.EDIT_TODO_LIST(payload)
    return SupportService.setPromise(200)
  }

  @Action({ rawError: true })
  public deleteTodoItem(payload: TodoItemInfo) {
    const beforeTodoSize = this.todoListItem.length

    const filterList: TodoItemInfo[] = this.todoListItem.filter(item => {
      if (item.uuid !== payload.uuid) {
        return { ...item }
      }
    })
    this.DELETE_TODO_LIST(filterList)

    const afterTodoSize = this.todoListItem.length
    if (afterTodoSize < beforeTodoSize) {
      return SupportService.setPromise(200)
    }
  }
}

export const TodoListStoreModule = getModule(TodoListStore)

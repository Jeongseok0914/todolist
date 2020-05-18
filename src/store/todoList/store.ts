import store from '@/store'

import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { TodoListState, todoListItemInfo } from './type'
import { DEFAULT_TEMPLIST } from './default'
import { cloneDeep } from 'lodash'
import { SupportService } from '@/utils/supportUtil'
import { SelectService } from './select'

@Module({ dynamic: true, store, name: 'todoListStore' })
class TodoListStore extends VuexModule implements TodoListState {
  public todoListItem = cloneDeep(DEFAULT_TEMPLIST)

  @Mutation
  private SET_SORT_TODO_LIST_ITEM(payload: todoListItemInfo[]) {
    this.todoListItem = payload
  }

  @Mutation
  private SET_TODO_LIST_ITEM(payload: todoListItemInfo) {
    this.todoListItem.unshift(payload)
  }

  @Mutation
  private EDIT_TODO_LIST_ITEM(payload: todoListItemInfo) {
    this.todoListItem = SelectService.editTodoListItem(this.todoListItem, payload)
  }

  @Mutation
  private DEL_TODO_LIST_ITEM(payload: todoListItemInfo[]) {
    this.todoListItem = payload
  }

  @Action
  public sortByTodoListItem(payload: todoListItemInfo[]) {
    let count = 1
    const data = payload.map(item => {
      item.sortNum = count++
      return { ...item }
    })
    this.SET_SORT_TODO_LIST_ITEM(data)
  }

  @Action({ rawError: true })
  public setTodoListItem(payload: todoListItemInfo) {
    console.log(payload)
    const sortNum = this.todoListItem.length + 1
    payload.sortNum = sortNum
    this.SET_TODO_LIST_ITEM(payload)

    if (this.todoListItem.length === sortNum) {
      return SupportService.setPromise(200)
    }
  }

  @Action({ rawError: true })
  public editTodoListItem(payload: todoListItemInfo) {
    this.EDIT_TODO_LIST_ITEM(payload)
    return SupportService.setPromise(200)
  }

  @Action({ rawError: true })
  public delTodoListItem(payload: todoListItemInfo) {
    const beforeTodoSize = this.todoListItem.length

    const filterList: todoListItemInfo[] = this.todoListItem.filter(item => {
      if (item.uuid !== payload.uuid) {
        return { ...item }
      }
    })
    this.DEL_TODO_LIST_ITEM(filterList)

    const afterTodoSize = this.todoListItem.length
    if (afterTodoSize < beforeTodoSize) {
      return SupportService.setPromise(200)
    }
  }
}

export const TodoListStoreModule = getModule(TodoListStore)

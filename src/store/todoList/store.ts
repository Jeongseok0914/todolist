import store from '@/store'

import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { TodoListState, todoListItemInfo } from './type'
import { DEFAULT_TOTOLIST } from './default'
import { cloneDeep } from 'lodash'

@Module({ dynamic: true, store, name: 'todoListStore' })
class TodoListStore extends VuexModule implements TodoListState {
  public todoListItem = cloneDeep(DEFAULT_TOTOLIST)

  @Mutation
  private SET_TODO_LIST_ITEM(todolistItem: todoListItemInfo) {
    this.todoListItem.unshift(todolistItem)
  }

  @Mutation
  private DEL_TODO_LIST_ITEM(todolistItem: todoListItemInfo[]) {
    this.todoListItem = todolistItem
  }

  @Action({ rawError: true })
  public setTodoListItem(todolistItem: todoListItemInfo) {
    this.SET_TODO_LIST_ITEM(todolistItem)
  }

  @Action({ rawError: true })
  public delTodoListItem(todolistItem: todoListItemInfo) {
    const filterList: todoListItemInfo[] = this.todoListItem.filter(item => {
      if (item !== todolistItem) {
        return { ...item }
      }
    })
    console.log(filterList)
    this.DEL_TODO_LIST_ITEM(filterList)
  }
}

export const TodoListStoreModule = getModule(TodoListStore)

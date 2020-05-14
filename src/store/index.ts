import Vue from 'vue'
import Vuex from 'vuex'
import { TodoListState } from './todoList/type'

Vue.use(Vuex)

export interface RootState {
  todoListStore: TodoListState
}

export default new Vuex.Store<RootState>({})

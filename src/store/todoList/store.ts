import store from '@/store'

import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { TodoListState } from './type'
import { DEFAULT_TOTOLIST } from './default'
import { cloneDeep } from 'lodash'

@Module({dynamic: true, store, name: 'todoListStore'})
class TodoListStore extends VuexModule implements TodoListState {
    public todoListItem = cloneDeep(DEFAULT_TOTOLIST)

    @Mutation
    private SET_CHANGE_VALUE(payload: {key: string, value: any}) {
        const { key, value } = payload
        if (Object.prototype.hasOwnProperty.call(this, key)) {
            ;(this as any)[key] = value
        }
    }

    @Action({rawError: true})
    public setChangeValue(payload: {key: string, value: any}) {
        this.SET_CHANGE_VALUE(payload)
    }
}

export const TodoListStoreModule = getModule(TodoListStore)
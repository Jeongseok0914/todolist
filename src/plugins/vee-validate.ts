import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate'
import ko from 'vee-validate/dist/locale/ko.json'
import * as rules from 'vee-validate/dist/rules'

for (let [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation
  })
}

localize('ko', ko)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

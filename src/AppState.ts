import { action, makeAutoObservable } from "mobx"
import { isValidProp } from "./utils/isValidProp.ts"
import { Account } from './models/Account.js'
import { Identity } from '@bcwdev/auth0provider-client'
import { Quote } from "./models/Quote.ts"
import { ToDo } from "./models/ToDo.ts"


class ObservableAppState {

  identity: Identity | null = null
  account: Account | null = null
  quote: Quote  | null = null
  toDos: ToDo[] | null = null
  constructor() {
    makeAutoObservable(this)
  }

}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop: string) {
    isValidProp(target, prop)
    // @ts-ignore
    return target[prop]
  },
  set(target, prop: string, value) {
    isValidProp(target, prop)
    action(() => {
      // @ts-ignore
      target[prop] = value
    })()
    return true
  }
})
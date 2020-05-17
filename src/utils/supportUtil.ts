import { Notification, MessageBox, Message } from 'element-ui'

export const SupportService = {
  getUuid: () => {
    function makeUuid() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return makeUuid() + makeUuid() + '-' + makeUuid() + '-' + makeUuid() + '-' + makeUuid() + '-' + makeUuid() + makeUuid() + makeUuid()
  },
  setPromise: (result: any) => {
    return new Promise(resolve => {
      resolve(result)
    })
  }
}

export const MessageService = {
  notiSuccess: (msg: string) => Notification.success({ title: 'Success', message: msg }),
  notiWarning: (msg: string) => Notification.warning({ title: 'Warning', message: msg }),
  notiInfo: (msg: string) => Notification.info({ title: 'Info', message: msg }),
  notiError: (msg: string) => Notification.error({ title: 'Error', message: msg }),
  MsgBoxConfirm: (msg: string[]) => MessageBox.confirm(msg[0], msg[1], { confirmButtonText: msg[2], cancelButtonText: msg[3], type: 'warning' }),
  messageWarning: (msg: string) => Message.warning({ message: msg })
}

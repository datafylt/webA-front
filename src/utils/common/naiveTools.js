import { isNullOrUndef } from '@/utils'

export function setupMessage(NMessage) {
  let loadingMessage = null
  class Message {
    /**
     * rules：
     * * loading messageonlyShowonea，newmessagewillreplacecurrentlyShowloading message
     * * loading messagewon't auto clear，removenotbereplacetonotloading message，notloading messageDefault2Secondafterautoclear
     */

    removeMessage(message = loadingMessage, duration = 2000) {
      setTimeout(() => {
        if (message) {
          message.destroy()
          message = null
        }
      }, duration)
    }

    showMessage(type, content, option = {}) {
      if (loadingMessage && loadingMessage.type === 'loading') {
        // if exists replace currentlyShowloading message
        loadingMessage.type = type
        loadingMessage.content = content

        if (type !== 'loading') {
          // notloading messageneedsetautoclear
          this.removeMessage(loadingMessage, option.duration)
        }
      } else {
        // notexistscurrentlyShowloadingthennewoneamessage,ifnewmessageYesloading messagethenwillmessageassignstorageunderto
        let message = NMessage[type](content, option)
        if (type === 'loading') {
          loadingMessage = message
        }
      }
    }

    loading(content) {
      this.showMessage('loading', content, { duration: 0 })
    }

    success(content, option = {}) {
      this.showMessage('success', content, option)
    }

    error(content, option = {}) {
      this.showMessage('error', content, option)
    }

    info(content, option = {}) {
      this.showMessage('info', content, option)
    }

    warning(content, option = {}) {
      this.showMessage('warning', content, option)
    }
  }

  return new Message()
}

export function setupDialog(NDialog) {
  NDialog.confirm = function (option = {}) {
    const showIcon = !isNullOrUndef(option.title)
    return NDialog[option.type || 'warning']({
      showIcon,
      positiveText: 'OK',
      negativeText: 'Cancel',
      onPositiveClick: option.confirm,
      onNegativeClick: option.cancel,
      onMaskClick: option.cancel,
      ...option,
    })
  }

  return NDialog
}

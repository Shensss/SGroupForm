import _ from 'lodash'

const utils = {
  lodash: _,
  custom: {
    randomCode: (codeLength) => {
      let UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      let LOWER = UPPER.toLocaleLowerCase()
      let DIGITS = '0123456789'
      let ALPHA_NUMBER = UPPER + LOWER + DIGITS
      //字符串转成数组
      let symbols = new Array()
      for (let i = 0; i < ALPHA_NUMBER.length; i++) {
        symbols[i] = ALPHA_NUMBER.charAt(i)
      }
      //随机拼接字符串
      let stateCode = ''
      for (let i = 0; i < codeLength; i++) {
        stateCode += symbols[Math.floor((Math.random() * symbols.length))]
      }
      return stateCode
    },
    removeObjWithArr: (_arr, _obj) => {
      let length = _arr.length
      for (let i = 0; i < length; i++) {
        if (_arr[i] === _obj) {
          if (i === 0) {
            _arr.shift()
            return
          } else if (i === length - 1) {
            _arr.pop()
            return
          } else {
            _arr.splice(i, 1)
            return
          }
        }
      }
    }
  }
}
export default utils

import Vue from 'vue'

function onInput (el, ele, binding, vnode) {
  function handle () {
    let val = ele.value
    // modifiers为修饰符对象，传入了float，则其float属性为true
    if (binding.modifiers.float) {
      // 清除"数字"和"."以及"-"以外的字符
      val = val.replace(/[^\-\d.]/g, '')
      // 只保留第一个“点”号, 清除多余的
      const idx = val.indexOf('.')
      if (!(idx === -1 || idx === val.length - 1)) {
        val = val.substr(0, idx) + '.' + val.substr(idx + 1).replace(/\./g, '')
      }
      // 只保留首位的负号, 清除多余的
      if (val.length > 1) {
        val = val.charAt(0) + val.substr(1).replace(/-/g, '')
      }
      // 将 '-.' 替换成 '-0.'
      val = val.replace(/^\./g, '0.').replace(/^-\./, '-0.')
      if (typeof binding.value !== 'undefined') {
        // 期望保留的最大小数位数
        let pointKeep = 0
        if (typeof binding.value === 'string' || typeof binding.value === 'number') {
          pointKeep = parseInt(binding.value)
        } else if (typeof binding.value === 'object') {
          pointKeep = binding.value.decimal
        }
        if (!isNaN(pointKeep)) {
          if (!Number.isInteger(pointKeep) || pointKeep < 0) {
            pointKeep = 0
          }
          // 增加'-'号的支持
          const str = '^(\\-)*(\\d+)\\.(\\d{' + pointKeep + '}).*$'
          const reg = new RegExp(str)
          if (pointKeep === 0) {
            // 不需要小数点
            val = val.replace(reg, '$1$2')
          } else {
            // 通过正则保留小数点后指定的位数
            val = val.replace(reg, '$1$2.$3')
          }
        }
      } else {
        val = ele.value.replace(/[^\-\d]/g, '').replace(/^(-)*(\d*)$/, '$1$2')
      }
      if (val !== '' && typeof binding.value === 'object') {
        let { min, max } = binding.value
        min = parseFloat(min)
        max = parseFloat(max)
        if (!isNaN(min)) {
          if (min >= 0) {
            val = val.replace('-', '')
          }
          if (parseFloat(val) < min) {
            val = min
          }
        }
        if (!isNaN(max)) {
          if (parseFloat(val) > max) {
            val = max
          }
        }
      }
      ele.value = val
      if (vnode.componentInstance) {
        vnode.componentInstance.$emit('input', ele.value)
      } else {
        vnode.elm.dispatchEvent(new CustomEvent('input', ele.value))
      }
    }
  }

  return handle
}

const numberInput = {
  bind (el, binding, vnode) {
    const ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
    ele.addEventListener('input', onInput(el, ele, binding, vnode), false)
  }
}
Vue.directive('number-input', numberInput)

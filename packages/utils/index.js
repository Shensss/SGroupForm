export function randomCode (codeLength) {
    const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const LOWER = UPPER.toLocaleLowerCase()
    const DIGITS = '0123456789'
    const ALPHA_NUMBER = UPPER + LOWER + DIGITS
    // 字符串转成数组
    // eslint-disable-next-line no-array-constructor
    const symbols = new Array()
    for (let i = 0; i < ALPHA_NUMBER.length; i++) {
        symbols[i] = ALPHA_NUMBER.charAt(i)
    }
    // 随机拼接字符串
    let stateCode = ''
    for (let i = 0; i < codeLength; i++) {
        stateCode += symbols[Math.floor((Math.random() * symbols.length))]
    }
    return stateCode
}

export function removeObjWithArr (_arr, _obj) {
    const length = _arr.length
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

export function dateFormat (fmt, time) {
    const date = new Date(time)
    let ret
    const opt = {
        'y+': date.getFullYear().toString(), // 年
        'M+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'm+': date.getMinutes().toString(), // 分
        's+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }
    for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        }
    }

    return fmt
}
export function transformToTree (sNodes, setting) {
    let set = {
        children: 'children',
        idKey: 'id',
        pIdKey: 'pId',
        label: 'name'
    }
    if (setting) {
        set = setting
    }
    var i
    var l
    var key = set.idKey
    var parentKey = set.pIdKey
    var childKey = set.children
    if (!key || key === '' || !sNodes) return []
    if (Array.isArray(sNodes)) {
        var r = []
        var tmpMap = []
        for (i = 0, l = sNodes.length; i < l; i++) {
            tmpMap[sNodes[i][key]] = sNodes[i]
        }
        for (i = 0, l = sNodes.length; i < l; i++) {
            if (
                tmpMap[sNodes[i][parentKey]] &&
                sNodes[i][key] !== sNodes[i][parentKey]
            ) {
                if (!tmpMap[sNodes[i][parentKey]][childKey]) {
                    tmpMap[sNodes[i][parentKey]][childKey] = []
                }
                tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i])
            } else {
                r.push(sNodes[i])
            }
        }
        return r
    } else {
        return [sNodes]
    }
}

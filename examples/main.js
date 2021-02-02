import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
import SGroupForm from '../packages'
import SGroupLayout from '../packages'

Vue.use(SGroupLayout)
Vue.use(SGroupForm, {
    UploadConfig: {
        getType: 'JSON',
        path: 'http://121.40.133.115:9090/fib/coapi/upload/file',
        data: [
            {
                key: 'fileArray',
                value: 'file'
            }
        ],
        domain: 'http://121.40.133.115:9090',
        listPath: 'data.resultList[0]',
        urlKey: 'fileUrl',
        nameKey: 'originalFilename'
    },
})
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')

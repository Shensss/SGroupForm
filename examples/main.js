import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
import SGroupForm from '../packages'

Vue.use(SGroupForm, {
    UploadConfig: {
        getType: 'JSON',
        fileType: 'path',
        path: '/node-szzt/file/upload',
        data: [
            {
                key: 'files',
                value: 'file'
            }
        ],
        domain: 'http://121.40.133.115:4001/api/',
        listPath: 'data[0]',
        urlKey: 'path',
        nameKey: 'name'
    }
    // UploadConfig: {
    //     getType: 'JSON',
    //     fileType: 'base64',
    //     path: '/node-szzt/file/base64',
    //     data: [
    //         {
    //             key: 'base64',
    //             value: 'file'
    //         },
    //         {
    //             key: 'name',
    //             value: 'name'
    //         }
    //     ],
    //     domain: '',
    //     listPath: 'data',
    //     urlKey: 'id',
    //     nameKey: 'name'
    // }
})
Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount('#app')

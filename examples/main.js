import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
import SGroupForm from '../lib/index'

Vue.use(SGroupForm, {
    UploadConfig: {
        getType: 'JSON',
        fileType: 'path',
        path: '/szzt/pc/upload/file',
        data: [
            {
                key: 'fileArray',
                value: 'file'
            }
        ],
        domain: 'http://121.40.133.115:8180/api/',
        listPath: 'data.resultList[0]',
        urlKey: 'fileUrl',
        nameKey: 'originalFilename'
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

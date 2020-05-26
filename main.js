import Vue from 'vue'
import App from './App'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
// 注册全局组件
import MescrollBody from "@/component/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/component/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
import {
	postajax,api,getajax
} from "./utils/api"
Vue.prototype.$postajax = postajax;
Vue.prototype.$getajax =getajax
Vue.prototype.$api = api;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 




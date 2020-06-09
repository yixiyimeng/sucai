import Vue from 'vue'
import App from './App'
import store from './store'
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

import axios from './utils/axios.min';
Vue.prototype.$axios = axios; 
axios.defaults.timeout = 5000;   //响应时间
axios.defaults.withCredentials=true;//让请求头携带参数cookie
axios.defaults.baseURL = 'http://material.yipro.cn/';   //配置接口地址  
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 




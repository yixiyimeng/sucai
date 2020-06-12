import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: uni.getStorageSync('token'),
		userInfo:{}
	},
	mutations: {
		SET_LOGIN(state, userInfo) {
			console.log('122');
			state.userInfo = userInfo;
			uni.setStorageSync('userInfo', userInfo);
			state.hasLogin = true;
		},
		SET_USERINFO(state){
			state.userInfo=uni.getStorageSync('userInfo')||{}
		},
		SET_LOGOUT(state) {
			for (var key in state) {
				if (key == 'hasLogin') {
					state[key] = false
				} else {
					state[key] = ''
				}
			}
		}
	}
})

export default store

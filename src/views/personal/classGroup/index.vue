// store中state的使用
const counter = {
template:`
<div>{{count}}</div>`,
computed:{
count(){
return store.state.count
}
}
}
// 注册全局组件
import Vue from 'vue'
import Loading from './loading.vue'
Vue.component('loading',Loading)

//使用Vue.use注册插件

import Vue from 'vue'
//--这个插件必须具有install方法
const plugin = {
install(Vue,options){
//--添加全局方法或者属性
Vue.myGlobMethod = function(){
//逻辑
}
//--添加全局指令
Vue.directive('my-directive',{
bind (el, binding, vnode, oldVnode){
//逻辑
}
})
//--注入组件
Vue.mixin({
created: function(){
//逻辑
}
})
//--添加实例方法
Vue.prototype.$myMethod = function(methodOptions){}
//--注册全局组件
Vue.component(component.name, component.component)
}
}
// 通过全局方法Vue.use()使用插件：
Vue.use(plugin)

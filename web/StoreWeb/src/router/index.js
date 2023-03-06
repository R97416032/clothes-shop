import Vue from 'vue'
import VueRouter from 'vue-router'
import login from'../components/login.vue'
import clothing from '../components/clothing.vue'
import manage from '../components/manage.vue'
import amountPie from '../components/amount_Pie.vue'
import numPie from '../components/num_Pie.vue'
import order from '../components/order.vue'
Vue.use(VueRouter)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new VueRouter({
	mode: 'history',
	routes:[
		{path:'/' ,redirect:'/login'},
		{
			path:'/login',
			component: login,
			name:'login',
			},
		
		{
			path:'/manage',
			component: manage,
			name:'manage',
			children:[
				{
					path:'/clothing',
					component: clothing,
					name:'clothing',
					},
				{
					path:'/amountpie',
					component: amountPie,
					name:'amountpie',
					},
				{
					path:'/numpie',
					component: numPie,
					name:'numpie',
					},
				{
					path:'/order',
					component: order,
					name:'order',
					},
			]
			}
	]
})



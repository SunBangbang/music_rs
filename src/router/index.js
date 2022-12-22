// import Vue from "vue";
import {
	createRouter,
	createWebHistory
} from "vue-router"

import admin from "../components/admin/Admin.vue"
import adminMenu from "../components/admin/AdminMenu.vue"
import login from "../components/user/Login.vue"
import main from "../components/Main.vue"
import discover from "../views/Discover.vue"
import hotmusic from "../views/HotMusic.vue"
import loveSong from "../views/LoveSong.vue"
import recommendsongs from "../views/RecommendSongs.vue"
import recommendusers from "../views/RecommendUsers.vue"
import searchMusic from "../views/SearchMusic.vue"
import userRecord from "../views/UserRecord.vue"
import songlist1 from "../views/Songlist1.vue"
import songlist2 from "../views/Songlist2.vue"
import songlist3 from "../views/Songlist3.vue"
import store from "../store/index.js"

const routes = [
	// {
	// 	path: "/",
	// 	// 重定向
	// 	redirect: "/login",
	// },
	{
		path: "/admin",
		name: "admin",
		component: admin,
	},
	{
		path: "/adminMenu",
		name: "adminMenu",
		component: adminMenu,
	},
	{
		path: "/login",
		name: "login",
		component: login,
	},
	{
		path: "/",
		name: "main",
		component: main,
		redirect: "/discover",
		meta: {
			requireLogin: true,
		},
		// 子路由
		children: [{
				path: "discover",
				name: "discover",
				component: discover,
				meta: {
					requireLogin:true
				},
			},
			{
				path: "hotmusic",
				name: "hotmusic",
				component: hotmusic,
				meta: {
					requireLogin:true
				},
			},
			{
				path: "loveSong",
				name: "loveSong",
				component: loveSong,
			},
			{
				path: "recommendsongs",
				name: "recommendsongs",
				// component: (resolve) => require([recommendsongs], resolve),
				component: recommendsongs,
				meta: {
					requireLogin:true
				},
			},
			{
				path: "recommendusers",
				name: "recommendusers",
				component: recommendusers,
				meta: {
					requireLogin:true
				},
			},
			{
				path: "searchMusic",
				name: "searchMusic",
				component: searchMusic,
			},
			{
				path: "userRecord",
				name: "userRecord",
				component: userRecord,
			},
			{
				path: "songlist1",
				name: "songlist1",
				component: songlist1,
			},
			{
				path: "songlist2",
				name: "songlist2",
				component: songlist2,
			},
			{
				path: "songlist3",
				name: "songlist3",
				component: songlist3,
			},
		],
	},
]

const router = createRouter({
	// 默认使用hash模式
	history: createWebHistory(),
	routes,
})

// 登录验证
router.beforeEach((to, from, next) => {
	// 判断是否需要登录
	if (to.meta.requireLogin) {
		// 如果由token说明已经登录，则跳转到首页
		console.log("路由跳转验证")
		console.log(store)
		console.log('是否登录', store.getters.getIsLogin)
		if (store.getters.getIsLogin == 1 || to.path === "/login") {
			next()
		} else {
			// 如果没有登录，则所有页面都需要跳转到登录界面
			next(`/login?redirect=${to.path}`)
		}
		// ====== 修改内容=====
	} else {
		next()
	}
})

export default router

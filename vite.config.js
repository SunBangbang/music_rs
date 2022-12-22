import {
	defineConfig
} from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': resolve(__dirname, '.', 'src') // 设置 @ 指向 src
		}
	},
	server: {
		// 允许本机，默认是 localhost
		host: true,
		// 本项目的本地端口，默认是 3000 端口
		port: 9000,
		// 浏览器自动打开
		open: true,
		// 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
		proxy: {
			'/api': {
				target: 'http://music.163.com/api',
				// target: 'https://music.cyrilstudio.top',
				changeOrigin: true,
				secure: false,
				// 路径重写，eg:把api接口替换为''
				// path.replace(/^\/api/, "")
				rewrite: path => path.replace(/^\/api/, "")
			},
		}
	}
})

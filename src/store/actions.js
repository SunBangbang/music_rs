// store的actions
const actions = {
	asyncUpdateInfo(context, payload) {
		// 返回一个Promise对象
		return new Promise((resolve, rejevt) => {
			// 异步操作
			setTimeout(() => {
				console.log(payload)
				// 这里context（也可以认为是store）通过commit提交的方式执行updateInfo函数
				context.commit("updateInfo")

				// 返回一个数据
				resolve("执行完毕，我来自Promise对象")
			}, 2000)
		})
	},
}

export { actions }

<template>
	<div id="songs-discover">
		<el-table
			:data="songsData"
			stripe
			style="width: 100%;"
			:header-cell-style="{ fontWeight: 'normal', border: 'none' }"
		>
			<!-- :header-cell-style="{ fontWeight: 'normal' }"设置表头样式，中间的连接符去掉，改成驼峰形式 -->
			<el-table-column align="center" prop="index" label="" width="120">
				<template #default="scope">
					<div :class="scope.row.downUrl == 'None' ? 'fail' : 'succ'">
						<sapn
							style="font-size:16px;width:20px;display:inline-block;"
						>
							{{ scope.$index + 1 }}
						</sapn>
						<i
							class="iconfont icon-bofang"
							style="margin-left:10px;font-size:18px;width:20px;display:inline-block;"
							@click="startPlay(scope.$index)"
							:class="
								scope.row.downUrl == 'None' ? 'fail' : 'succ'
							"
						></i>
						<i
							class="iconfont icon-shoucang_huaban1"
							style="margin-left:10px;font-size:18px;width:20px;display:inline-block;"
							@click="addLove(scope.$index)"
							:class="[
								scope.row.downUrl == 'None' ? 'fail' : 'succ',
								scope.row.isLove === true ? 'loveactive' : '',
							]"
						></i>
						<!-- <i
							class="iconfont icon-shoucang_huaban1"
							style="margin-left:10px;font-size:18px;width:20px;display:inline-block;"
							@click="addList(scope.$index)"
							:class="[
								scope.row.downUrl == 'None' ? 'fail' : 'succ',
								scope.row.isList === true ? 'listactive' : '',
							]"
						></i> -->
					</div>
				</template>
			</el-table-column>
			<el-table-column
				align="center"
				prop="songName"
				label="歌曲名"
				width="220"
			>
				<!-- 在表格中添加跳转链接 -->
				<template #default="scope">
					<span
						:class="scope.row.downUrl == 'None' ? 'fail' : 'succ'"
					>
						{{ scope.row.songName }}
					</span>
				</template>
			</el-table-column>
			<el-table-column
				align="center"
				prop="singerName"
				label="歌手"
				width="220"
			>
				<template #default="scope">
					<span
						:class="scope.row.downUrl == 'None' ? 'fail' : 'succ'"
					>
						{{ scope.row.singerName }}
					</span>
				</template>
			</el-table-column>
			<el-table-column
				align="center"
				prop="album"
				label="专辑"
				width="300"
			>
				<template #default="scope">
					<span
						:class="scope.row.downUrl == 'None' ? 'fail' : 'succ'"
					>
						{{ scope.row.album }}
					</span>
				</template>
			</el-table-column>
			<!-- <el-table-column
				align="center"
				prop="songTime"
				label="时长"
				width="200"
			>
				<template #default="scope">
					<span
						:class="scope.row.downUrl == 'None' ? 'fail' : 'succ'"
					>
						{{ scope.row.songTime }}
					</span>
				</template>
			</el-table-column> -->
		</el-table>
		<!-- 分页 -->
		<el-pagination
			background
			layout="prev, pager, next"
			:total="totalNum"
			:current-page="currentPage"
			style="padding-top:30px;"
			@current-change="handleCurrentChange"
		></el-pagination>
	</div>
</template>
<script>
import { useStore } from "vuex"
import {
	getDiscoverSongs,
	_getAllSongs,
	_addLoveSong,
	_cancelLoveSong,
	_addListSong,
	_cancelListSong,
} from "../utils/api.js"
export default {
	data() {
		const item = {
			iid: "",
			songName: "",
			singerName: "",
			album: "",
			// songTime: "",
			downUrl: "",
			picUrl: "",
			// 是否收藏默认为false，不收藏
			isLove: false,
			// 是否收录进歌单默认为false，不收录
			isList: false
		}
		return {
			uid: "",
			downUrl: "",
			// 当前页面
			currentPage: 1,
			pageSize: 10,
			// 后台的所有数据
			songsData: Array(10).fill(item),
			// 分页中的总条目数
			totalNum: 1000,
		}
	},
	created() {
		// 获得用户id
		this.uid = useStore().state.user.uid
		console.log("用户id：" + this.uid)
		console.log(this.currentPage)
		// 得到歌曲的详情信息
		_getAllSongs({ s:'PAPISM', offset:0, limit:1, type:1}).then((response) => {
			this.songsData = response.data.data
			console.log(this.songsData)
		})

		// 页面加载时读取数据
		if (window.sessionStorage.getItem("user")) {
			console.log("页面加载")
			const session_user = JSON.parse(
				window.sessionStorage.getItem("user"),
			)
			console.log(session_user)
			this.$store.commit("SET_USER", session_user)
			console.log(this.$store)
		}
		// 页面刷新时保存状态
		window.addEventListener("beforeunload", () => {
			console.log("页面刷新")
			console.log(this.$store.getters.getUser)
			window.sessionStorage.setItem(
				"user",
				JSON.stringify(this.$store.getters.getUser),
			)
		})
	},
	beforeMount() {},
	methods: {
		getDiscoverSongsData() {
			_getAllSongs({ currentPage: this.currentPage + "", case: 1 }).then(
				(response) => {
					this.songsData = response.data.data
					console.log(this.songsData)
				},
			)
		},

		startPlay(index) {
			const songsData = this.songsData
			console.log(index)
			// 将事件传递给子组件，第一个参数为自定义事件名，后续参数为传递过去的数据
			console.log("开始emit")
			this.$emit("playmusic", index, songsData)
			console.log("结束emit")
			// this.$router.push({ name: "main", params: { mp3: "mp3" } })
			// this.$parent.audioIsChange = true
		},
		// 下一页
		handleCurrentChange(value) {
			// 得到歌曲的详情信息
			_getAllSongs({ currentPage: value, case: 1  }).then((response) => {
				this.songsData = response.data.data
				// 修改当前页的值
				this.currentPage = value
				console.log(this.songsData)
			})
		},
		// 添加或取消收藏歌曲
		addLove(index) {
			var isLove = this.songsData[parseInt(index)].isLove
			var songName = this.songsData[parseInt(index)].songName
			if (isLove === true) {
				this.songsData[parseInt(index)].isLove = false
				_cancelLoveSong({
					uid: this.uid,
					iid: this.songsData[parseInt(index)].iid,
				}).then((response) => {
					if (response.data.code === 200) {
						console.log("取消收藏")
						this.$message({
							type: "info",
							message: songName + " " + "取消收藏!",
						})
					}
				})
			} else {
				this.songsData[parseInt(index)].isLove = true
				_addLoveSong({
					uid: this.uid,
					iid: this.songsData[parseInt(index)].iid,
				}).then((response) => {
					if (response.data.code === 200) {
						console.log("收藏歌曲")
						this.$message({
							type: "success",
							message: songName + " " + "收藏成功!",
						})
					}
				})
			}
		},
		// 添加或取消歌单歌曲
		addList(index) {
			var isList = this.songsData[parseInt(index)].isList
			var songName = this.songsData[parseInt(index)].songName
			if (isList === true) {
				this.songsData[parseInt(index)].isList = false
				_cancelListSong({
					uid: this.uid,
					iid: this.songsData[parseInt(index)].iid,
				}).then((response) => {
					if (response.data.code === 200) {
						console.log("取消收藏")
						this.$message({
							type: "info",
							message: songName + " " + "取消收藏!",
						})
					}
				})
			} else {
				this.songsData[parseInt(index)].isList = true
				_addListSong({
					uid: this.uid,
					iid: this.songsData[parseInt(index)].iid,
				}).then((response) => {
					if (response.data.code === 200) {
						console.log("收录歌曲")
						this.$message({
							type: "success",
							message: songName + " " + "收录成功!",
						})
					}
				})
			}
		},
	},
}
</script>
<style scoped>
#songs-discover {
	position: absolute;
	width: 1060px !important;
	right: 0;
	left: 0;
	margin-left: auto;
	margin-right: auto;
}

/* 表格中不可播放的的禁止点击样式 */
#songs-discover .fail {
	/* pointer-events: none; */
	color: #9b9b9b;
	cursor: not-allowed;
}
/* 可以播放则不做任何修改 */
/*#songs-discover .succ {
	/* pointer-events: none; */
	/* color: #9b9b9b;
	cursor: not-allowed; 
}*/
/* 收藏歌曲激活状态 */
#songs-discover .loveactive {
	color: #f56c6c;
}

/* 收录歌曲激活状态 */
#songs-discover .listactive {
	color: #6caaf5;
}
/* 播放的字体图标鼠标覆盖变色 */
#songs-discover i.iconfont.icon-bofang:hover {
	cursor: pointer;
	/* color: rgb(231, 56, 40); */
	color: #f56c6c;
}

/* 收藏的字体图标鼠标覆盖变色 */
#songs-discover i.iconfont.icon-shoucang_huaban1:hover {
	cursor: pointer;
}

/* 收录歌单的字体图标鼠标覆盖变色 */
#songs-discover i.iconfont.icon-shoucang_huaban1:hover {
	cursor: pointer;
}
</style>
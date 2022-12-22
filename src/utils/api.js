import axios from "axios";
// axios.defaults.baseURL = "/api";
// axios.defaults.headers = {
//             "Content-Type": "application/x-www-form-urlencoded"
//           };
// 获得歌曲的详情信息
export function getSongDetail(id) {
	return axios.get("/index/home?case=1&id=" + id)
	//return axios.get("https://api.imjad.cn/cloudmusic/?type=detail&id=" + id)
}

// 登录
export function getLogin(params) {
	return axios.get("/index/login", {params})
}

// 获得推荐歌曲
export function getRecommendSongs(param) {
	return axios.post("/recommendSongs", param)
}

// 获得推荐用户
export function getRecommendUsers(param) {
	return axios.post("/recommendUsers", param)
}

// 发现歌曲，新歌
export function getDiscoverSongs(param) {
	return axios.post("/discover", param)
}

// 热门歌曲
export function getHotSongs(param) {
	return axios.post("/hot", param)
}

// 获得所有歌曲
export function _getAllSongs(params) {
	return axios.post("/search/pc", params)
}

// 用户注册
export function _register(param) {
	return axios.post("/register", param)
}

// 更新用户
export function _updataUser(param) {
	return axios.post("/updateUser", param)
}

// 更新用户密码
export function _updataPw(param) {
	return axios.post("/updatePw", param)
}

// 添加播放记录，参数传入用户id和歌曲id即可
export function _addRecord(param) {
	return axios.post("/addRecord", param)
}

// 获得收藏歌曲列表
export function _getLoveSongList(param) {
	return axios.post("/loveSongList", param)
}

// 添加收藏记录
export function _addLoveSong(param) {
	return axios.post("/addLoveSong", param)
}

// 取消收藏
export function _cancelLoveSong(param) {
	return axios.post("/cancelLoveSong", param)
}

// 获得歌单歌曲列表
export function _getListSongList(param) {
	return axios.post("/listSongList", param)
}

// 添加歌单记录
export function _addListSong(param) {
	return axios.post("/addlistSong", param)
}

// 取消歌单收录
export function _cancelListSong(param) {
	return axios.post("/cancellistSong", param)
}
// 获得播放记录歌曲
export function _getRecordSong(param) {
	return axios.post("/getRecordSong", param)
}

//管理
//获得歌曲列表
export function _getDisplaySongs(param) {
	return axios.post("/display", param)
}
// 添加歌曲
export function _addSong(param) {
	return axios.post("/addSong", param)
}
// 删除歌曲
export function _deleteSong(param) {
	return axios.post("/deleteSong", param)
}
// 更新歌曲
export function _updateSong(param) {
	return axios.post("/updateSong", param)
}
// 搜索歌曲
export function _getSearchSongs(param) {
	return axios.post("/searchSongs", param)
}
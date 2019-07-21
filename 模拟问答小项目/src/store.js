import Vue from "vue";
import Vuex from "vuex";
import {
	countDown
} from "@/utils/common.js";

Vue.use(Vuex);

const INITIALIZE_DATA = 'INITIALIZE_DATA';
const ADD_ITEMNUM = 'ADD_ITEMNUM'
const REMBER_ANSWER = 'REMBER_ANSWER'
const COUNTDOWN = 'COUNTDOWN'

export default new Vuex.Store({
	state: {
		level: '第一周', //活动周数
		itemNum: 1, // 第几题
		itemId: null, //当前题目id
		allTime: 5 * 60, //时间限制
		currentTime: 5 * 60, //当前剩余时间
		timer: '', //定时器
		answerArr: {}, //已经选好的答案
		itemDetail: [{
			"topic_id": 20,
			"active_topic_id": 4,
			"type": "ONE",
			"topic_name": "题目一",
			"active_id": 1,
			"active_title": "欢乐星期五标题",
			"active_topic_phase": "第一周",
			"active_start_time": "1479139200",
			"active_end_time": "1482163200",
			"topic_answer": [{
				"topic_answer_id": 1,
				"topic_id": 20,
				"answer_name": "答案aaaa",
				"is_standard_answer": 0
			}, {
				"topic_answer_id": 2,
				"topic_id": 20,
				"answer_name": "正确答案",
				"is_standard_answer": 1
			}, {
				"topic_answer_id": 3,
				"topic_id": 20,
				"answer_name": "答案cccc",
				"is_standard_answer": 0
			}, {
				"topic_answer_id": 4,
				"topic_id": 20,
				"answer_name": "答案dddd",
				"is_standard_answer": 0
			}]
		}, {
			"topic_id": 21,
			"active_topic_id": 4,
			"type": "MORE",
			"topic_name": "题目二",
			"active_id": 1,
			"active_title": "欢乐星期五标题",
			"active_topic_phase": "第一周",
			"active_start_time": "1479139200",
			"active_end_time": "1482163200",
			"topic_answer": [{
				"topic_answer_id": 5,
				"topic_id": 21,
				"answer_name": "答案A",
				"is_standard_answer": 0
			}, {
				"topic_answer_id": 6,
				"topic_id": 21,
				"answer_name": "答案B",
				"is_standard_answer": 0
			}, {
				"topic_answer_id": 7,
				"topic_id": 21,
				"answer_name": "正确答案",
				"is_standard_answer": 1
			}, {
				"topic_answer_id": 8,
				"topic_id": 21,
				"answer_name": "答案D",
				"is_standard_answer": 0
			}]
		}, {
			"topic_id": 22,
			"active_topic_id": 4,
			"type": "MORE",
			"topic_name": "题目三",
			"active_id": 1,
			"active_title": "欢乐星期五标题",
			"active_topic_phase": "第一周",
			"active_start_time": "1479139200",
			"active_end_time": "1482163200",
			"topic_answer": [{
				"topic_answer_id": 9,
				"topic_id": 21,
				"answer_name": "测试A",
				"is_standard_answer": 0
			}, {
				"topic_answer_id": 10,
				"topic_id": 21,
				"answer_name": "BBBBBB",
				"is_standard_answer": 0
			}, {
				"topic_answer_id": 11,
				"topic_id": 21,
				"answer_name": "CCCCCC",
				"is_standard_answer": 0
			}, {
				"topic_answer_id": 12,
				"topic_id": 21,
				"answer_name": "正确答案",
				"is_standard_answer": 1
			}]
		}, {
			"topic_id": 24,
			"active_topic_id": 4,
			"type": "MORE",
			"topic_name": "题目四",
			"active_id": 1,
			"active_title": "欢乐星期五标题",
			"active_topic_phase": "第一周",
			"active_start_time": "1479139200",
			"active_end_time": "1482163200",
			"topic_answer": [{
				"topic_answer_id": 13,
				"topic_id": 21,
				"answer_name": "正确答案",
				"is_standard_answer": 1
			}, {
				"topic_answer_id": 14,
				"topic_id": 21,
				"answer_name": "A是错的",
				"is_standard_answer": 0
			}, {
				"topic_answer_id": 15,
				"topic_id": 21,
				"answer_name": "D是对的",
				"is_standard_answer": 0
			}, {
				"topic_answer_id": 16,
				"topic_id": 21,
				"answer_name": "C说的不对",
				"is_standard_answer": 0
			}]
		}, {
			"topic_id": 25,
			"active_topic_id": 4,
			"type": "MORE",
			"topic_name": "题目五",
			"active_id": 1,
			"active_title": "欢乐星期五标题",
			"active_topic_phase": "第一周",
			"active_start_time": "1479139200",
			"active_end_time": "1482163200",
			"topic_answer": [{
				"topic_answer_id": 17,
				"topic_id": 21,
				"answer_name": "错误答案",
				"is_standard_answer": 0
			}, {
				"topic_answer_id": 18,
				"topic_id": 21,
				"answer_name": "正确答案",
				"is_standard_answer": 1
			}, {
				"topic_answer_id": 19,
				"topic_id": 21,
				"answer_name": "错误答案",
				"is_standard_answer": 0
			}, {
				"topic_answer_id": 20,
				"topic_id": 21,
				"answer_name": "错误答案",
				"is_standard_answer": 0
			}]
		}],
	},
	mutations: {
		//初始化数据
		[INITIALIZE_DATA](state) {
			state.itemNum = 1;
			state.itemId = state.itemDetail[state.itemNum - 1].topic_id;
			state.allTime = 0;
			state.answerArr = {};
		},
		//记录选择的答案
		[REMBER_ANSWER](state, params) {
			state.answerArr[params.itemId] = params.answerId;
		},
		//跳转到下一页
		[ADD_ITEMNUM](state, params) {
			let type = params.type;
			if (type == "next") {
				state.itemNum += 1;
			} else if (type == "prev") {
				state.itemNum -= 1;
			}
			state.itemId = state.itemDetail[state.itemNum - 1].topic_id;
		},
		[COUNTDOWN](state) {
			countDown(state.allTime, (sec) => {
				state.currentTime = sec;
			}, () => {
				state.currentTime = 0;
			});
		}
	},
	actions: {
		//初始化数据
		initializeData({
			commit,
		}) {
			commit('INITIALIZE_DATA');
		},

		//保存答案记录
		saveAnswer({
			commit,
			state
		}, params) {
			commit(REMBER_ANSWER, params);
			if (state.itemNum <= state.itemDetail.length) {
				commit(ADD_ITEMNUM, params);
			}
		},
	}
});

<template>
	<article class="item-container">
		<header class="top_tips">
			<span class="num_tip" v-if="fatherComponent == 'home'">{{ level }}</span>
			<span class="num_tip" v-if="fatherComponent == 'item'">题目{{ itemNum }}</span>
		</header>
		<section class="content" :class="[fatherComponent + '-content']">
			<template v-if="fatherComponent == 'home'">
				<div class="home_logo item_container_style"></div>
				<router-link :to="{ name: 'item', params: {initFlag: true} }" class="start button_style"></router-link>
			</template>
			<template v-if="fatherComponent == 'item'">
				<div class="countdown-box">
					倒计时：{{ currentTime }}s
				</div>
				<div class="item_back item_container_style">
					<div class="item_list_container" v-if="itemArr.length > 0">
						<header class="item_title">{{itemName}}</header>
						<ul>
							<li v-for="(item, index) in itemArr" @click="choosed(item.topic_answer_id)" class="item_list" :key="item.topic_answer_id">
								<span class="option_style" v-bind:class="{'has_choosed': choosedId == item.topic_answer_id}">{{chooseType(index)}}</span>
								<span class="option_detail">{{item.answer_name}}</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="action-btn-box">
					<span class="prev_item button_style" @click="prevItem" v-if="itemNum > 1"></span>
					<span class="next_item button_style" @click="nextItem" v-if="itemNum < itemDetail.length"></span>
					<span class="submit_item button_style" v-else @click="submitAnswer"></span>
				</div>
			</template>
		</section>
	</article>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex';
	export default {
		name: "itemcontainer",
		data() {
			return {
				choosedId: null, //选择答案id
				itemArr: [], //当前的答案列表
				itemId: null, //题目id
				itemName: null, //题目名称
			};
		},
		props: ['fatherComponent'],
		computed: {
			...mapState([
				'itemNum', //第几题
				'level', //活动周数
				'itemDetail', //题目详情
				'timer', //计时器
				'answerArr', //各题目选择了的答案集合
				'currentTime',
			]),
			choosedClass: function() {
				return {
					has_choosed: this.itemNum != 1,
				};
			},
		},
		methods: {
			...mapActions([
				'initializeData',
				'saveAnswer',
			]),
			//索引0-3对应答案A-B
			chooseType: type => {
				switch (type) {
					case 0:
						return 'A';
					case 1:
						return 'B';
					case 2:
						return 'C';
					case 3:
						return 'D';
				}
			},
			initNowData: function() {
				let _itemObj = this.itemDetail[this.itemNum - 1];
				if (_itemObj) {
					this.itemId = _itemObj.topic_id;
					this.itemName = _itemObj.topic_name;
					this.itemArr = _itemObj.topic_answer;
					let choosedId = this.answerArr[this.itemId] || null;
					this.choosedId = choosedId;
				}
			},
			prevItem() {
				this.saveAnswer({
					answerId: this.choosedId,
					itemId: this.itemId,
					type: 'prev'
				});
				this.initNowData();
			},
			nextItem() {
				// console.log(this.choosedId);
				if (!this.choosedId) {
					alert('请选择答案');
					return false;
				}
				this.saveAnswer({
					answerId: this.choosedId,
					itemId: this.itemId,
					type: 'next'
				});
				this.initNowData();

			},
			choosed(answer_id) {
				this.choosedId = answer_id;
			},
			submitAnswer() {
				if (!this.choosedId) {
					alert('请选择答案');
					return false;
				}
				this.saveAnswer({
					answerId: this.choosedId,
					itemId: this.itemId,
					type: 'submit'
				});
				let _this = this;
				setTimeout(function() {
					_this.$router.push('score');
				}, 300);
			},
		},
		created() {
			console.log('created');
			console.log(this.$route);
			let params = this.$route.params;
			if(params.initFlag){
				this.initializeData();
			}
			this.initNowData()
		},
	};
</script>

<style lang="scss">
	.countdown-box{
		position: absolute;
		display: block;
		left: 5%;
		color: red;
		top: 1rem;
	}
	.top_tips {
		position: absolute;
		height: 7.35rem;
		width: 3.25rem;
		top: -1.3rem;
		right: 1.6rem;
		background: url(../images/WechatIMG2.png) no-repeat;
		background-size: 100% 100%;
		z-index: 10;

		.num_tip {
			position: absolute;
			left: 0.48rem;
			bottom: 1.1rem;
			height: 0.7rem;
			width: 2.5rem;
			font-size: 0.6rem;
			font-family: '黑体';
			font-weight: 600;
			color: #a57c50;
			text-align: center;
		}
	}

	.item_container_style {
		height: 11.625rem;
		width: 13.15rem;
		background-repeat: no-repeat;
		position: absolute;
		top: 4.1rem;
		left: 1rem;
	}

	.home_logo {
		background-image: url(../images/1-2.png);
		background-size: 13.142rem 100%;
		background-position: right center;
	}

	.item_back {
		background-image: url(../images/2-1.png);
		background-size: 100% 100%;
	}

	.button_style {
		height: 2.1rem;
		width: 4.35rem;
		background-size: 100% 100%;
		position: relative;
		background-repeat: no-repeat;
		display: inline-block;
		float: none;

		&:not(:last-child) {
			margin-right: 5%;
		}
	}

	.start {
		background-image: url(../images/1-4.png);
		position: absolute;
		top: 16.5rem;
		left: 50%;
		margin-left: -2.4rem;
	}

	.next_item {
		background-image: url(../images/2-2.png);
	}

	.prev_item {
		background-image: url(../images/2-3.png);
	}

	.submit_item {
		background-image: url(../images/3-1.png);
	}

	.item_list_container {
		position: absolute;
		height: 7.0rem;
		width: 8.0rem;
		top: 2.4rem;
		left: 3rem;
		-webkit-font-smoothing: antialiased;
		text-align: left;
	}

	.item_title {
		font-size: 0.65rem;
		color: #FFF;
		line-height: 0.7rem;
	}

	.item_list {
		font-size: 0;
		margin-top: 0.4rem;
		width: 10rem;

		span {
			display: inline-block;
			font-size: 0.6rem;
			color: #FFF;
			vertical-align: middle;
		}

		.option_style {
			height: 0.725rem;
			width: 0.725rem;
			border: 1px solid #fff;
			border-radius: 50%;
			line-height: 0.725rem;
			text-align: center;
			margin-right: 0.3rem;
			font-size: 0.5rem;
			font-family: 'Arial';
		}

		.has_choosed {
			background-color: #ffd400;
			color: #575757;
			border-color: #ffd400;
		}

		.option_detail {
			width: 7.5rem;
			padding-top: 0.11rem;
		}
	}

	.action-btn-box {
		text-align: center;
		position: absolute;
		top: 16.5rem;
		width: 100%;
		clear: both;
		display: block;
		overflow: hidden;

		.button_style {}

		span {}
	}
</style>

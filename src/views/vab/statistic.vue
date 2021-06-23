<!--
 * @Descripttion: 统计数值组件演示
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年6月23日10:28:17
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<el-main>
		<el-alert title="一个非常简单的组件, 目的就是省去重复写样式, 支持千分符/前后缀等." type="success" style="margin-bottom:20px;"></el-alert>
		<el-row :gutter="15">
			<el-col :lg="8">
				<el-card shadow="never">
					<sc-statistic title="Title" value="112893" description="Description" tips="Tips" groupSeparator></sc-statistic>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never">
					<sc-statistic title="今日净利润" value="112893.00" prefix="¥" groupSeparator>
						比昨日<span class="up"><i class="el-icon-top"></i>+7.7%</span>
					</sc-statistic>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never">
					<sc-statistic title="留言" value="112893" suffix="条" groupSeparator>
						比昨日<span class="down"><i class="el-icon-bottom"></i>-18.9%</span>
					</sc-statistic>
				</el-card>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	import scStatistic from '@/components/scStatistic';

	export default {
		name: 'statistic',
		components: {
			scStatistic
		},
		data() {
			return {

			}
		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style scoped>
	.el-card {margin-bottom: 15px;}
	.up {color: #F56C6C;margin-left: 5px;}
	.down {color: #67C23A;margin-left: 5px;}
</style>

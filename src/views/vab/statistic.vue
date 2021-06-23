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
		<el-card shadow="never">
			<el-row :gutter="15">
				<el-col :lg="4">
					<sc-statistic title="Title" value="112893" description="Description" tips="Tips" groupSeparator></sc-statistic>
				</el-col>
				<el-col :lg="4">
					<sc-statistic title="今日净利润" value="112893.00" prefix="¥" groupSeparator>
						比昨日<span class="up"><i class="el-icon-top"></i>+7.7%</span>
					</sc-statistic>
				</el-col>
				<el-col :lg="4">
					<sc-statistic title="留言" value="112893" suffix="条" groupSeparator>
						比昨日<span class="down"><i class="el-icon-bottom"></i>-18.9%</span>
					</sc-statistic>
				</el-col>
			</el-row>
		</el-card>
		<el-card shadow="never" style="margin-top: 15px;">
			<h2 style="margin: 20px 0;">Attributes</h2>
			<table class="static-table">
				<thead>
					<tr>
						<th>参数</th>
						<th>说明</th>
						<th>类型</th>
						<th>可选值</th>
						<th>默认值</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>title</td>
						<td>标题</td>
						<td>String</td>
						<td>—</td>
						<td>-</td>
					</tr>
					<tr>
						<td>value</td>
						<td>数值</td>
						<td>String</td>
						<td>—</td>
						<td>-</td>
					</tr>
					<tr>
						<td>prefix</td>
						<td>数值的前缀</td>
						<td>String</td>
						<td>—</td>
						<td>-</td>
					</tr>
					<tr>
						<td>suffix</td>
						<td>数值的后缀</td>
						<td>String</td>
						<td>—</td>
						<td>-</td>
					</tr>
					<tr>
						<td>description</td>
						<td>描述</td>
						<td>String</td>
						<td>—</td>
						<td>-</td>
					</tr>
					<tr>
						<td>tips</td>
						<td>显示在标题右侧的提示图标</td>
						<td>String</td>
						<td>—</td>
						<td>-</td>
					</tr>
					<tr>
						<td>groupSeparator</td>
						<td>是否格式化千分符</td>
						<td>boolean</td>
						<td>—</td>
						<td>false</td>
					</tr>
				</tbody>
			</table>
			<h2 style="margin: 20px 0;">Slots</h2>
			<table class="static-table">
				<thead>
					<tr>
						<th>Name</th>
						<th>说明</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>default</td>
						<td>自定义描述内容</td>
					</tr>
				</tbody>
			</table>
		</el-card>
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
	.up {color: #F56C6C;margin-left: 5px;}
	.down {color: #67C23A;margin-left: 5px;}
</style>

<!--
 * @Descripttion: 表格选择器组件演示
 * @version: 1.0
 * @Author: sakya
 * @Date: 2021年6月8日09:29:14
 * @LastEditors: sakya
 * @LastEditTime: 2021年6月8日09:29:14
-->

<template>
	<el-main>
		<el-card shadow="never">
			<el-select ref="selectDom" v-model="value" value-key="value" placeholder="请选择" :loading="loading" multiple clearable  @visible-change="visibleChange($event)">
				<div class="select-dropdown">
					<div class="select-dropdown-option">
						<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</div>
					<div class="page">
						<el-pagination small background layout="pager" :total="total" :page-size="pageSize" v-model:currentPage="currentPage" @current-change="reload"></el-pagination>
					</div>
				</div>
			</el-select>
		</el-card>
		<p>value:{{value}}</p>
		<p>currentPage:{{currentPage}}</p>
	</el-main>
</template>

<script>
	export default {
		name: 'tableselect',
		data() {
			return {
				value: null,
				loading: false,
				pageSize: 20,
				total: 0,
				currentPage: 1,
				options: [],
			}
		},
		computed: {

		},
		mounted() {

		},
		methods: {
			//获取数据
			async getData(){
				this.loading = true;
				var reqData = {
					page: this.currentPage
				}
				var res = await this.$API.user.list.get(reqData);
				this.options = res.data;
				this.total = res.count;
				this.loading = false;
			},
			//选项打开或关闭时
			visibleChange(isopen){
				if(isopen){
					this.getData()
				}
			},
			//分页点击
			reload(){
				this.getData();
			},
			remoteMethod(query) {
				if (query !== '') {
					this.getData()
				}
			}
		}
	}
</script>

<style scoped>
	.select-dropdown-option {max-height:190px;overflow: auto;}
	.page {border-top: 1px solid #eee;padding: 6px 1px 0 1px;}
</style>

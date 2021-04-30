<template>
	<div class="scTable" ref="scTableMain" v-loading="loading">
		<div class="scTable-table">
			<el-table :data="tableData" ref="scTable" :height="tableHeight" stripe highlight-current-row
				@selection-change="selectionChange"
			>
				<slot></slot>
				<template #empty>
					<el-empty description="暂无数据" :image-size="100"></el-empty>
				</template>
			</el-table>
		</div>
		<div class="scTable-page">
			<el-pagination background :small="true" layout="total, prev, pager, next, jumper" :total="total" :page-size="pageSize" v-model:currentPage="currentPage" @current-change="reload"></el-pagination>
			<div>
				<el-button @click="refresh" icon="el-icon-refresh" circle style="margin-left:15px"></el-button>
				<el-button @click="setting" icon="el-icon-setting" circle style="margin-left:15px"></el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'scTable',
		props: {
			apiObj: { type: Object, default: () => {} },
			//apiObj: { type: String, default: "" },
		},
		data() {
			return {
				tableData: [],
				pageSize: 20,
				total: 0,
				currentPage: 1,
				loading: false,
				tableHeight:'100%'
			}
		},
		created() {
			this.$nextTick(() => {
				this.upTableHeight()
			})
		},
		mounted() {
			this.getData();
			window.onresize = () => {
				this.upTableHeight()
			}
		},
		methods: {
			//更新表格高度
			upTableHeight(){
				this.tableHeight = (this.$refs.scTableMain.offsetHeight - 50 ) + "px"
			},
			//获取数据
			async getData(page=1){
				this.loading = true;
				var reqData = {
					page: page
				}
				var res = await this.apiObj.get(reqData);
				this.tableData = res.data;
				this.total = res.count;
				this.loading = false;
			},
			//分页点击
			reload(page){
				this.getData(page);
			},
			//刷新数据
			refresh(){
				this.getData(this.currentPage);
			},
			//表格设置
			setting(){

			},
			//转发原装方法&事件
			selectionChange(selection){
				this.$emit('selection-change', selection)
			}
		}
	}
</script>

<style scoped>
	.scTable {display:flex;flex-direction:column;height:100%;}
	.scTable-table {flex:1;}
	.scTable-page {margin-top: 20px;height:50px;display: flex;align-items: center;justify-content: space-between;}
</style>

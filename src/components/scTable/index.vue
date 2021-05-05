<template>
	<div class="scTable" ref="scTableMain" v-loading="loading">
		<div class="scTable-table">
			<el-table :data="tableData" :row-key="rowKey" ref="scTable" :height="tableHeight" stripe  @selection-change="selectionChange">
				<slot></slot>
				<el-table-column min-width="1"></el-table-column>
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
		<el-drawer title="表格设置" v-model="tableSetting" :size="400" direction="btt" custom-class="scTable-setting" append-to-body destroy-on-close>
			待开发
		</el-drawer>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'

	export default {
		name: 'scTable',
		components: {
			draggable
		},
		props: {
			apiObj: { type: Object, default: () => {} },
			data: { type: Object, default: () => {} },
			rowKey: { type: String, default: "" }
		},
		watch: {
			//监听从props里拿到值了
			data(){
				this.tableData = this.data;
				this.total = this.tableData.length;
			}
		},
		data() {
			return {
				tableData: [],
				pageSize: 20,
				total: 0,
				currentPage: 1,
				loading: false,
				tableHeight:'100%',
				tableSetting: false,
				tableParams: {}
			}
		},
		created() {
			this.$nextTick(() => {
				this.upTableHeight()
			})
		},
		mounted() {
			if(this.apiObj){
				this.getData();
			}
		},
		activated(){
			window.addEventListener("resize", this.upTableHeight, true)
		},
		deactivated(){
			window.removeEventListener("resize", this.upTableHeight, true)
		},
		methods: {
			//更新表格高度
			upTableHeight(){
				this.tableHeight = (this.$refs.scTableMain.offsetHeight - 50 ) + "px"
			},
			//获取数据
			async getData(){
				this.loading = true;
				var reqData = {
					page: this.currentPage
				}
				Object.assign(reqData, this.tableParams)
				var res = await this.apiObj.get(reqData);
				this.tableData = res.data;
				this.total = res.count;
				this.loading = false;
			},
			//分页点击
			reload(){
				this.getData();
			},
			//刷新数据
			refresh(){
				this.getData();
			},
			//更新数据
			upData(params){
				this.currentPage = 1;
				this.tableParams = params;
				this.getData()
			},
			//表格设置
			setting(){
				this.tableSetting = true;
			},
			userColumnClose(index){
				this.userColumn.splice(index, 1);
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
	.scTable-page {height:50px;display: flex;align-items: center;justify-content: space-between;padding:0 15px;}

	.setting-column {display:flex;padding:0 20px;}
	.setting-column > div {border: 1px solid #eee;height: 250px;}
	.setting-column .all {width: 300px;margin-right:20px;}
	.setting-column .all span {display: inline-block;width: 100%;height:30px;line-height: 30px;padding:0 15px;}
	.setting-column .all span:hover {background: #ecf5ff;}
	.setting-column .user {flex:1;padding:20px;}
	.setting-column .user>div {width: 100%;height: 100%;}
	.setting-column .user .el-tag {margin:0 8px 8px 0;}
</style>

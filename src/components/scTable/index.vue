<template>
	<div class="scTable" ref="scTableMain" v-loading="loading">
		<div class="scTable-table">
			<el-table :data="tableData" :row-key="rowKey" :key="toggleIndex" ref="scTable" :height="tableHeight" stripe  @selection-change="selectionChange">
				<slot></slot>
				<el-table-column v-for="(item, index) in userColumn" :key="index" :label="item.label" :prop="item.prop" :width="item.width">
					<template #default="scope">
						{{scope.row[item.prop]}}
					</template>
					<template #header>
						{{item.label}}
						<i class="el-icon-remove" style="color: #F56C6C;cursor: pointer;" @click="removeColumn(index)"></i>
					</template>
				</el-table-column>
				<el-table-column min-width="1"></el-table-column>
				<template #empty>
					<el-empty description="暂无数据" :image-size="100"></el-empty>
				</template>
			</el-table>
		</div>
		<div class="scTable-page">
			<el-pagination background :small="true" layout="total, prev, pager, next, jumper" :total="total" :page-size="pageSize" v-model:currentPage="currentPage" @current-change="reload"></el-pagination>
			<div class="scTable-do">
				<el-button @click="refresh" icon="el-icon-refresh" circle style="margin-left:15px"></el-button>
				<el-popover placement="top" title="设置" :width="500" trigger="click">
					<template #reference>
						<el-button icon="el-icon-setting" circle style="margin-left:15px"></el-button>
					</template>
					<columnSetting ref="columnSetting" @userChange="columnSettingChange" :column="column"></columnSetting>
				</el-popover>
			</div>
		</div>
	</div>
</template>

<script>
	import columnSetting from './columnSetting'

	export default {
		name: 'scTable',
		components: {
			columnSetting
		},
		props: {
			apiObj: { type: Object, default: () => {} },
			data: { type: Object, default: () => {} },
			rowKey: { type: String, default: "" },
			column: { type: Object, default: () => {} }
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
				toggleIndex: 0,
				tableData: [],
				pageSize: 20,
				total: 0,
				currentPage: 1,
				loading: false,
				tableHeight:'100%',
				tableParams: {},
				userColumn: []
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
			//自定义变化事件
			columnSettingChange(userColumn){
				this.userColumn = userColumn;
				this.toggleIndex += 1;
			},
			removeColumn(index){
				this.$refs.columnSetting.remove(index)
				this.toggleIndex += 1;
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
	.scTable-do {white-space: nowrap;}
</style>

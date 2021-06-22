<template>
	<div class="scTable" ref="scTableMain" v-loading="loading">
		<div class="scTable-table">
			<el-table :data="tableData" :row-key="rowKey" :key="toggleIndex" ref="scTable" :height="tableHeight" :stripe="stripe" :highlight-current-row="highlightCurrentRow"  @selection-change="selectionChange" @current-change="currentChange">
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
					<el-empty :description="emptyText" :image-size="100"></el-empty>
				</template>
			</el-table>
		</div>
		<div class="scTable-page">
			<div class="scTable-pagination">
				<el-pagination v-if="!hidePagination" background :small="true" :layout="paginationLayout" :total="total" :page-size="pageSize" v-model:currentPage="currentPage" @current-change="reload"></el-pagination>
			</div>
			<div class="scTable-do" v-if="!hideDo">
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
	import config from "@/config/table";
	import columnSetting from './columnSetting'

	export default {
		name: 'scTable',
		components: {
			columnSetting
		},
		props: {
			apiObj: { type: Object, default: () => {} },
			params: { type: Object, default: () => {} },
			data: { type: Object, default: () => {} },
			rowKey: { type: String, default: "" },
			column: { type: Object, default: () => {} },
			hidePagination: { type: Boolean, default: false },
			hideDo: { type: Boolean, default: false },
			stripe: { type: Boolean, default: false },
			highlightCurrentRow: { type: Boolean, default: false },
			paginationLayout: { type: String, default: "total, prev, pager, next, jumper" },
		},
		watch: {
			//监听从props里拿到值了
			data(){
				this.tableData = this.data;
				this.total = this.tableData.length;
			},
			apiObj(){
				this.tableParams = this.params;
				this.refresh();
			}
		},
		data() {
			return {
				emptyText: "暂无数据",
				toggleIndex: 0,
				tableData: [],
				pageSize: config.pageSize,
				total: 0,
				currentPage: 1,
				loading: false,
				tableHeight:'100%',
				tableParams: this.params,
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
			}else if(this.data){
				this.tableData = this.data;
				this.total = this.tableData.length
			}
		},
		activated(){
			this.$nextTick(() => {
				this.upTableHeight()
			})
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
					[config.request.page]: this.currentPage,
					[config.request.pageSize]: this.pageSize
				}
				Object.assign(reqData, this.tableParams)
				try {
					var res = await this.apiObj.get(reqData);
				}catch(error){
					this.loading = false;
					this.emptyText = error.statusText;
					return false;
				}
				var response = config.parseData(res);
				if(response.code != 200){
					this.loading = false;
					this.emptyText = response.msg;
				}else{
					this.emptyText = "暂无数据";
					this.tableData = response.rows;
					this.total = response.total;
					this.loading = false;
				}
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
			},
			currentChange(selection){
				this.$emit('current-change', selection)
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

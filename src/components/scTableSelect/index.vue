<!--
 * @Descripttion: 分页下拉组件
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年6月10日10:04:07
 * @LastEditors:
 * @LastEditTime:
-->

<template>

	<el-select ref="select" v-model="defaultValue" clearable multiple filterable placeholder="请选择" :filter-method="filterMethod" @remove-tag="removeTag" @visible-change="visibleChange" @clear="clear">
		<template #empty>
			<div class="sc-table-select__table" style="width: 500px;" v-loading="loading">
				<el-table ref="table" :data="tableData" :height="245" stripe @select="select" @select-all="selectAll">
					<el-table-column type="selection" width="45"></el-table-column>
					<el-table-column prop="id" label="ID" width="150"></el-table-column>
					<el-table-column prop="user" label="姓名"></el-table-column>
				</el-table>
				<div class="sc-table-select__page">
					<el-pagination small background layout="prev, pager, next" :total="total" :page-size="pageSize" v-model:currentPage="currentPage" @current-change="reload"></el-pagination>
				</div>
			</div>
		</template>
	</el-select>
</template>

<script>
	export default {
		props: {
			modelValue: null,
			mode: { type: String, default: "popover" },
		},
		data() {
			return {
				loading: false,
				keyword: null,
				defaultValue: [],
				tableData: [],
				pageSize: 20,
				total: 0,
				currentPage: 1,
				props: {
					label: 'user',
					value: 'id'
				}
			}
		},
		computed: {

		},
		watch: {
			modelValue(){
				this.defaultValue = this.modelValue
				this.autoCurrentLabel()
			},
			defaultValue(){
				this.$emit('update:modelValue', this.defaultValue);
			}
		},
		mounted() {
			this.defaultValue =  this.modelValue
			this.autoCurrentLabel()
		},
		methods: {
			//表格显示隐藏回调
			visibleChange(visible){
				if(visible){
					this.currentPage = 1
					this.getData()
				}
			},
			//获取表格数据
			async getData(){
				this.loading = true;
				var reqData = {
					page: this.currentPage,
					pageSize: this.pageSize,
					keyword: this.keyword
				}
				var res = await this.$API.log.list.get(reqData);
				this.tableData = res.data;
				this.total =  res.count;
				this.loading = false;
				//表格默认赋值
				this.$nextTick(() => {
					this.defaultValue.forEach(row => {
						var setrow = this.tableData.filter(item => item[this.props.value]===row[this.props.value] )
						if(setrow.length > 0){
							this.$refs.table.toggleRowSelection(setrow[0], true);
						}
					})
				})
			},
			//分页刷新表格
			reload(){
				this.getData()
			},
			//自动模拟options赋值
			autoCurrentLabel(){
				this.$nextTick(() => {
					this.$refs.select.selected.forEach(item => {
						item.currentLabel = item.value[this.props.label]
					})
				})
			},
			//表格勾选事件
			select(rows, row){
				var isSelect = rows.length && rows.indexOf(row) !== -1
				if(isSelect){
					this.defaultValue.push(row)
				}else{
					this.defaultValue.splice(this.defaultValue.findIndex(item => item[this.props.value] == row[this.props.value]), 1)
				}
				this.autoCurrentLabel()
			},
			//表格全选事件
			selectAll(rows){
				var isAllSelect = rows.length > 0
				if(isAllSelect){
					rows.forEach(row => {
						var isHas = this.defaultValue.find(item => item[this.props.value] == row[this.props.value])
						if(!isHas){
							this.defaultValue.push(row)
						}
					})
				}else{
					this.tableData.forEach(row => {
						var isHas = this.defaultValue.find(item => item[this.props.value] == row[this.props.value])
						if(isHas){
							this.defaultValue.splice(this.defaultValue.findIndex(item => item[this.props.value] == row[this.props.value]), 1)
						}
					})
				}
				this.autoCurrentLabel()
			},
			//tags删除后回调
			removeTag(tag){
				var row = this.findRowByKey(tag[this.props.value])
				this.$refs.table.toggleRowSelection(row, false);
			},
			//清空后的回调
			clear(){
				//this.$emit('update:modelValue', this.defaultValue);
			},
			// 关键值查询表格数据行
			findRowByKey (value) {
				return this.tableData.find(item => item[this.props.value] === value)
			},
			filterMethod(keyword){
				if(!keyword){
					this.keyword = null;
					return false;
				}
				this.keyword = keyword;
				this.getData()
			}

		}
	}
</script>

<style scoped>
	.sc-table-select__table {padding:12px;}
	.sc-table-select__page {padding-top: 12px;}
</style>

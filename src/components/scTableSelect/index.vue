<!--
 * @Descripttion: 分页下拉组件
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年6月10日10:04:07
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<div class="sc-table-select">
		<el-popover ref="popover" v-model:visible="visible" :width="500" placement="bottom-start">
			<template #reference>
				<div>
					<el-input placeholder="请选择" readonly :class="{ 'is-focus': visible }" >
						<template #suffix>
							<i class="el-input__icon el-icon-arrow-up"></i>
						</template>
					</el-input>
					<div class="sc-table-select__tags">
						<el-tag type="info" size="mini" closable>超小标签</el-tag>
						<el-tag type="info" size="mini" closable>超小标签</el-tag>
					</div>
				</div>
			</template>
			<div style="height:300px">
				<el-table :data="tableData" :height="200">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="date" label="日期" width="150"></el-table-column>
					<el-table-column prop="name" label="姓名"></el-table-column>
				</el-table>
			</div>
		</el-popover>
	</div>


</template>

<script>
	export default {
		props: {
			modelValue: null,
			mode: { type: String, default: "popover" },
		},
		data() {
			return {
				visible: false,
				tableData: [{
				            date: '2016-05-02',
				            name: '王小虎',
				            address: '上海市普陀区金沙江路 1518 弄'
				          }, {
				            date: '2016-05-04',
				            name: '王小虎',
				            address: '上海市普陀区金沙江路 1517 弄'
				          }, {
				            date: '2016-05-01',
				            name: '王小虎',
				            address: '上海市普陀区金沙江路 1519 弄'
				          }, {
				            date: '2016-05-03',
				            name: '王小虎',
				            address: '上海市普陀区金沙江路 1516 弄'
				          }]
			}
		},
		watch:{

		},
		mounted() {
			console.log(this.$refs.popover);
		},
		methods: {

		}
	}
</script>

<style scoped>
	.sc-table-select {position: relative;}

	.sc-table-select .el-input.is-focus:deep(.el-input__inner)  {border-color: #409eff;}

	.sc-table-select__tags {position: absolute;z-index: 1;top: 50%;transform: translateY(-50%);}
	.sc-table-select__tags .el-tag {margin: 2px 0 2px 6px;border-color: transparent;background-color: #f0f2f5;}
	.sc-table-select__tags .el-tag:deep(.el-icon-close)  {background-color: #c0c4cc;color: #fff;right: -7px;}
	.sc-table-select__tags .el-tag:deep(.el-icon-close):hover {background-color: #909399;}
</style>

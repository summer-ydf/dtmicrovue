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
					<el-input ref="input" placeholder="请选择" readonly :class="{ 'is-focus': visible }">
						<template #suffix>
							<i :class="['el-select__caret', 'el-input__icon', 'el-icon-arrow-up', visible?'is-reverse':'' ]"></i>
						</template>
					</el-input>
					<div ref="tags" class="sc-table-select__tags" :style="{ 'padding-right': '32px', width: '100%' }">
						<el-tag v-for="(tag,index) in tags" :key="tag.value" type="info" size="mini" closable @close="deleteTag(index)">{{tag.label}}</el-tag>
					</div>
				</div>
			</template>
			<div style="height:300px">
				<el-table :data="tableData" :height="260" stripe @selection-change="selectionChange">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="id" label="ID" width="50"></el-table-column>
					<el-table-column prop="name" label="姓名"></el-table-column>
				</el-table>
				<div class="sc-table-select__page">
					<el-pagination small background layout="prev, pager, next" :total="500"></el-pagination>
				</div>
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
				tags: [
					{
						value: '1',
						label: '黄金糕'
					},
					{
						value: '2',
						label: '双皮奶'
					}
				],
				visible: false,
				tableData: [{
					id: '10',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				  }, {
					id: '11',
					name: '张小帅',
					address: '上海市普陀区金沙江路 1517 弄'
				  }, {
					id: '12',
					name: '刘先发',
					address: '上海市普陀区金沙江路 1519 弄'
				  }, {
					id: '13',
					name: '张三',
					address: '上海市普陀区金沙江路 1516 弄'
				  }]
			}
		},
		watch:{
			tags: {
				handler(){
					console.log("1");
					this.setInputHeight()
				},
				deep: true
			}
		},
		mounted() {
			this.setInputHeight()
		},
		methods: {
			setInputHeight(){
				this.$nextTick(() => {
					this.$refs.input.input.style.height = this.$refs.tags.clientHeight + 6 + 'px'
				})
			},
			deleteTag(index){
				this.tags.splice(index, 1);
			},
			selectionChange(selection){
				selection.forEach(item => {
					this.tags.push({
						value: item.id,
						label: item.name
					})
				})
			}
		}
	}
</script>

<style scoped>

	.sc-table-select {position: relative;}

	.sc-table-select .el-input.is-focus:deep(.el-input__inner)  {border-color: #409eff;}
	.sc-table-select .el-input .el-select__caret {color: #C0C4CC;
  font-size: 14px;
  transition: transform .3s;
  transform: rotateZ(180deg);
  cursor: pointer;}
	.sc-table-select .el-input .el-select__caret.is-reverse {
	  transform: rotateZ(0);
	}

	.sc-table-select__page {padding-top: 12px;}


	.sc-table-select__tags {position: absolute;z-index: 1;top: 50%;transform: translateY(-50%);}
	.sc-table-select__tags .el-tag {margin: 2px 0 2px 6px;border-color: transparent;background-color: #f0f2f5;}
	.sc-table-select__tags .el-tag:deep(.el-icon-close)  {background-color: #c0c4cc;color: #fff;right: -7px;}
	.sc-table-select__tags .el-tag:deep(.el-icon-close):hover {background-color: #909399;}
</style>

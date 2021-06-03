<template>
	<div class="sc-form-table">
		<el-table :data="data" border stripe>
			<el-table-column type="index" width="50" fixed="left">
				<template #header>
					<el-button type="primary" icon="el-icon-plus" size="mini" circle @click="rowAdd"></el-button>
				</template>
				<template #default="scope">
					<div class="sc-form-table-handle">
						<span>{{scope.$index + 1}}</span>
						<el-button type="danger" icon="el-icon-delete" size="mini" circle @click="rowDel(scope.row, scope.$index)"></el-button>
					</div>
				</template>
			</el-table-column>
			<slot></slot>
			<el-table-column min-width="1"></el-table-column>
			<template #empty>
				{{placeholder}}
			</template>
		</el-table>
	</div>
</template>

<script>
	export default {
		props: {
			modelValue: { type: Array, default: () => [] },
			addTemplate: { type: Object, default: () => {} },
			placeholder: { type: String, default: "暂无数据" }
		},
		data(){
			return {
				data: [],
			}
		},
		mounted(){
			this.data = this.modelValue
		},
		watch:{
			modelValue(){
				this.data = this.modelValue
			},
			data: {
				handler(){
					this.$emit('update:modelValue', this.data);
				},
				deep: true
			}
		},
		methods: {
			rowAdd(){
				this.data.push({...this.addTemplate})
			},
			rowDel(row, index){
				this.data.splice(index, 1)
			}
		}
	}
</script>

<style scoped>
	.sc-form-table .sc-form-table-handle {text-align: center;}
	.sc-form-table .sc-form-table-handle span {display: inline-block;}
	.sc-form-table .sc-form-table-handle button {display: none;}
	.sc-form-table .hover-row .sc-form-table-handle span {display: none;}
	.sc-form-table .hover-row .sc-form-table-handle button {display: inline-block;}
</style>

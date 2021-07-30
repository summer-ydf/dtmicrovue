<!--
 * @Descripttion: 过滤器V2
 * @version: 2.0
 * @Author: sakuya
 * @Date: 2021年7月30日14:48:41
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<el-main>
		<el-card shadow="never">
			<el-badge :value="2" type="danger">
				<el-button size="small" icon="sc-icon-filter-line" @click="openFilter"></el-button>
			</el-badge>

			<el-drawer title="过滤器" v-model="drawer" :size="650">
				<el-container>
					<el-main style="padding:0">

						<el-tabs class="root">
							<el-tab-pane>
								<template #label>
									<div class="tabs-label">
										过滤项
									</div>
								</template>
								<el-scrollbar>

									<div class="sc-filter-main">
										<h2>设置过滤条件</h2>

										<el-alert v-if="filter.length<=0" title="没有默认过滤条件,请点击增加过滤项" type="warning" :closable="false" center style="margin:15px 0;"></el-alert>


										<table v-else>
											<colgroup>
												<col width="50">
												<col width="140">
												<col>
												<col width="40">
											</colgroup>
											<tr v-for="(item,index) in filter" :key="index">
												<td>
													<el-tag size="medium">{{index+1}}</el-tag>
												</td>
												<td>
													<el-select v-model="item.field" placeholder="过滤字段" filterable @change="fieldChange(item)">
														<el-option v-for="field in fields" :key="field.value" :label="field.label" :value="field"></el-option>
													</el-select>
												</td>
												<td>

													<el-input v-if="item.field.type=='text'" v-model="item.value" :placeholder="item.field.placeholder"></el-input>

													<el-select v-if="item.field.type=='select'" v-model="item.value" :placeholder="item.field.placeholder" filterable :multiple="item.field.extend.multiple">
														<el-option v-for="field in item.field.extend.data" :key="field.value" :label="field.label" :value="field.value"></el-option>
													</el-select>

													<el-date-picker v-if="item.field.type=='datetime'" v-model="item.value" type="datetime" :placeholder="item.field.placeholder" style="width: 100%;"></el-date-picker>

													<el-date-picker v-if="item.field.type=='datetimerange'" v-model="item.value" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 100%;"></el-date-picker>

													<el-switch v-if="item.field.type=='switch'" v-model="item.value"></el-switch>

												</td>
												<td>
													<i class="el-icon-delete del" @click="delFilter(index)"></i>
												</td>
											</tr>
										</table>
										<el-button type="text" icon="el-icon-plus" @click="addFilter">增加过滤项</el-button>
									</div>

								</el-scrollbar>
							</el-tab-pane>
							<el-tab-pane>
								<template #label>
									<div class="tabs-label">
										常用
									</div>
								</template>
								<el-scrollbar>
									<ul class="sc-filter-my">
										<li><label>已过期的用户</label></li>
										<li><label>类型为正常且已缴费的用户</label></li>
									</ul>
								</el-scrollbar>
							</el-tab-pane>
						</el-tabs>

					</el-main>
					<el-footer>
						<el-button type="primary" @click="ok">立即过滤</el-button>
						<el-button type="primary" plain @click="savemy">保存常用</el-button>
						<el-button>重置</el-button>
					</el-footer>
				</el-container>
			</el-drawer>

		</el-card>
	</el-main>
</template>

<script>
	export default {
		name: 'filterBar2',
		data() {
			return {
				drawer: false,
				form: {
					checkboxGroup1: ['1'],
					radio1: ''
				},
				fields: [
					{
						label: 'ID',
						value: 'id',
						type: 'text',
						selected: true,
						placeholder: '请输入ID'
					},
					{
						label: '姓名',
						value: 'name',
						type: 'text',
						placeholder: '请输入姓名'
					},
					{
						label: '类型',
						value: 'type',
						type: 'select',
						selected: true,
						placeholder: '请选择类型',
						extend: {
							//multiple: true,
							data: [
								{
									label: "选项1",
									value: "1"
								},
								{
									label: "选项2",
									value: "2"
								}
							]
						}
					},
					{
						label: '注册日期',
						value: 'date',
						type: 'datetime',
						placeholder: '请选择日期时间'
					},
					{
						label: '有效期',
						value: 'date2',
						type: 'datetimerange',
						placeholder: '请选择日期时间'
					},
					{
						label: '是否警用',
						value: 'switch',
						type: 'switch'
					}
				],
				filter: []
			}
		},
		mounted() {
			//默认显示
			this.fields.forEach((item) => {
				if(item.selected){
					this.filter.push({
						field: item,
						value: ''
					})
				}
			})
		},
		methods: {
			openFilter(){
				this.drawer = true
			},
			addFilter(){
				this.filter.push({
					field: this.fields[0],
					value: ''
				})
			},
			delFilter(index){
				console.log(index)
				this.filter.splice(index, 1)
			},
			ok(){
				console.log(this.filter);
			},
			fieldChange(tr){
				tr.value = ''
			},
			savemy(){
				this.$prompt('请输入常用过滤名称', '提示', {
					inputPlaceholder: '请输入常用过滤名称'
				})
				.then(({ value }) => {
					console.log(value);
				})
				.catch(() => {
					//
				})
			}
		}
	}
</script>

<style scoped>
	.tabs-label {padding:0 20px;}

	.sc-filter-main {padding:20px;border-bottom: 1px solid #e6e6e6;background: #fff;}
	.sc-filter-main h2 {font-size: 12px;color: #999;font-weight: normal;}
	.sc-filter-main table {width: 100%;margin: 15px 0;}
	.sc-filter-main table tr {}
	.sc-filter-main table td {padding:5px 10px 5px 0;}
	.sc-filter-main table td .el-select {display: block;}
	.sc-filter-main table td .el-date-editor.el-input {display: block;width: 100%;}
	.sc-filter-main table td .del {background: #fff;color: #999;width: 32px;height: 32px;line-height: 32px;text-align: center;border-radius:50%;font-size: 12px;cursor: pointer;}
	.sc-filter-main table td .del:hover {background: #F56C6C;color: #fff;}

	.sc-filter-my {list-style-type: none;padding:15px;}
	.sc-filter-my li {font-size: 12px;margin-bottom: 15px;}
	.sc-filter-my li label {background: #222b45;color: #fff;padding:5px 10px;border-radius:4px;}
	.sc-filter-my li:hover {box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);position: relative;}

	.root {
	    display: flex;
		height: 100%;
	    flex-direction: column
	}
	.root:deep(.el-tabs__header) {margin: 0;}
	.root:deep(.el-tabs__content) {flex: 1;background: #f6f8f9;}
	.root:deep(.el-tabs__content) .el-tab-pane{overflow: auto;height:100%;}
</style>

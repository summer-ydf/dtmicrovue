<template>
	<el-main>
		<el-card shadow="never">
			<div class="sc-filterBar">
				<div class="sc-filterBar-tags">
					<el-space wrap>


						<div class="filter-tag" v-for="item in filter"><span class="field">{{item.keyLabel}}</span><span class="value">{{item.valueLabel}}<i @click="handleClose(item)" class="el-icon-close"></i></span></div>

						<el-popover title="新建过滤器" :width="550" trigger="manual" v-model:visible="isadd">
							<template #reference>
								<el-button class="button-new-tag" size="mini" type="primary" @click="isadd=true" icon="el-icon-zoom-in"></el-button>
							</template>

							<el-form ref="ruleForm" :model="addFilterForm" :rules="addFilterRules" label-width="80px">
								<el-form-item label="字段" prop="field">
									<el-select v-model="addFilterForm.field" placeholder="请选择" value-key="value" @change="fieldChange" filterable clearable>
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="值" prop="value">

									<el-input v-if="!addFilterForm.field.type" v-model="addFilterForm.value" placeholder="请先选择过滤字段" disabled style="width: 400px;"></el-input>

									<el-input v-if="addFilterForm.field.type=='text'" v-model="addFilterForm.value" placeholder="请输入内容" style="width: 400px;"></el-input>

									<el-select v-if="addFilterForm.field.type=='select'" v-model="addFilterForm.value" :loading="selectLoading" :multiple="addFilterForm.field.extend?addFilterForm.field.extend.multiple:false" :remote="addFilterForm.field.extend?addFilterForm.field.extend.remote:false" @visible-change="visibleChange($event)" :remote-method="remoteMethod" filterable clearable placeholder="请选择/输入关键词" style="width: 400px;">
										<el-option  v-for="item in addFilterForm.field.extend.data" :key="item.value" value-key="value" :label="item.label" :value="item"></el-option>
									</el-select>

									<el-date-picker v-if="addFilterForm.field.type=='date'" v-model="addFilterForm.value" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>

								</el-form-item>
								<el-form-item >
									<el-button class="button-new-tag" type="primary" @click="ok" icon="el-icon-search">立即过滤</el-button>
									<el-button class="button-new-tag" @click="cancel">取消</el-button>
								</el-form-item>
							</el-form>






						</el-popover>
					</el-space>
				</div>
				<div class="el-input__inner"></div>
			</div>
		</el-card>
	</el-main>
</template>

<script>
	export default {
		name: 'filterBar',
		data() {
			return {
				isadd: false,
				selectLoading: false,
				addFilterForm: {
					field: '',
					value: ''
				},
				addFilterRules: {
					field: [{required: true, message: '请选择过滤字段'}],
					value: [{required: true, message: '过滤值不能为空'}]
				},
				filter: [
					{
						keyLabel: "姓名",
						valueLabel: "sakuya",
						key: "name",
						value: "sakuya"
					},
					{
						keyLabel: "日期",
						valueLabel: "2018-10-10",
						key: "data",
						value: "2018-10-10"
					}
				],
				options: [
					{
						label: '姓名',
						value: 'name',
						type: 'text'
					},
					{
						label: '性别',
						value: 'sex',
						type: 'select',
						extend: {
							data: [
								{
									value: '1',
									label: '男'
								},
								{
									value: '2',
									label: '女'
								}
							]
						}
					},
					{
						label: '日期',
						value: 'date',
						type: 'date',
						extend: {
							type: 'date'
						}
					},
					{
						label: '标签(多选)',
						value: 'tags',
						type: 'select',
						extend: {
							multiple: true,
							data: [{
								value: '选项1',
								label: '黄金糕'
							}, {
								value: '选项2',
								label: '双皮奶'
							}, {
								value: '选项3',
								label: '蚵仔煎'
							}, {
								value: '选项4',
								label: '龙须面'
							}, {
								value: '选项5',
								label: '北京烤鸭'
							}]
						}
					},
					{
						label: '角色(异步多选)',
						value: 'group',
						type: 'select',
						extend: {
							url: this.$API.user.info.url,
							data: []
						}
					},
					{
						label: '产品(远程搜索)',
						value: 'cp',
						type: 'select',
						extend: {
							remote: true,
							url: this.$API.user.info.url,
							data: []
						}
					}
				]
			}
		},
		methods: {
			remoteMethod(query){
				if(query !== ''){
					this.selectLoading = true;
					setTimeout(() => {
						this.addFilterForm.field.extend.data = [
							{
								value: '1',
								label: '异步模拟数据:'+query
							},
							{
								value: '2',
								label: '异步模拟数据:'+query
							}
						]
						this.selectLoading = false;
					}, 200);
				}else{
					this.addFilterForm.field.extend.data = [];
				}
			},
			visibleChange(isopen){
				if(isopen && this.addFilterForm.field.extend && this.addFilterForm.field.extend.url && !this.addFilterForm.field.extend.remote){
					//如果字段类型为异步获取数据就在这里处理
					console.log(this.addFilterForm.field.extend.url);
					this.selectLoading = true;
					var _this = this;
					setTimeout(function() {
						_this.addFilterForm.field.extend.data = [
							{
								value: '1',
								label: '异步模拟数据1'
							},
							{
								value: '2',
								label: '异步模拟数据2'
							}
						]
						_this.selectLoading = false;
					}, 500);
				}

			},
			fieldChange(){
				this.addFilterForm.value = '';
				if(this.addFilterForm.field.type=='select'){
					this.addFilterForm.field.type=''
					this.$nextTick(() => {
						this.addFilterForm.field.type='select'
					})
				}
			},
			ok() {
				this.$refs.ruleForm.validate((valid) => {
					if (valid) {
						var item = {
							keyLabel: this.addFilterForm.field.label,
							valueLabel: this.addFilterForm.value,
							key: this.addFilterForm.field.value,
							value: this.addFilterForm.value
						}
						if(this.addFilterForm.field.type=='select'){
							item.valueLabel = this.addFilterForm.value.label;
							item.value = this.addFilterForm.value.value;
						}
						this.filter.push(item);
						this.cancel()
					}else{
						return false;
					}
				})

			},
			cancel(){
				this.isadd = false;
				this.addFilterForm.value = '';
				this.$refs.ruleForm.resetFields();
			},
			handleClose(item) {
				this.filter = this.filter.filter(obj => obj.key !== item.key)
			}
		}
	}
</script>

<style scoped>
	.sc-filterBar {
		position: relative;
		height: 40px;
	}

	.sc-filterBar .el-input__inner {
		position: absolute;
	}

	.sc-filterBar .sc-filterBar-tags {
		position: absolute;
		z-index: 1;
		height: 40px;
		display: flex;
		align-items: center;
	}

	.button-new-tag {
		height: 32px;
		line-height: 30px;
		padding-top: 0;
		padding-bottom: 0;
	}

	.filter-tag {}
	.filter-tag .field {display: inline-block;background-color: #d9ecff;color: #409eff;height: 32px;line-height: 30px;padding: 0 10px;border-radius: 4px 0 0 4px;border: 1px solid #d9ecff;}
	.filter-tag .value {display: inline-block;background-color: #ecf5ff;color: #409eff;height: 32px;line-height: 30px;padding: 0 10px;border-radius: 0 4px 4px 0;border: 1px solid #d9ecff;}
	.filter-tag i {height: 16px;width: 16px;line-height: 16px;cursor: pointer;text-align: center;vertical-align: middle;position: relative;top: -1px;right: -5px;border-radius: 50%;}
	.filter-tag i:hover {background-color: #409eff;color: #FFF;}
</style>

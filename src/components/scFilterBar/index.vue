<template>
	<div class="sc-filterBar">
		<div class="sc-filterBar-scrollbar" ref="scFilterBarScrollbar">
			<div class="sc-filterBar-tags">
				<div class="filter-tag" v-for="item in filter" :key="item.keyLabel"><span class="field">{{item.keyLabel}}</span><span class="value">{{item.valueLabel}}<i @click="handleClose(item)" class="el-icon-close"></i></span></div>
			</div>
		</div>
		<el-popover title="新建过滤器" :width="550" trigger="manual" v-model:visible="isadd">
			<template #reference>
				<el-button class="button-new-tag" size="small" type="primary" @click="openAdd" icon="el-icon-zoom-in"></el-button>
			</template>
			<el-form ref="ruleForm" :model="addFilterForm" :rules="addFilterRules" label-width="80px" style="padding-top:10px;">
				<el-form-item label="字段" prop="field">
					<el-select v-model="addFilterForm.field" placeholder="请选择" value-key="value" @change="fieldChange" filterable clearable>
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item" :disabled="item.disabled">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="值" prop="value">

					<el-input v-if="!addFilterForm.field.type" v-model="addFilterForm.value" placeholder="请先选择过滤字段" disabled style="width: 400px;"></el-input>

					<el-input v-if="addFilterForm.field.type=='text'" v-model="addFilterForm.value" placeholder="请输入内容" clearable style="width: 400px;"></el-input>

					<el-select v-if="addFilterForm.field.type=='select'" v-model="addFilterForm.value" :loading="selectLoading" :multiple="addFilterForm.field.extend?addFilterForm.field.extend.multiple:false" :remote="addFilterForm.field.extend?addFilterForm.field.extend.remote:false" @visible-change="visibleChange($event)" :remote-method="remoteMethod" filterable clearable placeholder="请选择/输入关键词" style="width: 400px;">
						<el-option v-for="item in addFilterForm.field.extend.data" :key="item.value" value-key="value" :label="item.label" :value="item"></el-option>
					</el-select>

					<el-date-picker v-if="addFilterForm.field.type=='date'" v-model="addFilterForm.value" type="date" placeholder="请选择日期" style="width: 400px;"></el-date-picker>
					<el-date-picker v-if="addFilterForm.field.type=='daterange'" v-model="addFilterForm.value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="请选择日期" style="width: 400px;"></el-date-picker>
					<el-date-picker v-if="addFilterForm.field.type=='datetime'" v-model="addFilterForm.value" type="datetime" placeholder="请选择日期" style="width: 400px;"></el-date-picker>
					<el-date-picker v-if="addFilterForm.field.type=='datetimerange'" v-model="addFilterForm.value" type="datetimerange" :default-time="defaultTime" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="请选择日期" style="width: 400px;"></el-date-picker>

				</el-form-item>
				<el-form-item >
					<el-button class="button-new-tag" type="primary" @click="ok" icon="el-icon-search">立即过滤</el-button>
					<el-button class="button-new-tag" @click="cancel">取消</el-button>
				</el-form-item>
			</el-form>
		</el-popover>


	</div>
</template>

<script>
	export default {
		name: 'filterBar',
		props: {
			options: { type: Object, default: () => {} },
			defaultFilter: { type: Object, default: () => {} }
		},
		data() {
			return {
				defaultTime: [
					new Date(2000, 1, 1, 0, 0, 0),
					new Date(2000, 2, 1, 23, 59, 59)
				],
				isadd: false,
				selectLoading: false,
				addFilterForm: {
					field: '',
					value: ''
				},
				addFilterRules: {
					field: [{required: true, message: '请选择过滤字段', trigger: 'change'}],
					value: [{required: true, message: '过滤值不能为空', trigger: 'change'}]
				},
				filter: []
			}
		},
		mounted(){
			this.filter = this.defaultFilter || [];
			this.scrollInit()
		},
		methods: {
			openAdd(){
				if(this.isadd){
					this.isadd = false;
				}else{
					this.isadd = true;
				}

				//判断已有数据，禁用处理
				for(let f of this.options){
					const _f = this.filter.find((item)=>{return item.key === f.value});
					if(_f){
						f.disabled = true
					}else{
						f.disabled = false
					}
				}
			},
			async remoteMethod(query){
				if(query !== ''){
					this.selectLoading = true;
					try {
					var data = await this.addFilterForm.field.extend.request(query);
					}catch (error) {
						console.log(error);
					}
					this.addFilterForm.field.extend.data = data;
					this.selectLoading = false;
				}else{
					this.addFilterForm.field.extend.data = [];
				}
			},
			async visibleChange(isopen){
				if(isopen && this.addFilterForm.field.extend && this.addFilterForm.field.extend.request && !this.addFilterForm.field.extend.remote){
					//如果字段类型为异步获取数据就在这里处理
					this.selectLoading = true;
					try {
					var data = await this.addFilterForm.field.extend.request();
					}catch (error) {
						console.log(error);
					}
					this.addFilterForm.field.extend.data = data;
					this.selectLoading = false;
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
				if(this.addFilterForm.field.type=='date'){
					this.addFilterForm.field.type=''
					this.$nextTick(() => {
						this.addFilterForm.field.type='date'
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
							if(this.addFilterForm.field.extend && this.addFilterForm.field.extend.multiple){
								item.valueLabel = this.addFilterForm.value.map(v => v.label).join(",");
								item.value = this.addFilterForm.value.map(v => v.value).join(",");
							}else{
								item.valueLabel = this.addFilterForm.value.label;
								item.value = this.addFilterForm.value.value;
							}
						}
						if(this.addFilterForm.field.type=='date'){
							item.valueLabel = this.dateFormat(this.addFilterForm.value, 'yyyy-MM-dd');
							item.value = this.dateFormat(this.addFilterForm.value, 'yyyy-MM-dd');
						}
						if(this.addFilterForm.field.type=='datetime'){
							item.valueLabel = this.dateFormat(this.addFilterForm.value, 'yyyy-MM-dd hh:mm:ss');
							item.value = this.dateFormat(this.addFilterForm.value, 'yyyy-MM-dd hh:mm:ss');
						}
						if(this.addFilterForm.field.type=='daterange'){
							item.valueLabel = this.addFilterForm.value.map(item => this.dateFormat(item, 'yyyy-MM-dd')).join(" - ")
							item.value = this.addFilterForm.value.map(item => this.dateFormat(item, 'yyyy-MM-dd')).join(" - ")
						}
						if(this.addFilterForm.field.type=='datetimerange'){
							item.valueLabel = this.addFilterForm.value.map(item => this.dateFormat(item, 'yyyy-MM-dd hh:mm:ss')).join(" - ")
							item.value = this.addFilterForm.value.map(item => this.dateFormat(item, 'yyyy-MM-dd hh:mm:ss')).join(" - ")
						}
						this.filter.push(item);
						this.cancel();
						this.change();
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
				this.filter = this.filter.filter(obj => obj.key !== item.key);
				this.cancel();
				this.change();
			},
			getFilter(){
				var _filter = this.filter;
				var formatData = {};
				_filter.map(item => {
					formatData.[item.key]=item.value
				});
				return formatData;
			},
			change(){
				this.$emit('change', this.getFilter())
			},
			scrollInit(){
				const scrollDiv = this.$refs.scFilterBarScrollbar;
				scrollDiv.addEventListener('mousewheel', handler, false)
				function handler(event) {
					const detail = event.wheelDelta || event.detail;
					const moveForwardStep = 1;
					const moveBackStep = -1;
					let step = 0;
					if (detail < 0) {
						step = moveForwardStep * 50;
					}else{
						step = moveBackStep * 50;
					}
					scrollDiv.scrollLeft += step;
				}
			},
			dateFormat(date, fmt='yyyy-MM-dd'){
				date = new Date(date)
				var o = {
					"M+" : date.getMonth()+1,                 //月份
					"d+" : date.getDate(),                    //日
					"h+" : date.getHours(),                   //小时
					"m+" : date.getMinutes(),                 //分
					"s+" : date.getSeconds(),                 //秒
					"q+" : Math.floor((date.getMonth()+3)/3), //季度
					"S"  : date.getMilliseconds()             //毫秒
				};
				if(/(y+)/.test(fmt)) {
					fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
				}
				for(var k in o) {
					if(new RegExp("("+ k +")").test(fmt)){
						fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
					}
				}
				return fmt;
			}
		}
	}
</script>

<style scoped>
	.sc-filterBar {height: 32px;display: flex;align-items:center;}
	.sc-filterBar-scrollbar {overflow: auto;}
	.sc-filterBar-scrollbar::-webkit-scrollbar {display: none;}
	.sc-filterBar-tags {display: flex;}
	.filter-tag {display: flex;flex-shrink: 0;padding-right:10px;}
	.filter-tag .field {display: inline-block;background-color: #d9ecff;color: #409eff;height: 32px;line-height: 30px;padding: 0 10px;border-radius: 4px 0 0 4px;border: 1px solid #d9ecff;border-right: 0;}
	.filter-tag .value {display: inline-block;background-color: #ecf5ff;color: #409eff;height: 32px;line-height: 30px;padding: 0 10px;border-radius: 0 4px 4px 0;border: 1px solid #d9ecff;border-left: 0;}
	.filter-tag i {height: 16px;width: 16px;line-height: 16px;cursor: pointer;text-align: center;vertical-align: middle;position: relative;top: -1px;right: -5px;border-radius: 50%;}
	.filter-tag i:hover {background-color: #409eff;color: #FFF;}
</style>

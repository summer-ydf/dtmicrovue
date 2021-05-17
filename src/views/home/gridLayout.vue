<template>
	<div class="diy-grid-setting" @click.stop="setting">
		<i class="el-icon-setting"></i>
	</div>
	<div class="diy-grid-layout">
		<el-row :gutter="15">
			<el-col v-for="(item, index) in grid.layout" v-bind:key="index" :md="item" :xs="24">
				<draggable v-model="grid.copmsList[index]" :disabled="!isDiy" animation="200" handle=".el-card__header" group="people" @end="end" item-key="com">
					<template #item="{ element }">
						<div>
							<el-card shadow="hover" style="margin-bottom:15px;" :class="isDiy?'move':''">
								<template #header>
									<span>{{element.title}}</span>
									<el-dropdown trigger="click" v-if="isDiy">
										<span class="el-dropdown-link">
											<i class="el-icon-menu"></i>
										</span>
										<template #dropdown>
											<el-dropdown-menu>
												<el-dropdown-item @click="push()">添加组件</el-dropdown-item>
												<el-dropdown-item @click="set()">分栏设置</el-dropdown-item>
												<el-dropdown-item @click="backDefaul()">恢复默认</el-dropdown-item>
												<el-dropdown-item @click="remove(element)" divided>移除</el-dropdown-item>
											</el-dropdown-menu>
										</template>
									</el-dropdown>
								</template>
								<component :is="allComps[element.com]"></component>
							</el-card>
						</div>
					</template>
				</draggable>
			</el-col>
		</el-row>
	</div>

	<el-dialog title="添加组件" v-model="showPush" :width="400" :before-close="closePush" destroy-on-close :append-to-body='true'>
		<el-alert title="添加的元素自动会添加至最左侧" type="info" show-icon style="margin-bottom:20px;"></el-alert>
		<el-form :model="pushForm" ref="pushForm" :rules="rules" label-width="0">
			<el-form-item prop="selectComps">
				<el-select v-model="pushForm.selectComps" value-key="title" filterable clearable placeholder="请选择组件" style="width: 100%;">
					<el-option v-for="item in allCompsList" :key="item.com" :label="item.title" :value="item" :disabled="item.disabled">
						<span style="float: left">{{ item.title }}</span>
						<span style="float: right; color: #8492a6; font-size: 13px">{{ item.com }}</span>
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="closePush">取 消</el-button>
			<el-button type="primary" @click="submitPush('pushForm')">确 定</el-button>
		</template>
	</el-dialog>

	<el-dialog title="分栏设置" v-model="showSet" :width="500" destroy-on-close :append-to-body='true'>
		<el-alert title="当出现设置的分栏数比现有少的情况,系统将自动移除多出的组件" type="info" show-icon style="margin-bottom:20px;"></el-alert>
		<div class="diy-grid-layout-set">
			<el-tooltip content="通栏">
				<div :class="selectLayout.toString()==[24].toString()?'active col':'col'" @click="setLayout([24])">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</el-tooltip>
			<el-tooltip content="左大右小布局">
				<div :class="selectLayout.toString()==[18, 6].toString()?'active row':'row'" @click="setLayout([18, 6])">
					<span style="width: 60%;"></span>
					<span style="width: 30%;"></span>
				</div>
			</el-tooltip>
			<el-tooltip content="等分布局">
				<div :class="selectLayout.toString()==[8, 8, 8].toString()?'active row':'row'" @click="setLayout([8, 8, 8])">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</el-tooltip>
			<el-tooltip content="左右辅助布局">
				<div :class="selectLayout.toString()==[6, 12, 6].toString()?'active row':'row'" @click="setLayout([6, 12, 6])">
					<span style="width: 25%;"></span>
					<span style="width: 50%;"></span>
					<span style="width: 25%;"></span>
				</div>
			</el-tooltip>
		</div>
		<template #footer>
			<el-button @click="showSet=false">取 消</el-button>
			<el-button type="primary" @click="submitSet()">确 定</el-button>
		</template>
	</el-dialog>

	<el-drawer title="布局设置" v-model="settingDialog" :size="300" destroy-on-close>
		<el-form ref="form" label-width="120px" label-position="left" style="padding:0 20px;">
			<el-form-item label="自由拖拽">
				<el-switch v-model="isDiy"></el-switch>
			</el-form-item>
			<el-divider></el-divider>
		</el-form>
	</el-drawer>

</template>


<script>
	import draggable from 'vuedraggable'
	import allComps from './components'

	export default {
		props: {
			msg: String
		},
		components: {
			draggable
		},
		data() {
			return {
				settingDialog: false,
				isDiy: false,
				allComps: allComps,
				allCompsList: [],
				showPush: false,
				pushForm: {
					selectComps: null
				},
				rules: {
					selectComps: [
						{ required: true, message: '请选择添加的组件', trigger: 'blur' }
					]
				},
				showSet: false,
				selectLayout: [],
				defaultGrid: this.$CONFIG.DEFAULT_GRID,
				grid: [],
			}
		},
		created(){
			var grid = this.$TOOL.data.get("grid");
			this.grid = grid || JSON.parse(JSON.stringify(this.defaultGrid));
		},
		mounted(){

		},
		methods: {
			//输出可添加的组件
			setAllCompsList(){
				var allCompsList = []
				for(var key in allComps){
					allCompsList.push({
						title: allComps[key].title,
						com: key
					})
				}
				var nowCopmsList_arr = this.grid.copmsList.reduce(function(a, b){return a.concat(b)});
				for(let comp of allCompsList){
					const _item = nowCopmsList_arr.find((item)=>{return item.com === comp.com});
					if(_item){
						comp.disabled = true
					}
				}
				this.allCompsList = allCompsList;
			},
			//拖动结束后
			end(){
				this.$TOOL.data.set("grid", this.grid);
			},
			//分栏设置
			set(){
				this.showSet = true;
				this.selectLayout = this.grid.layout;
			},
			//添加组件
			push(){
				this.setAllCompsList()
				this.showPush = true;
			},
			submitPush(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						var formModel = this.$refs[formName].model;
						this.grid.copmsList[0].unshift(formModel.selectComps);
						this.$TOOL.data.set("grid", this.grid);
						this.$refs[formName].resetFields();
						this.showPush = false;
					}else{
						return false;
					}
				})
			},
			closePush(){
				this.$refs.pushForm.resetFields();
				this.showPush = false;
			},
			setLayout(value){
				this.selectLayout = value;
			},
			submitSet(){
				//处理更改分栏后删除被隐藏的组件
				if(this.selectLayout.length == 1){
					this.grid.copmsList[1] = []
					this.grid.copmsList[2] = []
				}
				if(this.selectLayout.length == 2){
					this.grid.copmsList[2] = []
				}
				this.showSet = false;
				this.grid.layout = this.selectLayout;
				this.$TOOL.data.set("grid", this.grid);
			},
			//隐藏组件
			remove(item){
				var newCopmsList = [...this.grid.copmsList];
				newCopmsList.forEach((obj, index) => {
					var newObj = obj.filter(o=>o.com!=item.com);
					newCopmsList[index] = newObj;
				})
				var newCopmsList_arr = newCopmsList.reduce(function(a, b){return a.concat(b)});
				if(newCopmsList_arr.length <= 0){
					alert("至少留一个崽~")
					return false;
				}
				this.grid.copmsList = newCopmsList;
				this.$TOOL.data.set("grid", this.grid);
			},
			//恢复默认
			backDefaul(){
				this.grid =  JSON.parse(JSON.stringify(this.defaultGrid));
				this.$TOOL.data.remove("grid");
			},
			//设置
			setting(){
				this.settingDialog = true;
			}
		}
	}
</script>

<style>
	.diy-grid-setting {position: fixed;width:40px;height:40px;border-radius: 3px 0 0 3px;bottom:40px;right:0px;z-index: 100;background: #409EFF;display: flex;flex-direction: column;align-items: center;justify-content: center;cursor: pointer;}
	.diy-grid-setting i {font-size: 18px;color: #fff;}

	.diy-grid-layout .el-card.move .el-card__header {cursor: move;}
	.diy-grid-layout .el-card__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.diy-grid-layout .el-card__header .el-dropdown-link {
		color: #999;
		border-radius: 3px;
		cursor: pointer;
		padding:3px 5px;
	}
	.diy-grid-layout .el-card__header .el-dropdown-link:hover {
		color: #555;
		background: #ecf5ff;
	}
	.diy-grid-layout .el-card__header .el-dropdown-link:focus {
		color: #555;
		background: #ecf5ff;
	}
	.diy-grid-layout .sortable-ghost {
		opacity: 0.5;
		background: #c8ebfb;
	}
	.diy-grid-layout-set {
		display: flex;
		justify-content: center
	}
	.diy-grid-layout-set div {
		width:80px;
		height:80px;
		background: #ecf5ff;
		margin:10px;
		cursor: pointer;
	}
	.diy-grid-layout-set div span{
		background: #d6efff;
	}
	.diy-grid-layout-set .col {
		display: flex;
		flex-direction: column;
		align-content: space-between;
		padding:0 5px 5px 5px;
	}
	.diy-grid-layout-set .col span {
		height:20px;
		width: 100%;
		margin-top:5px;
	}
	.diy-grid-layout-set .row {
		display: flex;
		justify-content: flex-start;
		padding:5px 5px 5px 0;
	}
	.diy-grid-layout-set .row span {
		height: 70px;
		width: 20px;
		margin-left:5px;
	}
	.diy-grid-layout-set div.active {
		background: #09f;
	}


</style>

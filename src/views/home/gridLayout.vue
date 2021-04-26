<template>
	<div class="diy-grid-layout">
		<el-row :gutter="15">

			<el-col v-for="(item, index) in layout" v-bind:key="item" :span="item">
				<draggable v-model="grid[index]" :disabled="false" animation="200" handle=".el-card__header" group="people" @end="end" item-key="com">
					<template #item="{ element }">
						<div>
							<el-card shadow="hover" style="margin-bottom:15px;">
								<template #header>
									<span>{{element.title}}</span>
									<el-dropdown>
										<span class="el-dropdown-link">
											下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
										</span>
										<template #dropdown>
											<el-dropdown-menu>
												<el-dropdown-item @click="refresh(element)">刷新</el-dropdown-item>
												<el-dropdown-item @click="remove(element)">隐藏</el-dropdown-item>
												<el-dropdown-item @click="push()" divided>添加组件</el-dropdown-item>
												<el-dropdown-item>分栏设置</el-dropdown-item>
												<el-dropdown-item @click="backDefaul()">恢复默认</el-dropdown-item>
											</el-dropdown-menu>
										</template>
									</el-dropdown>
								</template>
								<component :is="allComps[element.com]" msg="demo"></component>
							</el-card>
						</div>
					</template>
				</draggable>
			</el-col>
		</el-row>
	</div>

	<el-dialog title="添加组件" v-model="showPush" :width="400" destroy-on-close :append-to-body='true'>
		<el-alert title="添加的元素自动会添加至最左侧分栏的最后,请勿添加过多的组件导致系统运行缓慢" type="warning" show-icon></el-alert>
		<div style="margin-top: 15px;">
			<el-select v-model="selectComps" filterable clearable placeholder="请选择组件" style="width: 100%;">
				<el-option v-for="(item,key) in allComps" :key="key" :label="item.title" :value="key">
					<span style="float: left">{{ item.title }}</span>
					<span style="float: right; color: #8492a6; font-size: 13px">{{ key }}</span>
				</el-option>
			</el-select>
		</div>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="showPush = false">取 消</el-button>
				<el-button type="primary" @click="submitPush()">确 定</el-button>
			</span>
		</template>
	</el-dialog>

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
				layout: [18,6], //数组总数不能大于24, [16,8]:分两列左16右8 还可以设置 [18,6] [8,8,8] [6,12,6]
				allComps: allComps,
				showPush: false,
				showSet: false,
				selectComps: '',
				defaultGrid:[
					[
						{ title: "模块1", com: 'C1' },
						{ title: "模块2", com: 'C2' }
					],
					[
						{ title: "模块3", com: 'C3' }
					],
					[

					]
				],
				grid:[]
			}
		},
		created(){
			var grid = this.$TOOL.data.get("grid");
			this.grid = grid || this.defaultGrid;
		},
		mounted(){
			console.log(allComps);
		},
		methods: {
			//拖动结束后
			end(){
				this.$TOOL.data.set("grid", this.grid);
			},
			//添加组件
			push(){
				this.showPush = true;
			},
			submitPush(){
				this.showPush = false;
			},
			//刷新组件
			refresh(item){
				console.log("刷新",item);
			},
			//隐藏组件
			remove(item){
				var newGrid = [...this.grid];
				newGrid.forEach((obj, index) => {
					var newObj = obj.filter(o=>o.com!=item.com);
					newGrid[index] = newObj;
				})
				var newGrid_arr = newGrid.reduce(function(a, b){return a.concat(b)});
				if(newGrid_arr.length <= 0){
					alert("至少留一个崽~")
					return false;
				}
				this.grid = newGrid;
				this.$TOOL.data.set("grid", newGrid);
			},
			//恢复默认
			backDefaul(){
				this.grid = this.defaultGrid;
				this.$TOOL.data.remove("grid");
			}
		}
	}
</script>

<style>
	.diy-grid-layout .el-card__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.diy-grid-layout .sortable-ghost {
		opacity: 0.5;
		background: #c8ebfb;
	}
</style>

<!--
 * @Descripttion: 详情列表模板
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年6月16日15:05:15
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<el-container>
		<el-header>
			<div class="left-panel">
				<el-button type="primary" icon="el-icon-plus"></el-button>
				<el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length==0"></el-button>
			</div>
			<div class="right-panel">
				<el-radio-group v-model="group">
					<el-radio-button label="0">所有</el-radio-button>
					<el-radio-button label="1">未完成 (2)</el-radio-button>
					<el-radio-button label="2">弃坑 (1)</el-radio-button>
					<el-radio-button label="3">其他</el-radio-button>
				</el-radio-group>
			</div>
		</el-header>
		<el-main class="nopadding">
			<scTable ref="table" :data="list" @selection-change="selectionChange">
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column label="ID" prop="id" width="100"></el-table-column>
				<el-table-column label="状态" prop="state" width="80">
					<template #default="scope">
						<el-badge v-if="scope.row.state=='1'" is-dot></el-badge>
					</template>
				</el-table-column>
				<el-table-column label="名称" prop="name" width="300">
					<template #default="scope">
						<h4>{{scope.row.name}}</h4>
						<p>{{scope.row.subtitle}}</p>
					</template>
				</el-table-column>
				<el-table-column label="类型" prop="type" width="150">
					<template #default="scope">
						<el-tag>{{scope.row.type}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="负责人" prop="user" width="150"></el-table-column>
				<el-table-column label="进度" prop="progress" width="250">
					<template #default="scope">
						<el-progress :percentage="scope.row.progress"></el-progress>
					</template>
				</el-table-column>
				<el-table-column label="创建时间" prop="time" width="150"></el-table-column>
				<el-table-column label="操作" fixed="right" align="right" width="200">
					<template #default="scope">
						<el-button type="text" size="small" @click="table_show(scope.row, scope.$index)">查看</el-button>
						<el-divider direction="vertical"></el-divider>
						<el-dropdown>
							<el-button  type="text" size="small">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item>编辑</el-dropdown-item>
									<el-dropdown-item>推送至队列</el-dropdown-item>
									<el-dropdown-item divided>删除</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</template>
				</el-table-column>

			</scTable>
		</el-main>
	</el-container>

	<el-drawer title="我是标题" v-model="info" size="100%" direction="btt" destroy-on-close>

	</el-drawer>

</template>

<script>
	export default {
		name: 'list',
		data() {
			return {
				group: "0",
				selection: [],
				list: [
					{
						id: "5001",
						name: "scEcharts",
						subtitle: "重新封装的Echarts，暴露源对象",
						state: "1",
						type: "数据",
						progress: 70,
						user: "Sakuya",
						time: "2010-10-10"
					},
					{
						id: "5002",
						name: "scEditor",
						subtitle: "Tinymce封装的富文本编辑器",
						state: "1",
						type: "表单",
						progress: 10,
						user: "Sakuya",
						time: "2010-10-10"
					}
				],
				info: false
			}
		},
		mounted() {

		},
		methods: {
			//表格选择后回调事件
			selectionChange(selection){
				this.selection = selection;
			},
			table_show(row, index){
				console.log(row, index);
				this.info = true;
			}
		}
	}
</script>

<style>
</style>

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

			<el-drawer title="过滤器" v-model="drawer" :size="500">
				<el-container>
					<el-main style="padding:0">

						<el-tabs class="root">
							<el-tab-pane>
								<template #label>
									<i class="el-icon-s-operation"></i> 过滤项
								</template>
								<el-scrollbar>
									<el-form :model="form" class="filterForm">
										<p style="margin-bottom: 15px;">过滤项</p>
										<el-form-item>
											<el-tag size="d">1</el-tag>
											<el-select v-model="form.region" placeholder="活动区域" filterable>
												<el-option label="区域一" value="shanghai"></el-option>
												<el-option label="区域二" value="beijing"></el-option>
											</el-select>
											<el-input v-model="form.user" placeholder="审批人"></el-input>
										</el-form-item>

										<el-form-item>
											<el-tag size="d">2</el-tag>
											<el-select v-model="form.region" placeholder="活动区域" filterable>
												<el-option label="区域一" value="shanghai"></el-option>
												<el-option label="区域二" value="beijing"></el-option>
											</el-select>
											<el-input v-model="form.user" placeholder="审批人"></el-input>
										</el-form-item>

									</el-form>

									<el-button type="text" icon="el-icon-plus">增加过滤项</el-button>

								</el-scrollbar>
							</el-tab-pane>
							<el-tab-pane>
								<template #label>
									<i class="el-icon-star-on"></i> 常用
								</template>
								<el-scrollbar>
									<el-tag closable size="d">默认标签</el-tag>
								</el-scrollbar>
							</el-tab-pane>
						</el-tabs>

					</el-main>
					<el-footer>
						<el-button type="primary">立即过滤</el-button>
						<el-button type="primary" plain>保存常用</el-button>
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
				}
			}
		},
		mounted() {

		},
		methods: {
			openFilter(){
				this.drawer = true
			}
		}
	}
</script>

<style scoped>

	.filterForm {padding:20px;}
	.filterForm:deep(.el-form-item__content)  {display: flex;width: 100%;}



	.root {
	    display: flex;
		height: 100%;
	    flex-direction: column
	}
	.root:deep(.el-tabs__header) {margin: 0;}
	.root:deep(.el-tabs__content) {flex: 1;}
	.root:deep(.el-tabs__content) .el-tab-pane{overflow: auto;height:100%;}
</style>

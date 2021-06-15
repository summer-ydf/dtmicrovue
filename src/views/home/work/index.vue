<template>
	<el-main>
		<el-alert title="根据角色配置,可让不同角色访问不同的控制台视图,参数值在登录成功后返回 dashboard:{type}" type="success" style="margin-bottom:20px;"></el-alert>
		<el-row :gutter="15">
			<el-col :span="24">
				<el-card shadow="never" header="模板">
					<ul class="item-list">
						<li>
							<router-link :to="{ path: '/template/blank' }">
								<i class="el-icon-folder" style="background: #409EFF;"></i>
								<p>空白模板</p>
							</router-link>
						</li>
						<li>
							<router-link :to="{ path: '/template/chartlist' }">
								<i class="el-icon-data-analysis" style="background: #67C23A;"></i>
								<p>统计列表</p>
							</router-link>
						</li>
						<li>
							<router-link :to="{ path: '/template/calendar' }">
								<i class="el-icon-date" style="background: #c71585;"></i>
								<p>日历计划</p>
							</router-link>
						</li>
					</ul>
				</el-card>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	export default {
		data() {
			return {}
		},
		mounted(){
			this.$emit('on-mounted')
		},
		methods: {
			//获取当前用户可操作菜单

		}
	}
</script>

<style scoped>
	.el-row {margin-bottom:15px;}
	.item-list {display: flex;flex-wrap:wrap;}
	.item-list li {list-style: none;text-align: center;}
	.item-list li a {padding:20px;border-radius: 5px;cursor: pointer;display: inline-block;}
	.item-list li i {width:70px;height:70px;border-radius: 28px;font-size: 25px;color: #fff;background: #ddd;display: flex;justify-content: center;align-items: center;}
	.item-list li p {margin-top: 15px;color: #555;}
	.item-list li a:hover {background: #ecf5ff;}
</style>

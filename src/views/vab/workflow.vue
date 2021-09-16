<template>
	<el-main>
		<el-alert title="仿钉钉审批工作流. 现预览阶段, 功能有限后期将不断迭代, 一般工作流设计器都是满足不了业务需求的,建议拷贝一份组件自行根据业务扩展开发" type="warning" style="margin-bottom:20px;"></el-alert>
		<sc-workflow v-model="data.nodeConfig"></sc-workflow>
	</el-main>
</template>

<script>
	import scWorkflow from '@/components/scWorkflow'

	export default {
		name: 'workflow',
		components: {
			scWorkflow
		},
		data() {
			return {
				data: {
					id: 1,
					name: "合同审批",
					nodeConfig: {
						nodeName: "发起人",
						type: 0,	// 0 发起人 1审批 2抄送 3条件 4路由
						childNode: {
							nodeName: "审核人",
							type: 1,
							settype: 1,	// 审批人设置 1指定成员 2主管 4发起人自选 5发起人自己 7连续多级主管
							nodeUserList: [
								{
									id: 1,
									name: "Sakuya"
								},
								{
									id: 2,
									name: "Lolowan"
								}
							],
							childNode: {
								nodeName: "路由",
								type: 4,
								conditionNodes: [
									{
										nodeName: "条件1",
										type: 3,
										priorityLevel: 1,
										conditionList: [
											{
												label: "上级审核状态",
												field: "promoter",
												operator: "=",
												value: '保留'
											}
										],
										childNode: {
											nodeName: "条件审核",
											type: 1,
											settype: 2
										}
									},
									{
										nodeName: "条件2",
										type: 3,
										priorityLevel: 2,
										conditionList: []
									}
								],
								childNode: {
									nodeName: "抄送人",
									type: 2,
									ccSelfSelectFlag: true,
									nodeUserList: []
								}
							}
						}
					}
				}
			}
		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style>

</style>

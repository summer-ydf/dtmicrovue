<template>
	<div style="height: 300px;">
		<el-scrollbar >
			<el-timeline>
				<el-timeline-item v-for="(item, index) in activities" :key="index" :timestamp="item.timestamp" placement="top">
					<div v-html="item.content"></div>
				</el-timeline-item>
			</el-timeline>
		</el-scrollbar>
	</div>
</template>

<script>
	export default {
		title: "模块2",
		data() {
			return {
				activities: [
					{
						content: '1.0.0 版本开源 <i class="el-icon-present"></i>',
						timestamp: '2021-05-07'
					}
				]
			}
		},
		mounted() {

		}
	}
</script>

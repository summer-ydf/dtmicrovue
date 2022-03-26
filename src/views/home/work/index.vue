<template>
	<el-main>
		<el-row :gutter="15">
            <el-col :lg="10">
                <mywelcome></mywelcome>
            </el-col>
            <el-col :lg="14">
                <el-card shadow="never" header="我的常用">
                    <myapp></myapp>
                </el-card>
            </el-col>
		</el-row>
        <el-row :gutter="15">
            <el-col :lg="24">
                <el-card shadow="never" header="数据统计">
                    <mychart></mychart>
                </el-card>
            </el-col>
        </el-row>
	</el-main>
</template>

<script>
	import myapp from './components/myapp';
    import Mywelcome from "@/views/home/work/components/mywelcome";
    import Mychart from "@/views/home/work/components/mychart";

	export default {
		components: {
            Mychart,
            Mywelcome,
			myapp
		},
		data() {
			return {

			}
		},
		mounted(){
			this.$emit('on-mounted')
		},
		methods: {

		}
	}
</script>

<style scoped>

</style>

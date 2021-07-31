<!--
 * @Descripttion: 过滤器V2 常用组件
 * @version: 2.0
 * @Author: sakuya
 * @Date: 2021年7月31日16:49:56
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<div class="sc-filter-my">
		<el-skeleton v-if="loading" :rows="2" animated />
		<template v-else>
			<el-empty v-if="myFilter.length<=0" :image-size="100">
				<template #description>
					<h2>没有常用的过滤</h2>
					<p style="margin-top: 10px;max-width: 300px;">常用过滤可以将多个过滤条件保存为一个集合，方便下次进行相同条件的过滤</p>
				</template>
			</el-empty>
			<ul v-else class="sc-filter-my-list">
				<li v-for="(item, index) in myFilter" :key="index"><el-tag closable size="medium" effect="dark" type="info" @click="selectMyfilter(item)" @close="closeMyfilter(item, index)">{{item.title}}</el-tag></li>
			</ul>
		</template>
	</div>

</template>

<script>
	import config from "@/config/filterBar";

	export default {
		props: {
			filterName: { type: String, default: "" },
			data: { type: Object, default: () => {} }
		},
		data() {
			return {
				loading: false,
				myFilter: []
			}
		},
		watch:{
			data: {
				handler(){
					this.myFilter = this.data
				},
				deep: true
			}
		},
		mounted() {
			this.myFilter = this.data
			this.getMyfilter()
		},
		methods: {
			//选择常用过滤
			selectMyfilter(item){
				this.$emit('selectMyfilter', item)
			},
			//删除常用过滤
			closeMyfilter(item, index){
				this.$confirm('此操作将永久删除该常用, 是否继续?', '提示', {
					type: 'warning'
				}).then(async () => {
					try {
						var del = await config.delMy(this.filterName)
					}catch (error) {
						return false
					}
					if(!del){
						return false
					}
					this.myFilter.splice(index, 1)
					this.$message.success('删除常用成功')
				}).catch(() => {
					//
				})
			},
			//远程获取我的常用
			async getMyfilter(){
				this.loading = true
				try {
					this.myFilter = await config.getMy(this.filterName)
				}catch (error) {
					return false
				}
				this.loading = false
			}
		}
	}
</script>

<style scoped>
	.sc-filter-my {padding:15px;}
	.sc-filter-my-list {list-style-type: none;}
	.sc-filter-my-list li {margin-bottom: 15px;}
	.sc-filter-my-list li .el-tag {cursor: pointer;}
</style>

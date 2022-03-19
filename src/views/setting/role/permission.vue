<template>
	<el-dialog title="角色权限设置" v-model="visible" width="26%" destroy-on-close @closed="$emit('closed')">
        <el-container>
            <el-main class="nopadding">
                <el-tree ref="menu"
                         node-key="name"
                         :data="menu.list"
                         :default-checked-keys="menu.checked"
                         :props="menu.props"
                         :default-expand-all="true"
                         show-checkbox>
                </el-tree>
            </el-main>
        </el-container>
		<template #footer>
			<el-button @click="visible=false" >取 消</el-button>
			<el-button type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
		</template>
	</el-dialog>
</template>

<script>
	export default {
		emits: ['success', 'closed'],
		data() {
			return {
				visible: false,
				isSaveing: false,
				menu: {
					list: [],
					checked: ["test", "system", "user", "role"],
					props: {
						label: (data)=>{
							return data.meta.title
						}
					}
				},
				group: {
					list: [],
					checked: [],
					props: {}
				},
			}
		},
		mounted() {
			this.getMenu();
		},
		methods: {
			open(){
				this.visible = true;
			},
			submit(){
				this.isSaveing = true;
				setTimeout(()=>{
					this.isSaveing = false;
					this.visible = false;
					this.$message.success("操作成功")
					this.$emit('success')
				},1000)
			},
			async getMenu(){
				var res = await this.$API.system.menu.list.get();
				this.menu.list = res.data;
			},
		}
	}
</script>

<style scoped>

</style>

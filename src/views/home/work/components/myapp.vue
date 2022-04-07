<template>
	<div>
		<ul class="myMods">
			<li v-for="mod in myMods" :key="mod.path" style="background: #0060ff;">
				<a v-if="mod.meta.type==='link'" :href="mod.path" target="_blank">
					<el-icon><component :is="mod.meta.icon||el-icon-menu" /></el-icon>
					<p>{{ mod.meta.title }}</p>
				</a>
				<router-link v-else :to="{ path: mod.path }">
					<el-icon><component :is="mod.meta.icon||el-icon-menu" /></el-icon>
					<p>{{ mod.meta.title }}</p>
				</router-link>
			</li>
			<li class="modItem-add"  @click="addMods">
				<a href="javascript:void(0)">
					<el-icon><el-icon-plus /></el-icon>
				</a>
			</li>
		</ul>

		<el-drawer title="添加应用" v-model="modsDrawer" :size="390" destroy-on-close>
			<el-container>
				<el-main class="nopadding">
					<el-scrollbar>
						<div class="setMods">
							<h4>我的常用 ( {{myMods.length}} )</h4>
							<draggable tag="ul" v-model="myMods" animation="200" item-key="path" group="people">
								<template #item="{ element }">
									<li style="background: #0060ff;">
										<el-icon><component :is="element.meta.icon||el-icon-menu" /></el-icon>
										<p>{{element.meta.title}}</p>
									</li>
								</template>
							</draggable>
						</div>
						<div class="setMods">
							<h4>全部应用 ( {{filterMods.length}} )</h4>
							<draggable tag="ul" v-model="filterMods" animation="200" item-key="path" :sort="false" group="people">
								<template #item="{ element }">
									<li style="background: #909399;">
										<el-icon><component :is="element.meta.icon||el-icon-menu" /></el-icon>
										<p>{{element.meta.title}}</p>
									</li>
								</template>
							</draggable>
						</div>
					</el-scrollbar>
				</el-main>
				<el-footer>
					<el-button type="primary" size="small" :loading="saveLoading" @click="saveMods">保存</el-button>
				</el-footer>
			</el-container>
		</el-drawer>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'

	export default {
		components: {
			draggable
		},
		data() {
			return {
				mods: [],
				myMods: [],
				myModsName: [],
				filterMods: [],
				modsDrawer: false,
                saveLoading: false,
                //表单数据
                form: {
                    id:"",
                    userId: "",
                    app: "",
                },
			}
		},
        created() {
            var userinfo = this.$TOOL.data.get("USER_INFO")
            this.form.userId = userinfo.userid
        },
        mounted(){
			this.getMods()
		},
		methods: {
			addMods(){
				this.modsDrawer = true
			},
			async getMods() {
                var res = await this.$API.system.setting.get_my_setting.get(this.form.userId);
                if (res.code === 2000) {
                    if(res.data !== null) {
                        this.myModsName = res.data.app
                        this.form.id = res.data.id
                    }
                }
                var menuTree = this.$TOOL.data.get("MENU")
                this.filterMenu(menuTree)
                this.myMods = this.mods.filter(item => {
                    return this.myModsName.includes(item.name)
                })
                this.filterMods = this.mods.filter(item => {
                    return !this.myModsName.includes(item.name)
                })
            },
			filterMenu(map){
				map.forEach(item => {
					if(item.meta.hidden){
						return false
					}
					if(item.meta.type==='iframe'){
						item.path = `/i/${item.name}`
					}
					if(item.children&&item.children.length > 0){
						this.filterMenu(item.children)
					}else{
						this.mods.push(item)
					}
				})
			},
			async saveMods() {
                const myModsName = this.myMods.map(v => v.name)
                if (myModsName.length > 5) {
                    this.$alert("常用应用最多只能加5个", "提示", {type: 'warning'})
                    return false
                }
                this.form.app = myModsName.join(",");
                this.saveLoading = true;
                var res = await this.$API.system.setting.save.post(this.form);
                this.saveLoading = false;
                if (res.code === 2000) {
                    this.$message.success("设置常用成功")
                    this.modsDrawer = false
                } else {
                    this.$alert(res.message, "提示", {type: 'error'})
                }
            }
		}
	}
</script>

<style scoped>
	.myMods {list-style:none;margin:-10px;}
	.myMods li {display: inline-block;width: 80px;height:80px;vertical-align: top;transition:all 0.3s ease;margin:10px;border-radius:5px;}
	.myMods li:hover {opacity: 0.8;}
	.myMods li a {width: 100%;height: 100%;padding:10px;display: flex;flex-direction: column;align-items: center;justify-content: center;text-align: center;color: #fff;}
	.myMods li i {font-size: 20px;color: #fff;}
	.myMods li p {font-size: 10px;color: #fff;margin-top: 10px;width: 100%;white-space:nowrap;text-overflow:ellipsis;overflow: hidden;}

	.modItem-add {border: 1px dashed #ddd;cursor: pointer;}
	.modItem-add i {font-size: 30px;color: #999!important;}
	.modItem-add:hover,.modItem-add:hover i {border-color: #0060ff;color: #0060ff!important;}

	.setMods {padding:0 20px;}
	.setMods h4 {font-size: 14px;font-weight: normal;}
	.setMods ul {margin:20px -5px;min-height: 90px;}
	.setMods li {display: inline-block;width: 80px;height:80px;text-align: center;margin:5px;color: #fff;vertical-align: top;padding:4px;padding-top:15px;cursor: move;border-radius: 3px;}
	.setMods li i {font-size: 20px;}
	.setMods li p {font-size: 12px;margin-top: 10px;}
	.setMods li.sortable-ghost {opacity: 0.3;}
</style>

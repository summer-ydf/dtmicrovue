<template>
	<div class="setting-column">
		<div class="sys">
			<h4>隐藏</h4>
			<ul>
				<draggable v-model="sys" animation="200" group="people" :sort="false" item-key="prop">
					<template #item="{ element }">
						<li>{{ element.label }}</li>
					</template>
					<template #footer>
						<el-empty v-if="sys.length == 0" description="没有隐藏列" :image-size="50"></el-empty>
					</template>
				</draggable>
			</ul>
		</div>
		<div class="user">
			<h4>显示</h4>
			<ul>
				<draggable v-model="user" animation="200" group="people" @change="change" item-key="prop">
					<template #item="{ element }">
						<li>{{ element.label }}</li>
					</template>
					<template #footer>
						<el-empty v-if="user.length == 0" description="没有显示列" :image-size="50"></el-empty>
					</template>
				</draggable>
			</ul>
		</div>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'
	export default {
		components: {
			draggable
		},
		props: {
			column: { type: Object, default: () => {} }
		},
		data() {
			return {
				sys: [
					{label: "姓名", prop: "name"},
					{label: "性别", prop: "sex"},
					{label: "头像", prop: "a"},
					{label: "加入时间", prop: "time"}
				],
				user: []
			}
		},
		mounted() {
			this.sys = this.column || []
		},
		methods: {
			change(){
				this.$emit('userChange', this.user)
			},
			remove(index){
				this.sys.push(this.user[index]);
				this.user.splice(index, 1); 
			}
		}
	}
</script>

<style scoped>
	.setting-column {display:flex;}
	.setting-column > div > ul {margin-top: 15px;height:300px;overflow: auto;}
	.setting-column > div > ul > div {height: 100%;}
	.setting-column > div > ul li {cursor: move;font-size: 12px;list-style-type: none;height:32px;line-height: 32px;background: #ecf5ff;color: #409EFF;border: 1px solid #d9ecff;border-radius: 4px;padding: 0 8px;margin-bottom:5px;}
	.setting-column .sys {flex:1;margin-right:15px;padding-right:15px;border-right: 1px solid #eee;}
	.setting-column .user {flex:1;}
	.sortable-ghost {opacity: 0.5;}
</style>

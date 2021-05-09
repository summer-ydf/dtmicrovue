<template>
	<el-container>
		<el-header>
			<div class="left-panel">

			</div>
			<div class="right-panel">
				<div class="right-panel-search">
					<el-input v-model="keyword" placeholder="请输入内容" clearable></el-input>
					<el-button type="primary" icon="el-icon-search"></el-button>
				</div>
			</div>
		</el-header>
		<el-main class="nopadding">
			<div class="sc-itemList">
				<div class="sc-itemList-list">
					<el-row :gutter="20">

						<el-col :xl="6" :lg="8" :md="8" :sm="12" :xs="24" v-for="item in list" :key="item.title">
							<el-card shadow="hover" :body-style="{ padding: '0px' }">
								<el-image :src="item.image" fit="cover"></el-image>
								<div class="title">
									<h2>{{item.title}}</h2>
									<p>
										<el-tag type="warning">免费</el-tag>
										<el-tag v-for="tag in item.tags" :key="tag">{{tag}}</el-tag>
									</p>
								</div>
							</el-card>
						</el-col>

					</el-row>
				</div>
				<div class="sc-itemList-page">
					<el-pagination background :small="true" layout="total, prev, pager, next, jumper" :total="20" :page-size="20" :currentPage="1" ></el-pagination>
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		name: 'itemList',
		data() {
			return {
				keyword: "",
				list: [
					{
						title: "VUE Next",
						tags: ["跨平台", "3.0", "测试版"],
						image: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
					},
					{
						title: "Element Plus",
						tags: ["Vue3.0", "个人"],
						image: ""
					}
				]
			}
		}
	}
</script>

<style scoped>
	.el-card {margin-bottom: 20px;height:310px;}
	.el-image {width: 100%;height:200px;background: #ddd;}
	.title {padding:20px;}
	.title h2 {font-size: 16px;}
	.title p {font-size: 12px;color: #999;margin-top: 15px;}
	.title p .el-tag {margin-right:8px;}

	.sc-itemList {display:flex;flex-direction:column;height:100%;}
	.sc-itemList-list {flex:1;border-bottom: 1px solid #EBEEF5;padding:20px;overflow: auto;}
	.sc-itemList-page {height:50px;display: flex;align-items: center;justify-content: space-between;padding:0 15px;}
</style>

<template>
	<el-container>
		<el-aside width="220px">
			<el-container>
				<el-header>
					<el-input placeholder="输入关键字进行过滤" v-model="dicFilterText" clearable></el-input>
				</el-header>
				<el-main class="nopadding">
					<el-tree ref="dic" class="menu" node-key="code" :data="dicList" :current-node-key="''" :highlight-current="true" :filter-node-method="dicFilterNode" @node-click="dicClick">
                        <template #default="{ node }">
						<span class="el-tree-node__label">
							<el-icon class="icon"><el-icon-folder /></el-icon>{{node.label}}
						</span>
                        </template>
                    </el-tree>
				</el-main>
			</el-container>
		</el-aside>
		<el-container class="is-vertical">
			<el-header>
				<div class="left-panel">
					<el-button type="primary" icon="el-icon-upload" @click="add">上传文件</el-button>
				</div>
				<div class="right-panel">
					<div class="right-panel-search">
						<el-input v-model="search.keyword" placeholder="文件后缀搜索" clearable></el-input>
						<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
					</div>
				</div>
			</el-header>
			<el-main class="nopadding">
				<scTable ref="table" :apiObj="apiObj" row-key="id" stripe remoteSort remoteFilter>
					<el-table-column label="#" align="center" type="index" width="50"></el-table-column>
					<el-table-column label="文件名称" prop="objectName" width="400"></el-table-column>
					<el-table-column label="文件后缀" prop="suffix" width="100">
						<template #default="scope">
							<el-button type="primary" plain size="small">{{scope.row.suffix}}</el-button>
						</template>
					</el-table-column>
					<el-table-column label="文件大小" prop="size" width="150">
						<template #default="scope">
							<span v-if="scope.row.size / 1024 > 1024">{{towNumber(scope.row.size / 1024 / 1024)}} M</span>
							<span v-if="scope.row.size / 1024 < 1024">{{towNumber(scope.row.size / 1024)}} KB</span>
						</template>
					</el-table-column>
					<el-table-column label="上传时间" prop="createTime" width="150"></el-table-column>
					<el-table-column label="操作" fixed="right" align="center" width="200">
						<template #default="scope">
							<el-progress v-show="scope.row.id === this.downloadId" :text-inside="true" :stroke-width="15" :percentage="percentage"></el-progress>
							<div v-show="scope.row.id !== this.downloadId">
								<el-button type="text" size="small" @click="table_del(scope.row, scope.$index)">删除</el-button>
								<el-divider direction="vertical"></el-divider>
								<el-button type="text" size="small" @click="table_download(scope.row, scope.$index)">下载</el-button>
								<el-divider direction="vertical"></el-divider>
								<el-button type="text" size="small" @click="table_share(scope.row, scope.$index)">分享</el-button>
							</div>
						</template>
					</el-table-column>
				</scTable>
			</el-main>
		</el-container>
	</el-container>
    <save-dialog v-if="dialog.save" ref="saveDialog" @success="handleSaveSuccess" @closed="dialog.save=false"></save-dialog>
    <share-dialog v-if="share.save" ref="shareDialog" @closed="share.save=false"></share-dialog>
</template>
<script>
import saveDialog from "./save";
import shareDialog from "./share";
import axios from "axios";
import config from "@/config";
export default {
	components: {
		saveDialog,
        shareDialog
	},
	data() {
		return {
			apiObj: this.$API.common.file.list,
			dialog: {
				save: false
			},
            share: {
			  save: false
            },
			search: {
				keyword: null,
				category: null
			},
			downloadId: null,
			percentage: 0,
			dicFilterText: '',
			dicList: [
				{
					label: "所有",
					code: "",
				},
				{
					label: "公共组",
					code: "default",
				},
                {
                    label: "素材组",
                    code: "sucai",
                }
			]
		}
	},
	watch: {
		dicFilterText(val) {
			this.$refs.dic.filter(val);
		}
	},
	created() {

	},
	methods: {
		//保留两位小数
		towNumber(val) {
			return val.toFixed(2)
		},
		//上传文件
		add(){
			this.dialog.save = true
			this.$nextTick(() => {
				this.$refs.saveDialog.open()
			})
		},
		//下载文件
		table_download(row) {
		    // 保证单线程下载文件
		    if (this.downloadId !== null) {
                this.$message.error("当前队列中有文件正在下载")
		        return;
            }
			// 按钮显示
            this.$notify({
                title: '注意',
                message: '文件已经加入队列中下载，下载过程中，切勿退出程序或者刷新！',
                type: 'warning',
                duration: 0
            });
			this.downloadId = row.id
			this.percentage= 0;
			axios.get(`${config.DOC_URL}/file/downloadFile`,{
				// 设置携带参数
				params: {bucket: row.bucket,objectName: row.objectName},
				// 设置responseType字段格式为blob
				responseType: 'blob',
                // 设置连接超时，30分钟
                timeout: 30 * 60 * 1000,
				// xml返回数据的钩子函数，可以用来获取数据的进度
				onDownloadProgress:(progressEvent)=>{
					// progressEvent.loaded 下载文件的当前大小
					// progressEvent.total  下载文件的总大小
					let progressBar = Math.round( progressEvent.loaded / progressEvent.total*100);
					//接收进度为99%的时候需要留一点前端编译的时间
					if(progressBar >= 99){
						this.percentage = 99;
					}else{
						this.percentage = progressBar;
					}
				}
			}).then(res => {
				const fileName = res.headers["content-disposition"].split("=")[1]
				const fileType = fileName.substring(fileName.lastIndexOf('.')+1)
                // 为blob设置文件类型
				let blob = new Blob([res.data],{type: "application/"+fileType});
                // 创建一个临时的url指向blob对象
				let url = window.URL.createObjectURL(blob);
				let a = document.createElement("a");
				a.href = url;
				a.download = fileName;
				a.click();
				// 释放这个临时的对象url
				window.URL.revokeObjectURL(url);
				// 编译文件完成后，进度条展示为100%100
				this.percentage = 100;
				// 下载完成 可以重新点击按钮下载
				this.downloadId= null;
			});
		},
		//删除
		async table_del(row){
			var confirm = await this.$confirm(`确定删除选中的项吗？`, '提示', {
				confirmButtonText: 'ok',
				type: 'warning'
			}).catch(() => {})
			if(confirm !== 'confirm'){
				return false
			}
			var res = await this.$API.common.file.delFile.post(row);
			if(res.code === 2000){
				this.$refs.table.refresh()
				this.$message.success("删除成功")
			}else{
				this.$alert(res.message, "提示", {type: 'error'})
			}
		},
        //分享文件
        table_share(row){
            this.share.save = true
            this.$nextTick(() => {
                this.$refs.shareDialog.open().setData(row)
            })
        },
		//树过滤
		dicFilterNode(value, data){
			if (!value) return true;
			return data.label.indexOf(value) !== -1;
		},
		//树点击事件
		dicClick(data){
			this.search.category = data.code
			this.$refs.table.upData(this.search)
		},
		//搜索
		upsearch(){
			this.$refs.table.upData(this.search)
		},
		//本地更新数据
		handleSaveSuccess(){
            this.$refs.table.refresh()
		},
	}
}
</script>

<style scoped>

</style>

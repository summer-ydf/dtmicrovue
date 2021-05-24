<template>
	<div class="sceditor">
		<div class="toolbar-container"></div>
		<div class="content-container">
			<ckeditor v-model="value" :editor="editor" :config="editorConfig" :disabled="disabled" @ready="onReady" @input="onEditorInput"></ckeditor>
		</div>
	</div>
</template>

<script>
	import ClassicEditor from './build-classic/ckeditor.js';
	import CKEditor from './ckeditor.js';

	export default {
		components: {
			ckeditor: CKEditor.component
		},
		props: {
			modelValue: { type: String, default: "" },
			disabled: { type: Boolean, default: false }
		},
		data(){
			return {
				value: this.modelValue,
				editor: ClassicEditor,
				editorConfig: {
					toolbar: [ 'heading', '|', 'fontSize', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'imageUpload' ,'insertTable'],
					placeholder: '请填写内容',
					image: {
						toolbar: [
							'imageTextAlternative',
							'imageStyle:full',
							'imageStyle:side'
						]
					},
					table: {
						contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells', 'tableCellProperties', 'tableProperties' ]
					},
					ckfinder: {
					            uploadUrl: 'https://www.fastmock.site/mock/44c807475f7eeba73409792255781935/api/upload'
					        }
				}
			}
		},
		watch:{
			modelValue(){
				this.value = this.modelValue
			},
		},
		mounted(){

		},
		methods: {
			onReady(editor) {
				const toolbarContainer = document.querySelector( '.toolbar-container' );
				toolbarContainer.prepend( editor.ui.view.toolbar.element );
			},
			onEditorInput(val){
				this.$emit('update:modelValue', val);
			}
		}
	}
</script>

<style>

	.sceditor {

	}
	.sceditor .ck-toolbar {background: #fff;border-color: #DCDFE6;box-shadow: 2px 2px 1px rgba(0,0,0,.05);    position: relative;z-index: 1;}
	.content-container {
		    background: #f6f8f9;
		    overflow-y: scroll;
			padding:30px;
			max-height:300px;
			border: 1px solid #DCDFE6;
			border-top: 0;
	}
	.content-container .ck-content {
			margin: 0 auto;
			background: #fff;
			border: 1px solid #DCDFE6!important;
			box-shadow: 2px 2px 1px rgba(0,0,0,.05)!important;
			padding:40px;
			min-height: 300px;
	}
</style>

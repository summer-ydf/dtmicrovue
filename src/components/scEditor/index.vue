<template>
	<div class="sceditor">
		<div class="toolbar-container"></div>
		<div class="content-container">
			<ckeditor v-model="value" :editor="editor" :config="editorConfig" :disabled="disabled" @ready="onReady"
				@input="onEditorInput"></ckeditor>
		</div>
	</div>
</template>

<script>
	import ClassicEditor from './build-classic/ckeditor.js';
	import CKEditor from './ckeditor.js';
	import uploadAdapter from "./uploadAdapter.js";

	export default {
		components: {
			ckeditor: CKEditor.component
		},
		props: {
			modelValue: {
				type: String,
				default: ""
			},
			placeholder: {
				type: String,
				default: ""
			},
			disabled: {
				type: Boolean,
				default: false
			},
			toolbar: {
				type: Array,
				default: () => { return ['heading', '|', 'fontSize', 'fontFamily', 'fontColor', '|', 'bold', 'italic', 'underline', 'strikethrough', '|', 'alignment', '|', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'todoList', 'blockQuote', 'link', 'imageUpload', 'mediaEmbed', 'insertTable', '|', 'undo', 'redo'] }
			}
		},
		data() {
			return {
				value: this.modelValue,
				editor: ClassicEditor,
				editorConfig: {
					toolbar: this.toolbar,
					placeholder: this.placeholder,
					fontSize: {
						options: ['default', 10, 12, 14, 16, 18, 20, 24, 36]
					},
					image: {
						styles: ['alignLeft', 'alignCenter', 'alignRight'],
						toolbar: [ 'imageStyle:alignCenter', 'imageStyle:alignLeft', 'imageStyle:alignRight', '|', 'imageTextAlternative' ]
					},
					table: {
						contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableCellProperties', 'tableProperties']
					}
				}
			}
		},
		watch: {
			modelValue() {
				this.value = this.modelValue
			},
		},
		mounted() {

		},
		methods: {
			onReady(editor) {
				const toolbarContainer = document.querySelector('.toolbar-container');
				toolbarContainer.prepend(editor.ui.view.toolbar.element);
				editor.plugins.get("FileRepository").createUploadAdapter = loader => {
					return new uploadAdapter(loader);
				};
			},
			onEditorInput() {
				this.$emit('update:modelValue', this.value);
			}
		}
	}
</script>

<style>
	.sceditor {}
	.ck .ck-placeholder:before {color: #bbb;}
	.sceditor .ck-toolbar {
		background: #fff;
		border-color: #DCDFE6;
		box-shadow: 2px 2px 1px rgba(0, 0, 0, .05);
		position: relative;
		z-index: 1;
	}

	.content-container {
		background: #f6f8f9;
		overflow-y: scroll;
		padding: 30px;
		height: 400px;
		border: 1px solid #DCDFE6;
		border-top: 0;
		resize: vertical;
	}

	.content-container .ck-content {
		margin: 0 auto;
		background: #fff;
		border: 1px solid #DCDFE6 !important;
		box-shadow: 2px 2px 1px rgba(0, 0, 0, .05) !important;
		padding: 40px;
		min-height: 340px;
	}
</style>

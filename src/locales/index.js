import sysConfig from "@/config"
import tool from '@/utils/tool'
import { createI18n } from 'vue-i18n'
import elementLocale_zh_cn from 'element-plus/lib/locale/lang/zh-cn'
import elementLocale_en from 'element-plus/lib/locale/lang/en'

import zh_cn from './lang/zh-cn.js'
import en from './lang/en.js'

const messages = {
	'zh-cn': {
		el: elementLocale_zh_cn.el,
		...zh_cn
	},
	'en': {
		el: elementLocale_en.el,
		...en
	}
}

const i18n = createI18n({
	locale: tool.data.get("APP_LANG") || sysConfig.LANG,
	fallbackLocale: 'zh-cn',
	globalInjection: true,
	messages,
})

export default i18n;

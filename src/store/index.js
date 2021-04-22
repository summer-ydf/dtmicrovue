import { createStore } from 'vuex';
import keepAlive from './modules/keepAlive';

export default createStore({
	modules: {
		keepAlive
	}
});

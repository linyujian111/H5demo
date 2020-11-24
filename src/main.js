const isPro = process.env.NODE_ENV === 'production';
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import './utils/request';
import Vconsole from 'vconsole';  //移动端log控制台输出测试插件
import './utils/androidBack'; //引入Hbuilder打包app监听物理键返回的处理方法
// import './utils/getGolacation'; //引入Hbuilder打包定位的处理方法
import 'amfe-flexible/index.js';
import Storage from 'vue-web-storage';
import installComponent from '@/components/Height_components/index.js';
import myPlugins from 'vue-plugin-tips-six';
import {
    Cell,
    CellGroup,
    Button,
    Icon,
    Popup,
    Search,
    Dialog,
    Toast,
    Lazyload,
    Row,
    Col,
} from 'vant';

Vue.use(Cell)
    .use(CellGroup)
    .use(Button)
    .use(Icon)
    .use(Popup)
    .use(Search)
    .use(Dialog)
    .use(Toast)
    .use(Lazyload)
    .use(Row)
    .use(Col);
Vue.use(myPlugins);
//实例化插件
if (!isPro) {
    const vConsole = new Vconsole();
    Vue.use(vConsole);
}
Vue.use(installComponent);
//本地缓存插件
Vue.use(Storage, {
    prefix: 'APPInfo',// default `app_`
    drivers: ['session', 'local'], // default 'local'
});
Vue.prototype.$local = Vue.$localStorage;
Vue.prototype.$session = Vue.$sessionStorage;
//样式
import 'vant/lib/index.css';
import '@css/commonCss.css';
import '@css/reset.css';
import('vant/lib/icon/local.css');
import 'vue-plugin-tips-six/lib/vue-plugin-tips-six.css';

Vue.config.productionTip = false;

//自定义指令
Vue.directive('display-key', {
    bind(el, binding) {
        console.log('自定义指令值绑定==', binding);
    },
    inserted(el, binding) {
        console.log('自定义指令传值==', binding);
        let displayKey = binding.value;
        if (displayKey == 11) {
            el.parentNode && el.parentNode.removeChild(el);
        } else {
            //抛出异常
            throw new Error('need key! like v-display-key = Boolean');
        }
    },
    update(el, binding) {
        console.log('自定义指令值更新==', binding);
        let displayKey = binding.value;
        if (displayKey == 11) {
            el.parentNode && el.parentNode.removeChild(el);
        }
        if (displayKey != 11) {
            console.log('updateEl', el);
            console.log('el.parentNode=', el.parentNode);
            el.parentNode && el.parentNode.appenChild(el);
        }
    }
});

if (process.env.NODE_ENV != 'production') {
    console.log(process.env);
}
router.beforeEach((to, from, next) => {

    const { path, query } = to;

    if (path == '/notFound') {
        return;
    }

    next();

});

new Vue({
    store,
    router,
    render: h => h(App),
    data() {
        return {

        };
    },
    created() {
        // eslint-disable-next-line no-console
        // console.log(777)
    },
    mounted() {
        // window.andriodApiFuc = andriodApi;
    }
}).$mount('#app');

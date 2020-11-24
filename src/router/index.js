/*
 * @Description: 路由文件
 * @Author: xwq
 * @Date: 2019-08-21 14:57:26
 */
import Vue from 'vue';
import vueRouter from 'vue-router';
Vue.use(vueRouter);

const routerList = [];
function getRouterAll(r) {
    console.log('r==', r);
    r.keys().forEach(
        key => routerList.push(r(key).default)
    );
}
getRouterAll(require.context('../route', true, /\.routes\.js/));

console.log('routerList==', routerList);

const router = [
    {
        path: '/',
        redirect: { name: 'login' }
    },
    ...routerList,
    {
        path: '/agreement',
        name: 'agreement',
        component: () => import('@/views/agreement'),
        meta: {
            title: '协议内容',
            keepAlive: true
        }
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home'),
        meta: {
            title: '首页',
            keepAlive: false
        }
    },
    {
        path: '/notFound',
        name: 'notFound',
        component: () => import('@/components/notFound'),
        meta: {
            title: '页面走丢了',
            keepAlive: true,

        }
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test'),
    },
    {
        path: '/touchMove',
        name: 'touchMove',
        component: () => import('@/views/touchMove'),
    },
    {
        path: '/details',
        name: 'details',
        component: () => import('@/views/details')
    },
    {
        path: '/uploadTest',
        name: 'uploadTest',
        component: () => import('@/views/uploadTest')
    },
    {
        path: '/storeTest',
        name: 'storeTest',
        component: () => import('@/views/storeTest')
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test')
    },
    {
        path: '*',
        redirect: { name: 'notFound' }
    }
];

export default new vueRouter({
    routes: router,
});
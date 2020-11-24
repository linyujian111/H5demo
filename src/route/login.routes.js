/*
 * @Description: 登入组件
 * @Author: xwq
 * @Date: 2020-03-24 22:27:53
 */

export default {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue'),
    meta: {
        title: '登入',
        keepAlive: false
    }
};

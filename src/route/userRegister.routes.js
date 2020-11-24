/*
 * @Description: 注册
 * @Author: xwq
 * @Date: 2020-03-24 22:27:53
 */

export default {
    path: '/userRegister',
    name: 'userRegister',
    component: () => import('../views/userRegister.vue'),
    meta: {
        title: '账号注册',
        keepAlive: false
    }
};

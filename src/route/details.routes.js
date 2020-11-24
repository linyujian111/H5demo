/*
 * @Description: 城市列表
 * @Author: xwq
 * @Date: 2020-03-24 22:57:17
 */

export default {
    path: '/details',
    name: 'details',
    component: () => import('../views/details.vue'),
    meta: {
        title: '城市列表',
        keepAlive: false
    }
};


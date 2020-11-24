/*
 * @Description: 城市列表
 * @Author: xwq
 * @Date: 2020-03-24 22:57:17
 */

export default {
    path: '/cityList',
    name: 'cityList',
    component: () => import('../views/cityList.vue'),
    meta: {
        title: '城市列表',
        keepAlive: false
    }
};


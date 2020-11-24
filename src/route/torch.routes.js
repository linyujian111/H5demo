/*
 * @Description: 热销商品
 * @Author: xwq
 * @Date: 2020-03-24 22:27:53
 */

export default {
    path: '/torch',
    name: 'torch',
    component: () => import('../views/torch.vue'),
    /* 路由独享守卫 */
    beforeEnter: (to, from, next) => {
        // console.log(to, from);
        next();
    },
    meta: {
        title: '热销商品',
        keepAlive: false
    }
};

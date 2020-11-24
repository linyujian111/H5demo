<!--
 * @Description: 协议内容
 * @Author: xwq
 * @Date: 2019-06-30 13:36:56
 -->
<template>
    <div class="page" v-once>
        <div class="main-container">
            <h1>
                {{title}}
                <van-icon name="cross" size="24px" @click="closeAgreement"></van-icon>
            </h1>
            <ul class="agreement-list text-left">
                <li v-for="(item,key) in agreementList" :key="key">{{item}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            title: this.$route.meta.title,
            agreementList: [
                "1、本软件仅供学习之用途",
                "2、不可随意传播下载",
                "3、不可随意修改内容",
                "4、不遵守规定，后果自负。",
                "5、最终解释权归本软件所有"
            ]
        };
    },
    created() {},
    mounted() {},
    methods: {
        /**
         * @Description: 关闭协议页面
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-30 14:01:27
         */

        closeAgreement() {
            this.$router.push({
                name: "login"
            });
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .main-container {
        & h1 {
            padding: 10px 0;
            font-size: 18px;
            font-weight: bold;
            position: relative;
            /deep/ .van-icon,
            .van-icon::before {
                position: absolute;
                right: 0;
                background-color: #f2f2f2;
            }
        }
        .agreement-list {
            & > li {
                padding: 10px;
                font-size: 16px;
                line-height: 24px;
            }
        }
    }
}
</style>

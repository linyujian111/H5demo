<template>
    <div class="page">
        <VheadOne
            :title="title"
            :leftArrowStatus="leftArrowStatus"
            :isFixed="isFixed"
            :onClickLeftStatus="onClickLeftStatus"
            @leftMenuHandle="back"
        />
        <background />
        <div class="main-container">
            <div class="more-use-city">
                <h1 class="title-text text-left">常用城市</h1>
                <van-row gutter="20" class="more-use-city-list">
                    <van-col
                        class="more-use-city-item"
                        span="6"
                        offset="1"
                        v-for="(item,key) in moreUseCity"
                        :key="key"
                        @click.native="selectMoreUseCity(item)"
                    >{{item}}</van-col>
                </van-row>
            </div>
            <div class="more-use-city">
                <h1 class="title-text text-left">热门城市</h1>
                <van-row gutter="20" class="more-use-city-list">
                    <van-col
                        class="more-use-city-item"
                        span="6"
                        offset="1"
                        v-for="(item,key) in hotCity"
                        :key="key"
                        @click.native="selectMoreUseCity(item)"
                    >{{item}}</van-col>
                </van-row>
            </div>
            <div class="other-city">
                <h1 class="title-text-h1 text-left">其他城市</h1>
                <div class="city-list margin-bottom" v-for="(item1,k1) in otherCity" :key="k1">
                    <h3 class="title-text-h3 text-left">{{item1.provinceName}}</h3>
                    <van-cell
                        :title="item2.citysName"
                        is-link
                        title-class="left-title-style"
                        v-for="(item2,k2) in item1.citys"
                        :key="k2"
                        @click="selectMoreUseCity(item2.citysName)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headOne from "@/components/headOne";
import background from "@/components/background";
import otherCity from "@/utils/area.js";
import { setTimeout } from "timers";
export default {
    components: {
        VheadOne: headOne,
        background
    },
    data() {
        return {
            title: this.$route.meta.title,
            isFixed: true,
            onClickLeftStatus: true,
            leftArrowStatus: true,
            moreUseCity: ["广州", "深圳", "上海", "北京"],
            hotCity: [
                "广州",
                "深圳",
                "上海",
                "北京",
                "天津",
                "武汉",
                "杭州",
                "苏州",
                "南宁"
            ],
            otherCity: []
        };
    },
    created() {},
    mounted() {
        this.otherCity = otherCity.provinces;
    },
    methods: {
        /**
         * @Description: 返回
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-19 14:59:59
         */
        back() {
            this.$router.back();
        },
        /**
         * @Description: 选择常用城市
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-19 17:08:37
         */

        selectMoreUseCity(item) {
            setTimeout(() => {
                this.$router.push({
                    name: "home",
                    query: {
                        cityName: item
                    }
                });
            }, 500);
        }
    }
};
</script>
<style lang="less" scoped>
.public-background-style {
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
}
.public-title-text {
    font-size: 20px;
    padding: 10px;
}
.page {
    .main-container {
        .more-use-city {
            .public-background-style;
            .title-text {
                .public-title-text;
            }
            .more-use-city-list {
                padding: 10px 15px;
                user-select: none; //限制用户长按复制
                .more-use-city-item {
                    padding: 5px 0;
                    margin-bottom: 10px;
                    background: #f2f2f2;
                    font-size: 16px;
                }
            }
        }
        .other-city {
            .title-text-h1 {
                .public-title-text;
            }
            .public-background-style;
            .city-list {
                .title-text-h3 {
                    .public-title-text;
                }
                .left-title-style {
                    text-align: left;
                }
            }
        }
    }
}
</style>

<!--
 * @Description: 报告列表公共组件
 * @Author: xwq
 * @Date: 2019-12-14 13:27:41
 * @LastEditTime : 2019-12-21 15:04:01
 -->
<template>
    <div class="VslotHeaderComponent">
        <headerOne
            :isFixed="true"
            title="工单列表"
            :rightText="rightText"
            :onClickLeftStatus="true"
            @onClickLeft="backHandle"
            @onClickRight="screenClickHandle"
        ></headerOne>
        <Vbackground />
        <div class="header-tabs" :class="[{'tab-is-fixed':tabIsFixed}]">
            <van-tabs v-model="active" title-active-color="#46aef7" @click="tabsClickHandle">
                <van-tab v-for="(i,k) in tabObject" :key="k" :title="i['title']"></van-tab>
            </van-tabs>
            <van-cell-group v-if="isShowSeach">
                <van-field
                    v-model="searchVal"
                    input-align="center"
                    clearable
                    :placeholder="placeholder"
                >
                    <van-icon slot="right-icon" name="search" @click="searchClickHandle" />
                </van-field>
            </van-cell-group>
        </div>
        <div
            :class="[{'tab-is-fixed-margin':tabIsFixed,'tab-is-fixed-hide':!tabIsFixed,'tab-is-fixed-noSearch-margin':tabIsFixed&&!isShowSeach}]"
        ></div>
        <div class="main-container" :class="[{'container-calc-height':!isShowSeach}]">
            <div class="main-content scroll-touch">
                <!-- 列表内容区 -->
                <slot name="content"></slot>
            </div>
        </div>
        <div class="loading" v-show="loadShow">
            <van-popup v-model="loadShow" :overlay="false" :get-container="getContainer">
                <van-loading type="spinner" size="36px" color="#575757"></van-loading>
            </van-popup>
        </div>
        <div class="top-right-screen" v-show="isScreenShow">
            <van-popup
                v-model="isScreenShow"
                position="right"
                :style="{ height:'100%' }"
                :close-on-click-overlay="isScreenShow"
                @click-overlay="clickOverlay"
            >
                <!-- 筛选面板内容区 -->
                <slot name="screen"></slot>
            </van-popup>
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import background from "@/components/background/background";
import { Field, Loading } from "vant";
export default {
    components: {
        headerOne,
        Vbackground: background,
        [Field.name]: Field,
        [Loading.name]: Loading
    },
    props: {
        title: {
            type: String,
            default: "检测工单"
        },
        rightText: {
            type: String,
            default: "筛选"
        },
        tabObject: {
            type: Array,
            default: () => {
                return [
                    { title: "未完成", name: 0 },
                    { title: "已完成", name: 1 },
                    { title: "报告列表", name: 2 }
                ];
            }
        },
        searchPlaceholder: {
            type: Array,
            default: () => {
                return [
                    "请输入手机号码/客户名称/车牌号",
                    "请输入手机号码/客户名称/车牌号",
                    "输入车架号"
                ];
            }
        },
        tabIsFixed: {
            type: Boolean,
            default: true
        },
        loadShow: {
            type: Boolean,
            default: false
        },
        isShowSeach: {
            type: Boolean,
            default: true
        },
        screenShow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            active: 0,
            searchVal: "",
            placeholder: "",
            isScreenShow: false
        };
    },
    created() {
        this.init();
    },
    mounted() {
        this.$watch("screenShow", () => {
            this.isScreenShow = this.screenShow;
        });
        this.$watch("searchVal", () => {
            if (this.searchVal == "") {
                this.$emit("watchSearchValHandle");
            }
        });
    },
    methods: {
        /**
         * @Description: 初始化
         * @Param:
         * @Author: xwq
         * @Date: 2019-12-14 15:15:42
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         */
        init() {
            if (this.searchPlaceholder && this.isShowSeach) {
                this.placeholder = this.searchPlaceholder[this.active];
            }
        },
        /**
         * @Description: 筛选面板
         * @Param:
         * @Author: xwq
         * @Date: 2019-12-14 15:24:56
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         */
        screenClickHandle() {
            this.searchVal = "";
            this.$emit("screenClickHandle");
        },
        /**
         * @Description: 筛选面板_蒙层点击
         * @Param:
         * @Author: xwq
         * @Date: 2019-12-14 17:59:25
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         */
        clickOverlay() {
            this.$emit("clickOverlay");
        },
        /**
         * @Description: tab切换
         * @Param:
         * @Author: xwq
         * @Date: 2019-12-14 14:07:55
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         */
        tabsClickHandle(active, title) {
            this.searchVal = "";
            this.init();
            this.$emit("tabsClickHandle", { active, title });
        },
        /**
         * @Description: 关键词搜索
         * @Param:
         * @Author: xwq
         * @Date: 2019-12-14 14:29:56
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         */
        searchClickHandle() {
            this.$emit("searchClickHandle", this.searchVal);
        },
        /**
         * @Description: 获取挂载节点
         * @Param:
         * @Author: xwq
         * @Date: 2019-12-14 16:55:26
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         */

        getContainer() {
            this.$nextTick(() => {
                return document.querySelector(".main-container");
            });
        },
        /**
         * @Description: 返回
         * @Param:
         * @Author: xwq
         * @Date: 2019-12-21 15:03:09
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         */

        backHandle() {
            this.$emit("backHandle");
        }
    }
};
</script>
<style lang="less" scoped>
.VslotHeaderComponent {
    .header-tabs {
        z-index: 1;
        /deep/ .van-tabs__line {
            background-color: #46aef7;
        }
        /deep/ .van-cell-group {
            background-color: transparent;
            padding: 10px 10px 0 10px;
        }
        /deep/ .van-field__clear {
            padding: 0 25px 0 15px;
        }
    }
    .tab-is-fixed {
        position: fixed;
        width: 100%;
    }
    .tab-is-fixed-margin {
        margin-top: 97px;
    }
    .tab-is-fixed-noSearch-margin {
        margin-top: 45px;
    }
    .tab-is-fixed-hide {
        display: none;
    }
    .main-container {
        box-sizing: border-box;
        height: calc(100vh - 178px);
        .main-content {
            height: calc(100vh - 178px);
            overflow-y: scroll;
            width: 100%;
            // background-color: #fff;
            padding-bottom: 25px;
        }
    }
    .container-calc-height {
        height: calc(100vh - 46px);
    }
    .loading {
        /deep/ .van-popup {
            background-color: transparent;
        }
    }
}
</style>
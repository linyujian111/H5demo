<!--
 * @Description: 详情
 * @Author: xwq
 * @Date: 2019-10-27 20:29:47
 -->
<template>
    <div class="page">
        <headerOne title="详情" :leftArrowStatus="true" />
        <background />
        <van-row type="flex" justify="space-around" class="date-select-top">
            <van-col span="7" :style="{color:'#999'}">{{startTime}}</van-col>
            <van-col span="4">至</van-col>
            <van-col span="7" :style="{color:'#999'}">{{endTime}}</van-col>
            <van-col
                span="6"
                :style="{textAlign:'right',color:'#359FF7',paddingRight:'10px'}"
                @click.native="creenShowHandle"
            >筛选</van-col>
        </van-row>
        <div class="main-container"></div>
        <calendarCompnent :popShow="screenShow" @onClickLeft="onClickLeft" @confirm="confirm" />
    </div>
</template>
<script>
import headerOne from "@/components/headOne";
import background from "@/components/background";
import calendarCompnent from "@/components/calendarCompnent";
export default {
    components: {
        headerOne,
        background,
        calendarCompnent
    },
    props: {},
    data() {
        return {
            screenShow: false,
            startTime: "开始时间",
            endTime: "结束时间"
        };
    },
    created() {},
    mounted() {},
    methods: {
        /**
         * @Description: 日历-返回
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-10-27 20:52:48
         */
        onClickLeft() {
            this.screenShow = false;
        },
        /**
         * @Description: 显示选择时间面板
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-10-27 20:49:30
         */

        creenShowHandle() {
            this.screenShow = true;
        },
        /**
         * @Description:
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-10-27 20:56:09
         */

        confirm(date) {
            if (this.isOverThreeMonth(date)) {
                console.dir(date);
                this.screenShow = false;
                this.startTime = date["startDate"];
                this.endTime = date["endDate"];
            } else {
                return false;
            }
        },

        /**
         * @Description: 判断是否超过三个月
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-10-27 21:31:09
         */

        isOverThreeMonth(date) {
            let st = date["startDate"].split("-");
            let et = date["endDate"].split("-");
            /* console.table([st, et]);
            console.log(this.isLeapYear(st[0])); */

            let flag = true;
            /* 同年 */
            if (st[0] == et[0]) {
                if (
                    (et[1] - st[1] == 3 && et[2] > st[2]) ||
                    et[1] - st[1] > 3
                ) {
                    flag = false;
                } else if (et[2] == st[2] && et[1] - st[1] >= 3) {
                    flag = false;
                }
            } else {
                /* 不同年 */
                if (et[0] - st[0] > 1) {
                    flag = false;
                } else if (et[0] - st[0] == 1) {
                    if (st[1] < 10) {
                        //开始年的月份小于10时，不需要跨年
                        flag = false;
                    } else if (st[1] + 3 - et[1] < 12) {
                        //月相隔大于3个月
                        flag = false;
                    } else if (+st[1] + 3 - et[1] == 12) {
                        //月相隔3个月，比较日
                        if (et[2] > st[2]) {
                            //结束日期的日大于开始日期的日
                            flag = false;
                        } else if (et[2] == st[2] && st[1] - et[1] >= 9) {
                            flag = false;
                        }
                    }
                }
            }
            if (!flag) {
                this.$toast("选择的时间不能超过三个月");
                return false;
            }

            return true;
        },
        /**
         * @Description: 判断是否为闰年
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-10-27 21:16:08
         */

        isLeapYear(year) {
            return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .date-select-top {
        padding: 15px 5px;
        background-color: #fff;
    }
    .main-container {
    }
}
</style>
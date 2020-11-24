<!--
 * @Description: store的使用例子
 * @Author: xwq
 * @Date: 2020-02-25 09:45:51
 * @LastEditTime: 2020-02-25 10:32:34
 -->
<template>
    <div class="page">
        <p style="padding:20px;font-size:24px;">
            <span>state值：{{$store.state.count}}</span>
        </p>
        <p style="padding:20px;font-size:24px;">
            <span>getters值：{{$store.getters.doneCount}}</span>
        </p>
        <div>
            <van-button type="info" @click="addHandle">增加</van-button>
            <van-button type="primary" @click="reduceHandle">减少</van-button>
        </div>
        <div style="padding:20px;font-size:24px;">
            <span>{{count1}}</span>
        </div>
        <div style="padding:20px;font-size:24px;">
            <span>{{doneCount}}</span>
        </div>
        <div style="padding:20px;font-size:24px;">
            <span>自定义名称方式：{{test}}</span>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
    data() {
        return {};
    },
    computed: {
        // 遍历state里面的数据
        ...mapState({
            count1: state => state.num
        }),
        // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters(["doneCount"]),
        //自定义getters属性名称的写法
        ...mapGetters({ test: "doneCount" })
    },
    created() {},
    mounted() {},
    methods: {
        addHandle() {
            console.log(this.$store);
            this.$store.dispatch("addFunc");
        },
        reduceHandle() {
            this.$store.dispatch("reduce");
        }
    }
};
</script>
<style lang="less" scoped>
.page {
}
</style>
<!--
 * @Description: 测试全局组件调用
 * @Author: xwq
 * @Date: 2020-03-27 16:48:55
 -->
<template>
  <div class="page">
    <HelloWorld />
    <Vbutton type="primary" @click.native="btnClick" buttonText="测试"></Vbutton>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num: 1
    };
  },
  render: function(createElement, context) {
    console.log("---*", createElement);
  },
  created() {},
  mounted() {},
  methods: {
    btnClick() {
      this.$tips({
        msg: "我来自tips插件",
        time: 1000
      });
    }
  }
};
</script>
<style lang="less" scoped>
.page {
}
</style>
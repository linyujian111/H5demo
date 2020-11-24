<template>
      <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      {{dividerName}}
    </van-divider>
</template>

<script>
import {divider } from "vant";

export default {
name:'URdivider',
 components: {
    [divider.name]: divider,

    
  },
   props: {
    dividerName: {
      type: String,
      default: () => {
        return '';
      },
    },
  },
}
</script>

<style scoped>
.van-divider {
  border-color: #fbf9fe !important;
  color: #fbf9fe !important;
  padding: 0px 16px !important;
  margin: 5px 0;
  background: linear-gradient(45deg, #ff6c6c, #fbf9fe);
}
</style>
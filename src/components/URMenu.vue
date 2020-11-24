<template>
  <div class="URmenu-box">
    <URdivider dividerName="菜单" />
    <van-grid border :column-num="4">
      <van-grid-item v-for="(item, index) in gridImgList" :key="index">
        <van-image :src="item.imgURL" />
        <div class="namebox">
          {{ item.name }}
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { Image, Grid, GridItem } from "vant";
import URdivider from "@/components/URdivider";

export default {
  props: {
    gridImgList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Image.name]: Image,
    [URdivider.name]: URdivider,
  },
};
</script>

<style scoped>
.van-grid-item__content--center {
  padding: 4px 11px;
}

.namebox {
  margin-top: 10px;
  font-size: 12px;
}
</style>>

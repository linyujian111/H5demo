<template>
  <div class="URgoodList-box">
    <URdivider dividerName="热门商品" />

 
      <van-grid border :column-num="2">
        <van-grid-item v-for="(item, index) in goodList" :key="index">
          <van-image :src="item.imgURL" />
          <div class="namebox">
            {{ item.name }}
          </div>
        </van-grid-item>
      </van-grid>

      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
   
  </div>
</template>

<script>
import { Image, Grid, GridItem,List} from "vant";
import URdivider from "@/components/URdivider";

export default {
  props: {
    goodList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
     
    };
  },

  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Image.name]: Image,
    [URdivider.name]: URdivider,
    [List.name]: List,
  },
  methods: {
    
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

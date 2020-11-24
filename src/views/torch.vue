<!--
 * @Description: 热销产品区
 * @Author: xwq
 * @Date: 2019-07-13 16:13:22
 -->
<template>
    <div class="page">
        <VheadOne
            :title="title"
            :isFixed="isFixed"
            :leftArrowStatus="leftArrowStatus"
            :onClickLeftStatus="onClickLeftStatus"
            @leftMenuHandle="back"
        />
        <div class="main-container">
            <h3>热销商品</h3>
            <div class="preview-img">
                <van-uploader :after-read="afterRead">
                    <van-icon name="plus" class="add-img-icon"></van-icon>
                </van-uploader>
                <ul class="img-preview-container">
                    <li class="img-preview-item" v-for="(i,k) in imgList" :key="k">
                        <img v-lazy="i" class="uploader-img" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import headOne from "@/components/headOne";
import { previewImg } from "@/utils/commonJs";
import { Uploader } from "vant";
export default {
    components: {
        VheadOne: headOne,
        [Uploader.name]: Uploader
    },
    data() {
        return {
            title: this.$route.meta.title,
            isFixed: true,
            onClickLeftStatus: true,
            leftArrowStatus: true,
            imgList: [] //图片路径
        };
    },
    //不能直接访问this，需要传入函数
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // console.log(vm, "8888===");
        });
    },
    created() {},
    mounted() {},
    methods: {
        /* 返回 */
        back() {
            this.$router.back();
        },
        /**
         * @Description: 图片上传成功回调
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-15 21:10:49
         */

        afterRead(file) {
            let result = previewImg(file["file"]);
            this.imgList.push(result);
            console.log(result);
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .main-container {
        h3 {
            padding: 10px;
            font-size: 14px;
        }
        .preview-img {
            display: flex;
            & > :first-child {
                width: 50px;
                height: 50px;
                .add-img-icon {
                    font-size: 36px;
                }
            }
            & > .img-preview-container {
                flex: 1;
                border: 1px solid #ccc;
                padding: 10px;
                .img-preview-item {
                    width: 50px;
                    height: 50px;
                    border: 1px solid #f2f2f2;
                    border-radius: 5px;
                    float: left;
                    margin: 0 5px 5px 0;
                    .uploader-img {
                        display: block;
                        width: 50px;
                        height: 50px;
                        border-radius: 5px;
                    }
                }
            }
        }
    }
}
</style>

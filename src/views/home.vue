<!--
 * @Description: 首页
 * @Author: xwq
 * @Date: 2019-05-19 14:43:36
 -->
<template>
    <div class="page">

        <!-- 头部 -->
        <headOne
            :title="title"
            :isFixed="isFixed"
            :leftIcon="leftIcon"
            :rightIcon="rightIcon"
            :golacationText="golacationText"
            rightColor="#f00"
            rightIconName="location-o"
            :onClickLeftStatus="onClickLeftStatus"
            @leftMenuHandle="leftMenuHandle"
            @rightMenuHandle="rightMenuHandle"
        />

        <!-- 背景 -->
        <background />

        <!-- 左侧菜单 -->
        <URheaderLeftMenu
            positionInfo="right"
            :styleInfo="{width:'70%',height:'100%'}"
            :listInfo="listInfo"
        />

        <URbanner :imgList="imgList" />

        <!-- UR的宫格菜单组件 -->
        <URMenu :gridImgList='gridImgList'> </URMenu>

        <!-- UR的商品列表组件 -->

           <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >


        <URgoodList :goodList='goodList'></URgoodList>
   </van-list>

        <!-- <button @click="changegridImgList">3333</button> -->
<!-- 
        <div class="main-container">
           <VlistInfo :listArray="listArray" @listHandle="listMenuHandle" />
            <p>原始数据：{{sourceInfo}}</p>
            <p>{{positionInfo}}</p>
            <van-cell title-class="title-style" title="推广渠道">
                <template slot="default">
                    <span @click="copylink">复制链接</span>
                </template>
            </van-cell>
            <QRCode
                id="qrcode"
                :qrCodeLink="qrCodeLink"
                :titleStatus="false"
                :buttonStatus="false"
            />
            <p class="statement-bottom" v-display-key:[title]="status">本软件由雲亿科技提供.备案号-粤88AG9</p>
        </div> -->



    </div>
</template>
<script>
import eventVue from "@/utils/eventVue"; //引入vue的构造函数
import headOne from "@/components/headOne";
import background from "@/components/background";
import banner from "@/components/banner";
import listInfo from "@/components/listInfo";
import headerLeftMenu from "@/components/headerLeftMenu";
import URMenu from "@/components/URMenu";
import URgoodList from "@/components/URgoodList";
import { dateTimeFormate } from "@/utils/commonJs";
import { getCurrentPosition } from "@/utils/getGolacation"; //引入Hbuilder打包定位的处理方法
import QRCode from "@/components/qrCode";
import html2canvas from "html2canvas";
import {List} from "vant";


export default {
    components: {
        headOne,
        background,
        URbanner: banner,
        VlistInfo: listInfo,
        URheaderLeftMenu: headerLeftMenu,
        QRCode,
        URMenu,
        URgoodList,
        [List.name]: List,
      
    },
    data() {
        return {
             list: [],
      loading: false,
      finished: false,
      refreshing: false,

            obj:['1','2','3','4'],
            goodList:[
                {imgURL:'https://img.yzcdn.cn/vant/apple-1.jpg',routerURL:'/name',name:'店铺'},
                {imgURL:'https://img.yzcdn.cn/vant/apple-1.jpg',routerURL:'/name',name:'物料'},
                {imgURL:'https://img.yzcdn.cn/vant/apple-1.jpg',routerURL:'/name',name:'橱窗'},
                {imgURL:'https://img.yzcdn.cn/vant/apple-1.jpg',routerURL:'/name',name:'采购'},
                {imgURL:'https://img.yzcdn.cn/vant/apple-1.jpg',routerURL:'/name',name:'变更'},
                {imgURL:'https://img.yzcdn.cn/vant/apple-1.jpg',routerURL:'/name',name:'打版'},
                {imgURL:'https://img.yzcdn.cn/vant/apple-1.jpg',routerURL:'/name',name:'送货'},
                {imgURL:'https://img.yzcdn.cn/vant/apple-1.jpg',routerURL:'/name',name:'收货'}
            ],
            gridImgList:[
                {imgURL:'https://img.yzcdn.cn/vant/apple-1.jpg',routerURL:'/name',name:'店铺'},
                {imgURL:'https://img.yzcdn.cn/vant/apple-1.jpg',routerURL:'/name',name:'物料'},
                {imgURL:'https://img.yzcdn.cn/vant/apple-1.jpg',routerURL:'/name',name:'橱窗'},
                {imgURL:'https://img.yzcdn.cn/vant/apple-1.jpg',routerURL:'/name',name:'采购'},
                {imgURL:'https://img.yzcdn.cn/vant/apple-1.jpg',routerURL:'/name',name:'变更'},
                {imgURL:'https://img.yzcdn.cn/vant/apple-1.jpg',routerURL:'/name',name:'打版'},
                {imgURL:'https://img.yzcdn.cn/vant/apple-1.jpg',routerURL:'/name',name:'送货'},
                {imgURL:'https://img.yzcdn.cn/vant/apple-1.jpg',routerURL:'/name',name:'收货'}
            ],


            title: this.$route.meta.title,
            isFixed: true,
            leftIcon: true,
            rightIcon: true,
            onClickLeftStatus: true,
            golacationText: "广州",
            sourceInfo: "",
            positionInfo: "",
            imgList: [
                "https://img.yzcdn.cn/vant/apple-1.jpg",
                "https://img.yzcdn.cn/vant/apple-2.jpg",
                require("@image/1.jpg")
            ],
            listArray: [
                {
                    imgUrl: require("@assets/image/pic01.png"),
                    title: "热销商品"
                },
                {
                    imgUrl: require("@assets/image/pic02.png"),
                    title: "大杂烩"
                },
                {
                    imgUrl: require("@assets/image/pic03.png"),
                    title: "橙子"
                },
                {
                    imgUrl: require("@assets/image/pic04.png"),
                    title: "西红柿"
                },
                {
                    imgUrl: require("@assets/image/pic05.png"),
                    title: "肉类"
                },
                {
                    imgUrl: require("@assets/image/pic06.png"),
                    title: "海鲜类"
                },
                {
                    imgUrl: require("@assets/image/pic07.png"),
                    title: "营养类"
                },
                {
                    imgUrl: require("@assets/image/pic08.png"),
                    title: "零食"
                }
            ],
            listInfo: [
                {
                    title: "个人中心",
                    iconName: "user-circle-o"
                },
                {
                    title: "我的钱包",
                    iconName: "balance-o"
                },
                {
                    title: "修改密码",
                    iconName: "edit"
                },
                {
                    title: "关于协议",
                    iconName: "description"
                },
                {
                    title: "退出",
                    iconName: "friends-o"
                }
            ],

            qrCodeLink: "https://xwq2018.github.io/#/home",
            show: false,
            url: "",
            status: 12
        };
    },
    //不能直接访问this，需要传入函数
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // console.log(vm.$route.params, "8888===");
        });
    },
    beforeRouteLeave(to, from, next) {
        if (to.path === "/login") {
            return;
        }
        next();
    },
    beforeCreate() {
        /* document.addEventListener(
            "plusready",
            function() {
                let uuid = plus.device.uuid;
                alert(uuid, "=====");
            },
            false
        ); */
    },
    created() {
        let v = {name:'234',ago:'33'};

           var {name,ago} =v;

        console.log(name,ago);
        // this.sourceInfo = getCurrentPosition();
        // this.positionInfo = JSON.parse(getCurrentPosition());
        let cityName = this.$route.query.cityName;
        if (cityName) {
            this.golacationText = cityName;
        }
    },
    mounted() {
        // setTimeout(() => {
        //     this.status = 11;
        // }, 3000);
        return;
        this.Geolocation();
        this.forMate();

        console.log("html2canvas==", html2canvas);

        this.$nextTick(() => {
            /* let opt = {
                width: 300,
                height: 300,
                backgroundColor: null,
                useCORS: true, // 允许图片跨域
                taintTest: true, // 在渲染前测试图片
                timeout: 500 // 加载延时
            };
            html2canvas(document.getElementById("qrcode"), opt).then(canvas => {
                let imgUrl = canvas.toDataURL("image/jpeg");
                this.url = imgUrl;
                console.log(imgUrl);
            });
 */
            // html2Canvas: function() {

            var shareContent = document.getElementById("qrcode"); // 需要绘制的部分的 (原生）dom 对象 ，注意容器的宽度不要使用百分比，使用固定宽度，避免缩放问题

            var width = shareContent.offsetWidth; // 获取(原生）dom 宽度

            var height = shareContent.offsetHeight; // 获取(原生）dom 高

            var offsetTop = shareContent.offsetTop; //元素距离顶部的偏移量

            console.log(width, height);

            var canvas = document.createElement("canvas"); //创建canvas 对象

            var context = canvas.getContext("2d");

            var scaleBy = this.getPixelRatio(context); //获取像素密度的方法 (也可以采用自定义缩放比例)

            canvas.width = width * scaleBy; //这里 由于绘制的dom 为固定宽度，居中，所以没有偏移

            canvas.height = (height + offsetTop) * scaleBy; // 注意高度问题，由于顶部有个距离所以要加上顶部的距离，解决图像高度偏移问题

            // context.scale(scaleBy, scaleBy);

            var opts = {
                //allowTaint: true, //允许加载跨域的图片

                tainttest: true, //检测每张图片都已经加载完成

                scale: scaleBy, // 添加的scale 参数

                canvas: canvas, //自定义 canvas

                logging: true, //日志开关，发布的时候记得改成false

                width: width, //dom 原始宽度

                height: height, //dom 原始高度

                // y: 170,
                scrollX: 0,
                scrollY: 0,

                allowTaint: false,

                useCORS: false
            };

            html2canvas(shareContent, opts).then(function(canvas) {
                let imgmap = canvas.toDataURL();
                if (window.navigator.msSaveOrOpenBlob) {
                    console.log("window.navigator.msSaveOrOpenBlob");
                    var bstr = atob(imgmap.split(",")[1]);

                    var n = bstr.length;

                    var u8arr = new Uint8Array(n);

                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                    }

                    var blob = new Blob([u8arr]);

                    window.navigator.msSaveOrOpenBlob(
                        blob,
                        "个人证书" + "." + "png"
                    );
                } else {
                    // 这里就按照chrome等新版浏览器来处理;
                    console.log("这里就按照chrome等新版浏览器来处理");
                    const a = document.createElement("a");

                    a.href = imgmap;

                    a.setAttribute("download", "chart-download");

                    a.click();
                }
            });

            // }
            //
            // }
        });
    },
    methods: {
        onLoad() {
      this.loading = true;
      console.log('loading')
      
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.goodList.push({
            imgURL: "https://img.yzcdn.cn/vant/apple-1.jpg",
            routerURL: "/name",
            name: "店铺",
          });
        }

        // 加载状态结束
        this.loading = false;
        // this.finished = true;
      }, 2000);

    },
        changegridImgList(){
            this.gridImgList.push(this.gridImgList[0]);
        },
        //获取像素密度
        getPixelRatio: function(context) {
            var backingStore =
                context.backingStorePixelRatio ||
                context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio ||
                1;
            console.log("devicePixelRatio==", window.devicePixelRatio);
            console.log("backingStore==", backingStore);
            return (window.devicePixelRatio || 1) / backingStore;
        },
        Geolocation() {
            if (window.plus) {
                plus.geolocation.getCurrentPosition(
                    function(p) {
                        /*  Toast({
                     type: 'success',
                     message: JSON.stringify(p),
                     duration: 3000,
                 }); */
                        resultInfo = JSON.stringify(p);
                        console.log("success: " + resultInfo);
                        this.$toast(resultInfo);
                    },
                    function(e) {
                        console.log("Geolocation error: " + e.message);
                        this.$toast.fail({
                            type: "fail",
                            message: "Geolocation error: " + e.message,
                            duration: 0
                        });
                    },
                    { provider: "amap", geocode: true }
                );
            }
        },
        /**
         * @Description: 复制到剪贴板
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-03 10:32:08
         */
        copylink() {
            this.show = true;
            let _this = this;
            this.$nextTick(() => {
                let oInput = window.document.createElement("input");
                let range = document.createRange();
                oInput.value = _this.qrCodeLink;
                oInput.className = "copy-input-style";
                oInput.setAttribute("readOnly", true);
                document.body.appendChild(oInput);
                console.log(_this.qrCodeLink);
                console.log("11==", oInput.value);
                range.selectNode(oInput);
                window.getSelection().addRange(range);
                let successful = document.execCommand("copy");
                _this.$toast(successful);
                try {
                    let msg = successful ? "复制成功" : "复制失败";
                    _this.$toast(msg);
                } catch {
                    _this.$toast("unable to copy");
                }
                window.getSelection().removeAllRanges(); //移除选中的元素
                //oInput.select(); // 选择对象
            });
        },
        /**
         * @Description: 左侧菜单,事件监听
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-13 10:39:39
         */
        leftMenuHandle() {
            /* 发送侧边栏弹出的信号 */
            eventVue.$emit("menuStatus", true);

            /* 
            监听左侧边栏列表点击跳转事件
             */
            eventVue.$on("menuListHandle", item => {
                this.$toast("即将跳转->" + item.title);
                setTimeout(() => {
                    this.$toast.clear();
                }, 2000);
            });
        },

        /**
         * @Description: 导航栏 右边按钮
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-19 14:47:19
         */

        rightMenuHandle() {
            this.$router.push({
                name: "cityList"
            });
        },

        /**
         * @Description:首页菜单跳转
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-13 15:59:37
         */
        listMenuHandle(item) {
            this.$toast("即将跳转->" + item.title);
            this.$router.push({
                name: "torch"
            });
        },
        /**
         * @Description: 时间格式化
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-13 10:24:46
         */
        forMate() {
            let result = dateTimeFormate("2019-2-12", "YYYY-MM-dd-HH");
        }
    }
};
</script>
<style>
.copy-input-style {
    opacity: 0;
    cursor: default;
    width: 1px;
    height: 1px;
    position: absolute;
    top: -99999px;
    left: -99999px;
}
</style>
<style lang='less' scoped>
.page {
    .main-container {
        .statement-bottom {
            padding: 8px;
            font-size: 14px;
            text-align: center;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 5px;
            color: #ccc;
        }
    }
}
</style>

<!--
 * @Description: 签名板
 * @Author: xwq
 * @Date: 2020-03-18 14:08:39
 -->
<template>
    <div class="page">
        <div class="toll-bar">
            <div class="line-select">
                <div class="item-style" @click="lineIsShow">线条</div>
                <ul class="item-list-container" :class="{active:lineShow,'no-active':!lineShow}">
                    <li
                        class="item-list"
                        v-for="(item,key) in lineList"
                        :key="key"
                        @click.stop="lineSelectHandle(item.value)"
                    >{{item.title}}</li>
                </ul>
            </div>
            <div class="color-select">
                <div class="item-style" ref="colorContainer">
                    颜色选择
                    <canvas ref="colorCanvas" class="coCanvas"></canvas>
                </div>
            </div>
            <div class="other-tool-bar" @click="toolBarIsShow">
                <div class="item-style">其他工具</div>
                <ul
                    class="item-list-container"
                    :class="{active:toolBarShow,'no-active':!toolBarShow}"
                >
                    <li
                        class="item-list"
                        v-for="(i,k) in toolBarList"
                        :key="k"
                        @click.stop="toolBarSelectHandle(i.name)"
                    >{{i.title}}</li>
                </ul>
            </div>
        </div>
        <div class="boardBox" ref="boardBox">
            <canvas ref="board" @touchstart="mStart" @touchmove="mMove" @touchend="mEnd"></canvas>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            url: "",
            ctx: null,
            coCtx: null,
            point: {
                x: 0,
                y: 0
            },
            moving: false, // 是否正在绘制中且移动
            toolBarShow: false,
            toolBarList: [
                {
                    title: "清除",
                    name: "clear"
                },
                {
                    title: "后退",
                    name: "back"
                },
                {
                    title: "前进",
                    name: "next"
                },
                {
                    title: "保存",
                    name: "save"
                }
            ],
            lineShow: false,
            lineList: [
                {
                    value: 1,
                    title: "1 px"
                },
                {
                    value: 2,
                    title: "2 px"
                },
                {
                    value: 3,
                    title: "3 px"
                },
                {
                    value: 4,
                    title: "4 px"
                },
                {
                    value: 5,
                    title: "5 px"
                }
            ],
            pathRecord: {
                startPath: [],
                endPath: []
            }
        };
    },
    created() {},
    mounted() {
        this.init();
        this.colorInitHandle();
    },
    methods: {
        //初始化
        init() {
            let board = this.$refs.board; // 获取DOM
            board.width = this.$refs.boardBox.offsetWidth; // 设置画布宽
            board.height = this.$refs.boardBox.offsetHeight; // 设置画布高
            this.ctx = board.getContext("2d"); // 二维绘图
            this.ctx.strokeStyle = "#000"; // 颜色
            this.ctx.lineWidth = 1; // 默认线条宽度

            // this.ctx.moveTo(50, 50);
            // this.ctx.quadraticCurveTo(20, 100, 200, 20);
            // this.ctx.stroke();
        },

        //颜色板初始化
        colorInitHandle() {
            let coCtx = this.$refs.colorCanvas;
            let coContainer = this.$refs.colorContainer;

            var ctx = coCtx.getContext("2d");
            var my_gradient = ctx.createLinearGradient(0, 0, 170, 0);
            my_gradient.addColorStop(0, "blue");
            my_gradient.addColorStop(0.5, "red");
            my_gradient.addColorStop(0.75, "#f2f2f2");
            my_gradient.addColorStop(1, "orange");
            ctx.fillStyle = my_gradient;
            ctx.fillRect(0, 0, 150, 100);

            console.log(coCtx);
            console.log(coContainer);
        },
        toolBarIsShow() {
            this.toolBarShow = true;
        },
        //功能选择
        toolBarSelectHandle(name) {
            this.toolBarShow = false;
            switch (name) {
                case "clear":
                    this.clearCanvasFn();
                    break;
                case "back":
                    break;
                case "next":
                    break;
                case "save":
                    break;
                default:
                    break;
            }
        },
        //显示线条工具
        lineIsShow() {
            this.lineShow = true;
        },
        //线条选择
        lineSelectHandle(val) {
            console.log("lineSelect==", val);
            this.lineShow = false;
            this.ctx.lineWidth = val;
        },

        //清除画板
        clearCanvasFn() {
            let width = this.ctx.canvas.width;
            let height = this.ctx.canvas.height;
            this.ctx.clearRect(0, 0, width, height);
            this.pathRecord["startPath"] = []; //删除轨迹
            this.pathRecord["endPath"] = []; //删除轨迹
            this.init();
        },
        // 触摸(开始)
        mStart(e) {
            // console.log("滑动开始==", e);
            let params = {};
            let x = e.touches[0].clientX - e.target.offsetLeft,
                y = e.touches[0].clientY - e.target.offsetTop; // 获取触摸点在画板（canvas）的坐标
            this.point.x = x;
            this.point.y = y;
            params.x = x;
            params.y = y;
            this.pathRecord["startPath"].unshift(params);
            this.ctx.beginPath();
            this.moving = true;
        },
        // 滑动中...
        mMove(e) {
            // console.log("滑动中==", e);
            if (this.moving) {
                let x = e.touches[0].clientX - e.target.offsetLeft,
                    y = e.touches[0].clientY - e.target.offsetTop; // 获取触摸点在画板（canvas）的坐标
                this.ctx.moveTo(this.point.x, this.point.y); // 把路径移动到画布中的指定点，不创建线条(起始点)
                this.ctx.lineTo(x, y); // 添加一个新点，然后创建从该点到画布中最后指定点的线条，不创建线条
                this.ctx.stroke(); // 绘制
                this.point.x = x;
                this.point.y = y; // 重置点坐标为上一个坐标
                this.ctx.save();
            }
        },
        // 滑动结束
        mEnd() {
            console.log(this.moving);
            if (this.moving) {
                this.ctx.closePath(); // 停止绘制
                this.moving = false; // 关闭绘制开关

                let params = {};
                params.x = this.point.x;
                params.y = this.point.y;
                this.pathRecord["endPath"].unshift(params);

                console.log("轨迹数据===", this.pathRecord);

                let imgUrl = this.ctx.canvas.toDataURL("image/png");
                // let createNode = document.createElement("a");
                // console.log(createNode);
                // createNode.href = imgUrl;
                // createNode.download = "test01.png";
                // createNode.click();

                this.url = imgUrl;
                this.ctx.save();
                console.log(this.ctx.restore());
            }
        }
    }
};
</script>
<style lang="less" scoped>
@keyframes toolBarActiveStyle {
    0% {
        display: none;
        opacity: 0;
        top: -50px;
    }
    50% {
        opacity: 0;
        top: 25px;
        display: block;
    }
    75% {
        opacity: 0.6;
        top: 30px;
        display: block;
    }
    100% {
        opacity: 1;
        top: 32px;
        display: block;
    }
}
@keyframes toolBarNoActiveStyle {
    0% {
        opacity: 1;
        top: 32px;
        display: block;
    }
    50% {
        opacity: 0.6;
        top: 30px;
        display: block;
    }
    75% {
        opacity: 0;
        top: 25px;
        display: block;
    }
    100% {
        display: none;
        opacity: 0;
        top: -50px;
    }
}

.toolbarEditor {
    .item-list-container {
        position: absolute;
        left: 0;
        top: 32px;
        border: 1px solid #ccc;
        width: 80%;
        text-align: center;
        background-color: #f2f2f2;
    }
    .item-list {
        padding: 10px 0;
        border-bottom: 1px dotted #999;
    }
    .item-list:last-child {
        border-bottom: 0 none;
    }
}
.page {
    padding: 0 10px 0 10px;
    box-sizing: border-box;
    .boardBox {
        // margin: 30px auto;
        width: 95vw;
        height: calc(100vh - 70px);
        background: #f9f9f9;
        border: 1px solid #b3b3b3;
        box-sizing: border-box;
        overflow: hidden;
        canvas {
            box-sizing: border-box;
        }
    }
    .toll-bar {
        width: 100%;
        height: 50px;
        border: 1px solid #ccc;
        border-bottom: 0 none;
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        font-family: "楷体";

        .line-select {
            position: relative;
            flex: 1;
            .toolbarEditor;
        }
        .color-select {
            flex: 1;
            .coCanvas {
                height: 17px;
            }
        }
        .other-tool-bar {
            position: relative;
            flex: 1;
            .item-style {
                border-right: 0 none;
            }

            .toolbarEditor;
        }
        .item-style {
            margin: 0;
            border-right: 1px dotted #666;
        }
        .active {
            display: block;
            animation: toolBarActiveStyle 1s 1;
        }
        .no-active {
            display: none;
            animation: toolBarNoActiveStyle 1s 1;
        }
    }
}
</style>
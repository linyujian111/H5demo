<template>
    <div class="page">
        <div class="draw" id="draw">
            <ul>
                <li style="background:orange">列表一</li>
                <li style="background:yellowgreen">列表二</li>
                <li style="background:yellow">列表三</li>
                <li style="background:cyan">列表四</li>
                <li style="background:orangered">列表五</li>
                <li style="background:pink">列表六</li>
                <li style="background:red">列表七</li>
                <li style="background:purple">列表八</li>
                <li style="background:violet">列表九</li>
                <li style="background:brown">列表十</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.$nextTick(() => {
                let draw = document.querySelector("#draw");
                let ul = draw.children[0];

                let startY = 0; //记录开始位置
                let moveY = 0; //记录上一次移动端的位置

                //设置向下滑动的最大距离
                let maxDown = 120;
                //设置向上滑动的最大距离
                let maxUp = -(ul.offsetHeight - draw.offsetHeight + maxDown);
                //触摸开始
                document.addEventListener("touchstart", function(e) {
                    // console.log(e);
                    startY = e.changedTouches[0].clientY;
                });

                //触摸移动过程
                document.addEventListener("touchmove", function(e) {
                    ul.style.transition = "none";

                    let currentDistanceY = e.changedTouches[0].clientY - startY;

                    let allDistanceY = moveY + currentDistanceY; //当前滑动的距离加上上一次滑动的距离
                    console.log(allDistanceY, "allDistanceY");
                    // console.log(ul.offsetHeight - draw.offsetHeight, "offset");
                    /*  console.log(allDistanceY, "allDistanceY");
                    console.log(ul.offsetHeight, "ul");
                    console.log(draw.offsetHeight, "draw");
                    */
                    if (allDistanceY > maxDown) {
                        allDistanceY = maxDown + 120;
                    } else if (allDistanceY < maxUp) {
                        allDistanceY = maxUp;
                    }
                    ul.style.transition = "transform .5s";
                    ul.style.transform = `translate3d(0px,${allDistanceY}px, 0px)`; //添加滑动样式
                });

                //触摸移动结束
                document.addEventListener("touchend", function(e) {
                    // 向上反弹值
                    let maxUpBounce = 0;
                    // 向下反弹值
                    let maxDownBounce = -(ul.offsetHeight - draw.offsetHeight);
                    // console.log(e, "touchend");

                    moveY = e.changedTouches[0].clientY - startY + moveY;

                    // 两次滑动的距离 大于 设定的 向上 反弹值时
                    console.log(moveY, "moveY");
                    console.log(maxDownBounce, "maxDownBounce");
                    if (moveY > maxUpBounce) {
                        // 让两次滑动的距离 等于 设置的值
                        moveY = 120;
                        // 添加过渡
                        ul.style.transition = "transform .5s";
                        ul.style.transform = `translate3d(0px,${moveY}px, 0px)`; //添加滑动样式
                    }
                    // 两次滑动的距离 小于 设定的 向下 反弹值时
                    else if (moveY < maxDownBounce) {
                        // 让两次滑动的距离 等于 设置的值
                        moveY = maxDownBounce;
                        // 添加过渡
                        ul.style.transition = "transform .5s";
                        ul.style.transform = `translate3d(0px,${moveY}px, 0px)`; //添加滑动样式
                    }
                });
            });
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .draw {
        width: 60px;
        height: 500px;
        border: 2px solid #ccc;
        overflow: hidden;
        position: fixed;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
    }

    /* li 设置了浮动， 所以 ul 要清除浮动 */
    ul:after {
        content: "";
        display: block;
        visibility: hidden;
        height: 0;
        clear: both;
    }

    ul {
        zoom: 1;
        transform: translate3d(0, 120px, 0);
        transition-duration: 0ms;
        -webkit-overflow-scrolling: touch;
    }

    li {
        list-style: none;
        float: left;
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 16px;
    }
}
</style>
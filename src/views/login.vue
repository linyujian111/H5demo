<!--
 * @Description: 用户登入
 * @Author: xwq
 * @Date: 2019-05-19 14:43:36
 -->
<template>
    <div class="page">
        <!-- <background/> -->
        <div class="main-container">
            <van-row class="login-info text-left">
                <van-row tag="h1">{{title}}</van-row>
                <van-row>
                    <van-cell-group>
                        <van-col tag="h5" class="title-h5" span="24">手机号</van-col>
                        <van-field
                            v-model="tellPhone"
                            type="number"
                            maxlength="11"
                            clearable
                            placeholder="请输入11位手机号"
                        />
                        <van-col tag="h5" class="title-h5" span="24">密码</van-col>
                        <van-field
                            v-model="password"
                            clearable
                            type="password"
                            maxlength="20"
                            placeholder="请输入密码"
                        />
                        <div class="remember-password">
                            <van-radio-group v-model="remenb.radioGroupVal">
                                <van-radio
                                    :name="remenb.radioVal"
                                    icon-size="16"
                                    shape="square"
                                    @click="clickRemenb"
                                ></van-radio>
                            </van-radio-group>
                            <p>记住密码</p>
                            <p class="register" @click="register">注册>></p>
                        </div>
                    </van-cell-group>
                </van-row>
                <Vbutton buttonText="登录" @buttonHandle="submit" />
                <div class="agreement">
                    <van-radio-group v-model="agreement.radioGroupVal">
                        <van-radio
                            :name="agreement.radioVal"
                            icon-size="16"
                            shape="square"
                            @click="clickAgreement"
                        ></van-radio>
                    </van-radio-group>
                    <p>已阅读相关协议说明>></p>
                    <div>
                        <a href="javascript:void(0)" @click="agreementInfo">协议内容</a>
                    </div>
                </div>
            </van-row>
        </div>
    </div>
</template>
<script>
import loginApi from "@/api/user/login";
import { Field, RadioGroup, Radio } from "vant";
import button from "@/components/button";
export default {
    components: {
        [Field.name]: Field,
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio,
        Vbutton: button
    },
    data() {
        return {
            title: this.$route.meta.title,
            tellPhone: "",
            password: "",
            remenb: {
                radioGroupVal: false,
                radioVal: true,
                selectVal: false
            },
            agreement: {
                radioGroupVal: true,
                radioVal: true,
                selectVal: false
            }
        };
    },
    beforeRouteLeave(to, from, next) {
        // console.log(from, to);
        next();
    },
    created() {},
    mounted() {},
    methods: {
        //记住密码选择
        clickRemenb(e) {
            this.remenb.selectVal = !this.remenb.selectVal;
            this.remenb.radioGroupVal = this.remenb.selectVal ? true : false;
        },

        //协议内容勾选
        clickAgreement() {
            this.agreement.selectVal = !this.agreement.selectVal;
            this.agreement.radioGroupVal = this.agreement.selectVal
                ? true
                : false;
        },
        //协议信息
        agreementInfo() {
            this.$router.push({ name: "agreement" });
        },
        /**
         * @Description: 注册账号
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-30 14:46:16
         */
        register() {
            this.$router.push({ name: "userRegister" });
        },
        /**
         * @Description: 用户登入
         * @Param: username [type=string] 手机号
         * @Param: password [type=string] 密码
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-30 14:47:13
         */
        submit() {
            let params = {
                tellPhone: this.tellPhone,
                password: this.password
            };
            for (let k in params) {
                if (!params[k]) {
                    this.ruleInput(k);
                    return;
                }
            }
            this.ruletellphone(this.tellPhone);
            this.$toast("登入成功");
            setTimeout(() => {
                this.$toast.clear();
                this.$router.push({
                    name: "home"
                });
            }, 1500);

            return;

            loginApi
                .getLoginInfo({
                    username: this.tellPhone + "",
                    password: this.password + ""
                })
                .then(res => {
                    if (res.code == 20000) {
                        this.$toast(res.msg);
                        this.$router.push({
                            name: "home"
                        });
                    }
                });
        },

        //验证输入框是否为空
        ruleInput(val) {
            switch (val) {
                case "tellPhone":
                    this.$toast("手机号不能为空");
                    break;
                case "password":
                    this.$toast("密码不能为空");
                    break;
                case "tellPhoneIllegal":
                    this.$toast("手机号不合法");
                    break;
                default:
                    break;
            }
            setTimeout(() => {
                this.$toast.clear();
            }, 1500);
        },
        //验证手机号的合法性
        ruletellphone(val) {
            let Reg = /^[1][3,4,5,7,8][\d]{9}$/;
            if (!Reg.test(val)) {
                this.ruleInput("tellPhoneIllegal");
                return;
            }
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    .main-container {
        .login-info {
            margin-top: 80px;
            padding: 0 10px;
            > h1 {
                font-size: 26px;
                padding: 10px 0;
                margin-bottom: 20px;
                // text-shadow: 3px 3px 3px rgb(178, 180, 180);
            }
            .title-h5 {
                font-size: 16px;
                padding: 10px 0;
            }
            /deep/ .van-cell {
                background-color: #f2f2f2;
            }
            /deep/ .van-radio__label {
                font-size: 16px;
                color: #666;
            }
            .remember-password {
                height: 30px;
                display: flex;
                font-size: 16px;
                margin: 10px 0 10px 0;
                line-height: 30px;
            }
            .van-radio-group {
                margin-right: 5px;
            }
            .agreement {
                height: 30px;
                display: flex;
                font-size: 16px;
                margin-top: 10px;
                line-height: 30px;
            }
            .register {
                position: relative;
                right: -160px;
                color: #00f;
                opacity: 0.5;
            }
        }
    }
}
</style>

<!--
 * @Description: 用户注册
 * @Author: xwq
 * @Date: 2019-06-30 14:09:25
 -->
<template>
    <div class="page">
        <Vbackground />
        <div class="main-container">
            <div class="text-left">
                <span>{{title}}</span>
                <span @click="backLogin">登入>></span>
            </div>
            <div class="register-info border-radius">
                <van-cell-group>
                    <van-field
                        v-model="registerInfo.username"
                        clearable
                        type="number"
                        maxlength="11"
                        label="手机号"
                        placeholder="请输入11位手机号"
                        size="large"
                    />
                    <van-field
                        v-model="registerInfo.password"
                        type="password"
                        maxlength="20"
                        placeholder="请输入6-20位的密码"
                        clearable
                        size="large"
                    >
                        <span slot="label">密&nbsp;&nbsp;&nbsp;&nbsp;码</span>
                    </van-field>
                    <van-field
                        v-model="registerInfo.email"
                        type="email"
                        label="邮箱号"
                        placeholder="请输入邮箱号"
                        clearable
                        size="large"
                    />
                </van-cell-group>
                <div class="check-radio">
                    <h3>性&nbsp;&nbsp;&nbsp;&nbsp;别</h3>
                    <van-radio-group v-model="registerInfo.sex">
                        <van-radio name="男">男</van-radio>
                        <van-radio name="女">女</van-radio>
                    </van-radio-group>
                </div>
                <Vbutton @buttonHandle="submitRegister" buttonText="注册" />
            </div>
        </div>
    </div>
</template>
<script>
import background from "@/components/background";
import button from "@/components/button";
import { Field, RadioGroup, Radio } from "vant";
import createUserApi from "@/api/user/createUser";
export default {
    props: {},
    components: {
        [Field.name]: Field,
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio,
        Vbackground: background,
        Vbutton: button
    },
    data() {
        return {
            title: this.$route.meta.title,
            registerInfo: {
                username: "",
                password: "",
                sex: "",
                email: ""
            }
        };
    },
    created() {},
    mounted() {},
    methods: {
        /**
         * @Description:
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-30 15:22:39
         */

        submitRegister() {
            let registerInfo = this.registerInfo;
            for (let k in registerInfo) {
                if (!registerInfo[k]) {
                    this.ruleInput(k);
                    return;
                }
            }
            this.regTellphone(registerInfo.username);
            this.regEmail(registerInfo.email);

            createUserApi.createUser(this.registerInfo).then(res => {
                if (res.code == 20000) {
                    this.$toast(res.msg);
                    setTimeout(() => {
                        this.$toast.clear();
                        this.$router.push({
                            name: "login"
                        });
                    }, 2000);
                }
            });
        },
        /**
         * @Description: 返回登入页
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-30 16:32:32
         */

        backLogin() {
            this.$router.push({ name: "login" });
        },

        /**
         * @Description: 验证输入框是否为空
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-30 16:36:30
         */
        ruleInput(val) {
            switch (val) {
                case "username":
                    this.$toast("手机号不能为空");
                    break;
                case "password":
                    this.$toast("密码不能为空");
                    break;
                case "email":
                    this.$toast("邮箱号不能为空");
                    break;
                case "tellPhoneReg":
                    this.$toast("手机号不合法");
                    break;
                case "emailReg":
                    this.$toast("邮箱不合法");
                    break;
                default:
                    break;
            }
        },

        /**
         * @Description: 验证手机号的合法性
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-30 16:35:44
         */
        regTellphone(val) {
            let Reg = /^[1][3,4,5,7,8][\d]{9}$/;
            if (!Reg.test(val)) {
                this.ruleInput("tellPhoneReg");
                return;
            }
        },
        /**
         * @Description: 邮箱验证
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-30 16:44:03
         */

        regEmail(val) {
            let Reg = /^[a-z0-9][\w\-\.]{2,29}@[a-z0-9\-]{2,67}(\.[a-z\u2E80-\u9FFF]{2,6})+$/;
            if (!Reg.test(val)) {
                this.ruleInput("emailReg");
                return;
            }
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .main-container {
        .text-left {
            padding: 10px;
            margin: 20px 0 10px 0;
            display: flex;
            & > span {
                font-size: 20px;
                font-weight: bold;
                color: #1989fa;
                flex: 0.5;
                line-height: 29px;
            }
            span:last-child {
                text-align: right;
                font-size: 16px;
                opacity: 0.5;
            }
        }
        .register-info {
            background-color: #fff;
            padding: 10px 10px 30px 10px;
            .check-radio {
                display: flex;
                font-size: 16px;
                margin: 10px 0 50px 0;
                & > h3 {
                    flex: 0.6;
                    font-weight: normal;
                }
                .van-radio-group {
                    flex: 1;
                    display: flex;
                    .van-radio {
                        flex: 0.5;
                    }
                }
            }
            .back-login {
                font-size: 16px;
                padding: 10px;
                color: #1989fa;
                background-color: #f2f2f2;
            }
        }
    }
}
</style>

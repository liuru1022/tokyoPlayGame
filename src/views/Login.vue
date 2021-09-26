<template>
  <div class="login">
    <div class="loginbg">
      <div>
        <p>
          <router-link to="/">
            <van-icon name="arrow-left" />
            <span>返回</span>
          </router-link>
        </p>
        <img src="../assets/icon/logo.png" alt="" />
        <div class="buttons">
          <button class="home" @click="showLogin">登录</button>
          <button class="home" @click="showRegister">注册</button>
        </div>
      </div>
      <div>
        <van-popup
          closeable
          position="bottom"
          v-model="showlog"
          :style="{ height: '100vh' }"
          class="logincontent"
        >
          <div>
            <img src="../assets/icon/logo2.png" alt="" />
            <h2>登录您的帐号</h2>
            <div class="inputs">
              <div class="logicon">
                <div class="email">
                  <input
                    type="text"
                    v-model="logemail"
                    @blur="checkLogEmail"
                  /><span>邮箱</span>
                </div>
                <div>
                  <van-icon
                    name="checked"
                    v-show="loginemailtrue"
                    color="#11964d"
                  />
                  <van-icon
                    name="warning"
                    v-show="loginemailfalse.log"
                    color="#ffba00"
                  />
                </div>
              </div>
              <div class="logicon">
                <div class="password">
                  <input
                    type="password"
                    v-model="logpwd"
                    @blur="checkLogPwd"
                  /><span>密码</span>
                </div>
                <div>
                  <van-icon
                    name="checked"
                    v-show="loginpwdtrue"
                    color="#11964d"
                  />
                  <van-icon
                    name="warning"
                    v-show="loginpwdfalse.log"
                    color="#ffba00"
                  />
                </div>
              </div>
              <input type="button" @click="checkLogForm" value="登录" />
            </div>
            <div class="msg" :style="{ display: logmsgflag }">
              <van-icon name="warning" color="#ffba00" />
              <span>{{ logmsg }}</span>
            </div>
            <div class="otherlogin">
              <span>----- 其他登录方式 -----</span>
              <van-icon
                class="iconfont"
                class-prefix="icon"
                name="qq"
                size="50"
                style="margin-right: 2rem"
              />
              <van-icon
                class="iconfont"
                class-prefix="icon"
                name="weixin"
                size="50"
              />
            </div>
          </div>
        </van-popup>
        <van-popup
          closeable
          position="bottom"
          class="regcontent"
          v-model="showreg"
          :style="{ height: '100vh' }"
        >
          <div>
            <img src="../assets/icon/logo2.png" alt="" />
            <h2>注册新账户</h2>
            <div class="inputs">
              <div class="regicon">
                <input
                  type="text"
                  v-model="regname"
                  @blur="checkRegName"
                  placeholder="用户名(字母或汉字)"
                />
                <div>
                  <van-icon name="checked" v-show="nametrue" color="#11964d" />
                  <van-icon
                    name="warning"
                    v-show="namefalse.reg"
                    color="#ffba00"
                  />
                </div>
              </div>
              <div class="regicon">
                <input
                  type="text"
                  @blur="checkRegPhone"
                  v-model="regphone"
                  maxlength="11"
                  placeholder="手机号码"
                />
                <div>
                  <van-icon name="checked" v-show="phonetrue" color="#11964d" />
                  <van-icon
                    name="warning"
                    v-show="phonefalse.reg"
                    color="#ffba00"
                  />
                </div>
              </div>
              <div class="regicon">
                <input
                  type="email"
                  @blur="checkRegEmail"
                  v-model="regemail"
                  placeholder="电子邮箱"
                />
                <div>
                  <van-icon name="checked" v-show="emailtrue" color="#11964d" />
                  <van-icon
                    name="warning"
                    v-show="emailfalse.reg"
                    color="#ffba00"
                  />
                </div>
              </div>
              <div class="regicon">
                <input
                  type="password"
                  @blur="checkRegPwd"
                  v-model="regpwd"
                  maxlength="8"
                  placeholder="8位数字、密码组合"
                />
                <div>
                  <van-icon name="checked" v-show="pwdtrue" color="#11964d" />
                  <van-icon
                    name="warning"
                    v-show="pwdfalse.reg"
                    color="#ffba00"
                  />
                </div>
              </div>
              <input type="button" @click="checkRegFrom" value="马上注册" />
            </div>
            <div class="msg" :style="{ display: regmsgflag }">
              <van-icon name="warning" color="#ffba00" />
              <span>{{ regmsg }}</span>
            </div>
          </div>
        </van-popup>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showlog: false,
      showreg: false,
      nametrue: false,
      namefalse: {
        msg: "用户名格式输入错误",
        reg: false,
      },
      phonetrue: false,
      phonefalse: {
        msg: "电话格式输入错误",
        reg: false,
      },
      emailtrue: false,
      emailfalse: {
        msg: "邮箱格式输入错误",
        reg: false,
      },
      pwdtrue: false,
      pwdfalse: {
        msg: "密码格式输入错误",
        reg: false,
      },
      loginemailtrue: false,
      loginemailfalse: {
        msg: "邮箱格式输入错误",
        log: false,
      },
      loginpwdtrue: false,
      loginpwdfalse: {
        msg: "密码格式输入错误",
        log: false,
      },
      logemail: "",
      logpwd: "",
      logmsgflag: "none",
      logmsg: "",
      regname: "",
      regphone: "",
      regemail: "",
      regpwd: "",
      regmsgflag: "none",
      regmsg: "",
    };
  },
  methods: {
    showLogin() {
      this.showlog = true;
    },
    showRegister() {
      this.showreg = true;
    },
    checkLogEmail() {
      let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (reg.test(this.logemail)) {
        this.loginemailtrue = true;
        this.loginemailfalse.log = false;
        this.logmsgflag = "none";
        return true;
      } else {
        this.loginemailtrue = false;
        this.loginemailfalse.log = true;
        this.logmsgflag = "block";
        this.logmsg = this.loginemailfalse.msg;
        return false;
      }
    },
    checkLogPwd() {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8}$/;
      if (reg.test(this.logpwd)) {
        this.loginpwdtrue = true;
        this.loginpwdfalse.log = false;
        this.logmsgflag = "none";
        return true;
      } else {
        this.loginpwdtrue = false;
        this.loginpwdfalse.log = true;
        this.logmsgflag = "block";
        this.logmsg = this.loginpwdfalse.msg;
        return false;
      }
    },
    checkRegName() {
      let reg = /^([A-Za-z]|[\u4E00-\u9FA5]){1,12}$/;
      if (reg.test(this.regname)) {
        this.nametrue = true;
        this.namefalse.reg = false;
        this.regmsgflag = "none";
        return true;
      } else {
        this.nametrue = false;
        this.namefalse.reg = true;
        this.regmsgflag = "block";
        this.regmsg = this.namefalse.msg;
        return false;
      }
    },
    checkRegEmail() {
      let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (reg.test(this.regemail)) {
        this.emailtrue = true;
        this.emailfalse.reg = false;
        this.regmsgflag = "none";
        return true;
      } else {
        this.emailtrue = false;
        this.emailfalse.reg = true;
        this.regmsgflag = "block";
        this.regmsg = this.emailfalse.msg;
        return false;
      }
    },
    checkRegPhone() {
      let reg =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (reg.test(this.regphone)) {
        this.phonetrue = true;
        this.phonefalse.reg = false;
        this.regmsgflag = "none";
        return true;
      } else {
        this.phonetrue = false;
        this.phonefalse.reg = true;
        this.regmsgflag = "block";
        this.regmsg = this.phonefalse.msg;
        return false;
      }
    },
    checkRegPwd() {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8}$/;
      if (reg.test(this.regpwd)) {
        this.pwdtrue = true;
        this.pwdfalse.reg = false;
        this.regmsgflag = "none";
        return true;
      } else {
        this.pwdtrue = false;
        this.pwdfalse.reg = true;
        this.regmsgflag = "block";
        this.regmsg = this.pwdfalse.msg;
        return false;
      }
    },
    // 登录表单验证
    checkLogForm() {
      if (this.checkLogEmail() && this.checkLogPwd()) {
        console.log(`验证成功，发送登录请求`);
        this.axios
          .post("/log", `email=${this.logemail}&password=${this.logpwd}`)
          .then((res) => {
            if (res.data.code == 200) {
              this.$toast({
                message: "登录成功",
                position: "top",
                duration: 3000,
              });
              this.$store.commit(
                "loginOK",
                {
                  newPhoto:res.data.result.photo,
                  newName:res.data.result.name,
                  newUid:res.data.result.uid
                }
              );
              sessionStorage.setItem("islogin", true);
              sessionStorage.setItem("name", res.data.result.name);
              sessionStorage.setItem("photo", res.data.result.photo);
              sessionStorage.setItem("uid", res.data.result.uid);
              this.$router.push("/user");
            } else if (res.data.code == 201) {
              this.$toast({
                message: "登录失败，用户名或密码错误",
                position: "top",
                duration: 3000,
              });
              this.logemail = "";
              this.logpwd = "";
            }
          });
      }
    },
    // 注册表单验证
    checkRegFrom() {
      if (
        this.checkRegPwd() &&
        this.checkRegPhone() &&
        this.checkRegEmail() &&
        this.checkRegName()
      ) {
        console.log(`验证成功，发送注册请求`);
        this.axios
          .post(
            "/reg",
            `email=${this.regemail}&phone=${this.regphone}&pwd=${this.regpwd}&name=${this.regname}`
          )
          .then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$toast({
                message: "注册成功",
                position: "top",
                duration: 3000,
              });
              this.showlog = true;
              this.showreg = false;
            } else if (res.data.code == 201) {
              this.$toast({
                message: "该用户已存在",
                position: "top",
                duration: 3000,
              });
              this.regname = "";
              this.regphone = "";
              this.regemail = "";
              this.regpwd = "";
            } else if (res.data.code == 202) {
              this.$toast({
                message: "用户名已被使用",
                position: "top",
                duration: 3000,
              });
              this.regname = "";
              this.regphone = "";
              this.regemail = "";
              this.regpwd = "";
            }
          });
      }
    },
  },
  watch: {
    showlog: function () {
      if (!this.showlog) {
        this.logmsg = "";
        this.logmsgflag = "none";
        this.loginemailtrue = false;
        this.loginemailfalse.log = false;
        this.loginpwdtrue = false;
        this.loginpwdfalse.log = false;
        this.logemail = "";
        this.logpwd = "";
      }
    },
    showreg: function () {
      if (!this.showreg) {
        this.regmsg = "";
        this.regmsgflag = "none";
        this.emailtrue = false;
        this.emailfalse.reg = false;
        this.nametrue = false;
        this.namefalse.reg = false;
        this.phonetrue = false;
        this.phonefalse.reg = false;
        this.pwdtrue = false;
        this.pwdfalse.reg = false;
        this.regname = "";
        this.regphone = "";
        this.regemail = "";
        this.regpwd = "";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-image: url(/user/login1.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .loginbg {
    position: relative;
    width: 100%;
    height: 100%;
    background: #ae2b2b80;
    p {
      text-align: left;
      margin: 0;
      padding: 0.5rem 0.8rem;
      font-size: 1.2rem;
      /deep/ .van-icon {
        vertical-align: text-top;
      }
      a {
        color: #fff;
      }
    }
    img {
      width: 70%;
    }
    .buttons {
      width: 100%;
      position: absolute;
      bottom: 3rem;
      & > button:last-child {
        margin-top: 0.5rem;
      }
    }
  }
  .home {
    color: #fff;
    border: 1px solid #fff;
    width: 90%;
    height: 15vw;
    background-color: rgba(0, 0, 0, 0.3);
    font-size: 1.2rem;
    font-weight: 700;
    &:hover {
      background-color: #fff;
      color: #a9151f;
    }
  }
  .logincontent {
    background: #2e0303;
    & > div {
      color: #e4e4e5;
      position: relative;
      .msg {
        position: absolute;
        left: 50%;
        bottom: 22%;
        transform: translate(-50%);
      }
      img {
        width: 40%;
        margin-top: 2.5rem;
      }
      h2 {
        margin: 0.5rem;
        margin-bottom: 0.2rem;
        font-weight: 400;
        font-size: 20px;
      }
      input {
        height: 11vw;
        width: 80%;
        margin-top: 0.6rem;
        background-color: transparent;
        border: 1px solid #e4e4e5;
        border-radius: 2px;
        padding-left: 52px;
        box-sizing: border-box;
      }
      .email {
        & > span {
          position: absolute;
          top: 1.1rem;
          left: 3rem;
        }
      }
      .password {
        & > span {
          position: absolute;
          top: 1.1rem;
          left: 3rem;
        }
      }
      .logicon {
        position: relative;
        & > div:last-child {
          position: absolute;
          right: 3rem;
          bottom: 0.6rem;
        }
      }
      input:last-child {
        // #b51525
        padding-left: 0;
        background-color: #d44242;
        border: 1px solid #d44242;
        margin-top: 0.8rem;
        color: #fff;
        // font-size: 1.2rem;
        &:hover {
          background-color: #b03434;
          border: 1px solid #b03434;
        }
      }
      .otherlogin {
        span {
          display: block;
          margin: 3rem 0 1.2rem 0;
        }
      }
    }
  }
  .regcontent {
    background: #2e0303;
    & > div {
      color: #e4e4e5;
      img {
        width: 40%;
        margin-top: 2.5rem;
      }
      h2 {
        margin: 0.5rem;
        margin-bottom: 0.2rem;
        font-weight: 400;
        font-size: 20px;
      }
      input {
        height: 11vw;
        width: 80%;
        margin-top: 0.6rem;
        background-color: transparent;
        border: 1px solid #e4e4e5;
        border-radius: 2px;
        padding-left: 10px;
        box-sizing: border-box;
      }
      .inputs {
        position: relative;
      }
      input:last-child {
        padding-left: 0;
        background-color: #d44242;
        border: 1px solid #d44242;
        margin-top: 0.8rem;
        color: #fff;
        &:hover {
          background-color: #b03434;
          border: 1px solid #b03434;
        }
      }
      .msg {
        margin-top: 1rem;
        font-size: 0.88rem;
        color: #ffba00;
        i {
          vertical-align: middle;
        }
        span {
          margin-left: 0.5rem;
        }
      }
    }
    .regicon {
      position: relative;
      & > div {
        position: absolute;
        right: 50px;
        top: 22px;
      }
    }
  }
}
</style>
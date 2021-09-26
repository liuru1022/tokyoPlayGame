<template>
  <div>
    <MyHeader title="个人中心" :logoshow="false"></MyHeader>
    <div class="user">
      <div class="card">
        <div class="user_bg"></div>
        <div class="user_pho">
          <van-image width="30%" round :src="$store.state.photo" />
          <p>{{$store.state.username}}</p>
        </div>
        <div class="othercontrol">
          <van-cell-group>
            <van-cell is-link>
              <template #title>
                <van-icon
                  class="iconfont"
                  class-prefix="icon"
                  name="baifenhao"
                  size="16"
                />
                <span class="custom-title">提供新闻</span>
              </template>
            </van-cell>
            <van-cell is-link>
                <van-icon
                  class="iconfont"
                  class-prefix="icon"
                  name="tongzhi"
                  size="16"
                />
                <span class="custom-title">消息通知</span>
            </van-cell>
            <van-cell is-link>
                <van-icon
                  class="iconfont"
                  class-prefix="icon"
                  name="xieyi"
                  size="16"
                />
                <span class="custom-title">使用协议</span>
            </van-cell>
            <van-cell is-link>
                <van-icon
                  class="iconfont"
                  class-prefix="icon"
                  name="zhichi"
                  size="16"
                />
                <span class="custom-title">帮助支持</span>
            </van-cell>
            <van-cell @click="quitLogin">
                <van-icon
                  class="iconfont"
                  class-prefix="icon"
                  name="tuichu"
                  size="18"
                />
                <span class="custom-title" >退出登录</span>
            </van-cell>
          </van-cell-group>
        </div>
      </div>
    </div>
    <MyFooter />
  </div>
</template>
<script>
import MyHeader from "@/components/MyHeader.vue";
import MyFooter from "@/components/MyFooter.vue";
export default {
  components: {
    MyHeader,
    MyFooter,
  },
  methods: {
    quitLogin(){
      this.$store.commit('quitLogin')
      sessionStorage.removeItem('islogin')
      sessionStorage.removeItem('name')
      sessionStorage.removeItem('photo');
      this.$router.push('/login')
    }
  },
};
</script>
<style lang="scss" scoped>
.user {
  padding-top: 0.8rem;
  .custom-title {
    margin-left: 4px;
    vertical-align: bottom;
  }
  .card {
    margin: 0 1rem;
    background-color: #f5f6f6;
    box-shadow: 1px 1px 20px 5px #d8d6d6;
    border-radius: 0.5rem;
  }
  .user_bg {
    width: 100%;
    height: 53vw;
    background-image: url(/user/userbg.jpg);
    background-repeat: no-repeat;
    background-size: 100% auto;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }
  .user_pho {
    margin-top: -2.5rem;
    display: flex;
    // justify-content: center;
    margin-left: 8vw;
    p {
      margin: 3rem 0 0 1.5rem;
    }
  }
  .othercontrol {
    text-align: left;
    padding: 2rem 1rem;
    padding-bottom: 0.5rem;
  }
  /deep/ .van-cell {
    background-color: #f5f6f6;
  }
  /deep/ .van-cell::after {
    border: 1px solid #cdcbcb;
  }
}
</style>
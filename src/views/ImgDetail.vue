<template>
  <div class="imgdetail">
    <div class="detail_header">
      <div class="left">
        <router-link to="/imgnews">
          <van-icon name="arrow-left" size="20" color="#fff" />
        </router-link>
        <span>图片</span>
      </div>
      <div class="right">
        <van-icon name="comment-o" size="20" @click="showPopup" />
        <van-icon name="share-o" size="20" @click="showShare = true" />
      </div>
    </div>
    <div class="detail_con">
      <div class="imgshow">
        <div class="xlimg">
          <van-swipe
            @change="onChange"
            class="my-swipe"
            width="100%"
            :show-indicators="false"
          >
            <van-swipe-item v-for="(item, i) in imgs" :key="i">
              <img :src="item.imgurl" alt="" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="detail_info">
          <span>{{ current + 1 }}</span>
          <span>/{{ imgs.length }}</span>
          <h3>{{ imgarticle.title }}</h3>
          <p>
            {{ imgarticle.article }}
          </p>
        </div>
      </div>
    </div>
    <div class="detail_do">
      <van-popup
        position="right"
        v-model="show"
        class="remark"
        :style="{ height: '100vh' }"
      >
        <div>
          <van-nav-bar title="评论" left-arrow @click-left="onClickLeft" />
          <!--v-if="!$store.state.islogin||this.remarklist.length==0"  -->
          <div class="remark_con">
            <div
              class="noremark"
              :style="{ height: h }"
              v-if="!$store.state.islogin || this.remarklist.length == 0"
            >
              <img src="../assets/icon/pinglun_qiangshafa.png" alt="" />
            </div>
            <div
              class="hasremark"
              style="overflow: auto"
              :style="{ height: h }"
              v-else
            >
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="已加载全部评论"
                @load="onLoad"
                :immediate-check="false"
              >
                <div class="hasremarkcont" v-for="(item, i) in remarklist" :key="i">
                  <img :src="item.photo" alt="" />
                  <div>
                    <div class="name">
                      {{ item.name
                      }}<span>{{
                        moment.unix(item.time).format("MM-DD HH:mm")
                      }}</span>
                    </div>
                    <div class="conn">{{ item.content }}</div>
                  </div>
                </div>
              </van-list>
            </div>
            <div class="remark_footer">
              <p>
                <span>首页</span>&nbsp; <span>|</span>&nbsp;
                <span>视频新闻</span>
              </p>
              <p>
                <span>中央广播电视总台</span>&nbsp;&nbsp;&nbsp;
                <span>央视网</span>&nbsp;&nbsp;&nbsp;
                <span>版权所有</span>
              </p>
            </div>
          </div>
          <div class="remark_input">
            <div>
              <input v-model="remarkVal" type="text" placeholder="我来说两句" />
              <div class="shuru">
                <van-icon
                  class="iconfont"
                  class-prefix="icon"
                  name="shuru"
                  size="18"
                  @click="addRemark"
                />
              </div>
            </div>
          </div>
        </div>
      </van-popup>
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
        @select="onSelect"
        safe-area-inset-bottom
      />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      value: "",
      current: 0,
      show: false,
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
      ],
      h: "483px",
      imgarticle: {},
      imgs: [],
      remarklist: [],
      remarkVal: "",
      loading: false,
      finished: false,
      page: 1,
    };
  },
  computed: {
    ...mapState(["islogin", "uid"]),
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
    showPopup() {
      this.show = true;
    },
    onClickLeft() {
      this.show = false;
    },
    LoadImgRemark() {
      this.axios
        .get(`imgremark?id=${this.$route.query.imgid}&page=${this.page}`)
        .then((res) => {
          console.log(res);
          this.remarklist = res.data.results;
        });
    },
    addRemark() {
      if (this.islogin) {
        this.axios
          .post(
            "/addimgremark",
            `uid=${this.uid}&content=${this.remarkVal}&imgnid=${this.imgarticle.imgnid}`
          )
          .then((res) => {
            console.log(this.remarkVal);
            console.log(res);
            if (res.data.code == 200) {
              this.$toast({
                message: "评论成功",
              });
              this.remarkVal='';
              // this.reload();
              this.LoadImgRemark();
            }
          });
      } else {
        this.$toast({
          message: "登陆之后才能进行评论哦",
        });
      }
    },
    onLoad() {
      setTimeout(() => {
        this.page++;
        this.axios
          .get(`imgremark?id=${this.$route.query.imgid}&page=${this.page}`)
          .then((res) => {
            this.remarklist.push(...res.data.results);
            console.log(this.remarklist);
            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成
            if (this.remarklist.length >= res.data.rowcount) {
              this.finished = true;
            }
          });
      }, 2000);
    },
  },
  mounted() {
    let scrh = window.screen.height;
    this.h = scrh - 12 * 16 + "px";
    console.log(this.h);

    let id = this.$route.query.imgid;
    console.log(id);
    this.axios.get(`/imgarticle?id=${id}`).then((res) => {
      console.log(res);
      this.imgarticle = res.data.results;
      this.imgs = res.data.imgs;
    });
    this.LoadImgRemark();
  },
};
</script>
<style lang="scss" scoped>
.imgdetail {
  background: #111;
  height: 100vh;
}
.xlimg {
  height: 60vh;
  display: flex;
  align-items: flex-end;
  img {
    height: 50%;
    width: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
}
.detail_header {
  height: 2.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #101010;
  color: #fff;
  .left {
    margin-left: 0.5rem;
    span {
      margin-left: 0.5rem;
    }
    /deep/ .van-icon-arrow-left::before {
      vertical-align: middle;
    }
  }
  .right {
    margin-right: 0.6rem;
    /deep/ .van-icon-comment-o::before {
      margin-right: 0.6rem;
      vertical-align: middle;
    }
    /deep/ .van-icon-share-o::before {
      vertical-align: middle;
    }
  }
}
.detail_info {
  position: fixed;
  bottom: 1rem;
  color: #fff;
  text-align: left;
  padding: 0.5rem 0.6rem;
  & > span:first-child {
    color: #bf0614;
    font-size: 1.8rem;
  }
  h3 {
    font-weight: 400;
    margin: 0.5rem 0;
  }
  p {
    overflow: auto;
    height: 9vh;
    margin: 0;
  }
}
.detail_do {
  /deep/ .van-share-sheet__name {
    font-size: 0.88rem;
    color: #000;
  }
  /deep/ .van-share-sheet__cancel {
    color: #fff;
    background-color: #bf0614;
    width: 90%;
    margin: 0.6rem 1.2rem 1.2rem;
  }
  /deep/ .van-share-sheet__cancel::before {
    background: transparent;
    height: 0;
  }
  .remark {
    width: 100%;
    /deep/ .van-nav-bar {
      background-color: #343434;
    }
    /deep/ .van-icon-arrow-left::before {
      color: #fff;
      font-size: 1.4rem;
    }
    /deep/ .van-nav-bar__title {
      color: #fff;
      font-size: 1.2rem;
    }
    .remark_con {
      // height: 100vh;
      .noremark {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 70%;
        }
      }
      .hasremark {
        img {
          width: 12vw;
          height: 12vw;
          border-radius: 50%;
          margin-top: 0.2rem;
        }
        .hasremarkcont {
          padding-top: 0.8rem;
          display: flex;
          margin: 0 1rem;
          margin-bottom: 0;
          border-bottom: 1px solid #dfd9d9;
          & > div {
            text-align: left;
            margin-left: 0.8rem;
            .name {
              width: 75vw;
              display: flex;
              justify-content: space-between;
              align-items: center;
              color: #858585;
              span {
                font-size: 0.8rem;
                color: #858585;
              }
            }
            .conn {
              margin: 0.5rem 0;
            }
          }
        }
      }
      .remark_footer {
        height: 5rem;
        color: #dfdfdf;
        background-color: #444444;
        p {
          margin: 0;
        }
        & > p:first-child {
          font-size: 1.1rem;
          padding: 0.8rem 0;
        }
        & > p:last-child {
          font-size: 0.88rem;
        }
      }
    }
    .remark_input {
      height: 3.5rem;
      width: 100%;
      line-height: 3.5rem;
      background-color: #fff;
      & > div {
        position: relative;
      }
      input {
        width: 90%;
        height: 2.2rem;
        padding-left: 2.6rem;
        box-sizing: border-box;
        border: 1px solid #ba0511;
      }
      .shuru {
        position: absolute;
        left: 1.2rem;
        top: 0.65rem;
        width: 2.2rem;
        height: 2.2rem;
        background-color: #ba0511;
        line-height: 2.2rem;
      }
    }
  }
}
</style>
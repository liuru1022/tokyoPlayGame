<template>
  <div class="infodetail">
    <van-nav-bar title="资讯详情" left-arrow @click-left="onClickLeft" fixed>
      <template #right>
        <van-icon
          name="star-o"
          style="margin-right: 1rem"
          size="20"
          color="#757575"
          v-if="nohasliked"
          :id="article.infonid"
          @click="addLike($event)"
        />
        <van-icon
          name="star"
          style="margin-right: 1rem"
          size="20"
          v-else
          color="#db4f52"
          :id="article.infonid"
          @click="removeLike($event)"
        />
        <van-icon
          class="iconfont"
          class-prefix="icon"
          name="fenxiang"
          size="18"
          @click="showShare = true"
        />
      </template>
    </van-nav-bar>
    <div class="infodetail_con">
      <img :src="article.img" alt="" />
      <van-cell
        :title="article.title"
        size="large"
        :label="moment.unix(article.time).format('YYYY-MM-DD HH:mm')"
      />
      <div class="infodetail_article" v-html="article.article"></div>
    </div>
    <div class="detail_fenge"></div>
    <div class="inforemark">
      <p>
        精彩评论
        <span @click="jiazairemark">加载全部评论></span>
      </p>
      <div class="shuru">
        <input type="text" v-model="remarkcontent" placeholder="说点什么..." />
        <i @click="addinforemark"></i>
      </div>
      <div v-if="noremark">
        <img width="60%" src="../assets/icon/noremark.png" alt="" />
      </div>
      <div v-else class="remarklist" v-for="(item, i) in remarklist" :key="i">
        <img :src="item.photo" alt="" />
        <div>
          <div class="name">
            {{ item.name }}
          </div>
          <div class="conn">
            {{ item.content }}
          </div>
          <div class="huifu">
            <span>{{ moment.unix(item.time).format("MM-DD HH:mm") }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="detail_fenge"></div>
    <div class="conninfo">
      <p>相关</p>
      <van-swipe :loop="false" width="170" :show-indicators="false">
        <van-swipe-item v-for="(item, i) in connect" :key="i">
          <div
            class="conninfo_con"
            @click="connectinfoTo($event)"
            :id="item.infonid"
          >
            <img :src="item.img" alt="" />
            <span>{{ item.title }}</span>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="infodetail_do">
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
export default {
  data() {
    return {
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
      ],
      article: {},
      connect: [],
      remarklist: [],
      noremark: false,
      nohasliked: true,
      remarkcontent: "",
    };
  },
  computed: {
    ...mapState(["islogin", "uid"]),
  },
  methods: {
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    jiazairemark() {
      if (this.islogin) {
        if (this.remarklist.length == 0) {
          this.$toast({
            message: "暂无评论",
            // duration: 3000,
          });
        } else {
          if (this.$route.query.id) {
            this.axios
              .get(`/inforemarklist?infonid=${this.$route.query.id}`)
              .then((res) => {
                this.remarklist = res.data.results;
                if (this.remarklist.length >= res.data.rowcount) {
                  this.$toast({
                    message: "已加载全部评论",
                    // duration: 3000,
                  });
                }
              });
          }
        }
      } else {
        this.$router.push("/login");
      }
    },
    Loadinfoarticle() {
      if (this.$route.query.id) {
        this.axios
          .get(`/infoarticle?id=${this.$route.query.id}`)
          .then((res) => {
            console.log(res);
            this.article = res.data.article;
            this.connect = res.data.connect;
            this.remarklist = res.data.results;
            this.isliked();
            if (this.remarklist.length == 0) {
              this.noremark = true;
            } else {
              this.noremark = false;
            }
          });
      }
    },
    connectinfoTo(e) {
      var d = new Date();
      // console.log(e.target.id)
      // `/infodetail?id=${e.target.parentElement.id}`
      this.$router.push(`/infodetail?id=${e.target.parentElement.id}`);
    },
    addLike(e) {
      if (this.islogin) {
        if (e.target.id) {
          this.axios
            .post(`/addlike`, `uid=${this.uid}&infonid=${e.target.id}`)
            .then((res) => {
              if (res.data.code == 200) {
                this.$toast({
                  message: "收藏成功",
                });
                this.nohasliked = false;
              }
            });
        }
      } else {
        this.$toast({
          message: "先登录才能收藏哦",
        });
      }
    },
    isliked() {
      if (this.islogin) {
        if (this.article.infonid) {
          this.axios
            .get(`/isliked?uid=${this.uid}&infonid=${this.article.infonid}`)
            .then((res) => {
              if (res.data.code == 200) {
                // 不在收藏列表中
                this.nohasliked = true;
              } else if (res.data.code == 201) {
                this.nohasliked = false;
              }
            });
        }
      } else {
        this.nohasliked = true;
      }
    },
    removeLike(e) {
      if (this.islogin) {
        if (e.target.id) {
          this.axios
            .get(`/articleremovelike?uid=${this.uid}&infonid=${e.target.id}`)
            .then((res) => {
              if (res.data.code == 200) {
                this.$toast({
                  message: "取消收藏成功",
                });
                this.nohasliked = true;
              }
            });
        }
      } else {
        this.$toast({
          message: "先登录才能收藏哦",
        });
      }
    },
    addinforemark() {
      if (this.islogin) {
        if (this.$route.query.id) {
          this.axios
            .post(
              "/addinforemark",
              `uid=${this.uid}&content=${this.remarkcontent}&infonid=${this.$route.query.id}`
            )
            .then((res) => {
              if (res.data.code == 200) {
                this.$toast({
                  message: "评论成功",
                });
                this.remarkcontent = "";
                this.Loadinfoarticle();
              }
            });
        }
      } else {
        this.$toast({
          message: "登录之后才能进行评论哦",
        });
      }
    },
  },
  mounted() {
    this.Loadinfoarticle();
  },
  watch: {
    $route(to, from) {
      window.scrollTo(0, 0);
      this.Loadinfoarticle();
    },
  },
};
</script>
<style lang="scss">
.infodetail {
  .infodetail_con {
    margin: 0 0.8rem;
    margin-top: 2.8rem;
    text-align: left;
    img {
      width: 100%;
    }
    /deep/ .van-cell {
      padding: 0.75rem 0;
    }
    /deep/ .van-cell__title > span {
      font-weight: 700;
      font-size: 1.25rem;
    }
  }
  /deep/ .van-nav-bar .van-icon {
    color: #212121;
    font-size: 1.4rem;
  }
  .infodetail_do {
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
  }
  .detail_fenge {
    height: 0.5rem;
    background: #f1f1f1;
  }
  .inforemark {
    p {
      text-align: left;
      font-weight: 700;
      font-size: 1.15rem;
      margin: 0.8rem 0;
      margin-left: 1rem;
      span {
        font-size: 0.88rem;
        color: #16a1f1;
        font-weight: 400;
        float: right;
        margin-right: 1rem;
        text-decoration: underline;
      }
    }
    .shuru {
      position: relative;
      margin: 1rem 0;
      input {
        width: 90%;
        height: 10vw;
        border: transparent;
        background: #f5f5f5;
        border-radius: 5vw;
        padding-left: 10vw;
        box-sizing: border-box;
      }
      i {
        width: 7vw;
        height: 7vw;
        background-image: url(../assets/icon/share_inputEdit.png);
        background-size: 100% 100%;
        position: absolute;
        left: 7vw;
        top: 1.5vw;
      }
    }
    .remarklist {
      display: flex;
      margin: 0.8rem 1rem;
      img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        margin-top: 0.2rem;
      }
      & > div {
        text-align: left;
        margin-left: 0.8rem;
        .name {
          color: #858585;
        }
        .conn {
          margin: 0.5rem 0;
        }
        .huifu {
          margin-bottom: 0.5rem;
          span {
            font-size: 0.8rem;
            color: #858585;
          }
        }
      }
    }
  }
  .conninfo {
    margin: 0 0.8rem;
    /deep/ .van-swipe__track {
      margin-bottom: 1rem;
    }
    p {
      text-align: left;
      font-weight: 700;
      font-size: 1.15rem;
      margin: 0.6rem 0;
    }
    .conninfo_con {
      width: 10rem;
      display: flex;
      flex-direction: column;
      border: 1px solid #f5f6f1;
      background: #fffefb;
      img {
        width: 100%;
        height: 27vw;
      }
      span {
        height: 11.5vw;
        margin: 0.2rem 0;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        white-space: normal;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>
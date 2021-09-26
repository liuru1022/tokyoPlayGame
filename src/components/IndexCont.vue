<template>
  <div class="index_othercont">
    <van-swipe :loop="false" :width="240" :show-indicators="false">
      <van-swipe-item v-for="(item, i) in swipelist" :key="i">
        <div class="index_info">
          <img :src="item.img" alt="" :id="item.infonid" @click="toArticle($event)"/>
          <div>
            <p>
              <span :id="item.infonid" @click="toArticle($event)">{{ item.title }}</span>
              <van-icon name="like-o" size="18" />
            </p>
            <span>{{ moment.unix(item.time).format("MM-DD") }}</span>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="已加载全部资讯"
      @load="onLoad"
      :immediate-check="false"
    >
      <ul>
        <li v-for="(item, i) in infolist" :key="i">
          <i
            :style="`background-image:url(${item.img})`"
            :id="item.infonid"
            @click="toArticle($event)"
          ></i>
          <!-- <img :src="item.img" alt="" /> -->
          <div>
            <p :id="item.infonid" @click="toArticle($event)">
              {{ item.title }}
            </p>
            <span>{{ moment.unix(item.time).format("MM-DD") }}</span>
            <p :id="item.infonid" @click="toArticle($event)">
              {{ item.smallarticle }}
            </p>
          </div>
        </li>
      </ul>
    </van-list>
    <div class="nolist" v-show="nolistshow">
      <img src="../assets/icon/nolist.png" alt="" />
      <b>暂无资讯</b>
    </div>
  </div>
</template>
<script>
export default {
  props: ["gtid"],
  data() {
    return {
      page: 1,
      swipelist: [],
      infolist: [],
      loading: false,
      finished: false,
      nolistshow: true,
    };
  },
  methods: {
    LoadGameInfo(page = 1) {
      if (this.gtid) {
        this.axios
          .get(`/gameinfo?gtid=${this.gtid}&page=${page}`)
          .then((res) => {
            console.log(res);
            this.infolist = res.data.results;
            if (this.infolist.length == 0 && this.swipelist.length == 0) {
              this.nolistshow = true;
            } else {
              this.nolistshow = false;
            }
          });
      }
    },
    LoadGameInfoSwipe() {
      if (this.gtid) {
        this.axios.get(`/gameinfoswipe?gtid=${this.gtid}`).then((res) => {
          console.log(res);
          this.swipelist = res.data.results;
          if (this.infolist.length == 0 && this.swipelist.length == 0) {
            this.nolistshow = true;
          } else {
            this.nolistshow = false;
          }
        });
      }
    },
    onLoad() {
      if (this.infolist.length != 0) {
        setTimeout(() => {
          this.page++;
          this.axios
            .get(`/gameinfo?gtid=${this.gtid}&page=${this.page}`)
            .then((res) => {
              this.infolist.push(...res.data.results);
              console.log(this.infolist);
              // 加载状态结束
              this.loading = false;
              // 数据全部加载完成
              if (this.infolist.length >= res.data.rowcount) {
                this.finished = true;
              }
            });
        }, 2000);
      } else {
        this.loading = false;
      }
    },
    toArticle(e){
      this.$router.push(`/infodetail?id=${e.target.id}`)
    }
  },
  mounted() {
    this.LoadGameInfoSwipe();
    this.LoadGameInfo();
    if (this.infolist.length == 0 && this.swipelist.length == 0) {
      this.nolistshow = true;
    } else {
      this.nolistshow = false;
    }
  },
};
</script>
<style lang="scss" scoped>
.index_othercont {
  margin: 0 0.5rem;
  position: relative;
  .nolist {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 45%;
    img {
      width: 70%;
    }
    b {
      font-weight: 400;
      font-size: 1.2rem;
      color: #ffb8b8;
    }
  }
  /deep/ .van-swipe-item {
    padding: 0 0.4rem;
    box-sizing: border-box;
  }
  .index_info {
    img {
      width: 100%;
      border-radius: 0.5rem;
    }
    text-align: left;
    & > div {
      p {
        margin: 0;
        display: flex;
        justify-content: space-between;
        font-weight: 700;
        span {
          -webkit-line-clamp: 1;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          white-space: normal;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        /deep/ .van-icon-like-o::before {
          vertical-align: text-bottom;
        }
      }
      & > span {
        font-size: 0.8rem;
        color: #858585;
      }
    }
  }
  ul {
    margin: 0 0.6rem;
    margin-bottom: 1rem;
    li {
      display: flex;
      margin-top: 1rem;
      i {
        width: 100%;
        border-radius: 0.3rem;
        height: auto;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
      & > div {
        width: 130vw;
        text-align: left;
        margin-left: 0.5rem;
        & > p:first-child {
          margin: 0;
          font-weight: 700;
          -webkit-line-clamp: 1;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          white-space: normal;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        span {
          font-size: 0.8rem;
          color: #858585;
        }
        & > p:last-child {
          color: #858585;
          margin-bottom: 0;
          font-size: 0.88rem;
          -webkit-line-clamp: 3;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          white-space: normal;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
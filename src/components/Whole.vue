<template>
  <div class="whole">
    <van-swipe class="my-swipe" :autoplay="3000" :style="{ height: h }">
      <van-swipe-item v-for="(item, i) in swipelist" :key="i">
        <img :src="item.img" alt="" :id="item.url" @click="toArticle($event)" />
      </van-swipe-item>
    </van-swipe>
    <div class="medallist">
      <div class="huoju">
        <img src="../assets/icon/9760d0063f7b1af8dd6b45f2b1b797a0.png" alt="" />
        <span>奖牌榜</span>
      </div>
      <div>
        <ul class="medal medaltitle">
          <li>排名</li>
          <li>国家/地区</li>
          <li>
            <img
              src="../assets/icon/aec5a78d18e7dd650651bb2164c6b0f1.png"
              alt=""
            />
          </li>
          <li>
            <img
              src="../assets/icon/81aa79c261d9211749f1187cf3ff143f.png"
              alt=""
            />
          </li>
          <li>
            <img
              src="../assets/icon/b554700c0272a25b10e0c8f0117f6b37.png"
              alt=""
            />
          </li>
          <li>总计</li>
        </ul>
        <div class="medalcontent">
          <ul class="medal medalnum" v-for="(item, i) in medallist" :key="i">
            <li>
              <van-badge :content="item.rank" />
            </li>
            <li><img :src="item.countryimg" alt="" />{{ item.country }}</li>
            <li>{{ item.gold }}</li>
            <li>{{ item.silver }}</li>
            <li>{{ item.bronze }}</li>
            <li>{{ item.sum }}</li>
          </ul>
        </div>
      </div>
      <router-link to="/medallist">
        查看全部
        <van-badge content=">" color="#eee" style="color: #000" />
      </router-link>
    </div>
    <div class="cngoldmedal">
      <div class="huoju">
        <img src="../assets/icon/9760d0063f7b1af8dd6b45f2b1b797a0.png" alt="" />
        <span>中国金牌</span>
      </div>
      <van-swipe :loop="false" :width="100" :show-indicators="false">
        <van-swipe-item v-for="(item, i) in cngoldlist" :key="i">
          <div>
            <van-image
              round
              width="4.5rem"
              height="4.5rem"
              fit="cover"
              :src="item.img"
            />
            <span>第{{ item.cngmid }}枚</span>
            <i></i>
          </div>
          <p>{{ item.name }}</p>
          <span>{{ item.gametype }}</span>
        </van-swipe-item>
        <van-swipe-item style="width: 60px">
          <router-link to="/cngoldlist">
            查<br />
            看<br />
            全<br />
            部<br />
            <van-badge content=">" color="#eee" style="color: #000" />
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="videolist">
      <div class="huoju">
        <img src="../assets/icon/9760d0063f7b1af8dd6b45f2b1b797a0.png" alt="" />
        <span>视频</span>
      </div>
      <ul>
        <li v-for="(item, i) in videolist" :key="i">
          <div class="videomp4">
            <div
              v-show="videoplay != item.vnid"
              :id="item.vnid"
              class="videoimg"
            >
              <img :src="item.showimg" alt="" />
            </div>
            <van-icon
              name="play-circle-o"
              class="videoicon"
              size="30"
              color="#fff"
              @click="startplay($event)"
            />
            <video
              :src="item.videourl"
              preload="auto"
              :poster="item.showimg"
              v-show="videoplay == item.vnid"
              @loadedmetadata="getTime($event)"
              @click="closeOrOpen($event)"
              @timeupdate="getPlayingTime($event)"
            ></video>
            <span>01'30''</span>
          </div>
          <p>{{ item.title }}</p>
        </li>
      </ul>
      <router-link to="/videonews">
        查看全部
        <van-badge content=">" color="#eee" style="color: #000" />
      </router-link>
    </div>
    <div class="newsinfolist">
      <div class="huoju">
        <img src="../assets/icon/9760d0063f7b1af8dd6b45f2b1b797a0.png" alt="" />
        <span>资讯</span>
      </div>
      <div class="newsinfo">
        <ul>
          <li v-for="(item, i) in infolist" :key="i">
            <img
              :src="item.img"
              :id="item.infonid"
              alt=""
              @click="toArticle($event)"
            />
            <div>
              <p :id="item.infonid" @click="toArticle($event)">
                {{ item.title }}
              </p>
              <span>{{ moment.unix(item.time).fromNow() }}</span>
            </div>
          </li>
        </ul>
      </div>
      <router-link to="/info">
        查看全部
        <van-badge content=">" color="#eee" style="color: #000" />
      </router-link>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      value: "",
      h: "210px",
      swipelist: [], //保存轮播图列表
      medallist: [], //保存奖牌榜列表
      cngoldlist: [], //保存中国金牌列表
      videolist: [], //保存视频列表
      infolist: [], //保存资讯列表
      playingtime: 0,
      playtotaltime: 0,
      videoplay: 0,
    };
  },
  methods: {
    initSwipeHeight() {
      let picw = 1680;
      let pich = 630;
      let screenw = window.screen.width * 0.95;
      let swipeh = Math.floor((pich * screenw) / picw) + "px";
      this.h = swipeh;
    },
    toArticle(e) {
      this.$router.push(`/infodetail?id=${e.target.id}`);
    },
    startplay(e) {
      let videoid = parseInt(e.target.previousSibling.id);
      this.videoplay = videoid;
      let videolist = document.getElementsByTagName("video");
      for (const videoc of videolist) {
        videoc.currentTime = 0;
        videoc.previousSibling.style.display = "block";
        videoc.nextSibling.innerHTML = moment
          .unix(videoc.duration)
          .format("mm'ss''");
        videoc.pause();
      }
      if (this.videoplay == videoid) {
        e.target.style.display = "none";
        e.target.nextSibling.play();
      }
    },
    closeOrOpen(e) {
      if (this.playingtime < this.playtotaltime) {
        if (e.target.paused) {
          e.target.play();
          e.target.previousSibling.style.display = "none";
        } else {
          e.target.pause();
          e.target.previousSibling.style.display = "block";
        }
      }
    },
    getTime(e) {
      this.playtotaltime = e.target.duration;
      e.target.nextSibling.innerHTML = moment
        .unix(this.playtotaltime)
        .format("mm'ss''");
    },
    getPlayingTime(e) {
      this.playingtime = e.target.currentTime;
      if (!e.target.paused) {
        e.target.nextSibling.innerHTML = moment
          .unix(this.playingtime)
          .format("mm'ss''");
      }
      if (this.playingtime == e.target.duration) {
        this.videoplay = 0;
        e.target.previousSibling.style.display = "block";
      }
    },
  },
  mounted() {
    this.initSwipeHeight();
    this.axios.get("indexlist").then((res) => {
      console.log(res);
      this.swipelist = res.data.carousels;
      this.medallist = res.data.summedals;
      this.cngoldlist = res.data.cngolds;
      this.videolist = res.data.videos;
      this.infolist = res.data.infos;
    });
  },
};
</script>
<style lang="scss" scoped>
.whole {
  a {
    color: #2c3e50;
    margin-bottom: 0.5rem;
    display: inline-block;
  }
  .my-swipe .van-swipe-item {
    img {
      width: 95%;
      border-radius: 0.8rem;
    }
  }
  .huoju {
    text-align: left;
    margin-left: 0.8rem;
    margin-top: 1rem;
    margin-bottom: 0.6rem;
    img {
      width: 1.26rem;
      display: inline-block;
      margin-right: 0.3rem;
      vertical-align: text-bottom;
    }
    span {
      font-size: 1.05rem;
      color: #db4f50;
      position: relative;
      &::after {
        content: "";
        width: 0.4rem;
        height: 0.4rem;
        border-top: 0.12rem solid #db4f50;
        border-right: 0.12rem solid #db4f50;
        transform: rotate(45deg);
        position: absolute;
        top: 0.3rem;
      }
    }
  }
  .medallist {
    margin-bottom: 1.2rem;
    & > .router-link-active {
      color: #000;
    }
    .medalcontent {
      & > ul:first-child {
        color: #ff3333;
        & > li:first-child {
          /deep/ .van-badge {
            background-color: #ff3333;
          }
        }
      }
      & > ul:nth-child(2) {
        & > li:first-child {
          /deep/ .van-badge {
            background-color: #ff6600;
          }
        }
      }
      & > ul:nth-child(3) {
        & > li:first-child {
          /deep/ .van-badge {
            background-color: #faa90e;
          }
        }
      }
      & > ul:nth-child(n + 4) {
        & > li:first-child {
          /deep/ .van-badge {
            background-color: #eee;
            color: #000;
          }
        }
      }
    }
    .medal {
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 0.87rem;
      & > li {
        img {
          width: 1.5rem;
          vertical-align: text-bottom;
        }
      }
    }
    .medaltitle {
      color: #858585;
      & > li:nth-child(2) {
        width: 30%;
      }
    }
    .medalnum {
      margin: 0.8rem 0;
      /deep/ .van-badge {
        border-radius: 0.4rem;
        width: 1.2rem;
        height: 1.2rem;
        line-height: 1.2rem;
      }
      & > li:nth-child(2) {
        color: #333;
        width: 30%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        img {
          border: 1px solid #e7e6e6;
        }
      }
      & > li {
        img {
          margin-right: 0.5rem;
        }
      }
    }
  }
  .cngoldmedal {
    margin-bottom: 1rem;
    /deep/ .van-swipe {
      margin: 0 0.5rem;
    }
    /deep/ .van-image--round {
      border: 2px solid #e3a94b;
    }
    /deep/ .van-swipe__track {
      align-items: center;
    }
    /deep/ .van-swipe-item {
      & > p {
        margin: 0.8rem 0 0.3rem 0;
        font-size: 0.88rem;
      }
      & > span {
        font-size: 0.65rem;
        color: #858585;
        display: block;
        margin: 0 0.5rem;
      }
      & > div {
        position: relative;
        & > span {
          position: absolute;
          font-size: 0.85rem;
          z-index: 2;
          bottom: 0.1rem;
          left: 50%;
          transform: translate(-50%);
          width: 3rem;
          height: 1.3rem;
          color: #fff;
          line-height: 1.3rem;
          background: linear-gradient(to bottom, #f7c46a 0, #ecac47 100%);
        }
        i {
          width: 80%;
          height: 1rem;
          background-image: url(../assets/icon/jinpaijie.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          position: absolute;
          bottom: -0.02rem;
          left: 50%;
          transform: translate(-50%);
        }
      }
    }
  }
  .newsinfo {
    ul {
      margin: 0 1rem;
      li {
        margin: 1rem 0;
        list-style: none;
        display: flex;
        img {
          width: 33%;
          border-radius: 0.8rem;
          margin-right: 0.6rem;
        }
        & > div {
          text-align: left;
          p {
            margin: 0;
            margin-bottom: 0.5rem;
            color: #1f1f1f;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            white-space: normal;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          span {
            color: #858585;
            font-size: 0.88rem;
          }
        }
      }
    }
  }
  .videolist {
    ul {
      list-style: none;
      display: flex;
      margin: 0 0.6rem;
      flex-wrap: wrap;
      li {
        width: 50%;
        margin-bottom: 0.2rem;
        video {
          width: 95%;
          border-radius: 0.625rem;
        }
        .videoicon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .videoimg {
          img {
            width: 95%;
            border-radius: 0.625rem;
          }
        }
        div {
          position: relative;
          span {
            color: #fff;
            position: absolute;
            bottom: 0.6rem;
            right: 0.8rem;
            font-size: 0.8rem;
          }
        }
        p {
          margin: 0.2rem 0;
          font-size: 0.88rem;
          color: #1f1f1f;
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
}
</style>
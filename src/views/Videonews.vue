<template>
  <div>
    <MyHeader title="视频新闻" :logoshow="false"></MyHeader>
    <div class="videonews">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="已加载全部视频"
        @load="onLoad"
        :immediate-check="false"
      >
        <ul class="content">
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
                size="50"
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
      </van-list>
    </div>
    <MyFooter />
  </div>
</template>
<script>
import MyHeader from "@/components/MyHeader.vue";
import MyFooter from "@/components/MyFooter.vue";
import moment from "moment";
export default {
  data() {
    return {
      videoplay: 0,
      distance: 0,
      videolist: [],
      loading: false,
      finished: false,
      page: 1,
      playingtime: 0,
      playtotaltime: 0,
    };
  },
  components: {
    MyHeader,
    MyFooter,
  },
  methods: {
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
    getScrollTop() {
      console.log(11111111);
      let videos = document.getElementsByTagName("video");
      for (const video of videos) {
        if (!video.paused) {
          console.log(2222222222);
          let top = video.getBoundingClientRect().top;
          console.log(top);
          // this.distance = top;
          if (top < 40) {
            video.pause();
            this.videoplay = 0;
            video.previousSibling.style.display = "block";
            video.currentTime = 0;
            video.nextSibling.innerHTML = moment
              .unix(video.duration)
              .format("mm'ss''");
          }
        }
      }
    },
    onLoad() {
      setTimeout(() => {
        this.page++;
        this.axios.get(`/video?page=${this.page}`).then((res) => {
          this.videolist.push(...res.data.results);
          console.log(this.videolist);
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          if (this.videolist.length >= 25) {
            this.finished = true;
          }
        });
      }, 2000);
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
    window.addEventListener("scroll", this.getScrollTop, true);
    this.axios.get(`/video?page=${this.page}`).then((res) => {
      this.videolist = res.data.results;
      console.log(res.data.results);
    });
  },
  // watch:{
  //   distance:function(){
  //     console.log(distance);
  //   }
  // }
};
</script>
<style lang="scss" scoped>
.videonews {
  .content {
    list-style: none;
    display: flex;
    margin: 0 0.6rem;
    flex-wrap: wrap;
    margin-top: 3.4rem;
    li {
      margin-bottom: 0.2rem;
      margin-top: 0.6rem;
      .videomp4 {
        width: 100%;
        position: relative;
        .videoicon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .videoimg {
        position: relative;
        img {
          width: 95%;
          box-shadow: 0px 0px 16px 6px #a69a9a;
          border-radius: 0.625rem;
        }
      }
      video {
        width: 95%;
        border-radius: 0.625rem;
        box-shadow: 0px 0px 16px 6px #a69a9a;
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
        text-align: left;
        margin: 0.4rem 0.6rem;
        font-size: 1rem;
        // font-weight: 700;
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
</style>
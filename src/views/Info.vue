<template>
  <div>
    <MyHeader title="东京残奥会" :logoshow="true" />
    <div class="newsinfo">
      <div class="newsinfo_bg">
        <div></div>
      </div>
      <div class="newsinfo_cont">
        <van-tabs v-model="activeName" scrollspy sticky>
          <van-tab title="闭幕式" name="end">
            <h2>闭幕式</h2>
            <van-grid direction="horizontal" :column-num="1">
              <van-grid-item v-for="(item, i) in endlist" :key="i" :id="item.infonid" @click="toInfoArticle($event)">
                <!-- <router-link :to="`/infoarticle?id=${item.infonid}`"> -->
                  <div class="time">
                    <div class="content">
                      {{ item.title }}
                    </div>
                    <span>{{
                      moment.unix(item.time).format("YYYY年MM月DD日 HH:mm")
                    }}</span>
                  </div>
                  <van-image
                    width="30%"
                    height="20vw"
                    radius="10"
                    :src="item.img"
                  />
                <!-- </router-link> -->
              </van-grid-item>
              <div
                class="more"
                @click="endmore"
                v-show="endflag"
                style="width: 100%; text-align: center"
              >
                查看更多<van-icon name="arrow-down" />
              </div>
            </van-grid>
          </van-tab>
          <van-tab title="热点新闻" name="hotnews">
            <h2>热点新闻</h2>
            <van-grid direction="horizontal" :column-num="1">
              <van-grid-item
                v-for="(item, i) in hotlist"
                :key="i"
                :id="item.infonid"
                @click="toInfoArticle($event)"
              >
                <div class="time">
                  <div class="content">
                    {{ item.title }}
                  </div>
                  <span>{{
                    moment.unix(item.time).format("YYYY年MM月DD日 HH:mm")
                  }}</span>
                </div>
                <van-image
                  width="30%"
                  height="20vw"
                  radius="10"
                  :src="item.img"
                />
              </van-grid-item>
              <div
                class="more"
                @click="hotmore"
                v-show="hotflag"
                style="width: 100%; text-align: center"
              >
                查看更多<van-icon name="arrow-down" />
              </div>
            </van-grid>
          </van-tab>
          <van-tab title="赛场风云" name="concert">
            <h2>赛场风云</h2>
            <van-grid direction="horizontal" :column-num="1">
              <van-grid-item
                v-for="(item, i) in gamelist"
                :key="i"
                :id="item.infonid"
                @click="toInfoArticle($event)"
              >
                <div class="time">
                  <div class="content">
                    {{ item.title }}
                  </div>
                  <span>{{
                    moment.unix(item.time).format("YYYY年MM月DD日 HH:mm")
                  }}</span>
                </div>
                <van-image
                  width="30%"
                  height="20vw"
                  radius="10"
                  :src="item.img"
                />
              </van-grid-item>
              <div
                class="more"
                @click="gamemore"
                v-show="gameflag"
                style="width: 100%; text-align: center"
              >
                查看更多<van-icon name="arrow-down" />
              </div>
            </van-grid>
          </van-tab>
          <van-tab title="媒体聚焦" name="mediafocus">
            <h2>媒体聚焦</h2>
            <van-grid direction="horizontal" :column-num="1">
              <van-grid-item
                v-for="(item, i) in medialist"
                :key="i"
                :id="item.infonid"
                @click="toInfoArticle($event)"
              >
                <div class="time">
                  <div class="content">
                    {{ item.title }}
                  </div>
                  <span>{{
                    moment.unix(item.time).format("YYYY年MM月DD日 HH:mm")
                  }}</span>
                </div>
                <van-image
                  width="30%"
                  height="20vw"
                  radius="10"
                  :src="item.img"
                />
              </van-grid-item>
              <div
                class="more"
                @click="mediamore"
                v-show="mediaflag"
                style="width: 100%; text-align: center"
              >
                查看更多<van-icon name="arrow-down" />
              </div>
              <div
                v-show="!mediaflag"
                style="
                  text-align: center;
                  width: 100%;
                  font-size: 0.88rem;
                  margin: 1rem 0;
                  color: #2c3e50;
                "
              >
                没有更多内容了
              </div>
            </van-grid>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import MyHeader from "@/components/MyHeader.vue";
export default {
  data() {
    return {
      activeName: "end",
      medialist: [], //保存媒体聚焦列表
      mediapage: 1,
      mediaflag: true,
      gamelist: [], //保存赛场风云列表
      gamepage: 1,
      gameflag: true,
      hotlist: [], //保存热点新闻列表
      hotpage: 1,
      hotflag: true,
      endlist: [], //保存闭幕式列表
      endpage: 1,
      endflag: true,
    };
  },
  components: {
    MyHeader,
  },
  mounted() {
    this.loadInfoList(6, "mediafocus", this.mediapage, (meidalist) => {
      this.medialist = meidalist;
    });
    this.loadInfoList(5, "bimushi", this.endpage, (endlist) => {
      this.endlist = endlist;
    });
    this.loadInfoList(5, "hotnews", this.hotpage, (hotlist) => {
      this.hotlist = hotlist;
    });
    this.loadInfoList(5, "gamefengyun", this.gamepage, (gamelist) => {
      this.gamelist = gamelist;
    });
  },
  methods: {
    mediamore() {
      this.mediapage++;
      this.loadInfoList(6, "mediafocus", this.mediapage, (meidalist) => {
        this.medialist.push(...meidalist);
        if (this.medialist.length >= 18) {
          this.mediaflag = false;
        }
      });
    },
    hotmore() {
      this.hotpage++;
      this.loadInfoList(5, "hotnews", this.mediapage, (hotlist) => {
        this.hotlist.push(...hotlist);
        if (this.hotlist.length >= 15) {
          this.hotflag = false;
        }
      });
    },
    gamemore() {
      this.gamepage++;
      this.loadInfoList(5, "gamefengyun", this.gamepage, (gamelist) => {
        this.gamelist.push(...gamelist);
        if (this.gamelist.length >= 15) {
          this.gameflag = false;
        }
      });
    },
    endmore() {
      this.endpage++;
      this.loadInfoList(5, "bimushi", this.endpage, (endlist) => {
        this.endlist.push(...endlist);
        if (this.endlist.length >= 15) {
          this.endflag = false;
        }
      });
    },
    loadInfoList(pagesize, newstype, page, callback) {
      this.axios
        .get(`/infos?pagesize=${pagesize}&newstype=${newstype}&page=${page}`)
        .then((res) => {
          callback(res.data.results);
        });
    },
    toInfoArticle(e){
      let infoid=e.target.parentElement.parentElement.parentElement.id;
      this.$router.push(`/infodetail?id=${infoid}`)
    }
  },
};
</script>
<style lang="scss" scoped>
.newsinfo {
  .newsinfo_bg {
    width: 100%;
    height: 43vw;
    background-image: url(/newsinfo/newsinfobg.png);
    background-size: 100% auto;
    background-repeat: no-repeat;
    position: relative;
    div {
      height: 4vw;
      width: 100%;
      background-color: #fff;
      position: absolute;
      bottom: 0;
      border-top-left-radius: 1.8rem;
      border-top-right-radius: 1.8rem;
    }
  }
  .newsinfo_cont {
    text-align: left;
    h2 {
      margin: 0;
      padding: 1rem 0 0 1.2rem;
    }
    /deep/ [class*="van-hairline"]::after {
      border-top: transparent;
      border-left: transparent;
      border-right: transparent;
    }
    /deep/ .van-grid-item__content--center {
      -webkit-align-items: flex-start;
      align-items: flex-start;
      margin: 0 0.6rem;
    }
    .content {
      margin-right: 0.5rem;
      width: 65%;
      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      white-space: normal;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    a{
      // width: 100vw;
    }
    .time {
      width: 65%;
      height: 100%;
      position: relative;
      & > div {
        width: 100%;
      }
      & > span {
        position: absolute;
        font-size: 0.5rem;
        color: #858585;
        bottom: 0;
      }
    }
    .more {
      width: 100%;
      text-align: center;
      margin-top: 0.5rem;
      color: #858585;
      font-size: 0.84rem;
      margin-bottom: 1rem;
      /deep/ .van-icon {
        vertical-align: text-top;
      }
    }
  }
}
</style>
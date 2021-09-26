<template>
  <div class="myheader">
    <van-nav-bar fixed safe-area-inset-top border>
      <template #right>
        <van-icon
          class="iconfont"
          class-prefix="icon"
          name="sousuo"
          size="18"
          @click="showPopupSearch"
        />
      </template>
      <template #title>
        <div>
          <img
            src="../assets/icon/394519905091cad429386ed5db009013.png"
            alt=""
            style="width: 1.2rem; vertical-align: bottom"
            v-show="logoshow"
          />&nbsp;{{ title }}
        </div>
      </template>
      <template #left>
        <van-icon
          class="iconfont"
          class-prefix="icon"
          name="liebiao"
          size="18"
          @click="showPopup"
        />
      </template>
    </van-nav-bar>
    <van-popup
      v-model="show"
      position="left"
      safe-area-inset-bottom
      :style="{ height: '100%', width: '40%' }"
    >
      <div class="popuptitle">东京残奥会</div>
      <div class="popupgrid">
        <router-link to="/">
          <img
            src="../assets/icon/394519905091cad429386ed5db009013.png"
            alt=""
          />
        </router-link>
        <ul>
          <li>
            <router-link to="/medallist">
              <img
                src="../assets/icon/6388b0f5108b17faf6071866eb1fe39f.png"
                alt=""
              />
              <p>奖牌榜</p>
            </router-link>
          </li>
          <li>
            <router-link to="/cngoldlist">
              <img
                src="../assets/icon/0bf6927030cd2b8f1d92ca1428b48bd0.png"
                alt=""
              />
              <p>中国金牌</p>
            </router-link>
          </li>
          <li>
            <router-link to="/info">
              <img
                src="../assets/icon/b8ac42605107fb4f75d899b1f292e324.png"
                alt=""
              />
              <p>残奥资讯</p>
            </router-link>
          </li>
          <li>
            <router-link to="/imgnews">
              <img
                src="../assets/icon/ae22318f312d5ce89a54224e17f699c7.png"
                alt=""
              />
              <p>残奥画报</p>
            </router-link>
          </li>
        </ul>
      </div>
    </van-popup>
    <van-popup v-model="showsearch" position="top" :style="{ height: '100vh' }">
      <van-search
        v-model="value"
        shape="round"
        background="#db4f52"
        placeholder="请输入搜索关键词"
        show-action
      >
        <template #left-icon>
          <van-icon
            class="iconfont"
            class-prefix="icon"
            name="sousuo"
            size="18"
            @click="searchInfo"
          />
        </template>
        <template #action>
          <div class="quitsearch" @click="showPopupSearch">取消</div>
        </template>
      </van-search>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="已加载全部结果"
        @load="onLoad"
        :immediate-check="false"
      >
        <ul>
          <li class="info" v-for="(item, index) in infolist" :key="index">
            <img :src="item.img" alt="" :id="item.infonid" @click="toArticle($event)" />
            <div>
              <p :id="item.infonid" @click="toArticle($event)">{{ item.title }}</p>
            </div>
          </li>
        </ul>
      </van-list>
      <div class="noresults" v-show="noresultsshow">
        <img src="../assets/icon/nosearch.png" alt="">
        <b>什么也没搜到</b>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  props: ["title", "logoshow"],
  data() {
    return {
      show: false,
      showsearch: false,
      value: "",
      page: 1,
      infolist: [],
      loading: false,
      finished: false,
      noresultsshow:false,
    };
  },
  methods: {
    showPopup() {
      if (this.show) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
    showPopupSearch() {
      this.infolist = [];
      this.value = "";
      if (this.showsearch) {
        this.showsearch = false;
      } else {
        this.showsearch = true;
      }
    },
    searchInfo() {
      this.axios
        .get(`/searchinfo?page=${this.page}&value=${this.value}`)
        .then((res) => {
          this.infolist = res.data.results;
          if (res.data.results.length==0) {
            this.noresultsshow=true;
          }else{
            this.noresultsshow=false;
          }
        });
    },
    onLoad() {
      if (this.infolist.length != 0) {
        setTimeout(() => {
          this.page++;
          this.axios
            .get(`/searchinfo?page=${this.page}&value=${this.value}`)
            .then((res) => {
              res.data.rowcount;
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
        this.finished = true;
      }
    },
    toArticle(e){
      this.$router.push(`/infodetail?id=${e.target.id}`)
    }
  },
  watch: {
    // 监听地址栏路由变化设定侧边导航栏为关闭状态
    $route: function () {
      this.show = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.myheader {
  margin-bottom: 2.8rem;
  .popuptitle {
    height: 3rem;
    width: 100.5%;
    background-color: #db4f50;
    color: #fff;
    line-height: 3rem;
    text-align: center;
  }
  .popupgrid {
    img {
      margin-top: 0.5rem;
      width: 50%;
    }
    ul > li {
      margin: 1rem 0;
      p {
        margin: 0;
        font-size: 0.88rem;
        color: #626675;
      }
      img {
        width: 25%;
      }
    }
  }
  .quitsearch {
    color: #fff;
    font-size: 1rem;
  }
  /deep/ .van-search__action {
    background: #db4f50;
  }
  .info {
    text-align: left;
    display: flex;
    margin: 1rem;
    font-size: 0.88rem;
    p {
      margin: 0;
      color: #1f1f1f;
      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      white-space: normal;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    img {
      width: 33%;
      border-radius: 0.3rem;
      margin-right: 0.6rem;
    }
  }
  .noresults {
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
      color: #f4b1b0;
      margin-top: -8%;
    }
  }
}
</style>
<template>
  <div>
    <MyHeader  title="东京残奥会" :logoshow="true"/>
    <div class="medallist">
      <div class="titlebg" v-if="disflag">
        <div class="title">
          <h2>2020东京残奥会奖牌榜</h2>
          <p v-show="disflag">2021.8.24-2021.9.5</p>
        </div>
      </div>
      <van-sticky offset-top="2.8rem" v-else>
        <div class="titlebg-scroll">
          <h2>2020东京残奥会奖牌榜</h2>
        </div>
      </van-sticky>
      <van-sticky offset-top="5.8rem" id="medaltop">
        <div class="medaltitlebg">
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
        </div>
      </van-sticky>
      <div class="medalcontent">
        <ul class="medal medalnum" v-for="(item,i ) in medallist" :key="i">
          <li>
            <van-badge :content="item.rank" />
          </li>
          <li>
            <img :src="item.countryimg" alt="" />{{item.country}}
          </li>
          <li>{{item.gold}}</li>
          <li>{{item.silver}}</li>
          <li>{{item.bronze}}</li>
          <li>{{item.sum}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import MyHeader from "@/components/MyHeader.vue";
export default {
  data() {
    return {
      disflag: true,
      distance: 0,
      medallist:[],//保存列表
    };
  },
  components: {
    MyHeader,
  },
  methods: {
    getScrollTop() {
      if (document.getElementById("medaltop")) {
        let top = document
          .getElementById("medaltop")
          .getBoundingClientRect().top;
        this.distance = top;
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.getScrollTop, true);
    this.axios.get('medal').then(res=>{
      console.log(res);
      this.medallist = res.data.results;
    })
  },
  watch: {
    distance: function () {
      if (this.distance > 90) {
        this.disflag = true;
      } else {
        this.disflag = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.medallist {
  .titlebg-scroll {
    background: #db4f50;
    color: #fff;
    height: 3rem;
    h2 {
      margin: 0;
      line-height: 3rem;
      font-size: 1.2rem;
    }
  }
  .titlebg {
    width: 100%;
    height: 35vw;
    background-image: url(../assets/2020canao_pc.jpg);
    background-size: 100% auto;
    display: flex;
    align-items: center;
    .title {
      text-align: left;
      color: #fff;
      margin: 0 1rem;
      font-weight: 400;
      h2 {
        margin: 0.4rem 0;
      }
      p {
        margin: 0.4rem 0;
        font-size: 0.88rem;
      }
    }
  }
  .medalcontent {
    padding: 0 0.6rem;
    padding-bottom: 0.6rem;
    background: #f6f6f6;
    & > ul:first-child {
      color: #ff3333;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
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
    & > ul:last-child {
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }
  }
  .medal {
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 0.87rem;
    & > li {
      &:first-child{
        width: 10%;
      }
      &:nth-child(2) {
        width: 35%;
      }
      &:nth-child(n+3){
        width: 6%;
        text-align: center;
      }
      &:last-child{
        width: 10%;
      }
      img {
        width: 1.5rem;
        vertical-align: text-bottom;
      }
    }
  }
  .medaltitle {
    color: #858585;
    height: 2.8rem;
    background: #f6f6f6;
  }
  .medalnum {
    background: #fff;
    height: 2.4rem;
    /deep/ .van-badge {
      border-radius: 0.4rem;
      width: 1.2rem;
      height: 1.2rem;
      line-height: 1.2rem;
    }
    & > li:nth-child(2) {
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      img{
        border: 1px solid #e7e6e6;
      }
    }
    & > li {
      img {
        margin-right: 0.5rem;
      }
    }
  }
  .medaltitlebg {
    padding: 0 0.5rem;
    background-color: #f6f6f6;
  }
  // /deep/ .van-sticky--fixed{
  //   top:2.8rem;
  // }
}
</style>
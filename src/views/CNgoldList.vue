<template>
  <div>
    <MyHeader  title="东京残奥会" :logoshow="true"/>
    <div class="cngoldlist">
      <div class="cngtitle" v-if="disflag">
        <div>
          <h2>中国金牌</h2>
          <p>截至目前共96枚</p>
        </div>
      </div>
      <van-sticky offset-top="2.8rem" v-else>
        <div class="titlebg-scroll">
          <h2>中国金牌</h2>
        </div>
      </van-sticky>
      <div class="cngcontent" id="medaltop">
        <ul>
          <li v-for="(item,i) in cngoldlist" :key="i">
            <div class="cngname">
              <van-image
                round
                width="3.6rem"
                height="3.6rem"
                fit="cover"
                :src="item.img"
              />
              <span>第{{item.cngmid}}枚</span>
              <i></i>
              <div class="cnginfo">
                <p>{{item.name}}</p>
                <span>{{item.gametype}}</span>
              </div>
            </div>
            <div class="cngnum">
              <p>第{{item.cngmid}}枚</p>
              <span>{{item.time}}</span>
            </div>
          </li>
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
      cngoldlist:[],//保存中国金牌数据列表
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
    this.axios.get('cngold').then(res=>{
      console.log(res);
      this.cngoldlist = res.data.results;
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
.cngoldlist {
  .cngtitle {
    color: #fff;
    height: 30vw;
    background-color: #bc2a16;
    background-image: url(../assets/679477b04babb82c0d477f5964c8510c.png);
    background-size: 100% auto;
    text-align: left;
    padding-left: 2rem;
    display: flex;
    align-items: center;
    h2 {
      margin: 0;
      font-weight: 400;
    }
    p {
      font-size: 0.14rem;
    }
  }
  .titlebg-scroll {
    background: #bc2a16;
    color: #fff;
    height: 3rem;
    h2 {
      margin: 0;
      line-height: 3rem;
      font-size: 1.2rem;
      font-weight: 400;
    }
  }
  .cngcontent {
    ul {
      li {
        margin: 0 1rem;
        border-bottom: 1px solid #e7e7e7;
        padding: 0.88rem 0;
        .cngnum {
          text-align: right;
        }
        .cngname {
          display: flex;
          position: relative;
          align-items: center;
          /deep/ .van-image--round {
            border: 2px solid #e3a94b;
          }
          & > span {
            position: absolute;
            font-size: 0.5rem;
            bottom: 0;
            left: 0.65rem;
            text-align: center;
            width: 2.5rem;
            color: #fff;
            background: linear-gradient(to bottom, #f7c46a 0, #ecac47 100%);
          }
          i {
            width: 4rem;
            z-index: -1;
            height: 0.9rem;
            background-image: url(../assets/icon/jinpaijie.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            position: absolute;
            bottom: -0.2rem;
            left: -0.1rem;
          }
          .cnginfo {
            margin-left: 0.8rem;
          }
        }
        p {
          margin: 0.4rem 0;
        }
        span {
          font-size: 0.88rem;
          color: #858585;
        }
        img {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
        }
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: left;
      }
    }
  }
}
</style>
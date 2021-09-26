<template>
  <div>
    <MyHeader  title="东京残奥会" :logoshow="true"/>
    <div class="imgnews">
      <div class="imgnews_bg">
        <img src="/画报/imgnewsbg.jpg" alt="" />
      </div>
      <div class="imgnews_cont">
        <div class="imgnews_title">
          <span>东京残奥画报</span>
        </div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多内容了" @load="onLoad" :immediate-check="false">
        <van-grid :column-num="2" :gutter="5">
          <van-grid-item v-for="(item,i) in imglist" :key="i">
            <router-link :to="`/imgdetail?imgid=${item.imgnid}`">
              <van-image :src="item.showimg" />
              <div class="imgnews_info">
                {{item.title}}
              </div>            
            </router-link>
          </van-grid-item>
        </van-grid>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import MyHeader from "@/components/MyHeader.vue";
export default {
  components: {
    MyHeader,
  },
  data() {
    return {
      imglist:[],//保存当前页面的画报列表
      loading:false,
      finished:false,
      page:1,
    }
  },
  methods: {
    onLoad(){
      setTimeout(()=>{
        this.page++;
        this.axios.get(`/imglist?page=${this.page}`).then(res=>{
          this.imglist.push(...res.data.results);
          console.log(this.imglist);
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          if (this.imglist.length >= 44) {
            this.finished = true;
          }
        })        
      },3000)
    },
  },
  mounted() {
    this.axios.get(`/imglist?page=${this.page}`).then(res=>{
      this.imglist = res.data.results;
    })
  },
};
</script>
<style lang="scss" scoped>
.imgnews {
  a{
    color: #2c3e50;
  }
  padding-bottom: 0.5rem;
  background: #d11515;
  .imgnews_bg {
    img {
      width: 100%;
    }
  }
  .imgnews_cont {
    padding: 0.5rem 0;
    margin: 0.5rem 0.8rem;
    // height: 100vw;
    background-color: #f4e1ca;
    border-radius: 0.5rem;
    font-size: 0.5rem;
    .imgnews_title {
      height: 2rem;
      line-height: 2rem;
      background: url(/画报/imgnews_title.png) no-repeat left center #fef9f2;
      margin: 0 0.5rem;
      margin-bottom: 0.5rem;
      text-align: left;
      span {
        padding-left: 4.4rem;
        font-size: 0.88rem;
      }
    }
    .imgnews_info {
      margin-top: 0.5rem;
    }
    /deep/ .van-grid-item__content {
      background: #f4e1ca;
      padding: 0.3rem 0.5rem;
    }
    /deep/ [class*="van-hairline"]::after {
      border-color: #f4e1ca;
    }
    /deep/ .van-grid-item__content::after{
      z-index: 0;
    }
  }
}
</style>
<template>
  <div>
    <MyHeader title="东京残奥会" :logoshow="true" />
    <div class="indexcontent">
      <van-tabs type="card" animated swipeable>
        <van-tab title="总览" title-class="tab1">
          <Whole />
        </van-tab>
        <van-tab :title="item.name" :title-class="`tab${item.gtid+1}`" v-for="(item,i) in category" :key="i">
          <IndexCont :gtid="item.gtid"/>
        </van-tab>
        <!-- <van-tab title="羽毛球" title-class="tab3"><IndexCont/></van-tab>
        <van-tab title="轮椅篮球" title-class="tab4"><IndexCont/></van-tab>
        <van-tab title="坐式排球" title-class="tab5"><IndexCont/></van-tab>
        <van-tab title="轮椅网球" title-class="tab6"><IndexCont/></van-tab>
        <van-tab title="五人制盲人足球" title-class="tab7"
          ><IndexCont/></van-tab
        >
        <van-tab title="盲人门球" title-class="tab8"><IndexCont/></van-tab>
        <van-tab title="轮椅橄榄球" title-class="tab9"><IndexCont/></van-tab>
        <van-tab title="硬地滚球" title-class="tab10"><IndexCont/></van-tab>
        <van-tab title="田径" title-class="tab11"><IndexCont/></van-tab>
        <van-tab title="铁人三项" title-class="tab12"><IndexCont/></van-tab>
        <van-tab title="游泳" title-class="tab13"><IndexCont/></van-tab>
        <van-tab title="公路自行车" title-class="tab14"><IndexCont/></van-tab>
        <van-tab title="场地自行车" title-class="tab15"><IndexCont/></van-tab>
        <van-tab title="射箭" title-class="tab16"><IndexCont/></van-tab>
        <van-tab title="射击" title-class="tab17"><IndexCont/></van-tab>
        <van-tab title="赛艇" title-class="tab18"><IndexCont/></van-tab>
        <van-tab title="皮划艇静水" title-class="tab19"><IndexCont/></van-tab>
        <van-tab title="轮椅击剑" title-class="tab20"><IndexCont/></van-tab>
        <van-tab title="柔道" title-class="tab21"><IndexCont/></van-tab>
        <van-tab title="跆拳道" title-class="tab22"><IndexCont/></van-tab>
        <van-tab title="马术" title-class="tab23"><IndexCont/></van-tab>
        <van-tab title="力量举重" title-class="tab24"><IndexCont/></van-tab> -->
      </van-tabs>
    </div>
    <MyFooter />
  </div>
</template>
<script>
import MyHeader from "@/components/MyHeader.vue";
import MyFooter from "@/components/MyFooter.vue";
import Whole from "@/components/Whole.vue";
import IndexCont from "@/components/IndexCont.vue";
export default {
  components: {
    Whole,
    MyHeader,
    MyFooter,
    IndexCont
  },
  data() {
    return {
      category:[],//保存类别列表
    }
  },
  mounted() {
    this.axios.get('/category').then(res=>{
      this.category=res.data.category;
    })
  },
};
</script>
<style lang="scss" scoped>
.indexcontent {
  /deep/ .van-tabs__wrap {
    height: 2.8rem;
    background: #fff;
    position: fixed;
    top: 2.8rem;
    z-index: 3;
    width: 100%;
  }
  /deep/ .van-tab__pane {
    margin-top: 3rem;
  }
  /deep/ .van-tabs__nav--card {
    border: transparent;
  }
  /deep/ .tab1,
  /deep/ .tab13 {
    background-color: #ff727b;
  }
  /deep/ .tab2,
  /deep/ .tab14 {
    background-color: #429efb;
  }
  /deep/ .tab3,
  /deep/ .tab15 {
    background-color: #72d4a0;
  }
  /deep/ .tab4,
  /deep/ .tab16 {
    background-color: #ffc356;
  }
  /deep/ .tab5,
  /deep/ .tab17 {
    background-color: #aea5ff;
  }
  /deep/ .tab6,
  /deep/ .tab18 {
    background-color: #a7e97a;
  }
  /deep/ .tab7,
  /deep/ .tab19 {
    background-color: #ff72d0;
  }
  /deep/ .tab8,
  /deep/ .tab20 {
    background-color: #ee8cc5;
  }
  /deep/ .tab9,
  /deep/ .tab21 {
    background-color: #7274ff;
  }
  /deep/ .tab10,
  /deep/ .tab22 {
    background-color: #72d7ff;
  }
  /deep/ .tab11,
  /deep/ .tab23 {
    background-color: #72ffb8;
  }
  /deep/ .tab12,
  /deep/ .tab24 {
    background-color: #ff9a72;
  }
  /deep/ .van-tab {
    margin: 0 5px;
    color: #fff;
  }
  /deep/ .van-tabs__nav--card {
    height: 40px;
    margin: 0 8px;
  }
  /deep/ .van-tabs__nav--card .van-tab {
    border: transparent;
    height: 30px;
    align-items: center;
    margin-top: 10px;
  }
  /deep/ .van-tabs__nav {
    align-items: center;
  }
  /deep/ .van-tabs__content {
    margin-top: 10px;
  }
  /deep/ .van-tabs__nav--card .van-tab.van-tab--active {
    font-size: 18.5px;
    height: 40px;
    line-height: 40px;
  }
}
</style>
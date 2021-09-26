<template>
  <div>
    <MyHeader title="我的收藏" :logoshow="false"></MyHeader>
    <div class="like">
      <div
        class="nolike_con"
        v-if="!$store.state.islogin||this.likelist.length==0"
        :style="{ height: h }"
      >
        <img src="../assets/icon/nolikeconn.png" alt="" />
        <span>暂无收藏记录</span>
      </div>
      <div class="haslike_con" v-else>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="已加载全部收藏资讯"
          @load="onLoad"
          :immediate-check="false"
        >
          <ul>
            <li v-for="(item, i) in likelist" :key="i">
              <img :src="item.img" alt="" :id="item.infonid" @click="ToArticle($event)" />
              <div>
                <div>
                  <p>
                    <span :id="item.infonid" @click="ToArticle($event)" >{{ item.title }}</span>
                    <van-icon name="like" color="#db4f52" :id="item.likeid" @click="removelike($event)" />
                  </p>
                  <span :id="item.infonid" @click="ToArticle($event)" >{{ moment.unix(item.time).format("MM-DD") }}</span>
                </div>
                <p v-html="item.smallarticle"></p>
              </div>
            </li>
          </ul>
        </van-list>
      </div>
    </div>
    <MyFooter />
  </div>
</template>
<script>
import MyHeader from "@/components/MyHeader.vue";
import MyFooter from "@/components/MyFooter.vue";
import { mapState } from "vuex";
export default {
  inject:['reload'],
  components: {
    MyHeader,
    MyFooter,
  },
  computed: {
    ...mapState(["uid",'islogin']),
  },
  data() {
    return {
      h: "571px",
      likeconn: true,
      likelist: [], //保存收藏列表
      loading: false,
      finished: false,
      page: 1,
    };
  },
  mounted() {
    let scrh = window.screen.height;
    this.h = scrh - 6.2 * 16 + "px";
    this.axios
      .get(`/likelist?page=${this.page}&uid=${this.uid}`)
      .then((res) => {
        console.log(res);
        this.likelist = res.data.results;
      });
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        this.page++;
        this.axios
          .get(`/likelist?page=${this.page}&uid=${this.uid}`)
          .then((res) => {
            this.likelist.push(...res.data.results);
            console.log(this.likelist);
            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成
            if (this.likelist.length >= res.data.rowcount) {
              this.finished = true;
            }
          });
      }, 2000);
    },
    ToArticle(e){
      this.$router.push(`/infodetail?id=${e.target.id}`)
    },
    removelike(e){
      if (e.target.id) {
        this.axios.get(`/removelike?likeid=${e.target.id}`).then(res=>{
          if (res.data.code==200) {
            this.$toast({
              message:'取消收藏成功'
            });
            this.reload();
          }
        })        
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.like {
  margin-top: 3rem;
  .nolike_con {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img {
      width: 70%;
    }
    span {
      font-size: 1.2rem;
      color: #a3a3a4;
    }
  }
  .haslike_con {
    margin: 0 1rem;
    ul {
      // margin: 3.8rem 0;
      margin-top: 3.8rem;
      li {
        display: flex;
        text-align: left;
        padding: 0.6rem;
        box-shadow: 0 0 20px 3px #e5e0e0;
        border-radius: 0.2rem;
        margin: 0.8rem 0;
        img {
          width: 30vw;
          // height: 30vw;
          border-radius: 0.2rem;
        }
        & > div {
          width: 70vw;
          margin-left: 0.6rem;
          p {
            margin: 0;
          }
          & > div > p {
            display: flex;
            justify-content: space-between;
            span {
              font-weight: 700;
              -webkit-line-clamp: 1;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              white-space: normal;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
          p + span {
            font-size: 0.8rem;
            color: #858585;
            margin-bottom: 0.5rem;
            display: inline-block;
          }
          & > p {
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            white-space: normal;
            text-overflow: ellipsis;
            overflow: hidden;
            color: #858585;
            font-size: 0.88rem;
          }
        }
      }
    }
  }
}
</style>
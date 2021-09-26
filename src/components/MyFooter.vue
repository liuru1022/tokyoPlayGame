<template>
  <div class="myfooter">
    <van-tabbar route active-color="#db4f52" inactive-color="#000" fixed safe-area-inset-bottom>
      <van-tabbar-item replace to="/" icon="wap-home-o"></van-tabbar-item>
      <van-tabbar-item replace to="/videonews" icon="play-circle-o"></van-tabbar-item>
      <van-tabbar-item replace to="/like" icon="like-o"></van-tabbar-item>
      <van-tabbar-item replace :to="$store.state.islogin?'/user':'/login'" icon="contact"></van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<style lang="scss" scoped>
.myfooter{
  margin-top: 3.2rem;
}
</style>
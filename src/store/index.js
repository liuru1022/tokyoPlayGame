import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin:sessionStorage.getItem('islogin'),
    username:sessionStorage.getItem('name'),
    photo:sessionStorage.getItem('photo'),
    uid:sessionStorage.getItem('uid')
  },
  mutations: {
    loginOK(state,from){
      state.islogin = true;
      state.photo = from.newPhoto;
      state.username = from.newName;
      state.uid = from.newUid;
    },
    quitLogin(state){
      state.islogin = false;
    }
  },
  actions: {
    updatePhoto(store,from){
      window.setTimeout(()=>{
        store.commit('loginOK',from)
      },3000)
    }
  },
  modules: {
  }
})

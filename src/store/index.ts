import modules from './modules';
import { createStore } from 'vuex';
const NAV_LIST = 'NAV_LIST';

export default createStore({
  modules,
  state: {
    navList: [
      { text: '首页', name: 'home', link: '#home', isCur: true },
      { text: '运动员', name: 'athlete', link: '/athleteList', isCur: false },
      { text: '项目', name: 'item', link: '#items', isCur: false },
      { text: '国家地区', name: 'country', link: '#country', isCur: false },
      { text: '场馆', name: 'stadiums', link: '#stadiums', isCur: false },
      { text: '历届', name: 'elements', link: '#elements', isCur: false },
    ],
  },
  mutations: {
    [NAV_LIST](state, payload) {
      state.navList.forEach((item) => {
        item.isCur = payload.indexOf(item.name) > -1;
      });
    },
  },
  actions: {
    setNavList({ commit }, payload = '') {
      commit(NAV_LIST, payload);
    },
  },
});

<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <ul>
      <li v-for="(item, index) in navList" :key="index">{{ item.text }}</li>
    </ul>
    <hello-world msg="Welcome to Your Vue.js + TypeScript App"></hello-world>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import { apiRecord, apiTest } from '@/utils/api';
import { defineComponent } from 'vue';
import { ajax } from '@/utils/ajax.js';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  // components: {
  //   HelloWorld,
  // },
  created() {
    this.getData();
    this.getData2();
    // this.getJsonp();
  },
  computed: {
    ...mapState(['navList']),
  },
  methods: {
    async getData() {
      // 获取本地mock的动态数据
      let res = await apiRecord({
        discipline: 'BKB',
        eventRsc: 'BKBAFJ-----',
      }).catch((err) => {
        console.log(err);
      });
      if (res && res.data) {
        // 世界纪录数据处理
        console.log('测试接口', res.data);
      }
    },
    async getData2() {
      // 获取本地json静态数据s
      let res = await apiTest().catch((err) => {
        console.log(err);
      });
      if (res && res.data) {
        console.log('测试接口', res.data);
      }
    },
    async getJsonp() {
      // 获取本地json静态数据
      let dataA = await ajax(
        '//active.163.com/service/form/v1/13753/list.jsonp',
        'jsonp',
        {
          _charset: 'UTF-8',
          page: 1,
          pageSize: 100,
        }
      );
      let listA = dataA.list;
      console.log('测试jsonp接口', listA);
    },
  },
});
</script>

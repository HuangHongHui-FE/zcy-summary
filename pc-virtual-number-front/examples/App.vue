<template>
  <div id="app">
    <VirtualNumber
      loginUserPhone="15538920602"
      calledRealPhone="15538920603"
      contactPerson="contactPersoncontactPersoncontactPerson"
      bizCode="1"
      placement="right"
      trigger="click"
    />
  </div>
</template>

<script>
// import Demo from '../README.md';
import VirtualNumber from '../src/index';
// console.log("🚀 ~ VirtualNumber:", VirtualNumber)
export default {
  name: 'Index',
  components: {
    VirtualNumber,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less">
/* 引入confront */
@import 'https://cdn.zcycdn.com/zcy-font/front-business-icon.css';
@import '../src/style/theme.less';
</style>

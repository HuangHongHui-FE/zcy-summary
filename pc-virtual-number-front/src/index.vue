<template>
  <VirtualNumber
    v-bind="$attrs"
    v-on="$listeners"
    @click="handleClick"
  >
    <slot></slot>
  </VirtualNumber>
</template>

<script>
import VirtualNumber from '@zcy/zcy-virtual-number-back';
import { applyReactInVue } from 'vuereact-combined';

export default {
  name: 'pc-virtual-number-front',
  components: {
    VirtualNumber: applyReactInVue(VirtualNumber),
  },
  methods: {
    handleClick: function(e) {
      // 解决trigger为click触发的问题
      if (e && e.stopPropagation) {
        e.stopPropagation();
      }
    },
  },
};
</script>

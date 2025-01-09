<template>
  <section :class="classes">
    <section :class="[`${classes}-demo`]">
      <slot name="component" />
    </section>
    <section :class="metaClasses">
      <slot name="description" />
      <span :class="`${classes}-expand-icon`">
        <img
          width="16"
          alt="expand code"
          src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg"
          :class="
            codeExpand
              ? `${classes}-expand-icon-hide`
              : `${classes}-expand-icon-show`
          "
          @click="handleCodeExpand"
        >
        <img
          width="16"
          alt="expand code"
          src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg"
          :class="
            codeExpand
              ? `${classes}-expand-icon-show`
              : `${classes}-expand-icon-hide`
          "
          @click="handleCodeExpand"
        >
      </span>
    </section>
    <transition
      appear
      :css="false"
    >
      <section
        v-show="codeExpand"
        class="highlight-wrapper"
      >
        <slot name="code" />
      </section>
    </transition>
  </section>
</template>

<script>
const prefixCls = 'code-box';
export default {
  name: 'CodeBox',
  data() {
    return {
      codeExpand: true,
    };
  },
  computed: {
    classes() {
      return prefixCls;
    },
    metaClasses() {
      return [
        `${prefixCls}-meta`,
        {
          [`${prefixCls}-meta-expand`]: this.codeExpand,
        },
      ];
    },
  },
  methods: {
    handleCodeExpand() {
      this.codeExpand = !this.codeExpand;
    },
  },
};
</script>

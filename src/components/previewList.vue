<template>
    <transition name="fade" v-if="previewShow" @click="leave">
        <section class="lg-preview-wrapper" @click="leave">
            <img class="lg-preview-img" :src="previewSrc">
        </section>
    </transition>
</template>

<script>
export default {
  name: "Preview",
  props: ["previewSrc","previewShow"],
  data() {
    return {
    };
  },
  methods: {
    leave(e) {
      // 向父组件传递状态
      this.$emit("preview-show", false);
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.lg-preview-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  text-align: center;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 1);
  z-index: 10000;
}


.lg-preview-img {
  max-width: 100%;
  width: 100%;
  max-height: 100%;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}


</style>

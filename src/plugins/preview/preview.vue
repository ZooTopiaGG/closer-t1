<template>
  <section v-if="show" class="preview">
    <div v-if="showCount" class="count">{{currentCount}}/{{list.lenght + 1}}</div>
    <div class="name"></div>
    <div class="container">
      <mt-swipe :auto="0" :show-indicator="false" @click="handleChange">
        <mt-swipe-item v-for="item in list">
          <img :data-src="item">
        </mt-swipe-item>
      </mt-swipe>
    </div>
  </section>
</template>
<script>
  import { Swipe, SwipeItem } from 'mint-ui';
  export default {
    name: 'preview',
    components: {
      Swipe, 
      SwipeItem
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      current: String,
      list: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        index: 0
      }
    },
    computed: {
      showCount() {
        return this.list.length > 1
      },
      currentCount() {
        this.findIndex(this.current, this.list)
      }
    },
    methods: {
      findIndex(item, list) {
        return list.indexOf(item) + 1
      },
      handleChange(index) {
        console.log(index)
      }
    }
  }
</script>
<style lang="less" scoped>
  .preview {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 999;
    .count {
      position: absolute;
      left: 50pr;
      bottom: 40pr;
      padding: 10pr 20pr;
      border: 1px solid #fff;
      color: #fff;
    }
  }
</style>
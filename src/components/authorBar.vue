<template>
  <section v-if="!window.ENV.v120" class="author-bar">
    <section class="author-list" v-if="res.int_category != 3">
      <p v-if="res.nickname">小编：{{ res.nickname }}</p>
      <p v-if="res.authors">作者：{{ res.authors }} </p>
    </section>
    <section v-else class="author-list">
      <p>来自 {{ res.className }}</p>
    </section>
  </section>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState(['res'])
  }
}
</script>
<style lang="less" scoped>
  .author-bar {
    margin: 40pr 0;
    font-size: 28pr;
    color: #94928e;
    line-height: 60pr;
    .author-list {

    }
  }
</style>
<template>
  <section v-if="!$store.state.V_1_2" class="author-bar">
    <section class="author-list" v-if="$store.state.res.int_category != 3">
      <p v-if="$store.state.res.nickname">小编：{{ $store.state.res.nickname }}</p>
      <p v-if="$store.state.res.authors">作者：{{ $store.state.res.authors }} </p>
    </section>
    <section v-else class="author-list">
      <p>来自 {{ $store.state.res.className }}</p>
    </section>
  </section>
</template>
<script>
export default {
  props: {},
  data() {
    return {}
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
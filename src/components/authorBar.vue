<template>
  <section v-if="!$store.state.version_1_2">
    <section class="author-list" v-if="$store.state.res.int_category != 3">
      <p v-if="$store.state.res.nickname">小编：<span>{{ $store.state.res.nickname }}</span></p>
      <p v-if="$store.state.res.authors">作者：{{ $store.state.res.authors }} </p>
    </section>
    <section v-else class="author-list">
      <p>来自 <span>{{ $store.state.res.className }}</span></p>
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
  
</style>
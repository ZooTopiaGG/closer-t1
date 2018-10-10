<template>
  <div class="group">
    <downloadBar></downloadBar>
    <div class="member">
      <div class="title">群组成员xxxx</div>
    </div>
  </div>
</template>

<script>
import downloadBar from '../../components/downloadBar.vue'
export default {
  components:{
    downloadBar
  }
}
</script>

<style lang="less" scoped>
 .group{
    .member{
      padding:20pr;
      .title{

      }
    }
 }
</style>

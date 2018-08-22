<template>
  <div class="not-found">
    <div class="delete" v-if="isDelete">
      <div class="delete-icon"></div>
      <div class="subject-notfound">此贴子已被删除</div>
      <div>
      </div>
    </div>
    <div v-else>
      
    </div>
  </div>
</template>

<script>
  export default {
    name: "notFound",
    props: {
      isDelete: Number
    }
  
  }
</script>


<style lang="less" scoped>
  .not-found {
    .delete-icon {
      background: url("../../assets/images/not_found_icon.png");
      background-size: cover;
      width: 100pr;
      height: 100pr;
      margin: 500pr 100pr 0 310pr;
    }
    .subject-notfound {
      margin: 100pr 100pr 0 250pr;
      font-size: 32pr;
      color: #555555;
    }
  }
</style>




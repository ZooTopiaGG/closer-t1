<template>
  <div class="feed">
    <div class="title">精彩投稿</div>
  </div>
</template>

<script>



export default {
   name: "feedList",
  props: {
    
  },
  data() {
     return {
        defaultImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",
      }

  },
  methods:{

  }
}
</script>

<style scoped lang="less">
  .feed{
    .title{
      color:#444444;
      line-height: 22pr;
    }
  }
</style>

<template>
  <!-- 阅读量 点赞数 -->
  <section class="like-bar" v-if="!ENV.v120&&!ENV.app">
    <section class="read">
      阅读
      <span class="read-count">{{ readCount }}</span>
    </section>
    <section class="like" @click="toSupport($event)" v-if="!ENV.app">
      <img class="like-icon" ref="sup" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAgCAYAAABgrToAAAADz0lEQVRYR82YXWgcVRTH/2c2tXWtWBS0aovFl9So1MY3P17andm9d7apL7FaScEv1BeFiB8UkYKIWKmgL340KJhICvtQsDtzNzvb6kORIsTWQrU+VDS0IVYCFkzBZHf+MmiW3e1m2SRrJ+f53HN+c849554zgg5KVjk7yDADsVYBODF1cXp4fHx8bjkuZDmH58/29/cnZv669KWAu+rsCX6wZtl3pFSaWKqfjgBqbQ8KcQDgn4C8LyKXSD4HoAeC75LXrXsgl8tVlgLZGUBlTwiwEcROrxB8FYH09T14fWUueRrAJoTMemMlLxZA103dhVB+BDDpmWADAM6DuMp+G8BeAG95JngzFsCstp8n8RGIUa8Q7K6F0Gn7GbFwkMSQXwiejQXQVXaUOi3Cp/J+6fNaiKxydhE8BOCQZ4LHrzrgTsfZWE7wFwCVa9aEtx8+fHS6FsLNOE9DOCTEUD6OCGplfybAkyIYzvvBnsYIZbV9gMQgwDc8U4ru46JlyVX8X3QOAvg7RNc9xphzjd5dbf8EYnMI2W5M8dii6QBcAai1YwvCR4Ry7UIGKXIryHR0XgQv5P3g40ZdpWzHAsaiqhZiBIJyM3sEy4LE8bwZG67tAPO6dYCusl8G8F4z8CbGL1Mw6PvBJ80ca53OCMOogKy2IicY9fz6LhCdqwKmUqkbVq+S3wF0ici+EDxf8xUKxKMAfApyEqIcSteYMeaPVs5d17mfFd7bCtEi15KyD4KbLPLhI4XS8VqbVcBsNr2FlfCUQE7nTXFLXbvQzisk9xPY75vgtbYisgglV9mjAB4DMeAVgpGmgEqltlqQ7wU4mTdB71UG/BXAHSHYa0zp5IoCzGQy3QmpnCVx0S8E6xsLpZriuCKotfOikB9AMOL5wUDjzYgd0NV2HoRLwR7fD6JWUyexAiqlVlsoT5NMwirf5vvfTK0wQGebBR4FcMozwdZmhR9rBLWy3xXg1VbtK1ZAV9lRS7mv1VsdG6DWej3C2UkRuZxcu+7GXC43u6JSrLU9IMQXEHieH2QXenhii6CrUiOAPEHKS36h+OFKAxSt7CkBbq6wvLlQ+PrnFQW4I72tN7QS4wB/80xpU6u5oprivkymuyKVswAuJCcm78ydOVO9tNkOTzNZ7bxD8nVAPvVMMVrwF5TagdVylR0t2ncDOA9BNBv+K8QtADYAnILIhUVMUleqEmtI9kSjOCx5yPOK37YLCKW29wisnES/LP5fmSFlb6vimHffbGmyXDfVbZUTC+4ky2Gfk3I5DBPnisXiTDt2lrzVtWO8Ezr/AEKTND+nargIAAAAAElFTkSuQmCC"
        alt="图片" />
      <span ref="like" status='false'> {{ res.like }}</span>
    </section>
    <section class="publish" v-else>
      <span> {{ getCommonTime }}</span>
    </section>
  </section>
</template>

<script>
  import {
    getCommonTime,
    getSingleCount
  } from "../utils";
  import {
    mapState,
    mapActions
  } from 'vuex';
  export default {
    computed: {
      ...mapState('article',[
        'res'
      ]),
      ...mapState('common', ['incr_view']),
      getCommonTime() {
        // 日期处理
        return getCommonTime(this.res.long_publish_time, 'yy-mm-dd hh:MM')
      },
      readCount() {
        // 数字处理
        console.log('this.incr_view', this.incr_view)
        // return getSingleCount(this.incr_view)
        return this.incr_view
      }
    },
    methods: {
      ...mapActions('common', ['get_incr_view']),
      // 点赞
      toSupport(e) {
        let t = this.$refs["like"].innerText;
        if (this.$refs["like"].getAttribute("status") === "false") {
          this.$refs["like"].innerText = parseInt(t) + 1;
        }
        this.$refs["like"].setAttribute("status", "true");
        if (e.target.nodeName === "IMG" || e.target.nodeName === "SPAN") {
          this.$refs["sup"].src =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAeCAYAAABAFGxuAAACcUlEQVRYR83XT2jTUBgA8O97SxFkgn/YpiAq6smbdhcZA9Ema5JueBJkFw968qDibl5a8Doc4lHB0y5FmGtfXpsErCJFQfGmgh6EghdlijKRtX2fNJujq01WFtfkXd973/fjS/K+F4SYDvwfLsNQR5Fw2ovFIM+5XQ0bNzRsUtfOS6BHHml1SAC6yYU7FwYXCpZMJhP7R/bWgGCkA9EYSMDhxUXn81ZxoWCmeW4cJHvWNTnhZV6yH0QD01O3APB2t+REmLNKdjYimPocAMZ8ks9y4cz0HWaaqaMg8UPbS7/BgIi5ohVBxTJp9R4hXPWrCCJNFy13vq8VmzLU0YakKiImfBJLpYlHHtt2rW+wKT11sgnIAeBAQNIyF056q6jWvvXjYnLi7CnJ2CUEHPwbkCTN87LrGoZ6kRGoALhHkjQDKuVtJYBPDOBJIAzhZ5PooRDum27rPJimacOJAfkRAHe1LyLCa1bJvmvq2h0Auh6mAj57fzClfqxQqHztnPdghjGRRpKic7IPsFb/OiOE89QHpmWQqBABrJHYUR9aWKh8jxeMoMpLTtcDeu1RRlMxIspaJTfn+/IbRjQwCXRaCPdF3GDfdg7uHsrn8814wRDy3HIu+La01eOi/4+SEK5YlnM/djCliYeCemlUX+U7LpwTQZ0kIhjOcWHfiB1MAhpC2P+0wHZoFBX7zZSlfYXC61/xqhiSyy1X3eym4lVM19UxBtD6sdgwtul2McOFM9sTLJsF9uqlWiQAfZvvY28bko2Xy+WlnmBrizCTUY9jna1fFhuM1YQQX3RdP6hIObxZsKB5qdDK8vLK+0ql0uglzh+lOIUuSynHSQAAAABJRU5ErkJggg==";
        }
      }
    },
    mounted() {
      console.log('window.ENV.v120',window.ENV.v120)
      this.get_incr_view({
        subjectid: this.$route.params.id,
        timestamp: Date.now()
      })
    }
  }
</script>

<style scoped lang="less">
  .like-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100pr;
    border-top: 1px solid #eaeaea;
    border-bottom: 20pr solid #f1f1f1;
    font-size: 28pr;
    color: #94928e;
    .like {
      display: flex;
      align-items: center;
    }
    .like-icon {
      width: 34pr;
      height: 30pr;
    }
  }
</style>
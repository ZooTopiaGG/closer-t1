<template>
  <div>
    <tj-article v-if="currentComponent == 'article'"></tj-article>
    <tj-comment v-else-if="currentComponent == 'comment'"></tj-comment>
    <tj-draft v-else-if="currentComponent == 'draft'"></tj-draft>
    <tj-video v-else-if="currentComponent == 'video'"></tj-video>
    <tj-image v-else-if="currentComponent == 'image'"></tj-image>
    <not-found v-else-if="currentComponent == 'notfound'"></not-found>
  </div>
</template>
<script>
  import tjArticle from '../article/index';
  import tjComment from '../comment/index';
  import tjDraft from '../draft/index';
  import tjVideo from '../video/index';
  import tjImage from '../image/index';
  import notFound from '../../components/notfound';

  import {mapActions,mapState} from 'vuex';
  export default {
    data() {
      return {
        currentComponent: ''
      }
    },
    components: {
      tjArticle,
      tjComment,
      tjDraft,
      tjVideo,
      tjImage
    },
    computed: {
      ...mapActions("common", [
        'getUserInfoWithWx'
      ])

    },
    beforeCreate() {
    },
    created() {
      // 根据参数显示对应组件
      let { type, category } = this.$route.query;
      if (type == '2') {
        if (category == '3') {
          // 神议论
          this.currentComponent = 'comment'
        } else if (category == "1" || category == "2") { //征稿1  投稿2 
          this.currentComponent = 'draft'
        } else {
          this.currentComponent = 'article'
        }
      } else if (type == '1') {
        // 视频
          this.currentComponent = 'video'
      } else if (type == '0') {
        // 图集
          this.currentComponent = 'image'
      } else {
        this.currentComponent = 'notfound'
      }
      // 微信授权后获取用户信息
      if (this.$route.query.code) {
        let params = {
          plateform: 2,
          code: this.$route.query.code,
          protocol: "WEB_SOCKET",
          adid: Cookies.get('h5Adid') || 'closer-t1'
        }
        // this.getUserInfoWithWx(params);
        this.$store.dispatch('getUserInfoWithWx',params)
      }

    },
    beforeMount() {
      
    },
    mounted() {
    }
  }
</script>
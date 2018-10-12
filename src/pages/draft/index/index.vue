<template>
  <div class="draft">
    <message-board></message-board>
  </div>
</template>
<script>
import MessageBoard from '../../../components/messageboard'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'draft',
  components: {
    MessageBoard
  },
  data() {
    return {

    }
  }
}
</script>



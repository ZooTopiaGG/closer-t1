import Player from './player'

function createVideo(Pligin) {
  return new Pligin({
    el: document.createElement('div')
  })
}

export default {
  install(Vue, options) {
    console.log('player:install')
    const PlayerPlugin = Vue.extend(Player);
    let player = {
      init(container, params) {
        let $container = document.querySelector(container) || $container;
        let videoList = $container.querySelectorAll('video');
        videoList.forEach(video => {
          let parent = video.parentNode,
            $video = createVideo(PlayerPlugin);
          parent.replaceChild($video.$el, video)
          $video.video = video;
          $video.params = params;
        })
      }
    }

    if (!Vue.$video) {
      Vue.$player = player;
    }
    Vue.prototype.$player = Vue.$player;
  }
}
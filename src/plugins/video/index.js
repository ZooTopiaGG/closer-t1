import Video from './video'
let $vm;
let $container = document.body;
let $list = [];

function bindEvent(el) {
  el && el.addEventListener('click', function(e) {
    // console.log('touch')
    let target = e.target;
    if (target.tagName.toLowerCase() == 'img' && getSrc(target)) {
      // let rect = target.getBoundingClientRect();
      // let src = getSrc(target);
      // $vm.rect = rect;
      $vm.current = target;
      $vm.display = true;
    }
  })
}

function getSrc(video) {
  let src = video.src,
    poster = video.poster,
    source = video.querySelectorAll('source');
  if (!src) {
    // 获取第一个source的src值
    source && (src = source.src)
  }
}

function getImgPosition(img) {
  let rect = img.getBoundingClientRect();
}

function createVideo(Pligin) {
  return new Pligin({
    el: document.createElement('div')
  })
}

export default {
  install(Vue, options) {
    const VideoPlugin = Vue.extend(Video);
    let tjVideo = {
      init(container) {
        $container = document.querySelector(container) || $container;
        let videoList = $container.querySelectorAll('video');
        videoList.forEach(video => {
          let _video = createVideo(VideoPlugin)
        })
        // bindEvent($container);
        // $list = Array.prototype.slice.call($container.querySelectorAll('img')).filter(img => getSrc(img))
        // $vm.list = $list;
        // console.log('$list', $list.length, $list)
      }
    }

    if (!Vue.$preview) {
      Vue.$preview = preview;
    }
    Vue.prototype.$preview = Vue.$preview;
  }
}
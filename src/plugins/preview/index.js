import Preview from './preview'
let $vm;
let $container = document.body;
let $list = [];

function bindEvent(el) {
  el && el.addEventListener('click', function(e) {
    console.log('touch')
    let target = e.target;
    if (target.tagName.toLowerCase() == 'img' && getSrc(target)) {
      // let rect = target.getBoundingClientRect();
      // let src = getSrc(target);
      // $vm.rect = rect;
      $vm.current = target;
      // $vm.display = true;
      $vm.show();
    }
  })
}

function getSrc(img) {
  let src = img.src,
    data_src = img.dataset['src'];
  if (/^https?:\/\//.test(src)) {
    return src
  } else if (/^https?:\/\//.test(data_src)) {
    return data_src
  } else {
    return null
  }
}

function getImgPosition(img) {
  let rect = img.getBoundingClientRect();
}

export default {
  install(Vue, options) {
    if (!$vm) {
      const PreviewPlugin = Vue.extend(Preview);
      $vm = new PreviewPlugin({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }
    let preview = {
      show(current, list) {
        // $vm.display = true;
        $vm.current = current;
        $vm.list = list;
      },
      init(container) {
        $container = document.querySelector(container) || $container;
        // let imgList = $container.querySelectorAll('img');
        // imgList.forEach(img => {
        //   let src = getSrc(img);
        //   src && $list.push(src)
        // })
        bindEvent($container);
        $list = Array.prototype.slice.call($container.querySelectorAll('img')).filter(img => getSrc(img))
        $vm.list = $list;
        console.log('$list', $list.length, $list)
      }
    }

    if (!Vue.$preview) {
      Vue.$preview = preview;
    }
    Vue.prototype.$preview = Vue.$preview;
  }
}
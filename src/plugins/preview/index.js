import Preview from './preview'
let $vm;
let $container = document.body;
let $list = [];

function bindEvent(el) {
  el && el.addEventListener('click', function(e) {
    // console.log('touch')
    let target = e.target;
    if (target.tagName.toLowerCase() == 'img' && getSrc(target)) {
      $vm.current = target;
      $vm.display = true;
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

export default {
  install(Vue, options) {
    console.log('preview:install');
    if (!$vm) {
      const PreviewPlugin = Vue.extend(Preview);
      $vm = new PreviewPlugin({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }
    let preview = {
      init(container) {
        $container = document.querySelector(container) || $container;
        bindEvent($container);
        $list = Array.prototype.slice.call($container.querySelectorAll('img')).filter(img => getSrc(img))
        $vm.list = $list;
      }
    }

    if (!Vue.$preview) {
      Vue.$preview = preview;
    }
    Vue.prototype.$preview = Vue.$preview;
  }
}
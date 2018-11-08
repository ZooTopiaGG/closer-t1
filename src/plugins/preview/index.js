import Preview from './preview'
let $vm;
let opts = {};
let $container = document.body;
let $list = [];
let $src = [];

function bindEvent(el) {
  el && el.addEventListener('click', function(e) {
    let target = e.target;
    if (target.tagName.toLowerCase() == 'img' && target.dataset.type == 'preview') {
      console.log('touch')
      showPreview(target);
    }
  })
}

function getSrc(img) {
  let src = img.src,
    data_src = img.dataset.src;
  // console.log('src',src)
  // console.log('data_src',data_src)

  if (/^https?:\/\//.test(src)) {
    return src
  } else if (/^https?:\/\//.test(data_src)) {
    return data_src
  } else {
    return null
  }
}

function showPreview(target) {
  opts.isApp ? withNative(target) : withPlugin(target)
}

function withNative(target) {
  let index = $list.indexOf(target);
  let imgJson = {
    imgs: $src,
    index
  }
  if (opts.isIos) {
    if (window.WebViewJavascriptBridge) {
      setupWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler("tapImage", imgJson);
      });
    }
  } else {
    if (typeof window.bridge != "undefined") {
      window.bridge.tapImage(JSON.stringify(imgJson));
    }
  }
}

function withPlugin(target) {
  if (opts.isApp) return;
  $vm.current = target;
  $vm.display = true;
}

export default {
  install(Vue, options) {
    opts = {...options}
    console.log('preview:install');
    if (!$vm && !opts.isApp) {
      const PreviewPlugin = Vue.extend(Preview);
      $vm = new PreviewPlugin({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
      $vm.list = $list;
    }
    let preview = {
      init(container) {
        $container = document.querySelector(container) || $container;
        bindEvent($container);
        setTimeout(() => {
          let imgs = $container.querySelectorAll('img[data-type="preview"]');
          console.log('preview imgs:', imgs.length)
          $list.push(...Array.from(imgs)
          .filter(img => {
            let src = getSrc(img);
            let type = img.dataset.type;
            if (src) {
              $src.push(src);
              return true;
            }
            return false;
          }))
          console.log('preview imgs.length', $list.length, $src.length)
        }, 100)
      }
    }

    if (!Vue.$preview) {
      Vue.$preview = preview;
    }
    Vue.prototype.$preview = Vue.$preview;
  }
}
import Preview from './preview'
let $vm;
let opts = {};
let $container = document.body;
let $list = [];
let $src = [];

function bindEvent(el) {
  el && el.addEventListener('click', function(e) {
    console.log('touch')
    let target = e.target;
    if (target.tagName.toLowerCase() == 'img') {
      showPreview(target);
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

function showPreview(target) {
  opts.isApp ? withNative(target) : withPlugin(target)
}

function withNative(target) {
  let index = $src.indexOf(getSrc(target));
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
        $list.push(...Array.from($container.querySelectorAll('img')).filter(img => {
          let src = getSrc(img);
          if (src) {
            $src.push(src);
            return true;
          }
          return false;
        }))
      }
    }

    if (!Vue.$preview) {
      Vue.$preview = preview;
    }
    Vue.prototype.$preview = Vue.$preview;
  }
}
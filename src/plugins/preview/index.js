import Preview from './preview'
let $vm;
export default {
  install(Vue, options) {
    if (!$vm) {
      const PreviewPlugin = Vue.extend(Preview);
      $vm = new PreviewPlugin({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }
    $vm.show = false;
    let preview = {
      show(current, list) {
        $vm.show = true;
        $vm.current = current;
        $vm.list = list;
      }
    }
    if (!Vue.$preview) {
      Vue.$preview = preview;
    }
  }
}
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4db4"],{1181:function(t,e,n){t.exports=n.p+"img/illustrations.082c27e0.png"},"20fc":function(t,e,n){"use strict";var i=n("a42b"),a=n.n(i);a.a},"386d":function(t,e,n){n("214f")("search",1,function(t,e,n){return[function(n){"use strict";var i=t(this),a=void 0==n?void 0:n[e];return void 0!==a?a.call(n,i):new RegExp(n)[e](String(i))},n]})},4008:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"not-found"},[t.isDelete?n("div",{staticClass:"delete"},[n("div",{staticClass:"delete-icon"}),n("div",{staticClass:"subject-notfound"},[t._v("此贴子已被删除")]),n("div")]):n("div",{staticClass:"todown"},[t._m(0),t._m(1),n("div",{staticClass:"down-btn",on:{click:t.download}},[n("span",[t._v("立即下载")])]),t._m(2)])])},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"todown-top"},[i("img",{staticClass:"todown-top-left",attrs:{src:n("a8b7")}}),i("img",{staticClass:"todown-top-right",attrs:{src:n("ec55")}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"todown-body"},[n("div",[t._v("根据国家法律规定")]),n("div",[t._v("该文章只能在app中打开查看")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("img",{staticClass:"todown-bottom",attrs:{src:n("1181")}})])}],o=(n("28a5"),n("386d"),{name:"notFound",props:{isDelete:Boolean},mounted:function(){this.initLoad()},methods:{initLoad:function(){this.isWeiXin()?document.querySelector(".todown-top-right").style.display="block":(document.querySelector(".down-btn").style.opacity=1,setTimeout(function(){},1500))},download:function(){location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer"},isWeiXin:function(){var t=navigator.userAgent.toLowerCase(),e=!1,n=!1,i=!1;return e=/micromessenger/i.test(t),n=/qq/i.test(t),/mqqbrowser/i.test(t)&&(n=!1),i=/weibo/i.test(t),e||n||i},getParam:function(t){var e="",n=!1;if(0==location.search.indexOf("?")&&location.search.indexOf("=")>1){var i=unescape(location.search).substring(1,location.search.length).split("&"),a=0;while(a<i.length&&!n)i[a].indexOf("=")>0&&i[a].split("=")[0].toLowerCase()==t.toLowerCase()&&(e=i[a].split("=")[1],n=!0),a++}return e}}}),s=o,c=(n("684c"),n("2877")),r=Object(c["a"])(s,i,a,!1,null,"5b49dc77",null);e["a"]=r.exports},"684c":function(t,e,n){"use strict";var i=n("7e4c"),a=n.n(i);a.a},"7e4c":function(t,e,n){},8927:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.exist?n("section",{staticClass:"article"},[n("section",{staticClass:"article-wrap"},[n("section",{staticClass:"article-container"},[n("section",{staticClass:"article-title"},[t._v(" "+t._s(t.res.title)+" ")]),n("section",{directives:[{name:"lazy-container",rawName:"v-lazy-container",value:{selector:"img"},expression:"{ selector: 'img' }"}],staticClass:"content article-content",domProps:{innerHTML:t._s(t.content.html)},on:{click:function(e){t.openClick(e)}}})])])]):n("Notfound",{attrs:{isDelete:t.res.bool_delete}})},a=[],o=(n("96cf"),n("3040")),s=n("c93e"),c=(n("a78e"),n("2f62")),r=n("ed08"),l=n("4008"),A=Object(c["a"])("article"),u=A.mapState,d=A.mapActions,f=A.mapMutations,p={name:"Feed",components:{Notfound:l["a"]},data:function(){return{defaultImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",vid:"",video:{},playIconTimer:null}},computed:Object(s["a"])({},u(["res","content","GET_MESSAGE_STATE","version_1_2","agent","exist"])),methods:Object(s["a"])({},d(["fetch_content"]),f(["GET_USER_AGENT"]),{fetch:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.fetch_content(this.$route.params);case 2:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),tabImg:function(t){console.log(t.target.dataset.index),Object(r["g"])(t.target.dataset.index)},openClick:function(t){var e=t.target;e.classList;this.$store.state.IS_APP&&(e.dataset.vid&&e.dataset.uid?Object(r["a"])(e.dataset.uid,e.dataset.vid):e.dataset.index&&Object(r["g"])(e.dataset.index))}}),mounted:function(){var t=this;t.GET_USER_AGENT({nvg:navigator.userAgent,ref:location.pathname}),t.fetch()}},m=p,v=(n("20fc"),n("2877")),g=Object(v["a"])(m,i,a,!1,null,"76d3554b",null);e["default"]=g.exports},a42b:function(t,e,n){},a8b7:function(t,e,n){t.exports=n.p+"img/tiejin.ce32b504.png"},c93e:function(t,e,n){"use strict";n.d(e,"a",function(){return a});var i=n("a322");function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(e){Object(i["a"])(t,e,n[e])})}return t}},ec55:function(t,e,n){t.exports=n.p+"img/open_browser.60911e5f.png"}}]);
//# sourceMappingURL=chunk-4db4.3025d36c.js.map
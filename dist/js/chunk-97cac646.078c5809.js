(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-97cac646"],{1181:function(t,e,i){t.exports=i.p+"img/illustrations.082c27e0.png"},"30d1":function(t,e,i){"use strict";var o=i("642c"),s=i.n(o);s.a},"386d":function(t,e,i){i("214f")("search",1,function(t,e,i){return[function(i){"use strict";var o=t(this),s=void 0==i?void 0:i[e];return void 0!==s?s.call(i,o):new RegExp(i)[e](String(o))},i]})},4008:function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"not-found"},[t.isApp?i("div",{staticClass:"delete"},[i("div",{staticClass:"delete-icon"}),i("div",{staticClass:"subject-notfound"},[t._v("此贴子已被删除")]),i("div")]):i("div",{staticClass:"todown"},[t._m(0),t._m(1),i("div",{staticClass:"down-btn",on:{click:t.download}},[i("span",[t._v("立即下载")])]),t._m(2)])])},s=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"todown-top"},[o("img",{staticClass:"todown-top-left",attrs:{src:i("a8b7")}}),o("img",{staticClass:"todown-top-right",attrs:{src:i("ec55")}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"todown-body"},[i("div",[t._v("根据国家法律规定")]),i("div",[t._v("该文章只能在app中打开查看")])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("img",{staticClass:"todown-bottom",attrs:{src:i("1181")}})])}],n=(i("28a5"),i("386d"),{name:"notFound",props:{isDelete:Boolean},computed:{isApp:function(){return this.ENV.app}},mounted:function(){this.initLoad()},methods:{initLoad:function(){var t=this;if(this.ENV.wx){var e=document.querySelector(".todown-top-right");e&&(e.style.display="block")}else this.ENV.wx||this.ENV.app||(document.querySelector(".down-btn").style.opacity=1,setTimeout(function(){t.download()},1500))},download:function(){location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer"},isWeiXin:function(){var t=navigator.userAgent.toLowerCase(),e=!1,i=!1,o=!1;return e=/micromessenger/i.test(t),i=/qq/i.test(t),/mqqbrowser/i.test(t)&&(i=!1),o=/weibo/i.test(t),e||i||o},getParam:function(t){var e="",i=!1;if(0==location.search.indexOf("?")&&location.search.indexOf("=")>1){var o=unescape(location.search).substring(1,location.search.length).split("&"),s=0;while(s<o.length&&!i)o[s].indexOf("=")>0&&o[s].split("=")[0].toLowerCase()==t.toLowerCase()&&(e=o[s].split("=")[1],i=!0),s++}return e}}}),a=n,r=(i("67f5"),i("2877")),c=Object(r["a"])(a,o,s,!1,null,"2e3e180d",null);c.options.__file="notfound.vue";e["a"]=c.exports},4027:function(t,e,i){"use strict";var o=i("abf6"),s=i.n(o);s.a},"545f":function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.ENV.app||t.ENV.v120?t._e():i("section",{staticClass:"author-bar"},[3!=t.res.int_category?i("section",{staticClass:"author-list"},[t.res.nickname?i("p",[t._v("小编："+t._s(t.res.nickname))]):t._e(),t.res.authors?i("p",[t._v("作者："+t._s(t.res.authors)+" ")]):t._e()]):i("section",{staticClass:"author-list"},[i("p",[t._v("来自 "+t._s(t.res.className))])])])},s=[],n=i("c93e"),a=i("2f62"),r={props:{},data:function(){return{}},computed:Object(n["a"])({},Object(a["d"])(["res"]))},c=r,d=(i("30d1"),i("2877")),u=Object(d["a"])(c,o,s,!1,null,"2c4a8434",null);u.options.__file="authorBar.vue";e["a"]=u.exports},"5b90":function(t,e,i){},"642c":function(t,e,i){},"67f5":function(t,e,i){"use strict";var o=i("5b90"),s=i.n(o);s.a},a8b7:function(t,e,i){t.exports=i.p+"img/tiejin.ce32b504.png"},abf6:function(t,e,i){},bb25:function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t.exist?i("section",{staticClass:"video"},[i("download-bar",{attrs:{placeholder:t.videoInfo.height/t.videoInfo.width<1}}),i("section",{staticClass:"video-wrap"},[i("div",{staticClass:"video-main"},[i("video",{staticStyle:{width:"100%"},attrs:{src:t.videoInfo.src,"data-duration":t.videoInfo.duration,width:t.videoInfo.width,height:t.videoInfo.height,poster:t.videoInfo.img,controls:""}})]),i("section",{staticClass:"video-container bg-f"},[i("focus-bar",{staticClass:"focus-bar",attrs:{showTime:""}}),i("div",{directives:[{name:"lazy-container",rawName:"v-lazy-container",value:{selector:"img"},expression:"{ selector: 'img' }"}],staticClass:"content",on:{click:function(e){t.openClick(e)}}},[t.res.bigcover||t.res.cover?i("div",{staticClass:"video-cover-box"},[i("img",{staticClass:"video-cover-img",attrs:{"data-src":t.makeFileUrl(t.res.bigcover||t.res.cover)}})]):t._e(),i("div",{staticClass:"video-content",domProps:{innerHTML:t._s(t.content.text)}})]),i("author-bar")],1),i("like-bar",{staticClass:"like-bar",attrs:{author:!0}}),i("feed-list",{attrs:{subjectList:t.hotSubjects}}),i("message-board"),i("foot-bar"),i("preview-list",{attrs:{"preview-src":t.preSrc,"preview-show":t.preShow},on:{"preview-show":t.listenToMyChild}})],1)],1):i("Notfound",{attrs:{isDelete:t.res.bool_delete}})],1)},s=[],n=(i("96cf"),i("3040")),a=i("c93e"),r=(i("cadf"),i("551c"),i("097d"),i("a78e"),i("2f62")),c=i("ed08"),d=i("4008"),u=i("fb25"),l=i("c3f2"),p=i("c64e"),f=i("1a18"),h=i("d862"),v=i("26a9"),A=i("545f"),m=i("790e"),g={components:{DownloadBar:u["a"],FootBar:l["a"],Notfound:d["a"],FocusBar:p["a"],LikeBar:f["a"],MessageBoard:h["a"],FeedList:v["a"],AuthorBar:A["a"],PreviewList:m["a"]},data:function(){return{defaultImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",vid:"",video:{},playIconTimer:null,preSrc:"",preShow:!1}},computed:Object(a["a"])({},Object(r["d"])("video",["res","content","exist"]),Object(r["d"])("common",{hotSubjects:function(t){return t.hotSubjects}}),Object(r["d"])(["CONTENT_IMGS"]),{videoInfo:function(){var t=this.content.videos&&this.content.videos[0]||{};return console.log("video.duration",t.duration),{src:t.src,img:t.imageUrl,duration:t.duration,width:t.width,height:t.height}}}),methods:Object(a["a"])({},Object(r["b"])("video",["fetch_content"]),Object(r["c"])("video",["GET_USER_AGENT"]),Object(r["b"])("common",["getHotSubjects","getUserInfoWithWx"]),{fetch:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.fetch_content(this.$route.params);case 2:this.$player.init(".video",{muted:!1,preload:!0,autoPlay:!0,loop:!1});case 3:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),clickImg:function(t){var e=t.target;ENV.app&&e.dataset.index?Object(c["k"])(e.dataset.index):e.dataset.src&&this.clickImgOuter(e.dataset.src)},clickImgOuter:function(t){this.preSrc=t,this.preShow=!0},openClick:function(t){var e=t.target;e.classList;ENV.app&&e.dataset.vid&&e.dataset.uid?Object(c["b"])(e.dataset.uid,e.dataset.vid):e.dataset.index?this.clickImg(t):e.dataset.src&&!ENV.app&&this.clickImgOuter(e.dataset.src)},makeFileUrl:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return console.log("url",decodeURI(t)),Object(c["g"])(t)},listenToMyChild:function(t){this.preShow=t}}),mounted:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.$route.query.code&&(e={plateform:2,code:this.$route.query.code,protocol:"WEB_SOCKET",adid:Cookies.get("h5Adid")||"closer-t1"},console.log("params---",e),this.getUserInfoWithWx(e)),t.next=3,this.fetch();case 3:this.$store.dispatch("wx_config"),console.log("params.id:",this.$route.params.id),this.getHotSubjects();case 6:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},b=g,w=(i("4027"),i("2877")),_=Object(w["a"])(b,o,s,!1,null,"333a38bd",null);_.options.__file="index.vue";e["default"]=_.exports},ec55:function(t,e,i){t.exports=i.p+"img/open_browser.60911e5f.png"}}]);
//# sourceMappingURL=chunk-97cac646.078c5809.js.map
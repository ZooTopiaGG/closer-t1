(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2dc80172"],{1181:function(t,e,s){t.exports=s.p+"img/illustrations.082c27e0.png"},"1b7c":function(t,e,s){"use strict";var i=s("9d43"),n=s.n(i);n.a},"30d1":function(t,e,s){"use strict";var i=s("642c"),n=s.n(i);n.a},"386d":function(t,e,s){s("214f")("search",1,function(t,e,s){return[function(s){"use strict";var i=t(this),n=void 0==s?void 0:s[e];return void 0!==n?n.call(s,i):new RegExp(s)[e](String(i))},s]})},4008:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"not-found"},[t.isApp?s("div",{staticClass:"delete"},[s("div",{staticClass:"delete-icon"}),s("div",{staticClass:"subject-notfound"},[t._v("此贴子已被删除")]),s("div")]):s("div",{staticClass:"todown"},[t._m(0),t._m(1),s("div",{staticClass:"down-btn",on:{click:t.download}},[s("span",[t._v("立即下载")])]),t._m(2)])])},n=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"todown-top"},[i("img",{staticClass:"todown-top-left",attrs:{src:s("a8b7")}}),i("img",{staticClass:"todown-top-right",attrs:{src:s("ec55")}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"todown-body"},[s("div",[t._v("根据国家法律规定")]),s("div",[t._v("该文章只能在app中打开查看")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("img",{staticClass:"todown-bottom",attrs:{src:s("1181")}})])}],a=(s("28a5"),s("386d"),{name:"notFound",props:{isDelete:Boolean},computed:{isApp:function(){return this.ENV.app}},mounted:function(){this.initLoad()},methods:{initLoad:function(){var t=this;if(this.ENV.wx){var e=document.querySelector(".todown-top-right");e&&(e.style.display="block")}else this.ENV.wx||this.ENV.app||(document.querySelector(".down-btn").style.opacity=1,setTimeout(function(){t.download()},1500))},download:function(){location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer"},isWeiXin:function(){var t=navigator.userAgent.toLowerCase(),e=!1,s=!1,i=!1;return e=/micromessenger/i.test(t),s=/qq/i.test(t),/mqqbrowser/i.test(t)&&(s=!1),i=/weibo/i.test(t),e||s||i},getParam:function(t){var e="",s=!1;if(0==location.search.indexOf("?")&&location.search.indexOf("=")>1){var i=unescape(location.search).substring(1,location.search.length).split("&"),n=0;while(n<i.length&&!s)i[n].indexOf("=")>0&&i[n].split("=")[0].toLowerCase()==t.toLowerCase()&&(e=i[n].split("=")[1],s=!0),n++}return e}}}),o=a,c=(s("67f5"),s("2877")),r=Object(c["a"])(o,i,n,!1,null,"2e3e180d",null);r.options.__file="notfound.vue";e["a"]=r.exports},"545f":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.ENV.app||t.ENV.v120?t._e():s("section",{staticClass:"author-bar"},[3!=t.res.int_category?s("section",{staticClass:"author-list"},[t.res.nickname?s("p",[t._v("小编："+t._s(t.res.nickname))]):t._e(),t.res.authors?s("p",[t._v("作者："+t._s(t.res.authors)+" ")]):t._e()]):s("section",{staticClass:"author-list"},[s("p",[t._v("来自 "+t._s(t.res.className))])])])},n=[],a=s("c93e"),o=s("2f62"),c={props:{},data:function(){return{}},computed:Object(a["a"])({},Object(o["d"])(["res"]))},r=c,l=(s("30d1"),s("2877")),u=Object(l["a"])(r,i,n,!1,null,"2c4a8434",null);u.options.__file="authorBar.vue";e["a"]=u.exports},"5b90":function(t,e,s){},"642c":function(t,e,s){},"67f5":function(t,e,s){"use strict";var i=s("5b90"),n=s.n(i);n.a},"9d43":function(t,e,s){},a8b7:function(t,e,s){t.exports=s.p+"img/tiejin.ce32b504.png"},e878:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.subjectExist?s("div",[s("download-bar"),s("div",{staticClass:"comment"},[t.ENV.app?t._e():s("div",{staticClass:"title"},[t._v("\n        "+t._s(t.subject.title)+"\n      ")]),s("focus-bar",{attrs:{showTime:""}}),s("div",{staticClass:"comment-content"},[s("div",{staticClass:"cover-box"},[s("img",{staticClass:"cover-img",attrs:{src:t.fileUrlParse(t.subject.bigcover||t.subject.cover),alt:"","data-type":"preview"}})]),s("div",{directives:[{name:"lazy-container",rawName:"v-lazy-container",value:{selector:"img"},expression:"{ selector: 'img' }"}],staticClass:"content",domProps:{innerHTML:t._s(t.content.html)},on:{click:function(e){t.openClick(e)}}}),t._l(t.discuss,function(e,i){return s("div",{key:i,staticClass:"discuss"},[s("div",{staticClass:"discuss-content"},[s("div",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:t.fileUrlParse(e.avatar),expression:"fileUrlParse(item.avatar)",arg:"background-image"}],staticClass:"avatar"}),s("div",{staticClass:"info"},[s("div",{staticClass:"info-up"},[s("span",{staticClass:"nickname"},[t._v(t._s(e.nickname))])]),0===e.type?s("div",[e.weblink?s("div",{staticClass:"link",domProps:{innerHTML:t._s(e.newText)}}):s("div",{staticClass:"text"},[t._v("\n                  "+t._s(e.text)+"\n                ")])]):1===e.type?s("div",[(t.ENV.app,s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.fileUrlParse(e.image.link),expression:"fileUrlParse(item.image.link)"}],staticClass:"image",style:{height:73*e.image.height/e.image.width+"vw"},attrs:{src:t.defaultImg,"data-type":"preview"}}))]):s("video",{staticClass:"video-out",staticStyle:{"object-fit":"fill"},attrs:{src:e.video.src,preload:"auto",controls:"",poster:e.video.imageUrl,playsinline:"true","webkit-playsinline":"true","x5-playsinline":"true","x5-video-player-type":"h5","x5-video-player-fullscreen":"false","x5-video-orientation":"portraint"}})])]),s("div",{staticClass:"line"})])}),t.content.end_html?s("div",{directives:[{name:"lazy-container",rawName:"v-lazy-container",value:{selector:"img"},expression:"{ selector: 'img' }"}],staticClass:"content",domProps:{innerHTML:t._s(t.content.end_html)},on:{click:function(e){t.openClick(e)}}}):t._e()],2),s("author-bar")],1),s("like-bar",{staticClass:"like-bar"}),s("message-board"),s("feed-list",{attrs:{subjectList:t.hotSubjects}}),s("foot-bar")],1):s("Notfound",{attrs:{isDelete:t.subject.bool_delete}})],1)},n=[],a=(s("96cf"),s("3040")),o=s("c93e"),c=s("ed08"),r=s("2f62"),l=s("4008"),u=s("26a9"),d=s("fb25"),p=s("c64e"),m=s("1a18"),f=s("d862"),v=s("c3f2"),A=s("545f"),h={name:"commentIndex",components:{Notfound:l["a"],FeedList:u["a"],DownloadBar:d["a"],FocusBar:p["a"],LikeBar:m["a"],MessageBoard:f["a"],FootBar:v["a"],AuthorBar:A["a"]},data:function(){return{defaultImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",preSrc:"",preShow:!1}},created:function(){},computed:Object(o["a"])({},Object(r["d"])("comment",{subject:function(t){return t.subject},content:function(t){return t.content},discuss:function(t){return t.discuss},subjectExist:function(t){return t.subjectExist}}),Object(r["d"])("common",{hotSubjects:function(t){return t.hotSubjects}})),beforeMount:function(){this.$store.commit("GET_VERSION"),this.$store.commit("SET_ENTER_TIME",Date.now()),this.$store.state.h5Adid?Cookies.set("h5Adid",this.$store.state.h5Adid):Cookies.set("h5Adid","")},mounted:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(console.log("params.id:",this.$route.params.id),!this.$route.params.id){t.next=7;break}return t.next=4,this.getSubject({subjectid:this.$route.params.id});case 4:this.$store.dispatch("wx_config"),this.getHotSubjects(),this.$preview.init(".comment-content");case 7:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),methods:Object(o["a"])({},Object(r["b"])("common",["getHotSubjects"]),Object(r["b"])("comment",["getSubject"]),Object(r["b"])("common",["getHotSubjects"]),{fileUrlParse:function(t,e,s){return Object(c["g"])(t,e,s)},openClick:function(t){var e=t.target;console.log("openClick",e.dataset),e.dataset.vid&&e.dataset.uid&&Object(c["b"])(e.dataset.uid,e.dataset.vid)},tofeed:function(t){ENV.app?location.href="closer://feed/".concat(t):this.$router.push({path:"/feed/".concat(t,"?type=2")})},listenToMyChild:function(t){this.preShow=t}})},b=h,g=(s("1b7c"),s("2877")),_=Object(g["a"])(b,i,n,!1,null,"da9d1dc4",null);_.options.__file="index.vue";e["default"]=_.exports},ec55:function(t,e,s){t.exports=s.p+"img/open_browser.60911e5f.png"}}]);
//# sourceMappingURL=chunk-2dc80172.d9d36143.js.map
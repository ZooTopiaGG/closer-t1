(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-545d8ec5"],{"030e":function(t,e,i){},1181:function(t,e,i){t.exports=i.p+"img/illustrations.082c27e0.png"},"309e":function(t,e,i){"use strict";var s=i("f260"),a=i.n(s);a.a},"30d1":function(t,e,i){"use strict";var s=i("642c"),a=i.n(s);a.a},"386d":function(t,e,i){i("214f")("search",1,function(t,e,i){return[function(i){"use strict";var s=t(this),a=void 0==i?void 0:i[e];return void 0!==a?a.call(i,s):new RegExp(i)[e](String(s))},i]})},"545f":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.ENV.app||t.ENV.v120?t._e():i("section",{staticClass:"author-bar"},[3!=t.res.int_category?i("section",{staticClass:"author-list"},[t.res.nickname?i("p",[t._v("小编："+t._s(t.res.nickname))]):t._e(),t.res.authors?i("p",[t._v("作者："+t._s(t.res.authors)+" ")]):t._e()]):i("section",{staticClass:"author-list"},[i("p",[t._v("来自 "+t._s(t.res.className))])])])},a=[],n=i("c93e"),o=i("2f62"),c={props:{},data:function(){return{}},computed:Object(n["a"])({},Object(o["d"])(["res"]))},r=c,l=(i("30d1"),i("2877")),d=Object(l["a"])(r,s,a,!1,null,"2c4a8434",null);d.options.__file="authorBar.vue";e["a"]=d.exports},"642c":function(t,e,i){},"9c6b":function(t,e,i){"use strict";var s=i("030e"),a=i.n(s);a.a},a8b7:function(t,e,i){t.exports=i.p+"img/tiejin.ce32b504.png"},b007:function(t,e,i){"use strict";var s=i("bcb6"),a=i.n(s);a.a},bcb6:function(t,e,i){},e878:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t.subjectExist?i("div",[i("download-bar"),i("div",{staticClass:"comment"},[t.ENV.app?t._e():i("div",{staticClass:"title"},[t._v("\n        "+t._s(t.subject.title)+"\n      ")]),i("focus-bar",{attrs:{showTime:""}}),i("div",{staticClass:"cover-box"},[i("img",{staticClass:"cover-img",attrs:{src:t.fileUrlParse(t.subject.bigcover||t.subject.cover),alt:"","data-type":"preview"}})]),i("div",{directives:[{name:"lazy-container",rawName:"v-lazy-container",value:{selector:"img"},expression:"{ selector: 'img' }"}],staticClass:"content",domProps:{innerHTML:t._s(t.content.html)},on:{click:function(e){t.openClick(e)}}}),t._l(t.discuss,function(e,s){return i("div",{key:s,staticClass:"discuss"},[i("div",{staticClass:"discuss-content"},[i("div",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:t.fileUrlParse(e.avatar),expression:"fileUrlParse(item.avatar)",arg:"background-image"}],staticClass:"avatar"}),i("div",{staticClass:"info"},[i("div",{staticClass:"info-up"},[i("span",{staticClass:"nickname"},[t._v(t._s(e.nickname))])]),0===e.type?i("div",[e.weblink?i("div",{staticClass:"link",domProps:{innerHTML:t._s(e.newText)}}):i("div",{staticClass:"text"},[t._v("\n                "+t._s(e.text)+"\n              ")])]):1===e.type?i("div",[(t.ENV.app,i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.fileUrlParse(e.image.link),expression:"fileUrlParse(item.image.link)"}],staticClass:"image",style:{height:73*e.image.height/e.image.width+"vw"},attrs:{src:t.defaultImg,"data-type":"preview"},on:{click:function(e){t.clickImg(e)}}}))]):2===e.type?i("div",[t.ENV.app?i("div",{staticClass:"video",style:{background:"url("+e.video.imageUrl+") no-repeat center","background-size":"cover"},attrs:{"data-uid":e.video.src,"data-vid":e.video.vid},on:{click:function(e){t.openClick(e)}}},[i("div",{staticClass:"play-icon",attrs:{"data-uid":e.video.src,"data-vid":e.video.vid}})]):i("video",{staticClass:"video-out",staticStyle:{"object-fit":"fill"},attrs:{src:e.video.src,preload:"auto",controls:"",poster:e.video.imageUrl,playsinline:"true","webkit-playsinline":"true"}})]):3===e.type?i("div",[i("div",{staticClass:"feed",on:{click:function(i){t.tofeed(e.feed.feedId)}}},[i("img",{staticClass:"feed-img",attrs:{src:t.fileUrlParse(e.feed.imageUrl)}}),i("div",{staticClass:"feed-info"},[i("div",{staticClass:"feed-title"},[t._v(t._s(e.feed.title))]),i("div",{staticClass:"feed-summary"},[t._v(t._s(e.feed.summary))])])])]):t._e()])]),i("div",{staticClass:"line"})])}),t.content.end_html?i("div",{directives:[{name:"lazy-container",rawName:"v-lazy-container",value:{selector:"img"},expression:"{ selector: 'img' }"}],staticClass:"content",domProps:{innerHTML:t._s(t.content.end_html)},on:{click:function(e){t.openClick(e)}}}):t._e(),i("author-bar")],2),i("like-bar",{staticClass:"like-bar"}),i("message-board"),i("feed-list",{attrs:{subjectList:t.hotSubjects}}),i("foot-bar"),i("preview-list",{attrs:{"preview-src":t.preSrc,"preview-show":t.preShow},on:{"preview-show":t.listenToMyChild}})],1):i("Notfound",{attrs:{isDelete:t.subject.bool_delete}})],1)},a=[],n=(i("96cf"),i("3040")),o=i("c93e"),c=i("ed08"),r=i("2f62"),l=i("f8a4"),d=i("26a9"),u=i("fb25"),p=i("c64e"),v=i("1a18"),f=i("d862"),m=i("c3f2"),A=i("545f"),h=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.previewShow?i("transition",{attrs:{name:"fade"},on:{click:t.leave}},[i("section",{staticClass:"lg-preview-wrapper",on:{click:t.leave}},[i("img",{staticClass:"lg-preview-img",attrs:{src:t.previewSrc}})])]):t._e()},g=[],b={name:"Preview",props:["previewSrc","previewShow"],data:function(){return{}},methods:{leave:function(t){this.$emit("preview-show",!1)}}},w=b,_=(i("b007"),i("2877")),C=Object(_["a"])(w,h,g,!1,null,"094720d6",null);C.options.__file="previewList.vue";var k=C.exports,j={name:"commentIndex",components:{Notfound:l["a"],FeedList:d["a"],DownloadBar:u["a"],FocusBar:p["a"],LikeBar:v["a"],MessageBoard:f["a"],FootBar:m["a"],AuthorBar:A["a"],PreviewList:k},data:function(){return{defaultImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",preSrc:"",preShow:!1}},created:function(){},computed:Object(o["a"])({},Object(r["d"])("comment",{subject:function(t){return t.subject},content:function(t){return t.content},discuss:function(t){return t.discuss},subjectExist:function(t){return t.subjectExist}}),Object(r["d"])("common",{hotSubjects:function(t){return t.hotSubjects}})),beforeMount:function(){this.$store.commit("GET_VERSION"),this.$store.commit("SET_ENTER_TIME",Date.now()),this.$store.state.h5Adid?Cookies.set("h5Adid",this.$store.state.h5Adid):Cookies.set("h5Adid","")},mounted:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(console.log("params.id:",this.$route.params.id),!this.$route.params.id){t.next=7;break}return t.next=4,this.getSubject({subjectid:this.$route.params.id});case 4:this.$store.dispatch("wx_config"),this.getHotSubjects(),this.$preview.init(".comment");case 7:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),watch:{$route:function(t,e){this.$router.go(0)}},methods:Object(o["a"])({},Object(r["b"])("common",["getHotSubjects"]),Object(r["b"])("comment",["getSubject"]),Object(r["b"])("common",["getHotSubjects"]),{fileUrlParse:function(t,e,i){return Object(c["g"])(t,e,i)},openClick:function(t){var e=t.target;console.log("openClick",e.dataset),e.dataset.vid&&e.dataset.uid?Object(c["b"])(e.dataset.uid,e.dataset.vid):e.dataset.index&&ENV.app?this.clickImg(t):e.dataset.src&&!ENV.app&&this.clickImgOuter(e.dataset.src)},clickImg:function(t){var e=t.target;console.log("target",e.dataset),ENV.app&&e.dataset.index?Object(c["k"])(e.dataset.index):e.dataset.src&&this.clickImgOuter(e.dataset.src)},clickImgOuter:function(t){this.preSrc=t,this.preShow=!0},tofeed:function(t){ENV.app?location.href="closer://feed/".concat(t):this.$router.push({path:"/feed/".concat(t,"?type=2")})},listenToMyChild:function(t){this.preShow=t}})},x=j,y=(i("9c6b"),Object(_["a"])(x,s,a,!1,null,"ef15c576",null));y.options.__file="index.vue";e["default"]=y.exports},ec55:function(t,e,i){t.exports=i.p+"img/open_browser.60911e5f.png"},f260:function(t,e,i){},f8a4:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"not-found"},[t.isApp?i("div",{staticClass:"delete"},[i("div",{staticClass:"delete-icon"}),i("div",{staticClass:"subject-notfound"},[t._v("此贴子已被删除")]),i("div")]):i("div",{staticClass:"todown"},[t._m(0),t._m(1),i("div",{staticClass:"down-btn",on:{click:t.download}},[i("span",[t._v("立即下载")])]),t._m(2)])])},a=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"todown-top"},[s("img",{staticClass:"todown-top-left",attrs:{src:i("a8b7")}}),s("img",{staticClass:"todown-top-right",attrs:{src:i("ec55")}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"todown-body"},[i("div",[t._v("根据国家法律规定")]),i("div",[t._v("该文章只能在app中打开查看")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("img",{staticClass:"todown-bottom",attrs:{src:i("1181")}})])}],n=(i("28a5"),i("386d"),{name:"notFound",props:{isDelete:Boolean},computed:{isApp:function(){return this.ENV.app}},mounted:function(){this.initLoad()},methods:{initLoad:function(){var t=this;if(this.ENV.wx){var e=document.querySelector(".todown-top-right");e&&(e.style.display="block")}else this.ENV.wx||this.ENV.app||(document.querySelector(".down-btn").style.opacity=1,setTimeout(function(){t.download()},1500))},download:function(){location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer"},isWeiXin:function(){var t=navigator.userAgent.toLowerCase(),e=!1,i=!1,s=!1;return e=/micromessenger/i.test(t),i=/qq/i.test(t),/mqqbrowser/i.test(t)&&(i=!1),s=/weibo/i.test(t),e||i||s},getParam:function(t){var e="",i=!1;if(0==location.search.indexOf("?")&&location.search.indexOf("=")>1){var s=unescape(location.search).substring(1,location.search.length).split("&"),a=0;while(a<s.length&&!i)s[a].indexOf("=")>0&&s[a].split("=")[0].toLowerCase()==t.toLowerCase()&&(e=s[a].split("=")[1],i=!0),a++}return e}}}),o=n,c=(i("309e"),i("2877")),r=Object(c["a"])(o,s,a,!1,null,"d192a418",null);r.options.__file="notfound.vue";e["a"]=r.exports}}]);
//# sourceMappingURL=chunk-545d8ec5.1e4ecba3.js.map
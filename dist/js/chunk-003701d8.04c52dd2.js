(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-003701d8"],{1181:function(t,e,s){t.exports=s.p+"img/illustrations.082c27e0.png"},"309e":function(t,e,s){"use strict";var i=s("f260"),a=s.n(i);a.a},"30d1":function(t,e,s){"use strict";var i=s("642c"),a=s.n(i);a.a},"386d":function(t,e,s){s("214f")("search",1,function(t,e,s){return[function(s){"use strict";var i=t(this),a=void 0==s?void 0:s[e];return void 0!==a?a.call(s,i):new RegExp(s)[e](String(i))},s]})},"545f":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.ENV.app||t.ENV.v120?t._e():s("section",{staticClass:"author-bar"},[3!=t.res.int_category?s("section",{staticClass:"author-list"},[t.res.nickname?s("p",[t._v("小编："+t._s(t.res.nickname))]):t._e(),t.res.authors?s("p",[t._v("作者："+t._s(t.res.authors)+" ")]):t._e()]):s("section",{staticClass:"author-list"},[s("p",[t._v("来自 "+t._s(t.res.className))])])])},a=[],o=s("be94"),n=s("2f62"),r={props:{},data:function(){return{}},computed:Object(o["a"])({},Object(n["d"])(["res"]))},c=r,l=(s("30d1"),s("2877")),d=Object(l["a"])(c,i,a,!1,null,"2c4a8434",null);d.options.__file="authorBar.vue";e["a"]=d.exports},"60e8":function(t,e,s){},"642c":function(t,e,s){},a8b7:function(t,e,s){t.exports=s.p+"img/tiejin.ce32b504.png"},b007:function(t,e,s){"use strict";var i=s("bcb6"),a=s.n(i);a.a},ba58:function(t,e,s){"use strict";var i=s("60e8"),a=s.n(i);a.a},bcb6:function(t,e,s){},e878:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[this.$store.state.exist?s("div",[s("download-bar"),s("div",{staticClass:"comment"},[t.ENV.app?t._e():s("div",{staticClass:"title"},[t._v("\n        "+t._s(this.$store.state.res.title)+"\n      ")]),s("focus-bar",{attrs:{showTime:""}}),s("div",{staticClass:"cover-box"},[s("img",{staticClass:"cover-img",attrs:{src:t.fileUrlParse(this.$store.state.res.bigcover||this.$store.state.res.cover),alt:"","data-type":"preview"}})]),s("div",{directives:[{name:"lazy-container",rawName:"v-lazy-container",value:{selector:"img"},expression:"{ selector: 'img' }"}],staticClass:"content",domProps:{innerHTML:t._s(this.$store.state.content.html)},on:{click:function(e){t.openClick(e)}}}),t._l(this.$store.state.discuss,function(e,i){return s("div",{key:i,staticClass:"discuss"},[s("div",{staticClass:"discuss-content"},[s("div",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:t.fileUrlParse(e.avatar),expression:"fileUrlParse(item.avatar)",arg:"background-image"}],staticClass:"avatar"}),s("div",{staticClass:"info"},[s("div",{staticClass:"info-up"},[s("span",{staticClass:"nickname"},[t._v(t._s(e.nickname))])]),0===e.type?s("div",[e.weblink?s("div",{staticClass:"link",domProps:{innerHTML:t._s(e.newText)}}):s("div",{staticClass:"text"},[t._v("\n                "+t._s(e.text)+"\n              ")])]):1===e.type?s("div",[(t.ENV.app,s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.fileUrlParse(e.image.link),expression:"fileUrlParse(item.image.link)"}],staticClass:"image",style:{height:73*e.image.height/e.image.width+"vw"},attrs:{src:t.defaultImg,"data-type":"preview"}}))]):2===e.type?s("div",[t.ENV.app?s("div",{staticClass:"video",style:{background:"url("+e.video.imageUrl+") no-repeat center","background-size":"cover"},attrs:{"data-uid":e.video.src,"data-vid":e.video.vid},on:{click:function(e){t.openClick(e)}}},[s("div",{staticClass:"play-icon",attrs:{"data-uid":e.video.src,"data-vid":e.video.vid}})]):s("video",{staticClass:"video-out",staticStyle:{"object-fit":"fill"},attrs:{src:e.video.src,preload:"auto",controls:"",poster:e.video.imageUrl,playsinline:"true","webkit-playsinline":"true"}})]):3===e.type?s("div",[s("div",{staticClass:"feed",on:{click:function(s){t.tofeed(e.feed.feedId)}}},[s("img",{staticClass:"feed-img",attrs:{src:t.fileUrlParse(e.feed.imageUrl)}}),s("div",{staticClass:"feed-info"},[s("div",{staticClass:"feed-title"},[t._v(t._s(e.feed.title))]),s("div",{staticClass:"feed-summary"},[t._v(t._s(e.feed.summary))])])])]):t._e()])]),s("div",{staticClass:"line"})])}),this.$store.state.end_html?s("div",{directives:[{name:"lazy-container",rawName:"v-lazy-container",value:{selector:"img"},expression:"{ selector: 'img' }"}],staticClass:"content",domProps:{innerHTML:t._s(this.$store.state.content.end_html)},on:{click:function(e){t.openClick(e)}}}):t._e(),s("author-bar")],2),s("like-bar",{staticClass:"like-bar"}),s("message-board"),s("feed-list",{attrs:{subject:t.hotSubjects}}),s("foot-bar"),s("preview-list",{attrs:{"preview-src":t.preSrc,"preview-show":t.preShow},on:{"preview-show":t.listenToMyChild}})],1):s("Notfound",{attrs:{isDelete:this.$store.state.res.bool_delete}})],1)},a=[],o=(s("96cf"),s("1da1")),n=s("be94"),r=s("ed08"),c=s("2f62"),l=s("f8a4"),d=s("26a9"),u=s("fb25"),v=s("c64e"),p=s("1a18"),f=s("d862"),m=s("c3f2"),h=s("545f"),A=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.previewShow?s("transition",{attrs:{name:"fade"},on:{click:t.leave}},[s("section",{staticClass:"lg-preview-wrapper",on:{click:t.leave}},[s("img",{staticClass:"lg-preview-img",attrs:{src:t.previewSrc}})])]):t._e()},g=[],w={name:"Preview",props:["previewSrc","previewShow"],data:function(){return{}},methods:{leave:function(t){this.$emit("preview-show",!1)}}},b=w,_=(s("b007"),s("2877")),C=Object(_["a"])(b,A,g,!1,null,"094720d6",null);C.options.__file="previewList.vue";var k=C.exports,y={name:"commentIndex",components:{Notfound:l["a"],FeedList:d["a"],DownloadBar:u["a"],FocusBar:v["a"],LikeBar:p["a"],MessageBoard:f["a"],FootBar:m["a"],AuthorBar:h["a"],PreviewList:k},data:function(){return{defaultImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",preSrc:"",preShow:!1}},created:function(){},computed:Object(n["a"])({},Object(c["d"])("common",{hotSubjects:function(t){return t.hotSubjects}})),beforeMount:function(){this.$store.commit("GET_VERSION"),this.$store.commit("SET_ENTER_TIME",Date.now()),this.$store.state.h5Adid?Cookies.set("h5Adid",this.$store.state.h5Adid):Cookies.set("h5Adid","")},mounted:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(console.log("params.id:",this.$route.params.id),!this.$route.params.id){t.next=10;break}return e={subjectid:this.$route.params.id},this.$route.query.udid&&this.$route.query.sto&&(e["udid"]=this.$route.query.udid,e["sto"]=this.$route.query.sto),t.next=6,this.fetch_content(e);case 6:this.$store.dispatch("wx_config"),this.getHotSubjects(),this.$preview.init(".comment"),console.info("mapstate",c["d"]);case 10:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),watch:{$route:function(t,e){this.$router.go(0)}},methods:Object(n["a"])({},Object(c["b"])("common",["getHotSubjects","fetch_content"]),{fileUrlParse:function(t,e,s){return Object(r["g"])(t,e,s)},openClick:function(t){var e=t.target;console.log("openClick",e.dataset),e.dataset.vid&&e.dataset.uid&&Object(r["b"])(e.dataset.uid,e.dataset.vid)},clickImg:function(t){var e=t.target;console.log("target",e.dataset),ENV.app&&e.dataset.index?Object(r["k"])(e.dataset.index):e.dataset.src&&this.clickImgOuter(e.dataset.src)},clickImgOuter:function(t){this.preSrc=t,this.preShow=!0},tofeed:function(t){ENV.app?location.href="closer://feed/".concat(t):this.$router.push({path:"/feed/".concat(t,"?type=2")})},listenToMyChild:function(t){this.preShow=t}})},x=y,$=(s("ba58"),Object(_["a"])(x,i,a,!1,null,"5a207487",null));$.options.__file="index.vue";e["default"]=$.exports},ec55:function(t,e,s){t.exports=s.p+"img/open_browser.60911e5f.png"},f260:function(t,e,s){},f8a4:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"not-found"},[t.isApp?s("div",{staticClass:"delete"},[s("div",{staticClass:"delete-icon"}),s("div",{staticClass:"subject-notfound"},[t._v("此贴子已被删除")]),s("div")]):s("div",{staticClass:"todown"},[t._m(0),t._m(1),s("div",{staticClass:"down-btn",on:{click:t.download}},[s("span",[t._v("立即下载")])]),t._m(2)])])},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"todown-top"},[i("img",{staticClass:"todown-top-left",attrs:{src:s("a8b7")}}),i("img",{staticClass:"todown-top-right",attrs:{src:s("ec55")}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"todown-body"},[s("div",[t._v("根据国家法律规定")]),s("div",[t._v("该文章只能在app中打开查看")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("img",{staticClass:"todown-bottom",attrs:{src:s("1181")}})])}],o=(s("28a5"),s("386d"),{name:"notFound",props:{isDelete:Boolean},computed:{isApp:function(){return this.ENV.app}},mounted:function(){this.initLoad()},methods:{initLoad:function(){var t=this;if(this.ENV.wx){var e=document.querySelector(".todown-top-right");e&&(e.style.display="block")}else this.ENV.wx||this.ENV.app||(document.querySelector(".down-btn").style.opacity=1,setTimeout(function(){t.download()},1500))},download:function(){location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer"},isWeiXin:function(){var t=navigator.userAgent.toLowerCase(),e=!1,s=!1,i=!1;return e=/micromessenger/i.test(t),s=/qq/i.test(t),/mqqbrowser/i.test(t)&&(s=!1),i=/weibo/i.test(t),e||s||i},getParam:function(t){var e="",s=!1;if(0==location.search.indexOf("?")&&location.search.indexOf("=")>1){var i=unescape(location.search).substring(1,location.search.length).split("&"),a=0;while(a<i.length&&!s)i[a].indexOf("=")>0&&i[a].split("=")[0].toLowerCase()==t.toLowerCase()&&(e=i[a].split("=")[1],s=!0),a++}return e}}}),n=o,r=(s("309e"),s("2877")),c=Object(r["a"])(n,i,a,!1,null,"d192a418",null);c.options.__file="notfound.vue";e["a"]=c.exports}}]);
//# sourceMappingURL=chunk-003701d8.04c52dd2.js.map
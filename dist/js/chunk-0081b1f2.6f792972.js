(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0081b1f2"],{"055e":function(t,e,s){"use strict";var i=s("a82b"),o=s.n(i);o.a},1181:function(t,e,s){t.exports=s.p+"img/illustrations.082c27e0.png"},"309e":function(t,e,s){"use strict";var i=s("f260"),o=s.n(i);o.a},"30d1":function(t,e,s){"use strict";var i=s("642c"),o=s.n(i);o.a},"386d":function(t,e,s){s("214f")("search",1,function(t,e,s){return[function(s){"use strict";var i=t(this),o=void 0==s?void 0:s[e];return void 0!==o?o.call(s,i):new RegExp(s)[e](String(i))},s]})},"545f":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.ENV.app||t.ENV.v120?t._e():s("section",{staticClass:"author-bar"},[3!=t.res.int_category?s("section",{staticClass:"author-list"},[t.res.nickname?s("p",[t._v("小编："+t._s(t.res.nickname))]):t._e(),t.res.authors?s("p",[t._v("作者："+t._s(t.res.authors)+" ")]):t._e()]):s("section",{staticClass:"author-list"},[s("p",[t._v("来自 "+t._s(t.res.className))])])])},o=[],a=s("c93e"),n=s("2f62"),r={props:{},data:function(){return{}},computed:Object(a["a"])({},Object(n["d"])(["res"]))},c=r,d=(s("30d1"),s("2877")),u=Object(d["a"])(c,i,o,!1,null,"2c4a8434",null);u.options.__file="authorBar.vue";e["a"]=u.exports},"642c":function(t,e,s){},a82b:function(t,e,s){},a8b7:function(t,e,s){t.exports=s.p+"img/tiejin.ce32b504.png"},bb25:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[this.$store.state.exist?s("section",{staticClass:"video"},[s("download-bar",{attrs:{placeholder:t.videoInfo.height/t.videoInfo.width<1}}),s("section",{staticClass:"video-wrap"},[s("div",{staticClass:"video-main"},[s("video",{staticStyle:{width:"100%"},attrs:{src:t.videoInfo.src,"data-duration":t.videoInfo.duration,width:t.videoInfo.width,height:t.videoInfo.height,poster:t.videoInfo.img,controls:""}})]),s("section",{staticClass:"video-container bg-f"},[s("focus-bar",{staticClass:"focus-bar",attrs:{showTime:""}}),s("div",{directives:[{name:"lazy-container",rawName:"v-lazy-container",value:{selector:"img"},expression:"{ selector: 'img' }"}],staticClass:"content",on:{click:function(e){t.openClick(e)}}},[this.$store.state.res.bigcover||this.$store.state.res.cover?s("div",{staticClass:"video-cover-box"},[s("img",{staticClass:"video-cover-img",attrs:{"data-src":t.makeFileUrl(this.$store.state.res.bigcover||this.$store.state.res.cover)}})]):t._e(),s("div",{staticClass:"video-content",domProps:{innerHTML:t._s(this.$store.state.content.text)}})]),s("author-bar")],1),s("like-bar",{staticClass:"like-bar",attrs:{author:!0}}),s("message-board"),s("feed-list",{attrs:{subjectList:t.hotSubjects}}),s("foot-bar")],1)],1):s("Notfound",{attrs:{isDelete:this.$store.state.res.bool_delete}})],1)},o=[],a=(s("96cf"),s("3040")),n=s("c93e"),r=(s("cadf"),s("551c"),s("097d"),s("a78e"),s("2f62")),c=s("ed08"),d=s("f8a4"),u=s("fb25"),l=s("c3f2"),h=s("c64e"),f=s("1a18"),p=s("d862"),A=s("26a9"),v=s("545f"),m={components:{DownloadBar:u["a"],FootBar:l["a"],Notfound:d["a"],FocusBar:h["a"],LikeBar:f["a"],MessageBoard:p["a"],FeedList:A["a"],AuthorBar:v["a"]},data:function(){return{defaultImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",vid:"",video:{},playIconTimer:null,preSrc:"",preShow:!1}},computed:Object(n["a"])({},Object(r["d"])("common",{hotSubjects:function(t){return t.hotSubjects}}),{videoInfo:function(){var t=this.$store.state.content.videos&&this.$store.state.content.videos[0]||{};return console.log("video.duration",t.duration),{src:t.src,img:t.imageUrl,duration:t.duration,width:t.width,height:t.height}}}),methods:Object(n["a"])({},Object(r["c"])("video",["GET_USER_AGENT"]),Object(r["b"])("common",["getHotSubjects","getUserInfoWithWx","fetch_content"]),{fetch:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e={subjectid:this.$route.params.id},this.$route.query.udid&&this.$route.query.sto&&(e["udid"]=this.$route.query.udid,e["sto"]=this.$route.query.sto),t.next=4,this.fetch_content(e);case 4:this.$player.init(".video",{muted:!1,preload:!0,autoPlay:!0,loop:!1});case 5:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),clickImg:function(t){var e=t.target;ENV.app&&e.dataset.index?Object(c["k"])(e.dataset.index):e.dataset.src&&this.clickImgOuter(e.dataset.src)},clickImgOuter:function(t){this.preSrc=t,this.preShow=!0},openClick:function(t){var e=t.target;e.classList;ENV.app&&e.dataset.vid&&e.dataset.uid?Object(c["b"])(e.dataset.uid,e.dataset.vid):e.dataset.index?this.clickImg(t):e.dataset.src&&!ENV.app&&this.clickImgOuter(e.dataset.src)},makeFileUrl:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return console.log("url",decodeURI(t)),Object(c["g"])(t)},listenToMyChild:function(t){this.preShow=t}}),mounted:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.$route.query.code&&(e={plateform:2,code:this.$route.query.code,protocol:"WEB_SOCKET",adid:Cookies.get("h5Adid")||"closer-t1"},console.log("params---",e),this.getUserInfoWithWx(e)),t.next=3,this.fetch();case 3:this.$store.dispatch("wx_config"),console.log("params.id:",this.$route.params.id),this.getHotSubjects();case 6:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},g=m,b=(s("055e"),s("2877")),w=Object(b["a"])(g,i,o,!1,null,"3e0e5eb3",null);w.options.__file="index.vue";e["default"]=w.exports},ec55:function(t,e,s){t.exports=s.p+"img/open_browser.60911e5f.png"},f260:function(t,e,s){},f8a4:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"not-found"},[t.isApp?s("div",{staticClass:"delete"},[s("div",{staticClass:"delete-icon"}),s("div",{staticClass:"subject-notfound"},[t._v("此贴子已被删除")]),s("div")]):s("div",{staticClass:"todown"},[t._m(0),t._m(1),s("div",{staticClass:"down-btn",on:{click:t.download}},[s("span",[t._v("立即下载")])]),t._m(2)])])},o=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"todown-top"},[i("img",{staticClass:"todown-top-left",attrs:{src:s("a8b7")}}),i("img",{staticClass:"todown-top-right",attrs:{src:s("ec55")}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"todown-body"},[s("div",[t._v("根据国家法律规定")]),s("div",[t._v("该文章只能在app中打开查看")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("img",{staticClass:"todown-bottom",attrs:{src:s("1181")}})])}],a=(s("28a5"),s("386d"),{name:"notFound",props:{isDelete:Boolean},computed:{isApp:function(){return this.ENV.app}},mounted:function(){this.initLoad()},methods:{initLoad:function(){var t=this;if(this.ENV.wx){var e=document.querySelector(".todown-top-right");e&&(e.style.display="block")}else this.ENV.wx||this.ENV.app||(document.querySelector(".down-btn").style.opacity=1,setTimeout(function(){t.download()},1500))},download:function(){location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer"},isWeiXin:function(){var t=navigator.userAgent.toLowerCase(),e=!1,s=!1,i=!1;return e=/micromessenger/i.test(t),s=/qq/i.test(t),/mqqbrowser/i.test(t)&&(s=!1),i=/weibo/i.test(t),e||s||i},getParam:function(t){var e="",s=!1;if(0==location.search.indexOf("?")&&location.search.indexOf("=")>1){var i=unescape(location.search).substring(1,location.search.length).split("&"),o=0;while(o<i.length&&!s)i[o].indexOf("=")>0&&i[o].split("=")[0].toLowerCase()==t.toLowerCase()&&(e=i[o].split("=")[1],s=!0),o++}return e}}}),n=a,r=(s("309e"),s("2877")),c=Object(r["a"])(n,i,o,!1,null,"d192a418",null);c.options.__file="notfound.vue";e["a"]=c.exports}}]);
//# sourceMappingURL=chunk-0081b1f2.6f792972.js.map
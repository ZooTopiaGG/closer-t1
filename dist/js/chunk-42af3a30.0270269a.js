(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-42af3a30"],{1181:function(t,e,s){t.exports=s.p+"img/illustrations.082c27e0.png"},"1ab4":function(t,e,s){},"23a2":function(t,e,s){"use strict";var i=s("1ab4"),a=s.n(i);a.a},"30d1":function(t,e,s){"use strict";var i=s("642c"),a=s.n(i);a.a},"386d":function(t,e,s){s("214f")("search",1,function(t,e,s){return[function(s){"use strict";var i=t(this),a=void 0==s?void 0:s[e];return void 0!==a?a.call(s,i):new RegExp(s)[e](String(i))},s]})},4008:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"not-found"},[t.isApp?s("div",{staticClass:"delete"},[s("div",{staticClass:"delete-icon"}),s("div",{staticClass:"subject-notfound"},[t._v("此贴子已被删除")]),s("div")]):s("div",{staticClass:"todown"},[t._m(0),t._m(1),s("div",{staticClass:"down-btn",on:{click:t.download}},[s("span",[t._v("立即下载")])]),t._m(2)])])},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"todown-top"},[i("img",{staticClass:"todown-top-left",attrs:{src:s("a8b7")}}),i("img",{staticClass:"todown-top-right",attrs:{src:s("ec55")}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"todown-body"},[s("div",[t._v("根据国家法律规定")]),s("div",[t._v("该文章只能在app中打开查看")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("img",{staticClass:"todown-bottom",attrs:{src:s("1181")}})])}],n=(s("28a5"),s("386d"),{name:"notFound",props:{isDelete:Boolean},computed:{isApp:function(){return this.ENV.app}},mounted:function(){this.initLoad()},methods:{initLoad:function(){var t=this;if(this.ENV.wx){var e=document.querySelector(".todown-top-right");e&&(e.style.display="block")}else this.ENV.wx||this.ENV.app||(document.querySelector(".down-btn").style.opacity=1,setTimeout(function(){t.download()},1500))},download:function(){location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer"},isWeiXin:function(){var t=navigator.userAgent.toLowerCase(),e=!1,s=!1,i=!1;return e=/micromessenger/i.test(t),s=/qq/i.test(t),/mqqbrowser/i.test(t)&&(s=!1),i=/weibo/i.test(t),e||s||i},getParam:function(t){var e="",s=!1;if(0==location.search.indexOf("?")&&location.search.indexOf("=")>1){var i=unescape(location.search).substring(1,location.search.length).split("&"),a=0;while(a<i.length&&!s)i[a].indexOf("=")>0&&i[a].split("=")[0].toLowerCase()==t.toLowerCase()&&(e=i[a].split("=")[1],s=!0),a++}return e}}}),o=n,r=(s("67f5"),s("2877")),c=Object(r["a"])(o,i,a,!1,null,"2e3e180d",null);c.options.__file="notfound.vue";e["a"]=c.exports},"545f":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.ENV.app||t.ENV.v120?t._e():s("section",{staticClass:"author-bar"},[3!=t.res.int_category?s("section",{staticClass:"author-list"},[t.res.nickname?s("p",[t._v("小编："+t._s(t.res.nickname))]):t._e(),t.res.authors?s("p",[t._v("作者："+t._s(t.res.authors)+" ")]):t._e()]):s("section",{staticClass:"author-list"},[s("p",[t._v("来自 "+t._s(t.res.className))])])])},a=[],n=s("c93e"),o=s("2f62"),r={props:{},data:function(){return{}},computed:Object(n["a"])({},Object(o["d"])(["res"]))},c=r,u=(s("30d1"),s("2877")),l=Object(u["a"])(c,i,a,!1,null,"2c4a8434",null);l.options.__file="authorBar.vue";e["a"]=l.exports},"5b90":function(t,e,s){},"642c":function(t,e,s){},"67f5":function(t,e,s){"use strict";var i=s("5b90"),a=s.n(i);a.a},8927:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.exist?s("section",{staticClass:"article"},[s("download-bar"),s("section",{staticClass:"article-wrap"},[s("section",{staticClass:"article-container bg-f"},[t.ENV.app?t._e():s("section",{staticClass:"article-title"},[t._v(" "+t._s(t.res.title)+" ")]),s("focus-bar",{staticClass:"focus-bar",attrs:{showTime:""}}),s("div",{directives:[{name:"lazy-container",rawName:"v-lazy-container",value:{selector:"img"},expression:"{ selector: 'img' }"}],staticClass:"article-content",on:{click:function(e){t.openClick(e)}}},[t.cover?s("div",{staticClass:"article-cover-box"},[s("img",{staticClass:"article-cover-img",attrs:{"data-src":t.makeFileUrl(t.cover),"data-type":"preview"}})]):t._e(),s("div",{staticClass:"content",domProps:{innerHTML:t._s(t.content.html)}})]),s("author-bar")],1),s("like-bar",{staticClass:"like-bar",attrs:{author:!0}}),s("feed-list",{attrs:{subjectList:t.hotSubjects}}),s("message-board"),s("foot-bar")],1)],1):s("Notfound",{attrs:{isDelete:t.res.bool_delete}})],1)},a=[],n=(s("96cf"),s("3040")),o=s("c93e"),r=(s("cadf"),s("551c"),s("097d"),s("a78e"),s("2f62")),c=s("ed08"),u=s("4008"),l=s("fb25"),d=s("c3f2"),A=s("c64e"),p=s("1a18"),f=s("d862"),h=s("26a9"),v=s("545f"),m={name:"Feed",components:{DownloadBar:l["a"],FootBar:d["a"],Notfound:u["a"],FocusBar:A["a"],LikeBar:p["a"],MessageBoard:f["a"],FeedList:h["a"],AuthorBar:v["a"]},data:function(){return{defaultImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",vid:"",preSrc:"",preShow:!1}},computed:Object(o["a"])({},Object(r["d"])("article",["res","content","GET_MESSAGE_STATE","version_1_2","agent","exist"]),Object(r["d"])("common",{hotSubjects:function(t){return t.hotSubjects}}),Object(r["d"])(["CONTENT_IMGS"]),{cover:function(){return!(this.ENV.app&&!this.res.bigcover)&&(this.res.bigcover||this.res.cover)}}),methods:Object(o["a"])({},Object(r["b"])("article",["fetch_content"]),Object(r["c"])("article",["GET_USER_AGENT"]),Object(r["b"])("common",["getHotSubjects","getUserInfoWithWx"]),{fetch:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return console.log("fetch"),t.next=3,this.fetch_content(this.$route.params);case 3:this.$player.init(".content",{muted:!1,preload:!0,autoPlay:!0,loop:!1});case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),clickImg:function(t){var e=t.target;this.ENV.app&&e.dataset.index?Object(c["k"])(e.dataset.index):e.dataset.src&&this.clickImgOuter(e.dataset.src)},clickImgOuter:function(t){this.preSrc=t,this.preShow=!0},openClick:function(t){var e=t.target;e.classList;this.ENV.app&&e.dataset.vid&&e.dataset.uid&&Object(c["b"])(e.dataset.uid,e.dataset.vid)},makeFileUrl:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return Object(c["g"])(t)},listenToMyChild:function(t){this.preShow=t}}),mounted:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.$route.query.code&&(e={plateform:2,code:this.$route.query.code,protocol:"WEB_SOCKET",adid:Cookies.get("h5Adid")||"closer-t1"},this.getUserInfoWithWx(e)),t.next=3,this.fetch();case 3:this.$store.dispatch("wx_config"),this.getHotSubjects(),this.$preview.init(".article-content");case 6:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},b=m,g=(s("23a2"),s("2877")),_=Object(g["a"])(b,i,a,!1,null,null,null);_.options.__file="index.vue";e["default"]=_.exports},a8b7:function(t,e,s){t.exports=s.p+"img/tiejin.ce32b504.png"},ec55:function(t,e,s){t.exports=s.p+"img/open_browser.60911e5f.png"}}]);
//# sourceMappingURL=chunk-42af3a30.0270269a.js.map
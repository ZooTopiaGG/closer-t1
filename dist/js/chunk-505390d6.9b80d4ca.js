(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-505390d6"],{"1cb7":function(t,e,a){},8927:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.exist?a("section",{staticClass:"article"},[a("download-bar"),a("section",{staticClass:"article-wrap"},[a("section",{staticClass:"article-container bg-f"},[t.ENV.app?t._e():a("section",{staticClass:"article-title"},[t._v(" "+t._s(t.res.title)+" ")]),a("focus-bar",{staticClass:"focus-bar"}),a("div",{staticClass:"article-cover-box"},[a("img",{staticClass:"article-cover-img",attrs:{src:t.makeFileUrl(t.res.bigcover||t.res.cover),alt:""}})]),a("section",{directives:[{name:"lazy-container",rawName:"v-lazy-container",value:{selector:"img"},expression:"{ selector: 'img' }"}],staticClass:"content article-content",domProps:{innerHTML:t._s(t.content.html)},on:{click:function(e){t.openClick(e)}}}),a("author-bar")],1),a("like-bar",{staticClass:"like-bar"}),a("feed-list",{attrs:{subjectList:t.hotSubjects}}),a("message-board"),a("foot-bar"),a("preview-list",{attrs:{"preview-src":t.preSrc,"preview-show":t.preShow},on:{"preview-show":t.listenToMyChild}})],1)],1):a("Notfound",{attrs:{isDelete:t.res.bool_delete}})],1)},c=[],s=(a("96cf"),a("3040")),i=a("c93e"),o=(a("cadf"),a("551c"),a("097d"),a("a78e"),a("2f62")),n=a("ed08"),A=a("4008"),l=a("fb25"),u=a("c3f2"),d=a("c64e"),h=a("1a18"),p=a("d862"),f=a("26a9"),g=a("545f"),m=a("790e"),b={name:"Feed",components:{DownloadBar:l["a"],FootBar:u["a"],Notfound:A["a"],FocusBar:d["a"],LikeBar:h["a"],MessageBoard:p["a"],FeedList:f["a"],AuthorBar:g["a"],PreviewList:m["a"]},data:function(){return{defaultImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",vid:"",video:{},playIconTimer:null,preSrc:"",preShow:!1}},computed:Object(i["a"])({},Object(o["d"])("article",["res","content","GET_MESSAGE_STATE","version_1_2","agent","exist"]),Object(o["d"])("common",{hotSubjects:function(t){return t.hotSubjects}})),methods:Object(i["a"])({},Object(o["b"])("article",["fetch_content"]),Object(o["c"])("article",["GET_USER_AGENT"]),Object(o["b"])("common",["getHotSubjects","getUserInfoWithWx"]),{fetch:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return console.log("fetch"),t.next=3,this.fetch_content(this.$route.params);case 3:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),clickImg:function(t){var e=t.target;ENV.app&&e.dataset.index?Object(n["k"])(e.dataset.index):e.dataset.src&&this.clickImgOuter(e.dataset.src)},clickImgOuter:function(t){this.preSrc=t,this.preShow=!0},openClick:function(t){var e=t.target;e.classList;ENV.app&&e.dataset.vid&&e.dataset.uid?Object(n["b"])(e.dataset.uid,e.dataset.vid):e.dataset.index?this.clickImg(t):e.dataset.src&&!ENV.app&&this.clickImgOuter(e.dataset.src)},makeFileUrl:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return console.log("url",decodeURI(t)),Object(n["h"])(t)},listenToMyChild:function(t){this.preShow=t}}),mounted:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.$route.query.code&&(e={plateform:2,code:this.$route.query.code,protocol:"WEB_SOCKET",adid:Cookies.get("h5Adid")||"closer-t1"},console.log("params---",e),this.getUserInfoWithWx(e)),t.next=3,this.fetch();case 3:this.$store.dispatch("wx_config"),console.log("params.id:",this.$route.params.id),this.getHotSubjects();case 6:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},v=b,w=(a("c579"),a("2877")),k=Object(w["a"])(v,r,c,!1,null,"4b549078",null);k.options.__file="index.vue";e["default"]=k.exports},c579:function(t,e,a){"use strict";var r=a("1cb7"),c=a.n(r);c.a}}]);
//# sourceMappingURL=chunk-505390d6.9b80d4ca.js.map
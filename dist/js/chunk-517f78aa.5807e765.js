(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-517f78aa"],{"0394":function(e,t,i){},"08d3":function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"image-list"},[i("download-bar"),i("div",{staticClass:"focus-box"},[i("focus-bar",{attrs:{showTime:""}})],1),i("div",{staticClass:"feed-images"},[e.res&&0===e.res.int_type?i("section",{staticClass:"feed-img",attrs:{id:"imgListFeed"}},[e.res.content?i("section",{staticClass:"feeder-title feeder-title-2 feeder-type-0"},[e._v(e._s(e.stringToJson(e.res.content).text))]):e._e(),e.ENV.app?e._e():i("section",{staticClass:"feeder-images"},[e.stringToJson(e.res.content).images&&1==e.stringToJson(e.res.content).images.length?i("section",{staticClass:"feeder-img flex flex-pack-justify"},e._l(e.stringToJson(e.res.content).images,function(t,s){return i("section",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:e.makeFileUrl(t.link),expression:"makeFileUrl(img.link)",arg:"background-image"}],key:s,staticClass:"feeder-img-list feeder-img-list-cell-1"},[i("img",{staticClass:"feeder-cover-list",attrs:{"data-src":e.makeFileUrl(t.link),"data-index":s}}),t.link.indexOf(".gif")>-1||t.link.indexOf(".GIF")>-1?i("span",{staticClass:"cover_img_type"},[e._v("GIF图")]):t.width/t.height>=3?i("span",{staticClass:"cover_img_type"},[e._v("全景")]):t.height/t.width>=3?i("span",{staticClass:"cover_img_type"},[e._v("长图")]):e._e()])})):e.stringToJson(e.res.content).images&&2==e.stringToJson(e.res.content).images.length?i("section",{staticClass:"feeder-img flex flex-pack-justify"},e._l(e.stringToJson(e.res.content).images,function(t,s){return i("section",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:e.makeFileUrl(t.link),expression:"makeFileUrl(img.link)",arg:"background-image"}],key:s,staticClass:"feeder-img-list feeder-img-list-cell-2"},[i("img",{staticClass:"feeder-cover-list",attrs:{"data-src":e.makeFileUrl(t.link),"data-index":s}}),t.link.indexOf(".gif")>-1||t.link.indexOf(".GIF")>-1?i("span",{staticClass:"cover_img_type"},[e._v("GIF图")]):t.width/t.height>=3?i("span",{staticClass:"cover_img_type"},[e._v("全景")]):t.height/t.width>=3?i("span",{staticClass:"cover_img_type"},[e._v("长图")]):e._e()])})):e.stringToJson(e.res.content).images&&3==e.stringToJson(e.res.content).images.length||e.stringToJson(e.res.content).images&&e.stringToJson(e.res.content).images.length>4?i("section",{staticClass:"feeder-img flex"},e._l(e.stringToJson(e.res.content).images,function(t,s){return i("section",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:e.makeFileUrl(t.link),expression:"makeFileUrl(img.link)",arg:"background-image"}],key:s,staticClass:"feeder-img-list feeder-img-list-cell-3"},[i("img",{staticClass:"feeder-cover-list",attrs:{"data-src":e.makeFileUrl(t.link),"data-index":s}}),t.link.indexOf(".gif")>-1||t.link.indexOf(".GIF")>-1?i("span",{staticClass:"cover_img_type"},[e._v("GIF图")]):t.width/t.height>=3?i("span",{staticClass:"cover_img_type"},[e._v("全景")]):t.height/t.width>=3?i("span",{staticClass:"cover_img_type"},[e._v("长图")]):e._e()])})):e.stringToJson(e.res.content).images&&4==e.stringToJson(e.res.content).images.length?i("section",{staticClass:"feeder-img flex flex-pack-justify"},e._l(e.stringToJson(e.res.content).images,function(t,s){return i("section",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:e.makeFileUrl(t.link),expression:"makeFileUrl(img.link)",arg:"background-image"}],key:s,staticClass:"feeder-img-list feeder-img-list-cell-4"},[i("img",{staticClass:"feeder-cover-list",attrs:{"data-src":e.makeFileUrl(t.link),"data-index":s}}),t.link.indexOf(".gif")>-1||t.link.indexOf(".GIF")>-1?i("span",{staticClass:"cover_img_type"},[e._v("GIF图")]):t.width/t.height>=3?i("span",{staticClass:"cover_img_type"},[e._v("全景")]):t.height/t.width>=3?i("span",{staticClass:"cover_img_type"},[e._v("长图")]):e._e()])})):e._e()])]):e._e()]),i("div",{staticClass:"read-like"},[i("like-bar",{attrs:{author:!0}})],1),i("message-board"),i("feed-list",{attrs:{subjectList:e.hotSubjects}}),i("foot-bar"),i("preview-list",{attrs:{"preview-src":e.preSrc,"preview-show":e.preShow},on:{"preview-show":e.listenToMyChild}})],1)},a=[],n=(i("96cf"),i("3040")),r=i("c93e"),c=(i("2b0e"),i("2f62")),o=i("ed08"),l=i("fb25"),g=i("c64e"),d=i("1a18"),m=i("d862"),f=i("26a9"),u=i("c3f2"),p=i("790e"),h={name:"feed-img",props:{},components:{DownloadBar:l["a"],FocusBar:g["a"],LikeBar:d["a"],MessageBoard:m["a"],FeedList:f["a"],FootBar:u["a"],PreviewList:p["a"]},data:function(){return{preSrc:"",preShow:!1}},computed:Object(r["a"])({},Object(c["d"])("article",["res"]),Object(c["d"])("common",{hotSubjects:function(e){return e.hotSubjects}})),mounted:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.fetch();case 2:this.$store.dispatch("wx_config"),this.getHotSubjects(),!this.ENV.app&&this.$preview.init(".feed-images");case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),methods:Object(r["a"])({},Object(c["b"])("article",["fetch_content"]),Object(c["b"])("common",["getHotSubjects","getUserInfoWithWx"]),{fetch:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.fetch_content(this.$route.params);case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),stringToJson:function(e){if(e)return JSON.parse(e)},makeFileUrl:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return console.log("url",decodeURI(e)),Object(o["g"])(e)},clickImg:function(e){var t=e.target;ENV.app&&t.dataset.index?Object(o["k"])(t.dataset.index):t.dataset.src&&this.clickImgOuter(t.dataset.src)},listenToMyChild:function(e){this.preShow=e},clickImgOuter:function(e){this.preSrc=e,this.preShow=!0},openClick:function(e){console.log("fdfadfdfd123131312;");var t=e.target;t.classList;ENV.app&&t.dataset.vid&&t.dataset.uid?Object(o["b"])(t.dataset.uid,t.dataset.vid):t.dataset.index&&this.ENV.app&&this.clickImg(e)}})},v=h,k=(i("22e0"),i("2877")),_=Object(k["a"])(v,s,a,!1,null,"f7dd3688",null);_.options.__file="index.vue";t["default"]=_.exports},"22e0":function(e,t,i){"use strict";var s=i("0394"),a=i.n(s);a.a}}]);
//# sourceMappingURL=chunk-517f78aa.5807e765.js.map
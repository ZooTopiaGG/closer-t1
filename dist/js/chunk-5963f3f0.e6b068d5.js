(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5963f3f0"],{9991:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[e.exist?i("div",{staticClass:"image-list"},[i("download-bar"),i("div",{staticClass:"focus-box"},[i("focus-bar",{attrs:{showTime:""}})],1),i("div",{staticClass:"feed-images"},[e.res&&0===e.res.int_type?i("section",{staticClass:"feed-img",attrs:{id:"imgListFeed"}},[e.content?i("section",{staticClass:"feeder-title feeder-title-2 feeder-type-0"},[e._v(e._s(e.content.text))]):e._e(),e.ENV.app?e._e():i("section",{staticClass:"feeder-images"},[e.content.images&&1==e.content.images.length?i("section",{staticClass:"feeder-img flex flex-pack-justify"},e._l(e.content.images,function(t,a){return i("section",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:e.makeFileUrl(t.link),expression:"makeFileUrl(img.link)",arg:"background-image"}],key:a,staticClass:"feeder-img-list feeder-img-list-cell-1"},[i("img",{staticClass:"feeder-cover-list",attrs:{"data-src":e.makeFileUrl(t.link),"data-type":"preview"}}),t.link.indexOf(".gif")>-1||t.link.indexOf(".GIF")>-1?i("span",{staticClass:"cover_img_type"},[e._v("GIF图")]):t.width/t.height>=3?i("span",{staticClass:"cover_img_type"},[e._v("全景")]):t.height/t.width>=3?i("span",{staticClass:"cover_img_type"},[e._v("长图")]):e._e()])})):e.content.images&&2==e.content.images.length?i("section",{staticClass:"feeder-img flex flex-pack-justify"},e._l(e.content.images,function(t,a){return i("section",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:e.makeFileUrl(t.link),expression:"makeFileUrl(img.link)",arg:"background-image"}],key:a,staticClass:"feeder-img-list feeder-img-list-cell-2"},[i("img",{staticClass:"feeder-cover-list",attrs:{"data-src":e.makeFileUrl(t.link),"data-type":"preview"}}),t.link.indexOf(".gif")>-1||t.link.indexOf(".GIF")>-1?i("span",{staticClass:"cover_img_type"},[e._v("GIF图")]):t.width/t.height>=3?i("span",{staticClass:"cover_img_type"},[e._v("全景")]):t.height/t.width>=3?i("span",{staticClass:"cover_img_type"},[e._v("长图")]):e._e()])})):e.content.images&&3==e.content.images.length||e.content.images&&e.content.images.length>4?i("section",{staticClass:"feeder-img flex"},e._l(e.content.images,function(t,a){return i("section",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:e.makeFileUrl(t.link),expression:"makeFileUrl(img.link)",arg:"background-image"}],key:a,staticClass:"feeder-img-list feeder-img-list-cell-3"},[i("img",{staticClass:"feeder-cover-list",attrs:{"data-src":e.makeFileUrl(t.link),"data-type":"preview"}}),t.link.indexOf(".gif")>-1||t.link.indexOf(".GIF")>-1?i("span",{staticClass:"cover_img_type"},[e._v("GIF图")]):t.width/t.height>=3?i("span",{staticClass:"cover_img_type"},[e._v("全景")]):t.height/t.width>=3?i("span",{staticClass:"cover_img_type"},[e._v("长图")]):e._e()])})):e.content.images&&4==e.content.images.length?i("section",{staticClass:"feeder-img flex flex-pack-justify"},e._l(e.content.images,function(t,a){return i("section",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:e.makeFileUrl(t.link),expression:"makeFileUrl(img.link)",arg:"background-image"}],key:a,staticClass:"feeder-img-list feeder-img-list-cell-4"},[i("img",{staticClass:"feeder-cover-list",attrs:{"data-src":e.makeFileUrl(t.link),"data-type":"preview"}}),t.link.indexOf(".gif")>-1||t.link.indexOf(".GIF")>-1?i("span",{staticClass:"cover_img_type"},[e._v("GIF图")]):t.width/t.height>=3?i("span",{staticClass:"cover_img_type"},[e._v("全景")]):t.height/t.width>=3?i("span",{staticClass:"cover_img_type"},[e._v("长图")]):e._e()])})):e._e()])]):e._e()]),i("div",{staticClass:"read-like"},[i("like-bar",{attrs:{author:!0}})],1),i("message-board"),i("feed-list",{attrs:{subjectList:e.hotSubjects}}),i("foot-bar")],1):i("Notfound",{attrs:{isDelete:e.res.bool_delete}})],1)},s=[],n=(i("96cf"),i("3040")),r=i("c93e"),c=(i("2b0e"),i("2f62")),l=i("ed08"),o=i("fb25"),d=i("c64e"),g=i("1a18"),m=i("d862"),f=i("26a9"),u=i("c3f2"),p={name:"feed-img",props:{},components:{DownloadBar:o["a"],FocusBar:d["a"],LikeBar:g["a"],MessageBoard:m["a"],FeedList:f["a"],FootBar:u["a"]},data:function(){return{preSrc:"",preShow:!1}},computed:Object(r["a"])({},Object(c["d"])({res:function(e){return e.res},content:function(e){return e.content},exist:function(e){return e.exist}}),Object(c["d"])("common",{hotSubjects:function(e){return e.hotSubjects}})),mounted:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.fetch();case 2:this.$store.dispatch("wx_config"),this.getHotSubjects(),this.$preview.init(".feed-images");case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),methods:Object(r["a"])({},Object(c["b"])("common",["getHotSubjects","getUserInfoWithWx","fetch_content"]),{fetch:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.fetch_content(this.$route.params);case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),stringToJson:function(e){if(e)return JSON.parse(e)},makeFileUrl:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return console.log("url",decodeURI(e)),Object(l["g"])(e)},clickImg:function(e){var t=e.target;ENV.app&&t.dataset.index?Object(l["k"])(t.dataset.index):t.dataset.src&&this.clickImgOuter(t.dataset.src)},listenToMyChild:function(e){this.preShow=e},clickImgOuter:function(e){this.preSrc=e,this.preShow=!0},openClick:function(e){console.log("fdfadfdfd123131312;");var t=e.target;t.classList;ENV.app&&t.dataset.vid&&t.dataset.uid?Object(l["b"])(t.dataset.uid,t.dataset.vid):t.dataset.index&&this.ENV.app&&this.clickImg(e)}})},h=p,v=(i("b271"),i("2877")),k=Object(v["a"])(h,a,s,!1,null,"910b7df6",null);k.options.__file="index.vue";t["default"]=k.exports},b271:function(e,t,i){"use strict";var a=i("e1e9"),s=i.n(a);s.a},e1e9:function(e,t,i){}}]);
//# sourceMappingURL=chunk-5963f3f0.e6b068d5.js.map
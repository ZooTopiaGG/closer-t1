(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a168f9d2"],{"0059":function(t,e,s){},"0a36":function(t,e,s){"use strict";var i=s("f37b"),a=s.n(i);a.a},"0b4a":function(t,e,s){},1962:function(t,e,s){"use strict";var i=s("0b4a"),a=s.n(i);a.a},2621:function(t,e){e.f=Object.getOwnPropertySymbols},"26a9":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.ENV.app?t._e():s("div",{staticClass:"feed"},[s("div",{staticClass:"head"},[t._v(t._s(t.title))]),t._l(t.subjectList,function(e,i){return s("div",{key:i,staticClass:"feed-content",on:{click:function(s){t.downloadApp(s,"",e.subjectid)}}},[s("div",{staticClass:"middle"},[s("div",{staticClass:"cover"},[2===e.int_type?s("div",{staticClass:"feed-title"},[t._v(t._s(e.title))]):s("div",{staticClass:"feed-title"},[t._v(t._s(e.content.text))]),2===e.int_type&&e.cover?s("div",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:t.fileUrlParse(e.cover),expression:"fileUrlParse(item.cover)",arg:"background-image"}],staticClass:"feed-cover"}):0===e.int_type&&e.content.images&&e.content.images.length>0?s("div",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:t.fileUrlParse(e.cover),expression:"fileUrlParse(item.cover)",arg:"background-image"}],staticClass:"feed-cover"},[s("div",{staticClass:"image-num"},[t._v(t._s(e.content.images.length)+"图")])]):1===e.int_type?s("div",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:e.content.videos[0].imageUrl,expression:"item.content.videos[0].imageUrl",arg:"background-image"}],staticClass:"feed-cover"},[s("div",{staticClass:"play-icon"})]):t._e()])]),s("div",{staticClass:"bottom"},[s("label",{staticClass:"name"},[t._v(t._s(e.communityName))]),0!=e.commentNumber?s("label",{staticClass:"community-count"},[t._v(t._s(e.commentNumber)+"评论")]):t._e(),0!=e.commentNumber&&0!=e.like?s("label",[t._v("·")]):t._e(),0!=e.like?s("label",{staticClass:"like-count"},[t._v(t._s(e.like)+"赞")]):t._e(),s("label",{staticClass:"date"},[t._v(t._s(t.dateFormate(e.long_publish_time)))])])])}),s("div")],2)},a=[],n=(s("cadf"),s("551c"),s("097d"),s("ed08")),c=(s("2f62"),{name:"feedList",data:function(){return{}},props:{subjectList:{type:Array,default:function(){return[]}},title:{type:String,default:"热门文章"}},computed:{},methods:{dateFormate:function(t,e){return Object(n["e"])(t)},fileUrlParse:function(t,e,s){return Object(n["i"])(t,e,s)},downloadApp:function(t,e,s){var i="closer://feed/".concat(s);Object(n["f"])({store:this.$store,route:this.$route,str:e,defaultStr:"hot_feed",redirectUrl:i})}}}),o=c,r=(s("0a36"),s("2877")),l=Object(r["a"])(o,i,a,!1,null,"7662b643",null);l.options.__file="feedList.vue";e["a"]=l.exports},4871:function(t,e,s){"use strict";var i=s("86ac"),a=s.n(i);a.a},7333:function(t,e,s){"use strict";var i=s("0d58"),a=s("2621"),n=s("52a7"),c=s("4bf8"),o=s("626a"),r=Object.assign;t.exports=!r||s("79e5")(function(){var t={},e={},s=Symbol(),i="abcdefghijklmnopqrst";return t[s]=7,i.split("").forEach(function(t){e[t]=t}),7!=r({},t)[s]||Object.keys(r({},e)).join("")!=i})?function(t,e){var s=c(t),r=arguments.length,l=1,u=a.f,f=n.f;while(r>l){var d,m=o(arguments[l++]),v=u?i(m).concat(u(m)):i(m),p=v.length,b=0;while(p>b)f.call(m,d=v[b++])&&(s[d]=m[d])}return s}:r},"86ac":function(t,e,s){},"9be4":function(t,e,s){"use strict";var i=s("0059"),a=s.n(i);a.a},c3f2:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.ENV.app?t._e():s("section",{staticClass:"footer"},[s("div",{staticClass:"footer-wrapper",on:{click:t.downApp}},[s("div",{staticClass:"footer-btn"},[t._v(t._s(t.btnText))])])])},a=[],n=s("ed08"),c={data:function(){return{btnText:"打开贴近app，查看更多精彩文章"}},methods:{downApp:function(){Object(n["g"])()}}},o=c,r=(s("4871"),s("2877")),l=Object(r["a"])(o,i,a,!1,null,"bb003f40",null);l.options.__file="footBar.vue";e["a"]=l.exports},c93e:function(t,e,s){"use strict";s.d(e,"a",function(){return a});var i=s("a322");function a(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{},a=Object.keys(s);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(s).filter(function(t){return Object.getOwnPropertyDescriptor(s,t).enumerable}))),a.forEach(function(e){Object(i["a"])(t,e,s[e])})}return t}},dc20:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.ENV.app?t._e():s("section",{staticClass:"focus"},[t.is_follow?s("section",{staticClass:"focus-btn-disabled"}):t._e(),s("section",{on:{click:t.tjFocus}},[t.$route.path.indexOf("community")>-1?s("section",{staticClass:"focus-community"},[t.is_follow?s("section",{staticClass:"yet-focus"},[s("span",[t._v("已关注")])]):s("section",{staticClass:"no-focus"},[s("span",[t._v("关注栏目")])])]):s("section",{staticClass:"other"},[t.is_follow?s("section",{staticClass:"yet-focus"},[s("span",[t._v("已关注")])]):s("section",{staticClass:"no-focus"},[s("span",[t._v("关注")])])])])])},a=[],n=(s("f751"),s("96cf"),s("3040")),c=s("c93e"),o=s("2f62"),r=s("ed08"),l={props:{communityid:{type:String,default:""}},data:function(){return{}},computed:Object(c["a"])({},Object(o["d"])(["is_follow","isLogin"]),Object(o["d"])("article",["res"])),watch:{isLogin:function(t,e){console.log("isLogin:",t,e),t&&"focus"==this.$route.query.useraction&&(console.log("actons:tjFocus"),this.tjFocus())}},methods:Object(c["a"])({},Object(o["b"])(["getWxAuth"]),Object(o["b"])("common",["get_focus_stat"]),{tjFocus:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:Cookies.get("token")?this.get_focus_stat({communityid:this.res.communityid?this.res.communityid:this.communityid,flag:this.is_follow?0:1}):this.ENV.wx&&this.getWxAuth(Object(r["a"])(this.$route.path,Object.assign({},this.$route.query,{useraction:"focus"})));case 1:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()}),mounted:function(){}},u=l,f=(s("9be4"),s("2877")),d=Object(f["a"])(u,i,a,!1,null,"3042b288",null);d.options.__file="focus.vue";e["a"]=d.exports},f37b:function(t,e,s){},f751:function(t,e,s){var i=s("5ca1");i(i.S+i.F,"Object",{assign:s("7333")})},fb25:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.ENV.app?t._e():s("section",{staticClass:"download-bar"},[s("div",{staticClass:"place"}),s("div",{staticClass:"wrap"},[s("div",{staticClass:"left"},[s("div",{staticClass:"left-logo"}),s("mt-swipe",{staticClass:"mtswipe left-desc",attrs:{auto:4e3,"show-indicators":!1}},[s("mt-swipe-item",[s("div",{staticClass:"swip-item"},[s("span",[t._v("贴近一点 看身边")])])]),s("mt-swipe-item",[s("div",{staticClass:"swip-item"},[s("span",[t._v("能赚稿费的本地内容社区")])])]),s("mt-swipe-item",[s("div",{staticClass:"swip-item"},[s("p",[t._v("打开贴近看资讯")]),s("p",[t._v("领10元红包")])])])],1)],1),s("div",{staticClass:"right"},[s("div",{staticClass:"right-btn",on:{click:t.handleClick}},[t._v("下载贴近")])])])])},a=[],n=(s("7f7f"),s("2b0e")),c=s("ed08"),o=s("f121"),r=s("76a0");n["default"].component(r["Swipe"].name,r["Swipe"]),n["default"].component(r["SwipeItem"].name,r["SwipeItem"]);var l={name:"downloadBar",mounted:function(){},methods:{handleClick:function(t,e){var s=o["a"].download;Object(c["f"])({store:this.$store,route:this.$route,str:e,defaultStr:"direct_top",redirectUrl:s})}}},u=l,f=(s("1962"),s("2877")),d=Object(f["a"])(u,i,a,!1,null,"60311dc5",null);d.options.__file="downloadBar.vue";e["a"]=d.exports}}]);
//# sourceMappingURL=chunk-a168f9d2.220e2292.js.map
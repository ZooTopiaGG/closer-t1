(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-452d"],{"11e9":function(t,e,n){var r=n("52a7"),a=n("4630"),c=n("6821"),o=n("6a99"),i=n("69a8"),s=n("c69a"),u=Object.getOwnPropertyDescriptor;e.f=n("9e1e")?u:function(t,e){if(t=c(t),e=o(e,!0),s)try{return u(t,e)}catch(t){}if(i(t,e))return a(!r.f.call(t,e),t[e])}},4008:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"not-found"},[t.isDelete?n("div",{staticClass:"delete"},[n("div",{staticClass:"delete-icon"}),n("div",{staticClass:"subject-notfound"},[t._v("此贴子已被删除")]),n("div")]):n("div")])},a=[],c=(n("c5f6"),{name:"notFound",props:{isDelete:Number}}),o=c,i=(n("aa04"),n("2877")),s=Object(i["a"])(o,r,a,!1,null,"ae3a8cda",null);e["a"]=s.exports},"52a7":function(t,e){e.f={}.propertyIsEnumerable},"5d8f":function(t,e,n){},"5dbc":function(t,e,n){var r=n("d3f4"),a=n("8b97").set;t.exports=function(t,e,n){var c,o=e.constructor;return o!==n&&"function"==typeof o&&(c=o.prototype)!==n.prototype&&r(c)&&a&&a(t,c),t}},8927:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.exist?n("section",{staticClass:"article"},[n("section",{staticClass:"article-wrap"},[n("section",{staticClass:"article-container"},[n("section",{staticClass:"article-title"},[t._v(" "+t._s(t.res.title)+" ")]),n("section",{directives:[{name:"lazy-container",rawName:"v-lazy-container",value:{selector:"img"},expression:"{ selector: 'img' }"}],staticClass:"content article-content",domProps:{innerHTML:t._s(t.content.html)},on:{click:function(e){t.openClick(e)}}})])])]):n("Notfound")},a=[],c=(n("96cf"),n("3040")),o=n("c93e"),i=(n("a78e"),n("2f62")),s=n("ed08"),u=n("4008"),A=Object(i["a"])("article"),f=A.mapState,l=A.mapActions,p=A.mapMutations,d={name:"Feed",components:{Notfound:u["a"]},data:function(){return{defaultImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",vid:"",video:{},playIconTimer:null}},computed:Object(o["a"])({},f(["res","content","GET_MESSAGE_STATE","version_1_2","agent","exist"])),methods:Object(o["a"])({},l(["fetch_content"]),p(["GET_USER_AGENT"]),{fetch:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.fetch_content(this.$route.params);case 2:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),openClick:function(t){var e=t.target;e.classList;if(this.$store.state.IS_APP){if(!e.dataset.vid&&!e.dataset.uid)return;Object(s["a"])(e.dataset.uid,e.dataset.vid)}}}),mounted:function(){var t=this;t.GET_USER_AGENT({nvg:navigator.userAgent,ref:location.pathname}),t.fetch()}},v=d,b=(n("ab6f"),n("2877")),g=Object(b["a"])(v,r,a,!1,null,"2714f0ed",null);e["default"]=g.exports},"8b97":function(t,e,n){var r=n("d3f4"),a=n("cb7c"),c=function(t,e){if(a(t),!r(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,r){try{r=n("9b43")(Function.call,n("11e9").f(Object.prototype,"__proto__").set,2),r(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,n){return c(t,n),e?t.__proto__=n:r(t,n),t}}({},!1):void 0),check:c}},9093:function(t,e,n){var r=n("ce10"),a=n("e11e").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,a)}},aa04:function(t,e,n){"use strict";var r=n("b625"),a=n.n(r);a.a},aa77:function(t,e,n){var r=n("5ca1"),a=n("be13"),c=n("79e5"),o=n("fdef"),i="["+o+"]",s="​",u=RegExp("^"+i+i+"*"),A=RegExp(i+i+"*$"),f=function(t,e,n){var a={},i=c(function(){return!!o[t]()||s[t]()!=s}),u=a[t]=i?e(l):o[t];n&&(a[n]=u),r(r.P+r.F*i,"String",a)},l=f.trim=function(t,e){return t=String(a(t)),1&e&&(t=t.replace(u,"")),2&e&&(t=t.replace(A,"")),t};t.exports=f},ab6f:function(t,e,n){"use strict";var r=n("5d8f"),a=n.n(r);a.a},b625:function(t,e,n){},c5f6:function(t,e,n){"use strict";var r=n("7726"),a=n("69a8"),c=n("2d95"),o=n("5dbc"),i=n("6a99"),s=n("79e5"),u=n("9093").f,A=n("11e9").f,f=n("86cc").f,l=n("aa77").trim,p="Number",d=r[p],v=d,b=d.prototype,g=c(n("2aeb")(b))==p,_="trim"in String.prototype,h=function(t){var e=i(t,!1);if("string"==typeof e&&e.length>2){e=_?e.trim():l(e,3);var n,r,a,c=e.charCodeAt(0);if(43===c||45===c){if(n=e.charCodeAt(2),88===n||120===n)return NaN}else if(48===c){switch(e.charCodeAt(1)){case 66:case 98:r=2,a=49;break;case 79:case 111:r=8,a=55;break;default:return+e}for(var o,s=e.slice(2),u=0,A=s.length;u<A;u++)if(o=s.charCodeAt(u),o<48||o>a)return NaN;return parseInt(s,r)}}return+e};if(!d(" 0o1")||!d("0b1")||d("+0x1")){d=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof d&&(g?s(function(){b.valueOf.call(n)}):c(n)!=p)?o(new v(h(e)),n,d):h(e)};for(var m,E=n("9e1e")?u(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),y=0;E.length>y;y++)a(v,m=E[y])&&!a(d,m)&&f(d,m,A(v,m));d.prototype=b,b.constructor=d,n("2aba")(r,p,d)}},c93e:function(t,e,n){"use strict";n.d(e,"a",function(){return a});var r=n("a322");function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(e){Object(r["a"])(t,e,n[e])})}return t}},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=chunk-452d.0bb372ad.js.map
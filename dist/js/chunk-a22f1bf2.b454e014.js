(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a22f1bf2"],{1954:function(e,t,s){"use strict";var o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("mt-popup",{staticClass:"appuse-pop",attrs:{closeOnClickModal:e.closeOnClickModal},model:{value:e.visible2,callback:function(t){e.visible2=t},expression:"visible2"}},[s("div",{staticClass:"box box-tb box-center-center"},[s("div",{staticClass:"close-icon",on:{click:e.close}}),s("div",{staticClass:"pop-header"},["messagelist"==e.isFrom?s("div",{staticClass:"text"},[e._v("登录后继续操作")]):s("div",{staticClass:"text"},[e._v("客官，根据国家法律，发表文字评论必须填写手机号，所以拜托啦~")])]),s("div",{staticClass:"pop-content"},[s("div",{staticClass:"phone-num"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.phoneNum,expression:"phoneNum"}],staticClass:"phone",attrs:{type:"number",placeholder:"手机号",maxlength:"11"},domProps:{value:e.phoneNum},on:{input:function(t){t.target.composing||(e.phoneNum=t.target.value)}}})]),s("div",{staticClass:"sms-code"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"}],staticClass:"code",attrs:{type:"text",placeholder:"验证码",maxlength:"6"},domProps:{value:e.code},on:{input:function(t){t.target.composing||(e.code=t.target.value)}}}),s("span",{staticClass:"code-btn",attrs:{id:"code-btn"},on:{click:function(t){e.getSmsCode(e.phoneNum)}}},[e._v("发送验证码")])])]),s("div",{attrs:{id:"captcha"}}),s("div",{staticClass:"pop-footer"},[s("div",{staticClass:"confirm-btn",on:{click:function(t){e.userLogin({phone:e.phoneNum,token:e.code})}}},[e._v("登录/注册")])])])])},a=[],i=s("c93e"),n=(s("7f7f"),s("2b0e")),c=s("2f62"),l=s("76a0");n["default"].component(l["Popup"].name,l["Popup"]);var r={name:"pop",components:{Toast:l["Toast"]},props:{className:String,closeOnClickModal:{type:Boolean,default:!1},isFrom:{type:String,default:""}},data:function(){return{phoneNum:"12000000012",code:"",captchaIns:"",visible2:!1}},beforeMount:function(){if(this.ENV.app);else{var e=document.createElement("script");e.setAttribute("type","text/javascript"),e.setAttribute("src","https://cstaticdun.126.net/load.min.js"),document.getElementsByTagName("head")[0].appendChild(e)}},mounted:function(){},computed:Object(i["a"])({},Object(c["d"])("common",{visible:function(e){return e.visible},smsCode:function(e){return e.smsCode}})),watch:{visible:function(e){this.visible2=e}},methods:Object(i["a"])({},Object(c["c"])("common",["show","hide"]),Object(c["b"])("common",["getCode","login"]),{open:function(){this.show()},close:function(){this.hide()},userLogin:function(){var e=/^(0|86|17951)?(1[23456789][0-9])[0-9]{8}$/,t=/^\d{6}$/;if(this.phoneNum&&e.test(this.phoneNum))if(console.log(this.code),console.log(t.test(this.code)),this.code&&t.test(this.code)){var s={phone:this.phoneNum,token:this.code};this.login(s)}else Object(l["Toast"])({message:"请输入正确的验证码",className:"toast"});else Object(l["Toast"])({message:"请输入正确的手机号",className:"toast"})},getSmsCode:function(e){console.log("getcode",e);var t=/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;e?t.test(e)?this.getImgCode():Object(l["Toast"])("请输入正确格式的手机号"):Object(l["Toast"])("请输入手机号")},getImgCode:function(){var e=this;initNECaptcha({element:"#captcha",captchaId:"9bff9612504c4b0f9bd9d63b142dd43e",width:"320px",onVerify:function(t,s){if(console.log("verify",s),s){var o={phone:e.phoneNum,captchaValidate:s.validate};e.getCode(o)}}},function(e){e.popUp()},function(e){console.log("err--",e)})}})},u=r,d=(s("e2b6"),s("2877")),p=Object(d["a"])(u,o,a,!1,null,"fbefdad8",null);p.options.__file="login.vue";t["a"]=p.exports},"49e6":function(e,t,s){"use strict";var o=s("73c1"),a=s.n(o);a.a},"73c1":function(e,t,s){},"839f":function(e,t,s){"use strict";s.r(t);var o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"write-message"},[s("div",{staticClass:"title"},[e._v(e._s(e.title))]),s("div",{staticClass:"message-area"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.textarea,expression:"textarea"}],staticClass:"mint-field",attrs:{name:"textarea",placeholder:"发表你的意见吧～"},domProps:{value:e.textarea},on:{input:function(t){t.target.composing||(e.textarea=t.target.value)}}})]),s("div",{staticClass:"btn-box"},[s("div",{attrs:{type:"primary"},on:{click:e.toMessage}},[e._v("留 言")])]),s("login-pop",{ref:"login"}),s("message-success",{ref:"messageSuccess"})],1)},a=[],i=s("c93e"),n=s("76a0"),c=s("1954"),l=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.visible2?s("div",{staticClass:"pop box box-center-center"},[s("div",{staticClass:"success-pop",attrs:{closeOnClickModal:e.closeOnClickModal}},[s("div",{staticClass:"box box-tb box-center-center"},[s("div",{staticClass:"close-icon",on:{click:e.close}}),e._m(0),s("div",{staticClass:"pop-footer box box-lr"},[s("div",{staticClass:"wait-btn",on:{click:e.goBack}},[e._v("再等等")]),s("div",{staticClass:"confirm-btn",on:{click:e.downApp}},[e._v("好的")])])])])]):e._e()},r=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"pop-header"},[s("div",{staticClass:"text"},[e._v("恭喜你！留言成功")]),s("div",{staticClass:"text"},[e._v("快去app看看其他精彩留言吧~~")])])}],u=(s("7f7f"),s("cadf"),s("551c"),s("097d"),s("2b0e")),d=s("2f62"),p=s("ed08");u["default"].component(n["Popup"].name,n["Popup"]);var m={name:"successpop",components:{Toast:n["Toast"]},props:{className:String,closeOnClickModal:{type:Boolean,default:!1}},data:function(){return{isApp:window.ENV.app,visible2:!1}},beforeMount:function(){},mounted:function(){console.log("params---",this.$route.params)},watch:{visible:function(e){this.visible2=e}},computed:Object(i["a"])({},Object(d["d"])("message",{visible:function(e){return e.visible}})),methods:Object(i["a"])({},Object(d["c"])("message",["show","hide"]),{close:function(){this.hide()},downApp:function(){Object(p["e"])()},goBack:function(){var e=this.$route.params.sid;this.$router.push({path:"/article/".concat(e)})}})},f=m,v=(s("c312"),s("2877")),h=Object(v["a"])(f,l,r,!1,null,"5a42f10d",null);h.options.__file="messageSuccess.vue";var b=h.exports,g={components:{Toast:n["Toast"],LoginPop:c["a"],MessageSuccess:b},data:function(){return{textarea:"",title:""}},created:function(){document.title="贴近 - TieJin.cn",Cookies.get("udid")||this.getAdCookie({webUdid:!0})},computed:Object(i["a"])({},Object(d["d"])("article",["res","content"]),Object(d["d"])("message",{addReply:function(e){return e.replyData}})),beforeMount:function(){window.sessionStorage.getItem("title")?this.title=window.sessionStorage.getItem("title"):this.title=2===this.res.int_type?this.res.title:this.content.text},mounted:function(){console.log("params---",this.$route.params)},methods:Object(i["a"])({},Object(d["b"])("message",["addReplyData","getAdCookie"]),{toMessage:function(){if(this.textarea)if(window.sessionStorage.setItem("textarea",this.textarea),Cookies.get("user")){console.log("login");var e=JSON.parse(Cookies.get("user"));if(e.phones){var t,s=this.$route.params.id;t=s?{subjectid:this.$route.params.sid,content:window.sessionStorage.getItem("textarea")?window.sessionStorage.getItem("textarea"):this.textarea,lastid:s}:{subjectid:this.$route.params.sid,content:window.sessionStorage.getItem("textarea")?window.sessionStorage.getItem("textarea"):this.textarea},this.addReplyData(t)}else this.$refs.login.open()}else console.log("not login"),this.$refs.login.open();else Object(n["Toast"])("内容不能为空！")}})},C=g,x=(s("49e6"),Object(v["a"])(C,o,a,!1,null,"641c6841",null));x.options.__file="index.vue";t["default"]=x.exports},"9e29":function(e,t,s){},c312:function(e,t,s){"use strict";var o=s("9e29"),a=s.n(o);a.a},c93e:function(e,t,s){"use strict";s.d(t,"a",function(){return a});var o=s("a322");function a(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{},a=Object.keys(s);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(s).filter(function(e){return Object.getOwnPropertyDescriptor(s,e).enumerable}))),a.forEach(function(t){Object(o["a"])(e,t,s[t])})}return e}},e2b6:function(e,t,s){"use strict";var o=s("ef24"),a=s.n(o);a.a},ef24:function(e,t,s){}}]);
//# sourceMappingURL=chunk-a22f1bf2.b454e014.js.map
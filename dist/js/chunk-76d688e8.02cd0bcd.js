(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-76d688e8"],{1416:function(t,e,s){"use strict";var i=s("b6e9"),o=s.n(i);o.a},1954:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("mt-popup",{staticClass:"appuse-pop",attrs:{closeOnClickModal:t.closeOnClickModal},model:{value:t.visible2,callback:function(e){t.visible2=e},expression:"visible2"}},[s("div",{staticClass:"box box-tb box-center-center"},[s("div",{staticClass:"close-icon",on:{click:t.close}}),s("div",{staticClass:"pop-header"},["messagelist"==t.isFrom?s("div",{staticClass:"text"},[t._v("登录后继续操作")]):s("div",{staticClass:"text"},[t._v("客官，根据国家法律，发表文字评论必须填写手机号，所以拜托啦~")])]),s("div",{staticClass:"pop-content"},[s("div",{staticClass:"phone-num"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.phoneNum,expression:"phoneNum"}],staticClass:"phone",attrs:{type:"number",placeholder:"手机号",maxlength:"11"},domProps:{value:t.phoneNum},on:{input:function(e){e.target.composing||(t.phoneNum=e.target.value)}}})]),s("div",{staticClass:"sms-code"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],staticClass:"code",attrs:{type:"text",placeholder:"验证码",maxlength:"6"},domProps:{value:t.code},on:{input:function(e){e.target.composing||(t.code=e.target.value)}}}),s("span",{staticClass:"code-btn",attrs:{id:"code-btn"},on:{click:function(e){t.getSmsCode(t.phoneNum)}}},[t._v("发送验证码")])])]),s("div",{attrs:{id:"captcha"}}),s("div",{staticClass:"pop-footer"},[s("div",{staticClass:"confirm-btn",on:{click:function(e){t.userLogin({phone:t.phoneNum,token:t.code})}}},[t._v("登录/注册")])])])])},o=[],a=s("c93e"),n=(s("7f7f"),s("2b0e")),c=s("2f62"),r=s("76a0");n["default"].component(r["Popup"].name,r["Popup"]);var l={name:"pop",components:{Toast:r["Toast"]},props:{className:String,closeOnClickModal:{type:Boolean,default:!1},isFrom:{type:String,default:""}},data:function(){return{phoneNum:"12000000012",code:"",captchaIns:"",visible2:!1}},beforeMount:function(){if(this.ENV.app);else{var t=document.createElement("script");t.setAttribute("type","text/javascript"),t.setAttribute("src","https://cstaticdun.126.net/load.min.js"),document.getElementsByTagName("head")[0].appendChild(t)}},mounted:function(){},computed:Object(a["a"])({},Object(c["d"])("common",{visible:function(t){return t.visible},smsCode:function(t){return t.smsCode}})),watch:{visible:function(t){this.visible2=t}},methods:Object(a["a"])({},Object(c["c"])("common",["show","hide"]),Object(c["b"])("common",["getCode","login"]),{open:function(){this.show()},close:function(){this.hide()},userLogin:function(){var t=/^(0|86|17951)?(1[23456789][0-9])[0-9]{8}$/,e=/^\d{6}$/;if(this.phoneNum&&t.test(this.phoneNum))if(console.log(this.code),console.log(e.test(this.code)),this.code&&e.test(this.code)){var s={phone:this.phoneNum,token:this.code};this.login(s)}else Object(r["Toast"])({message:"请输入正确的验证码",className:"toast"});else Object(r["Toast"])({message:"请输入正确的手机号",className:"toast"})},getSmsCode:function(t){console.log("getcode",t);var e=/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;t?e.test(t)?this.getImgCode():Object(r["Toast"])("请输入正确格式的手机号"):Object(r["Toast"])("请输入手机号")},getImgCode:function(){var t=this;initNECaptcha({element:"#captcha",captchaId:"9bff9612504c4b0f9bd9d63b142dd43e",width:"320px",onVerify:function(e,s){if(console.log("verify",s),s){var i={phone:t.phoneNum,captchaValidate:s.validate};t.getCode(i)}}},function(t){t.popUp()},function(t){console.log("err--",t)})}})},u=l,m=(s("e2b6"),s("2877")),d=Object(m["a"])(u,i,o,!1,null,"fbefdad8",null);d.options.__file="login.vue";e["a"]=d.exports},"1a18":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.ENV.v120||t.ENV.app?t._e():s("section",{staticClass:"like-bar box box-tb"},[t.ENV.app?t._e():s("section",{staticClass:"like box box-tb box-center-center",on:{click:function(e){t.toSupport(e)}}},[s("div",{staticClass:"like-box box box-center-center"},[s("img",{ref:"sup",staticClass:"like-icon",attrs:{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGMAAABdCAYAAACxS9hIAAAAAXNSR0IArs4c6QAACtZJREFUeAHtXVtsXEcZ/md37V07vq/t+JJLC03SkDiUxEBVkqB0nazjxHEQSBXiAfrC5QEeuLwhUJUHIKnEAw+ICgnBG0JVnaS+rOMQqiIUBQqlakrbEJoEt3Fru/b6vrcz/LPJCbvn/HP2cs7e6hnJOmf+mfnnzPft3P75zzGACmWDACubJ7H5IJcvj2xPRKJPaRw+i43q4QxqUKUb/6Yw/gZj8CfmqXvh6NGjYZtVFax4xZMxMXFxB48nfsY5P3UffDlYjEWwwb+rcfl+fLi//648Y2lSKpqM0Oj5byEJzwLw2lzgY4ytYE/53rHjp3+VS7lC561YMiZGh5/ROP+RLYBc7NfB/qFvIjkJW3ocKlyRZIRGh7+PPeKcExhgD3kuOPCFbzihy66OiiNjYuKFx3gcrnEOVXYbr5dnLvbd4PHTP9fjpbpWFBnYG1ho7PyrwPk+GWDtHV3g97dBdbUXXC43LC4uQHjhQ5ideV9WBBCENQ/z9gQGBm5KMxUhwVOEOhyrYjJ08ZSMCF9NDezctRdqN9Wl1dfm64C29g7o6NwC/77xL1hfW01LFxEOUBPjkbN4+0VTYhEFriLWZbsqTdN+QCkRPWDXoz0mIlLz1tU3QM8nD4DPJ7YfZBgSexUypUjCiiEjFBreisPU5yhcHnr4Eaip3UQlpcncbg/seHQvDl9ks93x9ejTaQWKHCGfqsjPkFV1PMH6qYweTxW0be6kkkjZJhzGZPk5sCfJQkUSVgwZDHiQwqTF3wq4T6CSpDK/v51OY/CZ69evV9OJhZdWDBk4zR6i4PC3bqbElrKGxibweIi1C+fe6elb2Xczy1pyT6wIMiZHRnbivsL0cxY9or6hMfdWYwnZRB6Labmzm9cTmAtVBBkJFj9ofnSAuroG2WRMZU+Tearo0YhpCUVGGlKmCP+8SYQCMdzkG8SmkAqMgyKDAkbIcDnrwiFqgErPd4gSuqqqaGsKnoMoMiiwhWxy/MUnkJJWY7qYL+rq85svhK6qanqYwiRFhhFsPa7xxJB+n3qVrohSM1ndow2EChy4RsmLISvrCRyHKDcajr5MASHdK1CZCVkiESekAC5gJTuWLWsyLo1fOIG/1G4KtWbc7NkJiQR9noRzxoIdvXbKljUZmsa/TjWuoaEJJ2DpmE8VMclkPQO46hkmsCbHzu/DOZpcRW3uJDuLSYeVIB6XDFMl7BmETcCqCcVLi3N+Bte1JqOT6BEteHhkNywvL5EqsMo5MqEIwrIcpkKh84eRCOF6YwriJC9Xw6BRSTQagcj6mlEs4onaBv53KqEYsrIj48qVK3UQ135DNV6cR4gTO7theWmRVsHgnwcPDtFdhi7hqLTshqnIavgX2MKPUa3s2rJNunOm8stki2HpgullWZliyMuqZ4RGhn+Cu+2vUQ0XtqTOrq1UUk4yrmkwN/sBWYYB+zOZUCRhWfQMcaAzdevGOdxTfEfW7u14tCo5LpUVIeUz6CUSi0XJNHc1K2nPKDkZodELT/739tvCIW0/iRAKk+43rabjDFl2S/n03Sk6nbFQX9+Q3J+HLuWo1LR0FNqTzsQx7UvAtEN4LtyNZuV6R2vVlTHwosmjS49SV+F6s3ffAUd6xWJ4Ht54/VWqGpSxeQRDOplICmUhRpszYx9ixtvA+IS7qv75vr4+cvmcRsbk5KRfiy6fQx/Wr2Lhks8n4jTuEz2fSjqkZdHqjFluot/UzAfTGfMVNgNbQg/Gs9W+hp8eOXIkbef5APBLl17cnYgs/xWJeBof5oG8sA8m1+6rqYU9PfsdI0LUtLq6Iq+waCm8HhcRZ3DVOHZ1dLQhtdok6KFQqF2LxsdxAn04NbFU92KHvXfffqszh7weTXbunZcy24V4X5hHf5+0TN/XlSSDx1d/iURss63fpgLhsfHxHbthJzqaCX8op0Nn9zbbu3cnnwkx7w+NDX9b18kmxy58Oq4lrumCUlxrcEjq7N4KrW2bcaIWb34VLoQX5uGdm2/BOm0OKVzFEs1oDJ0Dd+32YDC44onzxFck+aCxqQVdYZrBIzkvpsq9N3ULopF1U9Ku3T2kC6awM3m9PlP+Qgkam5rhsQOPJ/casjMNJ+vGjSSsra/C3ak7EMbVnDHgWssP8VXhLfm8B5etAeoEsrmlDVrbc/fnkhnxxA66nMZsYf3N4TdmxDCnuNfngyb8Yb/+2itA2cXw9xgQZOCcwUjLW1OzP6cKVebMCHRIz2HuceDCSaSJUiNz8qLyKll2CFgsSpITZcn3E9k146ORa2mR9nVAp+7/iBYqMorI8wK+zkYGzt4UckUGiY7zQnHmviI76vW4LysynMdcqlG85EkGBlPB4KDqGSQ4BRLKyWDjepVqmNKRKPBVNl/gPi+kV63I0JEo4HUNrcXRSISqQaut9yTnC5GoyKAgcli2ME/PF2ituHbo0MkHNhJFhsPAU+oWFsiDPfHyyYMhSpRTZFDoOSjDDwmAbLPndnkUGQ5inVGVIEIQYgxoHAwH+k+mHV2onmFEyeG4dIgCNolzRtp7CYoMh8E3qpNN3ugykjZEiXKKDCN6DsaFg7VY1lKhyuuZMMoVGUZEHIzLegWe/r0ZCJy4baxKkWFExMG41ASCfoJUNYoMChWHZDIymOv/JpDUqhQZqWg4eC/M5ZJX1aLcVfMSVZUig0LFAZnMMIiOWy8LtxyqCkUGhYoDsoV52gTiAk7OF6JKRYYDwBtVJPBUj3LJEfk0gwkktWzJ389IfZiPyr1wVkMfWlNzcEn7/rHgyddMCfcFqmfIkLEhl88XEEITiJklRYYNtDMUXUR/Xjow6Xwh8queQaOWt1Q4VFNO1cke4fZdslKsyLBCJ4+0sORUDz03/4FLWvo12/v1KDLyANyqiGy+wPMLk5XWqEeRYUTERlysoMRLnFRAoC3nC1FGkUEhl6dsCf8jAfXOB/aK5a5tO/+SSa0iIxNCOaTLhih87eLKnj17oplUKTIyIZRDunhFjQqpjmpUui5TZOhI2LzGYzGpYzNUuTPOF6J6RYZNEvTisiEKTSDvHDs2eEPPZ3VVZFihk0Oa7CAJvyWXcUmrV6PI0JGweZWfd6d7DVpVo6y2Vuhkmbayskx+NglNIPFGqP5jlmrUnJEtUFb5wpKDJDSBXH18YEDyDT6zRjVMmTHJWRKWfGaPMVfW84WoVJGRM/TpBTQtkfxfgOnSezE34TVI5dNligwdiTyv4uOT4ruHxoAmkLlA/+ArRrlVXJBh1oRC6tjQStFGTZOtotAEIhybSWxlWLlwUzJDJVIfY6HybXSZzAsEDbg5zRcCR9EzblKAzs5Mk92PyrtRZe+9e4c81RN4VPmyM4GkYufBsW0EWXwiVSjuV1eW4M6tG/iJoyYQX1rONsi+vj8/Nyu33WSrvEzyCTO58ACR9QoxRAUCg+/m+rget9f9W74e/yG6LJj+6alwaZ+bdebrolP4HaqNEnDoP5tPW12CQc5cz+ZTWJUxI4CT9tXgiSFLxwNzqXuS5NI2ePzUMzhc5aVApnhDyhm8jV+NPp1v25NkIJsJf7vnNF7/kK+iDV+Osbe84A3Y+Wo0SwUR9xZsYvzCU7jJOIP3j6SmqXsaAeGyiSCeadm85bne3t4YnSs7aRoZqUUuj1/cH9Pih7Gybpzc0//9fGrGDXiPoMXwg10zHNx/87ezl3p7B1c3IAyqyQqBIiHwPxcfEtlXU4QJAAAAAElFTkSuQmCC",alt:"图片"}})]),s("span",[t._v("赞"),s("span",{ref:"like",attrs:{status:"false"}},[t._v(t._s(t.res.like))])])]),t.author?s("section",{staticClass:"author-info"},[t.res.authorsString?s("div",{staticClass:"author"},[t._v("作者："+t._s(t.res.authorsString))]):t._e()]):t._e(),s("section",{staticClass:"read"},[t._v("\n    阅读\n    "),s("span",{staticClass:"read-count"},[t._v(t._s(t.readCount))])])])},o=[],a=(s("242a"),s("c93e")),n=s("ed08"),c=s("2f62"),r={props:{author:{type:Boolean,default:!1}},computed:Object(a["a"])({},Object(c["d"])("article",["res"]),Object(c["d"])("common",["incr_view"]),{getCommonTime:function(){return Object(n["f"])(this.res.long_publish_time,"yy-mm-dd hh:MM")},readCount:function(){return this.incr_view}}),methods:Object(a["a"])({},Object(c["b"])("common",["get_incr_view"]),{toSupport:function(t){console.log(1,this.$refs["like"].innerText);var e=this.$refs["like"].innerText;"false"===this.$refs["like"].getAttribute("status")&&(this.$refs["like"].innerText=parseInt(e)+1),this.$refs["like"].setAttribute("status","true"),"IMG"!==t.target.nodeName&&"SPAN"!==t.target.nodeName&&"DIV"!==t.target.nodeName||(this.$refs["sup"].src="data:image/png;base64,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")}}),mounted:function(){console.log("window.ENV.v120",window.ENV.v120),this.get_incr_view({subjectid:this.$route.params.id,timestamp:Date.now()})}},l=r,u=(s("56bd"),s("2877")),m=Object(u["a"])(l,i,o,!1,null,"77937006",null);m.options.__file="likeBar.vue";e["a"]=m.exports},"242a":function(t,e,s){"use strict";s("386b")("sup",function(t){return function(){return t(this,"sup","","")}})},"26a9":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.ENV.app?t._e():s("div",{staticClass:"feed"},[s("div",{staticClass:"head"},[t._v(t._s(t.title))]),t._l(t.subjectList,function(e,i){return s("div",{key:i,staticClass:"feed-content",on:{click:function(s){t.downloadApp(s,"",e.subjectid)}}},[s("div",{staticClass:"wrap"},[s("div",{staticClass:"middle"},[s("div",{staticClass:"cover"},[2===e.int_type?s("div",{staticClass:"feed-title"},[t._v(t._s(e.title))]):s("div",{staticClass:"feed-title"},[t._v(t._s(e.content.text))]),2===e.int_type&&e.cover?s("div",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:t.fileUrlParse(e.cover),expression:"fileUrlParse(item.cover)",arg:"background-image"}],staticClass:"feed-cover"}):0===e.int_type&&e.content.images&&e.content.images.length>0?s("div",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:t.fileUrlParse(e.cover),expression:"fileUrlParse(item.cover)",arg:"background-image"}],staticClass:"feed-cover"},[s("div",{staticClass:"image-num"},[t._v(t._s(e.content.images.length)+"图")])]):1===e.int_type?s("div",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:e.content.videos[0].imageUrl,expression:"item.content.videos[0].imageUrl",arg:"background-image"}],staticClass:"feed-cover"},[s("div",{staticClass:"play-icon"})]):t._e()])]),s("div",{staticClass:"bottom"},[s("label",{staticClass:"name"},[t._v(t._s(e.communityName))]),0!=e.commentNumber?s("label",{staticClass:"community-count"},[t._v(t._s(e.commentNumber)+"评论")]):t._e(),0!=e.commentNumber&&0!=e.like?s("label",[t._v("·")]):t._e(),0!=e.like?s("label",{staticClass:"like-count"},[t._v(t._s(e.like)+"赞")]):t._e(),s("label",{staticClass:"date"},[t._v(t._s(t.dateFormate(e.long_publish_time)))])])])])}),s("div")],2)},o=[],a=s("ed08"),n=s("f121"),c={name:"feedList",data:function(){return{}},props:{subjectList:{type:Array,default:function(){return[]}},title:{type:String,default:"热门文章"}},computed:{},methods:{dateFormate:function(t,e){return Object(a["c"])(t)},fileUrlParse:function(t,e,s){return Object(a["g"])(t,e,s)},downloadApp:function(t,e,s){var i="".concat(n["a"].download,"&link=closer://feed/").concat(s);Object(a["d"])({store:this.$store,route:this.$route,str:e,defaultStr:"hot_feed",redirectUrl:i})}}},r=c,l=(s("9af2"),s("2877")),u=Object(l["a"])(r,i,o,!1,null,"778cfd62",null);u.options.__file="feedList.vue";e["a"]=u.exports},5143:function(t,e,s){},5668:function(t,e,s){"use strict";var i=s("b3cd"),o=s.n(i);o.a},"56bd":function(t,e,s){"use strict";var i=s("7e07"),o=s.n(i);o.a},"6ff3":function(t,e,s){},"7cc2":function(t,e,s){"use strict";var i=s("dc12"),o=s.n(i);o.a},"7e07":function(t,e,s){},8020:function(t,e,s){"use strict";var i=s("cf28"),o=s.n(i);o.a},"9af2":function(t,e,s){"use strict";var i=s("6ff3"),o=s.n(i);o.a},b3cd:function(t,e,s){},b6e9:function(t,e,s){},c3f2:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.ENV.app?t._e():s("section",{staticClass:"footer"},[s("div",{staticClass:"footer-wrapper",on:{click:t.downApp}},[s("div",{staticClass:"footer-btn"},[t._v(t._s(t.btnText))])])])},o=[],a=s("ed08"),n={props:{btnText:{type:String,default:"打开贴近app，查看更多精彩文章"}},data:function(){return{}},methods:{downApp:function(){Object(a["e"])()}}},c=n,r=(s("d91c"),s("2877")),l=Object(r["a"])(c,i,o,!1,null,"3a567764",null);l.options.__file="footBar.vue";e["a"]=l.exports},c64e:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.ENV.app?t._e():s("section",{staticClass:"focus-bar"},[s("section",{staticClass:"focus-wrap"},[s("section",{staticClass:"community",class:t.showStyle},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:this.$store.state.res.blogo,expression:"this.$store.state.res.blogo"}],staticClass:"community-logo",attrs:{src:t.defaultImg},on:{click:t.toCommunity}}),s("div",{staticClass:"community-info"},[s("p",{staticClass:"community-name ellipsis"},[t._v(t._s(this.$store.state.res.communityName||this.$store.state.res.name))]),t.showTime?s("p",{staticClass:"community-time"},[t._v(t._s(t.dateFromNow))]):t._e()])]),s("t-focus",{attrs:{communityid:t.res.communityid}})],1)])},o=[],a=s("c93e"),n=(s("a78e"),s("dc20")),c=s("2f62"),r=s("ed08"),l={props:{showType:String,showTime:Boolean},data:function(){return{defaultImg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg=="}},components:{tFocus:n["a"]},computed:Object(a["a"])({},Object(c["d"])(["res"]),{showStyle:function(){return"community-".concat(this.showType)},dateFromNow:function(){return Object(r["c"])(this.res.long_update_time)}}),methods:{toCommunity:function(){this.$router.push({path:"/community/".concat(this.res.communityid)})}},mounted:function(){this.$nextTick(function(){var t=document.querySelector(".access-not");t&&t.dataset.original&&(t.src=t.dataset.original)})}},u=l,m=(s("8020"),s("2877")),d=Object(m["a"])(u,i,o,!1,null,"f901af8a",null);d.options.__file="focusBar.vue";e["a"]=d.exports},cf28:function(t,e,s){},d862:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return!t.ENV.app&&t.messagelist?s("div",{staticClass:"wrapper bg-f"},[t.messagelist.length>0?s("div",{staticClass:"message-board"},[s("div",{staticClass:"board-top"},[s("span",{staticClass:"title",attrs:{id:"title"}},[t._v("精彩留言")]),s("span",{staticClass:"write-message",on:{click:function(e){t.writeMessage("comment",t.$route.params.id)}}},[t._v("写留言")])]),t._l(t.messagelist,function(e,i){return s("div",{key:i,staticClass:"message-list"},[s("div",{staticClass:"message-info box box-lr"},[e.user?s("div",{staticClass:"avater"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.fileUrlParse(e.user.attributes.roster.avatar)||t.fileUrlParse(e.user.avatar),expression:"fileUrlParse(item.user.attributes.roster.avatar) || fileUrlParse(item.user.avatar)"}],attrs:{alt:""}})]):t._e(),s("div",{staticClass:"info-ceil box box-tb"},[s("span",{staticClass:"name"},[t._v(t._s(e.user.attributes.roster.name||e.user.fullname))]),s("span",{staticClass:"time"},[t._v(t._s(t.dateFromNow(e.long_create_time)))])]),s("div",{staticClass:"response box box-lr box-center-center",on:{click:function(s){t.writeMessage("reply",e.commentid)}}},[s("span",{staticClass:"res-icon icon-width"}),s("span",{staticClass:"res-count"},[t._v(t._s(e.replyNumber))])]),s("div",{staticClass:"support",on:{click:function(s){t.support(s,e.subjectid,e.commentid,e.like)}}},[s("img",{staticClass:"support icon-width",attrs:{src:"data:image/png;base64,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"}})])]),s("div",{staticClass:"message-content"},[t._v("\n        "+t._s(e.content)+"\n      ")]),e.replyNumber>0?s("div",{staticClass:"message-replay"},[t._l(e.sonList,function(e,i){return i<=3?s("div",{key:i,staticClass:"replay"},[s("span",[t._v(t._s(e.user.fullname)+"：")]),s("span",{staticClass:"replay-content"},[t._v(t._s(e.content))])]):t._e()}),e.replyNumber>3?s("div",{staticClass:"replay-total",on:{click:t.downApp}},[s("span",[t._v("共"+t._s(e.replyNumber)+"条回复")]),s("span",{staticClass:"right-icon"})]):t._e()],2):t._e()])}),s("div",{staticClass:"more-comment",on:{click:t.downApp}},[t._v("点击查看更多评论"),s("span")])],2):s("div",{staticClass:"no-draft"},[s("span",{staticClass:"text"},[t._v("暂无留言，赶紧留言吧~")]),s("span",{staticClass:"write",on:{click:function(e){t.writeMessage("comment",t.$route.params.id)}}},[t._v("写留言")])]),s("login-pop",{ref:"login",attrs:{isFrom:"messagelist"}})],1):t._e()},o=[],a=s("c93e"),n=(s("f121"),s("1954")),c=s("2f62"),r=s("ed08"),l={name:"wrapper",components:{LoginPop:n["a"]},data:function(){return{pagenum:1,pagesize:5,isSupport:!1}},beforeMount:function(){this.$route.query.code;this.$route.params.id&&this.getCommentsList({subjectid:this.$route.params.id,pagenum:this.pagenum,pagesize:this.pagesize})},mounted:function(){console.log("this.res--",this.res)},computed:Object(a["a"])({},Object(c["d"])("article",["res","content"]),Object(c["d"])("common",{messagelist:function(t){return t.messagelist}})),methods:Object(a["a"])({},Object(c["b"])("common",["getCommentsList","checkIsLike","getWxAuth","getUserInfoWithWx"]),{fileUrlParse:function(t,e,s){return Object(r["g"])(t,e,s)},dateFromNow:function(t){return Object(r["c"])(t)},writeMessage:function(t,e){var s;(console.log("Cookies--",Cookies.get("token")),2===this.res.int_type?window.sessionStorage.setItem("title",this.res.title):window.sessionStorage.setItem("title",this.content.text),Cookies.get("user"))?this.gotoMessage(t,e):window.ENV.wx?(console.log(this.$route.query.code),s="comment"===t?"/message/"+this.$route.params.id:"/message/"+this.$route.params.id+"/"+e,this.$route.query.code||this.getWxAuth({payload:{path:s,query:this.$route.query}})):this.gotoMessage(t,e)},gotoMessage:function(t,e){"comment"===t?this.$router.push({path:"/message/".concat(e)}):this.$router.push({path:"/message/".concat(this.$route.params.id,"/").concat(e)})},downApp:function(){Object(r["e"])()},support:function(t,e,s,i){if(!this.isSupport){var o={subjectid:e,commentid:s,flag:i};this.checkIsLike(o),t.target.src="data:image/png;base64,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",this.isSupport=!0}}})},u=l,m=(s("7cc2"),s("2877")),d=Object(m["a"])(u,i,o,!1,null,"37d87283",null);d.options.__file="messageBoard.vue";e["a"]=d.exports},d91c:function(t,e,s){"use strict";var i=s("5143"),o=s.n(i);o.a},dc12:function(t,e,s){},dc20:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.ENV.app?t._e():s("section",{staticClass:"focus"},[t.is_follow?s("section",{staticClass:"focus-btn-disabled"}):t._e(),s("section",{on:{click:t.tjFocus}},[t.$route.path.indexOf("community")>-1?s("section",{staticClass:"focus-community"},[t.is_follow?s("section",{staticClass:"yet-focus"},[s("span",[t._v("已关注")])]):s("section",{staticClass:"no-focus"},[s("span",[t._v("关注栏目")])])]):s("section",{staticClass:"other"},[t.is_follow?s("section",{staticClass:"yet-focus"},[s("span",[t._v("已关注")])]):s("section",{staticClass:"no-focus"},[s("span",[t._v("关注")])])])])])},o=[],a=(s("96cf"),s("3040")),n=s("c93e"),c=s("2f62"),r=s("ed08"),l={props:{communityid:{type:String,default:""}},data:function(){return{}},computed:Object(n["a"])({},Object(c["d"])(["is_follow"]),Object(c["d"])("article",["res"]),Object(c["d"])("common",["isLogin"])),watch:{isLogin:function(t,e){t&&"focus"==sessionStorage.userAction&&this.tjFocus()},communityid:function(t){t&&this.getFocusState(t)}},methods:Object(n["a"])({},Object(c["b"])("common",["getFocusState","getWxAuth","get_focus_stat"]),{tjFocus:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:Cookies.get("token")?this.get_focus_stat({payload:{communityid:this.res.communityid?this.res.communityid:this.communityid,flag:this.is_follow?0:1},after:function(){sessionStorage.userAction=null}}):this.ENV.wx?this.getWxAuth({payload:{path:this.$route.path,query:this.$route.query},before:function(){sessionStorage.userAction="focus"}}):Object(r["e"])();case 1:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()}),mounted:function(){}},u=l,m=(s("1416"),s("2877")),d=Object(m["a"])(u,i,o,!1,null,"0f19f2f1",null);d.options.__file="focus.vue";e["a"]=d.exports},e2b6:function(t,e,s){"use strict";var i=s("ef24"),o=s.n(i);o.a},ef24:function(t,e,s){},fb25:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.ENV.app?t._e():s("section",{staticClass:"download-bar"},[t.placeholder?s("div",{staticClass:"place"}):t._e(),s("div",{staticClass:"wrap"},[s("div",{staticClass:"left"},[s("div",{staticClass:"left-logo"}),s("mt-swipe",{staticClass:"mtswipe left-desc",attrs:{auto:4e3,"show-indicators":!1}},[s("mt-swipe-item",[s("div",{staticClass:"swip-item"},[s("span",[t._v("贴近一点 看身边")])])]),s("mt-swipe-item",[s("div",{staticClass:"swip-item"},[s("span",[t._v("能赚稿费的本地内容社区")])])]),s("mt-swipe-item",[s("div",{staticClass:"swip-item"},[s("p",[t._v("打开贴近看资讯")]),s("p",[t._v("领10元红包")])])])],1)],1),s("div",{staticClass:"right"},[s("div",{staticClass:"right-btn",on:{click:t.handleClick}},[t._v("下载贴近")])])])])},o=[],a=(s("7f7f"),s("2b0e")),n=s("ed08"),c=s("f121"),r=s("76a0");a["default"].component(r["Swipe"].name,r["Swipe"]),a["default"].component(r["SwipeItem"].name,r["SwipeItem"]);var l={name:"downloadBar",props:{placeholder:{type:Boolean,default:!0}},mounted:function(){},methods:{handleClick:function(t,e){var s=c["a"].download;Object(n["d"])({store:this.$store,route:this.$route,str:e,defaultStr:"direct_top",redirectUrl:s})}}},u=l,m=(s("5668"),s("2877")),d=Object(m["a"])(u,i,o,!1,null,"05087866",null);d.options.__file="downloadBar.vue";e["a"]=d.exports}}]);
//# sourceMappingURL=chunk-76d688e8.02cd0bcd.js.map
(function(e){function t(t){for(var a,r,i=t[0],s=t[1],u=t[2],l=0,d=[];l<i.length;l++)r=i[l],c[r]&&d.push(c[r][0]),c[r]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);p&&p(t);while(d.length)d.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,r=1;r<n.length;r++){var i=n[r];0!==c[i]&&(a=!1)}a&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},r={app:0},c={app:0},o=[];function i(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-a586":"77d34e30"}[e]+".js"}function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={"chunk-a586":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise(function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-a586":"d10130ad"}[e]+".css",r=s.p+a,c=document.getElementsByTagName("link"),o=0;o<c.length;o++){var i=c[o],u=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(u===a||u===r))return t()}var l=document.getElementsByTagName("style");for(o=0;o<l.length;o++){i=l[o],u=i.getAttribute("data-href");if(u===a||u===r)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var a=t&&t.target&&t.target.src||r,c=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");c.request=a,n(c)},d.href=r;var p=document.getElementsByTagName("head")[0];p.appendChild(d)}).then(function(){r[e]=0}));var a=c[e];if(0!==a)if(a)t.push(a[2]);else{var o=new Promise(function(t,n){a=c[e]=[t,n]});t.push(a[2]=o);var u,l=document.getElementsByTagName("head")[0],d=document.createElement("script");d.charset="utf-8",d.timeout=120,s.nc&&d.setAttribute("nonce",s.nc),d.src=i(e),u=function(t){d.onerror=d.onload=null,clearTimeout(p);var n=c[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src,o=new Error("Loading chunk "+e+" failed.\n("+a+": "+r+")");o.type=a,o.request=r,n[1](o)}c[e]=void 0}};var p=setTimeout(function(){u({type:"timeout",target:d})},12e4);d.onerror=d.onload=u,l.appendChild(d)}return Promise.all(t)},s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var p=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"1a0c":function(e,t,n){"use strict";var a=n("1b8b"),r=n.n(a);r.a},"1b8b":function(e,t,n){},"2f74":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},c=[],o={name:"App"},i=o,s=(n("1a0c"),n("2877")),u=Object(s["a"])(i,r,c,!1,null,"d3673bd4",null),l=u.exports,d=(n("6423"),n("2f74"),n("76a0")),p=n.n(d),h=(n("aa35"),n("7f7f"),n("8c4f")),f=(n("7c15"),n("c0d6")),_=function(){return n.e("chunk-a586").then(n.bind(null,"e878"))};a["default"].use(h["a"]);var m=new h["a"]({mode:"history",routes:[{path:"/comment",name:"comment",component:_}]});m.beforeEach(function(e,t,n){var a=e.meta;e.path,e.query,e.name,e.params;document.title=a.title?a.title:"贴近",n()});var g=m,v=n("bc3a"),w=n.n(v),A=n("f121"),b=w.a.create({baseURL:Object({NODE_ENV:"production",BASE_URL:"/"}).BASE_API,timeout:15e3,withCredentials:!0});b.interceptors.request.use(function(e){var t=A["a"].serverDevUrl+e.url;return/a-sandbox.tiejin/.test(window.location.href)?t=A["a"].serverDevUrl+e.url:/a.tiejin/.test(window.location.href)&&(t=A["a"].serverUrl+e.url),console.log("requrl",t),e.url=t,f["a"].state.IS_APP?f["a"].state.UA.indexOf("closer-ios")>-1?e.headers["Closer-Agent"]="Closer-Ios":f["a"].state.UA.indexOf("closer-android")>-1&&(e.headers["Closer-Agent"]="Closer-Android"):e.headers["Closer-Agent"]="Closer-H5",Cookies.get("uid")&&(e.headers["X-Udid"]=Cookies.get("uid")),Cookies.get("aid")&&(e.headers["X-Adid"]=Cookies.get("aid")),(Cookies.get("GroukAuth")&&-1==e.url.indexOf("auth")&&-1==e.url.indexOf("account")||Cookies.get("GroukAuth")&&-1!=e.url.indexOf("closer_account.bind_phone"))&&(e.headers.Authorization=Cookies.get("GroukAuth")),d["Indicator"].open(),e},function(e){return d["Indicator"].close(),Promise.reject(e).catch(e)}),b.interceptors.response.use(function(e){return d["Indicator"].close(),e},function(e){var t=n("07f7").default;if(e&&e.response)switch(e.response.status){case 400:e.message="请求错误";break;case 401:e.message="未授权，请登录",router.push({name:"worldcupIndex"});break;case 403:e.message="拒绝访问",router.push({name:"worldcupIndex"});break;case 404:e.message="请求地址出错: ".concat(e.response.config.url);break;case 408:e.message="请求超时";break;case 500:e.message="服务器内部错误";break;case 501:e.message="服务未实现";break;case 502:e.message="网关错误";break;case 503:e.message="服务不可用";break;case 504:e.message="网关超时";break;case 505:e.message="HTTP版本不受支持";break;default:}else e.message="网络错误，请稍后再试！";return e&&e.response&&e.response.data&&e.response.data.message?console.warn(e.response.data.message):console.warn(e.message),d["Indicator"].close(),t.reject(e).catch(e)});var y=b,k=n("a78e"),j=n.n(k),x=n("3a34"),O=n.n(x),E=n("c6c6"),U=n.n(E),C=(n("18a0"),n("283e")),S=n.n(C);if(/sandbox.tiejin/.test(window.location.href)||/127.0.0.1/.test(window.location.href)||/10.3.0.107/.test(window.location.href)){new O.a;f["a"].state.IS_DEV=!0,j.a.set("IS_DEV",!0,{expires:1})}function B(){var e=Math.min(screen.width,document.documentElement.getBoundingClientRect().width)/375*16;document.documentElement.style.fontSize=(e>=32?32:e)+"px"}window.Axios=y,window.Cookies=j.a,window.MobileDetect=U.a,window.setupWebViewJavascriptBridge=function(e){if(window.WebViewJavascriptBridge)return e(WebViewJavascriptBridge);if(window.WVJBCallbacks)return window.WVJBCallbacks.push(e);window.WVJBCallbacks=[e];var t=document.createElement("iframe");t.style.display="none",t.src="https://__bridge_loaded__",document.documentElement.appendChild(t),setTimeout(function(){document.documentElement.removeChild(t)},0)},a["default"].use(p.a),a["default"].use(S.a,{loading:"./assets/default.jpeg"}),B(),window.onresize=B,new a["default"]({store:f["a"],router:g,render:function(e){return e(l)}}).$mount("#app")},6423:function(e,t,n){},"7c15":function(e,t,n){"use strict";var a,r=n("a322");t["a"]={admin:{get_auth_path:"closer_auth.get_auth_path",login_with_wechat:"closer_auth.login_with_wechat",closeruser_regist:"closer_auth.closeruser_regist",get_code_by_phone:"closer_account.get_code_by_phone_v2",check:"closer_account.check",check_wechat:"closer_account.check_wechat",info:"closer_user.info",user_show:"closer_user.show",bind_phone:"closer_account.bind_phone",like:"closer_reply.like",add_reply:"closer_reply.add_reply",invite_counts:"closer_user.invite_counts",wechat_config:"closer_share.wechat_config"},command:{show:"closer_subject.show",incr_view:"closer_subject.incr_view",comments:"closer_reply.comments",videos:"ali_vod.accessInfo",report:"closer_report.add",like:"closer_reply.like",add_reply:"closer_reply.add_reply",replys:"closer_reply.replys",reportType:"closer_report.get_report_types"},community:{show:"closer_community.show",community_subject_list_index:"closer_subject.community_subject_list_index",subscription:"closer_community.subscription"},group:{show:"closer_class.show",recruiting:"closer_class.recruiting",group_subject_list:"closer_subject.class_subject_list_index",share_group:"closer_share.outer_group"},activity:(a={get_activity:"closer_activity.get_activity",add_channel:"activity_worldcup.add_channel",check_guess_result:"activity_worldcup.check_guess_result",get_match_list:"activity_worldcup.get_match_list",get_user_guess_list:"activity_worldcup.get_user_guess_list",get_user_guess_statistic:"activity_worldcup.get_user_guess_statistic",guess_match:"activity_worldcup.guess_match",receive_chance:"activity_worldcup.receive_chance"},Object(r["a"])(a,"check_guess_result","activity_worldcup.check_guess_result"),Object(r["a"])(a,"activity_water_chance","activity_water.chance"),Object(r["a"])(a,"activity_water_update","activity_water.update"),Object(r["a"])(a,"activity_water_join","activity_water.join"),Object(r["a"])(a,"get_invite_statistic","closer_invite.get_statistic"),Object(r["a"])(a,"get_invitee_page_list","closer_invite.get_invitee_page_list"),Object(r["a"])(a,"get_yesterday_award_amt","closer_invite.get_yesterday_award_amt"),Object(r["a"])(a,"remind_login","closer_invite.remind_login"),a),statitics:{view_count:"closer_promotion_activity.view_count",get_adcookie:"closer_statistics.get_adcookie"}}},c0d6:function(e,t,n){"use strict";n("cadf"),n("551c");var a=n("2b0e"),r=n("2f62"),c=(n("a481"),n("4917"),n("96cf"),n("3040")),o=n("7c15");function i(e){return s.apply(this,arguments)}function s(){return s=Object(c["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Axios.post(o["a"].command.show,t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e,this)})),s.apply(this,arguments)}var u=n("76a0"),l=n("ed08"),d={namespaced:!0,state:{discuss:{},content:{},subject:{}},mutations:{setContent:function(e,t){console.log("content",t),e.content=t},setDiscuss:function(e,t){console.log("discuss",t),e.discuss=t},setSubject:function(e,t){console.log("subject",t),e.subject=t}},actions:{getSubject:function(){var e=Object(c["a"])(regeneratorRuntime.mark(function e(t,n){var a,r,c,o,s,d,p;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.commit,e.next=3,i(n).catch(function(){Object(u["Toast"])("网络开小差啦~")});case 3:r=e.sent,c=r.data,"undefined"!=typeof c.code&&0==c.code&&c.result.content&&(o=JSON.parse(c.result.content),2===c.result.int_type&&(s=Object(l["c"])(o.html,!1),s&&(o.html=s),3===c.result.int_category&&o.end_html&&(d=Object(l["c"])(o.end_html,!1),d&&(o.end_html=d))),o.discuss&&(p=o.discuss.map(function(e){if(e.text){var t=/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g,n=e.text.match(t);n?(e.weblink=!0,n.map(function(n){var a='<a href="'.concat(n,'" target="_blank">').concat(n,"</a>"),r=e.text.replace(t,a);e.newText=r})):e.weblink=!1}return e}),a("setDiscuss",p)),a("setContent",o),delete c.result.content,a("setSubject",c.result));case 6:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}()}};a["default"].use(r["a"]);t["a"]=new r["a"].Store({state:{UA:"",IS_APP:!1,IS_NEW_USER:!1,IS_DEV:!1},modules:{comment:d}})},ed08:function(e,t,n){"use strict";n.d(t,"c",function(){return c}),n.d(t,"b",function(){return o}),n.d(t,"a",function(){return i});n("a481"),n("ac6a"),n("4917"),n("28a5");var a=n("f121"),r=n("c0d6");function c(e,t){var n=/<img.*?(?:>|\/>)/gi,a=e.match(n);if(a){var r=/src=[\'\"]?([^\'\"]*)[\'\"]?/i,c=/width=[\'\"]?([^\'\"]*)[\'\"]?/i,o=/height=[\'\"]?([^\'\"]*)[\'\"]?/i;a.forEach(function(t,n){var a,i,s,u=t.match(r),l=t.match(c),d=t.match(o);u?l&&d?(l[1]<200?(a=l[1]+"px",s=d[1]+"px"):(a="100%",s=100*d[1]/l[1]+"%"),s,i=t.replace(/src=/g,'style="width: '.concat(a,";height: 0; padding-bottom: ").concat(s,'; background: #e7e7e7; max-width: 100%;" data-feedlazy="feedlazy" data-index="').concat(n+1,'" data-src='))):(a="100%",s="auto","28.27vw",i=t.replace(/src=/g,'style="width: '.concat(a,'; background: #e7e7e7; max-width: 100%;" data-feedlazy="feedlazy2" data-index="').concat(n+1,'" data-src='))):i="",e=e.replace(t,i)})}var i=/<video.*?(?:>|\/>|<\/video>)/gi,s=e.match(i);if(s){var u,l=/src=[\'\"]?([^\'\"]*)[\'\"]?/i,d=/vid=[\'\"]?([^\'\"]*)[\'\"]?/i,p=/imageUrl=[\'\"]?([^\'\"]*)[\'\"]?/i,h=/poster=[\'\"]?([^\'\"]*)[\'\"]?/i;s.forEach(function(n,a){var r,c,o,i=n.match(l),s=n.match(d),f=n.match(p),_=n.match(h);r=s?s[1]:"",c=i?i[1]:"",o=f?f[1]:_?_[1]:"",u=t?"<section \n                    class='imgbox tiejin-videobox'\n                    data-vid='".concat(r,"'\n                    data-uid='").concat(c,"'\n                    >\n                    <video src='").concat(i[1],"'\n                      class='feed-video-bg'\n                      controls\n                      preload='none'\n                      data-bg='").concat(o,"'>\n                    </video>\n                  </section>"):"<section \n                    class='imgbox video-native-player tiejin-videobox-native feed-video-bg'\n                    data-vid='".concat(r,"'\n                    data-uid='").concat(c,"'\n                    data-bg='").concat(o,"'\n                    style='background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==\");'>\n                    <section \n                      class='flex \n                      flex-align-center \n                      flex-pack-center'\n                      data-vid='").concat(r,"'\n                      data-uid='").concat(c,"'\n                      >\n                      <span \n                        class='icon-shipin-2' \n                        data-vid='").concat(r,"'\n                        data-uid='").concat(c,"'\n                        >\n                      </span>\n                    </section>\n                  </section>"),e=e.replace(n,u)})}var f=/<iframe.*?(?:>|\/>|<\/iframe>)/gi,_=e.match(f);if(_){var m=/width=[\'\"]?([^\'\"]*)[\'\"]?/i,g=/height=[\'\"]?([^\'\"]*)[\'\"]?/i;_.forEach(function(t,n){var a=t.match(m),r=t.match(g),c=t.split(a[0]),o="".concat(c[0],'width="100%"').concat(c[1]),i=o.split(r[0]),s="".concat(i[0],' height="240" ').concat(i[1]),u='<section class="imgbox tiejin-iframe">\n                  '.concat(s,"</iframe>\n                </section>");e=e.replace(t,u)})}return e}function o(e,t,n){var c=a["a"].fileUrl;if(r["a"].state.IS_DEV&&(c=a["a"].fileDevUrl),console.log(c),e){var o=n||500;return"src"===t?-1!==e.indexOf("://")?e+"?s="+o:c+e+"?s="+o:-1!==e.indexOf("://")?e:c+e}}function i(e,t){var n=new Date(e),a=new Date,r=n.getTime(n),c=a.getTime(a),o=c-r,i=o/1e3/60/60/24/30,s=Math.floor(i),u=o/1e3/60/60/24,l=Math.floor(u),d=o/1e3/60/60-24*l,p=Math.floor(d),h=o/1e3/60-1440*l-60*p,f=Math.floor(h),_=o/1e3-86400*l-3600*p-60*f,m=Math.floor(_);return s>1?s+"个月前":l>0?l+"天前":p>0?p+"小时前":f>10?f+"分钟前":m>0?"刚刚":void 0}},f121:function(e,t,n){"use strict";t["a"]={fileUrl:"https://file.tiejin.cn",fileDevUrl:"https://file-sandbox.tiejin.cn",serverUrl:"https://api.tiejin.cn/command/",devserverUrl:"http://10.3.0.11:8080/command/",subdevserverUrl:"http://oms-sandbox.tiejin.cn/command",serverDevUrl:"https://api-sandbox.tiejin.cn/command/",downUrl:"http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer",wxLoginDevUrl:"https://h5-sandbox.tiejin.cn/redirect?redirectUrl=https://a-sandbox.tiejin.cn/teabar/water-9d3foyvita",wxLoginUrl:"https://h5.tiejin.cn/redirect?redirectUrl=https://a.tiejin.cn/teabar/water-9ziqRidiYX",file:"/file/upload/public"}}});
//# sourceMappingURL=app.5e432a8d.js.map
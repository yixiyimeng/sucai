(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-details-details"],{"0fdb":function(t,i,a){var n=a("aaef");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var e=a("4f06").default;e("9b01165a",n,!0,{sourceMap:!1,shadowMode:!1})},"13c3":function(t,i,a){"use strict";a.r(i);var n=a("43a1"),e=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(i,t,function(){return n[t]})}(o);i["default"]=e.a},"1bf0":function(t,i,a){"use strict";var n=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("v-uni-view",{staticClass:"cu-modal",class:t.showModal?"show":""},[a("v-uni-view",{staticClass:"cu-dialog bg-white"},[a("v-uni-view",{staticClass:"title flex justify-between align-center"},[a("v-uni-text",[t._v(t._s(0==this.id?"添加":"编辑")+"收藏夹")]),a("v-uni-text",{staticClass:"cuIcon-close",on:{click:function(i){i=t.$handleEvent(i),t.showModal=!1}}})],1),a("v-uni-view",{staticClass:"padding-sm solid text-left margin"},[a("v-uni-input",{attrs:{type:"text",value:"",placeholder:"收藏夹名称"},model:{value:t.info,callback:function(i){t.info=i},expression:"info"}})],1),a("v-uni-view",{staticClass:"ftbar flex"},[a("v-uni-view",{staticClass:"btn flex-sub",on:{click:function(i){i=t.$handleEvent(i),t.cancel(i)}}},[t._v("取消")]),a("v-uni-view",{staticClass:"btn flex-sub",on:{click:function(i){i=t.$handleEvent(i),t.submit(i)}}},[t._v("确定")])],1)],1)],1)},e=[];a.d(i,"a",function(){return n}),a.d(i,"b",function(){return e})},"2ad7":function(t,i,a){"use strict";a.r(i);var n=a("a1b8"),e=a("7eb1");for(var o in e)"default"!==o&&function(t){a.d(i,t,function(){return e[t]})}(o);a("b2ec");var s=a("2877"),c=Object(s["a"])(e["default"],n["a"],n["b"],!1,null,"79859440",null);i["default"]=c.exports},"2c6f":function(t,i,a){var n=a("4d84");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var e=a("4f06").default;e("56f284e2",n,!0,{sourceMap:!1,shadowMode:!1})},"3b2b7":function(t,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={data:function(){return{showModal:!1,info:"",id:""}},methods:{show:function(t,i){this.id=t||0,this.info=i||"",this.showModal=!0},cancel:function(){this.showModal=!1},submit:function(){var t=this,i=this;this.$postajax(this.$api.addFollowFile,{name:this.info,id:this.id}).then(function(a){1e4==a.code?(uni.showToast({title:0==i.id?"添加成功":"编辑成功",icon:"none"}),t.showModal=!1,t.$emit("upload",t.info)):uni.showToast({title:a.message,icon:"none"})})}}};i.default=n},4397:function(t,i,a){"use strict";a.r(i);var n=a("3b2b7"),e=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(i,t,function(){return n[t]})}(o);i["default"]=e.a},"43a1":function(t,i,a){"use strict";var n=a("288e");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0,a("7f7f");var e=n(a("2ad7")),o={data:function(){return{id:"",info:{}}},components:{favmodal:e.default},onLoad:function(t){this.id=t.id,this.findMaterialDetail()},methods:{findMaterialDetail:function(){var t=this;this.$getajax(this.$api.findMaterialDetail+this.id).then(function(i){1e4==i.code&&(t.info=i.detail)})},addfav:function(){this.info.stored?this.delfollow(this.info.id):this.$refs.favmodal.show(this.info.id)},delfollow:function(t){var i=this;this.$getajax(this.$api.removeMaterialStore,{mid:t}).then(function(t){uni.showToast({title:1e4==t.code?"取消收藏成功":t.message,icon:"none"}),1e4==t.code&&i.findMaterialDetail()})},gotohome:function(){uni.switchTab({url:"/pages/index/index"})},showcollections:function(t){uni.navigateTo({url:"/pages/subfind/subfind?id="+t.id+"&name="+t.name})}}};i.default=o},"4d84":function(t,i,a){i=t.exports=a("2350")(!1),i.push([t.i,".name[data-v-523801bb]{font-size:%?40?%;font-weight:700;color:#333}.pageview>.flex-sub[data-v-523801bb]{height:%?200?%;overflow:auto;-webkit-overflow-scrolling:touch}.imgbox[data-v-523801bb]{border-radius:%?20?%;overflow:hidden;margin-top:%?40?%}.imgbox uni-image[data-v-523801bb]{display:block;width:100%}.tip[data-v-523801bb]{margin-top:%?30?%;color:#999;font-size:%?28?%;line-height:%?46?%}.tip .num[data-v-523801bb]{color:#ff6a00}.cu-bar[data-v-523801bb]{-webkit-box-shadow:0 %?-10?% %?10?% rgba(0,0,0,.05);box-shadow:0 %?-10?% %?10?% rgba(0,0,0,.05)}.cu-bar .cu-btn[data-v-523801bb]{width:80%;background:#ff6a00;border:1px solid #ff6a00;color:#fff}.cu-bar .cu-btn.cancel[data-v-523801bb]{background:#fff;color:#ff6a00}[data-v-523801bb] uni-rich-text img{max-width:100%}.cu-tag[data-v-523801bb]{width:auto;padding:%?16?% %?20?%}",""])},"4f36":function(t,i,a){"use strict";var n=a("288e");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e=n(a("a97e")),o={data:function(){return{showModal:!1,picker:[],curIndex:0,materialId:"",list:[]}},components:{addmodal:e.default},computed:{},methods:{show:function(t){this.materialId=t,this.getlist()},ChooseCheckbox:function(t){this.curIndex=t},getlist:function(){var t=this,i=this;this.$getajax(this.$api.findStores).then(function(a){var n=a.list;t.list=n,t.list.length>0?t.showModal=!0:uni.showModal({title:"提示",content:"您还没有收藏夹，请先创建",success:function(t){t.confirm&&i.addNewFile()}})})},addfav:function(){var t=this,i=this.list[this.curIndex].id;this.$postajax(this.$api.addMaterialStore,{storeId:i,materialId:this.materialId,storeTime:"",id:0}).then(function(i){1e4==i.code&&(t.showModal=!1)})},addNewFile:function(){this.$refs.addmodal.show()}}};i.default=o},"722d":function(t,i,a){"use strict";var n=a("0fdb"),e=a.n(n);e.a},"7c37":function(t,i,a){"use strict";var n=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("v-uni-view",{staticClass:"pageview flex flex-direction"},[a("cu-custom",{attrs:{isBack:!0,bgColor:"bgColor"}},[a("v-uni-text",{attrs:{slot:"content"},slot:"content"},[t._v(t._s(t.info.title))])],1),a("v-uni-view",{staticClass:"flex-sub"},[a("v-uni-view",{staticClass:"padding-sm flex flex-wrap"},t._l(t.info.collections,function(i,n){return a("v-uni-view",{key:n,staticClass:"padding-xs",on:{click:function(a){a=t.$handleEvent(a),t.showcollections(i)}}},[a("v-uni-view",{staticClass:"cu-tag  radius"},[t._v(t._s(i.name))])],1)}),1),a("v-uni-view",{staticClass:"padding"},[a("v-uni-view",{staticClass:"name margin-top"},[t._v(t._s(t.info.title))]),a("v-uni-view",{staticClass:"imgbox"},[a("v-uni-rich-text",{attrs:{nodes:t.info.content}})],1),a("v-uni-view",{staticClass:"tip"},[a("p",[t._v("下载所需积分："),a("v-uni-text",{staticClass:"num"},[t._v(t._s(t.info.cost))])],1),a("p",[t._v("文件大小："+t._s(t.info.fileSize))]),a("p",[t._v("发布人："+t._s(t.info.creator))])])],1)],1),a("v-uni-view",{staticClass:"cu-bar bg-white tabbar border shop"},[a("v-uni-view",{staticClass:"action",on:{click:function(i){i=t.$handleEvent(i),t.gotohome(i)}}},[a("v-uni-view",{staticClass:" cuIcon-home text-orange"}),t._v("首页")],1),a("v-uni-view",{staticClass:"btn-group"},[a("v-uni-button",{staticClass:"cu-btn  round shadow-blur",class:{cancel:t.info.stored},on:{click:function(i){i=t.$handleEvent(i),t.addfav(i)}}},[t._v(t._s(t.info.stored?"取消收藏":"收藏下载"))])],1)],1),a("favmodal",{ref:"favmodal"})],1)},e=[];a.d(i,"a",function(){return n}),a.d(i,"b",function(){return e})},"7ced":function(t,i,a){"use strict";var n=a("ec23"),e=a.n(n);e.a},"7eb1":function(t,i,a){"use strict";a.r(i);var n=a("4f36"),e=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(i,t,function(){return n[t]})}(o);i["default"]=e.a},"8ebc":function(t,i,a){i=t.exports=a("2350")(!1),i.push([t.i,".pageview[data-v-523801bb],uni-page-body[data-v-523801bb]{background:#fff;height:100%;overflow:hidden}body.?%PAGE?%[data-v-523801bb]{background:#fff}",""])},9075:function(t,i,a){var n=a("9635");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var e=a("4f06").default;e("786a3420",n,!0,{sourceMap:!1,shadowMode:!1})},9217:function(t,i,a){"use strict";var n=a("2c6f"),e=a.n(n);e.a},9635:function(t,i,a){i=t.exports=a("2350")(!1),i.push([t.i,".cu-modal .title[data-v-79859440]{color:#000;font-size:%?40?%;padding:%?20?% %?36?%}.cu-modal .title uni-image[data-v-79859440]{width:%?46?%}.cu-modal .btn[data-v-79859440]{line-height:%?80?%;width:%?600?%;margin:%?40?% auto}.cu-modal .picker[data-v-79859440]{line-height:%?60?%;text-align:left;margin:%?10?% %?40?%}.cu-tag[data-v-79859440]{width:auto;padding:%?16?%}.cu-tag.active[data-v-79859440]{color:#fff;background:#f37b1d}.tip[data-v-79859440]{color:#999;font-size:%?20?%;padding:%?20?%}.grid[data-v-79859440]{max-height:%?400?%;overflow:auto;-webkit-overflow-scrolling:touch}.add[data-v-79859440]{border-radius:%?50?%;padding:%?10?% %?26?%;color:#f37b1d;border:1px solid #f37b1d;font-size:%?24?%}",""])},a1b8:function(t,i,a){"use strict";var n=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("v-uni-view",[a("v-uni-view",{staticClass:"cu-modal bottom-modal",class:t.showModal?"show":"",on:{click:function(i){i=t.$handleEvent(i),t.showModal=!1}}},[a("v-uni-view",{staticClass:"cu-dialog",on:{click:function(i){i.stopPropagation(),i=t.$handleEvent(i)}}},[a("v-uni-view",{staticClass:"tip"},[a("v-uni-view",[t._v("收藏后用电脑访问网址")]),a("v-uni-view",[t._v("sucai.yipro.cn进入收藏下载")])],1),a("v-uni-view",{staticClass:"title flex justify-between align-center"},[a("v-uni-text",[t._v("选择收藏夹")]),a("v-uni-text",{staticClass:"add",on:{click:function(i){i=t.$handleEvent(i),t.addNewFile(i)}}},[t._v("新建收藏夹")])],1),t.list.length>0?a("v-uni-view",{staticClass:"grid col-3 padding-sm"},t._l(t.list,function(i,n){return a("v-uni-view",{key:n,staticClass:"padding-xs"},[a("v-uni-button",{staticClass:"cu-btn orange lg block",class:n==t.curIndex?"bg-orange":"line-orange",on:{click:function(i){i=t.$handleEvent(i),t.ChooseCheckbox(n)}}},[t._v(t._s(i.name))])],1)}),1):t._e(),a("v-uni-view",{staticClass:"btn bg-orange round",on:{click:function(i){i=t.$handleEvent(i),t.addfav(i)}}},[t._v("确定")])],1)],1),a("addmodal",{ref:"addmodal",on:{upload:function(i){i=t.$handleEvent(i),t.getlist(i)}}})],1)},e=[];a.d(i,"a",function(){return n}),a.d(i,"b",function(){return e})},a97e:function(t,i,a){"use strict";a.r(i);var n=a("1bf0"),e=a("4397");for(var o in e)"default"!==o&&function(t){a.d(i,t,function(){return e[t]})}(o);a("722d");var s=a("2877"),c=Object(s["a"])(e["default"],n["a"],n["b"],!1,null,"8f27b6ac",null);i["default"]=c.exports},aaef:function(t,i,a){i=t.exports=a("2350")(!1),i.push([t.i,".cu-modal .cu-dialog[data-v-8f27b6ac]{width:%?600?%}.cu-modal .title[data-v-8f27b6ac]{color:#000;font-size:%?40?%;padding:%?38?% %?36?% %?30?% %?48?%}.cu-modal .title uni-image[data-v-8f27b6ac]{width:%?46?%}.cu-modal .logo[data-v-8f27b6ac]{width:%?118?%;margin:%?50?% auto}.cu-modal .copyitem[data-v-8f27b6ac]{font-size:%?34?%;color:rgba(0,0,0,.6);padding:%?20?% %?60?%}.cu-modal .copyitem .btn[data-v-8f27b6ac]{color:#3dc098;border:1px solid #3dc098;border-radius:%?20?%;font-size:%?24?%;line-height:%?40?%;width:%?80?%}.cu-modal .ftbar[data-v-8f27b6ac]{border-top:%?2?% solid rgba(0,0,0,.1);height:%?112?%;margin-top:%?50?%}.cu-modal .ftbar .btn[data-v-8f27b6ac]{font-weight:700;font-size:%?34?%;line-height:%?110?%;text-align:center}.cu-modal .ftbar .btn+.btn[data-v-8f27b6ac]{border-left:%?2?% solid rgba(0,0,0,.1);line-height:%?110?%;color:#576b95;font-size:%?34?%;background:none}",""])},b2ec:function(t,i,a){"use strict";var n=a("9075"),e=a.n(n);e.a},b736:function(t,i,a){"use strict";a.r(i);var n=a("7c37"),e=a("13c3");for(var o in e)"default"!==o&&function(t){a.d(i,t,function(){return e[t]})}(o);a("7ced"),a("9217");var s=a("2877"),c=Object(s["a"])(e["default"],n["a"],n["b"],!1,null,"523801bb",null);i["default"]=c.exports},ec23:function(t,i,a){var n=a("8ebc");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var e=a("4f06").default;e("53ccf8d1",n,!0,{sourceMap:!1,shadowMode:!1})}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"1bpE":function(t,a){t.exports={type:"image",mimeType:"image/webp",src:"/assets/static/karam.2518f24.aa5360ac9101e02c01081a0b8e271a85.webp",size:{width:180,height:180},sizes:"(max-width: 180px) 100vw, 180px",srcset:["/assets/static/karam.2518f24.aa5360ac9101e02c01081a0b8e271a85.webp 180w"]}},"2qYH":function(t,a,s){"use strict";s.r(a);var e=s("A6W1"),i=s("BA+P"),o={components:{Author:e.a,PostCard:i.a},metaInfo:{title:"Hello, world!"}},n=s("KHd+"),c=null,r=Object(n.a)(o,(function(){var t=this.$createElement,a=this._self._c||t;return a("Layout",[a("h1",{staticClass:"tag-title text-center space-bottom"},[this._v("# "+this._s(this.$page.tag.title))]),a("div",{staticClass:"posts"},this._l(this.$page.tag.belongsTo.edges,(function(t){return a("PostCard",{key:t.node.id,attrs:{post:t.node}})})),1)])}),[],!1,null,null,null);"function"==typeof c&&c(r);a.default=r.exports},"7qvl":function(t,a,s){},A6W1:function(t,a,s){"use strict";var e={},i=(s("ehCf"),s("KHd+")),o=s("Kw5r"),n=o.a.config.optionMergeStrategies.computed,c={metadata:{email:"contact@karam.io",github:"karam94",linkedin:"karamkabbara"}},r=function(t){var a=t.options;a.__staticData?a.__staticData.data=c:(a.__staticData=o.a.observable({data:c}),a.computed=n({$static:function(){return a.__staticData.data}},a.computed))},l=Object(i.a)(e,(function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"social-icons"},[a("a",{attrs:{href:"mailto:"+this.$static.metadata.email,target:"_blank"}},[a("font-awesome",{staticClass:"social-icons__icon",attrs:{icon:["fas","envelope"]}})],1),a("a",{attrs:{href:"http://github.com/"+this.$static.metadata.github,target:"_blank"}},[a("font-awesome",{staticClass:"social-icons__icon",attrs:{icon:["fab","github"]}})],1),a("a",{attrs:{href:"http://linkedin.com/in/"+this.$static.metadata.linkedin,target:"_blank"}},[a("font-awesome",{staticClass:"social-icons__icon",attrs:{icon:["fab","linkedin"]}})],1)])}),[],!1,null,null,null);"function"==typeof r&&r(l);var p={components:{Social:l.exports},props:["showTitle"],data:function(){return{stringsToType:["Hi, I'm Karam!","I <span style='color:red;'>♥</span> .NET Core, Vue.js &amp; lots more!","Welcome to my blog!"]}}},u=(s("ArLL"),o.a.config.optionMergeStrategies.computed),d={metadata:{siteName:"Karam.io"}},m=function(t){var a=t.options;a.__staticData?a.__staticData.data=d:(a.__staticData=o.a.observable({data:d}),a.computed=u({$static:function(){return a.__staticData.data}},a.computed))},_=Object(i.a)(p,(function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"author"},[a("g-image",{staticClass:"author__image",attrs:{alt:"Karam's image",src:s("1bpE"),width:"180",height:"180",blur:"50",immediate:"true"}}),a("div",{staticClass:"typing-container"},[a("vue-typed-js",{attrs:{strings:this.stringsToType,"type-speed":100,"back-delay":1500,loop:!0}},[a("div",{staticClass:"typing"})])],1),a("Social")],1)}),[],!1,null,null,null);"function"==typeof m&&m(_);a.a=_.exports},AO8t:function(t,a,s){},ArLL:function(t,a,s){"use strict";s("AO8t")},"BA+P":function(t,a,s){"use strict";var e={components:{PostTags:s("PpWc").a},props:["post"]},i=(s("YDir"),s("KHd+")),o=Object(i.a)(e,(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"post-card content-box",class:{"post-card--has-poster":t.post.poster}},[s("div",{staticClass:"post-card__header"},[t.post.cover_image?s("g-image",{staticClass:"post-card__image",attrs:{alt:"Cover image",src:t.post.cover_image}}):t._e()],1),s("div",{staticClass:"post-card__content"},[s("h3",{directives:[{name:"g-image",rawName:"v-g-image"}],staticClass:"post-card__title",domProps:{innerHTML:t._s(t.post.title)}}),s("PostTags",{staticClass:"post-card__tags",attrs:{post:t.post}}),s("g-link",{staticClass:"post-card__link",attrs:{to:t.post.path}},[t._v("Link")])],1)])}),[],!1,null,null,null);a.a=o.exports},GsXb:function(t,a,s){"use strict";s("7qvl")},NAO6:function(t,a,s){},PpWc:function(t,a,s){"use strict";var e={props:["post"]},i=(s("GsXb"),s("KHd+")),o=Object(i.a)(e,(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"post-tags"},t._l(t.post.tags,(function(a){return s("g-link",{key:a.id,staticClass:"post-tags__link",attrs:{to:a.path}},[s("span",[t._v("#")]),t._v(" "+t._s(a.title)+"\n  ")])})),1)}),[],!1,null,null,null);a.a=o.exports},YDir:function(t,a,s){"use strict";s("NAO6")},ehCf:function(t,a,s){"use strict";s("fyge")},fyge:function(t,a,s){}}]);
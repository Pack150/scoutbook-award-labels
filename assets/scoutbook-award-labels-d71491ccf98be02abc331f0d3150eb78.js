"use strict"
define("scoutbook-award-labels/app",["exports","scoutbook-award-labels/resolver","ember-load-initializers","scoutbook-award-labels/config/environment"],function(e,a,t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var l=Ember.Application.extend({modulePrefix:n.default.modulePrefix,podModulePrefix:n.default.podModulePrefix,Resolver:a.default});(0,t.default)(l,n.default.modulePrefix)
var r=l
e.default=r}),define("scoutbook-award-labels/controllers/application",["exports","papaparse","ember-debug-logger"],function(e,a,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Controller.extend({debug:(0,t.default)(),haveData:!1,awardData:!1,actions:{parseFile:function(e){var t=this
this.set("haveData",!0)
var n=e.srcElement.files[0]
void 0!==n?a.default.parse(n,{header:!0,complete:function(e){var a={}
e.data.forEach(function(e){if(void 0!==e["Item Name"]){var t="".concat(e["Den Type"]," Den ").concat(e["Den Number"]),n="".concat(e["First Name"]," ").concat(e["Last Name"]),l=e["Item Name"].replace(/ adventure|emblem|award patch/i,"")
switch(a[t]||(a[t]={}),a[t][n]||(a[t][n]={adventures:[],awards:[],ranks:[]}),e["Item Type"]){case"Misc Awards":a[t][n].awards.push(l)
break
case"Badges of Rank":a[t][n].ranks.push(l)
break
default:a[t][n].adventures.push(l)}switch(e["Den Type"]){case"Lion":case"Tiger":case"Wolf":case"Bear":a[t][n].denClass=e["Den Type"].toLowerCase()
break
default:a[t][n].denClass="webelos"}}}),t.set("awardData",a)}}):this.set("haveData",!1)}}})
e.default=n}),define("scoutbook-award-labels/helpers/app-version",["exports","scoutbook-award-labels/config/environment","ember-cli-app-version/utils/regexp"],function(e,a,t){function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},l=a.default.APP.version,r=n.versionOnly||n.hideSha,o=n.shaOnly||n.hideVersion,i=null
return r&&(n.showExtended&&(i=l.match(t.versionExtendedRegExp)),i||(i=l.match(t.versionRegExp))),o&&(i=l.match(t.shaRegExp)),i?i[0]:l}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=n,e.default=void 0
var l=Ember.Helper.helper(n)
e.default=l}),define("scoutbook-award-labels/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=a.default
e.default=t}),define("scoutbook-award-labels/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=a.default
e.default=t}),define("scoutbook-award-labels/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","scoutbook-award-labels/config/environment"],function(e,a,t){var n,l
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t.default.APP&&(n=t.default.APP.name,l=t.default.APP.version)
var r={name:"App Version",initialize:(0,a.default)(n,l)}
e.default=r}),define("scoutbook-award-labels/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",a.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=t}),define("scoutbook-award-labels/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],function(e,a,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"ember-data",initialize:a.default}
e.default=n}),define("scoutbook-award-labels/initializers/export-application-global",["exports","scoutbook-award-labels/config/environment"],function(e,a){function t(){var e=arguments[1]||arguments[0]
if(!1!==a.default.exportApplicationGlobal){var t
if("undefined"!=typeof window)t=window
else if("undefined"!=typeof global)t=global
else{if("undefined"==typeof self)return
t=self}var n,l=a.default.exportApplicationGlobal
n="string"==typeof l?l:Ember.String.classify(a.default.modulePrefix),t[n]||(t[n]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete t[n]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=t,e.default=void 0
var n={name:"export-application-global",initialize:t}
e.default=n}),define("scoutbook-award-labels/instance-initializers/ember-data",["exports","ember-data/initialize-store-service"],function(e,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t={name:"ember-data",initialize:a.default}
e.default=t}),define("scoutbook-award-labels/resolver",["exports","ember-resolver"],function(e,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=a.default
e.default=t}),define("scoutbook-award-labels/router",["exports","scoutbook-award-labels/config/environment"],function(e,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Router.extend({location:a.default.locationType,rootURL:a.default.rootURL})
t.map(function(){})
var n=t
e.default=n}),define("scoutbook-award-labels/routes/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=Ember.Route.extend({})
e.default=a}),define("scoutbook-award-labels/services/ajax",["exports","ember-ajax/services/ajax"],function(e,a){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return a.default}})}),define("scoutbook-award-labels/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=Ember.HTMLBars.template({id:"pTUV6034",block:'{"symbols":["den","denName","scout","scoutName","award","award","award"],"statements":[[4,"if",[[23,["haveData"]]],null,{"statements":[[4,"if",[[23,["awardData"]]],null,{"statements":[[4,"each",[[27,"-each-in",[[23,["awardData"]]],null]],null,{"statements":[[4,"each",[[27,"-each-in",[[22,1,[]]],null]],null,{"statements":[[0,"        "],[7,"section"],[9],[0,"\\n          "],[7,"header"],[9],[0,"\\n            "],[7,"aside"],[12,"class",[22,3,["denClass"]]],[9],[1,[22,2,[]],false],[10],[0,"\\n            "],[7,"h1"],[9],[1,[22,4,[]],false],[10],[0,"\\n          "],[10],[0,"\\n          "],[7,"main"],[9],[0,"\\n"],[4,"if",[[22,3,["adventures"]]],null,{"statements":[[0,"              "],[7,"h2"],[9],[0,"Adventures:"],[10],[0,"\\n              "],[7,"ul"],[9],[0,"\\n"],[4,"each",[[22,3,["adventures"]]],null,{"statements":[[0,"                  "],[7,"li"],[9],[1,[22,7,[]],false],[10],[0,"\\n"]],"parameters":[7]},null],[0,"              "],[10],[0,"\\n"]],"parameters":[]},null],[4,"if",[[22,3,["awards"]]],null,{"statements":[[0,"              "],[7,"h2"],[9],[0,"Awards:"],[10],[0,"\\n              "],[7,"ul"],[9],[0,"\\n"],[4,"each",[[22,3,["awards"]]],null,{"statements":[[0,"                  "],[7,"li"],[9],[1,[22,6,[]],false],[10],[0,"\\n"]],"parameters":[6]},null],[0,"              "],[10],[0,"\\n"]],"parameters":[]},null],[4,"if",[[22,3,["ranks"]]],null,{"statements":[[0,"              "],[7,"h2"],[9],[0,"Rank:"],[10],[0,"\\n              "],[7,"ul"],[9],[0,"\\n"],[4,"each",[[22,3,["ranks"]]],null,{"statements":[[0,"                  "],[7,"li"],[9],[1,[22,5,[]],false],[10],[0,"\\n"]],"parameters":[5]},null],[0,"              "],[10],[0,"\\n"]],"parameters":[]},null],[0,"          "],[10],[0,"\\n        "],[10],[0,"\\n"]],"parameters":[3,4]},null]],"parameters":[1,2]},null]],"parameters":[]},{"statements":[[0,"    "],[7,"p"],[9],[0,"processing..."],[10],[0,"\\n"]],"parameters":[]}]],"parameters":[]},{"statements":[[0,"  "],[7,"form"],[9],[0,"\\n    "],[7,"h1"],[9],[0,"Scoutbook Award Labels"],[10],[0,"\\n"],[4,"if",[[23,["error"]]],null,{"statements":[[0,"      "],[7,"p"],[9],[0,"Selected file was invalid: "],[1,[21,"error"],false],[10],[0,"\\n"]],"parameters":[]},null],[0,"    "],[7,"input"],[11,"accept",".csv"],[12,"onchange",[27,"action",[[22,0,[]],"parseFile"],null]],[11,"type","file"],[9],[10],[0,"\\n    "],[7,"p"],[9],[0,"\\n      Choose the CSV file for your Scoutbook Awards PO and print the result. Cut\\n      out the labels and stick them on a No. 3 Coin Envelope. A\\n      "],[7,"a"],[11,"href","https://smile.amazon.com/Scotch-Applicator-Double-Sided-160/dp/B00P12N4Z0"],[9],[0,"double-sided tape applicator"],[10],[0,"\\n      really helps!\\n    "],[10],[0,"\\n    "],[7,"p"],[9],[0,"\\n      This tool is designed for Cub Scout Packs that have lots of monthly awards to\\n      hand out.\\n    "],[10],[0,"\\n  "],[10],[0,"\\n"]],"parameters":[]}]],"hasEval":false}',meta:{moduleName:"scoutbook-award-labels/templates/application.hbs"}})
e.default=a}),define("scoutbook-award-labels/config/environment",[],function(){try{var e="scoutbook-award-labels/config/environment",a=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),t={default:JSON.parse(unescape(a))}
return Object.defineProperty(t,"__esModule",{value:!0}),t}catch(n){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("scoutbook-award-labels/app").default.create({name:"scoutbook-award-labels",version:"1.0.0+a1acb081"})

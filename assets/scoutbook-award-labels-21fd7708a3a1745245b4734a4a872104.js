"use strict"
define("scoutbook-award-labels/app",["exports","scoutbook-award-labels/resolver","ember-load-initializers","scoutbook-award-labels/config/environment"],function(e,a,t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Application.extend({modulePrefix:n.default.modulePrefix,podModulePrefix:n.default.podModulePrefix,Resolver:a.default});(0,t.default)(r,n.default.modulePrefix)
var o=r
e.default=o}),define("scoutbook-award-labels/controllers/application",["exports","papaparse","jspdf","ember-debug-logger"],function(e,a,t,n){function r(e,a,t,n,r){for(var o=Math.round(a/n*100)/100,l=Math.round(t/r*100)/100,i=1;i<n;i++){var s=o*i
e.line(s,0,s,t)}for(var d=1;d<r;d++){var u=l*d
e.line(0,u,a,u)}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o=Ember.Controller.extend({debug:(0,n.default)(),awardData:!1,printPreview:!1,scoutCount:0,makePDF:function(){var e=this,a=new t("portrait","pt","letter")
a.setFont("helvetica")
var n=this.scoutCount,o=0
r(a,612,791,4,3)
var l=function(t){var l=function(l){var i,s,d=0,u=o,c=0
u>=12&&(u%=12),u>=4&&(c=Math.floor(u/4)),s=u%4,i=Math.round(153*s*100)/100,d=Math.round(791/3*c*100)/100,d+=25,e.debug("".concat(c,", ").concat(d," : ").concat(s,",").concat(i," : ").concat(u," : ").concat(l)),a.setLineHeightFactor(1.25),a.setFontSize(9),a.setFontStyle("italic"),d+=11.25,a.text(t,i+113+20,d,{align:"right"}),a.setFontStyle("normal"),a.setFontSize(14),d+=17.5
var f=a.splitTextToSize(l,113)
a.text(f,i+20,d),f.length>1&&(d+=17.5),d+=2,a.line(i,d,i+153,d),d+=5,a.setFontSize(12),d+=15,["adventures","awards","ranks"].forEach(function(n){if(0!==e.awardData[t][l][n].length){var r=[]
switch(n){case"adventures":r.push("Adventures:")
break
case"awards":r.push("Awards:")
break
default:r.push("Rank:")}e.awardData[t][l][n].forEach(function(e){var t=" - "+e,n=a.splitTextToSize(t,113)
r.push(n[0]),n[1]&&r.push("    "+n[1])}),a.text(r,i+20,d),d=d+15*r.length+7}}),++o<n&&o%12==0&&(e.debug("adding a new page"),a.addPage("letter","p"),r(a,612,791,4,3))}
for(var i in e.awardData[t])l(i)}
for(var i in this.awardData)l(i)
a.save("awardLabels.pdf")},actions:{parseFile:function(e){var t=this,n=e.srcElement.files[0]
void 0!==n&&a.default.parse(n,{header:!0,complete:function(e){var a={},n=0
e.data.forEach(function(e){if(void 0!==e["Item Name"]){var t="".concat(e["Den Type"]," Den ").concat(e["Den Number"]),r="".concat(e["First Name"]," ").concat(e["Last Name"]),o=e["Item Name"].replace(/cub scouts\b|\badventure\b|\bemblem|award patch/gi,"")
switch(a[t]||(a[t]={}),a[t][r]||(n++,a[t][r]={adventures:[],awards:[],ranks:[]}),e["Item Type"]){case"Misc Awards":a[t][r].awards.push(o)
break
case"Badges of Rank":a[t][r].ranks.push(o)
break
default:a[t][r].adventures.push(o)}switch(e["Den Type"]){case"Lion":case"Tiger":case"Wolf":case"Bear":a[t][r].denClass=e["Den Type"].toLowerCase()
break
default:a[t][r].denClass="webelos"}}}),t.set("awardData",a),t.set("scoutCount",n),t.makePDF()}})}}})
e.default=o}),define("scoutbook-award-labels/helpers/app-version",["exports","scoutbook-award-labels/config/environment","ember-cli-app-version/utils/regexp"],function(e,a,t){function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=a.default.APP.version,o=n.versionOnly||n.hideSha,l=n.shaOnly||n.hideVersion,i=null
return o&&(n.showExtended&&(i=r.match(t.versionExtendedRegExp)),i||(i=r.match(t.versionRegExp))),l&&(i=r.match(t.shaRegExp)),i?i[0]:r}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=n,e.default=void 0
var r=Ember.Helper.helper(n)
e.default=r}),define("scoutbook-award-labels/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=a.default
e.default=t}),define("scoutbook-award-labels/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=a.default
e.default=t}),define("scoutbook-award-labels/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","scoutbook-award-labels/config/environment"],function(e,a,t){var n,r
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t.default.APP&&(n=t.default.APP.name,r=t.default.APP.version)
var o={name:"App Version",initialize:(0,a.default)(n,r)}
e.default=o}),define("scoutbook-award-labels/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",a.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=t}),define("scoutbook-award-labels/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],function(e,a,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"ember-data",initialize:a.default}
e.default=n}),define("scoutbook-award-labels/initializers/export-application-global",["exports","scoutbook-award-labels/config/environment"],function(e,a){function t(){var e=arguments[1]||arguments[0]
if(!1!==a.default.exportApplicationGlobal){var t
if("undefined"!=typeof window)t=window
else if("undefined"!=typeof global)t=global
else{if("undefined"==typeof self)return
t=self}var n,r=a.default.exportApplicationGlobal
n="string"==typeof r?r:Ember.String.classify(a.default.modulePrefix),t[n]||(t[n]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete t[n]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=t,e.default=void 0
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
var a=Ember.HTMLBars.template({id:"PSrnrLFA",block:'{"symbols":["den","denName","scout","scoutName","award","award","award"],"statements":[[7,"form"],[9],[0,"\\n  "],[7,"h1"],[9],[0,"Scoutbook Award Labels"],[10],[0,"\\n"],[4,"if",[[23,["error"]]],null,{"statements":[[0,"    "],[7,"p"],[9],[0,"Selected file was invalid: "],[1,[21,"error"],false],[10],[0,"\\n"]],"parameters":[]},null],[4,"if",[[23,["awardData"]]],null,{"statements":[[0,"    "],[7,"p"],[9],[0,"Your file has been downloaded!"],[10],[0,"\\n"]],"parameters":[]},{"statements":[[0,"    "],[7,"input"],[11,"accept",".csv"],[12,"onchange",[27,"action",[[22,0,[]],"parseFile"],null]],[11,"type","file"],[9],[10],[0,"\\n"]],"parameters":[]}],[0,"  "],[7,"p"],[9],[0,"\\n    Choose the CSV file for your Scoutbook Awards PO and print the result. Cut\\n    out the labels with a "],[7,"a"],[11,"href","https://amazon.com/dp/B00LX398CY/"],[9],[0,"paper trimmer"],[10],[0," and stick them on "],[7,"a"],[11,"href","https://amazon.com/dp/B000Y4X6E4/"],[9],[0,"No. 3 Coin Envelopes"],[10],[0,". A\\n    "],[7,"a"],[11,"href","https://smile.amazon.com/Scotch-Applicator-Double-Sided-160/dp/B00P12N4Z0"],[9],[0,"double-sided tape applicator"],[10],[0,"\\n    really helps!\\n  "],[10],[0,"\\n  "],[7,"p"],[9],[0,"\\n    This tool is designed for Cub Scout Packs that have lots of monthly awards to\\n    hand out.\\n  "],[10],[0,"\\n  "],[7,"p"],[9],[0,"\\n    All data remains local; nothing is uploaded to a remote server. Source code\\n    for this site is\\n    "],[7,"a"],[11,"href","https://github.com/Pack150/scoutbook-award-labels"],[9],[0,"hosted on GitHub"],[10],[0,".\\n    Please feel free to reach out there with any questions!\\n  "],[10],[0,"\\n"],[10],[0,"\\n"],[4,"if",[[23,["printPreview"]]],null,{"statements":[[0,"  "],[7,"div"],[11,"id","award-list"],[9],[0,"\\n"],[4,"each",[[27,"-each-in",[[23,["awardData"]]],null]],null,{"statements":[[4,"each",[[27,"-each-in",[[22,1,[]]],null]],null,{"statements":[[0,"        "],[7,"section"],[9],[0,"\\n          "],[7,"header"],[9],[0,"\\n            "],[7,"aside"],[12,"class",[22,3,["denClass"]]],[9],[1,[22,2,[]],false],[10],[0,"\\n            "],[7,"h1"],[9],[1,[22,4,[]],false],[10],[0,"\\n          "],[10],[0,"\\n          "],[7,"main"],[9],[0,"\\n"],[4,"if",[[22,3,["adventures"]]],null,{"statements":[[0,"              "],[7,"h2"],[9],[0,"Adventures:"],[10],[0,"\\n              "],[7,"ul"],[9],[0,"\\n"],[4,"each",[[22,3,["adventures"]]],null,{"statements":[[0,"                  "],[7,"li"],[9],[1,[22,7,[]],false],[10],[0,"\\n"]],"parameters":[7]},null],[0,"              "],[10],[0,"\\n"]],"parameters":[]},null],[4,"if",[[22,3,["awards"]]],null,{"statements":[[0,"              "],[7,"h2"],[9],[0,"Awards:"],[10],[0,"\\n              "],[7,"ul"],[9],[0,"\\n"],[4,"each",[[22,3,["awards"]]],null,{"statements":[[0,"                  "],[7,"li"],[9],[1,[22,6,[]],false],[10],[0,"\\n"]],"parameters":[6]},null],[0,"              "],[10],[0,"\\n"]],"parameters":[]},null],[4,"if",[[22,3,["ranks"]]],null,{"statements":[[0,"              "],[7,"h2"],[9],[0,"Rank:"],[10],[0,"\\n              "],[7,"ul"],[9],[0,"\\n"],[4,"each",[[22,3,["ranks"]]],null,{"statements":[[0,"                  "],[7,"li"],[9],[1,[22,5,[]],false],[10],[0,"\\n"]],"parameters":[5]},null],[0,"              "],[10],[0,"\\n"]],"parameters":[]},null],[0,"          "],[10],[0,"\\n        "],[10],[0,"\\n"]],"parameters":[3,4]},null]],"parameters":[1,2]},null],[0,"  "],[10],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}',meta:{moduleName:"scoutbook-award-labels/templates/application.hbs"}})
e.default=a}),define("scoutbook-award-labels/config/environment",[],function(){try{var e="scoutbook-award-labels/config/environment",a=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),t={default:JSON.parse(decodeURIComponent(a))}
return Object.defineProperty(t,"__esModule",{value:!0}),t}catch(n){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("scoutbook-award-labels/app").default.create({name:"scoutbook-award-labels",version:"1.0.0+160902e9"})

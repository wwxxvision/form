(window["webpackJsonpform-app"]=window["webpackJsonpform-app"]||[]).push([[0],{136:function(e,t,a){e.exports=a(290)},141:function(e,t,a){},290:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(7),s=a.n(o),p=(a(141),a(87),a(15)),i=a(9),l=a(17),c=a(18),u=a(20),d=a(37),h=a.n(d),m=a(14),f=a(61),v=a(128),g=a.n(v),b=a(33),E=(a(150),"http://192.168.0.251:8086/local/form/ajax_update_form.php?page="),y=document.querySelector(".local_form_properties")?document.querySelector(".local_form_properties"):void 0,O=y?y.getAttribute("data-url"):void 0,_=y?y.getAttribute("data-preload"):void 0,j=y?y.getAttribute("data-project_id"):void 0,x={url:E,connect:function(e){return Object(f.b)((function(e){return function(e){var t={};return Object.keys(e).forEach((function(a){"type"!==a&&(t[a]=e[a])})),t}(e)}),(function(e){return{setRedux:function(t){return e(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.assign({type:"redux"},e)}(t))}}}))(e)},preloaderUrl:_||void 0,clearObject:{},getClearObject:function(e){return fetch("".concat("http://192.168.0.251:8086/local/form/ajax_update_form.php?method=get_empty&page="+e),{method:"GET"}).then((function(e){return e.json()})).then((function(e){return x.clearObject=g()(e)}))},fetchData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};return"function"===typeof t&&t(),fetch(y?"".concat(E+e,"&method=get&project_id=").concat(j):"".concat(E+e),{method:"GET"}).then((function(e){return e.json()}))},saveData:function(e){return fetch("".concat(E),{method:"POST",body:e}).then((function(e){return e.json()}))},getRefElement:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],a=arguments.length>2?arguments[2]:void 0,r=function(e){for(var r=0;r<t.length;r++)e=e.data[t[r]];return e.data.value=a};r(e)},getController:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],a=function(e){for(var a=0;a<t.length;a++)e=e.data[t[a]];return e};return a(e)},setClasses:function(){var e,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],a=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=[];(t&&(r=t),a)&&(e=r).push.apply(e,Object(m.a)(Object.keys(a).map((function(e){return a[e]&&e})).filter((function(e){return e}))));return r.join(" ")},isError:!1,validation:function(e,t){if(t)return e?"":"error_empty"},setBeforeResData:function(e,t,a,r){return function(e){for(var n=0;n<t.length-1;n++)e=e.data[t[n]];return a&&(a.cost=parseInt(a.cost)),e.data.map((function(e){if(a)switch(e.data.value=r?"":a[e.data.name],"count"===e.data.name&&(e.data.value=1),e.data.name){case"count":e.data.value=1;case"product_id":e.data.value=a.id;break;case"id":e.data.value=""}else e.data.value="";return e})),e}(e)},getLocalCost:function(e,t,a,r){var n=0;return function(e){for(var o=0;o<t.length-1;o++)e=e.data[t[o]];return e.data.map((function(e){return"cost"===e.data.name&&(a?(e.data.defaultValue=a[e.data.name],n=parseInt(a[e.data.name])):r&&!a?e.data.defaultValue=parseInt(r):(e.data.defaultValue="",n="")),e})),n}(e)},factorSum:function(e,t,a){return function(e){for(var r=0;r<t.length-1;r++)e=e.data[t[r]];return e.data.map((function(e){return"cost"===e.data.name&&e.data.value&&(e.data.value=Number(a)*Number(e.data.defaultValue)),e})),e}(e)},getCostForDelete:function(e,t){var a=0;return function(e){for(var r=0;r<t.length-1;r++)e=e.data[t[r]];return e.data.map((function(e){return"cost"===e.data.name&&(a=parseInt(e.data.value)),e})),a}(e)},redirectUrl:O,pureObject:function(e){var t={},a=Object(b.cloneDeep)(e);for(var r in e)switch(t[r]=a[r],r){case"value":t[r]="";break;case"duplicate":t[r]=!0;break;case"data":Array.isArray(t[r])&&t[r].map((function(e){"hidden"===e.type&&"id"===e.data.name&&(e.data.value=parseInt(e.data.value)+1)}))}var n=t.data.length;return function(e){for(var t=0;t<n;t++)"group"!==e[t].type&&"hidden"!==e[t].type&&("total_cost"!==e[t].data.name?(e[t].data.value="",e[t].data.uid="".concat(e[t].data.uid+t)):e[t].data.uid="".concat(e[t].data.uid+t))}(t.data),t},setTotal:function(e,t,a,r){var n,o=[];return function(e){if("delete"!==a&&"clear"!==a){for(var s=0;s<t.length-2;s++)e=e.data[t[s]];e.data.map((function(e){switch(e.type){case"group":e.data.map((function(t){if("cost"===t.data.name&&t.data.value)return o.push(parseInt(t.data.value)),e}));break;case"text":o.length>0&&(n=o.reduce((function(e,t){return e+t}),0))}return e})),e.data.map((function(e){return n&&(e.data.value=n),e}))}else if("clear"===a){for(var p=0;p<t.length-2;p++)e=e.data[t[p]];n=parseInt(r),e.data.map((function(e){return e.data.value-=n,e}))}else if(r){for(var i=0;i<t.length-1;i++)e=e.data[t[i]];r[0].data.map((function(e){"cost"===e.data.name&&o.push(e.data.value)})),e.data.map((function(e){"text"===e.type&&(e.data.value-=o[0])}))}}(e)}},P=x,w=a(12),N=a(324),S=a(318),k=a(322),C=a(323),R=function(e){return n.a.createElement("p",null," ","".concat(e.type," is not supporting")," ")},D=function(e){return n.a.createElement("div",{className:"hidden dispaly_none"},n.a.createElement("p",{className:"form_label"},e.label))},V=function(e){return n.a.createElement(n.a.Fragment,null,n.a.createElement("p",{className:"form_label"},e.label),e.isError&&e.typeError&&e.typeError.map((function(t,a){return t.uid===e.uid&&n.a.createElement("span",{key:a,className:"error_message"},t.error)})),n.a.createElement(N.a,{onChange:e.changeValue,required:!!e.required,value:e.value,rows:5,variant:"filled",className:"full_width input_margin",multiline:!0}))},I=function(e){return n.a.createElement(n.a.Fragment,null,n.a.createElement("p",{className:"form_label"}),e.isError&&e.typeError&&e.typeError.map((function(t,a){return t.uid===e.uid&&n.a.createElement("span",{key:a,className:"error_message"},t.error)})),n.a.createElement(S.a,{onChange:e.changeValue,name:e.name,type:"date",value:e.value,required:!!e.required,className:"full_width input_margin"}))},T=function(e){return n.a.createElement(n.a.Fragment,null,n.a.createElement("p",{className:"form_label"},e.label),e.isError&&e.typeError&&e.typeError.map((function(t,a){return t.uid===e.uid&&n.a.createElement("span",{key:a,className:"error_message"},t.error)})),n.a.createElement(S.a,{onChange:e.changeValue,name:e.name,type:"date",value:e.value,required:!!e.required,className:"full_width input_margin"}))},L=function(e){return n.a.createElement("div",{className:P.setClasses(["full_width","select"],{hidden:0==e.options})},n.a.createElement("p",{className:"form_label"},e.label),e.isError&&e.typeError&&!e.value&&n.a.createElement("span",{className:"error_message"},"\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u043f\u043e\u043b\u0435 \u041f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e"),n.a.createElement(k.a,{onChange:e.changeValue,className:"full_width",value:e.value,required:!!e.required},Object.entries(e.options).map((function(e,t){return n.a.createElement(C.a,{key:t,value:e[0]},e[1])}))))},q=function(e){return n.a.createElement(n.a.Fragment,null,n.a.createElement("p",{className:"form_label"},e.label),e.isError&&e.typeError&&e.typeError.map((function(t,a){return t.uid===e.uid&&n.a.createElement("span",{key:a,className:"error_message"},t.error)})),n.a.createElement(S.a,{onChange:e.changeValue,readOnly:"cost"===e.name||"name"===e.name||"total_cost"===e.name,name:e.name,type:"text",value:"count"!==e.name?e.value:e.valueInput,required:!!e.required,onFocus:e.focusCount,className:"full_width input_margin"}),e.validation&&e.required&&n.a.createElement("span",{className:"error_message"},"\u042d\u0442\u043e \u043f\u043e\u043b\u0435 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e \u0434\u043b\u044f \u0437\u0430\u043f\u043e\u043b\u0435\u043d\u0438\u044f"))};var G=P.connect((function(e){return n.a.createElement("div",{onClick:function(){e.addItem(e.value)},className:"model_name"},e.value.model)}));function A(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}var F=function(e){function t(){var e,a;Object(p.a)(this,t);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(n)))).removeElementAds=function(){var e,t=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?A(a,!0).forEach((function(t){Object(w.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):A(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},a.props.addStateToRedux),r=function(e){for(var t=0;t<a.props.path.length-1;t++)"hidden"!==e.data[a.props.path[t]].data.type&&(e=e.data[a.props.path[t]]);return e};!function(t){for(var r=0;r<a.props.path.length;r++)"hidden"!==t.data[a.props.path[r]].data.type&&(t=t.data[a.props.path[r]],e=a.props.path[r])}(t),a.props.subGroup&&"delivery_list"===r(t).data[e].name?P.setTotal(t,a.props.path,"delete",r(t).data.splice(e,1)):r(t).data.splice(e,1),a.props.setRedux({deleteStateToRedux:t})},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{onClick:this.removeElementAds,className:"button next_button button_add button_delete_margin_left",variant:"contained"})}}]),t}(n.a.Component),U=P.connect(F);function B(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}var M=function(e){function t(){var e,a;Object(p.a)(this,t);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(n)))).addingItem=function(){var e=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?B(a,!0).forEach((function(t){Object(w.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):B(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},a.props.dataApi),t=0,r=Object(b.cloneDeep)(P.pureObject(function(e){for(var r=0;r<a.props.path.length;r++)"hidden"!==e.data[a.props.path[r]].data.type&&(e=e.data[a.props.path[r]],t=a.props.path[r]);return e}(e),a.props.subGroup,a.props.path));a.props.subGroup?function(e){for(var t=0;t<a.props.path.length-1;t++)"hidden"!==e.data[a.props.path[t]].data.type&&(e=e.data[a.props.path[t]]);return e}(e).data.splice(t+1,0,r):Object(b.cloneDeep)(e.data.splice(a.props.index+1,0,r)),a.props.setRedux({addStateToRedux:e})},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{onClick:this.addingItem,className:"button next_button button_add",variant:"contained"})}}]),t}(n.a.Component),X=P.connect(M),J=function(e){function t(){return Object(p.a)(this,t),Object(l.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"flex"},n.a.createElement(X,{index:this.props.index,subGroup:this.props.subGroup,indexEl:this.props.indexEl,path:this.props.path,dataApi:this.props.dataApi}),P.getController(this.props.dataApi,this.props.path).duplicate&&n.a.createElement(n.a.Fragment,null,n.a.createElement(U,{subGroup:this.props.subGroup,indexEl:this.props.indexEl,path:this.props.path,dataApi:this.props.dataApi})))}}]),t}(n.a.Component),W=P.connect(J);function $(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function z(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?$(a,!0).forEach((function(t){Object(w.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):$(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var H=function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(l.a)(this,Object(c.a)(t).call(this,e))).addModel=function(e){var t=z({},a.props.toReduxValue);return P.setBeforeResData(t,a.props.path,e),P.getLocalCost(t,a.props.path,e),a.getTotal("counter"),a.props.setRedux({toReduxValue:t}),a.setState({helpList:!1}),a.props.toReduxValue},a.changeValue=function(e){var t=new FormData,r=a.props.data.data,n=z({},a.props.apiPage);if(a.setState({valueInput:e.target.value}),P.getRefElement(n,a.props.path,e.target.value),a.props.setRedux({toReduxValue:n}),"select"===r.type&&!r.dependence&&r.value)!function(){var e=!1;n.data[a.props.keyGroup].data.forEach((function(a){if(!a.data.dependence&&"hidden"!==a.type){var r=a.data.value;t.append("".concat(a.data.name,"[]"),r),e=!!a.data.value}})),e&&fetch("".concat(P.url),{method:"POST",body:t}).then((function(e){return e.json()})).then((function(e){var t=z({},a.props.toReduxValue);t.data[a.props.keyGroup].data.map((function(r,n){if(r.data.dependence){var o=e.fields.distributors[0].options;t.data[a.props.keyGroup].data[n].data.options=o,a.props.setRedux({dependenceValues:t})}return a.props.dependenceValues}))}))}();else if("model"===r.name)a.goingToGetModels(n,e.target.value,t).then((function(){a.state.complete&&a.getTotal("render")}));else if("count"===r.name&&P.getCostForDelete(n,a.props.path)){var o=function(){P.factorSum(n,a.props.path,a.state.valueInput),a.getTotal("counter",r.value),a.props.setRedux({toReduxValue:n})};0===e.target.value||e.target.value<0||!e.target.value?(a.setState({valueInput:1},(function(){o()})),e.target.value=1):a.setState({valueInput:e.target.value.replace(/\D/,"")},(function(){o()}))}},a.getTotal=function(e,t){return new Promise((function(r){var n=z({},a.props.toReduxValue);r(P.setTotal(n,a.props.path,e,t)),a.props.setRedux({toReduxValue:n})}))},a.goingToGetModels=function(e,t,r){return new Promise((function(n){if(r.append("model",t),fetch("".concat(P.url),{method:"POST",body:r}).then((function(e){return e.json()})).then((function(e){e.error?a.setState({helpList:!1}):a.setState({helpList:e.products}),e.products&&Object.entries(e.products).map((function(e){return e[1].model.toUpperCase()===a.state.valueInput.toUpperCase()&&a.setState({current:e[1],complete:!0,helpList:!1}),a.state}))})).then((function(){a.state.current&&a.state.complete&&(n(P.setBeforeResData(e,a.props.path,a.state.current)),P.getLocalCost(e,a.props.path,a.state.current),a.props.setRedux({toReduxValue:e}))})),t!==a.state.current.name&&a.state.complete||!t&&a.props.toReduxValue)return P.getCostForDelete(e,a.props.path)&&a.getTotal("clear",P.getCostForDelete(e,a.props.path)).then((function(){n(P.setBeforeResData(e,a.props.path,a.state.current,!0))})),a.props.setRedux({toReduxValue:e}),a.setState({complete:!1,current:""}),a.getTotal("clear",P.getCostForDelete(e,a.props.path))}))},a.state={helpList:!1,valueInput:"",current:"",currentPrice:0,isError:!1,complete:!1,localCost:""},a.getTotal=Object(b.debounce)(a.getTotal,500),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){if(this.props.data.data.value&&this.setState({valueInput:this.props.data.data.value}),"cost"===this.props.data.data.name&&this.props.data.data.value){var e=z({},this.props.apiPage);P.getLocalCost(e,this.props.path,!1,this.props.data.data.value)}}},{key:"componentWillReceiveProps",value:function(e){e.addStateToRedux!==this.props.addStateToRedux&&"count"===this.props.data.data.name&&this.setState({valueInput:1})}},{key:"render",value:function(){var e,t=this;switch(this.props.data.type){case"text":return n.a.createElement(n.a.Fragment,null,n.a.createElement(q,{valueInput:this.state.valueInput,label:this.props.data.data.label,changeValue:this.changeValue,name:this.props.data.data.name,value:this.props.data.data.value,uid:this.props.data.data.uid,isError:this.props.isError,typeError:this.props.typeError,focusCount:this.focusCount,required:this.props.data.data.required,helpList:this.state.helpList}),"model"===this.props.data.data.name&&this.state.helpList&&n.a.createElement("div",{className:"help_list"},this.state.helpList.map((function(e,a){return n.a.createElement(G,{addItem:t.addModel,value:e,key:a,indexEl:a})}))));case"select":return n.a.createElement(L,{changeValue:this.changeValue,name:this.props.data.data.name,valueInput:this.state.valueInput,value:this.props.data.data.value,dependence:this.props.data.data.dependence,required:this.props.data.data.required,options:this.props.data.data.options,uid:this.props.data.data.uid,typeError:this.props.typeError,indxGroup:this.props.keyGroup,label:this.props.data.data.label,isError:this.props.isError});case"date":return n.a.createElement(T,(e={label:this.props.data.data.label,changeValue:this.changeValue,name:this.props.data.data.name,validation:this.state.isError,valueInput:this.state.valueInput,isError:this.props.isError,value:this.props.data.data.value,uid:this.props.data.data.uid},Object(w.a)(e,"label",this.props.data.data.label),Object(w.a)(e,"typeError",this.props.typeError),Object(w.a)(e,"required",this.props.data.data.required),e));case"date_list":return n.a.createElement(I,{label:this.props.data.data.label,changeValue:this.changeValue,name:this.props.data.data.name,validation:this.state.isError,isError:this.props.isError,valueInput:this.state.valueInput,value:this.props.data.data.value,uid:this.props.data.data.uid,typeError:this.props.typeError,required:this.props.data.data.required});case"textarea":return n.a.createElement(V,{label:this.props.data.data.label,changeValue:this.changeValue,required:this.props.data.data.required,valueInput:this.state.valueInput,isError:this.props.isError,validation:this.state.isError,uid:this.props.data.data.uid,typeError:this.props.typeError,value:this.props.data.data.value});case"hidden":return n.a.createElement(D,{label:this.props.data.data.label});case"group":return n.a.createElement(n.a.Fragment,null,n.a.createElement(Q,{keyGroup:this.props.indexEl,path:Object(m.a)(this.props.path),data:this.props.data}),this.props.data.canDuplicate&&n.a.createElement(W,{subGroup:!0,path:Object(m.a)(this.props.path),dataApi:this.props.apiPage,index:this.props.path[0]}));default:return n.a.createElement(R,{type:this.props.data.data.type})}}}]),t}(n.a.Component),K=P.connect(H);var Q=P.connect((function(e){return n.a.createElement("div",{className:"form_groups wrapper full_width animate_group"},n.a.createElement("h2",{className:"title_group full_width"},e.data.title),"hidden"!==e.data.type&&e.data.data.map((function(t,a){return n.a.createElement(K,{path:[].concat(Object(m.a)(e.path),[a]),key:a,indexEl:a,keyGroup:e.indexGroup,data:t})})))})),Y=function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(l.a)(this,Object(c.a)(t).call(this,e))).changePage=function(e){var t=e.target,r=a.props.page,n=JSON.stringify({data:a.props.apiPage.data,type:"section",method:"save",page:r});(a.setState({isSaveProgress:!0}),t.classList.contains("back_button"))?(t.classList.contains("back_button")?r-=1:r<2?r+=1:r=0,P.fetchData(r,(function(){a.setState({isLoad:!0})})).then((function(e){a.props.setRedux({apiPage:e}),a.setState({isLoad:!1}),a.props.setRedux({page:r}),a.setState({isSaveProgress:!1})})),P.getClearObject(r)):P.saveData(n).then((function(e){e.errors?a.props.setRedux({isError:!0,typeError:e.errors}):a.props.setRedux({isError:!1}),a.setState({isSaveProgress:!1})})).then((function(){a.props.isError||(2===a.props.page&&(window.location.href=P.redirectUrl),t.classList.contains("back_button")?r-=1:r<2?r+=1:r=0,P.fetchData(r,(function(){a.setState({isLoad:!0})})).then((function(e){a.props.setRedux({apiPage:e}),a.setState({isLoad:!1}),a.props.setRedux({page:r}),a.setState({isSaveProgress:!1})})),P.getClearObject(r))}))},a.state={isLoad:!1,indexes:[],isSaveProgress:!1},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement(n.a.Fragment,null,!this.state.isLoad&&n.a.createElement("div",{className:"form_page flex_center"},n.a.createElement("h1",{className:"form__title"},"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f \u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432"),n.a.createElement("div",{className:"form_block"},this.props.apiPage.data.map((function(t,a){return!(!t||"hidden"===t.type)&&n.a.createElement(n.a.Fragment,{key:a+"fragment"},n.a.createElement(Q,{path:[a],key:a,indexGroup:a,data:t}),t.canDuplicate&&n.a.createElement(W,{path:[a],duplicate:t.duplicate,fields:t.data,type:t.type,key:t,dataApi:e.props.apiPage,index:a}))}))),0===this.props.page&&!this.state.isSaveProgress&&n.a.createElement("div",{onClick:this.changePage,className:"button next_button",variant:"contained"},"\u0414\u0430\u043b\u0435\u0435"),0===this.props.page&&this.state.isSaveProgress&&n.a.createElement("img",{src:P.preloaderUrl?P.preloaderUrl:h.a,alt:"btn_loader",className:"loader_button"}),1===this.props.page&&!this.state.isSaveProgress&&n.a.createElement("div",{className:"flex mg_top_btns"},n.a.createElement("div",{onClick:this.changePage,className:"button next_button",variant:"contained"},"\u0414\u0430\u043b\u0435\u0435"),n.a.createElement("div",{onClick:this.changePage,className:"button left_btn_margin back_button ",variant:"contained"},"\u041d\u0430\u0437\u0430\u0434")),1===this.props.page&&this.state.isSaveProgress&&n.a.createElement("img",{src:P.preloaderUrl?P.preloaderUrl:h.a,alt:"btn_loader",className:"loader_button"}),2===this.props.page&&!this.state.isSaveProgress&&n.a.createElement("div",{className:"pure_flex mg_top_btns"},n.a.createElement("div",{onClick:this.changePage,className:"button next_button send",variant:"contained"}),n.a.createElement("div",{onClick:this.changePage,className:"button left_btn_margin back_button ",variant:"contained"},"\u041d\u0430\u0437\u0430\u0434")),2===this.props.page&&this.state.isSaveProgress&&n.a.createElement("img",{src:P.preloaderUrl?P.preloaderUrl:h.a,alt:"btn_loader",className:"loader_button"})),this.state.isLoad&&n.a.createElement("div",{className:"flex wrapper_loader"},n.a.createElement("img",{src:P.preloaderUrl?P.preloaderUrl:h.a,alt:"preloader",className:"preloader"}),this.props.apiPage.error&&n.a.createElement(n.a.Fragment,null,n.a.createElement("p",{className:"preloader_text"},"\u041e\u0448\u0438\u0431\u043a\u0430 \u043d\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0435"),n.a.createElement("p",{className:"preloader_text"},this.props.apiPage.error))))}}]),t}(n.a.Component),Z=P.connect(Y),ee=function(e){function t(){return Object(p.a)(this,t),Object(l.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;P.fetchData(this.props.page).then((function(t){e.props.setRedux({apiPage:t,empty:t})})),P.getClearObject(this.props.page)}},{key:"render",value:function(){return this.props.apiPage.status?n.a.createElement("section",{className:"form_page_wrapper full_screen flex_center"},n.a.createElement(Z,null)):n.a.createElement("div",{className:"wrapper"},n.a.createElement("div",{className:"flex wrapper_loader"},n.a.createElement("img",{src:P.preloaderUrl?P.preloaderUrl:h.a,alt:"preloader",className:"preloader"}),this.props.apiPage.error&&n.a.createElement(n.a.Fragment,null,n.a.createElement("p",{className:"preloader_text"},"\u041e\u0448\u0438\u0431\u043a\u0430 \u043d\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0435"),n.a.createElement("p",{className:"preloader_text"},this.props.apiPage.error))))}}]),t}(n.a.Component),te=P.connect(ee);var ae=function(){return n.a.createElement("div",{className:"App"},n.a.createElement(te,null))},re=a(58);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ne={page:0,apiPage:{data:[],resposneServer:!1},sendData:""},oe=Object(re.b)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.assign({},e,t)}),ne,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());s.a.render(n.a.createElement(f.a,{store:oe},n.a.createElement(ae,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},37:function(e,t,a){e.exports=a.p+"static/media/preloader.13f1441c.gif"},87:function(e,t,a){}},[[136,1,2]]]);
//# sourceMappingURL=main.9a72f2ee.chunk.js.map
(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{16:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var c=t(17),r=t.n(c),o=t(3),u=t(7),i=t(2),a=t(4),s=t.n(a),l=t(0),d=function(e){var n=j(e.phonebook,e.filter_str);return Object(l.jsx)(l.Fragment,{children:n.map((function(n){return Object(l.jsxs)("p",{children:[" ",n.name," ",n.number,Object(l.jsx)("button",{onClick:function(){return e.deleteFunc(n)},children:"delete"},n.id)]},n.name)}))})},b=function(e){return Object(l.jsxs)("div",{children:[" filter name with:",Object(l.jsx)("input",{value:e.filter_str,onChange:e.actionFunc})]})},j=function(e,n){return e.filter((function(e){return e.name.includes(n)}))},f=function(e){return Object(l.jsx)(l.Fragment,{children:Object(l.jsxs)("form",{children:[Object(l.jsxs)("div",{children:[" name:",Object(l.jsx)("input",{value:e.nameTxt,onChange:e.editNameFunc})]}),Object(l.jsxs)("div",{children:[" number:",Object(l.jsx)("input",{value:e.numTxt,onChange:e.editNumberFunc})]}),Object(l.jsx)("div",{children:Object(l.jsx)("button",{type:"button",onClick:e.onSubmitFunc,children:"add"})})]})})},m=(t(16),"https://immense-shore-44135.herokuapp.com/api/persons"),h=function(e){if(null===e.message)return console.log(e.message),null;var n=e.message.includes("Failed")?"error":"notification";return Object(l.jsxs)("div",{className:n,children:[" ",e.message,"  "]})},O=function(){var e=Object(i.useState)(null),n=Object(o.a)(e,2),t=n[0],c=n[1],r=Object(i.useState)([]),a=Object(o.a)(r,2),j=a[0],O=a[1],g=Object(i.useState)(""),p=Object(o.a)(g,2),x=p[0],v=p[1],F=Object(i.useState)(""),k=Object(o.a)(F,2),w=k[0],S=k[1],T=Object(i.useState)(""),C=Object(o.a)(T,2),N=C[0],y=C[1];return Object(i.useEffect)((function(){console.log("fetching phonebook"),s.a.get(m).then((function(e){console.log("fetcing ready"),O(e.data)}))}),[]),console.log("render",j.length,"notes"),Object(l.jsxs)("div",{children:[Object(l.jsx)("h2",{children:"Phonebook"}),Object(l.jsx)(h,{message:t}),Object(l.jsx)(b,{filter_str:N,actionFunc:function(e){return y(e.target.value)}}),Object(l.jsx)("h2",{children:"Add new contact"}),Object(l.jsx)(f,{onSubmitFunc:function(e){e.preventDefault();var n=j.findIndex((function(e){return e.name===x}));if(-1===n)(function(e,n){var t={name:e,number:n};return s.a.post(m,t).then((function(e){return e.data}))})(x,w).then((function(e){return O(j.concat(e))})).catch((function(e){return console.log(e)})),c("Added ".concat(x)),setTimeout((function(){c(null)}),5e3);else if(j[n].number!==w){var t=j[n].name;window.confirm("Changing number of ".concat(t,"?"))&&(function(e,n){var t=Object(u.a)(Object(u.a)({},e),{},{number:n});return s.a.put(m+"/"+e.id,t).then((function(e){return e.data}))}(j[n],w).then((function(e){return O(j.map((function(n){return n.id!==e.id?n:e})))})).catch((function(e){return c("Failed in updating number!")})),c("Updated number for ".concat(t)),setTimeout((function(){c(null)}),5e3))}else alert("".concat(x," with number ").concat(w," is already added to phonebook"));v(""),S("")},nameTxt:x,numTxt:w,editNameFunc:function(e){return v(e.target.value)},editNumberFunc:function(e){return S(e.target.value)}}),Object(l.jsx)("h2",{children:"Numbers"}),Object(l.jsx)(d,{phonebook:j,filter_str:N,deleteFunc:function(e){var n;window.confirm("Really want to remove ".concat(e.name," ?"))&&(n=e.id,s.a.delete(m+"/"+n).then((function(e){return e.data}))).then((function(){O(j.filter((function(n){return n.id!==e.id}))),c("Deleted ".concat(e.name)),setTimeout((function(){c(null)}),5e3)})).catch((function(){alert("Something wrong - could not remove contact ".concat(e.name))}))}})]})};r.a.render(Object(l.jsx)(O,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.32c9fe12.chunk.js.map
(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[7],{42:function(e,t,a){"use strict";var n=a(0),r=a.n(n);a(49);t.a=function(e){return r.a.createElement("div",{className:"card ".concat(e.className),style:e.style},e.children)}},49:function(e,t,a){},65:function(e,t,a){},66:function(e,t,a){},67:function(e,t,a){},73:function(e,t,a){"use strict";a.r(t);var n=a(47),r=a.n(n),c=a(48),l=a(10),o=a(0),s=a.n(o),i=a(1),u=a(42),m=a(44),p=a(58),d=(a(65),function(e){var t=Object(o.useRef)(),a=e.center,n=e.zoom;return Object(o.useEffect)((function(){var e=new window.google.maps.Map(t.current,{center:a,zoom:n});new window.google.maps.Marker({position:a,map:e})}),[a,n]),s.a.createElement("div",{ref:t,className:"map ".concat(e.className),style:e.style})}),E=a(50),f=a(15),h=a(11),v=a(51),b=(a(66),function(e){var t=Object(v.a)(),a=t.isLoading,n=t.error,i=t.sendRequest,b=t.clearError,g=Object(o.useContext)(h.a),j=Object(o.useState)(!1),O=Object(l.a)(j,2),k=O[0],w=O[1],C=Object(o.useState)(!1),N=Object(l.a)(C,2),_=N[0],y=N[1],D=function(){return w(!1)},I=function(){y(!1)},x=function(){var t=Object(c.a)(r.a.mark((function t(){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return y(!1),t.prev=1,t.next=4,i("https://journal-travel-log.herokuapp.com/api"+"/places/".concat(e.id),"DELETE",null,{Authorization:"Bearer "+g.token});case 4:e.onDelete(e.id),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(1);case 9:case"end":return t.stop()}}),t,null,[[1,7]])})));return function(){return t.apply(this,arguments)}}();return s.a.createElement(s.a.Fragment,null,s.a.createElement(E.a,{error:n,onClear:b}),s.a.createElement(p.a,{show:k,onCancel:D,header:e.address,contentClass:"place-item__modal-content",footerClass:"place-item__modal-actions",footer:s.a.createElement(m.a,{onClick:D},"CLOSE")},s.a.createElement("div",{className:"map-container"},s.a.createElement(d,{center:e.coordinates,zoom:16}))),s.a.createElement(p.a,{show:_,onCancel:I,header:"Are you sure?",footerClass:"place-item__modal-actions",footer:s.a.createElement(s.a.Fragment,null,s.a.createElement(m.a,{inverse:!0,onClick:I},"CANCEL"),s.a.createElement(m.a,{danger:!0,onClick:x},"DELETE"))},s.a.createElement("p",null,"Do you want to proceed and delete this place? Please note that it can't be undone thereafter.")),s.a.createElement("li",{className:"place-item"},s.a.createElement(u.a,{className:"place-item__content"},a&&s.a.createElement(f.a,{asOverlay:!0}),s.a.createElement("div",{className:"place-item__image"},s.a.createElement("img",{src:"".concat("https://journal-travel-log.herokuapp.com","/").concat(e.image),alt:e.title})),s.a.createElement("div",{className:"place-item__info"},s.a.createElement("h2",null,e.title),s.a.createElement("h3",null,e.address),s.a.createElement("p",null,e.description)),s.a.createElement("div",{className:"place-item__actions"},s.a.createElement(m.a,{inverse:!0,onClick:function(){return w(!0)}},"VIEW ON MAP"),g.userId===e.creatorId&&s.a.createElement(m.a,{to:"/places/".concat(e.id)},"EDIT"),g.userId===e.creatorId&&s.a.createElement(m.a,{danger:!0,onClick:function(){y(!0)}},"DELETE")))))}),g=(a(67),function(e){return 0===e.items.length?s.a.createElement("div",{className:"place-list center"},s.a.createElement(u.a,null,s.a.createElement("h2",null,"No places found. Maybe create one?"),s.a.createElement(m.a,{to:"/places/new"},"Share Place"))):s.a.createElement("ul",{className:"place-list"},e.items.map((function(t){return s.a.createElement(b,{key:t.id,id:t.id,image:t.image,title:t.title,description:t.description,address:t.address,creatorId:t.creator,coordinates:t.location,onDelete:e.onDeletePlace})})))});t.default=function(){var e=Object(o.useState)(),t=Object(l.a)(e,2),a=t[0],n=t[1],u=Object(v.a)(),m=u.isLoading,p=u.error,d=u.sendRequest,h=u.clearError,b=Object(i.h)().userId;Object(o.useEffect)((function(){(function(){var e=Object(c.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d("".concat("https://journal-travel-log.herokuapp.com/api","/places/user/").concat(b));case 3:t=e.sent,n(t.places),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}})()()}),[d,b]);return s.a.createElement(s.a.Fragment,null,s.a.createElement(E.a,{error:p,onClear:h}),m&&s.a.createElement("div",{className:"center"},s.a.createElement(f.a,null)),!m&&a&&s.a.createElement(g,{items:a,onDeletePlace:function(e){n((function(t){return t.filter((function(t){return t.id!==e}))}))}}))}}}]);
//# sourceMappingURL=7.7ffa578d.chunk.js.map
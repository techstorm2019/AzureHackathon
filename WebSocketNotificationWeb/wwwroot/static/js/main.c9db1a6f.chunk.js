(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{249:function(e,t,a){e.exports=a(647)},254:function(e,t,a){},456:function(e,t,a){},457:function(e,t,a){},647:function(e,t,a){"use strict";a.r(t);var n=a(1),o=a.n(n),r=a(31),s=a.n(r),i=(a(254),a(23)),c=a(24),l=a(27),d=a(25),u=a(26),m=(a(167),a(233)),p=a(125),h=(a(456),a(235)),v=a(95),f=a(94),g=[{label:"Dashboard",link:"/",activeNav:"dashboard",subNavItems:[]},{label:"Orders",link:"/shipment",activeNav:"shipment",subNavItems:[]}],b={MANAGE:"manage",ADMIN:"admin",DASHBOARD:"dashboard",SHIPMENT:"shipment"},N="https://cdn.damco.com/cortex/v1",E=a(236),w=a.n(E),S=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).readNotification=function(e){a.props.hubConnection.invoke("ReadNotification",sessionStorage.getItem("currentUser"),e.id).catch(function(e){return console.error(e)}),alert("Notification successfully read")},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props.notificationItems.length>0?this.props.notificationItems:[];return console.log("Inside dropdown component",t),o.a.createElement("div",{className:"app-switcher"},o.a.createElement("div",{className:"apps-container"},o.a.createElement("div",{className:"apps-wrapper"},o.a.createElement("div",null,t.map(function(t){return o.a.createElement("div",{className:"app-switcher-item",onClick:function(){return e.readNotification(t)}},o.a.createElement("div",{className:"app-switcher-item-icon-container"},o.a.createElement("div",{className:"image-cropper"},o.a.createElement("img",{alt:"",src:"https://cdn.damco.com/cortex/v1/images/sample/1.png",className:"app-switcher-item-icon"}))),o.a.createElement("div",{className:"app-switcher-item-text-container"},o.a.createElement("span",{className:"regular-link-text app-switcher-item-text"},"Order #",t.orderNo),o.a.createElement("div",{className:"small-inactive-text"},o.a.createElement(w.a,null,t.updatedDate)),o.a.createElement("span",{className:"small-body-text"},t.message)))})))))}}]),t}(n.Component),C=(a(457),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(d.a)(t).call(this,e))).setWrapperRef=a.setWrapperRef.bind(Object(v.a)(a)),a.handleClickOutside=a.handleClickOutside.bind(Object(v.a)(a)),a.state={clicked:!1},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){document.addEventListener("mousedown",this.handleClickOutside)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("mousedown",this.handleClickOutside)}},{key:"setWrapperRef",value:function(e){this.wrapperRef=e}},{key:"handleClickOutside",value:function(e){this.wrapperRef&&!this.wrapperRef.contains(e.target)?(this.setState({clicked:!0}),this.props.hideDropdown()):this.setState({clicked:!1})}},{key:"render",value:function(){return o.a.createElement("div",{ref:this.setWrapperRef,className:"dropdown-wrapper"},this.props.children)}}]),t}(n.Component)),O=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(d.a)(t).call(this,e))).launch=function(e,t){e.preventDefault(),window.location=t},a.searchSwitcher=function(e){e.preventDefault();var t,n,r=[],s=e.target.value.toUpperCase(),i=e.target.name,c=[],l=[],d=-1;if(a.setState(Object(h.a)({},i,e.target.value)),a.state.result.length>0){for(a.state.result.forEach(function(e){e.ApplicationName.toUpperCase().includes(s)&&r.push(e)}),n=0;n<=r.length;n+=4)t=o.a.createElement("div",{key:d,className:"apps-by-category home"},o.a.createElement("ul",null,l)),l=[],c[d=c.length]=t;a.setState({AppSwitcherTrim:r.length>0?c:"Result not found!"})}},a.collapseDropdown=function(e){"profile"===e?a.setState({profileDropdown:!1,activeProfile:!1}):"apps"===e?a.setState({appsDropdown:!1,activeApps:!1}):e===b.ADMIN&&(a.setState({adminDropdown:!1}),a.state.activePage!==b.ADMIN&&a.setState({activeAdmin:!1}))},a.activeNav=function(e,t){"upload"===t?a.setState({activePage:"upload",activeUpload:!0,activeInventory:!1,activeProposals:!1,activeManage:!1,activeAdmin:!1}):t===b.DASHBOARD?a.setState({activePage:b.DASHBOARD,activeUpload:!1,activeInventory:!0,activeProposals:!1,activeManage:!1,activeAdmin:!1}):t===b.SHIPMENT?a.setState({activePage:b.SHIPMENT,activeUpload:!1,activeInventory:!1,activeProposals:!0,activeManage:!1,activeAdmin:!1}):t===b.MANAGE?a.setState({activePage:b.MANAGE,activeUpload:!1,activeInventory:!1,activeProposals:!1,activeManage:!0,activeAdmin:!1}):t===b.ADMIN&&a.setState({activePage:b.ADMIN,activeUpload:!1,activeInventory:!1,activeProposals:!1,activeManage:!1,activeAdmin:!0,adminDropdown:!1})},a.hideAppSwitcher=function(){a.setState({appsDropdown:!a.state.appsDropdown,activeApps:!a.state.activeApps})},a.getUserImage=function(e){return"small"===e?o.a.createElement("img",{className:"fa user-profile-photo",src:N+"/images/icons/DefaultProfileImg32.png",alt:"profile"}):o.a.createElement("img",{src:N+"/images/icons/DefaultProfileImg64.png",alt:"profile"})},a.viewAllApps=function(){window.location=a.state.viewAllAppsUrl},a.startLoading=function(){a.setState({pageLoading:!0})},a.endLoading=function(){a.setState({pageLoading:!1})},a.logout=function(e){e.preventDefault();var t=window.location.origin+"/User/SignOut/";window.location=t},a.state={activePage:b.DASHBOARD,activeUpload:!0,activeInventory:!1,activeProposals:!1,activeManage:!1,activeAdmin:!1,activeProfile:!1,activeApps:!1,profileDropdown:!1,appsDropdown:!1,adminDropdown:!1,pageLoading:!1,activeRole:0,result:[],totalRecords:0,dataLimit:5,startIndex:1,pageNumber:1,endIndex:5,disablePre:!0,disableNext:!1,searchSwitcher:"",noApp:!1,viewAllAppsUrl:"",AppSwitcherContent:null,AppSwitcherTrim:[]},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){var e=window.location.pathname.split("/")[1];""===e?this.activeNav("User Management","dashboard"):this.activeNav("User Management",e)}},{key:"getNavItemClass",value:function(e){return this.props.accessItems.includes(e)||"profile"===e||"apps"===e?e===b.DASHBOARD?this.state.activeInventory?"nav-item active":"nav-item":e===b.SHIPMENT?this.state.activeProposals?"nav-item active":"nav-item":e===b.MANAGE?this.state.activeManage?"nav-item active":"nav-item":e===b.ADMIN?this.state.activeAdmin?"nav-item dropdown active":"nav-item dropdown":"profile"===e?this.state.activeProfile?"icon-button active":"icon-button":"apps"===e?this.state.activeApps?"icon-button active":"icon-button":void 0:"hidden"}},{key:"toggleDropdown",value:function(e,t){t.preventDefault(),"profile"===e?this.setState({profileDropdown:!this.state.profileDropdown,activeProfile:!this.state.activeProfile}):"apps"===e?this.setState({activeApps:!this.state.activeApps,appsDropdown:!this.state.appsDropdown}):e===b.ADMIN&&(this.setState({adminDropdown:!this.state.adminDropdown}),this.state.activePage!==b.ADMIN&&this.setState({activeAdmin:!this.state.activeAdmin}))}},{key:"getDropdown",value:function(e){return"profile"===e&&this.state.profileDropdown?{display:"block"}:"admin"===e&&this.state.adminDropdown?{display:"block"}:"apps"===e&&this.state.appsDropdown?{display:"block"}:{display:"none"}}},{key:"render",value:function(){var e=this,t=this.props.notificationItems;return o.a.createElement("header",{className:"ds-header app-logged-in"},o.a.createElement("nav",{className:"navbar large-nav-menu"},o.a.createElement(f.a,{to:"/",className:"navbar-brand",onClick:function(t){return e.activeNav(t,b.DASHBOARD)}},o.a.createElement("img",{src:N+"/images/logos/DamcoPortal.svg",alt:"Logo - Maersk",width:32,height:32})),o.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarCollapse"},o.a.createElement("ul",{className:"navbar-nav"},g.map(function(t,a){return"#"===t.link?o.a.createElement("li",{className:e.getNavItemClass(t.activeNav),key:"item-".concat(a)},o.a.createElement(C,{hideDropdown:function(){return e.collapseDropdown(t.activeNav)}},o.a.createElement(f.a,{to:"",onClick:function(a){return e.toggleDropdown(t.activeNav,a)},className:"dropdown-toggle"},t.label,o.a.createElement("i",{className:"fa fa-angle-down"})),o.a.createElement("ul",{className:"dropdown-menu",style:e.getDropdown(t.activeNav)},t.subNavItems.map(function(t,a){return o.a.createElement("li",{key:"subItem-".concat(a)},0!==a&&a%4===0?o.a.createElement("li",{className:"divider"}):"",o.a.createElement(f.a,{to:t.link,onClick:function(a){return e.activeNav(a,t.activeNav)}},t.label))})))):o.a.createElement("li",{className:e.getNavItemClass(t.activeNav),key:"item-".concat(a)},o.a.createElement(f.a,{to:t.link,onClick:function(a){return e.activeNav(a,t.activeNav)},className:"nav-link link"},t.label))}))),o.a.createElement("div",{className:"icon-bar"},o.a.createElement(C,{hideDropdown:function(){return e.collapseDropdown("apps")}},o.a.createElement(f.a,{to:"#",className:this.getNavItemClass("apps"),onClick:function(t){return e.toggleDropdown("apps",t)}},o.a.createElement("i",{className:"fa fa-bell","aria-hidden":"true"}),o.a.createElement("span",null,t.length)),o.a.createElement("div",{className:"dropdown-content info-dropdown app-switcher-panel",style:this.getDropdown("apps")},o.a.createElement(S,{notificationItems:t,hubConnection:this.props.hubConnection}))),o.a.createElement(C,{hideDropdown:function(){return e.collapseDropdown("profile")}},o.a.createElement(f.a,{to:"#",className:this.getNavItemClass("profile"),onClick:function(t){return e.toggleDropdown("profile",t)}},this.getUserImage("small")),o.a.createElement("div",{id:"dropdown1",className:"dropdown-content info-dropdown",style:this.getDropdown("profile")},o.a.createElement("ul",{className:"dropdown-content-area"},o.a.createElement("li",{className:"dropdown-profile-picture"},this.getUserImage("large")),o.a.createElement("li",{className:"dropdown-details"},o.a.createElement("p",null,o.a.createElement("strong",null,"User name"),o.a.createElement("br",null),sessionStorage.getItem("currentUser"),o.a.createElement("br",null),"xxxxxxxxxx"))),o.a.createElement("div",{className:"dropdown-profile-role vertical-form"},o.a.createElement("div",{className:"form-group"},o.a.createElement("label",null,"Role"),o.a.createElement("select",{defaultValue:this.state.activeRole,className:"form-control"},o.a.createElement("option",{key:"role-11",value:1},"Admin")))),o.a.createElement("div",{className:"dropdown-button-footer nav-dropdown-footer"},o.a.createElement("button",{type:"button",className:"button-large button-transparent hidden"},"View Profile"),o.a.createElement("button",{type:"button",className:"button-large button-transparent",onClick:this.logout},"Logout")))))))}}]),t}(n.Component),D=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(d.a)(t).call(this,e))).toggleSubMenu=function(e){var t=e.target.parentNode,a=null,n=null;t.classList.contains("nav-mobile-title")?(a=t.nextSibling,n=t.childNodes[1]):t.classList.contains("nav-mobile-column")&&(a=t.childNodes[1],n=t.firstChild.childNodes[1]),null!==a&&(a.classList.contains("hidden")?a.classList.remove("hidden"):a.classList.add("hidden")),null!==n&&(n.classList.contains("fa-chevron-up")?(n.classList.remove("fa-chevron-up"),n.classList.add("fa-chevron-down")):n.classList.contains("fa-chevron-down")&&(n.classList.remove("fa-chevron-down"),n.classList.add("fa-chevron-up"))),e.stopPropagation()},a.getNavItemClass=function(e){return a.props.accessItems.includes(e)?"nav-mobile-column":"hidden"},a.state={showNav:!1},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"toggleMobileNav",value:function(){document.body.scrollTop=0,document.documentElement.scrollTop=0,this.setState({showNav:!this.state.showNav})}},{key:"getNavClass",value:function(){return this.state.showNav?"has-sub sub-active close-nav-btn":"has-sub news"}},{key:"render",value:function(){var e=this;return o.a.createElement("nav",{className:"footer-nav mobile-display-gray"},o.a.createElement("ul",null,o.a.createElement("li",{className:this.getNavClass(),onClick:function(){return e.toggleMobileNav()}},o.a.createElement("ul",{className:"submenu submenu-small"},o.a.createElement("li",{className:"nav-column-row"},g.map(function(t,a){return"#"===t.link?o.a.createElement("div",{className:e.getNavItemClass(t.activeNav),key:"item-".concat(a)},o.a.createElement("div",{className:"nav-mobile-title",onClick:function(t){return e.toggleSubMenu(t)}},o.a.createElement("span",null,t.label),o.a.createElement("i",{className:"fa fa-chevron-up","aria-hidden":"true"})),o.a.createElement("ul",{className:"sub-nav-items"},t.subNavItems.map(function(e,t){return o.a.createElement("li",{key:"subItem-".concat(t)},o.a.createElement(f.a,{to:e.link},e.label))}))):o.a.createElement("div",{className:e.getNavItemClass(t.activeNav),key:"item-".concat(a)},o.a.createElement("div",{className:"nav-mobile-title"},o.a.createElement(f.a,{to:t.link},t.label)))}))))))}}]),t}(n.Component),k=a(96),A={maintainAspectRatio:!1,legend:{display:!1},scales:{xAxes:[{gridLines:{zeroLineColor:"#8C8C8C",color:"#C6C6C6"},ticks:{fontColor:"#282828"}}],yAxes:[{gridLines:{zeroLineColor:"#8C8C8C",color:"#C6C6C6"},ticks:{fontColor:"#282828"}}]}};k.b.pluginService.register({beforeDraw:function(e){if(e.config.options.elements.center){var t=e.chart.ctx,a=e.config.options.elements.center,n=a.fontStyle||"Arial",o=a.text,r=a.color||"#000",s=(a.sidePadding||20)/100*(2*e.innerRadius);t.font="30px "+n;var i=t.measureText(o).width,c=(2*e.innerRadius-s)/i,l=Math.floor(30*c),d=2*e.innerRadius,u=Math.min(l,d);t.textAlign="center",t.textBaseline="middle";var m=(e.chartArea.left+e.chartArea.right)/2,p=(e.chartArea.top+e.chartArea.bottom)/2+4;t.font=u+"px "+n,t.fillStyle=r,t.fillText(o,m,p)}}});var I=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement(k.c,{data:this.props.reportData,width:512,height:256,options:{maintainAspectRatio:!1,elements:{center:{text:this.props.progress+"%",color:"#282828",fontStyle:"Arial",sidePadding:20}},legend:{labels:{fontColor:"#282828"},position:"bottom"}}})}}]),t}(n.Component),y=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){}},{key:"render",value:function(){var e=this.props.reportData,t=e.filter(function(e){return"Awaiting order"===e.orderStatus})[0],a=t?t.orderStatusPercentage:0,n=e.filter(function(e){return"Order in processing"===e.orderStatus})[0],r=n?n.orderStatusPercentage:0,s=e.filter(function(e){return"Order shipped"===e.orderStatus})[0],i=s?s.orderStatusPercentage:0,c=e.filter(function(e){return"Order in transit"===e.orderStatus})[0],l=c?c.orderStatusPercentage:0,d=e.filter(function(e){return"Order at destination warehouse"===e.orderStatus})[0],u=d?d.orderStatusPercentage:0,m=e.filter(function(e){return"Order dispatched"===e.orderStatus})[0],p=m?m.orderStatusPercentage:0,h=e.filter(function(e){return"Order delivered"===e.orderStatus})[0],v=h?h.orderStatusPercentage:0,f={labels:["Progress","Pending"],datasets:[{data:[v,100-v],backgroundColor:["#64B2D4","#C3C3C3"],hoverBackgroundColor:["#64B2D4","#C3C3C3"]}]},g={labels:["Awaiting","Processing","Shipped","In transit","At dest. warehouse","Dispatched"],datasets:[{label:"",backgroundColor:["rgba(0,62,94, 0.8)","rgba(163,220,175, 0.8)","rgba(25,90,60, 0.8)","rgba(230,216,184, 0.8)","rgba(255,210,30, 0.8)","rgba(146,37,26, 0.8)"],borderColor:["rgba(0,62,94, 1)","rgba(163,220,175, 1)","rgba(25,90,60, 1)","rgba(230,216,184, 1)","rgba(255,210,30, 1)","rgba(146,37,26, 1)"],borderWidth:1,hoverBackgroundColor:["rgba(0,62,94, 0.8)","rgba(163,220,175, 0.8)","rgba(25,90,60, 0.8)","rgba(230,216,184, 0.8)","rgba(255,210,30, 0.8)","rgba(146,37,26, 0.8)"],hoverBorderColor:["rgba(0,62,94, 1)","rgba(163,220,175, 1)","rgba(25,90,60, 1)","rgba(230,216,184, 1)","rgba(255,210,30, 1)","rgba(146,37,26, 1)"],data:[a,r,i,l,u,p]}]};return o.a.createElement("div",null,o.a.createElement("div",{className:"grid-wrapper"},o.a.createElement("div",{className:"col-30"},o.a.createElement("h3",{className:"title-blue-underline"},"Delivered shipment"),o.a.createElement("div",null,o.a.createElement(I,{reportData:f,progress:v}))),o.a.createElement("div",{className:"col-70"},o.a.createElement("h3",{className:"title-blue-underline"},"Shipment status"),o.a.createElement("div",null,o.a.createElement(k.a,{data:g,width:512,height:256,options:A})))))}}]),t}(n.Component),M=a(248),R=a(163),j=[{headerClassName:"data-table header",Header:"Order ID",accessor:"OrderNo",width:150},{headerClassName:"data-table header",Header:"Customer",accessor:"Customer"},{headerClassName:"data-table header",Header:"Order details",accessor:"OrderDetails"},{headerClassName:"data-table header",Header:"Order status",accessor:"ShipmentStaus"},{headerClassName:"data-table header",Header:"Is delay",accessor:"IsDelay"}],P=new Headers;P.append("pragma","no-cache"),P.append("cache-control","no-cache");var L=P;var x=function(e){if(!e.ok)throw console.log("ERROR",e),Error(e.status.toString());return e.json()},U="https://localhost:44390",T={CONNECTION_ENDPOINT:U+"/notify",GET_ORDERS:U+"/api/Notification/GetOrdersPerUser",GET_ORDER:U+"/api/Notification/GetOrderDetails",GET_SHIPMENT_STATUS_LIST:U+"/api/Notification/GetAllShipmentStatus",POST_UPDATE_ORDER_STATUS:U+"/api/Notification/UpdateShipmentStatus"},H=a(238),B=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(d.a)(t).call(this,e))).handleChange=function(e){var t=a.state;t[e.target.name]=e.target.value,a.setState(t)},a.getOrders=function(){fetch(T.GET_ORDERS+"?userID="+sessionStorage.getItem("currentUser"),{headers:L,credentials:"same-origin"}).then(function(e){return x(e)}).then(function(e){a.setState({shipmentData:e})}).catch(function(e){console.log(e)})},a.selectRow=function(e,t){a.setState({selectedRows:[t]}),a.removeSelected();var n=e.target.parentNode.parentNode.parentNode;e.target.checked?n.classList.add("-selected"):n.classList.remove("-selected")},a.removeSelected=function(){for(var e=document.getElementsByClassName("local-inv"),t=e.length>0?e[0].getElementsByClassName("rt-tr-group"):document.getElementsByClassName("rt-tr-group"),a=0;a<t.length;a++)t[a].classList.contains("-selected")&&t[a].classList.remove("-selected")},a.hideContextRibbon=function(){a.setState({selectedRows:[]},function(){a.removeSelected()})},a.showModal=function(){a.setState({showModal:!0})},a.closeModal=function(){a.setState({showModal:!1})},a.editOrder=function(){fetch(T.GET_ORDER+"?orderID="+a.state.selectedRows[0].ID,{headers:L,credentials:"same-origin"}).then(function(e){return x(e)}).then(function(e){a.setState({selectedOrder:e.Order,selectedStatus:e.OrderShipmentStatusList.filter(function(e){return!0===e.IsCurrentStatus})[0].ShipmentStatusID},function(){console.log(a.state.selectedStatus),a.showModal()})}).catch(function(e){console.log(e)})},a.updateOrderStatus=function(){var e=a.state.selectedOrder.ID,t=a.state.selectedStatus,n=a.state.StatusNote;fetch(T.POST_UPDATE_ORDER_STATUS,{method:"POST",headers:L,credentials:"same-origin",body:JSON.stringify({orderID:e,shipmentStatusID:t,notes:n})}).then(function(e){return x(e)}).then(function(e){a.getOrders(),a.closeModal(),a.loadNotifications()}).catch(function(e){console.log(e)})},a.loadNotifications=function(){a.props.hubConnection.invoke("LoadNotificationOnUpdateOrder",a.state.selectedOrder.ID).then(function(){console.log("After shipment status update : LoadNotificationOnUpdateOrder called")}).catch(function(e){return console.error(e,"Error to call LoadNotificationOnUpdateOrder : after update status")})},a.state={showModal:!1,selectedStatus:1,selectedOrder:{},shipmentStatus:[],shipmentData:[],selectedRows:[],selectAll:0,columns:[{id:"checkbox",accessor:"",className:"-checkbox",Cell:function(e){var t=e.original;return o.a.createElement("input",{type:"radio",name:"rowOption",className:"checkbox",checked:!0===a.state.selectedRows.includes(t),onChange:function(e){return a.selectRow(e,t)}})},sortable:!1,width:45}].concat(Object(M.a)(j))},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){var e=this;fetch(T.GET_SHIPMENT_STATUS_LIST,{headers:L,credentials:"same-origin"}).then(function(e){return x(e)}).then(function(t){e.setState({shipmentStatus:t},function(){e.getOrders()})}).catch(function(e){console.log(e)})}},{key:"render",value:function(){return o.a.createElement("div",null,this.state.showModal?o.a.createElement(H.ModalScreen,{modalType:"s",title:"Modal title",closeMethod:this.closeModal,primaryMethod:this.updateOrderStatus,primaryButtonTitle:"Update",secondaryMethod:this.closeModal,secondaryButtonTitle:"Close"},o.a.createElement("div",{className:"grid-wrapper"},o.a.createElement("div",{className:"col-100"},o.a.createElement("div",{className:"form-group"},o.a.createElement("label",null,"Shipment status"),o.a.createElement("select",{name:"selectedStatus",className:"form-control",value:this.state.selectedStatus,onChange:this.handleChange},o.a.createElement("option",null),this.state.shipmentStatus.length>0?this.state.shipmentStatus.map(function(e){return o.a.createElement("option",{key:"status"+e.ID,value:e.ID},e.Status)}):o.a.createElement("option",null))),o.a.createElement("div",{className:"form-group"},o.a.createElement("label",null,"Shipment status"),o.a.createElement("textarea",{className:"form-control",name:"StatusNote",value:this.state.StatusNote,onChange:this.handleChange}))))):"",o.a.createElement("div",{className:"header-group profile-template"},o.a.createElement("ul",{className:"page-title-group"},o.a.createElement("li",{className:"no-margin"}),o.a.createElement("li",null,o.a.createElement("h1",null,this.state.shipmentData.length>0?this.state.shipmentData[0].Customer:"Customer name")))),o.a.createElement("br",null),o.a.createElement("section",{className:"page-container"},o.a.createElement("div",{className:"grid-wrapper"},o.a.createElement("div",{className:"data-table-container"},this.state.selectedRows.length>0?o.a.createElement("div",{className:"grid-toolbar context-ribbon"},o.a.createElement("div",{className:"button-group context-left",role:"group","aria-label":"Action buttons"},o.a.createElement("button",{type:"button",className:"button button-context",onClick:this.editOrder},"Update status")),o.a.createElement("div",{className:"context-right"},o.a.createElement("span",{className:"selected-count"},this.state.selectedRows.length," selected"),o.a.createElement("button",{type:"button",className:"button button-context",onClick:this.hideContextRibbon},"Cancel"))):"",o.a.createElement(R.default,{data:this.state.shipmentData,columns:this.state.columns,minRows:1,showPagination:!0,sortable:!1,className:"data-table local-inv",onExpandedChange:function(e,t,a,n){}})))))}}]),t}(n.Component),_=a(165),G=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(d.a)(t).call(this,e))).state={currentUser:"",message:"",messages:[],hubConnection:null},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=window.prompt("Your email:","sanjeebkr.paul@gmail.com");this.setState({currentUser:t},function(){sessionStorage.setItem("currentUser",e.state.currentUser);var t=(new _.a).withUrl(T.CONNECTION_ENDPOINT).configureLogging(_.b.Trace).build();e.setState({hubConnection:t},function(){e.props.setConnectionMethod(e.state.hubConnection),e.state.hubConnection.start().then(function(){e.state.hubConnection.invoke("LoadNotfications",sessionStorage.getItem("currentUser")).then(function(){console.log("LoadNotfications called"),e.props.closeLoadingMethod()}).catch(function(e){return console.error(e,"Error to call LoadNotfications")}),console.log("Connection started!")}).catch(function(e){return console.log(e,"Error while establishing connection :(")}),e.state.hubConnection.on("getAllNotification",function(t,a){e.setState({messages:a},function(){e.props.setNotificationMethod(e.state.messages)})}),e.state.hubConnection.on("getReportData",function(t,a){console.log("getReportData",a),e.props.setReportDataMethod(a)}),e.state.hubConnection.on("getNotifiedOnOrderUpdate",function(){e.state.hubConnection.invoke("LoadNotfications",sessionStorage.getItem("currentUser")).then(function(){console.log("LoadNotfications called after update order")}).catch(function(e){return console.error(e,"Error to call LoadNotfications after update")})})})})}},{key:"render",value:function(){return o.a.createElement("div",null)}}]),t}(n.Component),W=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"loading-content"},o.a.createElement("div",{className:"progress-indicator"}))}}]),t}(n.Component),J=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(d.a)(t).call(this,e))).setNotifications=function(e){a.setState({notifications:e},function(){console.log("Notification received",e)})},a.setReportData=function(e){a.setState({reportData:e})},a.setHubConnection=function(e){a.setState({hubConnection:e})},a.closeLoading=function(){a.setState({pageLoading:!1})},a.state={pageLoading:!0,user:null,accessItems:[b.DASHBOARD,b.SHIPMENT,b.ADMIN],setAdmin:"User Management",currentLocation:!0,hubConnection:null,notifications:[],reportData:[]},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return o.a.createElement(m.a,null,o.a.createElement("div",null,this.state.pageLoading?o.a.createElement(W,null):null,o.a.createElement(O,{accessItems:this.state.accessItems,notificationItems:this.state.notifications,hubConnection:this.state.hubConnection}),o.a.createElement("main",{className:"full-width"},o.a.createElement(G,{setNotificationMethod:function(t){return e.setNotifications(t)},setConnectionMethod:function(t){return e.setHubConnection(t)},setReportDataMethod:function(t){return e.setReportData(t)},closeLoadingMethod:this.closeLoading}),o.a.createElement(p.a,{exact:!0,path:"/",render:function(t){return o.a.createElement(y,{reportData:e.state.reportData})}}),o.a.createElement(p.a,{path:"/shipment",render:function(t){return o.a.createElement(B,{hubConnection:e.state.hubConnection})}})),o.a.createElement(D,{accessItems:this.state.accessItems})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(J,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[249,1,2]]]);
//# sourceMappingURL=main.c9db1a6f.chunk.js.map
!function(a,b){"object"==typeof exports?module.exports=b(require("angular")):"function"==typeof define&&define.amd?define(["angular"],b):b(a.angular)}(this,function(angular){return angular.module("ngMap",[]),function(){"use strict";var a,b=function(b,c,d,e,f,g,h){a=f;var i=this;i.mapOptions,i.mapEvents,i.eventListeners,i.addObject=function(a,b){if(i.map){i.map[a]=i.map[a]||{};var c=Object.keys(i.map[a]).length;i.map[a][b.id||c]=b,i.map instanceof google.maps.Map&&("infoWindows"!=a&&b.setMap&&b.setMap&&b.setMap(i.map),b.centered&&b.position&&i.map.setCenter(b.position),"markers"==a&&i.objectChanged("markers"),"customMarkers"==a&&i.objectChanged("customMarkers"))}},i.deleteObject=function(a,b){if(b.map){var c=b.map[a];for(var d in c)c[d]===b&&(google.maps.event.clearInstanceListeners(b),delete c[d]);b.map&&b.setMap&&b.setMap(null),"markers"==a&&i.objectChanged("markers"),"customMarkers"==a&&i.objectChanged("customMarkers")}},i.observeAttrSetObj=function(b,c,d){if(c.noWatcher)return!1;for(var e=a.getAttrsToObserve(b),f=0;f<e.length;f++){var h=e[f];c.$observe(h,g.observeAndSet(h,d))}},i.zoomToIncludeMarkers=function(){if(null!=i.map.markers&&Object.keys(i.map.markers).length>0||null!=i.map.customMarkers&&Object.keys(i.map.customMarkers).length>0){var a=new google.maps.LatLngBounds;for(var b in i.map.markers)a.extend(i.map.markers[b].getPosition());for(var c in i.map.customMarkers)a.extend(i.map.customMarkers[c].getPosition());i.mapOptions.maximumZoom&&(i.enableMaximumZoomCheck=!0),i.map.fitBounds(a)}},i.objectChanged=function(a){!i.map||"markers"!=a&&"customMarkers"!=a||"auto"!=i.map.zoomToIncludeMarkers||i.zoomToIncludeMarkers()},i.initializeMap=function(){var f=i.mapOptions,k=i.mapEvents,l=i.map;if(i.map=h.getMapInstance(c[0]),g.setStyle(c[0]),l){var m=a.filter(d),n=a.getOptions(m),o=a.getControlOptions(m);f=angular.extend(n,o);for(var p in l){var q=l[p];if("object"==typeof q)for(var r in q)i.addObject(p,q[r])}i.map.showInfoWindow=i.showInfoWindow,i.map.hideInfoWindow=i.hideInfoWindow}f.zoom=f.zoom||15;var s=f.center;if(!f.center||"string"==typeof s&&s.match(/\{\{.*\}\}/))f.center=new google.maps.LatLng(0,0);else if("string"==typeof s&&s.match(/[0-9.-]*,[0-9.-]*/))f.center=new google.maps.LatLng(s);else if(!(s instanceof google.maps.LatLng)){var t=f.center;delete f.center,g.getGeoLocation(t,f.geoLocationOptions).then(function(a){i.map.setCenter(a);var c=f.geoCallback;c&&e(c)(b)},function(){f.geoFallbackCenter&&i.map.setCenter(f.geoFallbackCenter)})}i.map.setOptions(f);for(var u in k){var v=k[u],w=google.maps.event.addListener(i.map,u,v);i.eventListeners[u]=w}i.observeAttrSetObj(j,d,i.map),i.singleInfoWindow=f.singleInfoWindow,google.maps.event.trigger(i.map,"resize"),google.maps.event.addListenerOnce(i.map,"idle",function(){g.addMap(i),f.zoomToIncludeMarkers&&i.zoomToIncludeMarkers(),b.map=i.map,b.$emit("mapInitialized",i.map),d.mapInitialized&&e(d.mapInitialized)(b,{map:i.map})}),f.zoomToIncludeMarkers&&f.maximumZoom&&google.maps.event.addListener(i.map,"zoom_changed",function(){1==i.enableMaximumZoomCheck&&(i.enableMaximumZoomCheck=!1,google.maps.event.addListenerOnce(i.map,"bounds_changed",function(){i.map.setZoom(Math.min(f.maximumZoom,i.map.getZoom()))}))})},b.google=google;var j=a.orgAttributes(c),k=a.filter(d),l=a.getOptions(k,{scope:b}),m=a.getControlOptions(k),n=angular.extend(l,m),o=a.getEvents(b,k);if(Object.keys(o).length&&void 0,i.mapOptions=n,i.mapEvents=o,i.eventListeners={},l.lazyInit){if(d.id&&0===d.id.indexOf("{{",0)&&d.id.indexOf("}}",d.id.length-"}}".length)!==-1)var p=d.id.slice(2,-2),q=e(p)(b);else var q=d.id;i.map={id:q},g.addMap(i)}else i.initializeMap();l.triggerResize&&google.maps.event.trigger(i.map,"resize"),c.bind("$destroy",function(){h.returnMapInstance(i.map),g.deleteMap(i)})};b.$inject=["$scope","$element","$attrs","$parse","Attr2MapOptions","NgMap","NgMapPool"],angular.module("ngMap").controller("__MapController",b)}(),function(){"use strict";var a,b=function(b,d,e,f){f=f[0]||f[1];var g=a.orgAttributes(d),h=a.filter(e),i=a.getOptions(h,{scope:b}),j=a.getEvents(b,h),k=c(i,j);f.addObject("bicyclingLayers",k),f.observeAttrSetObj(g,e,k),d.bind("$destroy",function(){f.deleteObject("bicyclingLayers",k)})},c=function(a,b){var c=new google.maps.BicyclingLayer(a);for(var d in b)google.maps.event.addListener(c,d,b[d]);return c},d=function(c){return a=c,{restrict:"E",require:["?^map","?^ngMap"],link:b}};d.$inject=["Attr2MapOptions"],angular.module("ngMap").directive("bicyclingLayer",d)}(),function(){"use strict";var a,b,c,d=function(c,d,e,f){f=f[0]||f[1];var g=a.filter(e),h=a.getOptions(g,{scope:c}),i=a.getEvents(c,g),j=d[0].parentElement.removeChild(d[0]);b(j.innerHTML.trim())(c);for(var k in i)google.maps.event.addDomListener(j,k,i[k]);f.addObject("customControls",j);var l=h.position;f.map.controls[google.maps.ControlPosition[l]].push(j),d.bind("$destroy",function(){f.deleteObject("customControls",j)})},e=function(e,f,g){return a=e,b=f,c=g,{restrict:"E",require:["?^map","?^ngMap"],link:d}};e.$inject=["Attr2MapOptions","$compile","NgMap"],angular.module("ngMap").directive("customControl",e)}(),function(){"use strict";var a,b,c,d,e=function(a){a=a||{},this.el=document.createElement("div"),this.el.style.display="inline-block",this.el.style.visibility="hidden",this.visible=!0;for(var b in a)this[b]=a[b]},f=function(){e.prototype=new google.maps.OverlayView,e.prototype.setContent=function(a,b){this.el.innerHTML=a,this.el.style.position="absolute",b&&c(angular.element(this.el).contents())(b)},e.prototype.getDraggable=function(){return this.draggable},e.prototype.setDraggable=function(a){this.draggable=a},e.prototype.getPosition=function(){return this.position},e.prototype.setPosition=function(a){a&&(this.position=a);var c=this;if(this.getProjection()&&"function"==typeof this.position.lng){var d=function(){var a=c.getProjection().fromLatLngToDivPixel(c.position),b=Math.round(a.x-c.el.offsetWidth/2),d=Math.round(a.y-c.el.offsetHeight-10);c.el.style.left=b+"px",c.el.style.top=d+"px",c.el.style.visibility="visible"};c.el.offsetWidth&&c.el.offsetHeight?d():b(d,300)}},e.prototype.setZIndex=function(a){a&&(this.zIndex=a),this.el.style.zIndex=this.zIndex},e.prototype.getVisible=function(){return this.visible},e.prototype.setVisible=function(a){this.el.style.display=a?"inline-block":"none",this.visible=a},e.prototype.addClass=function(a){var b=this.el.className.trim().split(" ");b.indexOf(a)==-1&&b.push(a),this.el.className=b.join(" ")},e.prototype.removeClass=function(a){var b=this.el.className.split(" "),c=b.indexOf(a);c>-1&&b.splice(c,1),this.el.className=b.join(" ")},e.prototype.onAdd=function(){this.getPanes().overlayMouseTarget.appendChild(this.el)},e.prototype.draw=function(){this.setPosition(),this.setZIndex(this.zIndex),this.setVisible(this.visible)},e.prototype.onRemove=function(){this.el.parentNode.removeChild(this.el)}},g=function(c,f){return function(g,h,i,j){j=j[0]||j[1];var k=a.orgAttributes(h),l=a.filter(i),m=a.getOptions(l,{scope:g}),n=a.getEvents(g,l);h[0].style.display="none";var o=new e(m);b(function(){g.$watch("["+f.join(",")+"]",function(){o.setContent(c,g)},!0),o.setContent(h[0].innerHTML,g);var a=h[0].firstElementChild.className;o.addClass("custom-marker"),o.addClass(a),m.position instanceof google.maps.LatLng||d.getGeoLocation(m.position).then(function(a){o.setPosition(a)})});for(var p in n)google.maps.event.addDomListener(o.el,p,n[p]);j.addObject("customMarkers",o),j.observeAttrSetObj(k,i,o),h.bind("$destroy",function(){j.deleteObject("customMarkers",o)})}},h=function(e,h,i,j){return a=i,b=e,c=h,d=j,{restrict:"E",require:["?^map","?^ngMap"],compile:function(a){f(),a[0].style.display="none";var b=a.html(),c=b.match(/{{([^}]+)}}/g),d=[];return(c||[]).forEach(function(a){var b=a.replace("{{","").replace("}}","");a.indexOf("::")==-1&&a.indexOf("this.")==-1&&d.indexOf(b)==-1&&d.push(a.replace("{{","").replace("}}",""))}),g(b,d)}}};h.$inject=["$timeout","$compile","Attr2MapOptions","NgMap"],angular.module("ngMap").directive("customMarker",h)}(),function(){"use strict";var a,b,c,d=function(a,b){a.panel&&(a.panel=document.getElementById(a.panel)||document.querySelector(a.panel));var c=new google.maps.DirectionsRenderer(a);for(var d in b)google.maps.event.addListener(c,d,b[d]);return c},e=function(a,d){var e=new google.maps.DirectionsService,f=d;f.travelMode=f.travelMode||"DRIVING";var g=["origin","destination","travelMode","transitOptions","unitSystem","durationInTraffic","waypoints","optimizeWaypoints","provideRouteAlternatives","avoidHighways","avoidTolls","region"];for(var h in f)g.indexOf(h)===-1&&delete f[h];f.waypoints&&("[]"!=f.waypoints&&""!==f.waypoints||delete f.waypoints);var i=function(c){e.route(c,function(c,d){d==google.maps.DirectionsStatus.OK&&b(function(){a.setDirections(c)})})};f.origin&&f.destination&&("current-location"==f.origin?c.getCurrentPosition().then(function(a){f.origin=new google.maps.LatLng(a.coords.latitude,a.coords.longitude),i(f)}):"current-location"==f.destination?c.getCurrentPosition().then(function(a){f.destination=new google.maps.LatLng(a.coords.latitude,a.coords.longitude),i(f)}):i(f))},f=function(f,g,h,i){var j=f;a=i,b=g,c=h;var k=function(c,f,g,h){h=h[0]||h[1];var i=j.orgAttributes(f),k=j.filter(g),l=j.getOptions(k,{scope:c}),m=j.getEvents(c,k),n=j.getAttrsToObserve(i),o=d(l,m);h.addObject("directionsRenderers",o),n.forEach(function(a){!function(a){g.$observe(a,function(c){if("panel"==a)b(function(){var a=document.getElementById(c)||document.querySelector(c);a&&o.setPanel(a)});else if(l[a]!==c){var d=j.toOptionValue(c,{key:a});l[a]=d,e(o,l)}})}(a)}),a.getMap().then(function(){e(o,l)}),f.bind("$destroy",function(){h.deleteObject("directionsRenderers",o)})};return{restrict:"E",require:["?^map","?^ngMap"],link:k}};f.$inject=["Attr2MapOptions","$timeout","NavigatorGeolocation","NgMap"],angular.module("ngMap").directive("directions",f)}(),function(){"use strict";angular.module("ngMap").directive("drawingManager",["Attr2MapOptions",function(a){var b=a;return{restrict:"E",require:["?^map","?^ngMap"],link:function(a,c,d,e){e=e[0]||e[1];var f=b.filter(d),g=b.getOptions(f,{scope:a}),h=b.getControlOptions(f),i=b.getEvents(a,f),j=new google.maps.drawing.DrawingManager({drawingMode:g.drawingmode,drawingControl:g.drawingcontrol,drawingControlOptions:h.drawingControlOptions,circleOptions:g.circleoptions,markerOptions:g.markeroptions,polygonOptions:g.polygonoptions,polylineOptions:g.polylineoptions,rectangleOptions:g.rectangleoptions});d.$observe("drawingControlOptions",function(a){j.drawingControlOptions=b.getControlOptions({drawingControlOptions:a}).drawingControlOptions,j.setDrawingMode(null),j.setMap(e.map)});for(var k in i)google.maps.event.addListener(j,k,i[k]);e.addObject("mapDrawingManager",j),c.bind("$destroy",function(){e.deleteObject("mapDrawingManager",j)})}}}])}(),function(){"use strict";angular.module("ngMap").directive("dynamicMapsEngineLayer",["Attr2MapOptions",function(a){var b=a,c=function(a,b){var c=new google.maps.visualization.DynamicMapsEngineLayer(a);for(var d in b)google.maps.event.addListener(c,d,b[d]);return c};return{restrict:"E",require:["?^map","?^ngMap"],link:function(a,d,e,f){f=f[0]||f[1];var g=b.filter(e),h=b.getOptions(g,{scope:a}),i=b.getEvents(a,g,i),j=c(h,i);f.addObject("mapsEngineLayers",j)}}}])}(),function(){"use strict";angular.module("ngMap").directive("fusionTablesLayer",["Attr2MapOptions",function(a){var b=a,c=function(a,b){var c=new google.maps.FusionTablesLayer(a);for(var d in b)google.maps.event.addListener(c,d,b[d]);return c};return{restrict:"E",require:["?^map","?^ngMap"],link:function(a,d,e,f){f=f[0]||f[1];var g=b.filter(e),h=b.getOptions(g,{scope:a}),i=b.getEvents(a,g,i),j=c(h,i);f.addObject("fusionTablesLayers",j)}}}])}(),function(){"use strict";angular.module("ngMap").directive("heatmapLayer",["Attr2MapOptions","$window",function(a,b){var c=a;return{restrict:"E",require:["?^map","?^ngMap"],link:function(a,d,e,f){f=f[0]||f[1];var g=c.filter(e),h=c.getOptions(g,{scope:a});if(h.data=b[e.data]||a[e.data],!(h.data instanceof Array))throw"invalid heatmap data";h.data=new google.maps.MVCArray(h.data);var i=new google.maps.visualization.HeatmapLayer(h);c.getEvents(a,g);f.addObject("heatmapLayers",i)}}}])}(),function(){"use strict";var a=function(a,b,c,d,e,f,g){var h=a,i=function(a,f,g){var h;!a.position||a.position instanceof google.maps.LatLng||delete a.position,h=new google.maps.InfoWindow(a);for(var i in f)i&&google.maps.event.addListener(h,i,f[i]);var j=c(function(a){angular.isString(g)?d(g).then(function(b){a(angular.element(b).wrap("<div>").parent())},function(a){throw"info-window template request failed: "+a}):a(g)}).then(function(a){var b=a.html().trim();if(1!=angular.element(b).length)throw"info-window working as a template must have a container";h.__template=b.replace(/\s?ng-non-bindable[='"]+/,"")});return h.__open=function(a,c,d){j.then(function(){e(function(){d&&(c.anchor=d);var e=b(h.__template)(c);h.setContent(e[0]),c.$apply(),d&&d.getPosition?h.open(a,d):d&&d instanceof google.maps.LatLng?(h.open(a),h.setPosition(d)):h.open(a);var f=h.content.parentElement.parentElement.parentElement;f.className="ng-map-info-window"})})},h},j=function(a,b,c,d){d=d[0]||d[1],b.css("display","none");var n,e=h.orgAttributes(b),j=h.filter(c),k=h.getOptions(j,{scope:a}),l=h.getEvents(a,j),m=i(k,l,k.template||b);!k.position||k.position instanceof google.maps.LatLng||(n=k.position),n&&g.getGeoLocation(n).then(function(b){m.setPosition(b),m.__open(d.map,a,b);var e=c.geoCallback;e&&f(e)(a)}),d.addObject("infoWindows",m),d.observeAttrSetObj(e,c,m),d.showInfoWindow=d.map.showInfoWindow=d.showInfoWindow||function(b,c,e){var f="string"==typeof b?b:c,g="string"==typeof b?c:e;if("string"==typeof g)if("undefined"!=typeof d.map.markers&&"undefined"!=typeof d.map.markers[g])g=d.map.markers[g];else{if(d.map.customMarkers,"undefined"==typeof d.map.customMarkers[g])throw new Error("Cant open info window for id "+g+". Marker or CustomMarker is not defined");g=d.map.customMarkers[g]}var h=d.map.infoWindows[f],i=g?g:this.getPosition?this:null;h.__open(d.map,a,i),d.singleInfoWindow&&(d.lastInfoWindow&&a.hideInfoWindow(d.lastInfoWindow),d.lastInfoWindow=f)},d.hideInfoWindow=d.map.hideInfoWindow=d.hideInfoWindow||function(a,b){var c="string"==typeof a?a:b,e=d.map.infoWindows[c];e.close()},a.showInfoWindow=d.map.showInfoWindow,a.hideInfoWindow=d.map.hideInfoWindow;var o=m.mapId?{id:m.mapId}:0;g.getMap(o).then(function(b){if(m.visible&&m.__open(b,a),m.visibleOnMarker){var c=m.visibleOnMarker;m.__open(b,a,b.markers[c])}})};return{restrict:"E",require:["?^map","?^ngMap"],link:j}};a.$inject=["Attr2MapOptions","$compile","$q","$templateRequest","$timeout","$parse","NgMap"],angular.module("ngMap").directive("infoWindow",a)}(),function(){"use strict";angular.module("ngMap").directive("kmlLayer",["Attr2MapOptions",function(a){var b=a,c=function(a,b){var c=new google.maps.KmlLayer(a);for(var d in b)google.maps.event.addListener(c,d,b[d]);return c};return{restrict:"E",require:["?^map","?^ngMap"],link:function(a,d,e,f){f=f[0]||f[1];var g=b.orgAttributes(d),h=b.filter(e),i=b.getOptions(h,{scope:a}),j=b.getEvents(a,h),k=c(i,j);f.addObject("kmlLayers",k),f.observeAttrSetObj(g,e,k),d.bind("$destroy",function(){f.deleteObject("kmlLayers",k)})}}}])}(),function(){"use strict";angular.module("ngMap").directive("mapData",["Attr2MapOptions","NgMap",function(a,b){var c=a;return{restrict:"E",require:["?^map","?^ngMap"],link:function(a,d,e){var f=c.filter(e),g=c.getOptions(f,{scope:a}),h=c.getEvents(a,f,h);b.getMap().then(function(b){for(var c in g){var d=g[c];"function"==typeof a[d]?b.data[c](a[d]):b.data[c](d)}for(var e in h)b.data.addListener(e,h[e])})}}}])}(),function(){"use strict";var a,b,c,d=[],e=[],f=function(c,f,g){var h=g.mapLazyLoadParams||g.mapLazyLoad;if(void 0===window.google||void 0===window.google.maps){e.push({scope:c,element:f,savedHtml:d[e.length]}),window.lazyLoadCallback=function(){a(function(){e.forEach(function(a){a.element.html(a.savedHtml),b(a.element.contents())(a.scope)})},100)};var i=document.createElement("script");i.src=h+(h.indexOf("?")>-1?"&":"?")+"callback=lazyLoadCallback",document.querySelector('script[src="'+i.src+'"]')||document.body.appendChild(i)}else f.html(d),b(f.contents())(c)},g=function(a,b){return!b.mapLazyLoad&&void 0,d.push(a.html()),c=b.mapLazyLoad,(void 0===window.google||void 0===window.google.maps)&&(a.html(""),{pre:f})},h=function(c,d){return b=c,a=d,{compile:g}};h.$inject=["$compile","$timeout"],angular.module("ngMap").directive("mapLazyLoad",h)}(),function(){"use strict";angular.module("ngMap").directive("mapType",["$parse","NgMap",function(a,b){return{restrict:"E",require:["?^map","?^ngMap"],link:function(c,d,e,f){f=f[0]||f[1];var h,g=e.name;if(!g)throw"invalid map-type name";if(h=a(e.object)(c),!h)throw"invalid map-type object";b.getMap().then(function(a){a.mapTypes.set(g,h)}),f.addObject("mapTypes",h)}}}])}(),function(){"use strict";var a=function(){return{restrict:"AE",controller:"__MapController",controllerAs:"ngmap"}};angular.module("ngMap").directive("map",[a]),angular.module("ngMap").directive("ngMap",[a])}(),function(){"use strict";angular.module("ngMap").directive("mapsEngineLayer",["Attr2MapOptions",function(a){var b=a,c=function(a,b){var c=new google.maps.visualization.MapsEngineLayer(a);for(var d in b)google.maps.event.addListener(c,d,b[d]);return c};return{restrict:"E",require:["?^map","?^ngMap"],link:function(a,d,e,f){f=f[0]||f[1];var g=b.filter(e),h=b.getOptions(g,{scope:a}),i=b.getEvents(a,g,i),j=c(h,i);f.addObject("mapsEngineLayers",j)}}}])}(),function(){"use strict";var a,b,c,d=function(a,b){var d;if(c.defaultOptions.marker)for(var e in c.defaultOptions.marker)"undefined"==typeof a[e]&&(a[e]=c.defaultOptions.marker[e]);a.position instanceof google.maps.LatLng||(a.position=new google.maps.LatLng(0,0)),d=new google.maps.Marker(a),Object.keys(b).length>0;for(var f in b)f&&google.maps.event.addListener(d,f,b[f]);return d},e=function(e,f,g,h){h=h[0]||h[1];var m,i=a.orgAttributes(f),j=a.filter(g),k=a.getOptions(j,e,{scope:e}),l=a.getEvents(e,j);k.position instanceof google.maps.LatLng||(m=k.position);var n=d(k,l);h.addObject("markers",n),m&&c.getGeoLocation(m).then(function(a){n.setPosition(a),k.centered&&n.map.setCenter(a);var c=g.geoCallback;c&&b(c)(e)}),h.observeAttrSetObj(i,g,n),f.bind("$destroy",function(){h.deleteObject("markers",n)})},f=function(d,f,g){return a=d,b=f,c=g,{restrict:"E",require:["^?map","?^ngMap"],link:e}};f.$inject=["Attr2MapOptions","$parse","NgMap"],angular.module("ngMap").directive("marker",f)}(),function(){"use strict";angular.module("ngMap").directive("overlayMapType",["NgMap",function(a){return{restrict:"E",require:["?^map","?^ngMap"],link:function(b,c,d,e){e=e[0]||e[1];var f=d.initMethod||"insertAt",g=b[d.object];a.getMap().then(function(a){if("insertAt"==f){var b=parseInt(d.index,10);a.overlayMapTypes.insertAt(b,g)}else"push"==f&&a.overlayMapTypes.push(g)}),e.addObject("overlayMapTypes",g)}}}])}(),function(){"use strict";var a=function(a,b){var c=a,d=function(a,d,e,f){if("false"===e.placesAutoComplete)return!1;var g=c.filter(e),h=c.getOptions(g,{scope:a}),i=c.getEvents(a,g),j=new google.maps.places.Autocomplete(d[0],h);for(var k in i)google.maps.event.addListener(j,k,i[k]);var l=function(){b(function(){f&&f.$setViewValue(d.val())},100)};google.maps.event.addListener(j,"place_changed",l),d[0].addEventListener("change",l),e.$observe("types",function(a){if(a){var b=c.toOptionValue(a,{key:"types"});j.setTypes(b)}}),e.$observe("componentRestrictions",function(b){b&&j.setComponentRestrictions(a.$eval(b))})};return{restrict:"A",require:"?ngModel",link:d}};a.$inject=["Attr2MapOptions","$timeout"],angular.module("ngMap").directive("placesAutoComplete",a)}(),function(){"use strict";var a=function(a,b){var c,d=a.name;switch(delete a.name,d){case"circle":a.center instanceof google.maps.LatLng||(a.center=new google.maps.LatLng(0,0)),c=new google.maps.Circle(a);break;case"polygon":c=new google.maps.Polygon(a);break;case"polyline":c=new google.maps.Polyline(a);break;case"rectangle":c=new google.maps.Rectangle(a);break;case"groundOverlay":case"image":var e=a.url,f={opacity:a.opacity,clickable:a.clickable,id:a.id};c=new google.maps.GroundOverlay(e,a.bounds,f)}for(var g in b)b[g]&&google.maps.event.addListener(c,g,b[g]);return c},b=function(b,c,d){var e=b,f=function(b,f,g,h){h=h[0]||h[1];var m,n,i=e.orgAttributes(f),j=e.filter(g),k=e.getOptions(j,{scope:b}),l=e.getEvents(b,j);n=k.name,k.center instanceof google.maps.LatLng||(m=k.center);var o=a(k,l);h.addObject("shapes",o),m&&"circle"==n&&d.getGeoLocation(m).then(function(a){o.setCenter(a),o.centered&&o.map.setCenter(a);var d=g.geoCallback;d&&c(d)(b)}),h.observeAttrSetObj(i,g,o),f.bind("$destroy",function(){h.deleteObject("shapes",o)})};return{restrict:"E",require:["?^map","?^ngMap"],link:f}};b.$inject=["Attr2MapOptions","$parse","NgMap"],angular.module("ngMap").directive("shape",b)}(),function(){"use strict";var a=function(a,b){var c=a,d=function(a,b,c){var d,e;b.container&&(e=document.getElementById(b.container),e=e||document.querySelector(b.container)),e?d=new google.maps.StreetViewPanorama(e,b):(d=a.getStreetView(),d.setOptions(b));for(var f in c)f&&google.maps.event.addListener(d,f,c[f]);return d},e=function(a,e,f){var g=c.filter(f),h=c.getOptions(g,{scope:a}),i=c.getControlOptions(g),j=angular.extend(h,i),k=c.getEvents(a,g);b.getMap().then(function(a){var b=d(a,j,k);a.setStreetView(b),!b.getPosition()&&b.setPosition(a.getCenter()),google.maps.event.addListener(b,"position_changed",function(){b.getPosition()!==a.getCenter()&&a.setCenter(b.getPosition())});var c=google.maps.event.addListener(a,"center_changed",function(){b.setPosition(a.getCenter()),google.maps.event.removeListener(c)})})};return{restrict:"E",require:["?^map","?^ngMap"],link:e}};a.$inject=["Attr2MapOptions","NgMap"],angular.module("ngMap").directive("streetViewPanorama",a)}(),function(){"use strict";angular.module("ngMap").directive("trafficLayer",["Attr2MapOptions",function(a){var b=a,c=function(a,b){var c=new google.maps.TrafficLayer(a);for(var d in b)google.maps.event.addListener(c,d,b[d]);return c};return{restrict:"E",require:["?^map","?^ngMap"],link:function(a,d,e,f){f=f[0]||f[1];var g=b.orgAttributes(d),h=b.filter(e),i=b.getOptions(h,{scope:a}),j=b.getEvents(a,h),k=c(i,j);f.addObject("trafficLayers",k),f.observeAttrSetObj(g,e,k),d.bind("$destroy",function(){f.deleteObject("trafficLayers",k)})}}}])}(),function(){"use strict";angular.module("ngMap").directive("transitLayer",["Attr2MapOptions",function(a){var b=a,c=function(a,b){var c=new google.maps.TransitLayer(a);for(var d in b)google.maps.event.addListener(c,d,b[d]);return c};return{restrict:"E",require:["?^map","?^ngMap"],link:function(a,d,e,f){f=f[0]||f[1];var g=b.orgAttributes(d),h=b.filter(e),i=b.getOptions(h,{scope:a}),j=b.getEvents(a,h),k=c(i,j);f.addObject("transitLayers",k),f.observeAttrSetObj(g,e,k),d.bind("$destroy",function(){f.deleteObject("transitLayers",k)})}}}])}(),function(){"use strict";var a=/([\:\-\_]+(.))/g,b=/^moz([A-Z])/,c=function(){return function(c){return c.replace(a,function(a,b,c,d){return d?c.toUpperCase():c}).replace(b,"Moz$1")}};angular.module("ngMap").filter("camelCase",c)}(),function(){"use strict";var a=function(){return function(a){try{return JSON.parse(a),a}catch(b){return a.replace(/([\$\w]+)\s*:/g,function(a,b){return'"'+b+'":'}).replace(/'([^']+)'/g,function(a,b){return'"'+b+'"'})}}};angular.module("ngMap").filter("jsonize",a)}(),function(){"use strict";var isoDateRE=/^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*)?)([zZ]|([+\-])(\d\d):?(\d\d))?$/,Attr2MapOptions=function($parse,$timeout,$log,NavigatorGeolocation,GeoCoder,camelCaseFilter,jsonizeFilter){var orgAttributes=function(a){a.length>0&&(a=a[0]);for(var b={},c=0;c<a.attributes.length;c++){var d=a.attributes[c];b[d.name]=d.value}return b},getJSON=function(a){var b=/^[\+\-]?[0-9\.]+,[ ]*\ ?[\+\-]?[0-9\.]+$/;return a.match(b)&&(a="["+a+"]"),JSON.parse(jsonizeFilter(a))},getLatLng=function(a){var b=a;return a[0].constructor==Array?b=a.map(function(a){return new google.maps.LatLng(a[0],a[1])}):!isNaN(parseFloat(a[0]))&&isFinite(a[0])&&(b=new google.maps.LatLng(b[0],b[1])),b},toOptionValue=function(input,options){var output;try{output=getNumber(input)}catch(err){try{var output=getJSON(input);if(output instanceof Array)output=output[0].constructor==Object?output:getLatLng(output);else if(output===Object(output)){var newOptions=options;newOptions.doNotConverStringToNumber=!0,output=getOptions(output,newOptions)}}catch(err2){if(input.match(/^[A-Z][a-zA-Z0-9]+\(.*\)$/))try{var exp="new google.maps."+input;output=eval(exp)}catch(a){output=input}else if(input.match(/^([A-Z][a-zA-Z0-9]+)\.([A-Z]+)$/))try{var matches=input.match(/^([A-Z][a-zA-Z0-9]+)\.([A-Z]+)$/);output=google.maps[matches[1]][matches[2]]}catch(a){output=input}else if(input.match(/^[A-Z]+$/))try{var capitalizedKey=options.key.charAt(0).toUpperCase()+options.key.slice(1);options.key.match(/temperatureUnit|windSpeedUnit|labelColor/)?(capitalizedKey=capitalizedKey.replace(/s$/,""),output=google.maps.weather[capitalizedKey][input]):output=google.maps[capitalizedKey][input]}catch(a){output=input}else if(input.match(isoDateRE))try{output=new Date(input)}catch(a){output=input}else if(input.match(/^{/)&&options.scope)try{var expr=input.replace(/{{/,"").replace(/}}/g,"");output=options.scope.$eval(expr)}catch(a){output=input}else output=input}}if(("center"==options.key||"position"==options.key)&&output instanceof Array&&(output=new google.maps.LatLng(output[0],output[1])),"bounds"==options.key&&output instanceof Array&&(output=new google.maps.LatLngBounds(output[0],output[1])),"icons"==options.key&&output instanceof Array)for(var i=0;i<output.length;i++){var el=output[i];el.icon.path.match(/^[A-Z_]+$/)&&(el.icon.path=google.maps.SymbolPath[el.icon.path])}if("icon"==options.key&&output instanceof Object){(""+output.path).match(/^[A-Z_]+$/)&&(output.path=google.maps.SymbolPath[output.path]);for(var key in output){var arr=output[key];"anchor"==key||"origin"==key||"labelOrigin"==key?output[key]=new google.maps.Point(arr[0],arr[1]):"size"!=key&&"scaledSize"!=key||(output[key]=new google.maps.Size(arr[0],arr[1]))}}return output},getAttrsToObserve=function(a){var b=[];if(!a.noWatcher)for(var c in a){var d=a[c];d&&d.match(/\{\{.*\}\}/)&&b.push(camelCaseFilter(c))}return b},filter=function(a){var b={};for(var c in a)c.match(/^\$/)||c.match(/^ng[A-Z]/)||(b[c]=a[c]);return b},getOptions=function(a,b){b=b||{};var c={};for(var d in a)if(a[d]||0===a[d]){if(d.match(/^on[A-Z]/))continue;if(d.match(/ControlOptions$/))continue;"string"!=typeof a[d]?c[d]=a[d]:b.doNotConverStringToNumber&&a[d].match(/^[0-9]+$/)?c[d]=a[d]:c[d]=toOptionValue(a[d],{key:d,scope:b.scope})}return c},getEvents=function(a,b){var c={},d=function(a){return"_"+a.toLowerCase()},e=function(b){var c=b.match(/([^\(]+)\(([^\)]*)\)/),d=c[1],e=c[2].replace(/event[ ,]*/,""),f=$parse("["+e+"]");return function(b){function e(a,b){return a[b]}var c=f(a),g=d.split(".").reduce(e,a);g&&g.apply(this,[b].concat(c)),$timeout(function(){a.$apply()})}};for(var f in b)if(b[f]){if(!f.match(/^on[A-Z]/))continue;var g=f.replace(/^on/,"");g=g.charAt(0).toLowerCase()+g.slice(1),g=g.replace(/([A-Z])/g,d);var h=b[f];c[g]=new e(h)}return c},getControlOptions=function(a){var b={};if("object"!=typeof a)return!1;for(var c in a)if(a[c]){if(!c.match(/(.*)ControlOptions$/))continue;var d=a[c],e=d.replace(/'/g,'"');e=e.replace(/([^"]+)|("[^"]+")/g,function(a,b,c){return b?b.replace(/([a-zA-Z0-9]+?):/g,'"$1":'):c});try{var f=JSON.parse(e);for(var g in f)if(f[g]){var h=f[g];if("string"==typeof h?h=h.toUpperCase():"mapTypeIds"===g&&(h=h.map(function(a){return a.match(/^[A-Z]+$/)?google.maps.MapTypeId[a.toUpperCase()]:a})),"style"===g){var i=c.charAt(0).toUpperCase()+c.slice(1),j=i.replace(/Options$/,"")+"Style";f[g]=google.maps[j][h]}else"position"===g?f[g]=google.maps.ControlPosition[h]:f[g]=h}b[c]=f}catch(a){}}return b};return{filter:filter,getOptions:getOptions,getEvents:getEvents,getControlOptions:getControlOptions,toOptionValue:toOptionValue,getAttrsToObserve:getAttrsToObserve,orgAttributes:orgAttributes}};Attr2MapOptions.$inject=["$parse","$timeout","$log","NavigatorGeolocation","GeoCoder","camelCaseFilter","jsonizeFilter"],angular.module("ngMap").service("Attr2MapOptions",Attr2MapOptions)}(),function(){"use strict";var a,b=function(b){var c=a.defer(),d=new google.maps.Geocoder;return d.geocode(b,function(a,b){b==google.maps.GeocoderStatus.OK?c.resolve(a):c.reject(b)}),c.promise},c=function(c){return a=c,{geocode:b}};c.$inject=["$q"],angular.module("ngMap").service("GeoCoder",c)}(),function(){"use strict";var a,b=function(b){var c=a.defer();return navigator.geolocation?(void 0===b?b={timeout:5e3}:void 0===b.timeout&&(b.timeout=5e3),navigator.geolocation.getCurrentPosition(function(a){c.resolve(a)},function(a){c.reject(a)},b)):c.reject("Browser Geolocation service failed."),c.promise},c=function(c){return a=c,{getCurrentPosition:b}};c.$inject=["$q"],angular.module("ngMap").service("NavigatorGeolocation",c)}(),function(){"use strict";var b,c,d,a=[],e=function(d){var e=c.createElement("div");e.style.width="100%",e.style.height="100%",d.appendChild(e);var f=new b.google.maps.Map(e,{});return a.push(f),f},f=function(b,c){for(var d,e=0;e<a.length;e++){var f=a[e];if(f.id==c&&!f.inUse){var g=f.getDiv();b.appendChild(g),d=f;break}}return d},g=function(b){for(var c,d=0;d<a.length;d++){var e=a[d];if(!e.id&&!e.inUse){var f=e.getDiv();b.appendChild(f),c=e;break}}return c},h=function(a){var b=f(a,a.id)||g(a);return b?d(function(){google.maps.event.trigger(b,"idle")},100):b=e(a),b.inUse=!0,b},i=function(a){a.inUse=!1},j=function(){for(var b=0;b<a.length;b++)a[b]=null;a=[]},k=function(e,f,g){return c=e[0],b=f,d=g,{mapInstances:a,resetMapInstances:j,getMapInstance:h,returnMapInstance:i}};k.$inject=["$document","$window","$timeout"],angular.module("ngMap").factory("NgMapPool",k)}(),function(){"use strict";var a,b,c,d,e,f,g,h={},i=function(c,d){var e;return c.currentStyle?e=c.currentStyle[d]:a.getComputedStyle&&(e=b.defaultView.getComputedStyle(c,null).getPropertyValue(d)),e},j=function(a){var b=h[a||0];if(!(b.map instanceof google.maps.Map))return b.initializeMap(),b.map},k=function(b){function f(c){h[b]?d.resolve(h[b].map):c>e?d.reject("could not find map"):a.setTimeout(function(){f(c+100)},100)}b="object"==typeof b?b.id:b,b=b||0;var d=c.defer(),e=2e3;return f(0),d.promise},l=function(a){if(a.map){var b=Object.keys(h).length;h[a.map.id||b]=a}},m=function(a){var b=Object.keys(h).length-1,c=a.map.id||b;if(a.map){for(var d in a.eventListeners){var e=a.eventListeners[d];google.maps.event.removeListener(e)}a.map.controls&&a.map.controls.forEach(function(a){a.clear()})}a.map.heatmapLayers&&Object.keys(a.map.heatmapLayers).forEach(function(b){a.deleteObject("heatmapLayers",a.map.heatmapLayers[b])}),delete h[c]},n=function(a,b){var e=c.defer();return!a||a.match(/^current/i)?d.getCurrentPosition(b).then(function(a){var b=a.coords.latitude,c=a.coords.longitude,d=new google.maps.LatLng(b,c);e.resolve(d)},function(a){e.reject(a)}):f.geocode({address:a}).then(function(a){e.resolve(a[0].geometry.location)},function(a){e.reject(a)}),e.promise},o=function(a,b){return function(c){if(c){var d=g("set-"+a),f=e.toOptionValue(c,{key:a});b[d]&&(a.match(/center|position/)&&"string"==typeof f?n(f).then(function(a){b[d](a)}):b[d](f))}}},p=function(a){var b=a.getAttribute("default-style");"true"==b?(a.style.display="block",a.style.height="300px"):("block"!=i(a,"display")&&(a.style.display="block"),i(a,"height").match(/^(0|auto)/)&&(a.style.height="300px"))};angular.module("ngMap").provider("NgMap",function(){var h={};this.setDefaultOptions=function(a){h=a};var i=function(i,q,r,s,t,u,v){return a=i,b=q[0],c=r,d=s,e=t,f=u,g=v,{defaultOptions:h,addMap:l,deleteMap:m,getMap:k,initMap:j,setStyle:p,getGeoLocation:n,observeAndSet:o}};i.$inject=["$window","$document","$q","NavigatorGeolocation","Attr2MapOptions","GeoCoder","camelCaseFilter"],
this.$get=i})}(),function(){"use strict";var a,b=function(b,c){c=c||b.getCenter();var d=a.defer(),e=new google.maps.StreetViewService;return e.getPanoramaByLocation(c||b.getCenter,100,function(a,b){b===google.maps.StreetViewStatus.OK?d.resolve(a.location.pano):d.resolve(!1)}),d.promise},c=function(a,b){var c=new google.maps.StreetViewPanorama(a.getDiv(),{enableCloseButton:!0});c.setPano(b)},d=function(d){return a=d,{getPanorama:b,setPanorama:c}};d.$inject=["$q"],angular.module("ngMap").service("StreetView",d)}(),"ngMap"});
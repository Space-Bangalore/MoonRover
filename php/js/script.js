$(document).ready(function() {
	LeapEx.init('#canvas', '#debug');
	
	var LeapEx = {
	    ws: null,
	    ctx: null,
	    width: null,
	    height: null,
	    debugEl: null,
	    el: null,
	    leapMinX: 20000,
	    leapMaxX: 220000,
	    leapMinY: 20000,
	    leapMaxY: 220000,
	    leapMinZ: 20000,
	    leapMaxZ: 220000,
	    started: false,
	    init: function(el, debugEl) {
		LeapEx.el = $(el);
		LeapEx.debugEl = $(debugEl);
	// Support both the WebSocket and MozWebSocket objects
		if ((typeof(WebSocket) == 'undefined') &&
		    (typeof(MozWebSocket) != 'undefined')) {
		    WebSocket = MozWebSocket;
		}
		var w = LeapEx.width = $(window).width();
		var h = LeapEx.height = $(window).height();
		$(el).attr('width', w).css('width', w).attr('height', h).css('height', h);
		$(el).css('position', 'absolute').css('left', '0').css('top', '0');
		LeapEx.ctx = $(el)[0].getContext("2d");
		LeapEx.ws = new WebSocket("ws://localhost:6437/");
		LeapEx.ws.onopen = function(event) {
		    LeapEx.debug("WebSocket connection open!");
		};
		LeapEx.ws.onclose = function(event) {
		    LeapEx.ws = null;
		    LeapEx.debug("WebSocket connection closed");
		};
		LeapEx.ws.onerror = function(event) {
		    LeapEx.debug("Received error");
		};
		LeapEx.ws.onmessage = function(event) {
		    if (LeapEx.started) {
			var obj = JSON.parse(event.data);
			var str = JSON.stringify(obj, undefined, 2);
	//LeapEx.debug(str);
			if (typeof(obj.hands) != 'undefined' && obj.hands.length > 0) {
			    var targets = [];
			    for (var i=0; i<obj.hands.length; i++) {
				var hand = obj.hands[i];
				var x = hand.palmPosition[0];
				var y = hand.palmPosition[1];
				var z = hand.palmPosition[2];
				if (z < 10) { z = 10; }
				targets.push({ 'x': x, 'y': y, 'z': z });
			    }
			    x = -50000.0 + 100000.0*x;
			    y = -50000.0 + 100000.0*y;
			    z = 500000.0+20000.0*z;
			    // x = 1000.0*x;
			    // y = 0;
			    // z = 0;
			    rotate(cesiumWidget.scene, x, z, y);
			    LeapEx.debug(x + ' ' + y + ' ' + z);
	//LeapEx.draw(targets);
			}
		    }
		};
		$(document.body).click(function() {
		    LeapEx.toggle();
		});
		LeapEx.started = true;
		return LeapEx.el;
	    },
	    draw: function(targets) {
		LeapEx.ctx.clearRect(0, 0, LeapEx.width, LeapEx.height);
		LeapEx.ctx.beginPath();
		for (var i=0; i<targets.length; i++) {
		    var target = targets[i];
		    LeapEx.ctx.arc(LeapEx.scale(target.x, LeapEx.leapMinX, LeapEx.leapMaxX, -100, LeapEx.width),
				   LeapEx.scale(target.y, LeapEx.leapMinY, LeapEx.leapMaxY, LeapEx.height, -100),
				   target.z, 0, Math.PI*2, true);
		    LeapEx.ctx.closePath();
		    LeapEx.ctx.fill();
		}
	    },
	    scale: function(value, oldMin, oldMax, newMin, newMax) {
		return (((newMax - newMin) * (value - oldMin)) / (oldMax - oldMin)) + newMin;
	    },
	    toggle: function() {
		if (LeapEx.started) {
		    LeapEx.started = false;
		} else {
		    LeapEx.started = true;
		}
	    },
	    debug: function(message) {
		if (LeapEx.debugEl) {
		    LeapEx.debugEl.text(message);
		}
	    }
	};    


    	var cesiumWidget = new Cesium.CesiumWidget('cesiumContainer');
	var layers = cesiumWidget.centralBody.getImageryLayers();
	layers.removeAll();
	
	layers.addImageryProvider(new Cesium.TileMapServiceImageryProvider({
		url : './images/',
		fileExtension: 'jpg',
		maximumLevel: 1		
	}));
	
	var de = 32.77168-30.77168;
	var dn = 39.19080-20.19080;

	layers.addImageryProvider(new Cesium.SingleTileImageryProvider({
	url : './images/astro/11.png',
	extent : new Cesium.Extent(
		Cesium.Math.toRadians(23.47297+de-5),
		Cesium.Math.toRadians(0.67408+dn-5),
		Cesium.Math.toRadians(23.47297+de),
		Cesium.Math.toRadians(0.67408+dn))
	}));
	layers.addImageryProvider(new Cesium.SingleTileImageryProvider({
	url : './images/astro/12.png',
	extent : new Cesium.Extent(
		Cesium.Math.toRadians(-23.42157+de-5),
		Cesium.Math.toRadians(-3.01239+dn-5),
		Cesium.Math.toRadians(-23.42157+de),
		Cesium.Math.toRadians(-3.01239+dn))
	}));
	layers.addImageryProvider(new Cesium.SingleTileImageryProvider({
	url : './images/astro/14.png',
	extent : new Cesium.Extent(
		Cesium.Math.toRadians(-17.47136+de-5),
		Cesium.Math.toRadians(-3.64530+dn-5),
		Cesium.Math.toRadians(-17.47136+de),
		Cesium.Math.toRadians(-3.64530+dn))
	}));
	layers.addImageryProvider(new Cesium.SingleTileImageryProvider({
	url : './images/astro/15.png',
	extent : new Cesium.Extent(
		Cesium.Math.toRadians(3.63386+de-5),
		Cesium.Math.toRadians(26.13222+dn-5),
		Cesium.Math.toRadians(3.63386+de),
		Cesium.Math.toRadians(26.13222+dn))
	}));
	layers.addImageryProvider(new Cesium.SingleTileImageryProvider({
	url : './images/astro/16.png',
	extent : new Cesium.Extent(
		Cesium.Math.toRadians(15.50019+de-5),
		Cesium.Math.toRadians(-8.97301+dn-5),
		Cesium.Math.toRadians(15.50019+de),
		Cesium.Math.toRadians(-8.97301+dn))
	}));
	layers.addImageryProvider(new Cesium.SingleTileImageryProvider({
	url : './images/astro/17.png',
	extent : new Cesium.Extent(
		Cesium.Math.toRadians(30.77168+de-5),
		Cesium.Math.toRadians(20.19080+dn-5),
		Cesium.Math.toRadians(30.77168+de),
		Cesium.Math.toRadians(20.19080+dn))
	}));
    
    function rotate(scene, x, y, z) {
	var ellipsoid = Cesium.Ellipsoid.WGS84;
	var center = ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-75.59777, 40.03883));
	var transform = Cesium.Transforms.eastNorthUpToFixedFrame(center);
// View in east-north-up frame
	var camera = scene.getCamera();
	camera.transform = transform;
	camera.controller.constrainedAxis = Cesium.Cartesian3.UNIT_Z;
	var controller = scene.getScreenSpaceCameraController();
	controller.setEllipsoid(Cesium.Ellipsoid.UNIT_SPHERE);
	controller.enableTilt = false;
// Zoom in
	camera.controller.lookAt(
	    new Cesium.Cartesian3(x, y, z),
	    Cesium.Cartesian3.ZERO,
	    Cesium.Cartesian3.UNIT_Z);
    }


});


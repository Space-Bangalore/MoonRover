$(document).ready(function() {
	LeapEx.init('#canvas', '#debug');
    


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


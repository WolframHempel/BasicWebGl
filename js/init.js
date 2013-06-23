window.onload = function()
{
	var oCanvas = new gl.Canvas( document.getElementById( "canvasContainer" ) );

	var sVertexShaderCode = "attribute vec3 aVertexPosition;\
		attribute vec4 aVertexColor;\
		uniform mat4 uMVMatrix;\
		uniform mat4 uPMatrix;\
		varying vec4 vColor;\
		void main(void) {\
			gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\
			vColor = aVertexColor;\
		}";
		
	var oVertexShader = new gl.Shader( sVertexShaderCode, "VERTEX_SHADER", oCanvas.getContext() );
	oCanvas.addShader( oVertexShader );

	var sFragmentShaderCode = "\
		precision mediump float;\
  		varying vec4 vColor;\
		void main(void) {\
			gl_FragColor = vColor;\
		}";

	var oFragmentShader = new gl.Shader( sFragmentShaderCode, "FRAGMENT_SHADER", oCanvas.getContext() );
	oCanvas.addShader( oFragmentShader );

	oCanvas.initShaders();

	var pXCoords = [ 0, 200, 0, 150,400 ];
	var pYCoords = [ 0, 0, 200, 200, 300 ];

	var oBox = new gl.Polygon( oCanvas, pXCoords, pYCoords );

	oBox.setColors([
		1.0, 0.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 0.0, 1.0, 1.0,
		1.0, 0.0, 0.0, 0.5,
		1.0, 0.0, 1.0, 0.5
	]);

	oBox.setDrawMode( "LINE_STRIP" );

	oCanvas.addPolygon( oBox );

	/**
	* Create a circle
	*/
	var pCircleX = [];
	var pCircleY = [];
	var pColors = [];
	var nCenterX = 100;
	var nCenterY = 100;
	var nRadius = 50;
	var nResolution = 100;

	for( var i = 0; i < 2 * Math.PI; i += ( 2 * Math.PI ) / nResolution )
	{
		pCircleX.push( nCenterX + Math.sin( i ) * nRadius );
		pCircleY.push( nCenterY + Math.cos( i ) * nRadius );
		pColors = pColors.concat( [ 1 - i / ( 2 * Math.PI ), 1.0, i / ( 2 * Math.PI ), 1.0 ] );
	}

	var oCircle = new gl.Polygon( oCanvas, pCircleX, pCircleY );

	oCircle.setColors( pColors );

	oCircle.setDrawMode( "TRIANGLE_FAN" );

	oCanvas.addPolygon( oCircle );

	oCanvas.draw();
};
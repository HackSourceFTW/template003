
// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/
//var canvas = document.getElementById("myCanvas");

//var context = canvas.getContext("2d");
var  canvas, context, toggle;
var y= 0;
var x= 0;
var mid = 128;
var dirX = 1;
var dirY = 1;
var destX  ;
var destY ;
var i;
var state ;
var inbounds='true';
var status = -1; // -1: stopped  , 0 In play	
var imageObj = new Image();	
var background_obj= new Image();
var jump = 'rest';
var backg_x = 0;
var backg_y = 0;
background_obj.src = "level_bounds.png";
imageObj.src = "fnord.png";

var str;
var name;
//init();




//function init() {

    canvas = document.createElement( 'canvas' );
    canvas.width = 568;
    canvas.height = 400;
    context = canvas.getContext( '2d' );
    context.font = "40pt Calibri";
    context.fillStyle = "black";
	// align text horizontally center
	context.textAlign = "center";
	// align text vertically center
	context.textBaseline = "middle";	
	context.font = "12pt Calibri"; 
	canvas.width = 6186;
	context.drawImage(background_obj, backg_x, backg_y);
 	imageData = context.getImageData(0,0,6186,300);
 	 	    
    //var x = document;
    canvas.width = 568;

   $( "#container" ).append( canvas );
//}
animate();
function animate() {
    requestAnimFrame( animate );
   
    draw();
}

function draw() {

    context.fillText( state + ":" , canvas.width / 2 , canvas.height / 2 );

	$(document).keyup(function(e)
	{
		if (e.keyCode == 37)
		{
			state= "stop";
			dirX=1;
		}
		if (e.keyCode == 39)
		{
			state= "stop";
			dirX=1;
		}
		if (e.keyCode == 38)
		{
			jump = 'descend';
		}
});

	$(document).keydown(function(e) {
	//alert (e.keyCode);
	//if space start/stop gameloop
	//var time = new Date().getTime() * 0.002;
	
	
		if(e.keyCode == 32)
		{
			status = 0 - status;
		}
		if (jump != 'descend')
		{
			if (e.keyCode == 38 )
			{
				jump = 'ascend';
			}
		}
		if (e.keyCode == 40){
		//	down
		}
		if (e.keyCode == 37){
			state = 'left';
		}
		if (e.keyCode == 39){
			state = 'right';
		}
	});
		///////////////////////////////////////////////////////////////////////////////
	   if (state == 'left')
	   {
	   		//x = x-(1 * dirX);
	   		backg_x = backg_x + 1 ;
	   }
		if (state == 'right')
		{
  		//x		= x + (1 * dirX);
	  		backg_x = backg_x - 1 ;
		}
		if (jump == 'ascend')
		{
			if( red==0 && blue==0 && green==0)
			{
				destY = destY + 1;
			}
			if ((y <= -40) && (float!='true'))
			{
				jump = 'descend';
			}
		}
		if (jump == 'descend')
		{
			y=y+1;
			if (y >= 0)
			{
				jump = 'rest';
			}
		}
		if (jump == 'rest')
		{
			y = 0;
			dirY = -1;
		}
		if (inbounds=='true')
		{
			destX = (canvas.width / 2 ) + x;
			destY = (canvas.height / 2 ) + y + 60 ;// 60 pixels offset from centre
		}//end if inbounds
		if (destX > canvas.width || destX < 0)
		{
   			dirX =-dirX;
    	}
		if (destY > canvas.width || destY < 0)
		{
  			dirY =-dirY;
		}
		//canvas.width = 6186;
		context.clearRect(0,0 , canvas.width, canvas.height);
		context.drawImage(background_obj, backg_x, 50);
		red		= imageData.data[	( (6186 * (destY -10)) + parseInt(0-backg_x + 278) )*4 ]; 
		green	= imageData.data[ ( ( (6186 * (destY -10)) + parseInt(0-backg_x + 278) )*4 )+ 1];
		blue	= imageData.data[ ( ( (6186 * (destY -10)) + parseInt(0-backg_x + 278) )*4 )+ 2];
		if  ((red > mid && green < mid && blue >mid) || (red < mid && green > mid && blue > mid)) {
			if (jump !="ascend")
			{
				jump = 'descend';
			}
			inbounds	= 'true';
			float		= 'false';
		}
		if ( red<mid && green> mid && blue>mid ){
			jump		= 'ascend';
			float		= 'true';
			inbounds	= 'true';
		}
		if( red==0 && blue==0 && green==0){
			float		= 'false';
			inbounds	= 'false';
		}
		context.drawImage(imageObj, destX, destY);
		//red = imageData.data;
		//name = red[100];
		//canvas.width = 568;
		;
		str = "width=" + imageData.width + ", height=" +	imageData.height + ", red :" + red  + ", green :" + green + ", blue :" + blue  + "destX :" + parseInt(0-backg_x)  + "destY :" +destY + "i:" + inbounds ;
		context.fillText(str, 20, 14);
	
	}

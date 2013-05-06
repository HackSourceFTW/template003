
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/
//var canvas = document.getElementById("myCanvas");

//var context = canvas.getContext("2d");
var  canvas, context, toggle;
var y= 0;
var x= 0;
var dirX =1;
var dirY =1;
var destX  ;
var destY ;
var i;
var state ;
var status = -1; // -1: stopped  , 0 In play	
var imageObj = new Image();	
var background_obj= new Image();
var jump = 'rest';
var backg_x = 0;
var backg_y = 0;
background_obj.src = "level_bounds.png";
imageObj.src = "fnord.png";
init();
animate();

function init() {

    canvas = document.createElement( 'canvas' );
    canvas.width = 568;
    canvas.height = 300;
    context = canvas.getContext( '2d' );
    context.font = "40pt Calibri";
    context.fillStyle = "black";
	   // align text horizontally center
		context.textAlign = "center";
		// align text vertically center
	context.textBaseline = "middle";	
	   
 
    //var x = document;

   $( "#container" ).append( canvas );
}

function animate() {
    requestAnimFrame( animate );
    draw();
}

function draw() {

    context.fillText( state + ":" , canvas.width / 2 , canvas.height / 2 );

	$(document).keyup(function(e) {
		if (e.keyCode == 37){
	
			state= "stop";
		dirX=1;
		}
		if (e.keyCode == 39){
			state= "stop";
	dirX=1;
		}
	

		if (e.keyCode == 38){
			jump = 'descend';
	
		}
});
			
	$(document).keydown(function(e) {
	//alert (e.keyCode);
	//if space start/stop gameloop
	//var time = new Date().getTime() * 0.002;
	
	
		if(e.keyCode == 32){
		status = 0 - status;
		
		}
		
		if (jump != 'descend'){
		
			if (e.keyCode == 38 ){
		
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
		
		
		
	   if (state == 'left') {
	   
	   		x = x-(1 * dirX);
	   		backg_x = backg_x + 1 ;
	   
	   }
		if (state == 'right') {
	   
	  		x		= x + (1 * dirX);
	  		backg_x = backg_x - 1 ;
	   }
	   
	   
	   
		if (jump == 'ascend'){
	
			y = y-1;
			if (y <= -40){
				jump = 'descend';
			}
		}
		if (jump == 'descend'){
			y=y+1;
			if (y >= 0){
				jump = 'rest';
			}
		}
	
	
		if (jump == 'rest')
		{
			y = 0;
			dirY = -1;
		}
		
			
		 destX = (canvas.width / 2 ) + x;
		 destY = (canvas.height / 2 ) + y + 60 ;// 60 pixels offset from centre
		
		 if (destX > canvas.width || destX < 0)
		 {
   
   			dirX=-dirX;
   
   		}
   
      if (destY > canvas.width || destY < 0)
      {
   
  			dirY=-dirY;
   
	}
	

	
	context.clearRect(0,0 , canvas.width, canvas.height);
	context.drawImage(background_obj, backg_x, backg_y);
	context.drawImage(imageObj, destX, destY);
	
}



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


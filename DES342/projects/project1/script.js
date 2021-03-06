Diffusion = new function() {
    
    var PARTICLE_NUM = 100;        
    var p = [];
    
    this.init = function() {       
        
        canvas = document.getElementById('world');
        ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.strokeStyle= '#ffffff';
        ctx.fillStyle = '#ffffff';
               
        document.addEventListener('contextmenu', contextMenu);
        document.addEventListener('mousedown', mouseDown);
   
        createParticles(PARTICLE_NUM, canvas.width/2, canvas.height/2, 200);

        setInterval( loop, 1000 / 50 );
    }; 
    
    function contextMenu(e) {
        e.preventDefault();
    }
    
    function mouseDown(e) {
        switch (e.button) {
            case 0:
                createParticles(10, e.clientX, e.clientY, 20);
                break;
                
            case 2:
                removeParticles(e.clientX, e.clientY, 50);
                break;
        }
    }
    
    function createParticles(num, x, y, rand) {
        for (var i=0;i<num;i++) {
            var pt = new Particle();
            pt.x = x-rand + Math.random()*(rand*2);
            pt.y = y-rand + Math.random()*(rand*2);
            p.push(pt);
        }
    }

    function removeParticles(x, y, range) {
        var dx,dy,distance;
        for (var i=0;i<p.length;i++) {
            dx = p[i].x - x;
            dy = p[i].y - y;
            distance = Math.sqrt(dx*dx + dy*dy);
            if ( distance < range ) {
                p.splice(i, 1);
            }
        }
    }
    
    function calcParticleDXY() {
        ctx.beginPath();
        for (var i=0; i<p.length; i++) { 
            for (var j=0; j<p.length; j++) {
                if ( i != j ) { 
                    dx = p[i].x - p[j].x;
                    dy = p[i].y - p[j].y;
                    distance = Math.sqrt(dx*dx + dy*dy);
                    if ( distance < p[j].force ) {
                        ctx.moveTo(p[i].x,p[i].y);
                        ctx.lineTo(p[j].x,p[j].y);
                        
                        p[i].dx += (dx/distance) * p[j].repulsion * (p[j].force - distance)/p[j].force;
                        p[i].dy += (dy/distance) * p[j].repulsion * (p[j].force - distance)/p[j].force;
                    }
                }
            }
    
            if( p[i].x < 0 || p[i].x > canvas.width ) p[i].dx *= -0.8;
            if( p[i].y < 0 || p[i].y > canvas.height ) p[i].dy *= -0.8;
            p[i].dx -= p[i].dx/100;
            p[i].dy -= p[i].dy/100;
        }
        ctx.stroke();
    }
        
    function particleMove() {
        
        for (i=0; i<p.length; i++) {
            p[i].x += p[i].dx;
            p[i].y += p[i].dy;
        }   
    }
    
    function loop() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
		
        particleMove();
        calcParticleDXY();
        
        for (i=0; i<p.length; i++) {              
            ctx.beginPath();
            ctx.arc(p[i].x, p[i].y, p[i].r, 0, Math.PI*2, true);
            ctx.fill();
        }        
    }   
};

function Particle() {
  this.r = 2;
  this.x = 0; 
  this.y = 0;
  this.dx = 0.2 - Math.random()*0.4;
  this.dy = 0.2 - Math.random()*0.4;
  this.force = this.r * 30;
  this.repulsion = 0.7;
}

Diffusion.init();



var body = document.body;
var dragElement = document.getElementById("dragElement");
var dragElementStyle = dragElement.style;
var dragElementHeight = dragElement.offsetHeight;
var dragElementWidth = dragElement.offsetWidth;

onload = adding (dragElement), addingtwo (dragElementtwo);

function adding() {
    dragElement.addEventListener("mousedown", hold, false);
    body.addEventListener("mouseup", release, false);
}

function hold() {
    dragElement.addEventListener("mousemove", move, true);
    body.addEventListener("mousemove", move, true);
}

function release() {
    dragElement.removeEventListener("mousemove", move, true);
    body.removeEventListener("mousemove", move, true);
}

function move(event) {
    var epY = event.clientY;
    var epX = event.clientX;

    dragElementStyle.top = epY + "px";
    dragElementStyle.left = epX + "px";
}




var body = document.body;
var dragElementtwo = document.getElementById("dragElementtwo");
var dragElementtwoStyle = dragElementtwo.style;
var dragElementtwoHeight = dragElementtwo.offsetHeight;
var dragElementtwoWidth = dragElementtwo.offsetWidth;

function adding2() {
    dragElementtwo.addEventListener("mousedown", hold2, false);
    body.addEventListener("mouseup", release2, false);
}

function hold2() {
    dragElementtwo.addEventListener("mousemove", move2, true);
    body.addEventListener("mousemove", move2, true);
}

function release2() {
    dragElementtwo.removeEventListener("mousemove", move2, true);
    body.removeEventListener("mousemove", move2, true);
}

function move2(event) {
    var epY = event.clientY;
    var epX = event.clientX;

    dragElementtwoStyle.top = epY + "px";
    dragElementtwoStyle.left = epX + "px";
}







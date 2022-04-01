const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const pi  = Math.PI;

canvas.height = window.innerHeight;
canvas. width = window.innerWidth;

const mouse = {
    x: canvas.height / 2,
    y: canvas.width / 2
};


addEventListener('mousemove', (e)=>{
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

addEventListener('resize', ()=>{
    canvas.height = innerHeight;
    canvas.width = innerWidth;

    init();
})


// Object
class Particle{
     constructor(x,y,radius,color,velocity){
         this.x = x;
         this.y = y;
         this.radius = radius;
         this.color = color;
         this.velocity = velocity;
         this.ttl = 300; // time to live of the particle, when the time ends
                    // the particle is going to die
     }
     draw(){
         c.beginPath();
         c.arc(this.x,this.y,this.radius, 0 , pi * 2, false);
         c.fillStyle = this.color;
         c.fill();
     }
     update(){
         this.draw();
         this.x += this.velocity.x;
         this.y += this.velocity.y;
         this.ttl--;
     }
}

//implementation 

let particles;
const ringParticles = 100;
const radius = 100;
function init(){
    particles = [];
}

// Ring animation time function

let hue = 0; // particle color variable
let hueRadians = 0;
function generateRing(){
    setTimeout(generateRing, 200);
    hue = Math.sin(hueRadians);
    for(let i = 0; i < ringParticles; i++){
        const radian = 2*pi / ringParticles;
        const x = mouse.x;
        const y = mouse.y;

        particles.push(new Particle(x,y,5,`hsl(${Math.abs(hue *360)},50%,50%)`,{
            x: Math.cos(radian * i) * 4,
            y: Math.sin(radian * i) *4
        }));
    }
    hueRadians += 0.01;
    console.log(particles)
}


// Animation Loop

function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0,0,0,0.1)';
    c.fillRect(0,0,canvas.width,canvas.height);
    particles.forEach((particle,i) =>{
        if(particle.ttl < 0){
            particles.splice(i,1);
        }else{
            particle.update();            
        }
    })
}

init();
animate();
generateRing();
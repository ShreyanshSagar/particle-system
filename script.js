const canva = document.getElementById('canvas1');
const ctx = canva.getContext('2d')
canva.width  = window.innerWidth;
canva.height = window.innerHeight;
const ParticleArray= [];
let hue = 0;

window.addEventListener('resize', function(){
         canva.width  = window.innerWidth;
         canva.height = window.innerHeight;
})
const mouse = {
         x : null,
         y : null
}
canva.addEventListener('click', function(){
    mouse.x = event.x;
    mouse.y = event.y;
    //for(i = 0; i < 10; i++){
    //ParticleArray.push(new Particle());
    //}
})

canva.addEventListener('mousemove', function(){
    mouse.x = event.x;
    mouse.y = event.y;
    for(i = 0; i < 5; i++){
    ParticleArray.push(new Particle());
    }
})

class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        //this.x = Math.random() * canva.width;
        //this.y = Math.random() * canva.height;
        this.size = Math.random() * 12 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1
    }
    draw(){
         ctx.fillStyle = this.color;
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 7);
         ctx.fill()
    }
}
function Particlehandler(){
    for (var i = 0; i < ParticleArray.length; i++) {
        ParticleArray[i].update();
        ParticleArray[i].draw();
        for (var j = i; j < ParticleArray.length; j++) {
            const xa = ParticleArray[i].x - ParticleArray[j].x;
            const ya = ParticleArray[i].y - ParticleArray[j].y;
            const d = Math.sqrt(Math.sqrt(xa) + Math.sqrt(ya));
            if(d<50){
                ctx.beginPath();
                ctx.strokeStyle = ParticleArray[i].color;
                ctx.lineWidth = ParticleArray[i].size/3;
                ctx.moveTo(ParticleArray[i].x, ParticleArray[i].y);
                ctx.lineTo(ParticleArray[j].x, ParticleArray[j].y);
                ctx.stroke();
            }
        }
        if (ParticleArray[i].size <= 0.3) {
            ParticleArray.splice(i, 1);
            console.log(ParticleArray.length);
            i--;
        }
    }
}
function Animate(){
         ctx.clearRect(0, 0, canva.width, canva.height);
         //ctx.fillStyle = 'rgba(0,0,0,0.02)';
         //ctx.fillRect(0, 0, canva.width, canva.height);
         Particlehandler()
         hue+= 5;
         requestAnimationFrame(Animate)
}
Animate()

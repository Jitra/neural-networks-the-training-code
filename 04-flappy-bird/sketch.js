let bird;
const pipes = []
function setup(){
    createCanvas(400,600);
    bird = new Bird();
    pipes.push(new Pipe());
}

function draw(){
    background(0);
    bird.show();
    bird.update();
    
    if(frameCount % 100    === 0){
        pipes.push(new Pipe());
    }

    for(let i= pipes.length -1; i >= 0; i--){
        const p = pipes[i];
        if(p.offscreen()){
            pipes.splice(i, 1);
            return;
        }

        if(p.hits(bird)){
            console.log('HIT'); 
        }
        p.show();
        p.update();
    }
}

function keyPressed(){
    if(key == ' '){
        bird.up(); 
    }
}
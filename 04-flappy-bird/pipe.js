function Pipe(){
    const spacing = 150;
    const centery = random((spacing+10)/2, height - (spacing+10)/20);

    this.top = centery - spacing / 2; 
    this.bottom = height - (centery + spacing / 2);

    this.w = 20;
    this.x = width;
    this.speed = 2.5;
    this.highlight = false;

    this.show = function() {
        fill(255);
        if(this.highlight){
            fill(255,0,0);
        }
        rect(this.x, 0, this.w, this.top);
        rect(this.x, height-this.bottom, this.w, this.bottom);
    }
    this.offscreen = function() {
        return this.x  < -this.w;
    }

    this.hits = function(bird){
        if(bird.y < this.top || bird.y > height - this.bottom){
            if(bird.x > this.x && bird.x < this.x + this.w){
                this.highlight = true;
                return this.highlight;
            }
        }
        this.highlight = false;
        return this.highlight;
        
    }

    this.update = function() { 
        this.x -= this.speed;
    }
}
function Bird(){
    this.y = height/2;
    this.x = 25;
    this.gravity = 0.6;
    this.lift = -10;
    this.velocity = 0;

    this.show = function() {
        fill(255);
        ellipse(this.x, this.y, 32,32);
    }

    this.up = function () {
        if(this.velocity > 0){
            this.velocity = 0;
        }
        this.velocity += this.lift;
    }

    this.update = function(){
        this.velocity += this.gravity;
        this.y += this.velocity;

        if(this.y > height){
            this.y = height
            this.v
            this.velocity = 0;  
        }
        if(this.y < 0){
            this.y = 0
            this.velocity = 0;
        }
    }
}
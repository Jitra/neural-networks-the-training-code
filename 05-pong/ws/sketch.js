let game;
let socket;
document.addEventListener('DOMContentLoaded', () => {
    const players = document.querySelector('#players');
    const name = document.querySelector('input[name=player_name]');
    const joinBtn = document.querySelector('#join')

    socket = io("https://wkixx3-3000.preview.csb.app/");

    socket.on('connect', async () => {
        console.log('connection established');
    });
    socket.on('reconnect', () => {
        console.log('reconnecting...');
        socket.emit('pong.join', name.value);
    });
    
    socket.on('pong.cast', (data) => {
        game = data;
    });
    socket.on('pong.members', (members) => {
        if(members.length === 0){
            game = null;
        }
        players.innerHTML = members.map(m => {
            const style = m.id === socket.id ? ' style="font-weight: bold;" ': '';
            return `<p ${style}>${m.name}</p>`;
        }).join('\n');
    })

    joinBtn.addEventListener('click', () => {
        if(!name.value){
            confirm('Please enter your name')
        } else {
            socket.emit('pong.join', name.value);
            name.setAttribute('readonly', 'true');
            joinBtn.setAttribute('disabled',"true");
        }
    })
    
})

function setup() {
    createCanvas(600, 400);
}

function draw() {
    background(0);
    if(game){
        // left paddle
        fill(...(game.left.player.id === socket.id? [128,0,0] : game.left.fill));
        rectMode(game.left.rectMode);
        rect(...game.left.rect);
        // right paddle
        fill(...(game.right.player.id === socket.id? [128,0,0] : game.right.fill));
        rectMode(game.right.rectMode);
        rect(...game.right.rect);
        // puck
        fill(...game.puck.fill);
        ellipse(...game.puck.ellipse);
        // score
        fill(255);
        textSize(32);
        text(...game.leftScore.text);
        text(...game.rightScore.text);
    }
}

function keyReleased(){
    if(game && (game.left.player.id === socket.id || game.right.player.id === socket.id)){
        socket.emit('pong.move', null);
    }
}

function keyPressed() {
    if(game && ['ArrowUp', 'ArrowDown'].includes(key) && (game.left.player.id === socket.id || game.right.player.id === socket.id)){
        socket.emit('pong.move', key);
    }
}
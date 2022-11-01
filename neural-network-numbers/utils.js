function randomNumb(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

async function fetchData(){
    const GRID_SIZE = 28;
    const data = (await (await fetch('http://127.0.0.1:5500/mnist_train_100.csv')).text());
    const allTextLines = data.split(/\r\n|\n/);
    allTextLines.shift();
    allTextLines.pop();
    const entries = allTextLines.map(line => {
        const signs = line.split(',')
        const input = [...new Array(GRID_SIZE)].map( i => []);
        const target = Number(signs.shift())
        signs.forEach((v, i) => input[Math.floor(i/GRID_SIZE)].push(Number(v)))
        return { target, input }
    })
    return entries;
}

function scaleNumberBetween(number, possibleMax, expectedMin, expectedMax){
    return number/ possibleMax * expectedMax + expectedMin;
}

function targetArray(number){
    return [...new Array(10)].map((_, i) => i ==number? 0.99: 0.01);ł
}

function paintPixelGroup(pixels, x,y, greyScale){
    for (let sy=0; sy < 10; sy++){
        for(let sx=0; sx < 10; sx++){
            const index = (x + sx + (y + sy) * width) * 4;
            pixels[index] =  greyScale;
            pixels[index + 1] = greyScale;
            pixels[index + 2] = greyScale;
            pixels[index + 3] = 255;
        }
    }
}
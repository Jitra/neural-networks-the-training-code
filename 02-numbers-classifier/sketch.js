const csvFor100 = 'http://127.0.0.1:5500/mnist_train_100.csv';
let selectedInputData;
let networkAnswer;

document.addEventListener('DOMContentLoaded', () => {
    networkAnswer = document.querySelector('#network_answer');
})



async function setup(){
    createCanvas(280, 280);
    pixelDensity(1);
    frameRate(10)

    const learingData = await fetchData(csvFor100)
    const network = new NeuralNetwork(784, 100, 10, 0.3);
    
    for(let i = 0; i < 500; i++){
        const data = learingData[randomNumb(0, learingData.length)];
        const input = data.input.flat().map(num => scaleNumberBetween(num, 255, 0.01, 0.99));
        const target = targetArray(data.target);
        network.train(input, target);
    }

    document.addEventListener('click', () => {
        console.log(networkAnswer);
        selectedInputData = learingData[randomNumb(0,10)];
        const answers = network.query(selectedInputData.input.flat().map(num=>scaleNumberBetween(num, 255, 0.01, 0.99)));
   
        const max = Math.max(...answers);
        console.log(max, answers);
        const bestMatch = answers.indexOf(max);
        networkAnswer.innerText = `Best guess it's: ${bestMatch}`
    });
}

function draw() {
    background(51);
    loadPixels();
    if(selectedInputData){
        for(let y=0; y < selectedInputData.input.length; y++){
            for(let x=0; x < selectedInputData.input[y].length; x++){
                
                if(selectedInputData.input[y][x] > 0){
                    paintPixelGroup(pixels, x*10, y*10, selectedInputData.input[y][x]);
                }
            }                
        }
        updatePixels()
    }
    
    
}
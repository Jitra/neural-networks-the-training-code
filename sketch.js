let training_data = [
    {
        inputs: [0,1],
        targets: [1],
    },
    {
        inputs: [1,0],
        targets: [1],
    },
    {
        inputs: [0,0],
        targets: [0],
    },
    {
        inputs: [1,1],
        targets: [0],
    },
]

function setup(){
    const nn = new NeuralNetwork(2,2,1);
    
    for(let i = 0; i < 50000; i++){
      let data = training_data[Math.floor(Math.random() * training_data.length)]
        nn.train(data.inputs, data.targets);
    }
     nn.feedforward([1,0]).print();
     nn.feedforward([0,1]).print();
     nn.feedforward([0,0]).print();
     nn.feedforward([1,1]).print();

}
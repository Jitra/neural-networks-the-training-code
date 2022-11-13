function sigmoid(x){
    return 1/(1 + Math.exp(-x));
}

class NeuralNetwork {
    constructor(inputNodes, hiddenNodes, outputNodes, learningRate){
        this.inputNodes = inputNodes;
        this.hiddenNodes = hiddenNodes;
        this.outputNodes = outputNodes;
        this.learningRate = learningRate;

        const defaultDeviationH = 1/Math.sqrt(this.inputNodes);
        
        const defaultDeviationO = 1/Math.sqrt(this.outputNodes);
  
        this.weightsHidden= new Matrix(this.hiddenNodes, this.inputNodes).randomize();
        this.biasHidden = new Matrix(this.hiddenNodes, 1).randomize();
        this.weightsOutput = new Matrix(this.outputNodes, this.hiddenNodes).randomize();
        this.biasOutput = new Matrix(this.outputNodes, 1).randomize();
        
    }

    train(input_arr, target_arr){
        const inputs = Matrix.fromArray(input_arr);
        const targets = Matrix.fromArray(target_arr);

        const outputHidden = Matrix.multiply(this.weightsHidden, inputs)
            .add(this.biasHidden)
            .map(sigmoid);
      
        const outputFinal = Matrix.multiply(this.weightsOutput, outputHidden)
            .add(this.biasOutput)
            .map(sigmoid);

        const errorFinal = Matrix.substract(targets, outputFinal);
        
        const gradients = Matrix.map(outputFinal, y => y * (1 - y))
            .multiply(errorFinal)
            .multiply(this.learningRate)
            
        const deltaWeithtsOutput = Matrix.multiply(
            gradients,
            Matrix.transpose(outputHidden)
        );

        this.weightsOutput.add(deltaWeithtsOutput);
        this.biasOutput.add(gradients);
        

        const errorHidden = Matrix.multiply(Matrix.transpose(this.weightsOutput), errorFinal);
        const gradientsHidden = Matrix.map(outputHidden, y=> y * (1 - y))
            .multiply(errorHidden)
            .multiply(this.learningRate);

        const deltaWeightsHidden = Matrix.multiply(
            gradientsHidden,
            Matrix.transpose(inputs)
        );
        this.weightsHidden.add(deltaWeightsHidden);
        this.biasHidden.add(gradientsHidden);
    }

    query(input_arr){
        const inputs = Matrix.fromArray(input_arr);
        const outputHidden = Matrix.multiply(this.weightsHidden, inputs)
            .add(this.biasHidden)
            .map(sigmoid);
    
        const outputFinal = Matrix.multiply(this.weightsOutput, outputHidden)
            .add(this.biasOutput)
            .map(sigmoid);
        return outputFinal.toArray();
    }
}
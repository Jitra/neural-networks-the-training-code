function sigmoid(x) {
    return 1/ (1+ Math.exp(-x))
}

function dsigmoid(y){
    return y * (1 - y)
}

class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes){
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
        this.weights_ih.randomize();
        this.weights_ho.randomize();

        this.bias_h = new Matrix(this.hidden_nodes, 1);
        this.bias_o = new Matrix(this.output_nodes, 1);
        this.bias_h.randomize();
        this.bias_o.randomize();
        this.lr = 0.1;
    }

    feedforward(input_arr){
        const input = Matrix.fromArray(input_arr);
    
        const hidden = Matrix.multiply(this.weights_ih, input);
        hidden.add(this.bias_h);
        hidden.map(sigmoid);

  
        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid);

        return output;
    }

    train(input_array, target_array){
        const inputs = Matrix.fromArray(input_array);
        const targets = Matrix.fromArray(target_array);
    
        const hidden = Matrix.multiply(this.weights_ih, inputs);
        hidden.add(this.bias_h);
        hidden.map(sigmoid);

  
        const outputs = Matrix.multiply(this.weights_ho, hidden);
        outputs.add(this.bias_o);
        outputs.map(sigmoid);


        const output_errors = Matrix.substract(targets, outputs);
        
        // Calculate gradient
        // sigmoid(x) * (1 - simoid(x))
        const gradients = Matrix.map(outputs, dsigmoid);

        gradients.multiply(output_errors);

        gradients.multiply(this.lr)


        // Calculate deltas
        const hidden_T = Matrix.transpose(hidden);
        const weights_ho_deltas = Matrix.multiply(gradients, hidden_T);

        this.weights_ho.add(weights_ho_deltas);
        this.bias_o.add(gradients);


        // calculate the hidden layer errors
        const who_t = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(who_t, output_errors);


        
        let hidden_gradient = Matrix.map(hidden, dsigmoid);
        hidden_gradient.multiply(hidden_errors);

        hidden_gradient.multiply(this.lr); 
        
        // calculate input->hidden deltas
        const inputs_T = Matrix.transpose(inputs);
        const weights_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);
        this.weights_ih.add(weights_ih_deltas);
        this.bias_h.add(hidden_gradient);
    }
}
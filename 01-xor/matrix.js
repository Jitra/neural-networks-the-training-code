class Matrix{
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        this.data = [...Array(this.rows)].map(() => [...Array(this.cols)].map(() => 0))
    }

    randomize(){
        for(let i = 0; i < this.rows; i++){
            for (let j =0; j <this.cols; j++){
                this.data[i][j] = Math.random() * 2 -1
            }
        }
    }

    static transpose(val){
        let result = new Matrix(val.cols, val.rows);
        for(let i = 0; i < val.rows; i++){
            for (let j = 0; j < val.cols; j++){
                result.data[j][i] = val.data[i][j]
            }
        }
        return result;
    }

    map(func){
        this.data = this.data.map(colTable => colTable.map(func));
    }

    static map(m, func){
        const result = new Matrix(m.rows, m.cols);
        result.data = JSON.parse(JSON.stringify(m.data));
        result.map(func);
        return result;
    }

    add(number){
        if(number instanceof Matrix){
            for(let i = 0; i < this.rows; i++){
                for (let j = 0; j < this.cols; j++){
                    this.data[i][j] += number.data[i][j];
                }
            }
        }else{
            this.map((val =>val + number));
        }
        
    }

    static substract(a, b){
        const result = new Matrix(a.rows, a.cols);

        for(let i = 0; i < a.rows; i++){
            for (let j = 0; j < a.cols; j++){
                result.data[i][j] = a.data[i][j] - b.data[i][j];
            }
        }
        return result;
    }

    // matrix product
    static multiply(a,b){
        if(a.cols !== b.rows){
            console.error('Columns of A must match rows of B');
            return undefined;
        }

        let result = new Matrix(a.rows, b.cols);
        for(let i = 0; i < result.rows; i++){
            for(let j = 0; j < result.cols; j++){
                let sum = 0;
                for(let k = 0; k < a.cols; k++){
                    sum += a.data[i][k] * b.data[k][j];
                }
                result.data[i][j] = sum;
            }
        }
        return result;
    }

    multiply(n){
        // dot product
        if(n instanceof Matrix){
            for(let i = 0; i < this.rows; i++){
                for (let j = 0; j < this.cols; j++){
                    this.data[i][j] *= n.data[i][j];
                }
            }
        } else {
            // scalar product
            this.map((val => val * n));
        }
        
    }
    toArray(){
        return this.data.flat();
    }

    static fromArray(input_arr){
        const m = new Matrix(input_arr.length, 1);
        input_arr.forEach((element, i) => {
            m.data[i] = [element]
        });
        return m;
    }


    print(){
        console.table(this.data);
    }
}
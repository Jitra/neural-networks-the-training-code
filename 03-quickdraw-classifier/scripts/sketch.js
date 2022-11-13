let networkAnswerElem,
  loaderElem,
  loaderTextElem,
  teachElem,
  testAllElem,
  testSingleElem,
  testDrawingElem,
  clearElem,
  learningData,
  testingData,
  drawableItems;

const TARGET_NAME = [
  'airplane',
  'apple',
  'axe',
  'banana',
  'bee',
  'door',
  'face',
  'fish',
  'giraffe',
  'leg'
];
const BG_COLOR = 51;

document.addEventListener('DOMContentLoaded', () => {
  networkAnswerElem = document.querySelector('#network_answer');
  loaderElem = document.querySelector('#loader');
  loaderTextElem = document.querySelector('#loader-text');
  teachElem = document.querySelector('#teach');
  testAllElem = document.querySelector('#test_all');
  testSingleElem = document.querySelector('#test_single');
  testDrawingElem = document.querySelector('#test_drawing');
  clearElem = document.querySelector('#clear');
  drawableItems = document.querySelector('#drawable_items');

  drawableItems.innerText = TARGET_NAME.join(', ');
});


async function fetchTestingData() {
  if (!testingData) {
    testingData = await fetchData('datasets/test_10000.csv');
  }
  return testingData;
}

async function fetchLearningData() {
  if (!learningData) {
    const all = await Promise.all([
      await fetchData(`datasets/train_30000_part_1.csv`),
      // await fetchData(`datasets/train_30000_part_2.csv`)
    ]);
    learningData = all.flat();
  }
  return learningData;
}


function clear() {
  background(BG_COLOR);
}

async function setup() {
  createCanvas(280, 280);
  pixelDensity(1);
  background(BG_COLOR);
  const network = new NeuralNetwork(784, 100, 10, 0.2);


  function guess(data) {
    const input = data.flat().map(num => scaleNumberBetween(num, 255, 0.01, 0.99));
    if (input.length < 784) { // I messed sth up in data
      return -1;
    }
    const answers = network.query(input);
    const max = Math.max(...answers);
    return answers.indexOf(max);

  }


  /** click */
  function teachNetwork() {
    networkAnswerElem.innerText = '';
    loaderElem.className = loaderElem.className.replace(' hide', '');

    const counter = learningData.length;
    setTimeout(() => {
      for (let i = 0; i < counter; i++) {
        const data = learningData[randomNumb(0, learningData.length)];
        const input = data.input.flat().map(num => scaleNumberBetween(num, 255, 0.01, 0.99));
        const target = targetArray(data.target);
        if (input.length < 784) { // I messed sth up in data
          continue;
        }
        if (i % (counter / 10) === 0) {
          console.log(`${(i / (counter / 100))}%`);
        }
        network.train(input, target);
      }
      loaderElem.className += ' hide';
      console.log(`COMPLETE!!!`);
    }, 100);
  }

  /** click */
  async function testNetworkSingle() {
    clear();
    await fetchTestingData();
    const data = testingData[randomNumb(0, 9999)];
    const bestMatch = guess(data.input);
    networkAnswerElem.innerText = `Best guess it's: ${TARGET_NAME[bestMatch]}, and in real it's ${TARGET_NAME[data.target]}`;
    clear();
    loadPixels();
    if (data) {
      for (let y = 0; y < data.input.length; y++) {
        for (let x = 0; x < data.input[y].length; x++) {

          if (data.input[y][x] > 0) {
            let selectedColor = data.input[y][x] > BG_COLOR ? data.input[y][x] : BG_COLOR;
            paintPixelGroup(pixels, x * 10, y * 10, selectedColor);
          }
        }
      }
      updatePixels();
    }
  }

  /** click */
  async function testNetwork() {
    clear();
    await fetchTestingData();
    networkAnswerElem.innerText = '';
    let correct = 0;
    for (let i = 0; i < 1000; i++) {
      const data = testingData[randomNumb(0, testingData.length)];
      const bestMatch = guess(data.input);
      if (bestMatch === data.target && bestMatch !== -1) {
        correct++;
      }
      networkAnswerElem.innerText = `${Math.floor((correct / i) * 100)} % of correct answers`;
    }
  }

  /** click */
  function testDrawing() {
    const img = get();
    img.resize(28, 28);
    img.loadPixels();
    const data = [];
    for (let i = 0; i < img.pixels.length; i += 4) {
      data.push(img.pixels[i]);
    }
    const input_arr = data.map(num => scaleNumberBetween(num, 255, 0.01, 0.90));
    console.log(input_arr);
    const answers = network.query(input_arr);
    const max = Math.max(...answers);
    console.log(max);
    const bestMatch = answers.indexOf(max);
    networkAnswerElem.innerText = `Best guess it's: ${TARGET_NAME[bestMatch]}`;
  }

  testDrawingElem.addEventListener('click', testDrawing);
  testAllElem.addEventListener('click', testNetwork);
  testSingleElem.addEventListener('click', testNetworkSingle);
  teachElem.addEventListener('click', teachNetwork);
  clearElem.addEventListener('click', clear);
  await fetchLearningData();
  // teachNetwork();
}

function draw() {
  strokeWeight(10);
  stroke(255);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}


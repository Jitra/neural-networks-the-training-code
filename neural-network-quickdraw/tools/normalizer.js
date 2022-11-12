import fs from 'fs';


const size = 784;
const LIST = {
  airplane: 'airplane',
  apple: 'apple',
  axe: 'axe',
  banana: 'banana',
  bee: 'bee',
  door: 'door',
  face: 'face',
  fish: 'fish',
  giraffe: 'giraffe',
  leg: 'leg'
};

const NAME = LIST.leg;
const fromImg = 9000;
const toImg = 9999;
const bufferBites = 80;
const start = bufferBites + size * fromImg;
const end = bufferBites + size * toImg;

const offset = bufferBites + size * fromImg;
const output = {};
fs.readFileSync(`raw_dataset/full_numpy_bitmap_${NAME}.npy`).forEach((numb, i) => {
  if (i > start && i <= end) {
    const itemIndex = Math.floor((i - offset) / size);
    if (!output[itemIndex]) {
      output[itemIndex] = [];
    }
    output[itemIndex].push(numb);
  }
});
const text = Object.values(output).map(item => item.join(',')).join('\n');
fs.writeFileSync(`small_dataset/test_${toImg - fromImg + 1}_${NAME}.csv`, text);

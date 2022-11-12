import fs from 'fs';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

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

const allData = [];

const listItems = Object.keys(LIST);

const CATEGORY = {
  TRAIN: 'train',
  TEST: 'test'
};

const TYPE = CATEGORY.TEST;

listItems.forEach((itemName, itemIndex) => {
  const fileContent = fs.readFileSync(`small_dataset/${TYPE}_1000_${itemName}.csv`, 'utf8')
    .split('\n')
    .map(imgContent => `${itemIndex},` + imgContent);
  allData.push(...fileContent);
});

shuffleArray(allData);

fs.writeFileSync(`datasets/${TYPE}_10000.csv`, allData.join('\n'));


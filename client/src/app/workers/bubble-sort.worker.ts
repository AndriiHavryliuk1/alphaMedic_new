/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const array = [];
  for (let i = 0; i < 49999; i++) {
    array.push(getRandomInt(-1000, 1000));
  }
  const t0 = performance.now();
  bubbleSort(array);
  const t1 = performance.now();
  const response = `bubble sort ${(t1 - t0)}`;
  postMessage(response);
});

function bubbleSort(array) {
  const len = array.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (array[j] > array[j + 1]) {
        const tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;
      }
    }
  }

  return array;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomTextComment = (elements) => {
  const textCount = getRandomPositiveInteger(0, 1);
  if (!textCount) {
    return elements[getRandomPositiveInteger(0, elements.length - 1)];
  }
  const commentText = `${elements[getRandomPositiveInteger(0, elements.length - 1)]} ${elements[getRandomPositiveInteger(0, elements.length - 1)]}`;
  return commentText;
};

const createRandomIdGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      // console.log(previousValues.length);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};
export {getRandomArrayElement, createRandomIdGenerator, getRandomPositiveInteger, getRandomTextComment};

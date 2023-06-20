const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
  'Иван',
  'Артем',
  'Андрей',
  'Георгий',
  'Василий'
];

const descriptions = [
  'Центр города',
  'Окраина',
  'Парк',
  'Каньон',
  'Деревня',
  'Площадка'
];

const SIMILAR_DESCRIPTION_COUNT = 25;

const getRandomPositiveInteger = function (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createRandomIdGenerator = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      // console.error('Достигнут максимум');
      return null;
    }
    previousValues.includes(currentValue);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const generateCommentId = createRandomIdGenerator(1,1000);
const generateFotoId = createRandomIdGenerator(1,25);
const generateUrlId = createRandomIdGenerator(1,25);

const createComment = function () {
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElement(messages),
    name: getRandomArrayElement(names)
  };
};

const createComments = () => Array.from({length: getRandomPositiveInteger(0, 30)}, createComment);

const createDescriptionFoto = () => ({
  id: generateFotoId(),
  url: `photos/${generateUrlId()}.jpg`,
  description: getRandomArrayElement(descriptions),
  likes: getRandomPositiveInteger(15, 200),
  comments: createComments()
});
const createDescriptionFotos = () => Array.from({length: SIMILAR_DESCRIPTION_COUNT}, createDescriptionFoto);
createDescriptionFotos();

const SIMILAR_DESCRIPTION_COUNT = 25;
const LIKE_MIN = 15;
const LIKE_MAX = 200;
const COMMENTS_MAX = 30;
const AVATAR_ID_MAX = 6;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Иван',
  'Артем',
  'Андрей',
  'Георгий',
  'Василий'
];

const DESCRIPTIONS = [
  'Центр города',
  'Окраина',
  'Парк',
  'Каньон',
  'Деревня',
  'Площадка'
];

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

const generateFotoId = createRandomIdGenerator(1,SIMILAR_DESCRIPTION_COUNT);
const generateUrlId = createRandomIdGenerator(1,SIMILAR_DESCRIPTION_COUNT);
const generateCommentId = createRandomIdGenerator(1,1000);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, AVATAR_ID_MAX)}.svg`,
  message: getRandomTextComment(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createComments = () => Array.from({length: getRandomPositiveInteger(0, COMMENTS_MAX)}, createComment);

const createDescriptionFoto = () => ({
  id: generateFotoId(),
  url: `photos/${generateUrlId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(LIKE_MIN, LIKE_MAX),
  comments: createComments()
});
const createDescriptionFotos = () => Array.from({length: SIMILAR_DESCRIPTION_COUNT}, createDescriptionFoto);
createDescriptionFotos();

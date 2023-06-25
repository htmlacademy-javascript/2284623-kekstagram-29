import {MESSAGES, NAMES, DESCRIPTIONS, SIMILAR_DESCRIPTION_COUNT, LIKE_MIN, LIKE_MAX, COMMENTS_MAX, AVATAR_ID_MAX} from './data.js';
import {getRandomArrayElement, createRandomIdGenerator, getRandomPositiveInteger, getRandomTextComment} from './generate.js';
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
export {createDescriptionFotos};

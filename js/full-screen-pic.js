import './miniature.js';
//Контейнер с чужими изображениями
const otherPicContainer = document.querySelector('.pictures');
//Контейнер полноэкранного показа изображения
const fullPictureContainer = document.querySelector('.big-picture');
//Контейнер просмотра изображения
const fullSizePic = document.querySelector('.big-picture__img img');
//Количество лайков на изображении
const likeCount = document.querySelector('.likes-count');
//Контейнер с количеством комментариев на изображении
const commentCount = fullPictureContainer.querySelector('.social__comment-count');
//Количество комментариев на изображении
const commentsCount = commentCount.querySelector('.comments-count');
//Подпись к изображению
const fotoDescription = document.querySelector('.social__caption');
//Кнопка закрытия полноэкранного отображения
const fullPicCancel = fullPictureContainer.querySelector('.big-picture__cancel');
//Кнопка загрузить ещё комментарии
const commentsLoader = fullPictureContainer.querySelector('.comments-loader');
//Контейнер с самими комментариями
const commentsList = fullPictureContainer.querySelector('.social__comments');
//Контейнер одного комментария
const commentTemplate = commentsList.querySelector('.social__comment');

//Добавляю слушатель на контейнер с делегированием
otherPicContainer.addEventListener('click', onPicClick);


// Функция для проверки нажатой ESC и последующего закрытия окна
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeUserModal();
  }
};

// Функция для закрытия окна по крестику
const onFullPicCancel = () => {
  closeUserModal();
};

// Функция открытия окна
function openUserModal () {
  commentsLoader.classList.add('hidden');
  commentCount.classList.add('hidden');
  fullPictureContainer.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  fullPicCancel.addEventListener('click', onFullPicCancel);
  otherPicContainer.removeEventListener('click', onPicClick);
}

// Функция закрытия окна
function closeUserModal () {
  fullPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  fullPicCancel.removeEventListener('click', onFullPicCancel);
  commentsLoader.classList.remove('hidden');
  commentCount.classList.remove('hidden');
  otherPicContainer.addEventListener('click', onPicClick);
}

//Функция по отрисовке полноразмерного окна + цикл для добавления комментариев
function onPicClick (evt) {
  if (evt.target.closest('.picture')) {
    const clickPicture = evt.target.closest('.picture');
    //Отрисовываю выбранное изображение и сопутствующую информацию
    fullSizePic.src = clickPicture.querySelector('.picture__img').src;
    likeCount.textContent = clickPicture.querySelector('.picture__likes').textContent;
    commentsCount.textContent = clickPicture.querySelector('.picture__comments').textContent;
    fotoDescription.textContent = clickPicture.querySelector('.picture__img').alt;
    commentsList.innerHTML = '';
    //Прохожу по массиву комментариев и отрисовываю их на страницу
    clickPicture.comments.forEach((comment) => {
      const commentElement = commentTemplate.cloneNode(true);
      commentElement.querySelector('.social__picture').src = comment.avatar;
      commentElement.querySelector('.social__picture').alt = comment.name;
      commentElement.querySelector('.social__text').textContent = comment.message;
      commentsList.appendChild(commentElement);
    });
    openUserModal();
  }
}


//Вариант с циклом

// miniatures.forEach((miniature) => {
//   miniature.addEventListener('click', () => {
//     openUserModal();
//     fullSizePic.src = miniature.querySelector('.picture__img').src;
//     likeCount.textContent = miniature.querySelector('.picture__likes').textContent;
//     commentsCount.textContent = miniature.querySelector('.picture__comments').textContent;
//     fotoDescription.textContent = miniature.querySelector('.picture__img').alt;
//     commentsList.innerHTML = '';
//     miniature.comments.forEach((comment) => {
//       const commentElement = commentTemplate.cloneNode(true);
//       commentElement.querySelector('.social__picture').src = comment.avatar;
//       commentElement.querySelector('.social__picture').alt = comment.name;
//       commentElement.querySelector('.social__text').textContent = comment.message;
//       commentsList.appendChild(commentElement);
//     });
//   });
// });

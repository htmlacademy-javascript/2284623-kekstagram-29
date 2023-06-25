const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength('аваыу', 6);

const checkPalindrome = (string) => {
  const normalString = string.toLowerCase().replaceAll();
  let newString = '';
  for (let i = normalString.length; i--; i >= 0) {
    newString += normalString[i];
  }
  return newString === normalString;
};
checkPalindrome('довод');

/*
Напишите функцию, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.

Время указывается в виде строки в формате часы:минуты. Для указания часов и минут могут использоваться как две цифры, так и одна. Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05.

Продолжительность задаётся числом. Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки.
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/

const checkTime = (startDay, endDay, meetDay, during) => {
  const removeFirstZero = (str) => {
    const time = {};
    const hoursAndMin = str.split(':');
    if (hoursAndMin[0].startsWith('0')) {
      time.hours = +hoursAndMin[0].slice(1);
    } else {
      time.hours = +hoursAndMin[0];
    }
    if (hoursAndMin[1].startsWith('0')) {
      time.minute = +hoursAndMin[1].slice(1);
    } else {
      time.minute = +hoursAndMin[1];
    }
    return time;
  };
  const startTime = removeFirstZero(startDay);
  const endTime = removeFirstZero(endDay);
  const meetTime = removeFirstZero(meetDay);

  if (startTime.hours > meetTime.hours || (startTime.hours === meetTime.hours && startTime.minute > meetTime.minute) || endTime.hours < meetTime.hours || (endTime.hours === meetTime.hours && endTime.minute < meetTime.minute)) {
    return false;
  }
  const meetTimeEnd = {};
  meetTimeEnd.hours = meetTime.hours + Math.floor(during / 60);
  meetTimeEnd.minute = meetTime.minute + during % 60;
  if (meetTimeEnd.minute > 60) {
    meetTimeEnd.minute = meetTimeEnd.minute % 60;
    meetTimeEnd.hours = Math.floor(meetTimeEnd.minute / 60);
  }
  if (meetTimeEnd.hours > endTime.hours || (endTime.hours === meetTimeEnd.hours && endTime.minute < meetTimeEnd.minute)) {
    return false;
  }
  return true;
};
checkTime('8:00', '17:30', '08:55', 90);


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

export const checkLength = (value, minNum, maxNum) => {
  if (value.trim().length < minNum || value.trim().length > maxNum) {
    return false;
  }
  return true;
};

export const toNumber = (input) => {
  if (/^[-+]?\d+$/.test(input)) {
    return Number(input);
  }
  return false;
};

export const inRange = (min, max, input) => {
  const numb = Number(input);
  return numb >= min && numb <= max;
};

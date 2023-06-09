export const determineNumberNextToTheTail = (position, {width, height} = size) => {
  const positionsAroundTail = [];
  if (!(position % width)) {
    positionsAroundTail.push(
      position - width,
      position - width + 1,
      position + 1,
      position + width,
      position + width + 1,
    );
  } else if (!((position + 1) % width)) {
    positionsAroundTail.push(
      position - width - 1,
      position - width,
      position - 1,
      position + width - 1,
      position + width,
    );
  } else
    positionsAroundTail.push(
      position - width - 1,
      position - width,
      position - width + 1,
      position - 1,
      position + 1,
      position + width - 1,
      position + width,
      position + width + 1,
    );
  return positionsAroundTail.filter((position) => position >= 0 && position < width * height);
};

export const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

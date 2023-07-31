export default function getRandomizedImages() {
  const indexArray = [];
  // Initialize indices
  for (let i = 1; i <= 54; i++) indexArray.push(i);
  // Randomize them
  for (let i = 53; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [indexArray[i], indexArray[j]] = [indexArray[j], indexArray[i]];
  }
  // Cards are card1.jpg, card2.jpg, etc.
  const imageArray = indexArray.map((index) => `/card${index}.jpeg`);
  return imageArray;
}

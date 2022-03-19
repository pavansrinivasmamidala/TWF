import words from "./words.json";

const shuffledWords = words.sort(() => Math.random() - 0.5);

export default shuffledWords;

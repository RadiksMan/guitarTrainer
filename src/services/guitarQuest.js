import { pickRandomProperty } from "./utility";

export const generateNoteQuestion = (guitarConfig, oldQuestionNote) => {
  const { frets } = guitarConfig;

  let questionNote = generateNewQuestionNote(frets);

  if (questionNote["fretNumber"] === oldQuestionNote["fretNumber"]) {
    while (questionNote["noteNumber"] === oldQuestionNote["noteNumber"]) {
      questionNote = generateNewQuestionNote(frets);
    }
  }

  return questionNote;
}

const generateNewQuestionNote = frets => {

  let randomFretNumber, randomFret;
  const getRandomFretNumber = () => Math.floor(Math.random() * frets.length);

  randomFretNumber = getRandomFretNumber();
  randomFret = frets[randomFretNumber];

  while (Object.keys(randomFret).length === 0) {
    //check if random Fret is empty - get new fret
    randomFretNumber = getRandomFretNumber();
    randomFret = frets[randomFretNumber];
  }

  let randomNoteProperty = pickRandomProperty(randomFret);

  const randomNote = randomFret[randomNoteProperty];
  return {
    fretNumber: randomFretNumber,
    noteNumber: +randomNoteProperty,
    noteName: randomNote["note"]
  }
}

export const verifyCorrectUserAnswer = (userAnswerNote, questionNote) => {
  const { noteName } = questionNote;

  return {
    userAnswerCorrect: noteName === userAnswerNote ? true : false,
    userAnswerNote,
    correctUnswerNote: questionNote
  }

}

export const generateWithoutSharps = (type) => {
  const guitarConfigClone = guitarsRequire(type);
  const { frets } = guitarConfigClone;

  frets.map((fret, index) => {
    Object.keys(fret).forEach((key) => {
      const { note } = fret[key];
      if (note.includes('#')) {
        delete fret[key];
      }
    })
  })
  return guitarConfigClone;
}

export const guitarsRequire = type => {
  delete require.cache[require.resolve("../json/guitar.json")];
  const guitars = require('../json/guitar.json');
  return type ? guitars[type] : guitars;
}
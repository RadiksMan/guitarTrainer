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
};

const generateNewQuestionNote = frets => {
  const randomFretNumber = Math.floor(Math.random() * frets.length);
  const randomFret = frets[randomFretNumber];

  const randomNoteProperty = pickRandomProperty(randomFret);
  const randomNote = randomFret[randomNoteProperty];

  return {
    fretNumber: randomFretNumber,
    noteNumber: +randomNoteProperty,
    noteName: randomNote["note"]
  };
};

export const verifyCorrectUserAnswer = (userAnswerNote, questionNote) => {
    const {noteName} = questionNote;

    return {
        userAnswerCorrect: noteName === userAnswerNote ? true : false,
        userAnswerNote,
        correctUnswerNote:questionNote
    }
    
};

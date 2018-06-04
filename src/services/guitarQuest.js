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

export const generateWithoutSharps = guitarConfig => {

  console.log('guitarConfig', guitarConfig)
  const { frets } = guitarConfig;

  frets.map((fret, index) => {

    Object.keys(fret).forEach((key) => {
      const { note } = fret[key];
      if(note.includes('#')){
        delete fret[key];
      }

    })
  })

  console.log('Object.assign({}, ...guitarConfig, frets)', Object.assign({}, ...guitarConfig, frets))
  return Object.assign({}, ...guitarConfig, frets);
}
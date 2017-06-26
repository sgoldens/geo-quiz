import { COUNTRIES } from './countries'

export var mapQuizQuestion = "What country is this?"

export function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/* Simulate an API which provides five random countries, one being correct. */
export const correctRandomCountriesArray = [
    COUNTRIES[getRandomInt(0,244)],
    COUNTRIES[getRandomInt(0,244)],
    COUNTRIES[getRandomInt(0,244)],
    COUNTRIES[getRandomInt(0,244)],
    COUNTRIES[getRandomInt(0,244)]
]

const correct = "correct"
const incorrect = "incorrect"

export const quizQuestion = [
  {
      question: mapQuizQuestion,
      answers: [
        {
          type: correct,
          content: correctRandomCountriesArray[0][3]
        },
        {
          type: incorrect+'1',
          content:COUNTRIES[getRandomInt(0,244)][3]
        },
        {
          type: incorrect+"2",
          content:COUNTRIES[getRandomInt(0,244)][3]
        },
        {
          type: incorrect+"3",
          content:COUNTRIES[getRandomInt(0,244)][3]
        },
        {
            type: incorrect+"4",
            content:COUNTRIES[getRandomInt(0,244)][3]
        }
      ]
  }
];

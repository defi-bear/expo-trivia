export type TriviaResult = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: [string];
};

export type TriviaResponse = {
  response_code: number;
  results: [TriviaResult];
};

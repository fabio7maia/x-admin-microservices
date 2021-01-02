import { QuizQuestion } from '../quizzesQuestions';
import { QuizQuestionAnswer } from '../quizzesQuestionsAnswers';
import { Quiz } from './quiz.entity';

export interface QuizQuestionsData extends QuizQuestion {
  answers: QuizQuestionAnswer[];
}

export interface QuizData extends Quiz {
  questions: QuizQuestionsData[];
}

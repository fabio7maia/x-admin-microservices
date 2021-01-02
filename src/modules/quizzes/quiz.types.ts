import { QuizQuestionEntity } from '../quizzesQuestions';
import { QuizQuestionAnswerEntity } from '../quizzesQuestionsAnswers';
import { QuizEntity } from './quiz.entity';

export interface QuizQuestionsData extends QuizQuestionEntity {
  answers: QuizQuestionAnswerEntity[];
}

export interface QuizData extends QuizEntity {
  questions: QuizQuestionsData[];
}

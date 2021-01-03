import { ApiModelProperty } from '@nestjs/swagger';
import { QuizQuestion } from '../quizzesQuestions';
import { QuizQuestionAnswer } from '../quizzesQuestionsAnswers';
import { Quiz } from './quiz.entity';

export class QuizQuestionsData extends QuizQuestion {
  @ApiModelProperty({ type: QuizQuestionAnswer, isArray: true })
  answers: QuizQuestionAnswer[];
}

export class QuizData extends Quiz {
  @ApiModelProperty({ type: QuizQuestionsData, isArray: true })
  questions: QuizQuestionsData[];
}

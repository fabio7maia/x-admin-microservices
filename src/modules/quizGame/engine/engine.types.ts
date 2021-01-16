import { ApiModelProperty } from '@nestjs/swagger';

export class QuizEngineBaseInput {
  @ApiModelProperty()
  quizCode: string;

  @ApiModelProperty()
  authenticatedUserId: string;
}

export class QuizEngineBaseQuestionAnswerOutput {
  @ApiModelProperty()
  id: string;

  @ApiModelProperty()
  answer: string;

  @ApiModelProperty()
  correctAnswer: boolean;
}

export class QuizEngineBaseQuestionsOutput {
  @ApiModelProperty()
  id: string;

  @ApiModelProperty()
  question: string;

  @ApiModelProperty({ type: QuizEngineBaseQuestionAnswerOutput, isArray: true })
  answers: QuizEngineBaseQuestionAnswerOutput[];
}

export class QuizEngineGameUserData {
  @ApiModelProperty()
  points: number;

  @ApiModelProperty()
  answers: number;

  @ApiModelProperty()
  correctAnswers: number;
}

export class QuizEngineBaseOutput {
  @ApiModelProperty()
  question: QuizEngineBaseQuestionsOutput;
}

export class QuizEngineGetRandomQuestionsInput extends QuizEngineBaseInput {}

export class QuizEngineGetRandomQuestionsOutput extends QuizEngineBaseOutput {}

export class QuizEngineGetQuizGameDataInput extends QuizEngineBaseInput {}

export class QuizEngineGetQuizGameDataOutput extends QuizEngineBaseOutput {
  @ApiModelProperty()
  userGameGuid: string;

  @ApiModelProperty({ type: QuizEngineGameUserData })
  gameData: QuizEngineGameUserData;
}

export class QuizEngineDoAnswerInput {
  @ApiModelProperty()
  quizCode: string;

  @ApiModelProperty()
  userGameGuid: string;

  @ApiModelProperty()
  questionId: string;

  @ApiModelProperty()
  answerId: string;
}

export class QuizEngineDoAnswerServiceInput extends QuizEngineBaseInput {
  @ApiModelProperty()
  userGameGuid: string;

  @ApiModelProperty()
  questionId: string;

  @ApiModelProperty()
  answerId: string;
}

export class QuizEngineDoAnswerOutput extends QuizEngineBaseOutput {
  @ApiModelProperty()
  userGameGuid: string;

  @ApiModelProperty({ type: QuizEngineGameUserData })
  gameData: QuizEngineGameUserData;
}

export type QuizEngineCachedGameUserData = QuizEngineGameUserData & {
  currentQuestionId: string;
};

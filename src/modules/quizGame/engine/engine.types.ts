import { ApiProperty } from '@nestjs/swagger';

export class QuizEngineBaseInput {
  @ApiProperty()
  quizCode: string;

  @ApiProperty()
  authenticatedUserId: string;
}

export class QuizEngineBaseQuestionAnswerOutput {
  @ApiProperty()
  id: string;

  @ApiProperty()
  answer: string;
}

export class QuizEngineBaseQuestionsOutput {
  @ApiProperty()
  id: string;

  @ApiProperty()
  question: string;

  @ApiProperty({ type: QuizEngineBaseQuestionAnswerOutput, isArray: true })
  answers: QuizEngineBaseQuestionAnswerOutput[];
}

export class QuizEngineGameUserData {
  @ApiProperty()
  points: number;

  @ApiProperty()
  answers: number;

  @ApiProperty()
  correctAnswers: number;
}

export class QuizEngineBaseOutput {
  @ApiProperty()
  question: QuizEngineBaseQuestionsOutput;
}

export class QuizEngineGetRandomQuestionInput extends QuizEngineBaseInput {
  lastQuestionId?: string;
}

export class QuizEngineGetRandomQuestionOutput extends QuizEngineBaseOutput {}

export class QuizEngineGetQuizGameDataInput extends QuizEngineBaseInput {}

export class QuizEngineGetQuizGameDataOutput extends QuizEngineBaseOutput {
  @ApiProperty()
  userGameGuid: string;

  @ApiProperty({ type: QuizEngineGameUserData })
  gameData: QuizEngineGameUserData;
}

export class QuizEngineDoAnswerInput {
  @ApiProperty()
  quizCode: string;

  @ApiProperty()
  userGameGuid: string;

  @ApiProperty()
  questionId: string;

  @ApiProperty()
  answerId: string;
}

export class QuizEngineDoAnswerServiceInput extends QuizEngineBaseInput {
  @ApiProperty()
  userGameGuid: string;

  @ApiProperty()
  questionId: string;

  @ApiProperty()
  answerId: string;
}

export class QuizEngineDoAnswerOutput extends QuizEngineBaseOutput {
  @ApiProperty()
  userGameGuid: string;

  @ApiProperty({ type: QuizEngineGameUserData })
  gameData: QuizEngineGameUserData;

  @ApiProperty()
  isCorrectAnswer: boolean;
}

export type QuizEngineCachedGameUserData = QuizEngineGameUserData & {
  currentQuestionId: string;
};

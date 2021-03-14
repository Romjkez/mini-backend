/**
 * Type of question in a test
 */
export enum QuestionType {
  /**
   * Put options in a right order
   */
  Order = 'order',
  /**
   * Choose 1 correct answer between many options
   */
  OneOf = 'oneOf',
  /**
   * Type the correct answer (no options, 1 option as correct answer)
   */
  ExactAnswer = 'exactAnswer',
  /**
   * Choose multiple correct answers between many options
   */
  MultipleOf = 'multipleOf'
}

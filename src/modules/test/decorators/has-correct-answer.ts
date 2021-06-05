import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator';
import { CreateOptionDto } from '../../option/dto/create-option.dto';

/**
 * Check if array of options has at least 1 correct answer
 */
export function HasCorrectAnswer(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: 'hasCorrectAnswer',
      validator: {
        validate(value: Array<CreateOptionDto>): boolean {
          let correctAnswers = 0;
          for (let i = 0; i < value.length; i++) {
            if (value[i].isCorrect === true) {
              if (correctAnswers !== 0) {
                break;
              }
              correctAnswers += 1;
            }
          }
          return correctAnswers >= 1;
        },
        defaultMessage: buildMessage(
          eachPrefix => `${eachPrefix}$property must have at least 1 correct answer`,
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}

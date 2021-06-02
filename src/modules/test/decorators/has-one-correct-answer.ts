import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator';
import { CreateOptionDto } from '../../option/dto/create-option.dto';

export function HasOneCorrectAnswer(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: 'hasOneCorrectAnswer',
      validator: {
        validate(value: Array<CreateOptionDto>): boolean {
          let correctAnswers = 0;
          for (let i = 0; i < value.length; i++) {
            if (!!value[i].isCorrect) {
              if (correctAnswers > 1) {
                break;
              }
              correctAnswers += 1;
            }
          }
          return correctAnswers == 1;
        },
        defaultMessage: buildMessage(
          eachPrefix => `${eachPrefix}$property must have only 1 correct answer`,
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}

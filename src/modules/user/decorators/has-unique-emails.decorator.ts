import { buildMessage, registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { CreateUserBulkDto } from '../dto/create-user-bulk.dto';
import { CreateUserDto } from '../dto/create-user.dto';

/**
 * Check if array of CreateUserDto has unique email in each object (existence in database is not being checked)
 * @param validationOptions
 * @see CreateUserBulkDto
 * @see CreateUserDto
 * @constructor
 */
export function HasUniqueEmails(validationOptions?: ValidationOptions) {
  return function(data: CreateUserBulkDto, propertyName: string): void {
    registerDecorator({
      name: 'HasUniqueEmails',
      target: data.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: Array<CreateUserDto>, args: ValidationArguments): boolean {
          if (args.object instanceof CreateUserBulkDto) {
            if (!value || value.length === 0) {
              return false;
            }
            const emails = value.map(item => item.email);
            const uniqueEmails = Array.from(new Set(emails));

            return emails.length === uniqueEmails.length;
          }
          return false;
        },
        defaultMessage: buildMessage(
          eachPrefix => `${eachPrefix}$property must be an array with unique email in each object`,
          validationOptions,
        ),
      },
    });
  };
}

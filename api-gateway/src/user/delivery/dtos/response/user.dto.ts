import { AbstractDto } from '../../../../common/dto/abstract.dto';
import {
  ClassFieldOptional,
  EmailField,
  StringFieldOptional,
} from '../../../../decorators';

export class UserDto extends AbstractDto {
  @EmailField()
  email!: string;

  @StringFieldOptional()
  avatar?: string | null;

  @ClassFieldOptional(() => UserDto)
  createdBy?: UserDto | null;
}

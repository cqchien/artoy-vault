import { AbstractDto } from '../../../../../common/dto/abstract.dto';
import {
  ClassFieldOptional,
  EmailField,
  StringFieldOptional,
} from '../../../../../decorators';
import type { UserDomain } from '../../../domains/user.domain';

export class UserDto extends AbstractDto {
  @EmailField()
  email!: string;

  @StringFieldOptional()
  avatar?: string | null;

  @ClassFieldOptional(() => UserDto)
  createdBy?: UserDto | null;

  constructor(user: UserDomain) {
    super(user);
    this.email = user.email;
    this.avatar = user.avatar;
    this.createdBy = user.createdBy;
  }
}

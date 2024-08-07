import { AbstractDto } from '../../../common/dto/abstract.dto';
import { ClassFieldOptional, EmailField } from '../../../decorators';
import { UserEntity } from '../user.entity';

export class UserDto extends AbstractDto {
  @EmailField({ nullable: true })
  email!: string;

  @ClassFieldOptional(() => UserEntity)
  createdBy?: UserEntity | null;

  constructor(user: UserEntity) {
    super(user);
    this.email = user.email;
    this.createdBy = user.createdBy;
  }
}

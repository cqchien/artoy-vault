import { AbstractDomain } from '../../../common/abstract.domain';
import type { UserEntity } from '../infras/entities/user.entity';

export class UserDomain extends AbstractDomain {
  avatar?: string | null;

  email: string;

  password: string;

  createdBy?: UserDomain | null;

  updatedBy?: UserDomain | null;

  deletedBy?: UserDomain | null;

  deletedAt?: Date | null;

  constructor(entity: UserEntity) {
    super(entity);

    this.avatar = entity.avatar;
    this.email = entity.email;
    this.password = entity.password;
    this.createdBy = entity.createdBy ? entity.createdBy.toDomain() : null;
    this.updatedBy = entity.updatedBy ? entity.updatedBy.toDomain() : null;
    this.deletedBy = entity.deletedBy ? entity.deletedBy.toDomain() : null;
    this.deletedAt = entity.deletedAt;
  }
}

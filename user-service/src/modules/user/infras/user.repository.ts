import { Repository } from 'typeorm';

import { toDomains } from '../../../boilerplate.polyfill';
import type { PageMetaDto } from '../../../common/dto/page-meta.dto';
import type { UserPaginationOptionsDto } from '../delivery/dtos/request/users-pagination.dto';
import type { UserDomain } from '../domains/user.domain';
import type { IUserRepository } from '../interfaces/user.repository.interface';
import type { UserEntity } from './entities/user.entity';

export class UserRepository
  extends Repository<UserEntity>
  implements IUserRepository
{
  public async getUsersWithPagination(
    paginationOptions: UserPaginationOptionsDto,
  ): Promise<[UserDomain[], PageMetaDto]> {
    const [userEntities, pageMetaDto] = await this.createQueryBuilder('users')
      .andWhere('deletedAt is null')
      .orderBy('createdAt', 'DESC')
      .paginate(paginationOptions);

    return [toDomains(userEntities), pageMetaDto];
  }
}

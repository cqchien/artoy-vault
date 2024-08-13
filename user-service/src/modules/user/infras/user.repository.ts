import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { toDomains } from '../../../boilerplate.polyfill';
import type { PageMetaDto } from '../../../common/dto/page-meta.dto';
import type { UserPaginationOptionsDto } from '../delivery/dtos/request/users-pagination.dto';
import type { UserDomain } from '../domains/user.domain';
import type { IUserRepository } from '../interfaces/user.repository.interface';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getUsersWithPagination(
    paginationOptions: UserPaginationOptionsDto,
  ): Promise<[UserDomain[], PageMetaDto]> {
    const [userEntities, pageMetaDto] = await this.userRepository
      .createQueryBuilder('users')
      .andWhere('users.deletedAt is null')
      .orderBy('users.createdAt', 'DESC')
      .paginate(paginationOptions);

    return [toDomains(userEntities), pageMetaDto];
  }
}

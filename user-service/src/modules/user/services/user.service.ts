import { Injectable } from '@nestjs/common';
import type { PageMetaDto } from 'common/dto/page-meta.dto';

import type { UserPaginationOptionsDto } from '../delivery/dtos/request/users-pagination.dto';
import type { UserDomain } from '../domains/user.domain';
import { IUserRepository } from '../interfaces/user.repository.interface';
import type { IUserService } from '../interfaces/user.service.inteface';

@Injectable()
export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async getUsersWithPagination(
    pageOptionsDto: UserPaginationOptionsDto,
  ): Promise<[UserDomain[], PageMetaDto]> {
    const [users, pageMetaDto] =
      await this.userRepository.getUsersWithPagination(pageOptionsDto);

    return [users, pageMetaDto];
  }
}

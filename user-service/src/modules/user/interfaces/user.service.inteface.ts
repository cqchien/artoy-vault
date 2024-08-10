import type { PageMetaDto } from '../../../common/dto/page-meta.dto';
import type { UserPaginationOptionsDto } from '../delivery/dtos/request/users-pagination.dto';
import type { UserDomain } from '../domains/user.domain';

export interface IUserService {
  getUsersWithPagination(
    pageOptionsDto: UserPaginationOptionsDto,
  ): Promise<[UserDomain[], PageMetaDto]>;
}
